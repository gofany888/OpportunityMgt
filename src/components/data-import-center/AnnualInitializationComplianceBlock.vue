<template>
  <div class="annual-init-compliance-card">
    <div class="annual-init-compliance-card__banner">
      <a-button
        type="text"
        shape="circle"
        class="annual-init-compliance-card__close"
        @click="emit('close')"
      >
        <CloseOutlined />
      </a-button>

      <div class="annual-init-compliance-card__banner-main">
        <div class="annual-init-compliance-card__icon-shell">
          <DisconnectOutlined />
        </div>
        <div class="annual-init-compliance-card__banner-copy">
          <div class="annual-init-compliance-card__banner-title">
            {{ annualInitializationComplianceBlock.bannerTitle }}
          </div>
          <div class="annual-init-compliance-card__banner-subtitle">
            {{ annualInitializationComplianceBlock.bannerSubtitle }}
          </div>
        </div>
      </div>
    </div>

    <div class="annual-init-compliance-card__body">
      <div class="annual-init-compliance-card__summary-box">
        <div class="annual-init-compliance-card__summary">
          {{ annualInitializationComplianceBlock.summary.prefix }}
          <span>{{ annualInitializationComplianceBlock.summary.highlight }}</span>
          {{ annualInitializationComplianceBlock.summary.suffix }}
        </div>
        <div class="annual-init-compliance-card__detail">
          {{ annualInitializationComplianceBlock.detailText }}
        </div>
      </div>

      <div class="annual-init-compliance-card__metrics">
        <div
          v-for="metric in annualInitializationComplianceBlock.metrics"
          :key="metric.key"
          :class="['annual-init-compliance-card__metric', `is-${metric.status}`]"
        >
          <div class="annual-init-compliance-card__metric-label">{{ metric.label }}</div>
          <div :class="['annual-init-compliance-card__metric-value', `is-${metric.status}`]">
            {{ metric.value }}
          </div>
        </div>
      </div>

      <div class="annual-init-compliance-card__solutions">
        <div class="annual-init-compliance-card__solutions-title">
          <QuestionCircleOutlined />
          <span>{{ annualInitializationComplianceBlock.solutionsTitle }}</span>
        </div>
        <ul class="annual-init-compliance-card__solutions-list">
          <li
            v-for="solution in annualInitializationComplianceBlock.solutions"
            :key="solution"
            class="annual-init-compliance-card__solution-item"
          >
            <span class="annual-init-compliance-card__solution-dot" />
            <span>{{ solution }}</span>
          </li>
        </ul>
      </div>

      <a-button
        size="large"
        block
        class="annual-init-compliance-card__primary"
        @click="emit('close')"
      >
        <ReloadOutlined />
        <span>{{ annualInitializationComplianceBlock.primaryActionText }}</span>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import {
  CloseOutlined,
  DisconnectOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue'
import { annualInitializationComplianceBlock } from '@/data/data-import-center/annualInitializationData'

const emit = defineEmits(['close'])
</script>

<style scoped src="./styles/AnnualInitializationComplianceBlock.css"></style>
