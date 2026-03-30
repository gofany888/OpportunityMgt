<template>
  <div class="eis-audit-list-item relative group overflow-hidden border-b border-gray-200 last:border-b-0 px-8 py-6">
    <!-- 头部区域 -->
    <div class="flex items-start gap-4 mb-3 mt-1">
      <div class="proj-icon-box flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" class="proj-icon-box__svg">
          <path
            d="M8.5 7.5V6.5C8.5 5.39543 9.39543 4.5 10.5 4.5H13.5C14.6046 4.5 15.5 5.39543 15.5 6.5V7.5"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <rect
            x="5"
            y="7.5"
            width="14"
            height="11"
            rx="2.8"
            stroke="currentColor"
            stroke-width="1.9"
          />
          <path
            d="M12 7.8V18.2"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
          />
        </svg>
      </div>
      
      <div class="flex-1 pt-0.5">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="eis-audit-list-item__title text-[16px] font-semibold text-[#1f2937] group-hover:text-[#1677ff] group-hover:underline cursor-pointer tracking-tight transition-colors">{{ record.name }}</span>
          <a-tag :color="getAntTagColor(record.tagType)" class="!rounded-md !border-none !text-[11px] !leading-snug !px-1.5 pt-0.5 pb-0.5 font-semibold ml-1.5">
              {{ record.tag }}
          </a-tag>
        </div>
        
        <div class="eis-audit-list-item__meta text-[12px] text-gray-400 font-medium flex items-center gap-4 opacity-70">
           <span>编码: {{ record.id }}</span>
           <span>负责人: {{ record.manager }}</span>
           <span>最后更新: {{ record.updateTime }}</span>
        </div>
      </div>
    </div>

    <!-- 数据对比区 -->
    <div class="mt-2">
    


      <!-- 矩阵行：经营推盘 -->
      <a-row :gutter="48" class="eis-audit-list-item__metric-row py-1.5 border-b border-gray-100/60 items-center mb-1.5 hover:bg-blue-50/60 transition-colors rounded-xl -mx-3 px-3 group/row">
        <a-col :span="2" class="text-[14px] text-gray-400 font-medium tracking-tight">经营推盘</a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.opportunityAmount.management != null" :value="metrics.opportunityAmount.management" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="num-font text-gray-600 !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.profit.management != null" :value="metrics.profit.management" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="num-font text-gray-600 !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.procurement.management != null" :value="metrics.procurement.management" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="num-font text-gray-600 !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.invoice.management != null" :value="metrics.invoice.management" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="num-font text-gray-600 !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="6" class="text-center">
            <span class="text-[14px] font-normal text-gray-600">{{ metrics.parentStage.management || '——' }}</span>
        </a-col>
      </a-row>

      <!-- 矩阵行：销售参考 -->
      <a-row :gutter="48" class="eis-audit-list-item__metric-row py-1.5 border-b border-gray-100/60 items-center mb-1.5 hover:bg-blue-50/60 transition-colors rounded-xl -mx-3 px-3 group/row">
        <a-col :span="2" class="text-[14px] text-gray-400 font-medium tracking-tight">销售参考</a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.opportunityAmount.sales != null" :value="metrics.opportunityAmount.sales" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="text-gray-600 num-font !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.profit.sales != null" :value="metrics.profit.sales" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="text-gray-600 num-font !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.procurement.sales != null" :value="metrics.procurement.sales" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="text-gray-600 num-font !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="4" class="text-right">
            <a-statistic v-if="metrics.invoice.sales != null" :value="metrics.invoice.sales" :value-style="{ fontSize: '16px', fontWeight: 400, color: '#111827' }" class="text-gray-600 num-font !flex !justify-end" />
            <span v-else class="text-[16px] font-normal num-font text-gray-400">——</span>
        </a-col>
        <a-col :span="6" class="text-center">
            <span class="text-[14px] font-normal text-gray-600">{{ metrics.parentStage.sales || '——' }}</span>
        </a-col>
      </a-row>

      <!-- 矩阵行：对账偏差 -->
      <a-row :gutter="48" class="eis-audit-list-item__metric-row is-diff py-1.5 items-center mb-1 last:mb-0 hover:bg-blue-50/60 transition-colors rounded-xl -mx-3 px-3 group/row">
        <a-col :span="2" class="eis-audit-list-item__diff-label">对账偏差</a-col>
        <a-col :span="4" class="text-right">
            <div class="num-font font-semibold flex items-center justify-end" :class="getDiffStyle(metrics.opportunityAmount.diffType)">
                <span class="eis-audit-list-item__diff-sign">{{ getDiffSign(metrics.opportunityAmount.diff) }}</span>
                <span class="text-[16px]">{{ formatDiffValue(metrics.opportunityAmount.diff) }}</span>
            </div>
        </a-col>
        <a-col :span="4" class="text-right">
            <div class="num-font font-semibold flex items-center justify-end" :class="getDiffStyle(metrics.profit.diffType)">
                <span class="eis-audit-list-item__diff-sign">{{ getDiffSign(metrics.profit.diff) }}</span>
                <span class="text-[16px]">{{ formatDiffValue(metrics.profit.diff) }}</span>
            </div>
        </a-col>
        <a-col :span="4" class="text-right">
            <div class="num-font font-semibold flex items-center justify-end" :class="getDiffStyle(metrics.procurement.diffType)">
                <span class="eis-audit-list-item__diff-sign">{{ getDiffSign(metrics.procurement.diff) }}</span>
                <span class="text-[16px]">{{ formatDiffValue(metrics.procurement.diff) }}</span>
            </div>
        </a-col>
        <a-col :span="4" class="text-right">
            <div class="num-font font-semibold flex items-center justify-end" :class="getDiffStyle(metrics.invoice.diffType)">
                <span class="eis-audit-list-item__diff-sign">{{ getDiffSign(metrics.invoice.diff) }}</span>
                <span class="text-[16px] leading-none">{{ formatDiffValue(metrics.invoice.diff) }}</span>
            </div>
        </a-col>
        <a-col :span="6" class="text-center">
            <div class="font-semibold" :class="getDiffStyle(metrics.parentStage.diffType)">
                <span class="text-[16px] leading-none">{{ metrics.parentStage.diff }}</span>
            </div>
        </a-col>
      </a-row>
    </div>

    <!-- 悬浮操作按钮 -->
    <div class="absolute right-8 top-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <!-- 情况 1 & 3: 自建商机 或 失联项 -->
        <template v-if="record.tag === '自建商机' || record.tag === '失联项'">
          <a-button class="!rounded-full border-gray-200 text-gray-600 font-medium text-[13px] flex items-center shadow-sm h-8">
              <template #icon><i class="fa-solid fa-link text-[10px] text-[#1677ff] mr-1"></i></template>
              关联 EIS
          </a-button>
          <a-button type="primary" class="!rounded-full bg-[#141414] hover:!bg-black font-medium text-[13px] h-8" @click="openDetail">
              详情
          </a-button>
        </template>

        <!-- 情况 2: 孤儿项 -->
        <template v-else-if="record.tag === '孤儿项'">
          <a-button class="!rounded-full border-gray-200 text-gray-600 font-medium text-[13px] flex items-center shadow-sm h-8">
              <template #icon><i class="fa-solid fa-plus text-[10px] text-[#1677ff] mr-1"></i></template>
              纳入台账
          </a-button>
          <a-button class="!rounded-full border-gray-200 text-gray-600 font-medium text-[13px] flex items-center shadow-sm h-8">
              <template #icon><i class="fa-solid fa-link text-[10px] text-[#1677ff] mr-1"></i></template>
              关联台账
          </a-button>
        </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    record: {
        type: Object,
        required: true
    }
})

const metrics = computed(() => props.record.metrics)

// 详情穿透：在新 Tab 中打开详情页
const openDetail = () => {
    window.open(`/detail?id=${props.record.id}`, '_blank')
}

// 头部标签基础色
const getAntTagColor = (type) => {
    const map = {
        'warning': 'orange',
        'success': '#52c41a', // standard ant success
        'danger': 'red'
    }
    return map[type] || 'default'
}

// “对账偏差”底部块的样式
const getDiffStyle = (type) => {
    switch (type) {
        case 'danger':
            return 'text-[#ff4d4f]'
        case 'success':
            return 'text-[#389e0d]' // standard success green
        case 'normal':
        default:
            return 'text-gray-300' // Neutral placeholder text for zero diff
    }
}

const getDiffSign = (val) => {
    if (val > 0) return '+'
    if (val < 0) return '-'
    return ''
}

const formatDiffValue = (val) => {
    if (val === 0) return '0'
    return Math.abs(val)
}
</script>

<style scoped src="./styles/EISDiscrepancyCard.css"></style>
