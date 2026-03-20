<template>
  <a-card :bordered="false" class="detail-subheader-card">
    <div class="detail-subheader-top">
      <a-space :size="12">
        <div class="detail-subheader-icon">
          <CodeOutlined />
        </div>
        <a-typography-title :level="5" class="detail-subheader-title">
          {{ subItemHeaderConfig.title }}
        </a-typography-title>
      </a-space>
      <a-button
        type="text"
        :icon="h(isExpanded ? UpOutlined : DownOutlined)"
        @click="$emit('toggle')"
      />
    </div>

    <a-row :gutter="[24, 16]">
      <a-col :xs="24" :md="8">
        <div class="detail-subheader-label">{{ subItemHeaderConfig.codeLabel }}</div>
        <div class="detail-subheader-value">{{ subItemHeaderConfig.code }}</div>
      </a-col>
      <a-col :xs="24" :md="8">
        <div class="detail-subheader-label">{{ subItemHeaderConfig.pmLabel }}</div>
        <div class="detail-subheader-value">{{ subItemHeaderConfig.pm }}</div>
      </a-col>
      <a-col :xs="24" :md="8">
        <div class="detail-subheader-label">{{ subItemHeaderConfig.amountLabel }}</div>
        <div class="detail-subheader-value is-accent num-font">{{ subItemHeaderConfig.amount }}</div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
import { h } from 'vue'
import { CodeOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { subItemHeaderConfig } from '@/data/detailPageData'

defineProps({
  isExpanded: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle'])
</script>

<style scoped src="./styles/SubItemHeader.css"></style>
