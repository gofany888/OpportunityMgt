<template>
  <div class="annual-init-finalize-progress">
    <template v-if="!isCompleted">
      <div class="annual-init-finalize-progress__card">
        <div
          class="annual-init-finalize-progress__ring"
          :style="{ '--progress': `${progressPercent}%` }"
        >
          <div class="annual-init-finalize-progress__ring-inner">
            {{ progressPercent }}%
          </div>
        </div>

        <div class="annual-init-finalize-progress__status">
          <LoadingOutlined />
          <span>{{ currentStage.title }}</span>
        </div>

        <div class="annual-init-finalize-progress__helper">
          {{ annualInitializationFinalizeProgress.helperText }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="annual-init-finalize-progress__completion">
        <div
          :class="[
            'annual-init-finalize-progress__completion-shell',
            { 'is-entered': resultEntered },
          ]"
        >
          <div class="annual-init-finalize-progress__metrics">
            <div
              v-for="metric in displayMetrics"
              :key="metric.key"
              :class="['annual-init-finalize-progress__metric', `is-${metric.tone}`]"
            >
              <div :class="['annual-init-finalize-progress__metric-icon', `is-${metric.tone}`]">
                <component :is="metricIconMap[metric.icon]" />
              </div>
              <div class="annual-init-finalize-progress__metric-copy">
                <div :class="['annual-init-finalize-progress__metric-value', `is-${metric.tone}`]">
                  {{ metric.value }}
                </div>
                <div class="annual-init-finalize-progress__metric-title">{{ metric.title }}</div>
              </div>
            </div>
          </div>

          <div class="annual-init-finalize-progress__success">
            <div class="annual-init-finalize-progress__success-icon-shell">
              <CheckCircleOutlined />
            </div>
            <div class="annual-init-finalize-progress__success-title">
              {{ completionConfig.title }}
            </div>
            <div class="annual-init-finalize-progress__success-badge">
              <StarOutlined />
              <span>{{ completionConfig.badge }}</span>
            </div>

            <div class="annual-init-finalize-progress__success-panel">
              <div class="annual-init-finalize-progress__success-summary">
                {{ completionConfig.summaryPrefix }}
                <span class="annual-init-finalize-progress__success-count">
                  {{ completionConfig.summaryCount }}
                </span>
                {{ completionConfig.summarySuffix }}
              </div>

              <div class="annual-init-finalize-progress__success-split">
                <div class="annual-init-finalize-progress__success-metric">
                  <div class="annual-init-finalize-progress__success-metric-value is-blue">
                    {{ completionConfig.admitCount }}
                  </div>
                  <div class="annual-init-finalize-progress__success-metric-label">
                    {{ completionConfig.admitLabel }}
                  </div>
                </div>
                <div class="annual-init-finalize-progress__success-divider" />
                <div class="annual-init-finalize-progress__success-metric">
                  <div class="annual-init-finalize-progress__success-metric-value is-orange">
                    {{ completionConfig.writeoffCount }}
                  </div>
                  <div class="annual-init-finalize-progress__success-metric-label">
                    {{ completionConfig.writeoffLabel }}
                  </div>
                </div>
              </div>
            </div>

            <div class="annual-init-finalize-progress__success-actions">
              <a-button class="annual-init-finalize-progress__success-primary" @click.prevent="handleClose">
                {{ completionConfig.primaryActionText }}
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ApartmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  StarOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import {
  annualInitializationFinalizeProgress,
  annualInitializationGovernanceWorkspace,
} from '@/data/data-import-center/annualInitializationData'

const props = defineProps({
  scenarioKey: {
    type: String,
    default: 'eis',
  },
})

const router = useRouter()
const emit = defineEmits(['complete'])

const stageIndex = ref(0)
const isCompleted = ref(false)
const resultEntered = ref(false)
let timerId = null
let completeTimerId = null

const metricIconMap = {
  ApartmentOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
}

const stageList = computed(
  () =>
    annualInitializationFinalizeProgress.stages[props.scenarioKey]
    ?? annualInitializationFinalizeProgress.stages.eis,
)

const currentStage = computed(
  () =>
    stageList.value[stageIndex.value] ?? stageList.value[stageList.value.length - 1],
)

const progressPercent = computed(() => currentStage.value?.percent ?? 0)
const completionConfig = computed(
  () =>
    annualInitializationFinalizeProgress.completion[props.scenarioKey]
    ?? annualInitializationFinalizeProgress.completion.eis,
)
const displayMetrics = computed(() => {
  if (props.scenarioKey === 'business') {
    return [
      {
        key: 'physical',
        title: '物理质量异常',
        value: '0',
        tone: 'muted',
        icon: 'ExclamationCircleOutlined',
      },
      {
        key: 'conflict',
        title: '台账冲突规模',
        value: '0',
        tone: 'muted',
        icon: 'ApartmentOutlined',
      },
      {
        key: 'ready',
        title: '已就绪记录',
        value:
          annualInitializationGovernanceWorkspace.businessMetrics.find(
            (metric) => metric.key === 'ready',
          )?.value ?? '1331',
        tone: 'success',
        icon: 'CheckCircleOutlined',
      },
    ]
  }

  const sourceMetrics =
    props.scenarioKey === 'business'
      ? annualInitializationGovernanceWorkspace.businessMetrics
      : annualInitializationGovernanceWorkspace.metrics

  return sourceMetrics.filter((metric) => metric.key !== 'physical')
})

onMounted(() => {
  timerId = window.setInterval(() => {
    if (stageIndex.value >= stageList.value.length - 1) {
      return
    }

    stageIndex.value += 1

    if (stageIndex.value >= stageList.value.length - 1) {
      if (timerId) {
        window.clearInterval(timerId)
        timerId = null
      }
      if (!completeTimerId) {
        completeTimerId = window.setTimeout(() => {
          isCompleted.value = true
          emit('complete')
          nextTick(() => {
            window.requestAnimationFrame(() => {
              resultEntered.value = true
            })
          })
          completeTimerId = null
        }, 600)
      }
    }
  }, annualInitializationFinalizeProgress.interval)
})

onBeforeUnmount(() => {
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
  if (completeTimerId) {
    window.clearTimeout(completeTimerId)
    completeTimerId = null
  }
})

function handleClose() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push({ name: 'data-import-center' })
}
</script>

<style scoped src="./styles/AnnualInitializationFinalizeProgress.css"></style>
