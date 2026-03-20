<template>
  <div class="annual-init-feature-row">
    <div
      v-for="feature in features"
      :key="feature.key"
      class="annual-init-feature-row__item"
    >
      <div :class="['annual-init-feature-row__icon', `is-${feature.key}`]">
        <component :is="featureIconMap[feature.icon]" />
      </div>
      <div class="annual-init-feature-row__copy">
        <div class="annual-init-feature-row__title">{{ feature.title }}</div>
        <div class="annual-init-feature-row__desc">{{ feature.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ApartmentOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue'

const featureIconMap = {
  Cluster: ApartmentOutlined,
  History: HistoryOutlined,
  Swap: SwapOutlined,
  Shield: SafetyCertificateOutlined,
}

defineProps({
  features: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped src="./styles/AnnualInitializationFeatureRow.css"></style>
