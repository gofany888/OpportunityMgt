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
        <a-button type="primary">
          <template #icon><SendOutlined /></template>
          {{ organizationOverviewConfig.draftActionText }}
        </a-button>
      </div>
    </div>

    <a-timeline class="detail-activity-timeline">
      <a-timeline-item
        v-for="entry in detailTimelineEntries"
        :key="entry.key"
        :color="entry.type === 'draft' ? '#1677ff' : '#91caff'"
      >
        <div :class="['detail-timeline-item-box', { 'is-draft': entry.type === 'draft' }]">
          <div class="detail-timeline-meta">
            <div class="detail-timeline-headline">
              <span class="detail-timeline-author">{{ entry.meta }} · {{ entry.author }}</span>
              <a-tag v-if="entry.status" color="warning" class="detail-timeline-tag">
                {{ entry.status }}
              </a-tag>
            </div>
            <a-space v-if="entry.type === 'draft'" :size="0">
              <a-button type="text" size="small" :icon="h(EditOutlined)" />
              <a-button type="text" size="small" danger :icon="h(DeleteOutlined)" />
            </a-space>
          </div>
          <div class="detail-timeline-content-container">
            <div 
              ref="contentRefs"
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
const expandedState = ref({})
const contentRefs = ref([])
const needsExpansion = ref({})

const checkOverflow = () => {
  detailTimelineEntries.forEach((entry, index) => {
    const el = contentRefs.value[index]
    if (el) {
      // scrollHeight > clientHeight 代表内容被 line-clamp 截断了
      needsExpansion.value[entry.key] = el.scrollHeight > el.clientHeight
    }
  })
}

onMounted(() => {
  nextTick(() => {
    checkOverflow()
  })
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOverflow)
})
</script>

<style scoped src="./styles/ProgressTrackingCard.css"></style>
