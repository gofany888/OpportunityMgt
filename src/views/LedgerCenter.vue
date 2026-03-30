<template>
  <div ref="pageRef" class="ledger-center-page">
    <!-- Full-Width Header Tabs -->
    <OpportunityTabs ref="tabsRef" :can-go-back="canGoBack" @back="handleBack" />

    <!-- Main Content Area -->
    <div class="ledger-center-container max-w-[1600px] mx-auto">
      <!-- Grouped Control Section (Actions) -->
      <div class="ledger-main-stack">
        <!-- Actions Block (Search, Badges, Buttons) - Moved here from header -->
        <div ref="actionsRef" class="ledger-actions-shell">
          <div class="ledger-actions-container">
            <LedgerHeaderActions
              :pending-filter-active="pendingFilterActive"
              :filter-visible="filterVisible"
              @toggle-pending-filter="pendingFilterActive = !pendingFilterActive"
              @toggle-filter-panel="filterVisible = !filterVisible"
              @close-filter-panel="filterVisible = false"
            />
          </div>
        </div>

        <!-- List Header & List -->
        <div class="ledger-content">
          <OpportunityList :pending-filter-active="pendingFilterActive" />
          <LedgerFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LedgerHeaderActions from '@/components/ledger/LedgerHeaderActions.vue'
import OpportunityTabs from '@/components/ledger/OpportunityTabs.vue'
import OpportunityList from '@/components/ledger/OpportunityList.vue'
import LedgerFooter from '@/components/ledger/LedgerFooter.vue'
import './styles/LedgerCenter.css'

const route = useRoute()
const router = useRouter()
const pendingFilterActive = ref(false)
const filterVisible = ref(false)
const canGoBack = computed(() => route.query.from === 'dashboard')

const pageRef = ref(null)
const tabsRef = ref(null)
const actionsRef = ref(null)
let resizeObserver = null

const handleBack = () => {
  router.back()
}

const updateStickyOffsets = () => {
  if (!pageRef.value) return

  const tabsEl = tabsRef.value?.$el
  const actionsEl = actionsRef.value
  const tabsH = tabsEl ? tabsEl.offsetHeight : 57
  const actionsH = actionsEl ? actionsEl.offsetHeight : 50
  const stickyOffset = 24
  const tabsBottom = Math.max(tabsH - stickyOffset, 0)
  const tableHeaderTop = tabsBottom + actionsH

  pageRef.value.style.setProperty('--ledger-tabs-height', `${tabsH}px`)
  pageRef.value.style.setProperty('--ledger-tabs-sticky-bottom', `${tabsBottom}px`)
  pageRef.value.style.setProperty('--ledger-actions-height', `${actionsH}px`)
  pageRef.value.style.setProperty('--ledger-sticky-table-top', `${tableHeaderTop}px`)
}

onMounted(async () => {
  await nextTick()
  updateStickyOffsets()

  resizeObserver = new ResizeObserver(() => updateStickyOffsets())
  const tabsEl = tabsRef.value?.$el
  if (tabsEl) resizeObserver.observe(tabsEl)
  if (actionsRef.value) resizeObserver.observe(actionsRef.value)
  window.addEventListener('resize', updateStickyOffsets)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateStickyOffsets)
})

</script>

<style scoped src="./styles/LedgerCenter.css"></style>
