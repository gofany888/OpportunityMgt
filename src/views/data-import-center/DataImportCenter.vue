<template>
  <div class="data-import-center-page">
    <!-- Main Content Area -->
    <div class="max-w-[1600px] mx-auto px-6">
      <div class="flex flex-col gap-6 py-6">
        <ImportSummaryCards :missing-sources="missingSources" />
        <ImportSourcePanels :missing-sources="missingSources" />
        <ImportLogsTable :show-empty="isLogsEmpty" />
      </div>
    </div>

    <!-- 浮动演示控制面板 -->
    <div class="demo-control-panel" :class="{ 'is-collapsed': isCollapsed }">
      <div class="demo-control-header" @click="isCollapsed = !isCollapsed">
        <span class="demo-control-title">
          <span class="demo-control-icon">🎬</span>
          演示模式
        </span>
        <span class="demo-control-toggle">{{ isCollapsed ? '展开' : '收起' }}</span>
      </div>
      <div v-if="!isCollapsed" class="demo-control-body">
        <a-checkbox-group
          v-model:value="missingSources"
          class="demo-control-checkboxes"
          @change="handleSourceChange"
        >
          <a-checkbox value="eis">EIS 未导入</a-checkbox>
          <a-checkbox value="bg">BG 未导入</a-checkbox>
        </a-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ImportLogsTable from '@/components/data-import-center/ImportLogsTable.vue'
import ImportSourcePanels from '@/components/data-import-center/ImportSourcePanels.vue'
import ImportSummaryCards from '@/components/data-import-center/ImportSummaryCards.vue'

const missingSources = ref([])
const isLogsEmpty = computed(() => missingSources.value.includes('bg'))
const isCollapsed = ref(false)

const handleSourceChange = (val) => {
  // 规则：如果 BG 未导入，则 EIS 也必定是未导入状态
  if (val.includes('bg') && !val.includes('eis')) {
    missingSources.value = [...val, 'eis']
  }
  // 规则：如果 EIS 恢复导入，则 BG 也必定随之恢复导入（因为依赖链）
  else if (!val.includes('eis') && val.includes('bg')) {
    missingSources.value = val.filter(s => s !== 'bg')
  }
}
</script>

<style scoped src="./styles/DataImportCenter.css"></style>
