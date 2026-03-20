<template>
  <a-card :bordered="false" class="detail-rolling-card">
    <template #title>
      <div class="detail-rolling-title">
        <div class="detail-rolling-icon">
          <TableOutlined />
        </div>
        <div>
          <div class="detail-rolling-main-title">{{ rollingForecastConfig.title }}</div>
          <div class="detail-rolling-subtitle">{{ rollingForecastConfig.subtitle }}</div>
        </div>
      </div>
    </template>
    <template #extra>
      <a-segmented
        v-model:value="confidence"
        :options="rollingForecastConfig.confidenceOptions"
      />
    </template>

    <a-table
      :columns="columns"
      :data-source="rollingForecastConfig.rows"
      :pagination="false"
      :bordered="false"
      size="small"
      class="detail-rolling-table ent-table"
      row-key="key"
      table-layout="fixed"
    >
      <template #headerCell="{ column }">
        <template v-if="column.hint">
          <div :class="['detail-rolling-header-cell', { 'is-forecast': column.monthTone === 'forecast' }]">
            <span>{{ column.title }}</span>
            <small>{{ column.hint }}</small>
          </div>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'metric'">
          <div :class="['detail-rolling-metric', getMetricGroupClass(record.key)]">
            <span v-if="isGroupTop(record.key)" class="detail-rolling-connector" aria-hidden="true">
              <span class="detail-rolling-connector-stem"></span>
              <span class="detail-rolling-connector-corner is-top"></span>
              <span class="detail-rolling-connector-corner is-bottom"></span>
            </span>
            <span :class="['detail-rolling-metric-icon', `is-${record.iconTone}`]">
              <component :is="rowIconMap[record.icon]" />
            </span>
            <div>
              <div class="detail-rolling-metric-title">{{ record.label }}</div>
              <div class="detail-rolling-metric-subtitle">{{ record.subtitle }}</div>
            </div>
          </div>
        </template>

        <template v-else>
          <span :class="getValueClass(column, record)">{{ record[column.dataIndex] }}</span>
        </template>
      </template>
    </a-table>

    <div class="detail-rolling-footer">
      <a-space :size="24" wrap>
        <a-space
          v-for="item in rollingForecastConfig.statusItems"
          :key="item.key"
          :size="8"
          align="center"
        >
          <span class="detail-rolling-status-dot" :style="{ background: item.color }"></span>
          <a-typography-text type="secondary">
            {{ item.label }}: <span class="detail-rolling-status-value">{{ item.value }}</span>
          </a-typography-text>
        </a-space>
      </a-space>
      <a-alert
        :message="rollingForecastConfig.warning"
        type="warning"
        show-icon
        class="detail-rolling-alert"
      />
    </div>
  </a-card>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import {
  DollarCircleOutlined,
  FileTextOutlined,
  LineChartOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  TableOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { rollingForecastConfig } from '@/data/detailPageData'

const confidence = ref(rollingForecastConfig.confidence)

const rowIconMap = {
  LineChartOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  RiseOutlined,
  WalletOutlined,
}

const monthToneMap = rollingForecastConfig.monthGroups.reduce((acc, group) => {
  group.months.forEach((month) => {
    acc[month.key] = month.tone
  })
  return acc
}, {})

const columns = [
  {
    title: '维度对标 / 月份',
    dataIndex: 'metric',
    key: 'metric',
    width: 180,
    customHeaderCell: () => ({ style: { textAlign: 'left' } }),
  },
  ...rollingForecastConfig.monthGroups.map((group) => ({
    title: group.title,
    key: group.key,
    children: group.months.map((month) => ({
      title: month.label,
      dataIndex: month.key,
      key: month.key,
      hint: month.hint,
      monthTone: month.tone,
      align: 'center',
      width: 58,
    })),
  })),
  {
    title: '年度合计',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    width: 90,
  },
]

const getValueClass = (column, record) => {
  if (column.dataIndex === 'total') {
    return ['detail-rolling-value', 'is-total', `is-${record.totalTone || 'default'}`]
  }

  if (monthToneMap[column.dataIndex] !== 'forecast') {
    return 'detail-rolling-value'
  }

  if (record.totalTone === 'danger') {
    return ['detail-rolling-value', 'is-danger']
  }

  if (record.totalTone === 'success') {
    return ['detail-rolling-value', 'is-success']
  }

  return ['detail-rolling-value', 'is-forecast']
}

const metricGroupClassMap = {
  'sales-income': 'is-group-top',
  'managed-income': 'is-group-bottom',
  'sales-procurement': 'is-group-top',
  'managed-procurement': 'is-group-bottom',
  'sales-profit': 'is-group-top',
  'managed-profit': 'is-group-bottom',
}

const getMetricGroupClass = (key) => metricGroupClassMap[key] || ''
const isGroupTop = (key) => metricGroupClassMap[key] === 'is-group-top'
</script>

<style scoped src="./styles/RollingForecast.css"></style>
