<template>
  <a-row :gutter="[20, 20]" class="mb-5 detail-info-row">
    <a-col :xs="24" :xl="12" class="detail-info-col">
      <a-card :bordered="false" class="detail-info-card">
        <template #title>
          <div class="detail-section-title">
            <ApartmentOutlined class="detail-section-title-icon" />
            <span>{{ organizationOverviewConfig.title }}</span>
          </div>
        </template>

        <div class="detail-info-grid">
          <div
            v-for="field in organizationOverviewConfig.fields"
            :key="field.key"
            class="detail-info-grid-item"
          >
            <div class="detail-field-label">
              <span>{{ field.label }}</span>
              <a-tag color="processing" class="detail-source-tag">{{ field.tag }}</a-tag>
            </div>
            <a-typography-text class="detail-field-value">{{ field.value }}</a-typography-text>
          </div>
        </div>

        <a-divider class="detail-card-divider" />

        <div class="detail-timeline-header">
          <a-space :size="8">
            <ClockCircleOutlined class="detail-section-title-icon" />
            <a-typography-text type="secondary">
              {{ organizationOverviewConfig.timelineTitle }} ({{ organizationOverviewConfig.timelineSuffix }})
            </a-typography-text>
          </a-space>
          <a-typography-link>{{ organizationOverviewConfig.timelineAction }}</a-typography-link>
        </div>

        <div class="detail-draft-box">
          <a-textarea
            v-model:value="draftText"
            :rows="4"
            :placeholder="organizationOverviewConfig.draftPlaceholder"
          />
          <div class="detail-draft-actions">
            <a-button type="primary">
              <template #icon><PlusOutlined /></template>
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
            <div :class="['detail-timeline-card', { 'is-draft': entry.type === 'draft' }]">
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
              <a-typography-paragraph class="detail-timeline-content">
                {{ entry.content }}
              </a-typography-paragraph>
            </div>
          </a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>

    <a-col :xs="24" :xl="12" class="detail-info-col">
      <a-card :bordered="false" class="detail-info-card">
        <template #title>
          <div class="detail-section-title">
            <FileTextOutlined class="detail-section-title-icon" />
            <span>{{ financeProfileConfig.title }}</span>
          </div>
        </template>

        <div class="detail-info-grid">
          <div
            v-for="field in financeProfileConfig.fields"
            :key="field.key"
            :class="['detail-info-grid-item', { 'span-2': field.span === 2 }]"
          >
            <div class="detail-field-label">
              <span>{{ field.label }}</span>
              <a-tag
                v-if="field.tag"
                color="processing"
                class="detail-source-tag"
              >
                {{ field.tag }}
              </a-tag>
            </div>
            <a-select
              v-if="field.type === 'select'"
              v-model:value="financeForm[field.key]"
              :options="field.options.map((option) => ({ label: option, value: option }))"
            />
            <a-typography-text
              v-else
              :class="['detail-field-value', { 'num-font': field.numeric }]"
            >
              {{ field.value }}
            </a-typography-text>
          </div>
        </div>

        <div class="detail-summary-panel">
          <a-typography-text class="detail-summary-label">
            {{ financeProfileConfig.summaryTitle }}
          </a-typography-text>
          <a-statistic
            :value="financeProfileConfig.summaryValue"
            :prefix="financeProfileConfig.summaryPrefix"
            :suffix="financeProfileConfig.summaryUnit"
            :value-style="summaryValueStyle"
          />
          <div class="detail-summary-note">
            <SafetyCertificateOutlined />
            <span>{{ financeProfileConfig.summaryNote }}</span>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed, reactive, ref, h } from 'vue'
import {
  ApartmentOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue'
import {
  detailTimelineEntries,
  financeProfileConfig,
  organizationOverviewConfig,
} from '@/data/detailPageData'

const draftText = ref('')
const financeForm = reactive(
  financeProfileConfig.fields.reduce((acc, field) => {
    if (field.type === 'select') {
      acc[field.key] = field.value
    }
    return acc
  }, {})
)

const summaryValueStyle = computed(() => ({
  color: '#adc6ff',
  fontSize: '56px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
}))
</script>

<style scoped src="./styles/BasicInfoCards.css"></style>
