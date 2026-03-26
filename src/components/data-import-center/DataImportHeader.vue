<template>
  <div class="data-import-header">
    <div class="data-import-header__main">
      <span class="data-import-header__indicator"></span>
      <div class="data-import-header__copy">
        <div class="data-import-header__title-row">
          <a-typography-title :level="4" class="data-import-header__title">
            {{ dataImportHeaderConfig.title }}
          </a-typography-title>
          <a-typography-text class="data-import-header__subtitle">
            {{ dataImportHeaderConfig.subtitle }}
          </a-typography-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dataImportHeaderConfig } from '@/data/data-import-center/dataImportCenterData'
</script>

<style scoped src="./styles/DataImportHeader.css"></style>
