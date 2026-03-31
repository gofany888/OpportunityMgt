<template>
  <!-- 商机进度执行轨迹卡片 -->
  <a-card :bordered="false" class="detail-info-card detail-timeline-card">
    <template #title>
      <div class="detail-timeline-header">
        <div class="detail-timeline-title">
          <ClockCircleOutlined class="detail-timeline-icon" />
          <span class="detail-timeline-text">{{ organizationOverviewConfig.timelineTitle }}</span>
          <span class="detail-timeline-suffix">(仅展示最近三条)</span>
        </div>
        <a-typography-link class="detail-timeline-action-link">{{ organizationOverviewConfig.timelineAction }}</a-typography-link>
      </div>
    </template>

    <div class="detail-draft-box">
      <a-textarea
        v-model:value="draftText"
        :rows="4"
        :placeholder="organizationOverviewConfig.draftPlaceholder"
      />
      <div class="detail-draft-actions">
        <a-button type="primary" @click="submitDraftProgress">
          <template #icon><SendOutlined /></template>
          {{ organizationOverviewConfig.draftActionText }}
        </a-button>
      </div>
    </div>

    <a-timeline class="detail-activity-timeline">
      <a-timeline-item
        v-for="entry in timelineEntries"
        :key="entry.key"
        :color="entry.type === 'draft' ? '#1677ff' : '#91caff'"
      >
        <div :class="['detail-timeline-item-box', { 'is-draft': entry.type === 'draft' }]">
          <div class="detail-timeline-meta">
            <div class="detail-timeline-headline">
              <span class="detail-timeline-author" v-if="entry.type === 'draft'">未提交 · 当前用户</span>
              <span class="detail-timeline-author" v-else>{{ entry.meta }} · {{ entry.author }}</span>
              <a-tag v-if="entry.status" color="warning" class="detail-timeline-tag">
                {{ entry.status }}
              </a-tag>
            </div>
            <a-space v-if="entry.type === 'draft'" :size="0">
              <a-button
                type="text"
                size="small"
                class="detail-timeline-edit-trigger"
                :icon="h(EditOutlined)"
                @click.stop="startTimelineEdit(entry)"
              />
              <a-button
                type="text"
                size="small"
                danger
                :icon="h(DeleteOutlined)"
                @click.stop="removeTimelineEntry(entry.key)"
              />
            </a-space>
          </div>
          <div class="detail-timeline-content-container">
            <template v-if="editingTimelineKey === entry.key">
              <div class="detail-timeline-inline-editor">
                <a-textarea
                  v-model:value="draftEntryText"
                  :rows="4"
                  class="detail-timeline-inline-textarea"
                  @pressEsc="cancelTimelineEdit"
                />
              </div>
            </template>
            <template v-else>
              <div 
                :ref="(el) => setContentRef(entry.key, el)"
                :class="['detail-timeline-content', { 'is-ellipsis': !expandedState[entry.key] }]"
              >
                {{ entry.content }}
              </div>
              <div 
                v-if="!expandedState[entry.key] && needsExpansion[entry.key]" 
                class="detail-timeline-expand-btn"
                @click="expandedState[entry.key] = true"
              >
                <span>点击阅读全文</span>
                <DoubleRightOutlined class="detail-expand-icon" />
              </div>
            </template>
          </div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </a-card>
</template>

<script setup>
import { ref, h, onMounted, nextTick, onUnmounted } from 'vue'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SendOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons-vue'
import {
  detailTimelineEntries,
  organizationOverviewConfig,
} from '@/data/detailPageData'

const draftText = ref('')
const timelineEntries = ref(detailTimelineEntries.map((entry) => ({ ...entry })))
const expandedState = ref({})
const contentRefs = ref({})
const needsExpansion = ref({})
const editingTimelineKey = ref(null)
const draftEntryText = ref('')

const startTimelineEdit = (entry) => {
  if (entry.type !== 'draft') {
    return
  }

  editingTimelineKey.value = entry.key
  draftEntryText.value = entry.content
}

const confirmTimelineEdit = (entry) => {
  if (!entry || editingTimelineKey.value !== entry.key) {
    return
  }

  const nextContent = draftEntryText.value.trim()
  entry.content = nextContent || entry.content
  editingTimelineKey.value = null
}

const cancelTimelineEdit = () => {
  editingTimelineKey.value = null
}

const handleGlobalClick = (event) => {
  if (!editingTimelineKey.value) {
    return
  }

  const activeEditor = event.target.closest('.detail-timeline-inline-editor')
  const actionButton = event.target.closest('.detail-timeline-edit-trigger')

  if (!activeEditor && !actionButton) {
    const targetEntry = timelineEntries.value.find((entry) => entry.key === editingTimelineKey.value)
    if (targetEntry) {
      confirmTimelineEdit(targetEntry)
    } else {
      cancelTimelineEdit()
    }
  }
}

const submitDraftProgress = async () => {
  const nextContent = draftText.value.trim()

  if (!nextContent) {
    return
  }

  timelineEntries.value.unshift({
    key: `draft-${Date.now()}`,
    type: 'draft',
    author: '当前用户',
    meta: '未提交',
    status: '待提交草稿',
    content: nextContent,
  })

  draftText.value = ''
  await nextTick()
  checkOverflow()
}

const removeTimelineEntry = async (key) => {
  const targetIndex = timelineEntries.value.findIndex((entry) => entry.key === key)

  if (targetIndex === -1) {
    return
  }

  if (editingTimelineKey.value === key) {
    cancelTimelineEdit()
  }

  timelineEntries.value.splice(targetIndex, 1)
  delete contentRefs.value[key]
  delete needsExpansion.value[key]
  await nextTick()
  checkOverflow()
}

const setContentRef = (key, el) => {
  if (el) {
    contentRefs.value[key] = el
  } else {
    delete contentRefs.value[key]
  }
}

const checkOverflow = () => {
  timelineEntries.value.forEach((entry) => {
    const el = contentRefs.value[entry.key]
    if (el) {
      const styles = window.getComputedStyle(el)
      const lineHeight = Number.parseFloat(styles.lineHeight) || 20.8
      const maxVisibleHeight = lineHeight * 3
      needsExpansion.value[entry.key] = el.scrollHeight - maxVisibleHeight > 1
    } else {
      needsExpansion.value[entry.key] = false
    }
  })
}

onMounted(() => {
  nextTick(() => {
    checkOverflow()
  })
  window.addEventListener('mousedown', handleGlobalClick, true)
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleGlobalClick, true)
  window.removeEventListener('resize', checkOverflow)
})
</script>

<style scoped src="./styles/ProgressTrackingCard.css"></style>
