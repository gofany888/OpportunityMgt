<template>
  <div class="max-w-[1600px] mx-auto min-h-[calc(100vh-104px)]">
    <!-- UI dynamically injected to layout via Teleport -->
    <PageHeader />
    
    <!-- Main Content -->
    <div class="flex flex-col gap-4">
      <MetricCards />
      <DiffTable />
      <FooterInfo />
    </div>
  </div>
</template>

<script setup>
import PageHeader from '@/components/reports/business-opportunity/PageHeader.vue'
import MetricCards from '@/components/reports/business-opportunity/MetricCards.vue'
import DiffTable from '@/components/reports/business-opportunity/DiffTable.vue'
import FooterInfo from '@/components/reports/business-opportunity/FooterInfo.vue'
</script>
