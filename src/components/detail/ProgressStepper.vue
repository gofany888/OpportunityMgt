<template>
  <a-card :bordered="false" class="detail-progress-card">
    <template #title>
      <div class="detail-section-title">
        <LineChartOutlined class="detail-section-title-icon" />
        <span>{{ detailProgressConfig.title }}</span>
      </div>
    </template>
    <template #extra>
      <a-tag color="processing">当前子环节：{{ detailProgressConfig.currentSubStage }}</a-tag>
    </template>

    <div class="detail-progress-track">
      <div
        v-for="step in detailProgressConfig.steps"
        :key="step.key"
        class="detail-progress-item"
      >
        <div
          v-if="stepIndex(step.key) < detailProgressConfig.steps.length - 1"
          class="detail-progress-line"
        >
          <div
            :class="[
              'detail-progress-line-fill',
              {
                'is-complete': stepIndex(step.key) < currentIndex,
                'is-partial': stepIndex(step.key) === currentIndex,
              },
            ]"
          ></div>
        </div>

        <div
          :class="[
            'detail-progress-node',
            `is-${step.status}`,
          ]"
        >
          <CheckOutlined v-if="step.status === 'finish'" />
          <span v-else>{{ formatStepNumber(stepIndex(step.key) + 1) }}</span>
        </div>

        <div
          :class="[
            'detail-progress-label',
            `is-${step.status}`,
          ]"
        >
          {{ step.title }}
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { computed } from 'vue'
import { CheckOutlined, LineChartOutlined } from '@ant-design/icons-vue'
import { detailProgressConfig } from '@/data/detailPageData'

const currentIndex = computed(() =>
  detailProgressConfig.steps.findIndex((step) => step.status === 'process')
)

const stepIndex = (key) => detailProgressConfig.steps.findIndex((step) => step.key === key)

const formatStepNumber = (value) => String(value).padStart(2, '0')
</script>

<style scoped src="./styles/ProgressStepper.css"></style>
