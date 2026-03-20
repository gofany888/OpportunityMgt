<template>
  <a-card :bordered="false" class="audit-overview-card">
    <div class="audit-overview-card__layout">
      <div class="audit-overview-card__summary">
        <div class="audit-overview-card__status-row">
          <a-tag :class="['audit-overview-card__status-tag', `is-${detail.statusTone}`]">
            <CheckCircleFilled />
            {{ detail.statusText }}
          </a-tag>
          <span class="audit-overview-card__record-no"># {{ detail.recordNo }}</span>
        </div>

        <div class="audit-overview-card__content">
          <div class="audit-overview-card__content-label">{{ detail.sectionLabel }}</div>
          <div class="audit-overview-card__content-title">{{ detail.sourceTitle }}</div>
          <div class="audit-overview-card__content-subtitle">{{ detail.sourceSubtitle }}</div>
        </div>

        <div class="audit-overview-card__operator">
          <div class="audit-overview-card__operator-name">{{ detail.operatorName }}</div>
          <div class="audit-overview-card__operator-label">{{ detail.operatorLabel }}</div>
        </div>

        <div class="audit-overview-card__divider"></div>

        <div class="audit-overview-card__baseline">
          <div class="audit-overview-card__baseline-label">{{ detail.baselineLabel }}</div>
          <div class="audit-overview-card__baseline-row">
            <div class="audit-overview-card__baseline-copy">
              <div class="audit-overview-card__baseline-file">{{ detail.baselineFile }}</div>
              <div class="audit-overview-card__baseline-hint">{{ detail.baselineHint }}</div>
            </div>
            <a-button type="text" class="audit-overview-card__baseline-download">
              <template #icon>
                <DownloadOutlined />
              </template>
            </a-button>
          </div>
        </div>

        <div class="audit-overview-card__watermark">
          <component :is="iconMap[detail.watermarkIcon]" />
        </div>
      </div>

      <div class="audit-overview-card__metrics">
        <a-card
          v-for="metric in detail.metrics"
          :key="metric.key"
          :bordered="false"
          class="audit-overview-card__metric-card"
        >
          <div class="audit-overview-card__metric-content">
            <div :class="['audit-overview-card__metric-icon', `is-${metric.tone}`]">
              <component :is="iconMap[metric.icon]" />
            </div>
            <div class="audit-overview-card__metric-copy">
              <div class="audit-overview-card__metric-title">{{ metric.title }}</div>
              <div :class="['audit-overview-card__metric-value', `is-${metric.tone}`]">{{ metric.value }}</div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloudDownloadOutlined,
  CloseCircleOutlined,
  DatabaseOutlined,
  DownloadOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

defineProps({
  detail: {
    type: Object,
    required: true,
  },
})

const iconMap = {
  CloudDownloadOutlined,
  DatabaseOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
}
</script>

<style scoped src="./styles/AuditOverviewPanel.css"></style>
