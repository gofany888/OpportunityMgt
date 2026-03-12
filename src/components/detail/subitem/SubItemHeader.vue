<template>
<!-- 5. 子项 - 软件开发分项 Header Card -->
<div class="bg-white rounded-2xl p-6 mb-5 shadow-sm">
    <!-- 标题行 -->
    <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <i class="fa-solid fa-code text-sm"></i>
            </div>
            <h3 class="text-[15px] font-bold text-gray-800">子项 - 软件开发分项</h3>
        </div>
        <i 
            @click="$emit('toggle')"
            :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
            class="fa-solid text-gray-400 text-sm cursor-pointer hover:text-gray-600 transition-colors"
        ></i>
    </div>

    <!-- 信息行 -->
    <div class="grid grid-cols-3 gap-8">
        <div>
            <div class="text-[12px] text-gray-400 mb-1">子商机编码</div>
            <div class="text-[14px] text-gray-800 font-bold">S-01</div>
        </div>
        <div>
            <div class="text-[12px] text-gray-400 mb-1">项目经理 (PM)</div>
            <div class="text-[14px] text-gray-800 font-bold">李经理</div>
        </div>
        <div>
            <div class="text-[12px] text-gray-400 mb-1">子项规模</div>
            <div class="text-[14px] text-[#2f54eb] font-bold">¥1,200.00 万</div>
        </div>
    </div>
</div>
</template>

<script setup>
defineProps({
  isExpanded: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle'])
</script>
