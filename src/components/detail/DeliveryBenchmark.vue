<template>
  <a-card :bordered="false" class="detail-delivery-card">
    <template #title>
      <div class="detail-delivery-title">
        <div class="detail-delivery-icon">
          <DeploymentUnitOutlined />
        </div>
        <span>{{ deliveryBenchmarkConfig.title }}</span>
      </div>
    </template>

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :xl="12">
        <div class="detail-delivery-section-header">
          <a-space :size="8">
            <LineChartOutlined class="detail-section-title-icon" />
            <span>{{ deliveryBenchmarkConfig.deliveryTitle }}</span>
          </a-space>
          <a-tag color="processing">{{ deliveryBenchmarkConfig.deliveryScore }}</a-tag>
        </div>

        <div class="detail-delivery-stage-list">
          <a-card
            v-for="stage in deliveryStages"
            :key="stage.key"
            :bordered="false"
            :class="['detail-delivery-stage-card', { 'is-active': stage.editable }]"
          >
            <a-tag :class="['detail-stage-tag', `is-${stage.tagType}`]">
              {{ stage.tag }}
            </a-tag>

            <a-row :gutter="[16, 16]">
              <a-col :xs="24" :md="8">
                <div class="detail-stage-field-label">阶段名称</div>
                <a-input v-if="stage.editable" v-model:value="stage.name" />
                <a-typography-text v-else class="detail-stage-field-value">
                  {{ stage.name }}
                </a-typography-text>
              </a-col>

              <a-col :xs="24" :md="8">
                <div class="detail-stage-field-label">预测时间</div>
                <a-date-picker
                  v-if="stage.editable"
                  v-model:value="stage.forecast"
                  value-format="YYYY/MM/DD"
                />
                <a-typography-text v-else class="detail-stage-field-value num-font">
                  {{ stage.forecast }}
                </a-typography-text>
              </a-col>

              <a-col :xs="24" :md="8">
                <div class="detail-stage-field-label">实际时间</div>
                <a-date-picker
                  v-if="stage.editable"
                  v-model:value="stage.actual"
                  value-format="YYYY/MM/DD"
                  :placeholder="stage.actualPlaceholder"
                />
                <a-typography-text v-else class="detail-stage-field-value num-font">
                  {{ stage.actual }}
                </a-typography-text>
              </a-col>
            </a-row>
          </a-card>

          <a-button block class="detail-add-stage-btn" :icon="h(PlusOutlined)">
            {{ deliveryBenchmarkConfig.addStageText }}
          </a-button>
        </div>
      </a-col>

      <a-col :xs="24" :xl="12">
        <div class="detail-delivery-section-header">
          <a-space :size="8">
            <FileDoneOutlined class="detail-section-title-icon" />
            <span>{{ deliveryBenchmarkConfig.businessTitle }}</span>
          </a-space>
          <a-tag color="processing">{{ deliveryBenchmarkConfig.businessScore }}</a-tag>
        </div>

        <div class="detail-checkpoint-list">
          <div
            v-for="item in deliveryBenchmarkConfig.checkpointItems"
            :key="item.key"
            :class="['detail-checkpoint-item', `is-${item.type}`]"
          >
            <div class="detail-checkpoint-main">
              <CheckCircleFilled
                v-if="item.checked"
                :class="['detail-checkpoint-check', { 'is-danger': item.type === 'danger', 'is-active': item.type === 'active' }]"
              />
              <span v-else class="detail-checkpoint-empty"></span>

              <div>
                <div :class="['detail-checkpoint-title', `is-${item.type}`]">
                  <span>{{ item.title }}</span>
                  <InfoCircleOutlined
                    v-if="['quota', 'repayment', 'blocked'].includes(item.key)"
                    class="detail-checkpoint-info"
                  />
                </div>
                <div :class="['detail-checkpoint-desc', `is-${item.type}`]">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup>
import { reactive, h } from 'vue'
import {
  CheckCircleFilled,
  DeploymentUnitOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { deliveryBenchmarkConfig } from '@/data/detailPageData'

const deliveryStages = reactive(
  deliveryBenchmarkConfig.deliveryStages.map((stage) => ({ ...stage }))
)
</script>

<style scoped src="./styles/DeliveryBenchmark.css"></style>
