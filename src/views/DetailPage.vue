<template>
  <div class="flex flex-col min-h-screen max-w-[1600px] mx-auto bg-white">
    <DetailHeader />
    
    <div class="flex flex-1 overflow-hidden">
      <DetailSidebar />
      <main class="flex-1 p-6 bg-[#f0f2f5] overflow-y-auto">
        <ProgressStepper />
        <BasicInfoCards />
        
        <!-- 商机环节执行里程碑管理 - 全宽显示 -->
        <MilestoneTimeline />

        <!-- 项目交付进度与商务对标控点 - 全宽显示 -->
        <DeliveryBenchmark />

        <!-- 子项报告 - 全宽显示 -->
        <SubItemContainer />
      </main>
    </div>
  </div>
</template>

<script setup>
import DetailHeader from '@/components/detail/DetailHeader.vue'
import DetailSidebar from '@/components/detail/DetailSidebar.vue'
import ProgressStepper from '@/components/detail/ProgressStepper.vue'
import BasicInfoCards from '@/components/detail/BasicInfoCards.vue'
import MilestoneTimeline from '@/components/detail/MilestoneTimeline.vue'
import DeliveryBenchmark from '@/components/detail/DeliveryBenchmark.vue'
import SubItemContainer from '@/components/detail/SubItemContainer.vue'
</script>
