<template>
  <a-card :bordered="false" class="detail-milestone-card">
    <template #title>
      <div class="detail-section-title">
        <FlagOutlined class="detail-section-title-icon" />
        <span>{{ milestoneConfig.title }}</span>
      </div>
    </template>
    <template #extra>
      <a-button type="primary" :icon="h(HistoryOutlined)">
        {{ milestoneConfig.actionText }}
      </a-button>
    </template>

    <a-table
      :columns="columns"
      :data-source="displayTableData"
      :pagination="false"
      :bordered="false"
      row-key="key"
      class="detail-milestone-table"
      :custom-row="customRow"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'stage'">
          <div class="detail-milestone-stage">
            <span :class="['detail-milestone-status-strip', `is-${record.statusType || 'default'}`]"></span>
            <span :class="['detail-milestone-stage-text', { 'is-active': record.active }]">
              {{ record.stage }}
            </span>
            <a-button
              v-if="record.hasChildren"
              type="text"
              size="small"
              class="detail-milestone-expand-btn is-inline"
              :icon="h(isExpanded(record.key) ? UpOutlined : DownOutlined)"
              @click.stop="toggleExpand(record.key)"
            />
            <a-tag v-if="record.currentTag" color="processing" class="detail-inline-tag">
              {{ record.currentTag }}
            </a-tag>
            <a-tag v-if="record.linkTag" color="blue" class="detail-inline-tag">
              {{ record.linkTag }}
            </a-tag>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'actual'">
          <div
            v-if="record.actualEditable"
            :class="['detail-actual-editors', { 'is-processing': record.statusType === 'processing' }]"
          >
            <a-date-picker
              v-model:value="record.actualStart"
              :locale="zhCN"
              value-format="YYYY-MM-DD"
              placeholder="开始日期"
              class="detail-actual-picker"
            />
            <span class="detail-actual-divider">~</span>
            <a-date-picker
              v-model:value="record.actualEnd"
              :locale="zhCN"
              value-format="YYYY-MM-DD"
              placeholder="结束日期"
              class="detail-actual-picker"
            />
          </div>
          <a-typography-text v-else class="detail-milestone-date-text" type="secondary">
            {{ record.actualText || '--' }}
          </a-typography-text>
        </template>

        <template v-else-if="column.dataIndex === 'proof'">
          <div class="detail-proof-cell">
            <CheckCircleFilled
              v-if="record.proof === 'done'"
              class="detail-proof-icon is-success"
            />
            <a-button
              v-else-if="record.proof === 'upload'"
              type="text"
              size="small"
              :icon="h(PaperClipOutlined)"
            />
            <a-typography-text v-else type="secondary">--</a-typography-text>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'planned'">
          <a-range-picker
            v-if="record.planEditable"
            v-model:value="record.plannedRange"
            :locale="zhCN"
            :placeholder="['开始日期', '结束日期']"
            value-format="YYYY-MM-DD"
            class="detail-range-picker"
          />
          <a-typography-text v-else class="detail-milestone-date-text">
            {{ record.plannedText }}
          </a-typography-text>
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <span :class="['detail-milestone-status-text', `is-${record.statusType || 'default'}`]">
            {{ record.status }}
          </span>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { computed, h, reactive, ref } from 'vue'
import zhCN from 'ant-design-vue/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import {
  CheckCircleFilled,
  DownOutlined,
  FlagOutlined,
  HistoryOutlined,
  PaperClipOutlined,
  UpOutlined,
} from '@ant-design/icons-vue'
import { milestoneConfig, milestoneRows } from '@/data/detailPageData'

dayjs.locale('zh-cn')

const cloneRows = (rows) =>
  rows.map((row) => ({
    ...row,
    hasChildren: Boolean(row.children?.length),
    plannedRange: row.plannedRange ? [...row.plannedRange] : undefined,
    actualStart: row.actualStart || undefined,
    actualEnd: row.actualEnd || undefined,
    children: row.children ? cloneRows(row.children) : undefined,
  }))

const tableData = reactive(cloneRows(milestoneRows))
const expandedRowKeys = ref(['l4'])

const columns = [
  { title: '环节阶段 / 具体子项', dataIndex: 'stage', key: 'stage', width: '36%' },
  { title: '经营实际时刻 (PM 填报)', dataIndex: 'actual', key: 'actual', width: '24%' },
  { title: '证明材料', dataIndex: 'proof', key: 'proof', width: 120, align: 'center' },
  { title: '计划周期', dataIndex: 'planned', key: 'planned', width: '26%' },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 120, align: 'right' },
]

const isExpanded = (key) => expandedRowKeys.value.includes(key)

const toggleExpand = (key) => {
  expandedRowKeys.value = isExpanded(key)
    ? expandedRowKeys.value.filter((item) => item !== key)
    : [...expandedRowKeys.value, key]
}

const displayTableData = computed(() =>
  tableData.flatMap((row) => [
    {
      ...row,
      children: undefined,
    },
    ...(row.hasChildren && isExpanded(row.key)
      ? row.children.map((child) => ({
          ...child,
          children: undefined,
        }))
      : []),
  ])
)

const customRow = (record) => ({
  class: [
    record.level === 'stage' ? 'detail-stage-row' : '',
    record.level === 'item' ? 'detail-item-row' : '',
    record.active ? 'detail-active-row' : '',
  ].filter(Boolean).join(' '),
})
</script>

<style scoped src="./styles/MilestoneTimeline.css"></style>
