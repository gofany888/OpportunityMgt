<template>
<!-- 顶部导航栏 (Header) - 横跨全屏 -->
<header class="h-16 flex justify-between items-center px-6 border-b border-gray-100 bg-white z-20">
    <div class="flex items-center gap-4">
        <div class="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            <i class="fa-solid fa-arrow-left text-lg"></i>
        </div>
        <div class="flex items-center gap-3">
            <span
                class="bg-[#262626] text-white text-[11px] px-2.5 py-1 rounded-md font-medium leading-none">父商机预览</span>
            <h1 class="text-lg font-bold text-gray-900">某省电力数字化转型二期总集项目</h1>
            <div class="text-sm text-gray-400 flex items-center gap-1.5 ml-2">
                <span>总负责人：张销售</span>
                <i class="fa-solid fa-pencil text-[11px] text-blue-500 cursor-pointer hover:text-blue-600"></i>
            </div>
        </div>
    </div>
    <div>
        <button
            class="px-5 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 transition-colors shadow-sm font-medium">
            <i class="fa-solid fa-floppy-disk"></i> 保存商务变更
        </button>
    </div>
</header>
</template>

<script setup>
</script>
