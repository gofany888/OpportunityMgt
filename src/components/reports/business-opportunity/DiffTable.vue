<template>
  <a-card :bordered="false" class="diff-table-card">
    <template #title>
      <div class="table-title">
        <div class="title-indicator"></div>
        <span>各组织单元对账明细</span>
      </div>
    </template>

    <a-table
      :columns="columns"
      :data-source="diffTableData"
      :pagination="false"
      :bordered="false"
      row-key="org"
      size="middle"
      class="diff-table"
      :custom-row="customRow"
    >
      <!-- 经营口径 - 有效数 -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'managedCount'">
          <div class="cell-count">{{ record.managed.count }}</div>
          <div v-if="record.managed.selfBuiltCount" class="cell-self-built">
            含{{ record.managed.selfBuiltCount }}项自建
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'managedIncome'">
          <span class="text-managed-income">{{ record.managed.income }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'managedProcurement'">
          {{ record.managed.procurement }}
        </template>
        <template v-else-if="column.dataIndex === 'managedProfit'">
          <span class="text-bold">{{ record.managed.profit }}</span>
        </template>

        <!-- 推盘口径 -->
        <template v-else-if="column.dataIndex === 'forecastCount'">
          <span class="text-forecast">{{ record.forecast.count }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'forecastIncome'">
          <span class="text-forecast-income">{{ record.forecast.income }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'forecastProcurement'">
          {{ record.forecast.procurement }}
        </template>
        <template v-else-if="column.dataIndex === 'forecastProfit'">
          <span class="text-forecast-income">{{ record.forecast.profit }}</span>
        </template>

        <!-- 差异分析 -->
        <template v-else-if="column.dataIndex === 'diffCount'">
          <span :class="record.diff.count > 0 ? 'text-diff-warn' : 'text-muted'">
            {{ record.diff.count > 0 ? '+' + record.diff.count : record.diff.count }}
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'diffIncome'">
          <span class="text-diff-danger">
            {{ record.diff.income > 0 ? '+' + record.diff.income : record.diff.income }}
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'diffProcurement'">
          <span class="text-muted">{{ record.diff.procurement }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'diffProfit'">
          <span class="text-diff-warn">
            {{ record.diff.profit > 0 ? '+' + record.diff.profit : record.diff.profit }}
          </span>
        </template>

        <!-- 组织名称 -->
        <template v-else-if="column.dataIndex === 'org'">
          <div class="org-cell">
            <span class="org-name">{{ record.org }}</span>
            <right-outlined class="org-jump-icon" />
          </div>
        </template>
      </template>

      <!-- 总计行 — agent.md: 双线兜底 + 高对比度提权 -->
      <template #summary>
        <a-table-summary fixed>
          <a-table-summary-row class="total-row">
            <a-table-summary-cell :index="0" class="total-org">
              {{ diffTableTotal.org }}
            </a-table-summary-cell>

            <a-table-summary-cell :index="1" class="total-cell total-managed">
              <div class="total-count">{{ diffTableTotal.managed.count }} <span class="total-unit">项</span></div>
              <div class="cell-self-built">含{{ diffTableTotal.managed.selfBuiltCount }}项PM自建</div>
            </a-table-summary-cell>
            <a-table-summary-cell :index="2" class="total-cell total-managed total-income-green">
              {{ diffTableTotal.managed.income }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="3" class="total-cell total-managed total-num">
              {{ diffTableTotal.managed.procurement }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="4" class="total-cell total-managed total-num">
              {{ diffTableTotal.managed.profit }}
            </a-table-summary-cell>

            <a-table-summary-cell :index="5" class="total-cell total-forecast total-num-blue">
              {{ diffTableTotal.forecast.count }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="6" class="total-cell total-forecast total-num-blue">
              {{ diffTableTotal.forecast.income }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="7" class="total-cell total-forecast total-num">
              {{ diffTableTotal.forecast.procurement }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="8" class="total-cell total-forecast total-num-blue">
              {{ diffTableTotal.forecast.profit }}
            </a-table-summary-cell>

            <a-table-summary-cell :index="9" class="total-cell total-diff total-num-orange">
              {{ diffTableTotal.diff.count }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="10" class="total-cell total-diff total-num-red">
              {{ diffTableTotal.diff.income }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="11" class="total-cell total-diff total-num">
              {{ diffTableTotal.diff.procurement }}
            </a-table-summary-cell>
            <a-table-summary-cell :index="12" class="total-cell total-diff total-num-orange">
              {{ diffTableTotal.diff.profit }}
            </a-table-summary-cell>
          </a-table-summary-row>
        </a-table-summary>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { RightOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'
import { diffTableData, diffTableTotal } from '@/data/businessOpportunityData'

const router = useRouter()

/** a-table 列配置 — 使用 children 实现分组表头 */
const columns = [
  {
    title: '组织单元 (二级部)',
    dataIndex: 'org',
    key: 'org',
    width: 180,
    customHeaderCell: () => ({
      style: { background: '#fafafa', textAlign: 'left', fontWeight: 600 },
    }),
    customCell: () => ({
      style: { textAlign: 'left' },
    }),
  },
  {
    title: '商机经营对账 (经营口径)',
    customHeaderCell: () => ({
      style: { background: '#f6ffed', color: '#389e0d', fontWeight: 600, borderBottom: '1px solid #d9f7be' },
    }),
    children: [
      {
        title: '有效数(含自建)',
        dataIndex: 'managedCount',
        key: 'managedCount',
        width: 120,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(246, 255, 237, 0.3)' } }),
      },
      {
        title: '收入规模',
        dataIndex: 'managedIncome',
        key: 'managedIncome',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(246, 255, 237, 0.3)' } }),
      },
      {
        title: '采购规模',
        dataIndex: 'managedProcurement',
        key: 'managedProcurement',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(246, 255, 237, 0.3)' } }),
      },
      {
        title: '经营毛利',
        dataIndex: 'managedProfit',
        key: 'managedProfit',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(246, 255, 237, 0.3)' } }),
      },
    ],
  },
  {
    title: '商机预测对标 (推盘口径)',
    customHeaderCell: () => ({
      style: { background: '#e6f4ff', color: '#0958d9', fontWeight: 600, borderBottom: '1px solid #bae0ff' },
    }),
    children: [
      {
        title: '有效数',
        dataIndex: 'forecastCount',
        key: 'forecastCount',
        width: 80,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(230, 244, 255, 0.3)' } }),
      },
      {
        title: '收入预测',
        dataIndex: 'forecastIncome',
        key: 'forecastIncome',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(230, 244, 255, 0.3)' } }),
      },
      {
        title: '采购预测',
        dataIndex: 'forecastProcurement',
        key: 'forecastProcurement',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(230, 244, 255, 0.3)' } }),
      },
      {
        title: '预测毛利',
        dataIndex: 'forecastProfit',
        key: 'forecastProfit',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(230, 244, 255, 0.3)' } }),
      },
    ],
  },
  {
    title: () => h('span', null, [
      '对账执行差异分析 ',
      h(ArrowDownOutlined, { style: { fontSize: '11px', marginLeft: '4px' } }),
    ]),
    customHeaderCell: () => ({
      style: { background: '#fff1f0', color: '#cf1322', fontWeight: 600, borderBottom: '1px solid #ffccc7' },
    }),
    children: [
      {
        title: '数量差',
        dataIndex: 'diffCount',
        key: 'diffCount',
        width: 80,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(255, 241, 240, 0.3)' } }),
      },
      {
        title: '收入差异',
        dataIndex: 'diffIncome',
        key: 'diffIncome',
        width: 100,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(255, 241, 240, 0.3)' } }),
      },
      {
        title: '采购差',
        dataIndex: 'diffProcurement',
        key: 'diffProcurement',
        width: 80,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(255, 241, 240, 0.3)' } }),
      },
      {
        title: '毛利差',
        dataIndex: 'diffProfit',
        key: 'diffProfit',
        width: 80,
        align: 'center',
        customHeaderCell: () => ({ style: { background: '#fafafa', fontSize: '12px' } }),
        customCell: () => ({ style: { background: 'rgba(255, 241, 240, 0.3)' } }),
      },
    ],
  },
]

/** 行点击跳转 + hover 样式 */
const customRow = (record) => ({
  onClick: () => router.push('/detail'),
  style: { cursor: 'pointer' },
})
</script>

<style scoped src="./styles/DiffTable.css"></style>
