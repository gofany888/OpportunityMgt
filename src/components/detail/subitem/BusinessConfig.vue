<template>
  <a-row :gutter="[20, 20]" class="mb-5">
    <a-col :xs="24" :xl="12">
      <a-card :bordered="false" class="detail-business-card">
        <template #title>
          <div class="detail-business-title">
            <AppstoreOutlined class="detail-business-title-icon" />
            <span>{{ businessConfigData.leftTitle }}</span>
          </div>
        </template>

        <a-form layout="vertical">
          <a-row :gutter="[16, 0]">
            <a-col
              v-for="field in businessConfigData.leftFields"
              :key="field.key"
              :xs="24"
              :md="field.key === 'rollingClue' ? 24 : 12"
            >
              <a-form-item :label="field.label">
                <a-select
                  v-model:value="leftForm[field.key]"
                  :options="field.options.map((option) => ({ label: option, value: option }))"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>

        <a-typography-text type="secondary" class="detail-business-hint">
          {{ businessConfigData.hint }}
        </a-typography-text>
      </a-card>
    </a-col>

    <a-col :xs="24" :xl="12">
      <a-card :bordered="false" class="detail-business-card">
        <template #title>
          <div class="detail-business-title">
            <ApartmentOutlined class="detail-business-title-icon is-green" />
            <span>{{ businessConfigData.rightTitle }}</span>
          </div>
        </template>

        <a-form layout="vertical">
          <a-form-item
            v-for="field in businessConfigData.rightFields"
            :key="field.key"
            :label="field.label"
          >
            <a-select
              v-model:value="rightForm[field.key]"
              :options="field.options.map((option) => ({ label: option, value: option }))"
            />
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive } from 'vue'
import { ApartmentOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
import { businessConfigData } from '@/data/detailPageData'

const leftForm = reactive(
  businessConfigData.leftFields.reduce((acc, field) => {
    acc[field.key] = field.value
    return acc
  }, {})
)

const rightForm = reactive(
  businessConfigData.rightFields.reduce((acc, field) => {
    acc[field.key] = field.value
    return acc
  }, {})
)
</script>

<style scoped src="./styles/BusinessConfig.css"></style>
