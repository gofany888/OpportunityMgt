<template>
  <a-card :bordered="false" class="dashboard-card-wrapper trend-chart-card">
    <div class="card-header">
      <div class="dashboard-section-title">
        <i class="fa-solid fa-chart-line icon-title"></i>
        收入序时
      </div>
      
      <div class="header-right-controls">
        <!-- Metric Switcher -->
        <a-radio-group v-model:value="activeMetric" button-style="solid" size="small" class="metric-switcher">
          <a-radio-button value="revenue">收入</a-radio-button>
          <a-radio-button value="cost">采购</a-radio-button>
          <a-radio-button value="grossProfit">毛利</a-radio-button>
        </a-radio-group>
        
        <div class="custom-legend">
          <span class="legend-item with-series-box">
            <div class="series-state-box eis-theme">
              <span class="state-actual"></span>
              <span class="state-forecast"></span>
            </div>
            EIS系统
          </span>
          <span class="legend-item with-series-box">
            <div class="series-state-box ledger-theme">
              <span class="state-actual"></span>
              <span class="state-forecast"></span>
            </div>
            BG台账
          </span>
        </div>
      </div>
    </div>
    
    <!-- Top Area: Chart -->
    <div class="main-viz-area">
      <div class="chart-container">
        <div class="echart-wrapper" ref="chartRef"></div>
      </div>
    </div>

    <!-- Bottom Area: Detail Table -->
    <div class="data-detail-table-area">
      <a-table 
        :columns="tableColumns" 
        :data-source="tableData" 
        :pagination="false" 
        size="small" 
        :row-class-name="getRowClassName"
        class="monthly-data-table"
      >
        <template #headerCell="{ column }">
          <div v-if="column.key.startsWith('m-')" class="multi-level-header">
            <span class="table-header-month">{{ column.title }}</span>
            <span :class="['table-header-status', parseInt(column.key.split('-')[1]) <= 1 ? 'is-actual-text' : 'is-forecast-text']">
              {{ parseInt(column.key.split('-')[1]) <= 1 ? '实绩' : '预测' }}
            </span>
          </div>
          <div v-else-if="column.key === 'ytd'" class="multi-level-header">
            <span class="table-header-month">{{ column.title }}</span>
            <span class="table-header-status is-ytd-text">汇总</span>
          </div>
          <span v-else class="table-header-cell">{{ column.title }}</span>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'month'">
            <button
              v-if="record.rowType === 'section'"
              type="button"
              :class="['dimension-cell', record.dimensionClass]"
              @click="toggleSection(record.sectionKey)"
            >
              <span class="dimension-toggle">
                {{ expandedSections[record.sectionKey] ? '−' : '+' }}
              </span>
              <span class="dimension-label">{{ record.month }}</span>
            </button>
            <span v-else :class="['month-cell', { 'month-cell-gap': record.rowType === 'gap' }]">
              {{ text }}
            </span>
          </template>
          <template v-else-if="record.rowType === 'section' || record.rowType === 'gap'">
            <span
              :class="[
                'gap-cell drilldown-value',
                parseFloat(text) > 0 ? 'text-error' : '',
                parseFloat(text) < 0 ? 'text-success' : '',
                parseFloat(text) === 0 ? 'text-neutral' : ''
              ]"
              title="点击查看明细"
              @click="handleTableValueClick(record)"
            >
              {{ parseFloat(text) > 0 ? `+${text}` : text }}
            </span>
          </template>
          <template v-else>
            <span
              :class="[
                'tabular-num drilldown-value',
                column.key === 'ytd'
                    ? 'ytd-value-cell'
                    : parseInt(column.key.split('-')[1]) <= 1
                    ? 'actual-value-cell'
                    : 'forecast-value-cell'
              ]"
              title="点击查看明细"
              @click="handleTableValueClick(record)"
            >
              {{ text }}
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, shallowRef, computed, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { trendChartData } from '@/data/dashboardData';

const router = useRouter();
const chartRef = ref(null);
const chartInstance = shallowRef(null);
const activeMetric = ref('revenue');
const expandedSections = reactive({
  revenue: true,
  cost: true,
  grossProfit: true
});

const currentTrend = computed(() => trendChartData[activeMetric.value]);
const formatAmount = (value) => Number(value).toFixed(2);

const tooltipMetricMeta = {
  revenue: { label: '收入', color: '#1677ff' },
  cost: { label: '采购', color: '#722ed1' },
  grossProfit: { label: '毛利', color: '#52c41a' }
};

const formatTooltipSeriesRow = (label, value, isActual, color) => {
  const swatchStyle = isActual
    ? `background-color:${color};border:1px solid transparent;`
    : `background-color:#ffffff;border:1px solid ${color};`;

  return `<span style="display:inline-block;margin-right:6px;border-radius:2px;width:9px;height:9px;${swatchStyle}"></span>${label}: <b>${formatAmount(value)}</b> 万`;
};

const buildTooltipContent = (dataIndex, monthLabel) => {
  const isActual = dataIndex <= 1;
  const periodLabel = isActual ? '实绩' : '预测';
  const titleColor = isActual ? '#1e293b' : '#64748b';

  const metricSections = Object.entries(tooltipMetricMeta).map(([metricKey, meta]) => {
    const metricData = trendChartData[metricKey];
    const eisValue = metricData.eis[dataIndex];
    const ledgerValue = metricData.ledger[dataIndex];
    const diffValue = ledgerValue - eisValue;
    const diffColor = diffValue > 0 ? '#ef4444' : diffValue < 0 ? '#10b981' : 'rgba(100, 116, 139, 0.42)';
    const diffLabel = diffValue > 0 ? `+${formatAmount(diffValue)}` : formatAmount(diffValue);

    return `
      <div style="padding-top:8px;margin-top:8px;border-top:1px solid rgba(226,232,240,0.9);">
        <div style="font-size:12px;font-weight:700;color:${meta.color};margin-bottom:6px;">${meta.label}</div>
        <div style="font-size:12px;line-height:1.8;color:#334155;">${formatTooltipSeriesRow('EIS系统', eisValue, isActual, '#3b82f6')}</div>
        <div style="font-size:12px;line-height:1.8;color:#334155;">${formatTooltipSeriesRow('BG台账', ledgerValue, isActual, '#0d9488')}</div>
        <div style="font-size:12px;line-height:1.8;font-weight:700;color:${diffColor};">差异: ${diffLabel} 万</div>
      </div>
    `;
  });

  return `
    <div style="min-width:220px;">
      <div style="font-size:13px;font-weight:700;color:${titleColor};">${monthLabel} [${periodLabel}]</div>
      ${metricSections.join('')}
    </div>
  `;
};

// Table Preparation
const tableColumns = [
  { title: '指标(万)/月份', dataIndex: 'month', key: 'month', align: 'left', width: 160, fixed: 'left' },
  ...trendChartData.months.map((m, i) => ({
    title: m,
    dataIndex: i,
    key: `m-${i}`,
    align: 'center',
    className: i <= 1 ? 'column-actual' : 'column-forecast'
  })),
  { title: '当年累计', dataIndex: 'ytd', key: 'ytd', align: 'center', className: 'column-ytd' }
];

const tableData = computed(() => {
  const metricSections = [
    { key: 'revenue', label: '收入差异', dimensionClass: 'is-revenue' },
    { key: 'cost', label: '采购差异', dimensionClass: 'is-procurement' },
    { key: 'grossProfit', label: '毛利差异', dimensionClass: 'is-gross-profit' }
  ];

  return metricSections.flatMap((section) => {
    const metric = trendChartData[section.key];
    const gapValues = metric.eis.map((value, index) => formatAmount(metric.ledger[index] - value));
    const eisTotal = metric.eis.reduce((sum, value) => sum + value, 0);
    const ledgerTotal = metric.ledger.reduce((sum, value) => sum + value, 0);

    const rows = [
      {
        key: `${section.key}-section`,
        rowType: 'section',
        sectionKey: section.key,
        month: section.label,
        dimensionClass: section.dimensionClass,
        ...Object.fromEntries(gapValues.map((value, index) => [index, value])),
        ytd: formatAmount(ledgerTotal - eisTotal)
      },
      {
        key: `${section.key}-eis`,
        rowType: 'data',
        month: 'EIS系统',
        ...Object.fromEntries(metric.eis.map((value, index) => [index, formatAmount(value)])),
        ytd: formatAmount(eisTotal)
      },
      {
        key: `${section.key}-ledger`,
        rowType: 'data',
        month: 'BG 台账',
        ...Object.fromEntries(metric.ledger.map((value, index) => [index, formatAmount(value)])),
        ytd: formatAmount(ledgerTotal)
      }
    ];

    return expandedSections[section.key] ? rows : rows.slice(0, 1);
  });
});

const toggleSection = (sectionKey) => {
  expandedSections[sectionKey] = !expandedSections[sectionKey];
};

const goToLedgerCenter = () => {
  router.push({
    name: 'ledger-center',
    query: { from: 'dashboard' }
  });
};

const goToEisAudit = () => {
  router.push({
    name: 'eis-audit',
    query: { from: 'dashboard' }
  });
};

const handleTableValueClick = (record) => {
  if (record.rowType === 'section' || record.rowType === 'gap') {
    goToEisAudit();
    return;
  }

  goToLedgerCenter();
};

const getRowClassName = (record) => {
  if (record.rowType === 'section') return 'dimension-row';
  return '';
};

const updateChart = () => {
  if (!chartInstance.value) return;

  // Helper to create diagonal stripe pattern
  const createStripePattern = (baseColor, stripeColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 12;
    canvas.height = 12;
    const ctx = canvas.getContext('2d');
    
    // Base Color
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 12, 12);
    
    // Diagonal Stripes
    ctx.strokeStyle = stripeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(12, 0);
    ctx.stroke();
    return canvas;
  };
  
  const eisGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#3b82f6' },
    { offset: 1, color: '#60a5fa' }
  ]);
  
  const ledgerGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#0d9488' },
    { offset: 1, color: '#2dd4bf' }
  ]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: 0,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      formatter: (params) => buildTooltipContent(params[0].dataIndex, params[0].name)
    },
    grid: {
      left: '0%',
      right: '2%',
      bottom: '5%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: trendChartData.months,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } },
      axisLabel: { color: '#94a3b8', fontSize: 11 }
    },
    series: [
      {
        name: 'EIS系统',
        type: 'bar',
        barWidth: 14,
        data: currentTrend.value.eis.map((v, i) => {
          const isActual = i <= 1;
          return {
            value: v,
            itemStyle: {
              color: isActual ? eisGradient : {
                image: createStripePattern('#3b82f6', 'rgba(191, 219, 254, 0.72)'),
                repeat: 'repeat'
              },
              borderColor: '#3b82f6',
              borderWidth: isActual ? 0 : 1,
              borderType: isActual ? 'solid' : 'dashed',
              borderRadius: [4, 4, 0, 0]
            }
          };
        })
      },
      {
        name: 'BG台账',
        type: 'bar',
        barWidth: 14,
        data: currentTrend.value.ledger.map((v, i) => {
          const isActual = i <= 1;
          return {
            value: v,
            itemStyle: {
              color: isActual ? ledgerGradient : {
                image: createStripePattern('#0d9488', 'rgba(153, 246, 228, 0.68)'),
                repeat: 'repeat'
              },
              borderColor: '#0d9488',
              borderWidth: isActual ? 0 : 1,
              borderType: isActual ? 'solid' : 'dashed',
              borderRadius: [4, 4, 0, 0]
            }
          };
        })
      }
    ]
  };
  
  chartInstance.value.setOption(option);
  
  // Draw divider using graphic - pixel-perfect between Feb and Mar
  drawDivider();
};

const drawDivider = () => {
  if (!chartInstance.value) return;
  
  // Get pixel positions for Feb (index 1) and Mar (index 2)
  const febPixelX = chartInstance.value.convertToPixel({ xAxisIndex: 0 }, 1);
  const marPixelX = chartInstance.value.convertToPixel({ xAxisIndex: 0 }, 2);
  const midX = (febPixelX + marPixelX) / 2;
  
  // Get grid top and bottom
  const gridRect = chartInstance.value.getModel().getComponent('grid', 0).coordinateSystem.getRect();
  const topY = gridRect.y;
  const bottomY = gridRect.y + gridRect.height;
  
  chartInstance.value.setOption({
    graphic: [
      {
        type: 'line',
        z: 100,
        shape: {
          x1: midX,
          y1: topY,
          x2: midX,
          y2: bottomY
        },
        style: {
          stroke: '#cbd5e1',
          lineWidth: 2,
          lineDash: [6, 4]
        }
      },
      {
        type: 'text',
        z: 100,
        x: midX + 8,
        y: topY - 4,
        style: {
          text: '预测 ⮕',
          fill: '#94a3b8',
          fontSize: 11,
          fontWeight: 700,
          textAlign: 'left',
          textVerticalAlign: 'bottom'
        }
      }
    ]
  });
};

watch(activeMetric, () => {
  updateChart();
});

onMounted(() => {
  if (chartRef.value) {
    chartInstance.value = echarts.init(chartRef.value);
    updateChart();
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  chartInstance.value?.resize();
  // Redraw divider after resize since pixel positions change
  drawDivider();
};

</script>

<style scoped src="@/components/dashboard/styles/DashboardTrendChart.css"></style>
