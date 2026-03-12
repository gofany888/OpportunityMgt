<template>
  <!-- 标题区：Teleport 到全局 Header -->
  <Teleport to="#header-title-portal" v-if="isMounted">
    <a-button
      type="text"
      :icon="h(ArrowLeftOutlined)"
      class="back-btn"
      @click="$router.push(pageHeaderConfig.backRoute)"
    />
    <a-typography-title :level="4" class="header-page-title">
      {{ pageHeaderConfig.title }}
    </a-typography-title>
    <a-tag color="success">{{ pageHeaderConfig.status }}</a-tag>
  </Teleport>

  <!-- 操作区：Teleport 到全局 Header -->
  <Teleport to="#header-actions-portal" v-if="isMounted">
    <a-space :size="8">
      <a-button :icon="h(FilterOutlined)">维度过滤</a-button>
      <a-button type="primary" :icon="h(DownloadOutlined)">导出报表</a-button>
    </a-space>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import {
  ArrowLeftOutlined,
  FilterOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue'
import { pageHeaderConfig } from '@/data/businessOpportunityData'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped src="./styles/PageHeader.css"></style>
