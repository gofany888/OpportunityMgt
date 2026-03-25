<template>
<div class="report-center-page">
  <div class="report-center">
    <a-row :gutter="[24, 24]">
      <a-col
        v-for="card in reportCards"
        :key="card.key"
        :xs="24" :sm="12" :lg="8" :xl="6"
      >
        <a-card
          hoverable
          :class="['report-card', { 'report-card--disabled': card.disabled }]"
          :bordered="false"
          @click="!card.disabled && card.route && $router.push(card.route)"
        >
          <div class="card-icon-wrapper" :class="card.disabled ? 'card-icon--disabled' : ''">
            <component :is="getIcon(card.icon)" class="card-icon" />
          </div>

          <a-typography-title :level="5" class="card-title">
            {{ card.title }}
          </a-typography-title>

          <a-typography-paragraph type="secondary" class="card-desc">
            {{ card.description }}
          </a-typography-paragraph>

          <div class="card-footer">
            <a-tag v-if="card.disabled" class="card-tag--disabled">{{ card.tag }}</a-tag>
            <a-tag v-else color="blue">{{ card.tag }}</a-tag>

            <a-typography-link v-if="!card.disabled" class="card-link">
              查看详情 <right-outlined class="card-link-arrow" />
            </a-typography-link>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</div>
</template>

<script setup>
import {
  FundOutlined,
  PieChartOutlined,
  TeamOutlined,
  RightOutlined,
} from '@ant-design/icons-vue'
import { reportCards } from '@/data/reportCenterData'

const iconMap = {
  'fund-outlined': FundOutlined,
  'pie-chart-outlined': PieChartOutlined,
  'team-outlined': TeamOutlined,
}

const getIcon = (name) => iconMap[name] || FundOutlined
</script>

<style scoped src="./styles/ReportCenter.css"></style>
