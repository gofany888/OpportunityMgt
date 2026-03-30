<template>
  <div ref="headerActionsRef" class="ledger-header-actions">
    <div class="ledger-header-actions__left">
      <div class="ledger-header-actions__search-anchor">
        <div class="ledger-header-actions__search-group">
          <div class="ledger-header-actions__search">
            <a-input
              v-model:value="searchText"
              :placeholder="ledgerHeaderConfig.searchPlaceholder"
              class="ledger-search-input"
              allow-clear
            >
              <template #prefix>
                <SearchOutlined class="ledger-search-icon" />
              </template>
            </a-input>
          </div>

          <a-button
            :class="[
              'ledger-header-actions__filter-btn',
              {
                'is-active': filterVisible || appliedFilterCount > 0
              }
            ]"
            @click="emit('toggle-filter-panel')"
          >
            <span class="ledger-header-actions__filter-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M2.5 3.5H13.5L9.5 8.1V12.2L6.5 14V8.1L2.5 3.5Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="ledger-header-actions__filter-text">筛选</span>
            <span v-if="appliedFilterCount > 0" class="ledger-header-actions__filter-count">
              {{ appliedFilterCount }}
            </span>
          </a-button>

          <div v-if="appliedFilterCount > 0" class="ledger-header-actions__filter-state">
            <span class="ledger-header-actions__filter-divider" />
            <button
              type="button"
              class="ledger-header-actions__filter-clear"
              @click="clearAllSearch"
            >
              <CloseOutlined />
            </button>
          </div>
        </div>

        <LedgerAdvancedFilterPanel
          v-if="filterVisible"
          :initial-state="filterState"
          @apply="handleApply"
          @reset="handleReset"
          @close="emit('close-filter-panel')"
        />
      </div>

      <a-space :size="10" class="ledger-header-actions__badges">
        <a-tag
          v-for="badge in ledgerHeaderConfig.badges"
          :key="badge.label"
          :bordered="false"
          :class="[
            'ledger-header-badge',
            `is-${badge.type}`,
            { 'is-active': badge.type === 'pending' && pendingFilterActive }
          ]"
          @click="badge.type === 'pending' && emit('toggle-pending-filter')"
        >
          <component :is="getIcon(badge.type)" class="ledger-header-badge__icon" />
          <span class="ledger-header-badge__label">{{ badge.label }}</span>
          <span class="ledger-header-badge__count tabular-nums">{{ badge.count }}</span>
        </a-tag>
      </a-space>
    </div>

    <a-space :size="10" class="ledger-header-actions__btns">
      <a-button type="primary" :icon="h(PlusOutlined)">新建商机</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { 
  SearchOutlined, 
  PlusOutlined,
  WarningOutlined,
  UserOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import LedgerAdvancedFilterPanel from '@/components/ledger/LedgerAdvancedFilterPanel.vue'
import { ledgerHeaderConfig } from '@/data/ledgerData'

defineProps({
  pendingFilterActive: {
    type: Boolean,
    default: false
  },
  filterVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-pending-filter', 'toggle-filter-panel', 'close-filter-panel'])
const searchText = ref('')
const headerActionsRef = ref(null)
const createDefaultFilterState = () => ({
  departments: [],
  amountPreset: 'all',
  amountMin: null,
  amountMax: null,
  performancePreset: 'all',
  timePreset: 'all',
  auditToggles: [
    { label: '本地自建项（账外）', tone: 'orange', value: 'all' },
    { label: '资源池', tone: 'purple', value: 'all' }
  ]
})
const filterState = ref(createDefaultFilterState())
const appliedFilterCount = ref(0)

const getIcon = (type) => {
  if (type === 'warning') return WarningOutlined
  if (type === 'pending') return UserOutlined
  return UserOutlined
}

const handlePointerDown = (event) => {
  if (!headerActionsRef.value || !headerActionsRef.value.contains(event.target)) {
    emit('close-filter-panel')
  }
}

const countAppliedFilters = (state) => {
  let count = 0
  const defaults = createDefaultFilterState()
  if (JSON.stringify(state.departments) !== JSON.stringify(defaults.departments)) count += 1
  if (
    state.amountPreset !== defaults.amountPreset ||
    state.amountMin !== defaults.amountMin ||
    state.amountMax !== defaults.amountMax
  ) count += 1
  if (state.performancePreset !== defaults.performancePreset) count += 1
  if (state.timePreset !== defaults.timePreset) count += 1
  state.auditToggles.forEach((item, index) => {
    if (item.value !== defaults.auditToggles[index].value) count += 1
  })
  return count
}

const handleApply = (nextState) => {
  filterState.value = nextState
  appliedFilterCount.value = countAppliedFilters(nextState)
  emit('close-filter-panel')
}

const handleReset = (nextState) => {
  filterState.value = nextState
  appliedFilterCount.value = 0
}

const clearAllSearch = () => {
  searchText.value = ''
  filterState.value = createDefaultFilterState()
  appliedFilterCount.value = 0
  emit('close-filter-panel')
}

onMounted(() => {
  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>

<style scoped src="./styles/LedgerHeader.css"></style>
