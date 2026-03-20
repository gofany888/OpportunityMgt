<template>
  <div class="flex flex-col min-h-screen max-w-[1600px] mx-auto">
    <DetailHeader />

    <a-layout has-sider class="bg-transparent pt-6">
      <DetailSidebar />
      <a-layout-content class="pl-6">
        <ProgressStepper />
        <BasicInfoCards />
        <MilestoneTimeline />
        <DeliveryBenchmark />
        <SubItemContainer />
      </a-layout-content>
    </a-layout>
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
