<template>
  <a-card :bordered="false" class="dashboard-card-wrapper performance-table-card">
    <div class="card-header">
      <div class="dashboard-section-title">
        <i class="fa-solid fa-chart-column icon-title"></i>
        部门经营
      </div>
      <div class="performance-unit-note">单位：金额(万元) / 个数</div>
    </div>
    
    <a-table 
      :dataSource="performanceTableData" 
      :columns="columns"
      :pagination="false"
      size="middle"
      table-layout="fixed"
      class="custom-table performance-table"
      rowKey="key"
    >
      <template #summary>
        <a-table-summary fixed>
          <a-table-summary-row class="total-row">
            <a-table-summary-cell :index="0" class="first-cell">合计</a-table-summary-cell>
            <a-table-summary-cell :index="1" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--count"><span class="tabular-num metric-slot__value metric-neutral drilldown-value" title="点击查看明细" @click="goToLedgerCenter">{{ performanceTotalRow.headcount }}</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="2" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--count"><span class="tabular-num metric-slot__value metric-neutral drilldown-value" title="点击查看明细" @click="goToLedgerCenter">{{ performanceTotalRow.effective }}</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="3" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--amount"><span class="tabular-num metric-slot__value metric-neutral drilldown-value" title="点击查看明细" @click="goToLedgerCenter">{{ formatAmount(performanceTotalRow.revenue) }}</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="4" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--amount"><span class="tabular-num metric-slot__value metric-neutral drilldown-value" title="点击查看明细" @click="goToLedgerCenter">{{ formatAmount(performanceTotalRow.procurement) }}</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="5" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--amount"><span class="tabular-num metric-slot__value metric-neutral drilldown-value" title="点击查看明细" @click="goToLedgerCenter">{{ formatAmount(performanceTotalRow.grossProfit) }}</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="6" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--placeholder"><span class="tabular-num metric-slot__value metric-neutral">--</span></span></span></a-table-summary-cell>
            <a-table-summary-cell :index="7" class="number-col"><span class="metric-slot-wrapper"><span class="metric-slot metric-slot--placeholder"><span class="tabular-num metric-slot__value metric-neutral">--</span></span></span></a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { computed, h } from 'vue';
import { useRouter } from 'vue-router';
import { performanceTableData, performanceTotalRow } from '@/data/dashboardData';

const router = useRouter();
const formatAmount = (value) => Number(value).toFixed(2);

const goToLedgerCenter = () => {
  router.push({
    name: 'ledger-center',
    query: { from: 'dashboard' }
  });
};

const getSlotClass = (kind) => {
  if (kind === 'count') return 'metric-slot metric-slot--count'
  if (kind === 'placeholder') return 'metric-slot metric-slot--placeholder'
  return 'metric-slot metric-slot--amount'
}

const getMetricClass = (metricKey, value) => {
  const numericValue = Number(value);

  if (numericValue === 0) {
    return 'metric-zero';
  }

  if (metricKey === 'profit') {
    if (numericValue < 0) return 'metric-negative';
    if (numericValue > 0) return 'metric-positive';
  }

  return 'metric-neutral';
};

const renderMetricValue = (kind, text, extraClasses = [], title = null) =>
  h(
    'span',
    { class: 'metric-slot-wrapper' },
    [
      h(
        'span',
        { class: getSlotClass(kind) },
        [
          h(
            'span',
            {
              class: ['tabular-num', 'metric-slot__value', ...extraClasses],
              title,
              onClick: extraClasses.includes('drilldown-value') ? goToLedgerCenter : undefined
            },
            text
          )
        ]
      )
    ]
  )

const renderMetricHeader = (kind, label) =>
  h(
    'span',
    { class: 'metric-slot-wrapper metric-header-slot-wrapper' },
    [
      h(
        'span',
        { class: kind === 'count' ? 'metric-header-slot metric-header-slot--count' : 'metric-header-slot metric-header-slot--amount' },
        label
      )
    ]
  )

const columns = computed(() => {
  return [
    { title: '责任部门', dataIndex: 'dept', key: 'dept', width: 180 },
    { title: renderMetricHeader('count', '商机数'), dataIndex: 'headcount', key: 'headcount', width: 96, align: 'center', customRender: ({ text }) => renderMetricValue('count', text, ['metric-neutral', 'drilldown-value'], '点击查看明细') },
    { title: renderMetricHeader('count', '有效商机'), dataIndex: 'effective', key: 'effective', width: 104, align: 'center', customRender: ({ text }) => renderMetricValue('count', text, ['metric-neutral', 'drilldown-value'], '点击查看明细') },
    { 
      title: renderMetricHeader('amount', '收入'), dataIndex: 'revenue', key: 'revenue', width: 116, align: 'center',
      customRender: ({ text }) => renderMetricValue('amount', formatAmount(text), [getMetricClass('revenue', text), 'drilldown-value'], '点击查看明细')
    },
    { 
      title: renderMetricHeader('amount', '采购'), dataIndex: 'procurement', key: 'procurement', width: 116, align: 'center',
      customRender: ({ text }) => renderMetricValue('amount', formatAmount(text), [getMetricClass('procurement', text), 'drilldown-value'], '点击查看明细')
    },
    { 
      title: renderMetricHeader('amount', '毛利'), dataIndex: 'grossProfit', key: 'grossProfit', width: 116, align: 'center',
      customRender: ({ text }) => renderMetricValue('amount', formatAmount(text), [getMetricClass('grossProfit', text), 'drilldown-value'], '点击查看明细')
    },
    { 
      title: renderMetricHeader('amount', '成本'), dataIndex: 'cost', key: 'cost', width: 116, align: 'center',
      customRender: () => renderMetricValue('placeholder', '--', ['metric-neutral'])
    },
    { 
      title: renderMetricHeader('amount', '利润'), dataIndex: 'profit', key: 'profit', width: 116, align: 'center',
      customRender: () => renderMetricValue('placeholder', '--', ['metric-neutral'])
    }
  ];
});
</script>

<style scoped src="@/components/dashboard/styles/DashboardPerformanceTable.css"></style>
