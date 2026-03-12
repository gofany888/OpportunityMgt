<template>
  <a-card :bordered="false" class="footer-card">
    <div class="footer-content">
      <a-space :size="24" class="footer-legends">
        <a-space v-for="(legend, idx) in footerInfoData.legends" :key="idx" :size="8" align="center">
          <template v-if="legend.type === 'dot'">
            <span class="legend-dot" :style="{ background: legend.color }"></span>
            <a-typography-text type="secondary">{{ legend.text }}</a-typography-text>
          </template>
          <template v-else-if="legend.type === 'link'">
            <link-outlined :style="{ color: legend.color }" />
            <a-typography-link>{{ legend.text }}</a-typography-link>
          </template>
        </a-space>
      </a-space>

      <a-alert
        :message="footerInfoData.warning"
        type="error"
        show-icon
        :banner="false"
        class="footer-alert"
      />
    </div>
  </a-card>
</template>

<script setup>
import { LinkOutlined } from '@ant-design/icons-vue'
import { footerInfoData } from '@/data/businessOpportunityData'
</script>

<style scoped src="./styles/FooterInfo.css"></style>
