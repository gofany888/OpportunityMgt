<template>
  <div class="annual-initialization-header">
    <div class="annual-initialization-header__main">
      <BackIconButton @click="$emit('back')" />
      <span class="annual-initialization-header__title">{{ headerConfig.title }}</span>
      <span v-if="headerConfig.subtitle" class="annual-initialization-header__subtitle">
        {{ headerConfig.subtitle }}
      </span>
    </div>
  </div>
</template>

<script setup>
import BackIconButton from '@/components/common/BackIconButton.vue'

defineProps({
  headerConfig: {
    type: Object,
    required: true,
  },
})

defineEmits(['back'])
</script>

<style scoped src="./styles/AnnualInitializationHeader.css"></style>
