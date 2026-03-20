<template>
  <a-card :bordered="false" class="detail-header-card">
    <div class="detail-header-row">
      <div class="detail-header-title-wrap">
        <a-button
          type="text"
          :icon="h(ArrowLeftOutlined)"
          class="detail-header-back"
          @click="router.back()"
        />
        <a-tag class="detail-header-parent-tag">{{ detailHeaderConfig.parentTag }}</a-tag>
        <a-typography-title :level="4" class="detail-header-title">
          {{ detailHeaderConfig.title }}
        </a-typography-title>
        <a-space :size="4" class="detail-header-owner">
          <a-typography-text type="secondary">
            {{ detailHeaderConfig.ownerLabel }}：{{ detailHeaderConfig.owner }}
          </a-typography-text>
          <EditOutlined />
        </a-space>
      </div>

      <a-button type="primary" :icon="h(SaveOutlined)">
        {{ detailHeaderConfig.saveText }}
      </a-button>
    </div>
  </a-card>
</template>

<script setup>
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { detailHeaderConfig } from '@/data/detailPageData'

const router = useRouter()
</script>

<style scoped src="./styles/DetailHeader.css"></style>
