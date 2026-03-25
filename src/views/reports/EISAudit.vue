<template>
  <div class="eis-audit-page">
    <!-- Full-Width Filter Bar -->
    <div ref="filterBarRef" class="eis-audit-filter-wrapper">
      <EISFilterBar />
    </div>

    <!-- 核心指标卡片 (sticky below filter) -->
    <div ref="summaryRef" class="eis-audit-summary-sticky" :style="{ top: summaryTop + 'px' }">
      <div class="max-w-[1600px] mx-auto px-6">
        <EISSummaryCards />
      </div>
    </div>

    <!-- 表头 (sticky below summary) -->
    <div class="eis-audit-table-header-sticky" :style="{ top: tableHeaderTop + 'px' }">
      <div class="max-w-[1600px] mx-auto px-6">
        <div class="eis-audit-table-header-inner">
          <a-row :gutter="48" class="items-center">
            <a-col :span="2">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">数据维度</div>
            </a-col>
            <a-col :span="4" class="text-right">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">商机金额</div>
            </a-col>
            <a-col :span="4" class="text-right">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">毛利</div>
            </a-col>
            <a-col :span="4" class="text-right">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">采购</div>
            </a-col>
            <a-col :span="4" class="text-right">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">开票额</div>
            </a-col>
            <a-col :span="6" class="text-center">
                <div class="text-[13px] font-medium text-gray-400 uppercase tracking-wider">父环节对标</div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <!-- Main Content Area (Centered) -->
    <div class="max-w-[1600px] mx-auto">
      <div class="flex flex-col pb-6 px-6">
        <!-- 差异记录列表 -->
        <EISDiscrepancyList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import EISFilterBar from '@/components/reports/eis-audit/EISFilterBar.vue'
import EISSummaryCards from '@/components/reports/eis-audit/EISSummaryCards.vue'
import EISDiscrepancyList from '@/components/reports/eis-audit/EISDiscrepancyList.vue'

const filterBarRef = ref(null)
const summaryRef = ref(null)
const summaryTop = ref(0)
const tableHeaderTop = ref(0)

// 24px offset to account for .layout-main-content padding
const PADDING_OFFSET = -24

const updateStickyOffsets = () => {
  const filterH = filterBarRef.value?.offsetHeight || 0
  const summaryH = summaryRef.value?.offsetHeight || 0
  summaryTop.value = PADDING_OFFSET + filterH
  tableHeaderTop.value = PADDING_OFFSET + filterH + summaryH - 1 /* overlap 1px to seal gap */
}

let ro = null
onMounted(() => {
  nextTick(() => updateStickyOffsets())
  // Watch for resize changes (e.g. filter bar expanding with tags)
  ro = new ResizeObserver(() => updateStickyOffsets())
  if (filterBarRef.value) ro.observe(filterBarRef.value)
  if (summaryRef.value) ro.observe(summaryRef.value)
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<style scoped>
.eis-audit-page {
  background-color: transparent;
  margin: -24px -24px 0 -24px; /* 抵消 layout-main-content 的 padding */
  min-height: calc(100vh - 56px);
}

.eis-audit-filter-wrapper {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
  position: sticky;
  top: -24px; /* offset for .layout-main-content padding */
  z-index: 30;
}

.eis-audit-summary-sticky {
  position: sticky;
  /* top is set dynamically via :style */
  z-index: 20;
  background-color: var(--page-background); /* prevent content leaking below */
}

.eis-audit-table-header-sticky {
  position: sticky;
  /* top is set dynamically via :style */
  z-index: 10;
  background-color: var(--page-background); /* fill area behind rounded corners */
}

.eis-audit-table-header-inner {
  padding: 12px 32px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 24px 24px 0 0;
}
</style>
