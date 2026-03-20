<template>
  <a-card :bordered="false" class="annual-init-steps-card">
    <a-steps :current="current" label-placement="vertical" class="annual-init-steps">
      <a-step
        v-for="(step, index) in steps"
        :key="step.key"
        :title="step.title"
      >
        <template #icon>
          <div
            :class="[
              'annual-init-steps__icon',
              {
                'is-done': index < current,
                'is-active': index === current,
                'is-complete': completed && index === current,
              },
            ]"
          >
            <component :is="iconMap[step.icon]" />
          </div>
        </template>
      </a-step>
    </a-steps>
  </a-card>
</template>

<script setup>
import {
  CloudUploadOutlined,
  FileAddOutlined,
  SafetyOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'

const iconMap = {
  CloudUploadOutlined,
  FileAddOutlined,
  SafetyOutlined,
  SettingOutlined,
}

defineProps({
  current: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped src="./styles/AnnualInitializationSteps.css"></style>
