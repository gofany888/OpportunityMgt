<template>
<!-- 5.3 Detailed Finance Matrix Card -->
<div class="bg-white rounded-2xl p-6 mb-5 shadow-sm">
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2f54eb] rounded-full"></div>
            <h4 class="text-[14px] font-bold text-gray-800">详细财务对账核算</h4>
            <span class="text-[12px] text-gray-400 font-normal ml-1">(万元，不含税)</span>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-[12px] text-gray-500">税率</span>
            <div
                class="border border-gray-200 rounded px-2 py-1 text-[12px] text-gray-700 flex items-center gap-1 cursor-pointer bg-gray-50/50">
                6% <i class="fa-solid fa-chevron-down text-[10px] text-gray-400 ml-1"></i>
            </div>
        </div>
    </div>

    <div class="overflow-x-auto no-scrollbar">
        <div class="grid grid-cols-5 gap-4 min-w-[800px]">
            <!-- Block 1: 往年收入实结 -->
        <div class="border border-gray-100 rounded-xl p-5 bg-[#fafafa]">
            <div class="text-[12px] text-gray-400 mb-6">往年收入实结</div>

            <div class="mb-5">
                <div class="text-[11px] text-gray-400 mb-1">收入小计</div>
                <div class="text-[18px] text-gray-300 font-medium num-font">450.00</div>
            </div>

            <div>
                <div class="text-[11px] text-gray-400 mb-1">毛利小计</div>
                <div class="text-[18px] text-gray-300 font-medium num-font">135.00</div>
            </div>
        </div>

        <!-- Block 2: 今年收入实结 (Active) -->
        <div
            class="border border-[#adc6ff] rounded-xl p-5 bg-white shadow-[0_2px_10px_rgba(47,84,235,0.06)] ring-1 ring-[#f0f5ff]">
            <div class="text-[12px] text-[#2f54eb] font-bold mb-6">今年收入实结</div>

            <div class="mb-5">
                <div class="text-[11px] text-gray-400 mb-1">收入小计</div>
                <div class="text-[18px] text-[#2f54eb] font-bold num-font">80.00</div>
            </div>

            <div>
                <div class="text-[11px] text-gray-400 mb-1">毛利小计</div>
                <div class="text-[18px] text-[#2f54eb] font-bold num-font">24.00</div>
            </div>
        </div>

        <!-- Block 3: 今年尚未收入预计 -->
        <div class="border border-gray-100 rounded-xl p-5 bg-white shadow-sm">
            <div class="text-[12px] text-gray-600 font-bold mb-6">今年尚未收入预计</div>

            <div class="mb-5">
                <div class="text-[11px] text-gray-400 mb-1">收入小计</div>
                <div class="text-[18px] text-gray-800 font-bold num-font">670.00</div>
            </div>

            <div>
                <div class="text-[11px] text-gray-400 mb-1">毛利小计</div>
                <div class="text-[18px] text-gray-800 font-bold num-font">201.00</div>
            </div>
        </div>

        <!-- Block 4: 今年累计收入预计 (Dark) -->
        <div
            class="bg-[#1f2937] border border-gray-800 rounded-xl p-5 shadow-md text-white">
            <div class="text-[12px] text-gray-300 mb-6">今年累计收入预计</div>

            <div class="mb-5">
                <div class="text-[11px] text-gray-400 mb-1">收入小计</div>
                <div class="text-[18px] font-bold num-font">¥750.00</div>
            </div>

            <div>
                <div class="text-[11px] text-gray-400 mb-1">毛利小计</div>
                <div class="text-[18px] font-bold num-font">¥225.00</div>
            </div>
        </div>

        <!-- Block 5: 子项累计收入预计 (Blue Gradient) -->
        <div
            class="bg-gradient-to-br from-[#1677ff] to-[#0958d9] rounded-xl p-5 shadow-md text-white">
            <div class="text-[12px] text-blue-100 mb-6">子项累计收入预计</div>

            <div class="mb-5">
                <div class="text-[11px] text-blue-200 mb-1">收入小计</div>
                <div class="text-[18px] font-bold num-font">¥1,200.00</div>
            </div>

            <div>
                <div class="text-[11px] text-blue-200 mb-1">毛利小计</div>
                <div class="text-[18px] font-bold num-font">¥360.00</div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script setup>
</script>
