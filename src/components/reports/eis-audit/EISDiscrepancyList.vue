<template>
  <div class="eis-audit-list-container">

    <!-- 差异卡片列表 (大白板内容区) -->
    <div class="eis-audit-list-content">
      <EISDiscrepancyCard 
        v-for="record in auditRecords" 
        :key="record.id" 
        :record="record" 
      />
    </div>

    <!-- 底部翻页 (收编入大白板) -->
    <div class="eis-audit-pagination-footer">
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
