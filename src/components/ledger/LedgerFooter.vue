<template>
  <div class="ledger-footer">
    <!-- Left: Data Summary -->
    <div class="ledger-footer__summary">{{ rangeText }}</div>
    
    <!-- Right: Pagination Control -->
    <div class="ledger-footer__pagination">
      <a-pagination
        v-model:current="current"
        v-model:pageSize="pageSize"
        :total="total"
        :show-size-changer="false"
        :show-quick-jumper="false"
        :show-less-items="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)
const total = 120

const rangeText = computed(() => {
  const start = (current.value - 1) * pageSize.value + 1
  const end = Math.min(current.value * pageSize.value, total)
  return `显示 ${start}-${end} 共 ${total} 条数据`
})
</script>

<style scoped src="./styles/LedgerFooter.css"></style>
