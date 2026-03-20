<template>
  <a-card :bordered="false" class="detail-finance-matrix-card">
    <template #title>
      <div class="detail-subsection-title">
        <span class="detail-subsection-indicator"></span>
        <span>{{ financeMatrixConfig.title }}</span>
        <a-typography-text type="secondary">{{ financeMatrixConfig.subtitle }}</a-typography-text>
      </div>
    </template>
    <template #extra>
      <a-space :size="8">
        <a-typography-text type="secondary">{{ financeMatrixConfig.taxRateLabel }}</a-typography-text>
        <a-select
          v-model:value="taxRate"
          size="small"
          :options="financeMatrixConfig.taxRateOptions.map((option) => ({ label: option, value: option }))"
          class="detail-tax-rate-select"
        />
      </a-space>
    </template>

    <div class="detail-finance-grid">
      <div
        v-for="block in financeMatrixConfig.blocks"
        :key="block.key"
        class="detail-finance-grid-item"
      >
        <div :class="['detail-finance-block', `is-${block.tone}`]">
          <div class="detail-finance-block-title">{{ block.title }}</div>
          <div class="detail-finance-block-metric">
            <a-typography-text class="detail-finance-metric-label">{{ block.incomeLabel }}</a-typography-text>
            <a-statistic
              :value="parseStatistic(block.income)"
              :prefix="getPrefix(block.income)"
              :precision="2"
              :value-style="getValueStyle(block.tone)"
            />
          </div>
          <div class="detail-finance-block-metric">
            <a-typography-text class="detail-finance-metric-label">{{ block.profitLabel }}</a-typography-text>
            <a-statistic
              :value="parseStatistic(block.profit)"
              :prefix="getPrefix(block.profit)"
              :precision="2"
              :value-style="getValueStyle(block.tone)"
            />
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { financeMatrixConfig } from '@/data/detailPageData'

const taxRate = ref(financeMatrixConfig.taxRate)

const parseStatistic = (value) => Number(String(value).replace(/[¥,]/g, ''))
const getPrefix = (value) => (String(value).includes('¥') ? '¥' : '')
const getValueStyle = (tone) => {
  const styleMap = {
    muted: { color: '#bfbfbf', fontSize: '18px', fontWeight: 500, fontVariantNumeric: 'tabular-nums' },
    primary: { color: '#1677ff', fontSize: '18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
    default: { color: 'rgba(0, 0, 0, 0.88)', fontSize: '18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
    dark: { color: '#ffffff', fontSize: '18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
    gradient: { color: '#ffffff', fontSize: '18px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' },
  }
  return styleMap[tone]
}
</script>

<style scoped src="./styles/FinanceMatrix.css"></style>
