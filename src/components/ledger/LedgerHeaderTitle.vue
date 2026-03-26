<template>
  <div class="ledger-header-title">
    <div class="ledger-header-title__main">
      <a-typography-title :level="5" class="ledger-header-title__text">
        {{ ledgerHeaderConfig.title }}
      </a-typography-title>
    </div>
    <div class="ledger-header-title__status">
      <span class="ledger-header-title__status-dot"></span>
      <span class="ledger-header-title__status-text">
        {{ ledgerHeaderConfig.alertText }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ledgerHeaderConfig } from '@/data/ledgerData'
</script>

<style src="./styles/LedgerHeaderTitle.css"></style>
