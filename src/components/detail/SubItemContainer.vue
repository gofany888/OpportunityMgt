<template>
  <a-card :bordered="false" class="detail-subitem-shell">
    <SubItemHeader @toggle="isExpanded = !isExpanded" :is-expanded="isExpanded" />
    <div v-show="isExpanded" class="detail-subitem-content">
      <FinanceMatrix />
      <RollingForecast />
      <BusinessConfig />
      <ProcurementControl />
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import SubItemHeader from './subitem/SubItemHeader.vue'
import FinanceMatrix from './subitem/FinanceMatrix.vue'
import RollingForecast from './subitem/RollingForecast.vue'
import BusinessConfig from './subitem/BusinessConfig.vue'
import ProcurementControl from './subitem/ProcurementControl.vue'

const isExpanded = ref(true)
</script>

<style scoped src="./styles/SubItemContainer.css"></style>
