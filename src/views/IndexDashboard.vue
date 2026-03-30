<template>
  <div class="dashboard-page">
    <DashboardHeader />
    <DashboardSummaryCards />
    <DashboardTrendChart />
    <DashboardPerformanceTable />
    <DashboardDiscrepancyTable />
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import DashboardSummaryCards from '@/components/dashboard/DashboardSummaryCards.vue';
import DashboardTrendChart from '@/components/dashboard/DashboardTrendChart.vue';
import DashboardPerformanceTable from '@/components/dashboard/DashboardPerformanceTable.vue';
import DashboardDiscrepancyTable from '@/components/dashboard/DashboardDiscrepancyTable.vue';
</script>

<style scoped src="./styles/IndexDashboard.css"></style>
