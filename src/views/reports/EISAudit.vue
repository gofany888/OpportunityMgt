<template>
  <div class="eis-audit-page">
    <!-- Full-Width Filter Bar -->
    <div ref="filterBarRef" class="eis-audit-filter-wrapper">
      <div class="eis-audit-filter-inner">
        <div v-if="canGoBack" class="eis-audit-filter-back">
          <BackIconButton @click="handleBack" />
        </div>
        <div class="eis-audit-filter-content">
          <EISFilterBar />
        </div>
      </div>
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
          <a-row :gutter="48" class="items-center -mx-3 px-3">
            <a-col :span="2">
                <div class="eis-audit-table-header-label is-left">数据维度</div>
            </a-col>
            <a-col :span="4">
                <div class="eis-audit-table-header-label is-right">商机金额(万)</div>
            </a-col>
            <a-col :span="4">
                <div class="eis-audit-table-header-label is-right is-profit">毛利(万)</div>
            </a-col>
            <a-col :span="4">
                <div class="eis-audit-table-header-label is-right is-procurement">采购(万)</div>
            </a-col>
            <a-col :span="4">
                <div class="eis-audit-table-header-label is-right is-invoice">开票额(万)</div>
            </a-col>
            <a-col :span="6">
                <div class="eis-audit-table-header-label is-center">父环节对标</div>
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
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BackIconButton from '@/components/common/BackIconButton.vue'
import EISFilterBar from '@/components/reports/eis-audit/EISFilterBar.vue'
import EISSummaryCards from '@/components/reports/eis-audit/EISSummaryCards.vue'
import EISDiscrepancyList from '@/components/reports/eis-audit/EISDiscrepancyList.vue'

const route = useRoute()
const router = useRouter()
const filterBarRef = ref(null)
const summaryRef = ref(null)
const summaryTop = ref(0)
const tableHeaderTop = ref(0)
const canGoBack = computed(() => route.query.from === 'dashboard')

// 24px offset to account for .layout-main-content padding
const PADDING_OFFSET = -24

const handleBack = () => {
  router.back()
}

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
  border-bottom: 1px solid #edf1f5;
  padding: 16px 24px;
  position: sticky;
  top: -24px; /* offset for .layout-main-content padding */
  z-index: 30;
}

.eis-audit-filter-inner {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.eis-audit-filter-back {
  flex: 0 0 auto;
  padding-top: 2px;
}

.eis-audit-filter-content {
  flex: 1;
  min-width: 0;
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
  padding: 14px 20px;
  background-color: #fafcff;
  border: 1px solid #edf1f5;
  border-bottom: 1px solid #f2f3f5;
  border-radius: 28px 28px 0 0;
}

.eis-audit-table-header-label {
  font-size: 13px;
  font-weight: 400;
  color: #1d2129;
  line-height: 1.4;
  display: flex;
  width: 100%;
  text-align: center;
}

.eis-audit-table-header-label.is-left {
  justify-content: flex-start;
  text-align: left;
}

.eis-audit-table-header-label.is-right {
  justify-content: flex-end;
  text-align: right;
  transform: translateX(28px);
}

.eis-audit-table-header-label.is-profit,
.eis-audit-table-header-label.is-procurement,
.eis-audit-table-header-label.is-invoice {
  transform: translateX(18px);
}

.eis-audit-table-header-label.is-center {
  justify-content: center;
  text-align: center;
}
</style>
