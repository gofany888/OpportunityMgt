<template>
  <a-card :bordered="false" class="dashboard-card-wrapper discrepancy-table-card">
    <div class="card-header">
      <div class="header-left-title">
        <span class="dashboard-section-title">
          <i class="fa-solid fa-triangle-exclamation icon-title"></i>
          核对差异
        </span>
      </div>
      <div class="discrepancy-unit-note">单位：金额(万元) / 个数</div>
    </div>
    
    <a-table 
      :dataSource="discrepancyTableData" 
      :columns="columns"
      :pagination="false"
      size="middle"
      class="custom-grouped-table discrepancy-table"
      rowKey="key"
    >
      <template #summary>
        <a-table-summary fixed>
          <a-table-summary-row class="total-row">
            <a-table-summary-cell :index="0" class="first-cell">合计</a-table-summary-cell>
            
            <a-table-summary-cell :index="1" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--count"><span :class="['metric-slot__value', getValueClass('deptHasCount', discrepancyTotalRow.deptHasCount), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('deptHasCount', discrepancyTotalRow.deptHasCount) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="2" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--amount"><span :class="['metric-slot__value', getValueClass('deptHasAmt', discrepancyTotalRow.deptHasAmt), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('deptHasAmt', discrepancyTotalRow.deptHasAmt) }}</span></span></a-table-summary-cell>
            
            <a-table-summary-cell :index="3" class="center-col highlight-cell"><span class="metric-slot metric-slot--count"><span :class="['metric-slot__value', getValueClass('eisHasCount', discrepancyTotalRow.eisHasCount), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('eisHasCount', discrepancyTotalRow.eisHasCount) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="4" class="center-col highlight-cell"><span class="metric-slot metric-slot--amount"><span :class="['metric-slot__value', getValueClass('eisHasAmt', discrepancyTotalRow.eisHasAmt), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('eisHasAmt', discrepancyTotalRow.eisHasAmt) }}</span></span></a-table-summary-cell>
            
            <a-table-summary-cell :index="5" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--count"><span :class="['metric-slot__value', getValueClass('diffRevCount', discrepancyTotalRow.diffRevCount), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffRevCount', discrepancyTotalRow.diffRevCount) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="6" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--amount"><span :class="['metric-slot__value', getValueClass('diffRevAmt', discrepancyTotalRow.diffRevAmt), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffRevAmt', discrepancyTotalRow.diffRevAmt) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="7" class="center-col highlight-cell"><span class="metric-slot metric-slot--count"><span :class="['metric-slot__value', getValueClass('diffProcCount', discrepancyTotalRow.diffProcCount), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffProcCount', discrepancyTotalRow.diffProcCount) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="8" class="center-col highlight-cell"><span class="metric-slot metric-slot--amount"><span :class="['metric-slot__value', getValueClass('diffProcAmt', discrepancyTotalRow.diffProcAmt), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffProcAmt', discrepancyTotalRow.diffProcAmt) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="9" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--count"><span :class="['metric-slot__value', getValueClass('diffGrossCount', discrepancyTotalRow.diffGrossCount), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffGrossCount', discrepancyTotalRow.diffGrossCount) }}</span></span></a-table-summary-cell>
            <a-table-summary-cell :index="10" class="center-col highlight-cell is-zebra-column"><span class="metric-slot metric-slot--amount"><span :class="['metric-slot__value', getValueClass('diffGrossAmt', discrepancyTotalRow.diffGrossAmt), 'drilldown-value']" title="点击查看明细" @click="goToEisAudit">{{ formatDisplayValue('diffGrossAmt', discrepancyTotalRow.diffGrossAmt) }}</span></span></a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { computed, h } from 'vue';
import { useRouter } from 'vue-router';
import { discrepancyTableData, discrepancyTotalRow } from '@/data/dashboardData';

const router = useRouter();
const amountFields = new Set([
  'deptHasAmt',
  'eisHasAmt',
  'diffRevAmt',
  'diffProcAmt',
  'diffGrossAmt'
]);

const discrepancyFields = new Set([
  'diffRevCount',
  'diffRevAmt',
  'diffProcCount',
  'diffProcAmt',
  'diffGrossCount',
  'diffGrossAmt'
]);

const formatValue = (key, value) => {
  const numericValue = Number(value);
  return amountFields.has(key) ? numericValue.toFixed(2) : String(numericValue);
};

const formatDisplayValue = (key, value) => {
  const formattedValue = formatValue(key, value);
  const numericValue = Number(value);
  return discrepancyFields.has(key) && numericValue > 0 ? `+${formattedValue}` : formattedValue;
};

const goToEisAudit = () => {
  router.push({
    name: 'eis-audit',
    query: { from: 'dashboard' }
  });
};

const getValueClass = (key, value) => {
  const numericValue = Number(value);

  if (numericValue === 0) {
    return 'metric-zero';
  }

  if (discrepancyFields.has(key)) {
    return numericValue > 0 ? 'metric-error' : 'metric-success';
  }

  return 'metric-neutral';
};

const renderClickableValue = (key, val) => {
  const isCount = key.toLowerCase().includes('count');
  const slotClass = isCount ? 'metric-slot metric-slot--count' : 'metric-slot metric-slot--amount';
  return h(
    'span',
    { class: slotClass },
    [
      h(
        'span',
        { class: ['tabular-num', 'drilldown-value', 'metric-slot__value', getValueClass(key, val)], title: '点击查看明细', onClick: goToEisAudit },
        formatDisplayValue(key, val)
      )
    ]
  );
};

const appendHeaderClass = (baseClass, extraClass) => ({
  class: [baseClass, extraClass].filter(Boolean).join(' ')
});

const appendCellClass = (extraClass) => ({
  class: extraClass
});

const columns = computed(() => {
  return [
    { 
      title: '责任部门', 
      dataIndex: 'dept', 
      key: 'dept', 
      width: 140,
      fixed: 'left',
      customHeaderCell: () => ({ class: 'is-main-group' }),
      customRender: ({text}) => h('span', { class: 'dept-text' }, text)
    },
    { 
      title: () => h('div', { style: 'text-align: center;' }, [
        h('div', { class: 'group-header-title' }, '仅BG台账包含')
      ]),
      customHeaderCell: () => ({ class: 'group-header-cell is-main-group', rowSpan: 2 }),
      children: [
        {
          title: '',
          key: 'dept-has-bridge',
          customHeaderCell: () => ({ class: 'header-bridge-cell is-sub-group', rowSpan: 0 }),
          children: [
            { title: '个数', dataIndex: 'deptHasCount', key: 'deptHasCount', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('deptHasCount', text) },
            { title: '金额', dataIndex: 'deptHasAmt', key: 'deptHasAmt', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('deptHasAmt', text) }
          ]
        }
      ]
    },
    { 
      title: () => h('div', { style: 'text-align: center;' }, [
        h('div', { class: 'group-header-title' }, '仅EIS包含')
      ]),
      customHeaderCell: () => ({ class: 'group-header-cell is-main-group', rowSpan: 2 }),
      children: [
        {
          title: '',
          key: 'eis-has-bridge',
          customHeaderCell: () => ({ class: 'header-bridge-cell is-sub-group', rowSpan: 0 }),
          children: [
            { title: '个数', dataIndex: 'eisHasCount', key: 'eisHasCount', align: 'center', width: 80, customHeaderCell: () => ({ class: 'is-leaf-metric' }), customRender: ({ text }) => renderClickableValue('eisHasCount', text) },
            { title: '金额', dataIndex: 'eisHasAmt', key: 'eisHasAmt', align: 'center', width: 80, customHeaderCell: () => ({ class: 'is-leaf-metric' }), customRender: ({ text }) => renderClickableValue('eisHasAmt', text) }
          ]
        }
      ]
    },
    { 
      title: () => h('div', { class: 'group-header-title' }, '偏差差异明细'),
      customHeaderCell: () => ({ class: 'group-header-cell is-main-group' }),
      children: [
        { 
          title: '收入', 
          customHeaderCell: () => ({ class: 'subgroup-header-cell is-sub-group' }),
          children: [
            { title: '个数', dataIndex: 'diffRevCount', key: 'diffRevCount', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('diffRevCount', text) },
            { title: '金额', dataIndex: 'diffRevAmt', key: 'diffRevAmt', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('diffRevAmt', text) }
          ]
        },
        { 
          title: '采购', 
          customHeaderCell: () => ({ class: 'subgroup-header-cell is-sub-group' }),
          children: [
            { title: '个数', dataIndex: 'diffProcCount', key: 'diffProcCount', align: 'center', width: 80, customHeaderCell: () => ({ class: 'is-leaf-metric' }), customRender: ({ text }) => renderClickableValue('diffProcCount', text) },
            { title: '金额', dataIndex: 'diffProcAmt', key: 'diffProcAmt', align: 'center', width: 80, customHeaderCell: () => ({ class: 'is-leaf-metric' }), customRender: ({ text }) => renderClickableValue('diffProcAmt', text) }
          ]
        },
        { 
          title: '毛利', 
          customHeaderCell: () => ({ class: 'subgroup-header-cell is-sub-group' }),
          children: [
            { title: '个数', dataIndex: 'diffGrossCount', key: 'diffGrossCount', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('diffGrossCount', text) },
            { title: '金额', dataIndex: 'diffGrossAmt', key: 'diffGrossAmt', align: 'center', width: 80, customHeaderCell: () => appendHeaderClass('is-leaf-metric', ''), customCell: () => appendCellClass('is-zebra-column'), customRender: ({ text }) => renderClickableValue('diffGrossAmt', text) }
          ]
        }
      ]
    }
  ];
});
</script>

<style scoped src="@/components/dashboard/styles/DashboardDiscrepancyTable.css"></style>
