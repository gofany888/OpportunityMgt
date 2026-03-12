<template>
  <a-card :bordered="false" class="mb-4 card-shadow relative group overflow-hidden rounded-[24px]">
    <!-- 头部区域 -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-3">
        <!-- 左侧档案图标 -->
        <a-avatar shape="square" :size="40" class="!bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 !rounded-xl">
          <template #icon><i class="fa-regular fa-file-lines text-lg text-gray-400"></i></template>
        </a-avatar>
        
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[16px] font-bold text-gray-800">{{ record.name }}</span>
            <a-tag :color="getAntTagColor(record.tagType)" class="!rounded-md !border-none !text-[10px] !leading-snug !px-1.5 pt-0.5 pb-0.5 font-bold">
                {{ record.tag }}
            </a-tag>
          </div>
          <div class="text-[12px] text-gray-400 font-medium flex items-center gap-3">
             <span class="text-gray-500">ID: {{ record.id }}</span>
             <span class="w-1 h-1 rounded-full bg-gray-300"></span>
             <span><i class="fa-regular fa-user mr-1 text-[10px]"></i> {{ record.manager }}</span>
             <span class="w-1 h-1 rounded-full bg-gray-300"></span>
             <span>最后更新: {{ record.updateTime }}</span>
          </div>
        </div>
      </div>
      
      <!-- 右侧操作区 -->
      <div class="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <a-button class="!rounded-full border-gray-200 text-gray-600 font-medium text-[13px] flex items-center shadow-sm">
            <template #icon><i class="fa-solid fa-link text-[11px] text-[#1677ff] mr-1"></i></template>
            手动关联EIS
        </a-button>
        <a-button type="primary" class="!rounded-full bg-[#141414] hover:!bg-black font-medium text-[13px]" @click="openDetail">
            详情穿透
        </a-button>
      </div>
    </div>
    
    <a-divider class="!my-4 !border-gray-50" />
    
    <!-- 数据对比区 (5列) -->
    <a-row :gutter="32">
      <!-- 列 1: 商机金额 -->
      <a-col :flex="1">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-6 text-[14px] font-bold text-gray-800">
              <div class="w-1 h-3.5 bg-red-500 rounded-full"></div> 商机金额
          </div>
          
          <div class="flex justify-between items-end mb-4 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">经营推盘</span>
              <a-statistic v-if="metrics.opportunityAmount.management != null" :value="metrics.opportunityAmount.management" :value-style="{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }" class="num-font text-gray-800 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-bold num-font text-gray-800 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="flex justify-between items-end mb-6 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">销服参考</span>
              <a-statistic v-if="metrics.opportunityAmount.sales != null" :value="metrics.opportunityAmount.sales" :value-style="{ fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }" class="text-gray-500 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-medium num-font text-gray-500 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="rounded-xl px-4 py-3 flex justify-between items-center text-[12px] font-bold num-font" :class="getDiffStyle(metrics.opportunityAmount.diffType)">
              <span>对账偏差</span>
              <span class="text-[14px] leading-none">{{ formatDiff(metrics.opportunityAmount.diff) }}</span>
          </div>
        </div>
      </a-col>
      
      <!-- 列 2: 毛利 -->
      <a-col :flex="1" class="relative before:absolute before:left-[-16px] before:top-4 before:bottom-4 before:w-px before:bg-gray-50">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-6 text-[14px] font-bold text-gray-800">
              <div class="w-1 h-3.5 bg-green-500 rounded-full"></div> 毛利
          </div>
          
          <div class="flex justify-between items-end mb-4 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">经营推盘</span>
              <a-statistic v-if="metrics.profit.management != null" :value="metrics.profit.management" :value-style="{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }" class="num-font text-gray-800 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-bold num-font text-gray-800 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="flex justify-between items-end mb-6 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">销服参考</span>
              <a-statistic v-if="metrics.profit.sales != null" :value="metrics.profit.sales" :value-style="{ fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }" class="text-gray-500 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-medium num-font text-gray-500 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="rounded-xl px-4 py-3 flex justify-between items-center text-[12px] font-bold num-font" :class="getDiffStyle(metrics.profit.diffType)">
              <span>对账偏差</span>
              <span class="text-[14px] leading-none">{{ formatDiff(metrics.profit.diff) }}</span>
          </div>
        </div>
      </a-col>
      
      <!-- 列 3: 采购 -->
      <a-col :flex="1" class="relative before:absolute before:left-[-16px] before:top-4 before:bottom-4 before:w-px before:bg-gray-50">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-6 text-[14px] font-bold text-gray-800">
              <div class="w-1 h-3.5 bg-red-500 rounded-full"></div> 采购
          </div>
          
          <div class="flex justify-between items-end mb-4 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">经营推盘</span>
              <a-statistic v-if="metrics.procurement.management != null" :value="metrics.procurement.management" :value-style="{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }" class="num-font text-gray-800 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-bold num-font text-gray-800 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="flex justify-between items-end mb-6 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">销服参考</span>
              <a-statistic v-if="metrics.procurement.sales != null" :value="metrics.procurement.sales" :value-style="{ fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }" class="text-gray-500 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-medium num-font text-gray-500 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="rounded-xl px-4 py-3 flex justify-between items-center text-[12px] font-bold num-font" :class="getDiffStyle(metrics.procurement.diffType)">
              <span>对账偏差</span>
              <span class="text-[14px] leading-none">{{ formatDiff(metrics.procurement.diff) }}</span>
          </div>
        </div>
      </a-col>
      
      <!-- 列 4: 开票额 -->
      <a-col :flex="1" class="relative before:absolute before:left-[-16px] before:top-4 before:bottom-4 before:w-px before:bg-gray-50">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-6 text-[14px] font-bold text-gray-800">
              <div class="w-1 h-3.5 bg-green-500 rounded-full"></div> 开票额
          </div>
          
          <div class="flex justify-between items-end mb-4 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">经营推盘</span>
              <a-statistic v-if="metrics.invoice.management != null" :value="metrics.invoice.management" :value-style="{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }" class="num-font text-gray-800 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-bold num-font text-gray-800 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="flex justify-between items-end mb-6 h-6">
              <span class="text-[11px] text-gray-400 font-medium shrink-0">销服参考</span>
              <a-statistic v-if="metrics.invoice.sales != null" :value="metrics.invoice.sales" :value-style="{ fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }" class="text-gray-500 text-right w-full shrink-1 overflow-hidden" suffix="万" />
              <span v-else class="text-[15px] font-medium num-font text-gray-500 text-right w-full shrink-1">——</span>
          </div>
          
          <div class="rounded-xl px-4 py-3 flex justify-between items-center text-[12px] font-bold num-font" :class="getDiffStyle(metrics.invoice.diffType)">
              <span :class="metrics.invoice.diffType === 'normal' ? 'opacity-30' : ''">对账偏差</span>
              <span class="text-[14px] leading-none">{{ metrics.invoice.diff === 0 ? '0' : formatDiff(metrics.invoice.diff) }}</span>
          </div>
        </div>
      </a-col>
      
      <!-- 列 5: 父环节对标 -->
      <a-col :flex="1" class="relative before:absolute before:left-[-16px] before:top-4 before:bottom-4 before:w-px before:bg-gray-50">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-6 text-[14px] font-bold text-gray-800">
              <div class="w-1 h-3.5 bg-green-500 rounded-full"></div> 父环节对标
          </div>
          
          <div class="flex justify-between items-end mb-4 h-6">
              <span class="text-[11px] text-gray-400 font-medium">经营推盘</span>
              <span class="text-[14px] font-bold text-gray-800 italic pr-1">{{ metrics.parentStage.management || '——' }}</span>
          </div>
          
          <div class="flex justify-between items-end mb-6 h-6">
              <span class="text-[11px] text-gray-400 font-medium">销服参考</span>
              <span class="text-[14px] font-medium text-gray-500 italic pr-1">{{ metrics.parentStage.sales || '——' }}</span>
          </div>
          
          <div class="rounded-xl px-4 py-3 flex justify-between items-center text-[12px] font-bold" :class="getDiffStyle(metrics.parentStage.diffType)">
              <span :class="metrics.parentStage.diffType === 'normal' ? 'opacity-30' : ''">对账偏差</span>
              <span class="text-[13px] leading-none">{{ metrics.parentStage.diff }}</span>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
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
            return 'bg-[#fff2f0] text-[#ff4d4f]'
        case 'success':
            return 'bg-[#e6ffed] text-[#389e0d]' // softer green background
        case 'normal':
        default:
            return 'bg-gray-50 text-gray-300' // Neutral placeholder text for zero diff
    }
}

// 格式化偏差，正数加+
const formatDiff = (val) => {
    if (val > 0) return `+${val}`
    return val
}
</script>

<style scoped src="./styles/EISDiscrepancyCard.css"></style>
