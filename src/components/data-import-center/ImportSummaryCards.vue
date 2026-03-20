<template>
  <a-row :gutter="[20, 20]">
    <a-col
      v-for="card in dataImportSummaryCards"
      :key="card.key"
      :xs="24"
      :sm="12"
      :xl="6"
    >
      <a-card :bordered="false" :class="['import-summary-card', { 'is-emphasized': card.emphasized }]">
        <div class="import-summary-card__content">
          <div :class="['import-summary-card__icon', `is-${card.tone}`]">
            <component :is="iconMap[card.icon]" />
          </div>
          <div class="import-summary-card__copy">
            <a-typography-text class="import-summary-card__label">
              {{ card.title }}
            </a-typography-text>
            <div class="import-summary-card__value-row">
              <a-statistic
                :value="parseStatistic(card.value)"
                :precision="card.unit === '%' ? 1 : 0"
                :suffix="card.unit"
                :value-style="statValueStyle"
              />
            </div>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed } from 'vue'
import {
  AlertOutlined,
  InboxOutlined,
  LineChartOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { dataImportSummaryCards } from '@/data/data-import-center/dataImportCenterData'

const iconMap = {
  InboxOutlined,
  SafetyCertificateOutlined,
  AlertOutlined,
  LineChartOutlined,
  SettingOutlined,
}

const parseStatistic = (value) => Number(String(value).replace(/,/g, ''))

const statValueStyle = computed(() => ({
  color: 'rgba(0, 0, 0, 0.88)',
  fontSize: '18px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
}))
</script>

<style scoped src="./styles/ImportSummaryCards.css"></style>
