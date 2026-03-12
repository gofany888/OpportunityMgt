<template>
<!-- 5.5 Dual-Column Config Cards -->
<div class="grid grid-cols-2 gap-5 mb-5">
    <!-- Left: 经营性质与滚动分类 -->
    <div
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col h-full">
        <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold text-[14px]">
            <i class="fa-solid fa-shapes text-[#2f54eb]"></i> 经营性质与滚动分类
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-[11px] text-gray-500 mb-1.5">项目分类</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>产品能力</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-3 top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>
            <div>
                <label class="block text-[11px] text-gray-500 mb-1.5">项目类型</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>项目型</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-3 top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>
        </div>

        <div class="mb-4">
            <label class="block text-[11px] text-gray-500 mb-1.5">项目滚动线索</label>
            <div class="relative">
                <select
                    class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                    <option>延续项目</option>
                </select>
                <i
                    class="fa-solid fa-angle-down absolute right-3 top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
            </div>
        </div>

        <div class="text-[11px] text-gray-400 mt-auto pt-2">
            提示：延期项目在测算时将直接产生收入的延续单元。
        </div>
    </div>

    <!-- Right: 细分产品画像 -->
    <div
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col h-full">
        <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold text-[14px]">
            <i class="fa-solid fa-border-all text-[#52c41a]"></i> 细分产品画像
        </div>

        <div class="space-y-4">
            <div>
                <label class="block text-[11px] text-gray-500 mb-1.5">业务营销领域</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>系统集成</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-3 top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>

            <div>
                <label class="block text-[11px] text-gray-500 mb-1.5">产品大类</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white pl-3 w-[60%] focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>产研探索</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-[45%] top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>

            <div class="pb-2">
                <label class="block text-[11px] text-gray-500 mb-1.5">产品细类</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>数字化底座</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-3 top-3.5 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>
        </div>
    </div>
</div>


</template>

<script setup>
</script>
