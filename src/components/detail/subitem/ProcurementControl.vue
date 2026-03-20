<template>
  <a-card :bordered="false" class="detail-procurement-card">
    <template #title>
      <div class="detail-procurement-title">
        <TeamOutlined class="detail-business-title-icon" />
        <span>{{ procurementControlData.title }}</span>
      </div>
    </template>

    <a-form layout="vertical">
      <a-row :gutter="[24, 0]">
        <a-col :xs="24" :xl="12">
          <a-form-item :label="procurementControlData.fields[0].label">
            <a-input v-model:value="form.purchaseAmount" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="12">
          <a-form-item :label="procurementControlData.fields[1].label">
            <a-input v-model:value="form.supplier" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[24, 0]">
        <a-col :xs="24" :xl="12">
          <a-form-item :label="procurementControlData.fields[2].label">
            <a-input v-model:value="form.humanPurchaseAmount" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :xl="12">
          <a-row :gutter="[16, 0]">
            <a-col :xs="24" :md="12">
              <a-form-item :label="procurementControlData.fields[3].label">
                <a-select
                  v-model:value="form.purchased"
                  :options="procurementControlData.fields[3].options.map((option) => ({ label: option, value: option }))"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-form-item :label="procurementControlData.fields[4].label">
                <a-date-picker
                  v-model:value="form.purchaseDate"
                  value-format="YYYY/MM/DD"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script setup>
import { reactive } from 'vue'
import { TeamOutlined } from '@ant-design/icons-vue'
import { procurementControlData } from '@/data/detailPageData'

const form = reactive({
  purchaseAmount: procurementControlData.fields[0].value,
  supplier: procurementControlData.fields[1].value,
  humanPurchaseAmount: procurementControlData.fields[2].value,
  purchased: procurementControlData.fields[3].value,
  purchaseDate: procurementControlData.fields[4].value,
})
</script>

<style scoped src="./styles/ProcurementControl.css"></style>
