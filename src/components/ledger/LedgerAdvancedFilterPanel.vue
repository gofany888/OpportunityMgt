<template>
  <div class="ledger-filter-panel">
    <div class="ledger-filter-panel__header">
      <div class="ledger-filter-panel__title">深度数据漏斗</div>
      <div class="ledger-filter-panel__hint">与左侧搜索词、外侧快捷按钮为交集（AND）关系</div>
      <button class="ledger-filter-panel__close" @click="handleClose" aria-label="关闭">
        <CloseOutlined />
      </button>
    </div>

    <div class="ledger-filter-panel__body">
      <div class="ledger-filter-panel__grid">
        <section class="ledger-filter-panel__section">
          <div class="ledger-filter-panel__section-title">
            <ApartmentOutlined />
            <span>组织与权责</span>
          </div>
          <a-space wrap :size="[10, 10]" class="ledger-filter-panel__chips">
            <a-checkable-tag
              v-for="item in departmentOptions"
              :key="item"
              :checked="selectedDepartments.includes(item)"
              class="ledger-filter-panel__tag"
              @change="toggleDepartment(item)"
            >
              {{ item }}
            </a-checkable-tag>
          </a-space>
        </section>

        <section class="ledger-filter-panel__section">
          <div class="ledger-filter-panel__section-title">
            <LineChartOutlined />
            <span>财务与体量</span>
          </div>
          <div class="ledger-filter-panel__subsection">
            <div class="ledger-filter-panel__label">商机金额（万）</div>
            <div class="ledger-filter-panel__single-row">
              <a-checkable-tag
                v-for="item in amountOptions"
                :key="item.value"
                :checked="amountPreset === item.value"
                class="ledger-filter-panel__tag ledger-filter-panel__tag--single"
                @change="amountPreset = item.value"
              >
                {{ item.label }}
              </a-checkable-tag>
            </div>
            <div class="ledger-filter-panel__range">
              <div class="ledger-filter-panel__number-wrapper">
                <a-input-number
                  v-model:value="amountMin"
                  :step="0.01"
                  :min="0"
                  placeholder="自定义最小"
                  class="ledger-filter-panel__number-input"
                  :style="{ 
                    width: '100%',
                    height: '38px',
                    borderRadius: '14px',
                    border: '1px solid #d8e2f0',
                    backgroundColor: '#f8fbff',
                    fontSize: '13px'
                  }"
                />
                <span class="ledger-filter-panel__number-unit-overlay">万</span>
              </div>
              <span class="ledger-filter-panel__dash">-</span>
              <div class="ledger-filter-panel__number-wrapper">
                <a-input-number
                  v-model:value="amountMax"
                  :step="0.01"
                  :min="0"
                  placeholder="自定义最大"
                  class="ledger-filter-panel__number-input"
                  :style="{ 
                    width: '100%',
                    height: '38px',
                    borderRadius: '14px',
                    border: '1px solid #d8e2f0',
                    backgroundColor: '#f8fbff',
                    fontSize: '13px'
                  }"
                />
                <span class="ledger-filter-panel__number-unit-overlay">万</span>
              </div>
            </div>
          </div>
        </section>

        <section class="ledger-filter-panel__section">
          <div class="ledger-filter-panel__section-title">
            <TagsOutlined />
            <span>资产属性审计</span>
          </div>

          <div class="ledger-filter-panel__toggle-list">
            <div
              v-for="item in auditToggles"
              :key="item.label"
              class="ledger-filter-panel__toggle-card"
            >
              <div class="ledger-filter-panel__toggle-label">{{ item.label }}</div>
              <div
                :class="[
                  'ledger-filter-panel__toggle-switch',
                  `is-${item.tone}`
                ]"
              >
                <button
                  v-for="option in item.options"
                  :key="option.value"
                  type="button"
                  :class="[
                    'ledger-filter-panel__toggle-option',
                    { 'is-active': item.value === option.value }
                  ]"
                  @click="item.value = option.value"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="ledger-filter-panel__section">
          <div class="ledger-filter-panel__subsection">
            <div class="ledger-filter-panel__label">实绩达成率</div>
            <div class="ledger-filter-panel__single-row">
              <a-checkable-tag
                v-for="item in performanceOptions"
                :key="item.value"
                :checked="performancePreset === item.value"
                class="ledger-filter-panel__tag ledger-filter-panel__tag--single"
                @change="performancePreset = item.value"
              >
                {{ item.label }}
              </a-checkable-tag>
            </div>
          </div>

          <div class="ledger-filter-panel__section-title ledger-filter-panel__section-title--spaced">
            <CalendarOutlined />
            <span>时间与异动</span>
          </div>
          <a-select
            v-model:value="timePreset"
            class="ledger-filter-panel__select"
            :options="timeOptions"
          />
        </section>
      </div>
    </div>

    <div class="ledger-filter-panel__footer">
      <a-button type="text" class="ledger-filter-panel__reset" @click="handleReset">重置</a-button>
      <a-button type="primary" class="ledger-filter-panel__submit" @click="handleApply">搜索</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  ApartmentOutlined,
  LineChartOutlined,
  TagsOutlined,
  CalendarOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import './styles/LedgerAdvancedFilterPanel.css'

const props = defineProps({
  initialState: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['apply', 'reset', 'close'])

const departmentOptions = ['云业务交付部', '云运营产品部', '云智算应用部', '数字政府事业部']
const selectedDepartments = ref([])

const toggleDepartment = (item) => {
  if (selectedDepartments.value.includes(item)) {
    selectedDepartments.value = selectedDepartments.value.filter((entry) => entry !== item)
    return
  }
  selectedDepartments.value = [...selectedDepartments.value, item]
}

const amountOptions = [
  { label: '不限', value: 'all' },
  { label: '< 100', value: 'lt100' },
  { label: '100-500', value: 'mid' },
  { label: '> 500', value: 'gt500' }
]
const amountPreset = ref('all')
const amountMin = ref(null)
const amountMax = ref(null)

watch(
  amountPreset,
  (value) => {
    if (value === 'all') {
      amountMin.value = null
      amountMax.value = null
    } else if (value === 'lt100') {
      amountMin.value = null
      amountMax.value = 100
    } else if (value === 'mid') {
      amountMin.value = 100
      amountMax.value = 500
    } else if (value === 'gt500') {
      amountMin.value = 500
      amountMax.value = null
    }
  },
  { immediate: true }
)

const performanceOptions = [
  { label: '不限', value: 'all' },
  { label: '< 30%', value: 'lt30' },
  { label: '30-80%', value: 'mid' },
  { label: '> 80%', value: 'gt80' }
]
const performancePreset = ref('all')

const timeOptions = [
  { label: '不限更新时间', value: 'all' },
  { label: '超7天未更新', value: '7d' },
  { label: '超15天未更新', value: '15d' },
  { label: '超30天未更新', value: '30d' }
]
const timePreset = ref('all')

const auditToggles = ref([
  {
    label: '本地自建项（账外）',
    tone: 'orange',
    value: 'all',
    options: [
      { label: '不限', value: 'all' },
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' }
    ]
  },
  {
    label: '资源池',
    tone: 'purple',
    value: 'all',
    options: [
      { label: '不限', value: 'all' },
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' }
    ]
  }
])

const createDefaultState = () => ({
  departments: [],
  amountPreset: 'all',
  amountMin: null,
  amountMax: null,
  performancePreset: 'all',
  timePreset: 'all',
  auditToggles: [
    { label: '本地自建项（账外）', tone: 'orange', value: 'all' },
    { label: '权责预估单（含负债）', tone: 'purple', value: 'all' }
  ]
})

const applyState = (state) => {
  selectedDepartments.value = [...state.departments]
  amountPreset.value = state.amountPreset
  amountMin.value = state.amountMin
  amountMax.value = state.amountMax
  performancePreset.value = state.performancePreset
  timePreset.value = state.timePreset
  auditToggles.value = auditToggles.value.map((item, index) => ({
    ...item,
    value: state.auditToggles[index]?.value ?? 'all'
  }))
}

watch(
  () => props.initialState,
  (state) => {
    applyState({
      ...createDefaultState(),
      ...state
    })
  },
  { immediate: true, deep: true }
)

const buildPayload = () => ({
  departments: [...selectedDepartments.value],
  amountPreset: amountPreset.value,
  amountMin: amountMin.value,
  amountMax: amountMax.value,
  performancePreset: performancePreset.value,
  timePreset: timePreset.value,
  auditToggles: auditToggles.value.map((item) => ({
    label: item.label,
    tone: item.tone,
    value: item.value
  }))
})

const handleReset = () => {
  const nextState = createDefaultState()
  applyState(nextState)
  emit('reset', nextState)
}

const handleApply = () => {
  emit('apply', buildPayload())
}

const handleClose = () => {
  emit('close')
}
</script>
