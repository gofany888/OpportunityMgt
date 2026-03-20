<template>
  <div class="max-w-[1600px] mx-auto min-h-[calc(100vh-104px)]">
    <Teleport to="#header-title-portal" v-if="isMounted">
      <DataImportHeader />
    </Teleport>

    <div class="flex flex-col gap-6">
      <ImportSummaryCards />
      <ImportSourcePanels />
      <ImportLogsTable />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DataImportHeader from '@/components/data-import-center/DataImportHeader.vue'
import ImportLogsTable from '@/components/data-import-center/ImportLogsTable.vue'
import ImportSourcePanels from '@/components/data-import-center/ImportSourcePanels.vue'
import ImportSummaryCards from '@/components/data-import-center/ImportSummaryCards.vue'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>
