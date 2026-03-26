<template>
  <div class="ledger-center-page">
    <!-- Full-Width Header Tabs -->
    <OpportunityTabs />

    <!-- Main Content Area -->
    <div class="ledger-center-container max-w-[1600px] mx-auto">
      <!-- Grouped Control Section (Actions) with tighter top gap -->
      <div class="flex flex-col gap-4 mt-4">
        <!-- Actions Block (Search, Badges, Buttons) - Moved here from header -->
        <div class="ledger-actions-container">
          <LedgerHeaderActions
            :pending-filter-active="pendingFilterActive"
            :filter-visible="filterVisible"
            @toggle-pending-filter="pendingFilterActive = !pendingFilterActive"
            @toggle-filter-panel="filterVisible = !filterVisible"
            @close-filter-panel="filterVisible = false"
          />
        </div>

        <!-- List Header & List -->
        <div class="ledger-content bg-white">
          <OpportunityList :pending-filter-active="pendingFilterActive" />
          <LedgerFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LedgerHeaderActions from '@/components/ledger/LedgerHeaderActions.vue'
import OpportunityTabs from '@/components/ledger/OpportunityTabs.vue'
import OpportunityList from '@/components/ledger/OpportunityList.vue'
import LedgerFooter from '@/components/ledger/LedgerFooter.vue'
import './styles/LedgerCenter.css'

const pendingFilterActive = ref(false)
const filterVisible = ref(false)
</script>

<style scoped src="./styles/LedgerCenter.css"></style>
