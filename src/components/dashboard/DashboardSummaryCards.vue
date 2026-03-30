<template>
  <div class="summary-cards-container">
    <a-row :gutter="16" class="flex-row-nowrap">
      <!-- Standard Metrics (3 Columns: Income, Procurement, GP) -->
      <a-col 
        v-for="(item, index) in summaryCardsData" 
        :key="index" 
        class="metric-column"
      >
        <a-card :bordered="false" class="pro-summary-card">
          <div class="card-inner-content">
            <!-- Header -->
            <div class="header-row">
              <span class="metric-title">{{ item.title }}</span>
              <div class="header-actions">
                <div class="action-slot">
                  <div class="metric-icon-ghost" :style="{ color: item.iconColor }">
                    <i :class="item.icon"></i>
                  </div>
                  <button type="button" class="drill-down-indicator" @click.stop="handleDrillDown(item)">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Hero Metric -->
            <div class="hero-section">
              <div class="actual-value-group">
                <span class="actual-value tabular-num">{{ item.actual }}</span>
                <span class="actual-unit">{{ item.actualUnit }}</span>
              </div>
            </div>
            
            <!-- Progress Layer -->
            <div class="progress-layer">
              <div class="progress-info">
                <span class="info-rate">完成率 <span class="highlight">{{ item.completeRate }}%</span></span>
                <span class="info-target">目标 <span class="num">{{ item.target }}</span></span>
              </div>
              <a-progress 
                :percent="item.completeRate" 
                :show-info="false" 
                :stroke-color="item.iconColor"
                :stroke-width="6"
                status="active"
                class="narrow-progress"
              />
            </div>

            <!-- Insight Compartment (3 Vertical Rows) -->
            <div class="insight-compartment">
               <!-- Row 1: Annual Forecast (PM) -->
               <div class="insight-row">
                 <div class="label flex-label">
                   当年预测
                   <template v-if="parseFloat(item.forecast) > parseFloat(item.eisForecast)">
                     <a-tooltip title="PM 预测较系统更乐观">
                       <i class="fa-solid fa-arrow-trend-up text-warning"></i>
                     </a-tooltip>
                   </template>
                   <template v-else-if="parseFloat(item.forecast) < parseFloat(item.eisForecast)">
                     <a-tooltip title="PM 预测较系统更保守">
                       <i class="fa-solid fa-arrow-trend-down text-info"></i>
                     </a-tooltip>
                   </template>
                 </div>
                 <span class="value tabular-num">{{ item.forecast }}</span>
               </div>
               
               <!-- Row 2: EIS Forecast -->
               <div class="insight-row">
                 <div class="label flex-label">EIS预测</div>
                 <span class="value tabular-num">{{ item.eisForecast }}</span>
               </div>
               
               <!-- Divider -->
               <div class="insight-divider"></div>

               <!-- Row 3: Final Conclusion -->
               <div class="insight-row conclusion-row">
                 <span class="label">年度预计完成率</span>
                 <span class="value tabular-num conclusion-value" :style="{ color: item.iconColor }">
                   {{ item.yearCompleteRate }}%
                 </span>
               </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { summaryCardsData } from '@/data/dashboardData';

const router = useRouter()

const handleDrillDown = (item) => {
  router.push({
    path: '/ledger',
    query: {
      from: 'dashboard'
    }
  })
}
</script>

<style scoped src="@/components/dashboard/styles/DashboardSummaryCards.css"></style>
