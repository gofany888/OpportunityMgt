<template>
<!-- 1. 进度条容器 (Stepper) - 商机全生命周期追踪 -->
<div class="bg-white rounded-3xl p-8 mb-5 card-shadow border border-gray-100 relative">
    <div class="flex justify-between items-center mb-10">
        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
            <i class="fa-solid fa-chart-line text-[#2f54eb]"></i> 商机全生命周期追踪
        </h3>
        <div
            class="bg-[#f0f5ff] text-[#2f54eb] text-[12px] px-3 py-1 rounded-full border border-[#d6e4ff]">
            当前子环节：候选人公示
        </div>
    </div>

    <div class="relative flex items-center justify-between px-10">
        <!-- 进度连线 -->
        <div class="absolute top-[18px] left-[60px] right-[60px] h-[3px] bg-gray-100 z-0"></div>
        <div class="absolute top-[18px] left-[60px] w-[50%] h-[3px] bg-[#2f54eb] z-0"></div>

        <!-- 节点 1: 商机发现 (完成) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#52c41a] text-white flex items-center justify-center text-sm shadow-sm">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="text-[14px] font-medium text-gray-900">商机发现</div>
        </div>

        <!-- 节点 2: 商机确立 (完成) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#52c41a] text-white flex items-center justify-center text-sm shadow-sm">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="text-[14px] font-medium text-gray-900">商机确立</div>
        </div>

        <!-- 节点 3: 立项环节 (完成) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#52c41a] text-white flex items-center justify-center text-sm shadow-sm">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="text-[14px] font-medium text-gray-900">立项环节</div>
        </div>

        <!-- 节点 4: 采购环节 (激活) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#2f54eb] text-white flex items-center justify-center text-sm font-bold ring-[6px] ring-[#f0f5ff] border-2 border-[#2f54eb]">
                04
            </div>
            <div class="text-[14px] font-bold text-[#2f54eb]">采购环节</div>
        </div>

        <!-- 节点 5: 合同合签 (未开始) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#f5f5f5] text-gray-400 flex items-center justify-center text-sm border border-gray-200">
                05
            </div>
            <div class="text-[14px] font-medium text-gray-500">合同合签</div>
        </div>

        <!-- 节点 6: 公司立项 (未开始) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#f5f5f5] text-gray-400 flex items-center justify-center text-sm border border-gray-200">
                06
            </div>
            <div class="text-[14px] font-medium text-gray-500">公司立项</div>
        </div>

        <!-- 节点 7: 商机转化 (未开始) -->
        <div class="relative z-10 flex flex-col items-center gap-3">
            <div
                class="w-9 h-9 rounded-full bg-[#f5f5f5] text-gray-400 flex items-center justify-center text-sm border border-gray-200">
                07
            </div>
            <div class="text-[14px] font-medium text-gray-500">商机转化</div>
        </div>
    </div>
</div>


</template>

<script setup>
</script>
