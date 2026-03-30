<template>
  <div class="opportunity-tabs-wrapper">
    <div class="opportunity-tabs">
      <div v-if="canGoBack" class="opportunity-tabs__back">
        <BackIconButton @click="$emit('back')" />
      </div>

      <a-tabs
        v-model:activeKey="activeTab"
        class="opportunity-tabs__main"
        @change="handleTabChange"
      >
        <a-tab-pane
          v-for="tab in opportunityTabs"
          :key="tab.key"
          :tab="tab.label"
        />
      </a-tabs>
      <div class="opportunity-tabs__extra">
        <div class="opportunity-tabs__alert">
          <span class="opportunity-tabs__alert-dot"></span>
          <span class="opportunity-tabs__alert-text">{{ ledgerHeaderConfig.alertText }}</span>
        </div>
      </div>
    </div>

    <div v-if="currentTab?.subStages" class="opportunity-sub-tabs">
      <a-typography-text class="sub-tabs-label">定位子环节</a-typography-text>
      <a-space :size="8" class="sub-tabs-list">
        <a-tag
          v-for="opt in subStageOptions"
          :key="opt.value"
          :class="['sub-tab-tag', { 'is-active': activeSubTab === opt.value }]"
          @click="activeSubTab = opt.value"
        >
          {{ opt.label }}
        </a-tag>
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackIconButton from '@/components/common/BackIconButton.vue'
import { opportunityTabs, ledgerHeaderConfig } from '@/data/ledgerData'

defineProps({
  canGoBack: {
    type: Boolean,
    default: false
  }
})

defineEmits(['back'])

const activeTab = ref('all')
const activeSubTab = ref('all')

const currentTab = computed(() => {
  return opportunityTabs.find(t => t.key === activeTab.value)
})

const subStageOptions = computed(() => [
  { label: '全部子项', value: 'all' },
  ...((currentTab.value?.subStages ?? []).map((sub) => ({
    label: sub,
    value: sub,
  }))),
])

const handleTabChange = (key) => {
  activeTab.value = key
  activeSubTab.value = 'all'
}
</script>

<style scoped src="./styles/OpportunityTabs.css"></style>
