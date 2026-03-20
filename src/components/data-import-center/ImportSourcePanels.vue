<template>
  <a-row :gutter="[20, 20]" class="import-panels-row">
    <a-col
      v-for="panel in importSourcePanels"
      :key="panel.key"
      :xs="24"
      :xl="12"
    >
      <div class="import-panels-group">
        <div class="import-panels-group__label">
          <LinkOutlined class="import-panels-group__icon" />
          <span>{{ panel.groupTitle }}</span>
          <a-typography-text class="import-panels-group__sub">{{ panel.groupSubtitle }}</a-typography-text>
        </div>

        <a-card :bordered="false" class="import-panel-card">
          <a-typography-title :level="3" class="import-panel-card__title">
            {{ panel.title }}
          </a-typography-title>
          <a-typography-paragraph class="import-panel-card__desc">
            {{ panel.description }}
          </a-typography-paragraph>

          <div :class="['import-panel-card__snapshot', `is-${panel.cardTone}`]">
            <div class="import-panel-card__snapshot-icon">
              <component :is="iconMap[panel.icon]" />
            </div>
            <div class="import-panel-card__snapshot-copy">
              <a-typography-text class="import-panel-card__snapshot-label">
                {{ panel.timestampLabel }}
              </a-typography-text>
              <div class="import-panel-card__snapshot-time">{{ panel.timestamp }}</div>
              <div class="import-panel-card__snapshot-meta">
                <a-tag :class="['import-panel-card__snapshot-tag', `is-${panel.statusTone}`]">
                  {{ panel.statusTag }}
                </a-tag>
                <span class="import-panel-card__snapshot-pending">
                  {{ panel.pendingLabel }}：
                  <strong>{{ panel.pendingCount }}</strong>
                  <span class="import-panel-card__snapshot-unit">项</span>
                </span>
              </div>

              <div class="import-panel-card__attachment-inline">
                <a-typography-text class="import-panel-card__attachment-inline-title">
                  {{ panel.attachmentTitle }}
                </a-typography-text>
                <div class="import-panel-card__attachment-inline-meta">
                  <span class="import-panel-card__attachment-inline-name">{{ panel.attachmentName }}</span>
                  <span class="import-panel-card__attachment-inline-size">{{ panel.attachmentSize }}</span>
                  <a-button type="text" class="import-panel-card__attachment-download">
                    <template #icon>
                      <DownloadOutlined />
                    </template>
                  </a-button>
                </div>
              </div>
            </div>

            <div class="import-panel-card__watermark">
              <component :is="iconMap[panel.watermarkIcon]" />
            </div>
          </div>

          <a-button
            block
            size="large"
            :type="panel.actionTone === 'primary' ? 'primary' : 'default'"
            :class="['import-panel-card__action', `is-${panel.actionTone}`]"
            @click="openInitialization(panel)"
          >
            <template #icon>
              <component :is="iconMap[panel.actionIcon]" />
            </template>
            {{ panel.actionText }}
          </a-button>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  ClockCircleOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  LinkOutlined,
  PaperClipOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { importSourcePanels } from '@/data/data-import-center/dataImportCenterData'

const router = useRouter()

const iconMap = {
  LinkOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  SyncOutlined,
  CloudUploadOutlined,
  FileExcelOutlined,
  PaperClipOutlined,
  DownloadOutlined,
}

const openInitialization = (panel) => {
  router.push({
    name: 'data-import-annual-initialization',
    query: {
      mode: panel.key === 'bg' ? 'business' : 'eis',
    },
  })
}
</script>

<style scoped src="./styles/ImportSourcePanels.css"></style>
