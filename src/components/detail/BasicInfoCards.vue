<template>
  <a-row :gutter="[20, 20]" class="detail-info-row">
    <a-col :xs="24" :xl="12" class="detail-info-col">
      <a-card :bordered="false" class="detail-info-card detail-info-card-editable">
        <template #title>
          <div class="detail-section-title">
            <ApartmentOutlined class="detail-section-title-icon" />
            <span>{{ organizationOverviewConfig.title }}</span>
          </div>
        </template>

        <div class="detail-info-grid">
          <div
            v-for="field in organizationOverviewConfig.fields"
            :key="field.key"
            class="detail-info-grid-item"
          >
            <div class="detail-field-label">
              <span>{{ field.label }}</span>
              <a-tag v-if="field.tag" color="processing" class="detail-source-tag">{{ field.tag }}</a-tag>
            </div>
            
            <div 
              class="detail-inline-edit-wrapper"
              :data-field-key="field.key"
              @click.stop="startEdit(field.key, field.value)"
            >
              <template v-if="editingFieldKey === field.key">
                <a-select
                  v-if="field.key === 'department'"
                  v-model:value="orgForm[field.key]"
                  :options="deptOptions"
                  autofocus
                  open
                  class="detail-edit-input"
                  @change="confirmEdit(field.key)"
                />
                <a-input
                  v-else
                  v-model:value="orgForm[field.key]"
                  autofocus
                  class="detail-edit-input"
                  @pressEnter="confirmEdit(field.key)"
                />
              </template>
              <template v-else>
                <div :class="['detail-field-value-container', { 'is-modified': modifiedFields[field.key] }]">
                  <span class="detail-field-value">{{ field.value }}</span>
                  <EditOutlined class="inline-edit-icon" />
                  <span v-if="modifiedFields[field.key]" class="modified-dot"></span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </a-card>
    </a-col>

    <a-col :xs="24" :xl="12" class="detail-info-col">
      <a-card :bordered="false" class="detail-info-card detail-info-card-editable">
        <template #title>
          <div class="detail-section-title">
            <FileTextOutlined class="detail-section-title-icon" />
            <span>{{ financeProfileConfig.title }}</span>
          </div>
        </template>

        <div class="detail-info-grid">
          <div
            v-for="field in financeProfileConfig.fields"
            :key="field.key"
            :class="['detail-info-grid-item', { 'span-2': field.span === 2 }]"
          >
            <div class="detail-field-label">
              <span>{{ field.label }}</span>
              <a-tag
                v-if="field.tag"
                color="processing"
                class="detail-source-tag"
              >
                {{ field.tag }}
              </a-tag>
            </div>
            
            <div 
              class="detail-inline-edit-wrapper"
              :data-field-key="field.key"
              @click.stop="startEdit(field.key, field.value)"
            >
              <template v-if="editingFieldKey === field.key">
                <a-select
                  v-if="field.type === 'select'"
                  v-model:value="orgForm[field.key]"
                  :options="field.options.map((option) => ({ label: option, value: option }))"
                  open
                  autofocus
                  class="detail-edit-input"
                  :popupClassName="field.key === 'bidType' ? 'select-wide-dropdown' : ''"
                  @change="confirmEdit(field.key)"
                />
                <a-input
                  v-else
                  v-model:value="orgForm[field.key]"
                  autofocus
                  class="detail-edit-input"
                  @pressEnter="confirmEdit(field.key)"
                />
              </template>
              <template v-else>
                <div :class="['detail-field-value-container', { 'is-modified': modifiedFields[field.key] }]">
                  <span :class="['detail-field-value', { 'num-font': field.numeric }]">
                    {{ field.value }}
                  </span>
                  <EditOutlined class="inline-edit-icon" />
                  <span v-if="modifiedFields[field.key]" class="modified-dot"></span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="detail-summary-panel">
          <div class="detail-summary-main">
            <div class="detail-summary-info">
              <a-typography-text class="detail-summary-label">
                {{ financeProfileConfig.summaryTitle }}
              </a-typography-text>
              <div class="detail-summary-note">
                <SafetyCertificateOutlined />
                <span>{{ financeProfileConfig.summaryNote }}</span>
              </div>
            </div>
            <a-statistic
              :value="financeProfileConfig.summaryValue"
              :prefix="financeProfileConfig.summaryPrefix"
              :suffix="financeProfileConfig.summaryUnit"
              :value-style="summaryValueStyle"
            />
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import {
  ApartmentOutlined,
  EditOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue'
import {
  financeProfileConfig,
  organizationOverviewConfig,
} from '@/data/detailPageData'

// 行内编辑相关状态
const editingFieldKey = ref(null)
const modifiedFields = reactive({})
const orgForm = reactive({})
const initialOrgValues = {} // 记录初始值，用于脏检查
const initialFinanceValues = {}
const financeSyncTick = ref(0)

const deptOptions = [
  { label: '云业务运营产品部', value: '云业务运营产品部' },
  { label: '电力二部', value: '电力二部' },
  { label: '电力三部', value: '电力三部' },
  { label: '政府事业部', value: '政府事业部' },
]

const startEdit = (key, value) => {
  if (editingFieldKey.value === key) return
  editingFieldKey.value = key
  orgForm[key] = value
}

const confirmEdit = (key) => {
  if (!key) return
  
  // 按照 Key 在两个配置中查找对应的字段和初始值
  let field = organizationOverviewConfig.fields.find(f => f.key === key)
  let initialValue = initialOrgValues[key]
  
  if (!field) {
    field = financeProfileConfig.fields.find(f => f.key === key)
    initialValue = initialFinanceValues[key]
  }

  if (field) {
    field.value = orgForm[key]
    // 只有与初始值不同时，才显示红点
    modifiedFields[key] = field.value !== initialValue

    if (key === 'bidType') {
      window.dispatchEvent(
        new CustomEvent('detail:bid-type-change', {
          detail: { value: field.value },
        })
      )
    }
  }
  editingFieldKey.value = null
}

const handleGlobalClick = (e) => {
  if (editingFieldKey.value) {
    const activeWrapper = e.target.closest('.detail-inline-edit-wrapper')
    const isCurrentField =
      activeWrapper?.dataset.fieldKey === editingFieldKey.value
    const isDropdown = e.target.closest('.ant-select-dropdown')

    // 只要点击位置不在当前编辑字段内部，就立即确认保存
    if (!isCurrentField && !isDropdown) {
      confirmEdit(editingFieldKey.value)
    }
  }
}

const handleBidTypeSync = (event) => {
  const nextValue = event.detail?.value

  if (!nextValue) {
    return
  }

  const bidTypeField = financeProfileConfig.fields.find((field) => field.key === 'bidType')

  if (!bidTypeField || bidTypeField.value === nextValue) {
    return
  }

  bidTypeField.value = nextValue
  orgForm.bidType = nextValue
  modifiedFields.bidType = nextValue !== initialFinanceValues.bidType
  financeSyncTick.value += 1
}

onMounted(() => {
  // 初始化初始值，用于脏检查
  organizationOverviewConfig.fields.forEach(field => {
    initialOrgValues[field.key] = field.value
  })
  financeProfileConfig.fields.forEach(field => {
    initialFinanceValues[field.key] = field.value
  })
  window.addEventListener('mousedown', handleGlobalClick, true)
  window.addEventListener('detail:bid-type-change', handleBidTypeSync)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleGlobalClick, true)
  window.removeEventListener('detail:bid-type-change', handleBidTypeSync)
})

const summaryValueStyle = computed(() => ({
  color: '#adc6ff',
  fontSize: '32px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
}))
</script>

<style scoped src="./styles/BasicInfoCards.css"></style>
