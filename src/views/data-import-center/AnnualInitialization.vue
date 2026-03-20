<template>
  <div class="annual-initialization-page min-h-[calc(100vh-104px)]">
    <Teleport to="#header-title-portal" v-if="isMounted">
      <AnnualInitializationHeader :header-config="headerConfig" @back="handleHeaderBack" />
    </Teleport>

    <Teleport to="#header-actions-portal" v-if="isMounted">
      <div class="annual-initialization-page__actions">
        <div v-if="currentStep === 0" class="annual-initialization-page__demo">
          <span class="annual-initialization-page__demo-label">演示</span>
          <a-segmented
            v-model:value="demoMode"
            :options="demoModeOptions"
            class="annual-initialization-page__demo-segmented"
          />
        </div>
        <div v-else-if="currentStep === 1" class="annual-initialization-page__demo">
          <span class="annual-initialization-page__demo-label">演示</span>
          <a-segmented
            v-model:value="governanceDemoMode"
            :options="governanceDemoOptions"
            class="annual-initialization-page__demo-segmented"
          />
        </div>
        <div class="annual-initialization-page__snapshot">
          <component
            :is="snapshotIcon"
            :class="[
              'annual-initialization-page__snapshot-icon',
              { 'is-realtime': headerConfig.snapshotMode === 'realtime' },
            ]"
          />
          <div class="annual-initialization-page__snapshot-copy">
            <template v-if="headerConfig.snapshotMode === 'realtime'">
              <span class="annual-initialization-page__snapshot-label is-realtime">
                {{ headerConfig.snapshotLabel }}
              </span>
              <span class="annual-initialization-page__snapshot-time is-realtime">
                {{ headerConfig.snapshotTime }}
              </span>
              <span class="annual-initialization-page__snapshot-meta is-realtime">
                {{ headerConfig.snapshotMeta }}
              </span>
            </template>
            <template v-else>
              <span class="annual-initialization-page__snapshot-label">
                {{ headerConfig.snapshotLabel }}
              </span>
              <span class="annual-initialization-page__snapshot-time">
                {{ headerConfig.snapshotTime }}
              </span>
              <span class="annual-initialization-page__snapshot-meta">
                ({{ headerConfig.snapshotMeta }})
              </span>
            </template>
          </div>
        </div>
      </div>
    </Teleport>

    <div class="annual-initialization-page__content">
      <AnnualInitializationSteps
        :current="currentStep"
        :completed="finalizeProgressCompleted"
        :steps="stepsConfig"
        :class="{
          'is-final-step': currentStep === 2,
          'is-final-complete': currentStep === 2 && finalizeProgressCompleted,
        }"
      />
      <div class="annual-initialization-page__canvas">
        <template v-if="currentStep === 0">
          <AnnualInitializationUploadCard :upload-card="uploadCardConfig" @select="handleFileSelect" />
          <AnnualInitializationFeatureRow :features="featureConfig" />
        </template>
        <AnnualInitializationGovernanceWorkspace
          v-else-if="currentStep === 1"
          :scenario-key="activeScenarioKey"
          :demo-mode="governanceDemoMode"
          @status-change="handleGovernanceStatusChange"
          @finalize="handleGovernanceFinalize"
          @restart="handleGovernanceRestart"
        />
        <AnnualInitializationFinalizeProgress
          v-else
          :scenario-key="activeScenarioKey"
          @complete="handleFinalizeProgressComplete"
        />
      </div>
    </div>

    <div
      v-if="exitWarningVisible"
      class="annual-initialization-page__exit-overlay"
    >
      <div class="annual-initialization-page__exit-dialog">
        <div class="annual-initialization-page__exit-panel">
          <div class="annual-initialization-page__exit-icon-shell">
            <ArrowLeftOutlined />
          </div>
          <div class="annual-initialization-page__exit-title">退出治理沙箱?</div>
          <div class="annual-initialization-page__exit-summary">
            检测到您已完成
            <span class="annual-initialization-page__exit-count">
              {{ governanceHandledCount }}
            </span>
            项决策拟定。
          </div>
          <div class="annual-initialization-page__exit-text">
            由于数据尚未“定稿存证”，此时返回将导致
            <span class="annual-initialization-page__exit-highlight">当前治理进度丢失</span>。
            确认要放弃本次治理并离开吗？
          </div>
          <div class="annual-initialization-page__exit-actions">
            <a-button
              class="annual-initialization-page__exit-cancel"
              @click="handleContinueGovernance"
            >
              继续处理
            </a-button>
            <a-button
              type="primary"
              class="annual-initialization-page__exit-confirm"
              @click="handleLeaveGovernance"
            >
              放弃并返回
            </a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增：定稿任务正在执行中 确认弹窗 -->
    <div
      v-if="finalizeExitWarningVisible"
      class="annual-initialization-page__finalize-exit-overlay"
    >
      <div class="annual-initialization-page__finalize-exit-dialog">
        <div class="annual-initialization-page__finalize-exit-panel">
          <div class="annual-initialization-page__finalize-exit-icon-shell">
            <SendOutlined :style="{ fontSize: '36px', color: '#2f54eb', transform: 'rotate(-15deg)', display: 'inline-block' }" />
          </div>
          <div class="annual-initialization-page__finalize-exit-title">定稿任务正在执行中</div>
          <div class="annual-initialization-page__finalize-exit-text">
            对标存证与任务发派已转入后台程序。您可以安全返回【经营驾驶舱】或直接关闭页面，系统将在处理完成后自动更新数据并生成审计日志。
          </div>
          <div class="annual-initialization-page__finalize-exit-actions">
            <a-button
              class="annual-initialization-page__finalize-exit-cancel"
              @click="handleContinueFinalize"
            >
              留在本页观察
            </a-button>
            <a-button
              type="primary"
              class="annual-initialization-page__finalize-exit-confirm"
              @click="handleLeaveFinalize"
            >
              确认离开
            </a-button>
          </div>
        </div>
      </div>
    </div>

    <a-modal
      v-model:open="resultModalVisible"
      :footer="null"
      :closable="false"
      :mask-closable="false"
      :keyboard="false"
      :width="580"
      centered
      wrap-class-name="annual-initialization-page__modal-wrap"
      class="annual-initialization-page__modal"
      @cancel="closeResultModal"
    >
      <AnnualInitializationProgress
        v-if="activeResultType === 'normal-progress'"
        @complete="handleProgressComplete"
        @cancel="closeResultModal"
      />
      <AnnualInitializationVersionConflict
        v-else-if="activeResultType === 'version-conflict'"
        @close="closeResultModal"
      />
      <AnnualInitializationComplianceBlock
        v-else-if="activeResultType === 'compliance-blocked'"
        @close="closeResultModal"
      />
    </a-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ArrowLeftOutlined, DatabaseOutlined, LineChartOutlined, SendOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import AnnualInitializationHeader from '@/components/data-import-center/AnnualInitializationHeader.vue'
import AnnualInitializationGovernanceWorkspace from '@/components/data-import-center/AnnualInitializationGovernanceWorkspace.vue'
import AnnualInitializationSteps from '@/components/data-import-center/AnnualInitializationSteps.vue'
import AnnualInitializationUploadCard from '@/components/data-import-center/AnnualInitializationUploadCard.vue'
import AnnualInitializationFeatureRow from '@/components/data-import-center/AnnualInitializationFeatureRow.vue'
import AnnualInitializationComplianceBlock from '@/components/data-import-center/AnnualInitializationComplianceBlock.vue'
import AnnualInitializationFinalizeProgress from '@/components/data-import-center/AnnualInitializationFinalizeProgress.vue'
import AnnualInitializationProgress from '@/components/data-import-center/AnnualInitializationProgress.vue'
import AnnualInitializationVersionConflict from '@/components/data-import-center/AnnualInitializationVersionConflict.vue'
import { annualInitializationScenarios } from '@/data/data-import-center/annualInitializationData'

const route = useRoute()
const router = useRouter()
const isMounted = ref(false)
const demoMode = ref('normal')
const governanceDemoMode = ref('with-issues')
const resultModalVisible = ref(false)
const activeResultType = ref('')
const currentStep = ref(0)
const finalizeProgressCompleted = ref(false)
const exitWarningVisible = ref(false)
const finalizeExitWarningVisible = ref(false)
const governanceHasProgress = ref(false)
const governanceHandledCount = ref(0)
const demoModeOptions = [
  { label: '正常导入', value: 'normal' },
  { label: '版本冲突预警', value: 'version-conflict' },
  { label: '合规熔断拦截', value: 'compliance-blocked' },
]
const governanceDemoOptions = [
  { label: '有异常', value: 'with-issues' },
  { label: '没异常', value: 'without-issues' },
]
const DATA_IMPORT_CENTER_ROUTE = { name: 'data-import-center' }

const activeScenarioKey = computed(() => (route.query.mode === 'business' ? 'business' : 'eis'))
const activeScenario = computed(() => annualInitializationScenarios[activeScenarioKey.value])
const headerConfig = computed(() => {
  const header = activeScenario.value.header

  if (currentStep.value > 0 && activeScenarioKey.value === 'eis') {
    return {
      ...header,
      snapshotLabel: '数据时间',
    }
  }

  return header
})
const stepsConfig = computed(() => activeScenario.value.steps)
const uploadCardConfig = computed(() => activeScenario.value.uploadCard)
const featureConfig = computed(() => activeScenario.value.features)
const snapshotIcon = computed(() =>
  headerConfig.value.snapshotIcon === 'LineChartOutlined' ? LineChartOutlined : DatabaseOutlined,
)

onMounted(() => {
  isMounted.value = true
})

const handleFileSelect = () => {
  activeResultType.value =
    demoMode.value === 'normal' ? 'normal-progress' : demoMode.value
  resultModalVisible.value = true
}

const handleProgressComplete = () => {
  currentStep.value = 1
  closeResultModal()
}

const handleGovernanceStatusChange = ({ hasGovernanceProgress, handledRowCount }) => {
  governanceHasProgress.value = Boolean(hasGovernanceProgress)
  governanceHandledCount.value = Number(handledRowCount) || 0
}

const handleGovernanceFinalize = () => {
  currentStep.value = 2
  finalizeProgressCompleted.value = false
}

const handleGovernanceRestart = () => {
  currentStep.value = 0
  finalizeProgressCompleted.value = false
}

const handleFinalizeProgressComplete = () => {
  finalizeProgressCompleted.value = true
}

const navigateBackToImportCenter = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push(DATA_IMPORT_CENTER_ROUTE)
}

const handleHeaderBack = () => {
  if (currentStep.value === 1 && governanceHandledCount.value > 0) {
    exitWarningVisible.value = true
    return
  }

  if (currentStep.value === 2 && !finalizeProgressCompleted.value) {
    finalizeExitWarningVisible.value = true
    return
  }

  navigateBackToImportCenter()
}

const handleContinueGovernance = () => {
  exitWarningVisible.value = false
}

const handleLeaveGovernance = () => {
  exitWarningVisible.value = false
  navigateBackToImportCenter()
}

const handleContinueFinalize = () => {
  finalizeExitWarningVisible.value = false
}

const handleLeaveFinalize = () => {
  finalizeExitWarningVisible.value = false
  navigateBackToImportCenter()
}

const closeResultModal = () => {
  resultModalVisible.value = false
  activeResultType.value = ''
}
</script>

<style src="./styles/AnnualInitialization.css"></style>
