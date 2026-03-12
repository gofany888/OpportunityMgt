<template>
  <div class="max-w-[1600px] mx-auto min-h-[calc(100vh-104px)]">
    <!-- 将 Header 注入到 BaseLayout 的导航栏中 -->
    <Teleport to="#header-title-portal" v-if="isMounted">
        <EISPageHeader />
    </Teleport>
    
    <!-- 主体内容区 -->
    <div class="flex flex-col gap-4">
        <!-- 过滤器和搜索 -->
        <EISFilterBar />
        
        <!-- 核心指标卡片 -->
        <EISSummaryCards />
        
        <!-- 差异记录列表 -->
        <EISDiscrepancyList />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EISPageHeader from '@/components/reports/eis-audit/EISPageHeader.vue'
import EISFilterBar from '@/components/reports/eis-audit/EISFilterBar.vue'
import EISSummaryCards from '@/components/reports/eis-audit/EISSummaryCards.vue'
import EISDiscrepancyList from '@/components/reports/eis-audit/EISDiscrepancyList.vue'

const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})
</script>
