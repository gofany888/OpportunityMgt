<script setup>
import { ref } from 'vue';

const dataRange = ref('含资源池');
</script>

<template>
  <div class="dashboard-header">
    <div class="header-left">
      <h1 class="dashboard-title">事业部经营数据看板</h1>
    </div>
    
    <div class="header-right">
      <div class="data-range-selector">
        <span class="range-label">数据范围</span>
        <a-segmented 
          v-model:value="dataRange" 
          :options="['含资源池', '不含资源池']" 
          class="custom-segmented"
        />
      </div>
    </div>
  </div>
</template>

<style scoped src="@/components/dashboard/styles/DashboardHeader.css"></style>
