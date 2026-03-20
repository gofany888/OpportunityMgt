<template>
  <div class="audit-detail-header">
    <a-button type="text" class="audit-detail-header__back" @click="router.back()">
      <template #icon>
        <ArrowLeftOutlined />
      </template>
    </a-button>

    <div class="audit-detail-header__copy">
      <div class="audit-detail-header__title-row">
        <a-typography-title :level="4" class="audit-detail-header__title">
          {{ detail.title }}
        </a-typography-title>
        <a-typography-text class="audit-detail-header__subtitle">
          {{ detail.subtitle }}
        </a-typography-text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

defineProps({
  detail: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
</script>

<style scoped src="./styles/AuditDetailHeader.css"></style>
