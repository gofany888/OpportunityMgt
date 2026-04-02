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
            v-if="isEditingBidType && !isBidTypeReadOnly"
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
            <EditOutlined v-if="!isBidTypeReadOnly" class="inline-edit-icon" />
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
            :class="[
              'detail-actual-editors',
              { 'is-processing': getRecordDisplayStatus(record).statusType === 'processing' },
            ]"
          >
            <div class="detail-actual-editor-stack">
              <div class="detail-actual-editor-row">
                <a-date-picker
                  :value="getActualFieldValue(record, 'actualStart')"
                  :default-picker-value="getActualDefaultPickerValue(record, 'actualStart')"
                  :locale="zhCN"
                  :disabled-date="(current) => isActualStartDisabledDate(record, current)"
                  value-format="YYYY-MM-DD"
                  placeholder="开始日期"
                  class="detail-actual-picker"
                  @change="(value) => handleActualDateChange(record, 'actualStart', value)"
                />
                <span class="detail-actual-divider">~</span>
                <a-date-picker
                  :value="getActualFieldValue(record, 'actualEnd')"
                  :default-picker-value="getActualDefaultPickerValue(record, 'actualEnd')"
                  :locale="zhCN"
                  :disabled-date="(current) => isActualEndDisabledDate(record, current)"
                  value-format="YYYY-MM-DD"
                  placeholder="结束日期"
                  class="detail-actual-picker"
                  @change="(value) => handleActualDateChange(record, 'actualEnd', value)"
                />
              </div>
              <div
                :class="[
                  'detail-actual-error',
                  { 'is-visible': Boolean(actualValidationMessages[record.key]) },
                ]"
              >
                {{ actualValidationMessages[record.key] || '\u00A0' }}
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
              <a-tooltip
                :title="
                  getRecordDisplayStatus(record).statusType === 'default'
                    ? '该环节当前为计划中，附件作为历史记录保留'
                    : '下载附件'
                "
              >
                <a-button
                  v-if="getRecordDisplayStatus(record).statusType !== 'default'"
                  type="text"
                  size="small"
                  class="detail-proof-icon-button is-attached"
                  @click.stop="triggerAttachmentPicker(record)"
                >
                  <template #icon>
                    <PaperClipOutlined class="detail-proof-icon is-attachment is-attached" />
                  </template>
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  :class="[
                    'detail-proof-icon-button',
                    'is-download',
                    {
                      'is-history': getRecordDisplayStatus(record).statusType === 'default',
                    },
                  ]"
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
                record.proof !== 'done' &&
                ['processing', 'success'].includes(getRecordDisplayStatus(record).statusType)
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
              title="已推进子环节均未上传附件"
            >
              <MinusCircleOutlined class="detail-proof-summary-icon is-none" />
            </a-tooltip>
            <a-tooltip
              v-else-if="
                record.level === 'stage' &&
                getStageProofSummary(record).visible &&
                getStageProofSummary(record).state === 'partial'
              "
              title="已推进子环节部分已上传附件"
            >
              <ExclamationCircleOutlined class="detail-proof-summary-icon is-partial" />
            </a-tooltip>
            <a-tooltip
              v-else-if="
                record.level === 'stage' &&
                getStageProofSummary(record).visible &&
                getStageProofSummary(record).state === 'all'
              "
              title="已推进子环节均已上传附件"
            >
              <CheckCircleFilled class="detail-proof-summary-icon is-all" />
            </a-tooltip>
            <a-typography-text v-else type="secondary">--</a-typography-text>
          </div>
        </template>

        <template v-else-if="column.dataIndex === 'planned'">
          <div v-if="isPlannedEditorVisible(record)" class="detail-plan-editor-stack">
            <a-range-picker
              :value="getPlannedRangeValue(record)"
              :default-picker-value="getPlannedDefaultPickerValue(record)"
              :disabled="getPlannedRangeDisabled(record)"
              :allow-clear="isPlannedRangeClearAllowed(record)"
              :locale="zhCN"
              :placeholder="['开始日期', '结束日期']"
              :separator="plannedRangeSeparator"
              :disabled-date="(current) => isPlannedRangeDisabledDate(record, current)"
              value-format="YYYY-MM-DD"
              class="detail-range-picker"
              @calendarChange="(value) => handlePlannedCalendarChange(record, value)"
              @change="(value) => handlePlannedRangeChange(record, value)"
            />
            <div
              :class="[
                'detail-plan-error',
                { 'is-visible': Boolean(plannedValidationMessages[record.key]) },
              ]"
            >
              {{ plannedValidationMessages[record.key] || '\u00A0' }}
            </div>
          </div>
          <a-typography-text v-else class="detail-milestone-date-text">
            {{ getRecordPlannedText(record) }}
          </a-typography-text>
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <span
            :class="[
              'detail-milestone-status-text',
              `is-${getRecordDisplayStatus(record).statusType || 'default'}`,
            ]"
          >
            {{ getRecordDisplayStatus(record).status }}
            <span v-if="isStatusModified(record)" class="modified-dot detail-status-modified-dot"></span>
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
    <div class="demo-control-panel" :class="{ 'is-collapsed': isDemoCollapsed }">
      <div class="demo-control-header" @click="isDemoCollapsed = !isDemoCollapsed">
        <span class="demo-control-title">
          <span class="demo-control-icon">🎬</span>
          演示模式
        </span>
        <span class="demo-control-toggle">{{ isDemoCollapsed ? '展开' : '收起' }}</span>
      </div>
      <div v-if="!isDemoCollapsed" class="demo-control-body">
        <div class="demo-control-section">
          <div class="demo-control-label">详情页里程碑场景</div>
          <a-segmented
            v-model:value="demoScenario"
            :options="demoScenarioOptions"
            size="small"
            block
            class="demo-control-segmented"
            @change="handleDemoScenarioChange"
          />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { computed, h, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { Modal, message } from 'ant-design-vue'
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
import {
  financeProfileConfig,
  milestoneConfig,
  milestoneRows,
  milestoneDemoScenarioOptions as demoScenarioOptions,
  milestoneDemoScenarioPresets,
} from '@/data/detailPageData'

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
    initialProof: row.proof || 'none',
    initialStatus: row.status,
    initialStatusType: row.statusType,
    initialActualText: row.actualText || '--',
    initialActualStart: row.actualStart || parseActualRange(row.actualText).start || '',
    initialActualEnd: row.actualEnd || parseActualRange(row.actualText).end || '',
    initialPlannedRange: row.plannedRange ? [...row.plannedRange] : parsePlannedRange(row.plannedText),
    children: row.children ? cloneRows(row.children, row.key) : undefined,
  }))

const tableData = reactive(cloneRows(milestoneRows))
const expandedRowKeys = ref(
  tableData.filter((row) => row.level === 'stage' && row.statusType === 'processing').map((row) => row.key)
)
const actualValidationMessages = reactive({})
const plannedValidationMessages = reactive({})
const plannedDraftRanges = reactive({})
const timelineTouched = ref(false)
const highlightedIssueKey = ref('')
const activePlannedDirectIssueKey = ref('')

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
const demoScenario = ref('default')
const isDemoCollapsed = ref(false)
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
const isBidTypeReadOnly = computed(() => isProcurementBidTypeLocked())

const clearIssueMap = (target) => {
  Object.keys(target).forEach((key) => {
    delete target[key]
  })
}

const resetRowInitialState = (row) => {
  row.initialProof = row.proof || 'none'
  row.initialStatus = row.status
  row.initialStatusType = row.statusType
  row.initialActualText = row.actualText || '--'
  row.initialActualStart = row.actualStart || ''
  row.initialActualEnd = row.actualEnd || ''
  row.initialPlannedRange = row.plannedRange ? [...row.plannedRange] : undefined

  if (row.children?.length) {
    row.children.forEach(resetRowInitialState)
  }
}

const cloneScenarioValue = (value) => {
  if (Array.isArray(value)) {
    return [...value]
  }

  return value
}

const applyProcurementTemplateToRows = (rows, bidType) => {
  const procurementStage = rows.find((row) => row.key === 'l4')

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

const applyDemoScenarioStateToRows = (rows, scenario) => {
  const scenarioPreset = milestoneDemoScenarioPresets[scenario]

  if (!scenarioPreset) {
    return
  }

  Object.entries(scenarioPreset).forEach(([key, patch]) => {
    const targetRecord = findRowByKey(rows, key)

    if (!targetRecord) {
      return
    }

    Object.entries(patch).forEach(([field, value]) => {
      targetRecord[field] = cloneScenarioValue(value)
    })
  })
}

const replaceTimelineRows = (nextRows) => {
  tableData.splice(0, tableData.length, ...nextRows)
  expandedRowKeys.value = nextRows
    .filter((row) => row.level === 'stage' && row.statusType === 'processing')
    .map((row) => row.key)
  highlightedIssueKey.value = ''
  activePlannedDirectIssueKey.value = ''
  clearIssueMap(actualValidationMessages)
  clearIssueMap(plannedValidationMessages)
  clearIssueMap(plannedDraftRanges)
  timelineTouched.value = false
}

const buildScenarioRows = (scenario) => {
  const nextRows = cloneRows(milestoneRows)
  applyProcurementTemplateToRows(nextRows, selectedBidType.value || getCurrentBidType())
  applyDemoScenarioStateToRows(nextRows, scenario)
  nextRows.forEach(resetRowInitialState)
  return nextRows
}

const handleDemoScenarioChange = (nextValue) => {
  demoScenario.value = nextValue
  replaceTimelineRows(buildScenarioRows(nextValue))
  syncActualTimelineIssueMessages()
  syncPlannedTimelineIssueMessages()
}

const rebuildProcurementStage = (bidType) => {
  applyProcurementTemplateToRows(tableData, bidType)
  applyDemoScenarioStateToRows(tableData, demoScenario.value)
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

const getParentStage = (record) => {
  if (!record.parentKey) {
    return null
  }

  return findRowByKey(tableData, record.parentKey)
}

const getPreviousTopLevelStage = (record) => {
  if (record.parentKey) {
    const parent = getParentStage(record)

    if (parent) {
      const parentIndex = tableData.findIndex((row) => row.key === parent.key)

      if (parentIndex <= 0) {
        return null
      }

      return tableData[parentIndex - 1]
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

const getActualFieldValue = (record, field) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return undefined
  }

  return targetRecord[field] || undefined
}

const getActualDefaultPickerValue = (record, field) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return undefined
  }

  const currentFieldValue = targetRecord[field]

  if (currentFieldValue) {
    return currentFieldValue
  }

  if (field === 'actualEnd' && targetRecord.actualStart) {
    return targetRecord.actualStart
  }

  const previousSequentialEnd = getPreviousSequentialEnd(targetRecord)

  if (previousSequentialEnd) {
    return previousSequentialEnd
  }

  return undefined
}

const getPlannedRangeValue = (record) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return undefined
  }

  if (targetRecord.level === 'stage' && targetRecord.hasChildren) {
    const stageRange = getStagePlannedRange(targetRecord)

    if (!stageRange.start || !stageRange.end) {
      return undefined
    }

    return [stageRange.start, stageRange.end]
  }

  if (!targetRecord.plannedRange?.length) {
    return undefined
  }

  return [...targetRecord.plannedRange]
}

const getPlannedDefaultPickerValue = (record) => {
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return undefined
  }

  const currentRange = getPlannedRangeValue(targetRecord)

  if (currentRange?.[0]) {
    return [...currentRange]
  }

  const previousPlannedEnd = getPreviousSequentialPlannedEnd(targetRecord)

  if (previousPlannedEnd) {
    return [previousPlannedEnd, previousPlannedEnd]
  }

  if (targetRecord.level === 'item') {
    const parentStage = getParentStage(targetRecord)
    const parentStageRange = parentStage ? getStagePlannedRange(parentStage) : null

    if (parentStageRange?.start) {
      return [parentStageRange.start, parentStageRange.end || parentStageRange.start]
    }
  }

  if (targetRecord.level === 'stage') {
    const stageRange = getStagePlannedRange(targetRecord)

    if (stageRange.start) {
      return [stageRange.start, stageRange.end || stageRange.start]
    }
  }

  return undefined
}

const hasPlannedUpstreamReady = (record) => {
  const previousSibling = getPreviousSibling(record)

  if (previousSibling) {
    return Boolean(previousSibling.plannedRange?.[1])
  }

  const previousTopLevelStage = getPreviousTopLevelStage(record)

  if (!previousTopLevelStage) {
    return true
  }

  return Boolean(getStagePlannedRange(previousTopLevelStage).end)
}

const getStagePlannedBoundaryLock = (record) => {
  if (!record?.hasChildren || !record.children?.length) {
    return {
      lockStart: false,
      lockEnd: false,
    }
  }

  return {
    lockStart: Boolean(record.children[0]?.plannedRange?.[0]),
    lockEnd: Boolean(record.children[record.children.length - 1]?.plannedRange?.[1]),
  }
}

const getPlannedRangeDisabled = (record) => {
  if (record.level === 'item' && !hasPlannedUpstreamReady(record) && !getPlannedRangeValue(record)?.length) {
    return true
  }

  if (record.level !== 'stage' || !record.hasChildren) {
    return false
  }

  const { lockStart, lockEnd } = getStagePlannedBoundaryLock(record)

  if (!lockStart && !lockEnd) {
    return false
  }

  return [lockStart, lockEnd]
}

const isPlannedRangeClearAllowed = (record) => {
  if (isRequiredParentPlannedRange(record)) {
    return false
  }

  const disabledState = getPlannedRangeDisabled(record)

  if (Array.isArray(disabledState)) {
    return !disabledState.some(Boolean)
  }

  return !disabledState
}

const isActualStartDisabledDate = (record, current) => {
  if (current?.isAfter(dayjs(), 'day')) {
    return true
  }

  const previousSequentialEnd = getPreviousSequentialEnd(record)

  if (!current || !previousSequentialEnd) {
    return false
  }

  return current.isBefore(dayjs(previousSequentialEnd), 'day')
}

const isActualEndDisabledDate = (record, current) => {
  if (current?.isAfter(dayjs(), 'day')) {
    return true
  }

  if (!current || !record.actualStart) {
    return false
  }

  return current.isBefore(dayjs(record.actualStart), 'day')
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

const isPlannedRangeDisabledDate = (record, current) => {
  if (!hasPlannedUpstreamReady(record)) {
    return true
  }

  if (!current) {
    return false
  }

  const previousPlannedEnd = getPreviousSequentialPlannedEnd(record)
  const draftRange = plannedDraftRanges[record.key] || []
  const draftStart = draftRange[0] || ''
  const parentStage = getParentStage(record)
  const parentStageRange =
    record.level === 'item' && getPlannedRuleStatusType(parentStage) === 'default'
      ? getStagePlannedRange(parentStage)
      : null

  if (previousPlannedEnd && current.isBefore(dayjs(previousPlannedEnd), 'day')) {
    return true
  }

  if (draftStart && current.isBefore(dayjs(draftStart), 'day')) {
    return true
  }

  if (parentStageRange?.start && current.isBefore(dayjs(parentStageRange.start), 'day')) {
    return true
  }

  if (parentStageRange?.end && current.isAfter(dayjs(parentStageRange.end), 'day')) {
    return true
  }

  return false
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

const getInitialStageActualRange = (record) => {
  if (!record.hasChildren || !record.children?.length) {
    return {
      start: record.initialActualStart || '',
      end: record.initialActualEnd || '',
    }
  }

  const firstChild = record.children[0]
  const lastChild = record.children[record.children.length - 1]

  return {
    start: firstChild?.initialActualStart || '',
    end: lastChild?.initialActualEnd || '',
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
  if (record.level === 'stage' && record.hasChildren) {
    return getStagePlannedRange(record).text
  }

  if (!record.plannedRange?.length && record.plannedText) {
    return record.plannedText
  }

  return formatPlannedRangeText(record.plannedRange)
}

const getRecordDisplayStatus = (record) => {
  if (record.level === 'stage' && record.hasChildren) {
    const stageRange = getStageActualRange(record)

    if (stageRange.end) {
      return { status: '已完成', statusType: 'success' }
    }

    if (stageRange.start) {
      return { status: '进行中', statusType: 'processing' }
    }

    const previousTopLevelStage = getPreviousTopLevelStage(record)

    if (getStageActualRange(previousTopLevelStage || {}).end) {
      return { status: '进行中', statusType: 'processing' }
    }

    return { status: record.status, statusType: record.statusType }
  }

  if (record.level === 'stage') {
    if (record.actualEnd) {
      return { status: '已完成', statusType: 'success' }
    }

    if (record.actualStart) {
      return { status: '进行中', statusType: 'processing' }
    }

    const previousTopLevelStage = getPreviousTopLevelStage(record)

    if (getStageActualRange(previousTopLevelStage || {}).end) {
      return { status: '进行中', statusType: 'processing' }
    }

    return { status: record.status, statusType: record.statusType }
  }

  if (record.actualEnd) {
    return { status: '已完成', statusType: 'success' }
  }

  if (record.actualStart) {
    return { status: '进行中', statusType: 'processing' }
  }

  return { status: record.status, statusType: record.statusType }
}

const getPlannedRuleStatusType = (record) => {
  const displayStatusType = getRecordDisplayStatus(record).statusType

  if (displayStatusType === 'processing') {
    return 'processing'
  }

  return record.statusType
}

const isRowSelfModified = (record) => {
  const currentActualStart =
    record.level === 'stage' && record.hasChildren
      ? getStageActualRange(record).start || ''
      : record.actualStart || ''
  const currentActualEnd =
    record.level === 'stage' && record.hasChildren
      ? getStageActualRange(record).end || ''
      : record.actualEnd || ''
  const initialActualRange =
    record.level === 'stage' && record.hasChildren
      ? getInitialStageActualRange(record)
      : {
          start: record.initialActualStart || '',
          end: record.initialActualEnd || '',
        }
  const currentPlannedStart = record.plannedRange?.[0] || ''
  const currentPlannedEnd = record.plannedRange?.[1] || ''
  const initialPlannedStart = record.initialPlannedRange?.[0] || ''
  const initialPlannedEnd = record.initialPlannedRange?.[1] || ''

  return (
    currentActualStart !== (initialActualRange.start || '') ||
    currentActualEnd !== (initialActualRange.end || '') ||
    currentPlannedStart !== initialPlannedStart ||
    currentPlannedEnd !== initialPlannedEnd ||
    (record.proof || 'none') !== (record.initialProof || 'none')
  )
}

const isStatusModified = (record) => {
  if (isRowSelfModified(record)) {
    return true
  }

  if (record.children?.length) {
    return record.children.some((child) => isStatusModified(child))
  }

  return false
}

const ACTUAL_TIMELINE_RULE_MESSAGES = new Set([
  '请补齐当前时间',
  '请先补开始时间',
  '开始时间需不早于上一环节结束',
  '结束时间需晚于开始时间',
  '请补齐结束时间',
  '上游时间已清空，请确认本环节时间',
  '上游时间已变更，请确认本环节时间',
])

const PLANNED_TIMELINE_RULE_MESSAGES = new Set([
  '请补齐计划时间',
  '请先补计划开始时间',
  '计划开始不能早于上一环节结束',
  '结束时间需晚于开始时间',
  '请补齐计划结束时间',
  '子环节时间需落在父环节计划内',
])

const getActualTimelineRecords = () =>
  tableData.flatMap((row) => (row.hasChildren && row.children?.length ? row.children : [row]))

const getPlannedTimelineRecords = () => getActualTimelineRecords()

const isRequiredParentPlannedRange = (record) =>
  record.level === 'stage' && record.statusType !== 'success'

const getPlannedIssueForSequence = (records, { requireAll = false } = {}) => {
  const lastFilledIndex = [...records]
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => record.plannedRange?.[0] || record.plannedRange?.[1])
    .at(-1)?.index

  if (lastFilledIndex === undefined) {
    return requireAll && records[0]
      ? { key: records[0].key, message: '请补齐计划时间', stage: records[0].stage }
      : null
  }

  let previousEnd = ''
  const effectiveLastIndex = requireAll ? records.length - 1 : lastFilledIndex

  for (let index = 0; index <= effectiveLastIndex; index += 1) {
    const record = records[index]
    const hasStart = Boolean(record.plannedRange?.[0])
    const hasEnd = Boolean(record.plannedRange?.[1])
    const parentStage = getParentStage(record)
    const parentStageRange =
      getPlannedRuleStatusType(parentStage) === 'default' ? getStagePlannedRange(parentStage) : null

    if (!hasStart && !hasEnd) {
      return { key: record.key, message: '请补齐计划时间', stage: record.stage }
    }

    if (!hasStart && hasEnd) {
      return { key: record.key, message: '请先补计划开始时间', stage: record.stage }
    }

    if (hasStart && previousEnd && dayjs(record.plannedRange[0]).isBefore(dayjs(previousEnd), 'day')) {
      return { key: record.key, message: '计划开始不能早于上一环节结束', stage: record.stage }
    }

    if (
      hasStart &&
      parentStageRange?.start &&
      dayjs(record.plannedRange[0]).isBefore(dayjs(parentStageRange.start), 'day')
    ) {
      return { key: record.key, message: '子环节时间需落在父环节计划内', stage: record.stage }
    }

    if (
      hasStart &&
      hasEnd &&
      dayjs(record.plannedRange[1]).isBefore(dayjs(record.plannedRange[0]), 'day')
    ) {
      return { key: record.key, message: '结束时间需晚于开始时间', stage: record.stage }
    }

    if (
      hasEnd &&
      parentStageRange?.end &&
      dayjs(record.plannedRange[1]).isAfter(dayjs(parentStageRange.end), 'day')
    ) {
      return { key: record.key, message: '子环节时间需落在父环节计划内', stage: record.stage }
    }

    if (hasStart && !hasEnd) {
      return { key: record.key, message: '请补齐计划结束时间', stage: record.stage }
    }

    previousEnd = record.plannedRange[1]
  }

  return null
}

const hasRelevantLaterPlannedValues = (record) => {
  if (record.level === 'item' && record.parentKey) {
    const parentStage = getParentStage(record)

    if (!parentStage?.children?.length) {
      return false
    }

    const currentIndex = parentStage.children.findIndex((item) => item.key === record.key)

    if (currentIndex < 0) {
      return false
    }

    if (getPlannedRuleStatusType(parentStage) === 'processing') {
      return currentIndex < parentStage.children.length - 1
    }

    return parentStage.children
      .slice(currentIndex + 1)
      .some((item) => item.plannedRange?.[0] || item.plannedRange?.[1])
  }

  const stageIndex = tableData.findIndex((item) => item.key === record.key)

  if (stageIndex < 0) {
    return false
  }

  return tableData
    .slice(stageIndex + 1)
    .some((item) => item.plannedRange?.[0] || item.plannedRange?.[1])
}

const getActualTimelineIssueMap = () => {
  const records = getActualTimelineRecords()
  const issueMap = {}
  const lastStartedIndex = [...records]
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => record.actualStart || record.actualEnd)
    .at(-1)?.index

  let previousEnd = ''

  if (lastStartedIndex === undefined) {
    return issueMap
  }

  for (let index = 0; index <= lastStartedIndex; index += 1) {
    const record = records[index]
    const hasStart = Boolean(record.actualStart)
    const hasEnd = Boolean(record.actualEnd)

    if (!hasStart && !hasEnd) {
      if (index < lastStartedIndex) {
        issueMap[record.key] = '请补齐当前时间'
        break
      }
      continue
    }

    if (!hasStart && hasEnd) {
      issueMap[record.key] = '请先补开始时间'
      break
    }

    if (hasStart && previousEnd && dayjs(record.actualStart).isBefore(dayjs(previousEnd), 'day')) {
      issueMap[record.key] = '开始时间需不早于上一环节结束'
      break
    }

    if (hasStart && hasEnd && dayjs(record.actualEnd).isBefore(dayjs(record.actualStart), 'day')) {
      issueMap[record.key] = '结束时间需晚于开始时间'
      break
    }

    if (hasStart && !hasEnd && index !== lastStartedIndex) {
      issueMap[record.key] = '请补齐结束时间'
      break
    }

    if (hasStart && hasEnd) {
      previousEnd = record.actualEnd
    }
  }

  return issueMap
}

const getActualTimelineFirstIssue = () => {
  const issueMap = getActualTimelineIssueMap()
  const [key, message] = Object.entries(issueMap)[0] || []

  if (!key) {
    return null
  }

  const targetRecord = findRowByKey(tableData, key)

  return targetRecord
    ? {
        key,
        message,
        stage: targetRecord.stage,
      }
    : null
}

const getPlannedTimelineIssueMap = () => {
  let previousStageEnd = ''

  for (const stage of tableData) {
    if (stage.statusType === 'success') {
      const completedStageRange = getStagePlannedRange(stage)

      if (completedStageRange.end) {
        previousStageEnd = completedStageRange.end
      }

      continue
    }

    if (!hasCompletePlannedRange(stage)) {
      return { [stage.key]: '请补齐计划时间' }
    }

    const stageRange = getStagePlannedRange(stage)

    if (
      stageRange.start &&
      previousStageEnd &&
      dayjs(stageRange.start).isBefore(dayjs(previousStageEnd), 'day')
    ) {
      return { [stage.key]: '计划开始不能早于上一环节结束' }
    }

    if (stage.children?.length) {
      const childIssue = getPlannedIssueForSequence(stage.children, {
        requireAll: getPlannedRuleStatusType(stage) === 'processing',
      })

      if (childIssue) {
        return { [childIssue.key]: childIssue.message }
      }
    }

    if (stageRange.end) {
      previousStageEnd = stageRange.end
    }
  }

  return {}
}

const syncPlannedTimelineIssueMessages = () => {
  if (activePlannedDirectIssueKey.value) {
    Object.keys(plannedValidationMessages).forEach((key) => {
      if (key !== activePlannedDirectIssueKey.value && PLANNED_TIMELINE_RULE_MESSAGES.has(plannedValidationMessages[key])) {
        delete plannedValidationMessages[key]
      }
    })

    return
  }

  const issueMap = getPlannedTimelineIssueMap()
  const issueKeys = new Set(Object.keys(issueMap))

  Object.keys(plannedValidationMessages).forEach((key) => {
    if (issueKeys.has(key)) {
      return
    }

    if (PLANNED_TIMELINE_RULE_MESSAGES.has(plannedValidationMessages[key])) {
      delete plannedValidationMessages[key]
    }
  })

  Object.entries(issueMap).forEach(([key, message]) => {
    plannedValidationMessages[key] = message
  })
}

const setSinglePlannedValidationMessage = (key, message) => {
  activePlannedDirectIssueKey.value = key

  Object.keys(plannedValidationMessages).forEach((messageKey) => {
    if (PLANNED_TIMELINE_RULE_MESSAGES.has(plannedValidationMessages[messageKey])) {
      delete plannedValidationMessages[messageKey]
    }
  })

  plannedValidationMessages[key] = message
}

const syncActualTimelineIssueMessages = () => {
  const issueMap = getActualTimelineIssueMap()
  const issueKeys = new Set(Object.keys(issueMap))

  Object.keys(actualValidationMessages).forEach((key) => {
    if (issueKeys.has(key)) {
      return
    }

    if (ACTUAL_TIMELINE_RULE_MESSAGES.has(actualValidationMessages[key])) {
      delete actualValidationMessages[key]
    }
  })

  Object.entries(issueMap).forEach(([key, message]) => {
    actualValidationMessages[key] = message
  })
}

const setSingleActualValidationMessage = (key, message) => {
  Object.keys(actualValidationMessages).forEach((messageKey) => {
    if (ACTUAL_TIMELINE_RULE_MESSAGES.has(actualValidationMessages[messageKey])) {
      delete actualValidationMessages[messageKey]
    }
  })

  actualValidationMessages[key] = message
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

  target.actualStart = endValue
  target.actualStartAutoFilled = true
  target.actualEditable = true
}

const applySequentialPlannedStart = (record, endValue) => {
  if (!endValue) {
    return
  }

  const nextTargetConfig = (() => {
    if (!record.parentKey) {
      return null
    }

    const parent = findRowByKey(tableData, record.parentKey)

    if (!parent?.children?.length) {
      return null
    }

    const currentIndex = parent.children.findIndex((child) => child.key === record.key)
    const nextChild = parent.children[currentIndex + 1]

    if (!nextChild) {
      return null
    }

    return { target: nextChild, expandStageKey: null }
  })()

  if (!nextTargetConfig?.target) {
    return
  }

  const { target, expandStageKey } = nextTargetConfig

  if (expandStageKey && !expandedRowKeys.value.includes(expandStageKey)) {
    expandedRowKeys.value = [...expandedRowKeys.value, expandStageKey]
  }

  if (target.plannedRange?.[0]) {
    return
  }

  target.plannedRange = [endValue, target.plannedRange?.[1] || '']
  target.plannedText = formatPlannedRangeText(target.plannedRange)
  plannedDraftRanges[target.key] = [...target.plannedRange]
}

const shouldAutoCarryPlanned = (record) => {
  if (record.level === 'item') {
    const parentStage = getParentStage(record)
    return getPlannedRuleStatusType(parentStage) === 'processing'
  }

  return getPlannedRuleStatusType(record) === 'processing'
}

const getDownstreamImpactState = (record, nextEndValue) => {
  const nextTargetConfig = getNextSequentialTarget(record)

  if (!nextTargetConfig?.target) {
    return { target: null, hasImpact: false, hasManualValues: false }
  }

  const { target } = nextTargetConfig
  const hasAnyValues = Boolean(target.actualStart || target.actualEnd)
  const hasManualValues = Boolean(
    (target.actualStart && !target.actualStartAutoFilled) ||
      (target.actualEnd && !target.actualEndAutoFilled)
  )
  const hasAutoValues = Boolean(
    (target.actualStart && target.actualStartAutoFilled) ||
      (target.actualEnd && target.actualEndAutoFilled)
  )
  const shouldRecheckManualValues = Boolean(
    hasManualValues &&
      target.actualStart &&
      nextEndValue &&
      dayjs(target.actualStart).isBefore(dayjs(nextEndValue), 'day')
  )

  return {
    target,
    hasImpact: hasAnyValues,
    hasManualValues,
    hasAutoValues,
    shouldRecheckManualValues,
  }
}

const clearAutoActualFields = (record) => {
  if (!record) {
    return
  }

  if (record.actualStartAutoFilled) {
    record.actualStart = undefined
    record.actualStartAutoFilled = false
  }

  if (record.actualEndAutoFilled) {
    record.actualEnd = undefined
    record.actualEndAutoFilled = false
  }
}

const clearSequentialActualStart = (record) => {
  const nextTargetConfig = getNextSequentialTarget(record)

  if (!nextTargetConfig?.target) {
    return
  }

  const { target } = nextTargetConfig

  if (target.actualStartAutoFilled || target.actualEndAutoFilled) {
    clearAutoActualFields(target)
  }
}

const handleDownstreamAfterActualEndChange = (record, nextEndValue) => {
  const { target, hasAutoValues } = getDownstreamImpactState(record, nextEndValue)

  if (!target) {
    return
  }

  if (!nextEndValue) {
    clearSequentialActualStart(record)

    syncActualTimelineIssueMessages()

    return
  }

  if (hasAutoValues) {
    clearSequentialActualStart(record)
    applySequentialActualStart(record, nextEndValue)
  } else {
    applySequentialActualStart(record, nextEndValue)
  }

  syncActualTimelineIssueMessages()
}

const handleActualDateChange = (record, field, value) => {
  timelineTouched.value = true
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
    setSingleActualValidationMessage(targetRecord.key, '开始时间需不早于上一环节结束')
    targetRecord.actualStart = undefined
    targetRecord.actualStartAutoFilled = false
    return
  }

  if (field === 'actualStart' && !nextValue && targetRecord.actualEnd) {
    targetRecord.actualStart = undefined
    targetRecord.actualStartAutoFilled = false
    targetRecord.actualEnd = nextEnd
    setSingleActualValidationMessage(targetRecord.key, '请先补开始时间')
    syncActualTimelineIssueMessages()
    syncPlannedTimelineIssueMessages()
    return
  }

  if (field === 'actualEnd' && !nextValue && targetRecord.actualStart) {
    delete actualValidationMessages[targetRecord.key]
    targetRecord.actualEnd = undefined
    targetRecord.actualEndAutoFilled = false
    handleDownstreamAfterActualEndChange(targetRecord, '')
    syncActualTimelineIssueMessages()
    syncPlannedTimelineIssueMessages()
    return
  }

  if (nextStart && nextEnd && dayjs(nextEnd).isBefore(dayjs(nextStart), 'day')) {
    setSingleActualValidationMessage(targetRecord.key, '结束时间需晚于开始时间')

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
    handleDownstreamAfterActualEndChange(targetRecord, value)
  }

  if (field === 'actualEnd' && !value) {
    handleDownstreamAfterActualEndChange(targetRecord, '')
  }

  syncActualTimelineIssueMessages()
  syncPlannedTimelineIssueMessages()
}

const handlePlannedRangeChange = (record, value) => {
  timelineTouched.value = true
  const targetRecord = findRowByKey(tableData, record.key)

  if (!targetRecord) {
    return
  }

  const nextRange = value ? [...value] : []
  const stageBoundaryLock = getStagePlannedBoundaryLock(targetRecord)
  const normalizedRange =
    targetRecord.level === 'stage'
      ? (() => {
          const stageRange = getStagePlannedRange(targetRecord)
          const nextStageStart = stageBoundaryLock.lockStart ? stageRange.start : nextRange?.[0] || ''
          const nextStageEnd = stageBoundaryLock.lockEnd ? stageRange.end : nextRange?.[1] || ''

          return nextStageStart || nextStageEnd ? [nextStageStart, nextStageEnd] : []
        })()
      : nextRange
  const nextStart = normalizedRange?.[0] || ''
  const nextEnd = normalizedRange?.[1] || ''
  const previousPlannedEnd = getPreviousSequentialPlannedEnd(targetRecord)
  const parentStage = getParentStage(targetRecord)
  const parentStageRange =
    targetRecord.level === 'item' && getPlannedRuleStatusType(parentStage) === 'default'
      ? getStagePlannedRange(parentStage)
      : null

  if (isRequiredParentPlannedRange(targetRecord) && !normalizedRange.length) {
    setSinglePlannedValidationMessage(targetRecord.key, '请补齐计划时间')
    return
  }

  if (
    nextStart &&
    previousPlannedEnd &&
    dayjs(nextStart).isBefore(dayjs(previousPlannedEnd), 'day')
  ) {
    setSinglePlannedValidationMessage(targetRecord.key, '计划开始不能早于上一环节结束')
    targetRecord.plannedRange = targetRecord.plannedRange ? [...targetRecord.plannedRange] : undefined
    return
  }

  if (
    nextStart &&
    parentStageRange?.start &&
    dayjs(nextStart).isBefore(dayjs(parentStageRange.start), 'day')
  ) {
    setSinglePlannedValidationMessage(targetRecord.key, '子环节时间需落在父环节计划内')
    return
  }

  if (
    normalizedRange?.[0] &&
    normalizedRange?.[1] &&
    dayjs(normalizedRange[1]).isBefore(dayjs(normalizedRange[0]), 'day')
  ) {
    setSinglePlannedValidationMessage(targetRecord.key, '结束时间需晚于开始时间')
    return
  }

  if (
    nextEnd &&
    parentStageRange?.end &&
    dayjs(nextEnd).isAfter(dayjs(parentStageRange.end), 'day')
  ) {
    setSinglePlannedValidationMessage(targetRecord.key, '子环节时间需落在父环节计划内')
    return
  }

  delete plannedValidationMessages[targetRecord.key]
  if (activePlannedDirectIssueKey.value === targetRecord.key) {
    activePlannedDirectIssueKey.value = ''
  }
  targetRecord.plannedRange = normalizedRange.length ? normalizedRange : undefined
  targetRecord.plannedText = normalizedRange.length
    ? formatPlannedRangeText(targetRecord.plannedRange)
    : '--'
  plannedDraftRanges[targetRecord.key] = normalizedRange

  if (!normalizedRange.length && hasRelevantLaterPlannedValues(targetRecord)) {
    setSinglePlannedValidationMessage(targetRecord.key, '请补齐计划时间')
    return
  }

  if (normalizedRange?.[1] && shouldAutoCarryPlanned(targetRecord)) {
    applySequentialPlannedStart(targetRecord, normalizedRange[1])
  }

  syncPlannedTimelineIssueMessages()
}

const handlePlannedCalendarChange = (record, value) => {
  plannedDraftRanges[record.key] = value ? [...value] : []
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

  if (actualValidationMessages[targetRecord.key]) {
    return true
  }

  if (targetRecord.actualStart || targetRecord.actualEnd) {
    return true
  }

  if (targetRecord.actualEditable) {
    return true
  }

  const parentStage = getParentStage(targetRecord)

  if (!targetRecord.parentKey) {
    const previousTopLevelStage = getPreviousTopLevelStage(targetRecord)

    if (!previousTopLevelStage) {
      return false
    }

    return targetRecord.statusType === 'processing' && Boolean(getStageActualRange(previousTopLevelStage).end)
  }

  const previousSibling = getPreviousSibling(targetRecord)

  if (previousSibling?.actualEnd) {
    return true
  }

  if (previousSibling) {
    return false
  }

  const previousTopLevelStage = getPreviousTopLevelStage(targetRecord)

  if (!previousTopLevelStage) {
    return false
  }

  return parentStage?.statusType === 'processing' && Boolean(getStageActualRange(previousTopLevelStage).end)
}

const isPlannedEditorVisible = (record) => {
  if (record.statusType === 'success') {
    return false
  }

  if (record.level === 'stage') {
    if (record.hasChildren) {
      const { lockStart, lockEnd } = getStagePlannedBoundaryLock(record)

      if (lockStart && lockEnd) {
        return false
      }
    }

    return ['default', 'processing'].includes(record.statusType)
  }

  const parentStage = record.parentKey ? findRowByKey(tableData, record.parentKey) : null

  if (getPlannedRuleStatusType(parentStage) === 'processing') {
    return true
  }

  return Boolean(record.planEditable)
}

const getStageProofSummary = (record) => {
  const displayStatusType = getRecordDisplayStatus(record).statusType

  if (displayStatusType === 'default') {
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

  const childProofs = record.children
    .filter((child) => ['processing', 'success'].includes(getRecordDisplayStatus(child).statusType))
    .map((child) => child.proof)

  if (!childProofs.length) {
    return { state: 'none', visible: false }
  }

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

const hasCompletePlannedRange = (record) =>
  Boolean(record.plannedRange?.[0] && record.plannedRange?.[1])

const getFirstPlannedIssue = () => {
  const firstValidationEntry = getPlannedTimelineRecords()
    .map((record) => ({
      key: record.key,
      message: plannedValidationMessages[record.key],
      stage: record.stage,
    }))
    .find((item) => item.message)

  if (firstValidationEntry) {
    return firstValidationEntry
  }

  const issueMap = getPlannedTimelineIssueMap()
  const [key, message] = Object.entries(issueMap)[0] || []

  if (key) {
    const targetRecord = findRowByKey(tableData, key)

    if (targetRecord) {
      return {
        key,
        message,
        stage: targetRecord.stage,
      }
    }
  }

  return null
}

const timelineSubmitGuard = computed(() => {
  const actualIssue = getActualTimelineFirstIssue()
  const plannedIssue = getFirstPlannedIssue()

  if (actualIssue) {
    return {
      blocked: true,
      reason: `${actualIssue.stage}：${actualIssue.message}`,
      focusKey: actualIssue.key,
    }
  }

  if (plannedIssue) {
    return {
      blocked: true,
      reason: `${plannedIssue.stage}：${plannedIssue.message}`,
      focusKey: plannedIssue.key,
    }
  }

  return {
    blocked: false,
    reason: '',
    focusKey: '',
  }
})

const customRow = (record) => ({
  'data-row-key': record.key,
  class: [
    record.level === 'stage' ? 'detail-stage-row' : '',
    record.level === 'item' ? 'detail-item-row' : '',
    record.active ? 'detail-active-row' : '',
    highlightedIssueKey.value === record.key ? 'detail-issue-highlight-row' : '',
  ].filter(Boolean).join(' '),
})

let highlightTimer = null

const focusTimelineIssue = (event) => {
  const nextKey = event.detail?.key || ''

  if (!nextKey) {
    return
  }

  highlightedIssueKey.value = nextKey

  nextTick(() => {
    const targetRow = document.querySelector(
      `.detail-milestone-table tr[data-row-key="${nextKey}"]`
    )

    if (targetRow) {
      const rect = targetRow.getBoundingClientRect()
      const visibleTop = 140
      const visibleBottom = window.innerHeight - 48
      const isInView = rect.top >= visibleTop && rect.bottom <= visibleBottom

      if (!isInView) {
        const targetTop = rect.top + window.pageYOffset - 180
        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'smooth',
        })
      }
    }
  })

  if (highlightTimer) {
    window.clearTimeout(highlightTimer)
  }

  highlightTimer = window.setTimeout(() => {
    if (highlightedIssueKey.value === nextKey) {
      highlightedIssueKey.value = ''
    }
  }, 2200)
}

const startBidTypeEdit = () => {
  if (isBidTypeReadOnly.value) {
    return
  }

  if (isEditingBidType.value) {
    return
  }

  isEditingBidType.value = true
}

const getProcurementStage = () => tableData.find((row) => row.key === 'l4')

const hasProcurementFilledContent = () => {
  const procurementStage = getProcurementStage()

  if (!procurementStage?.children?.length) {
    return false
  }

  return procurementStage.children.some((child) => {
    const hasPlanned = Boolean(child.plannedRange?.[0] || child.plannedRange?.[1])
    const hasActual = Boolean(child.actualStart || child.actualEnd)
    const hasAttachment = Boolean(child.fileName || child.proof === 'done' || child.uploadState === 'uploading')

    return hasPlanned || hasActual || hasAttachment
  })
}

const isProcurementBidTypeLocked = () => {
  const procurementStage = getProcurementStage()

  if (!procurementStage) {
    return false
  }

  return (
    getRecordDisplayStatus(procurementStage).statusType === 'processing' &&
    !isStatusModified(procurementStage)
  )
}

const applyBidTypeChange = (nextValue) => {
  setBidTypeValue(nextValue)
  rebuildProcurementStage(nextValue)
  syncActualTimelineIssueMessages()
  syncPlannedTimelineIssueMessages()
}

const broadcastBidTypeCommitted = (nextValue) => {
  window.dispatchEvent(
    new CustomEvent('detail:bid-type-committed', {
      detail: { value: nextValue },
    })
  )
}

const syncBidTypeToBasicInfo = (nextValue) => {
  window.dispatchEvent(
    new CustomEvent('detail:bid-type-change', {
      detail: { value: nextValue, source: 'milestone-sync' },
    })
  )
}

const requestBidTypeChange = (nextValue, previousValue, source = 'milestone') => {
  const normalizedNextValue = nextValue ?? ''
  const normalizedPreviousValue = previousValue ?? ''

  if (normalizedNextValue === normalizedPreviousValue) {
    if (source === 'milestone') {
      isEditingBidType.value = false
    }
    return
  }

  if (isProcurementBidTypeLocked()) {
    message.warning('采购环节已进入执行并已提交，不能再切换招标类型')

    if (source === 'milestone') {
      setBidTypeValue(normalizedPreviousValue)
      isEditingBidType.value = false
      return
    }

    window.dispatchEvent(
      new CustomEvent('detail:bid-type-revert', {
        detail: { value: normalizedPreviousValue },
      })
    )
    return
  }

  if (!hasProcurementFilledContent()) {
    applyBidTypeChange(normalizedNextValue)
    broadcastBidTypeCommitted(normalizedNextValue)

    if (source === 'milestone' || source === 'basic') {
      syncBidTypeToBasicInfo(normalizedNextValue)
    }

    if (source === 'milestone') {
      isEditingBidType.value = false
    }

    message.success(`采购环节已按“${normalizedNextValue || '默认'}”更新`)
    return
  }

  Modal.confirm({
    title: '确认切换招标类型？',
    content: '采购环节子环节将按新的招标类型重置，已填写内容会受影响。',
    okText: '继续切换',
    cancelText: '取消',
    onOk() {
      applyBidTypeChange(normalizedNextValue)
      broadcastBidTypeCommitted(normalizedNextValue)

      if (source === 'milestone' || source === 'basic') {
        syncBidTypeToBasicInfo(normalizedNextValue)
      }

      if (source === 'milestone') {
        isEditingBidType.value = false
      }

      message.success(`采购环节已按“${normalizedNextValue || '默认'}”更新`)
    },
    onCancel() {
      if (source === 'milestone') {
        setBidTypeValue(normalizedPreviousValue)
        isEditingBidType.value = false
        return
      }

      window.dispatchEvent(
        new CustomEvent('detail:bid-type-revert', {
          detail: { value: normalizedPreviousValue },
        })
      )
    },
  })
}

const handleBidTypeChange = (event) => {
  if (!event.detail) {
    return
  }

  if (event.detail.source === 'milestone-sync') {
    return
  }

  requestBidTypeChange(event.detail.value ?? '', event.detail.previousValue ?? selectedBidType.value, 'basic')
}

watch(
  isBidTypeReadOnly,
  (nextValue) => {
    window.dispatchEvent(
      new CustomEvent('detail:bid-type-lock-change', {
        detail: { locked: nextValue },
      })
    )

    if (nextValue) {
      isEditingBidType.value = false
    }
  },
  { immediate: true }
)

const handleBidTypeCommitted = (event) => {
  if (!event.detail) {
    return
  }

  const nextValue = event.detail.value ?? ''

  if (selectedBidType.value === nextValue) {
    return
  }

  setBidTypeValue(nextValue)
}

const handleBidTypeSelectChange = (value) => {
  requestBidTypeChange(value ?? '', selectedBidType.value, 'milestone')
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
  replaceTimelineRows(buildScenarioRows(demoScenario.value))
  syncActualTimelineIssueMessages()
  syncPlannedTimelineIssueMessages()
  window.addEventListener('mousedown', handleBidTypeOutsideClick, true)
  window.addEventListener('detail:bid-type-change', handleBidTypeChange)
  window.addEventListener('detail:bid-type-committed', handleBidTypeCommitted)
  window.addEventListener('detail:focus-timeline-issue', focusTimelineIssue)
  window.dispatchEvent(
    new CustomEvent('detail:attachment-uploading-change', {
      detail: { uploading: hasUploadingAttachments.value },
    })
  )
  window.dispatchEvent(
    new CustomEvent('detail:timeline-submit-guard-change', {
      detail: timelineSubmitGuard.value,
    })
  )
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleBidTypeOutsideClick, true)
  window.removeEventListener('detail:bid-type-change', handleBidTypeChange)
  window.removeEventListener('detail:bid-type-committed', handleBidTypeCommitted)
  window.removeEventListener('detail:focus-timeline-issue', focusTimelineIssue)
  if (highlightTimer) {
    window.clearTimeout(highlightTimer)
  }
  window.dispatchEvent(
    new CustomEvent('detail:attachment-uploading-change', {
      detail: { uploading: false },
    })
  )
  window.dispatchEvent(
    new CustomEvent('detail:timeline-submit-guard-change', {
      detail: { blocked: false, reason: '' },
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

watch(
  () =>
    getPlannedTimelineRecords().map((record) => ({
      key: record.key,
      plannedStart: record.plannedRange?.[0] || '',
      plannedEnd: record.plannedRange?.[1] || '',
    })),
  () => {
    syncPlannedTimelineIssueMessages()
  },
  { deep: true, immediate: true }
)

watch(
  timelineSubmitGuard,
  (guardState) => {
    window.dispatchEvent(
      new CustomEvent('detail:timeline-submit-guard-change', {
        detail: guardState,
      })
    )
  },
  { immediate: true }
)

</script>

<style scoped src="./styles/MilestoneTimeline.css"></style>
