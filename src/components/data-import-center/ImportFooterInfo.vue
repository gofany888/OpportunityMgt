<template>
  <div class="import-footer-info">
    <SafetyCertificateOutlined class="import-footer-info__icon" />
    <a-typography-text class="import-footer-info__text">
      {{ dataImportFooterInfo.text }}
    </a-typography-text>
    <a-typography-text class="import-footer-info__version">
      {{ dataImportFooterInfo.version }}
    </a-typography-text>
  </div>
</template>

<script setup>
import { SafetyCertificateOutlined } from '@ant-design/icons-vue'
import { dataImportFooterInfo } from '@/data/data-import-center/dataImportCenterData'
</script>

<style scoped src="./styles/ImportFooterInfo.css"></style>
