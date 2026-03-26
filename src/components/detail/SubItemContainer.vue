<template>
  <a-card :bordered="false" class="detail-subitem-shell">
    <SubItemHeader @toggle="isExpanded = !isExpanded" :is-expanded="isExpanded" />
    <div v-show="isExpanded" class="detail-subitem-content">
      <FinanceMatrix />
      <div id="forecast">
        <RollingForecast />
      </div>
      <div id="profile">
        <BusinessConfig />
      </div>
      <div id="procurement">
        <ProcurementControl />
      </div>
    </div>
  </a-card>
  <div id="hardware">
  </div>
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
