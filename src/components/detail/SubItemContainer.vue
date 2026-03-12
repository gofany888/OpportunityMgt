<template>
  <div class="bg-[#f5f6fa] border border-[#e8ecef] rounded-3xl p-6 mt-6">
    <SubItemHeader @toggle="isExpanded = !isExpanded" :is-expanded="isExpanded" />
    <div v-show="isExpanded">
      <FinanceMatrix />
      <RollingForecast />
      <BusinessConfig />
      <ProcurementControl />
    </div>
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
