<template>
  <div class="annual-init-workspace">
    <div class="annual-init-workspace__header">
      <div>
        <div class="annual-init-workspace__title">{{ annualInitializationGovernanceWorkspace.title }}</div>
        <div class="annual-init-workspace__principle-row">
          <a-tag class="annual-init-workspace__principle-pill">
            <SafetyCertificateOutlined />
            {{ annualInitializationGovernanceWorkspace.principlePill }}
          </a-tag>
          <span class="annual-init-workspace__principle-text">
            {{ annualInitializationGovernanceWorkspace.principle }}
          </span>
        </div>
      </div>

      <div class="annual-init-workspace__actions">
        <a-button
          class="annual-init-workspace__action-secondary"
          @click.prevent="handleRestart"
        >
          {{ annualInitializationGovernanceWorkspace.actions.secondary }}
        </a-button>
        <a-button
          :class="[
            'annual-init-workspace__action-primary',
            { 'is-active': allRowsResolved || isNoIssueMode },
          ]"
          :disabled="!allRowsResolved && !isNoIssueMode"
          @click.prevent="handleFinalize"
        >
          {{ workspacePrimaryLabel }}
          <ArrowRightOutlined />
        </a-button>
      </div>
    </div>

    <div
      v-if="isBusinessMode && businessStrategy"
      class="annual-init-workspace__strategy"
    >
      <div class="annual-init-workspace__strategy-header">
        <div class="annual-init-workspace__strategy-intro">
          <div class="annual-init-workspace__strategy-icon-shell">
            <CalendarOutlined />
          </div>
          <div class="annual-init-workspace__strategy-copy">
            <div class="annual-init-workspace__strategy-title">
              {{ businessStrategy.title }}
            </div>
            <div class="annual-init-workspace__strategy-time">
              {{ businessStrategy.timeLabel }}
              <span class="annual-init-workspace__strategy-time-value">
                {{ businessStrategy.timeValue }}
              </span>
            </div>
          </div>
        </div>
        <div class="annual-init-workspace__strategy-badge">
          <SafetyCertificateOutlined />
          <span>{{ businessStrategy.badge }}</span>
        </div>
      </div>

      <div class="annual-init-workspace__strategy-grid">
        <div
          v-for="option in strategyOptions"
          :key="option.key"
          :class="[
            'annual-init-workspace__strategy-option',
            `is-${option.key}`,
            `is-${option.tone}`,
          ]"
          @click="selectedBusinessStrategy = option.key"
        >
          <div class="annual-init-workspace__strategy-option-icon">
            <component :is="strategyIconMap[option.icon]" />
          </div>
          <div class="annual-init-workspace__strategy-option-copy">
            <div class="annual-init-workspace__strategy-option-title">
              {{ option.title }}
            </div>
            <div class="annual-init-workspace__strategy-option-desc">
              {{ option.description }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-row :gutter="[20, 20]" class="annual-init-workspace__metrics">
      <a-col
        v-for="metric in displayMetrics"
        :key="metric.key"
        :xs="24"
        :sm="12"
        :xl="metricColumnSpan"
      >
        <a-card :bordered="false" class="annual-init-workspace__metric-card">
          <div class="annual-init-workspace__metric-shell">
            <div :class="['annual-init-workspace__metric-icon', `is-${metric.tone}`]">
              <component :is="metricIconMap[metric.icon]" />
            </div>
            <div class="annual-init-workspace__metric-copy">
              <a-statistic
                :value="Number(metric.value)"
                :value-style="metricValueStyle(metric)"
                class="annual-init-workspace__metric-stat"
              />
              <div
                :class="[
                  'annual-init-workspace__metric-meta',
                  { 'has-note': Boolean(metric.note) },
                ]"
              >
                <div :class="['annual-init-workspace__metric-title', `is-${metric.tone}`]">
                  {{ metric.title }}
                </div>
                <div
                  v-if="metric.note"
                  class="annual-init-workspace__metric-note"
                >
                  {{ metric.note }}
                </div>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-card :bordered="false" class="annual-init-workspace__table-card">
      <template v-if="!isNoIssueMode">
        <div :class="['annual-init-workspace__table-head', { 'is-business': isBusinessMode }]">
        <div v-if="isBusinessMode" class="annual-init-workspace__business-list-head">
          <BarsOutlined />
          <span>待治理明细清单</span>
        </div>
        <a-tabs
          v-if="!isBusinessMode"
          v-model:activeKey="activeTab"
          class="annual-init-workspace__tabs"
        >
          <a-tab-pane
            v-for="tab in annualInitializationGovernanceWorkspace.tabs"
            :key="tab.key"
            :tab="tab.label"
          />
        </a-tabs>

        <div class="annual-init-workspace__bulk-action-slot">
          <a-button
            type="text"
            class="annual-init-workspace__bulk-action"
            @click="handleBulkAction"
          >
            <DeleteOutlined />
            {{ bulkActionLabel }}
          </a-button>
        </div>
        </div>

        <a-table
          :columns="annualInitializationGovernanceColumns"
          :data-source="filteredRows"
          :pagination="false"
          row-key="key"
          :row-class-name="getRowClassName"
          class="annual-init-workspace__table"
        >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'source'">
            <div class="annual-init-workspace__source-cell">
              <div class="annual-init-workspace__source-topline">
                <div class="annual-init-workspace__source-row">{{ record.source }}</div>
                <a-tag
                  :class="[
                    'annual-init-workspace__source-tag',
                    {
                      'is-danger':
                        record.sourceTag === '物理质量' || record.sourceTag === '复合异常',
                    },
                  ]"
                >
                  {{ record.sourceTag }}
                </a-tag>
              </div>
              <div class="annual-init-workspace__source-name">{{ record.opportunityName }}</div>
              <div class="annual-init-workspace__source-code">
                编码：{{ record.opportunityCode }}
              </div>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'issues'">
            <div class="annual-init-workspace__issues">
              <div
                v-for="(issue, issueIndex) in record.issues"
                :key="issue.text"
                :class="[
                  'annual-init-workspace__issue',
                  isIssueResolved(record, issueIndex) ? 'is-success' : `is-${issue.tone}`,
                ]"
              >
                <component
                  :is="isIssueResolved(record, issueIndex) ? CheckCircleOutlined : InfoCircleOutlined"
                />
                <span>{{ issue.text }}</span>
              </div>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'repair'">
            <div class="annual-init-workspace__repair">
              <template v-if="record.repairType === 'physical'">
                <a-select
                  class="annual-init-workspace__field"
                  placeholder="-- 映射标准二级部 --"
                  :options="annualInitializationGovernanceRepairOptions"
                  v-model:value="repairState[record.key].dept"
                />
                <a-input
                  class="annual-init-workspace__field"
                  placeholder="补录销售单元名称..."
                  v-model:value="repairState[record.key].salesUnit"
                />
                <template v-if="record.repairExtras === 'typedFields'">
                  <a-input-number
                    class="annual-init-workspace__field annual-init-workspace__field-number"
                    :min="0"
                    :step="0.01"
                    :precision="2"
                    placeholder="修正子项金额（万元）"
                    style="width: 100%"
                    v-model:value="repairState[record.key].amount"
                  />
                  <a-date-picker
                    class="annual-init-workspace__field annual-init-workspace__field-date"
                    placeholder="修正合同签约时间"
                    style="width: 100%"
                    v-model:value="repairState[record.key].signDate"
                  />
                </template>
              </template>

              <template v-else-if="record.repairType === 'assignee'">
                <div class="annual-init-workspace__assignment-group">
                  <div class="annual-init-workspace__assignment-title">
                    任务指派去向（依据组织架构自动匹配）
                  </div>
                  <div
                    :class="[
                      'annual-init-workspace__assignment-card',
                      { 'is-ready': readyRows[record.key] },
                    ]"
                  >
                    <span class="annual-init-workspace__assignment-main">
                      <UserOutlined />
                      <span class="annual-init-workspace__assignment-copy">
                        <span class="annual-init-workspace__assignment-dept">
                          {{ splitAssignee(record.assignee).dept }}
                        </span>
                        <span class="annual-init-workspace__assignment-role">
                          {{ splitAssignee(record.assignee).role }}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </template>

              <template v-else-if="record.repairType === 'compound'">
                <div class="annual-init-workspace__compound">
                  <div
                    v-for="step in record.compoundSteps"
                    :key="step.title"
                    class="annual-init-workspace__compound-item"
                  >
                    <div class="annual-init-workspace__compound-title">{{ step.title }}</div>
                    <a-select
                      v-if="step.placeholder"
                      class="annual-init-workspace__field"
                      :placeholder="step.placeholder"
                      :options="annualInitializationGovernanceRepairOptions"
                      v-model:value="compoundState[record.key].dept"
                    />
                    <div
                      v-else-if="compoundState[record.key].updated"
                      :class="[
                        'annual-init-workspace__assignment-card',
                        { 'is-ready': readyRows[record.key] },
                      ]"
                    >
                      <span class="annual-init-workspace__assignment-main">
                        <UserOutlined />
                        <span class="annual-init-workspace__assignment-copy">
                          <span class="annual-init-workspace__assignment-dept">
                            {{ selectedDeptLabel(compoundState[record.key].dept) }}
                          </span>
                          <span class="annual-init-workspace__assignment-role">
                            商机管理员
                          </span>
                        </span>
                      </span>
                    </div>
                    <div v-else class="annual-init-workspace__compound-pending">
                      {{ step.pending }}
                    </div>
                  </div>
                </div>
              </template>

              <template v-else-if="record.repairType === 'warningNote'">
                <div class="annual-init-workspace__warning-note">
                  {{ record.warningNote }}
                </div>
              </template>

              <template v-else-if="record.repairType === 'duplicateChoice'">
                <div class="annual-init-workspace__duplicate-choice">
                  <div class="annual-init-workspace__duplicate-title">
                    {{ record.duplicatePrompt }}
                  </div>
                  <div class="annual-init-workspace__duplicate-grid">
                    <div
                      v-for="option in record.duplicateOptions"
                      :key="option.key"
                      :class="[
                        'annual-init-workspace__duplicate-option',
                        { 'is-active': option.active },
                      ]"
                    >
                      <div class="annual-init-workspace__duplicate-option-title">
                        {{ option.title }}
                      </div>
                      <div class="annual-init-workspace__duplicate-option-meta">
                        {{ option.meta }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </template>

          <template v-else-if="column.dataIndex === 'actions'">
            <div class="annual-init-workspace__row-actions">
              <template v-if="readyRows[record.key] && !ignoredRows[record.key]">
                <div class="annual-init-workspace__ready-actions">
                  <a-button class="annual-init-workspace__ready-state" disabled>
                    <CheckCircleOutlined />
                    核定就绪
                  </a-button>
                  <a-button
                    type="text"
                    class="annual-init-workspace__ignored-cancel"
                    @click.prevent="setReady(record.key, false)"
                  >
                    <UndoOutlined />
                    撤回重新核定
                  </a-button>
                </div>
              </template>
              <template v-else-if="!ignoredRows[record.key]">
                <template v-if="record.repairType === 'compound'">
                  <a-button
                    type="primary"
                    class="annual-init-workspace__row-primary"
                    @click.prevent="handlePrimaryAction(record)"
                  >
                    <CheckCircleOutlined />
                    {{ record.actionPrimary }}
                  </a-button>
                  <a-button
                    class="annual-init-workspace__row-secondary"
                    :disabled="!compoundState[record.key].updated"
                    @click.prevent="handleSecondaryAction(record)"
                  >
                    <CheckCircleOutlined />
                    确认发派方案
                  </a-button>
                </template>
                <a-button
                  v-else-if="record.actionPrimary"
                  type="primary"
                  class="annual-init-workspace__row-primary"
                  @click.prevent="handlePrimaryAction(record)"
                >
                  <CheckCircleOutlined />
                  {{ record.actionPrimary }}
                </a-button>
                <a-button
                  type="default"
                  class="annual-init-workspace__row-danger"
                  @click.prevent="setIgnored(record.key, true)"
                >
                  <StopOutlined />
                  {{ record.actionDanger }}
                </a-button>
              </template>
              <template v-else>
                <div class="annual-init-workspace__ignored-actions">
                  <a-button class="annual-init-workspace__ignored-state" disabled>
                    <StopOutlined />
                    已忽略该项
                  </a-button>
                  <a-button
                    type="text"
                    class="annual-init-workspace__ignored-cancel"
                    @click.prevent="setIgnored(record.key, false)"
                  >
                    <UndoOutlined />
                    撤回重新核定
                  </a-button>
                </div>
              </template>
            </div>
          </template>
        </template>
        </a-table>
      </template>

      <div v-else class="annual-init-workspace__success-state">
        <div class="annual-init-workspace__success-watermark">
          <SafetyCertificateOutlined />
        </div>
        <div class="annual-init-workspace__success-icon-shell">
          <SafetyCertificateOutlined />
        </div>
        <div class="annual-init-workspace__success-title">全量数据校验通过</div>
        <div class="annual-init-workspace__success-text">
          恭喜！本次上传的
          <span class="annual-init-workspace__success-count">{{ readyMetricValue }}</span>
          {{ successText }}
        </div>
        <div
          v-if="successPolicyText"
          class="annual-init-workspace__success-policy"
        >
          系统检测到其中的
          <span class="annual-init-workspace__success-policy-count">
            {{ successPolicyConflictCount }}
          </span>
          项涉及台账冲突，将依照“{{ successPolicyText }}”的策略进行处理。
        </div>
        <a-button
          type="primary"
          class="annual-init-workspace__success-primary"
          @click.prevent="handleFinalize"
        >
          确认并直接定稿
          <CheckCircleOutlined />
        </a-button>
      </div>
    </a-card>

    <a-card v-if="!isNoIssueMode" :bordered="false" class="annual-init-workspace__footer-card">
      <div class="annual-init-workspace__footer">
        <div class="annual-init-workspace__conclusion">
          <div class="annual-init-workspace__conclusion-icon-shell">
            <InfoCircleOutlined />
          </div>
          <div class="annual-init-workspace__conclusion-copy">
            <div class="annual-init-workspace__conclusion-title">
              {{ workspaceConclusion.title }}
            </div>
            <div class="annual-init-workspace__conclusion-text">
              {{ workspaceConclusion.text }}
            </div>
            <div
              v-if="workspaceConclusion.hint"
              class="annual-init-workspace__conclusion-hint"
            >
              {{ workspaceConclusion.hint }}
            </div>
          </div>
        </div>

        <div class="annual-init-workspace__pending">
          <a-statistic
            :value="displayPendingCount"
            :value-style="{ color: '#3b66ea', fontSize: '48px', fontWeight: 700, lineHeight: 1 }"
            class="annual-init-workspace__pending-stat"
          >
            <template #title>
              <span class="annual-init-workspace__pending-label">
                {{ workspaceConclusion.pending }}
              </span>
            </template>
            <template #suffix>
              <span class="annual-init-workspace__pending-unit">
                {{ workspaceConclusion.pendingUnit }}
              </span>
            </template>
          </a-statistic>
        </div>
      </div>
    </a-card>

    <div
      v-if="restartWarningVisible"
      class="annual-init-workspace__restart-overlay"
    >
      <div class="annual-init-workspace__restart-dialog">
        <div class="annual-init-workspace__restart-warning">
        <div class="annual-init-workspace__restart-warning-icon-shell">
          <ExclamationCircleOutlined />
        </div>
        <div class="annual-init-workspace__restart-warning-title">治理重置预警</div>
        <div class="annual-init-workspace__restart-warning-text">
          点击重新上传将物理性清空当前沙箱进度（已处理
          <span class="annual-init-workspace__restart-warning-count">{{ handledRowCount }}</span>
          项）。该操作不可撤销。
        </div>
        <div class="annual-init-workspace__restart-warning-actions">
          <a-button
            class="annual-init-workspace__restart-warning-cancel"
            @click="handleCancelRestart"
          >
            取消
          </a-button>
          <a-button
            type="primary"
            class="annual-init-workspace__restart-warning-confirm"
            @click="handleConfirmRestart"
          >
            确认重置上传
          </a-button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import {
  CalendarOutlined,
  ApartmentOutlined,
  ArrowRightOutlined,
  BarsOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SafetyCertificateOutlined,
  StopOutlined,
  TeamOutlined,
  UndoOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import {
  annualInitializationGovernanceColumns,
  annualInitializationGovernanceRepairOptions,
  annualInitializationGovernanceWorkspace,
} from '@/data/data-import-center/annualInitializationData'

const props = defineProps({
  scenarioKey: {
    type: String,
    default: 'eis',
  },
  demoMode: {
    type: String,
    default: 'with-issues',
  },
})

const emit = defineEmits(['status-change', 'finalize', 'restart'])
const activeTab = ref('all')
const restartWarningVisible = ref(false)
const selectedBusinessStrategy = ref('smart-overwrite')

const isBusinessMode = computed(() => props.scenarioKey === 'business')
const isNoIssueMode = computed(() => props.demoMode === 'without-issues')

const repairState = reactive({
  'row-115': {
    dept: undefined,
    salesUnit: '',
    amount: null,
    signDate: null,
  },
  'business-row-115': {
    dept: undefined,
    salesUnit: '',
    amount: null,
    signDate: null,
  },
  'business-row-118': {
    dept: undefined,
    salesUnit: '',
    amount: null,
    signDate: null,
  },
  'business-row-121': {
    dept: undefined,
    salesUnit: '',
    amount: null,
    signDate: null,
  },
  'business-row-126': {
    dept: undefined,
    salesUnit: '',
    amount: null,
    signDate: null,
  },
})

const ignoredRows = reactive({})
const readyRows = reactive({})
const compoundState = reactive({
  'row-compound': {
    dept: undefined,
    updated: false,
  },
})

const metricIconMap = {
  ApartmentOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
}

const strategyIconMap = {
  CalendarOutlined,
  HistoryOutlined,
  EditOutlined,
  StopOutlined,
}

const workspaceRows = computed(() =>
  isBusinessMode.value
    ? annualInitializationGovernanceWorkspace.businessRows
    : annualInitializationGovernanceWorkspace.rows,
)

const workspaceMetrics = computed(() =>
  isBusinessMode.value
    ? annualInitializationGovernanceWorkspace.businessMetrics
    : annualInitializationGovernanceWorkspace.metrics,
)

const workspaceConclusion = computed(() =>
  isBusinessMode.value
    ? annualInitializationGovernanceWorkspace.businessConclusion
    : annualInitializationGovernanceWorkspace.conclusion,
)

const businessStrategy = computed(() =>
  isBusinessMode.value ? annualInitializationGovernanceWorkspace.businessStrategy : null,
)

const strategyNotes = {
  'overwrite-all': '已设为全部覆盖导入',
  'smart-overwrite': '已设为按时间自动覆盖',
  'keep-existing': '已设为所有不覆盖',
}

const strategyOptions = computed(() =>
  (businessStrategy.value?.options || []).map((option) => ({
    ...option,
    tone: option.key === selectedBusinessStrategy.value ? 'active' : 'muted',
  })),
)

const metricColumnSpan = computed(() => {
  if (displayMetrics.value.length === 2) return 12
  if (displayMetrics.value.length === 3) return 8
  return 6
})

const filteredRows = computed(() => {
  if (isBusinessMode.value || activeTab.value === 'all') return workspaceRows.value
  return workspaceRows.value.filter((row) => row.type === activeTab.value)
})

const handledRowsByType = computed(() =>
  workspaceRows.value.reduce(
    (accumulator, row) => {
      if (ignoredRows[row.key] || readyRows[row.key]) {
        accumulator[row.type] = (accumulator[row.type] || 0) + 1
      }
      return accumulator
    },
    { physical: 0, admit: 0, writeoff: 0 },
  ),
)

const handledRowCount = computed(() =>
  workspaceRows.value.filter(
    (row) => ignoredRows[row.key] || readyRows[row.key],
  ).length,
)

const allRowsIgnored = computed(() =>
  workspaceRows.value.every((row) => ignoredRows[row.key]),
)

const readyRowCount = computed(() => Object.values(readyRows).filter(Boolean).length)

const allRowsResolved = computed(
  () => handledRowCount.value === workspaceRows.value.length,
)

const displayMetrics = computed(() =>
  workspaceMetrics.value.map((metric) => {
    if (isNoIssueMode.value) {
      if (isBusinessMode.value && metric.key === 'conflict') {
        return {
          ...metric,
          title: '台账冲突规模',
          note: strategyNotes[selectedBusinessStrategy.value],
        }
      }

      if (metric.key === 'ready') {
        return metric
      }

      return {
        ...metric,
        value: '0',
        tone: 'muted',
      }
    }

    if (metric.key === 'ready') {
      return {
        ...metric,
        value: String(Number(metric.value) + readyRowCount.value),
      }
    }

    if (isBusinessMode.value && metric.key === 'conflict') {
      return {
        ...metric,
        title: '台账冲突规模',
        note: strategyNotes[selectedBusinessStrategy.value],
      }
    }

    if (metric.key === 'physical' || metric.key === 'admit' || metric.key === 'writeoff') {
      return {
        ...metric,
        value: String(
          Math.max(0, Number(metric.value) - (handledRowsByType.value[metric.key] || 0)),
        ),
      }
    }

    return metric
  }),
)

const readyMetricValue = computed(() => {
  const readyMetric = workspaceMetrics.value.find((metric) => metric.key === 'ready')
  return readyMetric?.value ?? '0'
})

const successText = computed(() =>
  isBusinessMode.value
    ? '行经营数据未发现物理性逻辑错误。'
    : '条 EIS 数据未发现物理性逻辑错误。'
)

const successPolicyText = computed(() => {
  if (!isBusinessMode.value || !isNoIssueMode.value) return ''

  const strategyTextMap = {
    'overwrite-all': '所有覆盖导入',
    'smart-overwrite': '依时间戳自动覆盖',
    'keep-existing': '所有不覆盖',
  }

  return strategyTextMap[selectedBusinessStrategy.value]
})

const successPolicyConflictCount = computed(() => {
  const conflictMetric = workspaceMetrics.value.find((metric) => metric.key === 'conflict')
  return conflictMetric?.value ?? '0'
})

const workspacePrimaryLabel = computed(() =>
  allRowsResolved.value || isNoIssueMode.value
    ? '提交全量方案并定稿'
    : annualInitializationGovernanceWorkspace.actions.primary,
)

const bulkActionLabel = computed(() => (allRowsIgnored.value ? '全部重新核定' : '全部忽略'))

const displayPendingCount = computed(() =>
  Math.max(
    0,
    Number(workspaceConclusion.value.pendingCount) - handledRowCount.value,
  ),
)

const hasGovernanceProgress = computed(() => {
  const hasIgnoredOrReady = workspaceRows.value.some(
    (row) => ignoredRows[row.key] || readyRows[row.key],
  )

  const hasCompoundProgress = Object.values(compoundState).some(
    (value) => value?.updated || value?.dept,
  )

  const hasRepairInput = Object.values(repairState).some((value) => {
    if (!value) return false
    return Boolean(
      value.dept ||
        value.salesUnit?.trim() ||
        value.amount !== null && value.amount !== undefined ||
        value.signDate,
    )
  })

  return hasIgnoredOrReady || hasCompoundProgress || hasRepairInput
})

watch(
  [allRowsResolved, hasGovernanceProgress, handledRowCount],
  ([allResolved, hasProgress, handledCount]) => {
    emit('status-change', {
      allRowsResolved: allResolved,
      hasGovernanceProgress: hasProgress,
      handledRowCount: handledCount,
    })
  },
  { immediate: true },
)

function isIssueResolved(record, issueIndex) {
  const state = repairState[record.key]
  if (!state) return false

  if (record.key === 'row-115') {
    if (issueIndex === 0) return Boolean(state.dept)
    if (issueIndex === 1) return Boolean(state.salesUnit?.trim())
    if (issueIndex === 2) return state.amount !== null && state.amount !== undefined
    if (issueIndex === 3) return Boolean(state.signDate)
  }

  return false
}

function setIgnored(rowKey, ignored) {
  ignoredRows[rowKey] = ignored
  if (ignored) {
    readyRows[rowKey] = false
  }
}

function setReady(rowKey, ready) {
  readyRows[rowKey] = ready
  if (ready) {
    ignoredRows[rowKey] = false
  }
}

function handlePrimaryAction(record) {
  if (record.repairType === 'compound') {
    if (compoundState[record.key]?.dept) {
      compoundState[record.key].updated = true
    }
    return
  }

  if (
    record.actionPrimary === '确认发派方案' ||
    record.actionPrimary === '更新并应用' ||
    record.actionPrimary === '确认删除' ||
    record.actionPrimary === '保留并剔除其他'
  ) {
    setReady(record.key, true)
  }
}

function handleSecondaryAction(record) {
  if (record.repairType === 'compound' && compoundState[record.key]?.updated) {
    setReady(record.key, true)
  }
}

function handleBulkAction() {
  if (allRowsIgnored.value) {
    workspaceRows.value.forEach((row) => {
      setIgnored(row.key, false)
    })
    return
  }

  workspaceRows.value.forEach((row) => {
    setIgnored(row.key, true)
  })
}

function handleFinalize() {
  if (!allRowsResolved.value && !isNoIssueMode.value) return
  emit('finalize')
}

function handleRestart() {
  if (hasGovernanceProgress.value) {
    restartWarningVisible.value = true
    return
  }

  emit('restart')
}

function handleCancelRestart() {
  restartWarningVisible.value = false
}

function handleConfirmRestart() {
  restartWarningVisible.value = false
  emit('restart')
}

function getRowClassName(record) {
  if (ignoredRows[record.key]) return 'annual-init-workspace__table-row is-ignored'
  if (readyRows[record.key]) return 'annual-init-workspace__table-row is-ready'
  return 'annual-init-workspace__table-row'
}

function splitAssignee(assignee) {
  const [deptPart, rolePart] = assignee.split(' 管理员')
  return {
    dept: deptPart || assignee,
    role: rolePart !== undefined ? '商机管理员' : '商机管理员',
  }
}

function selectedDeptLabel(value) {
  const matched = annualInitializationGovernanceRepairOptions.find((option) => option.value === value)
  return matched?.label || value || ''
}

function metricValueStyle(metric) {
  if (metric.tone === 'success') {
    return { color: '#12a16f', fontSize: '38px', fontWeight: 700, lineHeight: 1 }
  }

  if (metric.tone === 'muted') {
    return { color: '#b8c3d3', fontSize: '38px', fontWeight: 700, lineHeight: 1 }
  }

  return { color: '#16223b', fontSize: '38px', fontWeight: 700, lineHeight: 1 }
}
</script>

<style scoped src="./styles/AnnualInitializationGovernanceWorkspace.css"></style>
