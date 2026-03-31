<template>
  <a-card :bordered="false" class="detail-milestone-card">
    <template #title>
      <div class="detail-section-title">
        <FlagOutlined class="detail-section-title-icon" />
        <span>{{ milestoneConfig.title }}</span>
      </div>
    </template>
    <template #extra>
      <div class="detail-milestone-toolbar">
        <span class="detail-milestone-toolbar-label">招标类型：</span>
        <div
          class="detail-milestone-bid-type-editor"
          data-field-key="bidType"
          @click.stop="startBidTypeEdit"
        >
          <a-select
            v-if="isEditingBidType"
            :value="selectedBidType"
            :options="bidTypeOptions"
            allow-clear
            open
            autofocus
            class="detail-milestone-bid-type-select"
            @change="handleBidTypeSelectChange"
          />
          <div
            v-else
            :class="['detail-milestone-bid-type-display', { 'is-modified': bidTypeModified }]"
          >
            <span class="detail-milestone-bid-type-text">{{ selectedBidType || '--' }}</span>
            <EditOutlined class="inline-edit-icon" />
            <span v-if="bidTypeModified" class="modified-dot"></span>
          </div>
        </div>
      </div>
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
            v-if="isActualEditorVisible(record)"
            :class="['detail-actual-editors', { 'is-processing': record.statusType === 'processing' }]"
          >
            <div class="detail-actual-editor-stack">
              <div class="detail-actual-editor-row">
                <a-date-picker
                  v-model:value="record.actualStart"
                  :locale="zhCN"
                  value-format="YYYY-MM-DD"
                  placeholder="开始日期"
                  class="detail-actual-picker"
                  @change="(value) => handleActualDateChange(record, 'actualStart', value)"
                />
                <span class="detail-actual-divider">~</span>
                <a-date-picker
                  v-model:value="record.actualEnd"
                  :locale="zhCN"
                  value-format="YYYY-MM-DD"
                  placeholder="结束日期"
                  class="detail-actual-picker"
                  @change="(value) => handleActualDateChange(record, 'actualEnd', value)"
                />
              </div>
              <div v-if="actualValidationMessages[record.key]" class="detail-actual-error">
                {{ actualValidationMessages[record.key] }}
              </div>
            </div>
          </div>
          <a-typography-text v-else class="detail-milestone-date-text" type="secondary">
            {{ record.actualText || '--' }}
          </a-typography-text>
        </template>

        <template v-else-if="column.dataIndex === 'proof'">
          <div class="detail-proof-cell">
            <template v-if="record.level === 'item' && record.uploadState === 'uploading'">
              <a-tooltip :title="record.fileName ? `上传中：${record.fileName}` : '上传中...'">
                <div class="detail-proof-progress-shell">
                  <a-progress
                    type="circle"
                    :percent="record.uploadProgress || 0"
                    :size="20"
                    :stroke-width="14"
                    :show-info="false"
                    status="active"
                  />
                </div>
              </a-tooltip>
              <a-tooltip title="下载附件">
                <a-button
                  type="text"
                  size="small"
                  class="detail-proof-icon-button is-download is-disabled"
                  disabled
                >
                  <template #icon>
                    <DownloadOutlined class="detail-proof-icon is-download" />
                  </template>
                </a-button>
              </a-tooltip>
            </template>
            <template v-else-if="record.level === 'item' && record.proof === 'done'">
              <a-tooltip title="修改附件">
                <a-button
                  type="text"
                  size="small"
                  class="detail-proof-icon-button is-attached"
                  @click.stop="triggerAttachmentPicker(record)"
                >
                  <template #icon>
                    <PaperClipOutlined class="detail-proof-icon is-attachment is-attached" />
                  </template>
                </a-button>
              </a-tooltip>
              <a-tooltip title="下载附件">
                <a-button
                  type="text"
                  size="small"
                  class="detail-proof-icon-button is-download"
                  :disabled="record.uploadState === 'uploading'"
                  @click.stop="handleAttachmentDownload(record)"
                >
                  <template #icon>
                    <DownloadOutlined class="detail-proof-icon is-download" />
                  </template>
                </a-button>
              </a-tooltip>
            </template>
            <a-tooltip
              v-else-if="
                record.level === 'item' &&
                record.proof === 'upload' &&
                ['processing', 'success'].includes(record.statusType)
              "
            >
              <template #title>上传附件</template>
              <a-button
                type="text"
                size="small"
                class="detail-proof-icon-button is-upload"
                @click.stop="triggerAttachmentPicker(record)"
              >
                <template #icon>
                  <PaperClipOutlined class="detail-proof-icon is-attachment is-upload" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip
              v-else-if="
                record.level === 'stage' &&
                getStageProofSummary(record).visible &&
                getStageProofSummary(record).state === 'none'
              "
              title="子环节均未上传附件"
            >
              <MinusCircleOutlined class="detail-proof-summary-icon is-none" />
            </a-tooltip>
            <a-tooltip
              v-else-if="
                record.level === 'stage' &&
                getStageProofSummary(record).visible &&
                getStageProofSummary(record).state === 'partial'
              "
              title="已有部分子环节上传附件"
            >
              <ExclamationCircleOutlined class="detail-proof-summary-icon is-partial" />
            </a-tooltip>
            <a-tooltip
              v-else-if="
                record.level === 'stage' &&
                getStageProofSummary(record).visible &&
                getStageProofSummary(record).state === 'all'
              "
              title="子环节均已上传附件"
            >
              <CheckCircleFilled class="detail-proof-summary-icon is-all" />
            </a-tooltip>
            <a-typography-text v-else type="secondary">--</a-typography-text>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'planned'">
          <div v-if="isPlannedEditorVisible(record)" class="detail-plan-editor-stack">
            <a-range-picker
              :value="record.plannedRange"
              :locale="zhCN"
              :placeholder="['开始日期', '结束日期']"
              :separator="plannedRangeSeparator"
              value-format="YYYY-MM-DD"
              size="small"
              class="detail-range-picker"
              @change="(value) => handlePlannedRangeChange(record, value)"
            />
            <div v-if="plannedValidationMessages[record.key]" class="detail-plan-error">
              {{ plannedValidationMessages[record.key] }}
            </div>
          </div>
          <a-typography-text v-else class="detail-milestone-date-text">
            {{ getRecordPlannedText(record) }}
          </a-typography-text>
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <span :class="['detail-milestone-status-text', `is-${record.statusType || 'default'}`]">
            {{ record.status }}
          </span>
        </template>
      </template>
    </a-table>
    <input
      ref="attachmentInputRef"
      type="file"
      class="detail-proof-file-input"
      @change="handleAttachmentFileChange"
    />
  </a-card>
</template>

<script setup>
import { computed, h, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import zhCN from 'ant-design-vue/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import {
  CheckCircleFilled,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FlagOutlined,
  MinusCircleOutlined,
  PaperClipOutlined,
  UpOutlined,
} from '@ant-design/icons-vue'
import { financeProfileConfig, milestoneConfig, milestoneRows } from '@/data/detailPageData'

dayjs.locale('zh-cn')

const parseActualRange = (actualText) => {
  if (!actualText || actualText === '--' || !actualText.includes('~')) {
    return { start: undefined, end: undefined }
  }

  const [startText, endText] = actualText.split('~').map((item) => item.trim())

  return {
    start: startText && startText !== '--' ? startText : undefined,
    end: endText && endText !== '--' ? endText : undefined,
  }
}

const parsePlannedRange = (plannedText) => {
  if (!plannedText || plannedText === '--' || !plannedText.includes('~')) {
    return undefined
  }

  const [startText, endText] = plannedText.split('~').map((item) => item.trim())

  if (!startText || !endText || startText === '--' || endText === '--') {
    return undefined
  }

  return [startText, endText]
}

const cloneRows = (rows, parentKey) =>
  rows.map((row) => ({
    ...row,
    parentKey,
    hasChildren: Boolean(row.children?.length),
    plannedRange: row.plannedRange ? [...row.plannedRange] : parsePlannedRange(row.plannedText),
    actualStart: row.actualStart || parseActualRange(row.actualText).start,
    actualEnd: row.actualEnd || parseActualRange(row.actualText).end,
    actualStartAutoFilled: false,
    actualEndAutoFilled: false,
    uploadState: row.uploadState || 'idle',
    uploadProgress: row.uploadProgress || 0,
    fileName: row.fileName || '',
    children: row.children ? cloneRows(row.children, row.key) : undefined,
  }))

const tableData = reactive(cloneRows(milestoneRows))
const expandedRowKeys = ref(
  tableData.filter((row) => row.level === 'stage' && row.statusType === 'processing').map((row) => row.key)
)
const actualValidationMessages = reactive({})
const plannedValidationMessages = reactive({})

const columns = [
  { title: '环节阶段 / 具体子项', dataIndex: 'stage', key: 'stage', width: '28%' },
  { title: '经营实际时刻 (PM 填报)', dataIndex: 'actual', key: 'actual', width: '23%' },
  { title: '证明材料', dataIndex: 'proof', key: 'proof', width: 188, align: 'center' },
  { title: '计划周期', dataIndex: 'planned', key: 'planned', width: '27%' },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 156, align: 'right' },
]

const getCurrentBidType = () =>
  financeProfileConfig.fields.find((field) => field.key === 'bidType')?.value ?? ''

const bidTypeOptions = financeProfileConfig.fields
  .find((field) => field.key === 'bidType')
  ?.options.map((option) => ({ label: option, value: option })) || []

const selectedBidType = ref(getCurrentBidType())
const initialBidType = ref(getCurrentBidType())
const isEditingBidType = ref(false)
const plannedRangeSeparator = h('span', { class: 'detail-range-separator-text' }, '~')
const attachmentInputRef = ref(null)
const activeAttachmentRecordKey = ref('')

const procurementStageTemplates = {
  '': ['采购需求', '采购方案', '采购结果'],
  '公开招标': ['采购需求', '采购方案', '公告发布', '文件投递截止及递交', '候选人公示', '采购结果'],
  '公开询比': ['采购需求', '采购方案', '公告发布', '文件投递截止及递交', '候选人公示', '采购结果'],
  '直接采购（单一来源）': ['采购需求', '采购方案', '公告发布', '候选人公示', '采购结果'],
  '框架下订单': ['采购需求', '采购方案', '订单生成'],
  '原子能力下单': ['采购需求', '采购方案', '订单生成'],
}

const isExpanded = (key) => expandedRowKeys.value.includes(key)

const toggleExpand = (key) => {
  expandedRowKeys.value = isExpanded(key)
    ? expandedRowKeys.value.filter((item) => item !== key)
    : [...expandedRowKeys.value, key]
}

const setBidTypeValue = (value) => {
  const bidTypeField = financeProfileConfig.fields.find((field) => field.key === 'bidType')

  if (bidTypeField) {
    bidTypeField.value = value
  }

  selectedBidType.value = value
}

const bidTypeModified = computed(() => selectedBidType.value !== initialBidType.value)

const rebuildProcurementStage = (bidType) => {
  const procurementStage = tableData.find((row) => row.key === 'l4')

  if (!procurementStage) {
    return
  }

  const steps = procurementStageTemplates[bidType] || procurementStageTemplates['']
  procurementStage.stage = bidType ? `L4. 采购环节（${bidType}）` : 'L4. 采购环节'

  procurementStage.children = steps.map((stageName, index) => ({
    key: `l4-${index + 1}`,
    parentKey: procurementStage.key,
    level: 'item',
    stage: stageName,
    currentTag: '',
    linkTag: stageName === '公告发布' ? 'EIS 认定进度' : '',
    actualEditable: false,
    actualStart: '',
    actualEnd: '',
    actualText: '--',
    proof: 'none',
    uploadState: 'idle',
    uploadProgress: 0,
    fileName: '',
    plannedText: '--',
    plannedRange: undefined,
    planEditable: true,
    status: '计划中',
    statusType: 'default',
  }))
  procurementStage.hasChildren = true
}

const formatActualRangeText = (start, end) => {
  if (start && end) {
    return `${start} ~ ${end}`
  }

  if (start) {
    return `${start} ~ --`
  }

  if (end) {
    return `-- ~ ${end}`
  }

  return '--'
}

const formatPlannedRangeText = (range) => {
  if (!range?.length) {
    return '--'
  }

  const [start, end] = range

  if (start && end) {
    return `${start} ~ ${end}`
  }

  return '--'
}

const findRowByKey = (rows, key) => {
  for (const row of rows) {
    if (row.key === key) {
      return row
    }

    if (row.children?.length) {
      const matched = findRowByKey(row.children, key)

      if (matched) {
        return matched
      }
    }
  }

  return null
}

const getPreviousSibling = (record) => {
  if (!record.parentKey) {
    return null
  }

  const parent = findRowByKey(tableData, record.parentKey)

  if (!parent?.children?.length) {
    return null
  }

  const currentIndex = parent.children.findIndex((child) => child.key === record.key)

  if (currentIndex <= 0) {
    return null
  }

  return parent.children[currentIndex - 1]
}

const getPreviousTopLevelStage = (record) => {
  if (record.parentKey) {
    const parent = findRowByKey(tableData, record.parentKey)

    if (parent) {
      return parent
    }
  }

  const currentIndex = tableData.findIndex((row) => row.key === record.key)

  if (currentIndex <= 0) {
    return null
  }

  return tableData[currentIndex - 1]
}

const getPreviousSequentialEnd = (record) => {
  const previousSibling = getPreviousSibling(record)

  if (previousSibling?.actualEnd) {
    return previousSibling.actualEnd
  }

  const previousTopLevelStage = getPreviousTopLevelStage(record)

  if (!previousTopLevelStage) {
    return ''
  }

  return getStageActualRange(previousTopLevelStage).end || ''
}

const getPreviousSequentialPlannedEnd = (record) => {
  const previousSibling = getPreviousSibling(record)

  if (previousSibling?.plannedRange?.[1]) {
    return previousSibling.plannedRange[1]
  }

  const previousTopLevelStage = getPreviousTopLevelStage(record)

  if (!previousTopLevelStage) {
    return ''
  }

  if (previousTopLevelStage.hasChildren && previousTopLevelStage.children?.length) {
    const lastChild = previousTopLevelStage.children[previousTopLevelStage.children.length - 1]
    return lastChild?.plannedRange?.[1] || ''
  }

  return previousTopLevelStage.plannedRange?.[1] || ''
}

const getNextSequentialTarget = (record) => {
  if (record.parentKey) {
    const parent = findRowByKey(tableData, record.parentKey)

    if (!parent?.children?.length) {
      return null
    }

    const currentIndex = parent.children.findIndex((child) => child.key === record.key)
    const nextChild = parent.children[currentIndex + 1]

    if (nextChild) {
      return { target: nextChild, expandStageKey: null }
    }

    const parentIndex = tableData.findIndex((row) => row.key === parent.key)
    const nextStage = tableData[parentIndex + 1]

    if (!nextStage) {
      return null
    }

    if (nextStage.hasChildren && nextStage.children?.length) {
      return { target: nextStage.children[0], expandStageKey: nextStage.key }
    }

    return { target: nextStage, expandStageKey: null }
  }

  const currentIndex = tableData.findIndex((row) => row.key === record.key)
  const nextStage = tableData[currentIndex + 1]

  if (!nextStage) {
    return null
  }

  if (nextStage.hasChildren && nextStage.children?.length) {
    return { target: nextStage.children[0], expandStageKey: nextStage.key }
  }

  return { target: nextStage, expandStageKey: null }
}

const getStageActualRange = (record) => {
  if (!record.hasChildren || !record.children?.length) {
    return {
      start: record.actualStart,
      end: record.actualEnd,
      text: record.actualText || formatActualRangeText(record.actualStart, record.actualEnd),
    }
  }

  const firstChild = record.children[0]
  const lastChild = record.children[record.children.length - 1]
  const start = firstChild?.actualStart || ''
  const end = lastChild?.actualEnd || ''

  return {
    start,
    end,
    text: formatActualRangeText(start, end),
  }
}

const getStagePlannedRange = (record) => {
  if (!record.hasChildren || !record.children?.length) {
    return {
      start: record.plannedRange?.[0] || '',
      end: record.plannedRange?.[1] || '',
      text: record.plannedText || formatPlannedRangeText(record.plannedRange),
    }
  }

  const firstChild = record.children[0]
  const lastChild = record.children[record.children.length - 1]
  const fallbackStart = record.plannedRange?.[0] || ''
  const fallbackEnd = record.plannedRange?.[1] || ''
  const start = firstChild?.plannedRange?.[0] || fallbackStart
  const end = lastChild?.plannedRange?.[1] || fallbackEnd

  return {
    start,
    end,
    text: formatPlannedRangeText(start && end ? [start, end] : undefined),
  }
}

const getRecordActualText = (record) => {
  if (record.level === 'stage') {
    return getStageActualRange(record).text
  }

  if (!record.actualStart && !record.actualEnd && record.actualText) {
    return record.actualText
  }

  return formatActualRangeText(record.actualStart, record.actualEnd)
}

const getRecordPlannedText = (record) => {
  if (record.level === 'stage' && record.hasChildren && record.statusType === 'processing') {
    return getStagePlannedRange(record).text
  }

  if (!record.plannedRange?.length && record.plannedText) {
    return record.plannedText
  }

  return formatPlannedRangeText(record.plannedRange)
}

const applySequentialActualStart = (record, endValue) => {
  if (!endValue) {
    return
  }

  const nextTargetConfig = getNextSequentialTarget(record)

  if (!nextTargetConfig?.target) {
    return
  }

  const { target, expandStageKey } = nextTargetConfig

  if (expandStageKey && !expandedRowKeys.value.includes(expandStageKey)) {
    expandedRowKeys.value = [...expandedRowKeys.value, expandStageKey]
  }

  if (target.actualStart) {
    return
  }

  target.actualStart = dayjs(endValue).add(1, 'day').format('YYYY-MM-DD')
  target.actualStartAutoFilled = true
  target.actualEditable = true
}

const clearSequentialActualStart = (record) => {
  const nextTargetConfig = getNextSequentialTarget(record)

  if (!nextTargetConfig?.target) {
    return
  }

  const { target } = nextTargetConfig

  if (target.actualStartAutoFilled) {
    target.actualStart = undefined
    target.actualStartAutoFilled = false
  }

  if (target.actualEndAutoFilled) {
    target.actualEnd = undefined
    target.actualEndAutoFilled = false
  }
}

const handleActualDateChange = (record, field, value) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return
  }

  const nextValue = value || ''
  const nextStart = field === 'actualStart' ? nextValue : targetRecord.actualStart
  const nextEnd = field === 'actualEnd' ? nextValue : targetRecord.actualEnd
  const previousSequentialEnd = getPreviousSequentialEnd(targetRecord)

  if (
    field === 'actualStart' &&
    nextStart &&
    previousSequentialEnd &&
    dayjs(nextStart).isBefore(dayjs(previousSequentialEnd), 'day')
  ) {
    actualValidationMessages[targetRecord.key] = '实际开始时间不能小于上一环节结束时间'
    targetRecord.actualStart = undefined
    targetRecord.actualStartAutoFilled = false
    return
  }

  if (nextStart && nextEnd && dayjs(nextEnd).isBefore(dayjs(nextStart), 'day')) {
    actualValidationMessages[targetRecord.key] = '结束时间必须大于或等于开始时间'

    if (field === 'actualEnd') {
      targetRecord.actualEnd = undefined
      targetRecord.actualEndAutoFilled = false
    }

    return
  }

  delete actualValidationMessages[targetRecord.key]

  targetRecord[field] = nextValue

  if (field === 'actualStart') {
    targetRecord.actualStartAutoFilled = false
  }

  if (field === 'actualEnd') {
    targetRecord.actualEndAutoFilled = false
  }

  if (field === 'actualEnd' && value) {
    applySequentialActualStart(targetRecord, value)
  }

  if (field === 'actualEnd' && !value) {
    clearSequentialActualStart(targetRecord)
  }
}

const handlePlannedRangeChange = (record, value) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return
  }

  const nextRange = value ? [...value] : []
  const nextStart = nextRange?.[0] || ''
  const previousPlannedEnd = getPreviousSequentialPlannedEnd(targetRecord)

  if (
    nextStart &&
    previousPlannedEnd &&
    dayjs(nextStart).isBefore(dayjs(previousPlannedEnd), 'day')
  ) {
    plannedValidationMessages[targetRecord.key] = '计划开始时间不能小于上一环节结束时间'
    targetRecord.plannedRange = targetRecord.plannedRange ? [...targetRecord.plannedRange] : undefined
    return
  }

  delete plannedValidationMessages[targetRecord.key]
  targetRecord.plannedRange = nextRange.length ? nextRange : undefined
  targetRecord.plannedText = formatPlannedRangeText(targetRecord.plannedRange)
}

const triggerAttachmentPicker = (record) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord || targetRecord.level !== 'item' || targetRecord.uploadState === 'uploading') {
    return
  }

  activeAttachmentRecordKey.value = targetRecord.key

  if (attachmentInputRef.value) {
    attachmentInputRef.value.value = ''
    attachmentInputRef.value.click()
  }
}

const handleAttachmentFileChange = (event) => {
  const file = event.target?.files?.[0]

  if (!file || !activeAttachmentRecordKey.value) {
    return
  }

  const targetRecord = findRowByKey(tableData, activeAttachmentRecordKey.value)

  if (!targetRecord) {
    activeAttachmentRecordKey.value = ''
    return
  }

  targetRecord.uploadState = 'uploading'
  targetRecord.uploadProgress = 12
  targetRecord.fileName = file.name

  const targetKey = targetRecord.key

  window.setTimeout(() => {
    const latestRecord = findRowByKey(tableData, targetKey)

    if (latestRecord?.uploadState === 'uploading') {
      latestRecord.uploadProgress = 46
    }
  }, 500)

  window.setTimeout(() => {
    const latestRecord = findRowByKey(tableData, targetKey)

    if (latestRecord?.uploadState === 'uploading') {
      latestRecord.uploadProgress = 78
    }
  }, 1100)

  window.setTimeout(() => {
    const latestRecord = findRowByKey(tableData, targetKey)

    if (!latestRecord) {
      return
    }

    latestRecord.uploadProgress = 100
    latestRecord.uploadState = 'idle'
    latestRecord.proof = 'done'
    latestRecord.fileName = file.name
  }, 2000)

  activeAttachmentRecordKey.value = ''
}

const handleAttachmentDownload = (record) => {
  if (record.uploadState === 'uploading') {
    return
  }
}

const isActualEditorVisible = (record) => {
  if (record.statusType === 'success') {
    return false
  }

  if (record.hasChildren) {
    return false
  }

  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return false
  }

  if (targetRecord.actualEditable || targetRecord.actualStart || targetRecord.actualEnd) {
    return true
  }

  if (!targetRecord.parentKey) {
    const previousTopLevelStage = getPreviousTopLevelStage(targetRecord)

    if (!previousTopLevelStage) {
      return false
    }

    return Boolean(getStageActualRange(previousTopLevelStage).end)
  }

  const previousSibling = getPreviousSibling(targetRecord)

  return Boolean(previousSibling?.actualEnd)
}

const isPlannedEditorVisible = (record) => {
  if (record.statusType === 'success') {
    return false
  }

  if (record.level === 'stage') {
    if (record.hasChildren && record.statusType === 'processing') {
      return false
    }

    return ['default', 'processing'].includes(record.statusType)
  }

  const parentStage = record.parentKey ? findRowByKey(tableData, record.parentKey) : null

  if (parentStage?.statusType === 'processing') {
    return true
  }

  return Boolean(record.planEditable)
}

const getStageProofSummary = (record) => {
  if (record.statusType === 'default') {
    return { state: 'none', visible: false }
  }

  if (!record.hasChildren || !record.children?.length) {
    if (record.proof === 'done') {
      return { state: 'all', visible: true }
    }

    if (record.proof === 'upload') {
      return { state: 'none', visible: true }
    }

    return { state: 'none', visible: false }
  }

  const childProofs = record.children.map((child) => child.proof)
  const uploadedCount = childProofs.filter((proof) => proof === 'done').length

  if (uploadedCount === 0) {
    return { state: 'none', visible: true }
  }

  if (uploadedCount === childProofs.length) {
    return { state: 'all', visible: true }
  }

  return { state: 'partial', visible: true }
}

const displayTableData = computed(() =>
  tableData.flatMap((row) => [
    {
      ...row,
      actualText: getRecordActualText(row),
    },
    ...(row.hasChildren && isExpanded(row.key)
      ? row.children.map((child) => ({
          ...child,
          children: undefined,
          actualText: getRecordActualText(child),
        }))
      : []),
  ])
)

const hasUploadingAttachments = computed(() => {
  const walk = (rows) =>
    rows.some((row) => row.uploadState === 'uploading' || (row.children?.length && walk(row.children)))

  return walk(tableData)
})

const customRow = (record) => ({
  class: [
    record.level === 'stage' ? 'detail-stage-row' : '',
    record.level === 'item' ? 'detail-item-row' : '',
    record.active ? 'detail-active-row' : '',
  ].filter(Boolean).join(' '),
})

const startBidTypeEdit = () => {
  if (isEditingBidType.value) {
    return
  }

  isEditingBidType.value = true
}

const handleBidTypeChange = (event) => {
  const nextValue = event.detail ? event.detail.value : getCurrentBidType()
  setBidTypeValue(nextValue)
  rebuildProcurementStage(nextValue)
}

const handleBidTypeSelectChange = (value) => {
  const nextValue = value ?? ''
  setBidTypeValue(nextValue)
  rebuildProcurementStage(nextValue)
  isEditingBidType.value = false
  window.dispatchEvent(
    new CustomEvent('detail:bid-type-change', {
      detail: { value: nextValue },
    })
  )
}

const handleBidTypeOutsideClick = (event) => {
  if (!isEditingBidType.value) {
    return
  }

  const isInsideEditor = event.target.closest('.detail-milestone-bid-type-editor')
  const isDropdown = event.target.closest('.ant-select-dropdown')

  if (!isInsideEditor && !isDropdown) {
    isEditingBidType.value = false
  }
}

onMounted(() => {
  setBidTypeValue(getCurrentBidType())
  rebuildProcurementStage(getCurrentBidType())
  window.addEventListener('mousedown', handleBidTypeOutsideClick, true)
  window.addEventListener('detail:bid-type-change', handleBidTypeChange)
  window.dispatchEvent(
    new CustomEvent('detail:attachment-uploading-change', {
      detail: { uploading: hasUploadingAttachments.value },
    })
  )
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleBidTypeOutsideClick, true)
  window.removeEventListener('detail:bid-type-change', handleBidTypeChange)
  window.dispatchEvent(
    new CustomEvent('detail:attachment-uploading-change', {
      detail: { uploading: false },
    })
  )
})

watch(
  hasUploadingAttachments,
  (uploading) => {
    window.dispatchEvent(
      new CustomEvent('detail:attachment-uploading-change', {
        detail: { uploading },
      })
    )
  },
  { immediate: true }
)
</script>

<style scoped src="./styles/MilestoneTimeline.css"></style>
