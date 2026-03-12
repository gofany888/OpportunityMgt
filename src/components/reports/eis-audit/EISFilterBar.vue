<template>
  <div class="mb-4 rounded-[16px] border border-gray-200 bg-white shadow-sm overflow-hidden">
    <!-- 顶部：搜索和状态过滤 -->
    <div class="flex items-center justify-between p-4 border-b border-gray-100">
      <div class="flex items-center gap-6 flex-1">
        <!-- 全局搜索 -->
        <a-input 
          v-model:value="searchQuery" 
          placeholder="全局搜索商机名、EIS ID 或 负责人..." 
          class="!rounded-full !bg-gray-50 !border-transparent hover:!border-blue-400 focus:!border-blue-500 focus:!bg-white !px-4 !py-1.5 w-[360px]"
        >
          <template #prefix>
            <search-outlined class="text-gray-400 mr-2 text-[14px]" />
          </template>
        </a-input>

        <a-divider type="vertical" class="!h-4 !bg-gray-200" />

        <!-- 状态过滤 -->
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-gray-400 font-medium italic">对账状态过滤:</span>
          <a-radio-group v-model:value="statusFilter" option-type="button" button-style="solid" class="custom-radio-group">
            <a-radio-button value="all">全部项目</a-radio-button>
            <a-radio-button value="lost">失联项</a-radio-button>
            <a-radio-button value="orphan">孤儿项</a-radio-button>
          </a-radio-group>
        </div>
      </div>

      <!-- 右侧漏斗图标：鼠标悬浮展示详细过滤项 -->
      <a-popover v-model:open="popoverVisible" trigger="click" placement="bottomRight" overlayClassName="filter-popover">
        <template #content>
          <div class="flex flex-col gap-4 w-[280px] p-2">
            <div>
              <div class="text-[12px] text-gray-500 mb-2 font-medium">按部门过滤</div>
              <a-select v-model:value="tempDept" placeholder="请选择部门" class="w-full text-[13px]" allowClear :getPopupContainer="triggerNode => triggerNode.parentNode">
                <a-select-option value="云业务交付部">云业务交付部</a-select-option>
                <a-select-option value="金融业务部">金融业务部</a-select-option>
              </a-select>
            </div>
            <div>
              <div class="text-[12px] text-gray-500 mb-2 font-medium">按金额过滤</div>
              <a-select v-model:value="tempAmount" placeholder="请选择金额范围" class="w-full text-[13px]" allowClear :getPopupContainer="triggerNode => triggerNode.parentNode">
                <a-select-option value="> 500万">&gt; 500万</a-select-option>
                <a-select-option value="> 100万">&gt; 100万</a-select-option>
              </a-select>
            </div>
            <div class="flex justify-end gap-2 mt-2">
              <a-button size="small" @click="popoverVisible = false">取消</a-button>
              <a-button type="primary" size="small" @click="applyFilters">确定</a-button>
            </div>
          </div>
        </template>
        <a-button type="text" class="text-gray-400 hover:text-blue-500 !flex !items-center !justify-center w-8 h-8 !p-0" :class="{ 'text-blue-500 bg-blue-50': popoverVisible || hasFilters }">
          <filter-outlined class="text-lg" />
        </a-button>
      </a-popover>
    </div>

    <!-- 底部：已选条件 (有条件时才显示) -->
    <div class="p-4 flex items-center justify-between" v-if="hasFilters">
      <div class="flex flex-wrap items-center gap-3 w-full">
        <span class="text-[12px] text-gray-400 font-medium italic">当前筛选口径:</span>
        
        <a-tag v-if="activeDept" closable @close="activeDept = null; checkFilters()" class="!rounded-full !border-none !text-[12px] px-3 py-1 bg-[#4068f6] text-white flex items-center font-bold tracking-wide shadow-sm">
            部门: {{ activeDept }}
            <template #closeIcon><close-outlined class="text-white hover:text-gray-200 opacity-80 text-[10px] ml-1.5" /></template>
        </a-tag>
        
        <a-tag v-if="activeAmount" closable @close="activeAmount = null; checkFilters()" class="!rounded-full !border-none !text-[12px] px-3 py-1 bg-[#4068f6] text-white flex items-center font-bold tracking-wide shadow-sm">
            金额: {{ activeAmount }}
            <template #closeIcon><close-outlined class="text-white hover:text-gray-200 opacity-80 text-[10px] ml-1.5" /></template>
        </a-tag>

        <!-- 重置全部过滤 (红色斜体) -->
        <a-button type="link" class="!text-[12px] !p-0 ml-2 shadow-none border-none h-auto text-gray-400 hover:text-[#1677ff]" @click="resetAll">
            <span>重置全部过滤</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchOutlined, FilterOutlined, CloseOutlined } from '@ant-design/icons-vue'

const searchQuery = ref('')
const statusFilter = ref('all')
const popoverVisible = ref(false)

// 实际生效的过滤条件 (默认空，即不显示底部区域)
const activeDept = ref(null)
const activeAmount = ref(null)

// 气泡卡片中临时选择的值 (方便取消操作时不污染已生效数据)
const tempDept = ref('云业务交付部')
const tempAmount = ref('> 500万')

const hasFilters = ref(false) // 默认不展示

// 应用过滤条件
const applyFilters = () => {
  activeDept.value = tempDept.value
  activeAmount.value = tempAmount.value
  popoverVisible.value = false
  checkFilters()
}

// 检查是否还有过滤项，如果没有则隐藏底部区域
const checkFilters = () => {
  hasFilters.value = !!(activeDept.value || activeAmount.value)
}

// 重置全部
const resetAll = () => {
  activeDept.value = null
  activeAmount.value = null
  tempDept.value = null
  tempAmount.value = null
  hasFilters.value = false
}
</script>

<style scoped src="./styles/EISFilterBar.css"></style>
