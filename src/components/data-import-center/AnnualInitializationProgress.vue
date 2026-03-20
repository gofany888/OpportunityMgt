<template>
  <div class="annual-init-progress-card">
    <div class="annual-init-progress-card__hero">
      <div
        class="annual-init-progress-card__ring"
        :style="{ '--progress': `${progressPercent}%` }"
      >
        <div class="annual-init-progress-card__ring-glow" />
        <div class="annual-init-progress-card__icon-shell">
          <SyncOutlined />
        </div>
      </div>

      <div class="annual-init-progress-card__title">
        {{ annualInitializationProgress.title }}
      </div>
      <div class="annual-init-progress-card__subtitle">
        {{ annualInitializationProgress.subtitle }}
      </div>
    </div>

    <div class="annual-init-progress-card__stages">
      <div
        v-for="stage in resolvedStages"
        :key="stage.key"
        :class="['annual-init-progress-card__stage', `is-${stage.status}`]"
      >
        <div :class="['annual-init-progress-card__stage-icon', `is-${stage.status}`]">
          <component :is="stageIconMap[stage.icon]" />
        </div>
        <div :class="['annual-init-progress-card__stage-title', `is-${stage.status}`]">
          {{ stage.title }}
        </div>
      </div>
    </div>

    <div class="annual-init-progress-card__actions">
      <a-button class="annual-init-progress-card__cancel" @click.prevent="handleCancel">
        取消导入
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { CheckOutlined, LoadingOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { annualInitializationProgress } from '@/data/data-import-center/annualInitializationData'

const stageIconMap = {
  CheckOutlined,
  LoadingOutlined,
  SearchOutlined,
}

const emit = defineEmits(['complete', 'cancel'])

const elapsedMs = ref(0)
let timerId = null

const totalDuration = annualInitializationProgress.stages.length * annualInitializationProgress.stepDuration

const progressPercent = computed(() =>
  Math.min(100, (elapsedMs.value / totalDuration) * 100),
)

const resolvedStages = computed(() =>
  annualInitializationProgress.stages.map((stage, index) => {
    const start = index * annualInitializationProgress.stepDuration
    const end = start + annualInitializationProgress.stepDuration

    if (elapsedMs.value >= end) {
      return {
        ...stage,
        title: stage.doneTitle,
        status: 'done',
        icon: 'CheckOutlined',
      }
    }

    if (elapsedMs.value >= start) {
      return {
        ...stage,
        title: stage.activeTitle,
        status: index === 2 ? 'active-soft' : 'active',
      }
    }

    return {
      ...stage,
      title: stage.activeTitle,
      status: 'waiting',
    }
  }),
)

onMounted(() => {
  const startedAt = Date.now()
  timerId = window.setInterval(() => {
    const nextElapsed = Date.now() - startedAt
    elapsedMs.value = Math.min(nextElapsed, totalDuration)

    if (nextElapsed >= totalDuration && timerId) {
      window.clearInterval(timerId)
      timerId = null
      window.setTimeout(() => {
        emit('complete')
      }, 350)
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
})

function handleCancel() {
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
  emit('cancel')
}
</script>

<style scoped src="./styles/AnnualInitializationProgress.css"></style>
