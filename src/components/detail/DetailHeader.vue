<template>
  <a-card :bordered="false" class="detail-header-card">
    <div class="detail-header-row">
      <div class="detail-header-title-wrap">
        <BackIconButton class="detail-header-back" @click="handleBack" />
        <div
          class="detail-header-title-block detail-inline-edit-wrapper"
          data-field-key="detail-title"
          @click.stop="!isEditingTitle && startTitleEdit()"
        >
          <a-input
            v-if="isEditingTitle"
            ref="titleInputRef"
            v-model:value="draftTitle"
            class="detail-header-title-input"
            @pressEnter="confirmTitleEdit"
            @keydown.esc.prevent="cancelTitleEdit"
          />
          <div v-else :class="['detail-header-title-display', { 'is-modified': isTitleModified }]">
            <a-typography-title :level="4" class="detail-header-title">
              {{ currentTitle }}
            </a-typography-title>
            <EditOutlined class="inline-edit-icon detail-header-title-edit-icon" />
            <span v-if="isTitleModified" class="modified-dot detail-header-title-dot"></span>
          </div>
        </div>
        <div class="detail-owner-card">
          <div class="owner-avatar">
            <UserOutlined />
          </div>
          <div class="owner-info">
            <span class="owner-label">{{ detailHeaderConfig.ownerLabel }}</span>
            <span class="owner-name">{{ detailHeaderConfig.owner }}</span>
          </div>
          <EditOutlined class="owner-edit-icon" />
        </div>
      </div>

      <div class="detail-header-actions">
        <a-button class="action-btn-sync">
          <template #icon><SyncOutlined /></template>
          <span class="ml-[2px]">从 <span class="font-bold pr-[2px]">EIS</span> 更新</span>
        </a-button>

        <a-tooltip
          :title="isAttachmentUploading ? '附件上传中，请等待完成后提交' : null"
          placement="bottom"
        >
          <span class="action-btn-submit-tooltip-trigger">
            <a-button
              type="primary"
              class="action-btn-submit"
              :disabled="isAttachmentUploading"
              @click="handleSubmit"
            >
              <template #icon><SaveFilled /></template>
              {{ detailHeaderConfig.saveText }}
            </a-button>
          </span>
        </a-tooltip>

        <a-divider type="vertical" class="action-divider" />

        <a-dropdown placement="bottomRight">
          <a-button class="action-btn-more">
            <template #icon><EllipsisOutlined class="text-[18px]" /></template>
          </a-button>
          <template #overlay>
            <a-menu class="detail-more-menu">
              <a-menu-item key="link-eis">
                <template #icon><LinkOutlined /></template>
                手动关联 EIS 数据
              </a-menu-item>
              <a-menu-item key="assign-pm">
                <template #icon><UserAddOutlined /></template>
                指派项目经理
              </a-menu-item>
              
              <a-menu-divider />
              
              <a-menu-item key="history">
                <template #icon><HistoryOutlined /></template>
                变更记录与版本
              </a-menu-item>
              <a-menu-item key="export-pdf">
                <template #icon><FilePdfOutlined /></template>
                导出为 PDF
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { 
  EditOutlined, UserOutlined, 
  SyncOutlined, EllipsisOutlined, SaveFilled,
  LinkOutlined, UserAddOutlined, HistoryOutlined, FilePdfOutlined
} from '@ant-design/icons-vue'
import BackIconButton from '@/components/common/BackIconButton.vue'
import { detailHeaderConfig } from '@/data/detailPageData'

const router = useRouter()
const currentTitle = ref(detailHeaderConfig.title)
const draftTitle = ref(detailHeaderConfig.title)
const isEditingTitle = ref(false)
const titleInputRef = ref(null)
const initialTitle = detailHeaderConfig.title
const isTitleModified = ref(false)
const isAttachmentUploading = ref(false)
const timelineSubmitGuard = ref({ blocked: false, reason: '', focusKey: '' })

const startTitleEdit = async () => {
  draftTitle.value = currentTitle.value
  isEditingTitle.value = true
  await nextTick()
  titleInputRef.value?.focus?.()
  titleInputRef.value?.select?.()
}

const confirmTitleEdit = () => {
  if (!isEditingTitle.value) return
  const nextTitle = draftTitle.value.trim()
  currentTitle.value = nextTitle || currentTitle.value
  draftTitle.value = currentTitle.value
  isTitleModified.value = currentTitle.value !== initialTitle
  isEditingTitle.value = false
}

const cancelTitleEdit = () => {
  draftTitle.value = currentTitle.value
  isEditingTitle.value = false
}

const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push({ name: 'index-dashboard' })
}

const handleGlobalClick = (event) => {
  if (!isEditingTitle.value) return

  const activeWrapper = event.target.closest('.detail-inline-edit-wrapper')
  if (activeWrapper?.dataset.fieldKey !== 'detail-title') {
    confirmTitleEdit()
  }
}

const handleAttachmentUploadingChange = (event) => {
  isAttachmentUploading.value = Boolean(event.detail?.uploading)
}

const handleTimelineSubmitGuardChange = (event) => {
  timelineSubmitGuard.value = {
    blocked: Boolean(event.detail?.blocked),
    reason: event.detail?.reason || '',
    focusKey: event.detail?.focusKey || '',
  }
}

const handleSubmit = () => {
  if (isAttachmentUploading.value) {
    return
  }

  if (timelineSubmitGuard.value.blocked) {
    message.warning(timelineSubmitGuard.value.reason || '请先处理里程碑中的时间问题')

    if (timelineSubmitGuard.value.focusKey) {
      window.dispatchEvent(
        new CustomEvent('detail:focus-timeline-issue', {
          detail: { key: timelineSubmitGuard.value.focusKey },
        })
      )
    } else {
      const milestoneElement = document.getElementById('milestone')
      if (milestoneElement) {
        const headerHeight = 80
        const offsetPosition =
          milestoneElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }

    return
  }
}

onMounted(() => {
  window.addEventListener('mousedown', handleGlobalClick, true)
  window.addEventListener('detail:attachment-uploading-change', handleAttachmentUploadingChange)
  window.addEventListener('detail:timeline-submit-guard-change', handleTimelineSubmitGuardChange)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleGlobalClick, true)
  window.removeEventListener('detail:attachment-uploading-change', handleAttachmentUploadingChange)
  window.removeEventListener('detail:timeline-submit-guard-change', handleTimelineSubmitGuardChange)
})
</script>

<style scoped src="./styles/DetailHeader.css"></style>
