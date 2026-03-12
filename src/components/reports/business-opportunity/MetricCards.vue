<template>
  <a-row :gutter="[20, 20]" class="metric-cards">
    <a-col v-for="card in metricCards" :key="card.key" :xs="24" :sm="12" :lg="6">
      <a-card :bordered="false" class="metric-card">
        <div class="metric-header">
          <div class="metric-icon" :style="{ background: card.iconBg }">
            <component :is="getIcon(card.icon)" :style="{ color: card.iconColor, fontSize: '20px' }" />
          </div>
          <div class="metric-info">
            <div class="metric-label">
              <span v-if="card.dot" class="metric-dot" :style="{ background: card.dot }"></span>
              {{ card.label }}
            </div>
            <a-statistic
              :value="card.value"
              :prefix="card.prefix"
              :suffix="card.unit"
              :value-style="{
                fontSize: '28px',
                fontWeight: 600,
                color: card.valueColor || 'rgba(0, 0, 0, 0.88)',
                fontVariantNumeric: 'tabular-nums',
              }"
              class="metric-value"
            />
          </div>
        </div>

        <a-divider class="metric-divider" />

        <div class="metric-footer">
          <!-- 简单文字类型 -->
          <template v-if="!card.footerType || card.footerType === 'simple'">
            <a-typography-text type="secondary" class="footer-text">{{ card.footer }}</a-typography-text>
          </template>

          <!-- 徽章类型 -->
          <template v-else-if="card.footerType === 'badge'">
            <a-tag :color="card.badgeColor" :bordered="false" class="footer-badge">{{ card.badge }}</a-tag>
            <a-typography-text type="secondary" class="footer-text">{{ card.footer }}</a-typography-text>
          </template>

          <!-- 差异率类型 -->
          <template v-else-if="card.footerType === 'rate'">
            <span class="footer-rate-label">
              <rise-outlined /> 差异率
            </span>
            <a-tag color="error" class="footer-rate-value">{{ card.rate }}</a-tag>
          </template>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import {
  FundOutlined,
  DatabaseOutlined,
  EditOutlined,
  WarningOutlined,
  RiseOutlined,
} from '@ant-design/icons-vue'
import { metricCards } from '@/data/businessOpportunityData'

const iconMap = {
  'fund-outlined': FundOutlined,
  'database-outlined': DatabaseOutlined,
  'edit-outlined': EditOutlined,
  'warning-outlined': WarningOutlined,
}

const getIcon = (name) => iconMap[name] || FundOutlined
</script>

<style scoped src="./styles/MetricCards.css"></style>
