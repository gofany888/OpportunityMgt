<template>
  <a-button type="text" class="back-icon-button" @click="$emit('click', $event)">
    <template #icon>
      <ArrowLeftOutlined />
    </template>
  </a-button>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

defineEmits(['click'])
</script>

<style scoped src="./styles/BackIconButton.css"></style>
