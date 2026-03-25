<template>
  <div class="dashboard-page">
    <div class="dashboard-welcome">
      <a-card class="welcome-card" :bordered="false">
        <!-- 装饰背景图标 -->
        <i class="fa-solid fa-cubes-stacked decorative-icon"></i>

        <div class="welcome-content">
          <!-- 图标 -->
          <div class="welcome-icon-wrapper">
            <i class="fa-solid fa-border-all welcome-icon"></i>
          </div>

          <!-- 标题 -->
          <a-typography-title :level="2" class="welcome-title">
            {{ dashboardWelcome.title }}
          </a-typography-title>

          <!-- 角色标签 -->
          <a-space :size="8" align="center">
            <a-typography-text type="secondary" class="role-label">
              {{ dashboardWelcome.roleLabel }}
            </a-typography-text>
            <a-tag color="blue" class="role-tag">
              {{ dashboardWelcome.roleName }}
            </a-tag>
          </a-space>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { dashboardWelcome } from '@/data/dashboardData'
</script>

<style scoped src="./styles/IndexDashboard.css"></style>
