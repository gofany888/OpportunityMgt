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

          <div
            v-if="!isPanelMissing(panel.key)"
            :class="['import-panel-card__snapshot', `is-${panel.cardTone}`]"
          >
            <div class="import-panel-card__snapshot-icon">
              <component :is="iconMap[panel.icon]" />
            </div>
            <div class="import-panel-card__snapshot-copy">
              <a-typography-text class="import-panel-card__snapshot-label">
                {{ panel.timestampLabel }}
              </a-typography-text>
              <div class="import-panel-card__snapshot-time">{{ panel.timestamp }}</div>
              <div class="import-panel-card__snapshot-meta" v-if="panel.statusTag || panel.pendingLabel">
                <a-tag
                  v-if="panel.statusTag"
                  :class="['import-panel-card__snapshot-tag', `is-${panel.statusTone}`]"
                >
                  {{ panel.statusTag }}
                </a-tag>
                <span class="import-panel-card__snapshot-pending" v-if="panel.pendingLabel">
                  {{ panel.pendingLabel }}
                  <strong>{{ panel.pendingCount }}</strong>
                  <span class="import-panel-card__snapshot-unit">{{ panel.unit }}</span>
                  <template v-if="panel.secondaryLabel">
                    ，{{ panel.secondaryLabel }}
                    <strong>{{ panel.secondaryCount }}</strong>
                    <span class="import-panel-card__snapshot-unit">{{ panel.unit }}</span>
                  </template>
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
          <div v-else class="import-panel-card__empty-shell">
            <div class="import-panel-card__empty-icon">
              <component :is="iconMap[getEmptyState(panel.key).icon]" />
            </div>
            <div class="import-panel-card__empty-title">{{ getEmptyState(panel.key).title }}</div>
            <div class="import-panel-card__empty-desc">{{ getEmptyState(panel.key).description }}</div>
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

          <div v-if="panel.key === 'eis' && isBgMissing" class="import-panel-card__mask">
            <div class="import-panel-card__mask-icon">
              <LockOutlined />
            </div>
            <div class="import-panel-card__mask-title">对标功能暂未激活</div>
            <div class="import-panel-card__mask-desc">
              EIS 仅作为外部参照，系统必须首先完成 <span>【内部经营底账】</span> 的载入以确立审计坐标系。
            </div>
          </div>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ClockCircleOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  LinkOutlined,
  PaperClipOutlined,
  SyncOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
import { importSourcePanels } from '@/data/data-import-center/dataImportCenterData'

const props = defineProps({
  missingSources: {
    type: Array,
    default: () => [],
  },
})

const isBgMissing = computed(() => props.missingSources.includes('bg'))

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
  FileSearchOutlined,
  FileTextOutlined,
}

const emptyStateMap = {
  eis: {
    icon: 'FileSearchOutlined',
    title: '暂无历史同步记录',
    description: '导入首份EIS对标附件以后启动治理引擎',
  },
  bg: {
    icon: 'FileTextOutlined',
    title: '底账主表为空',
    description: '请执行批量导入以建立BG经营业务商机库',
  },
}

const isPanelMissing = (key) => props.missingSources.includes(key)
const getEmptyState = (key) => emptyStateMap[key] ?? emptyStateMap.eis

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
