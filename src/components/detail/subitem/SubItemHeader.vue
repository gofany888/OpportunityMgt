<template>
  <a-card id="software" :bordered="false" class="detail-subheader-card">
    <div class="detail-subheader-top">
      <div class="detail-subheader-top-main">
        <a-space :size="12">
          <div class="detail-subheader-icon">
            <CodeOutlined />
          </div>
          <div
            ref="titleEditRef"
            class="detail-subheader-title-edit"
            @click="startEditTitle"
          >
            <a-input
              v-if="isEditingTitle"
              ref="titleInputRef"
              v-model:value="draftTitle"
              class="detail-subheader-title-input"
              size="small"
              @press-enter="confirmEditTitle"
              @keydown.esc="cancelEditTitle"
              @click.stop
            />
            <a-typography-title v-else :level="5" class="detail-subheader-title">
              <span>{{ currentTitle }}</span>
              <span v-if="isTitleModified" class="modified-dot" aria-hidden="true"></span>
            </a-typography-title>
            <EditOutlined v-if="!isEditingTitle" class="detail-subheader-title-edit-icon" />
          </div>
          <div class="detail-subheader-code-inline">
            <span>{{ subItemHeaderConfig.codeLabel }} {{ subItemHeaderConfig.code }}</span>
          </div>
        </a-space>
        <div class="detail-subheader-inline-meta">
          <div class="detail-subheader-owner-card">
            <div class="detail-subheader-owner-avatar">
              <UserOutlined />
            </div>
            <div class="detail-subheader-owner-info">
              <span class="detail-subheader-owner-label">{{ subItemHeaderConfig.pmLabel }}</span>
              <span class="detail-subheader-owner-name">{{ subItemHeaderConfig.pm }}</span>
            </div>
            <EditOutlined class="detail-subheader-owner-edit-icon" />
          </div>
        </div>
      </div>
      <a-button
        type="text"
        :icon="h(isExpanded ? UpOutlined : DownOutlined)"
        @click="$emit('toggle')"
      />
    </div>

    <a-row :gutter="[24, 16]" class="detail-subheader-metrics-row">
      <a-col
        v-for="metric in subItemHeaderConfig.metrics"
        :key="metric.key"
        :xs="24"
        :sm="12"
        :md="6"
        :class="[
          'detail-subheader-metric-col',
          {
            'is-first': metric.key === 'amount',
            'is-last': metric.key === 'invoice',
            'is-middle': !['amount', 'invoice'].includes(metric.key),
          },
        ]"
      >
        <div class="detail-subheader-metric-stack">
          <div class="detail-subheader-label">{{ metric.label }}</div>
          <div
            class="detail-subheader-metric-edit detail-inline-edit-wrapper"
            :data-field-key="`subitem-metric-${metric.key}`"
            @click.stop="!isEditingMetric(metric.key) && startMetricEdit(metric.key, metric.value)"
          >
            <div v-if="isEditingMetric(metric.key)" class="detail-subheader-metric-input-wrap">
              <a-input
                ref="metricInputRef"
                v-model:value="draftMetricValue"
                class="detail-subheader-metric-input"
                size="small"
                @press-enter="confirmMetricEdit(metric.key)"
                @keydown.esc="cancelMetricEdit"
                @click.stop
              >
                <template v-if="metricPrefix(metric.value)" #prefix>
                  <span class="detail-subheader-metric-affix">{{ metricPrefix(metric.value) }}</span>
                </template>
                <template v-if="metricSuffix(metric.value)" #suffix>
                  <span class="detail-subheader-metric-affix">{{ metricSuffix(metric.value) }}</span>
                </template>
              </a-input>
            </div>
            <div v-else class="detail-subheader-metric-display">
              <div class="detail-subheader-value is-accent num-font">{{ metric.value }}</div>
              <span v-if="isMetricModified(metric.key, metric.value)" class="modified-dot" aria-hidden="true"></span>
              <EditOutlined class="detail-subheader-metric-edit-icon" />
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
import { nextTick, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { CodeOutlined, DownOutlined, EditOutlined, UpOutlined, UserOutlined } from '@ant-design/icons-vue'
import { subItemHeaderConfig } from '@/data/detailPageData'

defineProps({
  isExpanded: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle'])

const titleEditRef = ref(null)
const titleInputRef = ref(null)
const metricInputRef = ref(null)
const initialTitle = subItemHeaderConfig.title
const currentTitle = ref(subItemHeaderConfig.title)
const draftTitle = ref(subItemHeaderConfig.title)
const isEditingTitle = ref(false)
const isTitleModified = ref(false)
const editingMetricKey = ref('')
const draftMetricValue = ref('')

const syncModifiedState = () => {
  isTitleModified.value = currentTitle.value.trim() !== initialTitle.trim()
}

const startEditTitle = async () => {
  if (isEditingTitle.value) {
    return
  }

  draftTitle.value = currentTitle.value
  isEditingTitle.value = true
  await nextTick()
  titleInputRef.value?.focus?.()
}

const confirmEditTitle = () => {
  const nextTitle = draftTitle.value.trim()

  currentTitle.value = nextTitle || currentTitle.value
  draftTitle.value = currentTitle.value
  subItemHeaderConfig.title = currentTitle.value
  isEditingTitle.value = false
  syncModifiedState()
}

const cancelEditTitle = () => {
  draftTitle.value = currentTitle.value
  isEditingTitle.value = false
}

const isEditingMetric = (key) => editingMetricKey.value === key

const metricPrefix = (value) => (String(value).includes('¥') ? '¥' : '')

const metricSuffix = (value) => (String(value).includes('万') ? '万' : '')

const normalizeMetricNumber = (value) => {
  const raw = String(value).replace(/[¥,\s万]/g, '').trim()

  if (!raw) {
    return ''
  }

  const normalized = Number(raw)

  return Number.isFinite(normalized) ? String(normalized) : raw
}

const parseMetricValue = (value) => String(value).replace(/[¥,\s万]/g, '')

const formatMetricValue = (rawValue, originalValue) => {
  const trimmed = rawValue.trim()

  if (!trimmed) {
    return originalValue
  }

  const prefix = metricPrefix(originalValue)
  const suffix = metricSuffix(originalValue)

  return `${prefix}${trimmed}${suffix ? ` ${suffix}` : ''}`.trim()
}

const initialMetricValueMap = Object.fromEntries(
  subItemHeaderConfig.metrics.map((metric) => [metric.key, normalizeMetricNumber(metric.value)])
)

const isMetricModified = (key, value) => normalizeMetricNumber(value) !== initialMetricValueMap[key]

const startMetricEdit = async (key, value) => {
  if (isEditingTitle.value) {
    confirmTitleEdit()
  }

  editingMetricKey.value = key
  draftMetricValue.value = parseMetricValue(value)
  await nextTick()
  metricInputRef.value?.focus?.()
}

const confirmMetricEdit = (key) => {
  const metric = subItemHeaderConfig.metrics.find((item) => item.key === key)

  if (!metric) {
    editingMetricKey.value = ''
    return
  }

  const nextValue = draftMetricValue.value.trim()
  metric.value = formatMetricValue(nextValue, metric.value)
  draftMetricValue.value = metric.value
  editingMetricKey.value = ''
}

const cancelMetricEdit = () => {
  editingMetricKey.value = ''
}

const handleDocumentMouseDown = (event) => {
  const activeWrapper = event.target.closest('.detail-inline-edit-wrapper')

  if (isEditingTitle.value && activeWrapper?.dataset.fieldKey !== 'detail-title') {
    confirmEditTitle()
  }

  if (
    editingMetricKey.value &&
    activeWrapper?.dataset.fieldKey !== `subitem-metric-${editingMetricKey.value}`
  ) {
    confirmMetricEdit(editingMetricKey.value)
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentMouseDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentMouseDown)
})
</script>

<style scoped src="./styles/SubItemHeader.css"></style>
