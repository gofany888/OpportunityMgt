<template>
  <div>
    <!-- 差异卡片列表 (无需顶部栏) -->
    <div class="space-y-4">
      <EISDiscrepancyCard 
        v-for="record in auditRecords" 
        :key="record.id" 
        :record="record" 
      />
    </div>

    <!-- 底部翻页 -->
    <div class="mt-8 flex justify-end">
      <a-pagination 
        :total="120" 
        :show-size-changer="false" 
        :current="1"
        :pageSize="10"
        :show-total="(total, range) => `显示 ${range[0]}-${range[1]} 共 ${total} 条`"
        class="custom-pagination"
      />
    </div>
  </div>
</template>

<script setup>
import EISDiscrepancyCard from './EISDiscrepancyCard.vue'
import { auditRecords } from '@/data/eisAuditData'
</script>

<style scoped src="./styles/EISDiscrepancyList.css"></style>
