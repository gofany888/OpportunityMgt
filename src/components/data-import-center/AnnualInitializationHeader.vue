<template>
  <div class="annual-initialization-header">
    <div class="annual-initialization-header__main">
      <a-button type="text" class="annual-initialization-header__back" @click="$emit('back')">
        <template #icon>
          <ArrowLeftOutlined />
        </template>
      </a-button>
      <span class="annual-initialization-header__title">{{ headerConfig.title }}</span>
      <span v-if="headerConfig.subtitle" class="annual-initialization-header__subtitle">
        {{ headerConfig.subtitle }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

defineProps({
  headerConfig: {
    type: Object,
    required: true,
  },
})

defineEmits(['back'])
</script>

<style scoped src="./styles/AnnualInitializationHeader.css"></style>
