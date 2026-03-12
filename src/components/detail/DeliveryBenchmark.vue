<template>
<!-- 4. 项目交付进度与商务对标控点 -->
<div class="bg-white rounded-3xl p-6 card-shadow border border-gray-50 mt-6 mb-6">
    <div class="flex items-center gap-3 mb-8">
        <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <i class="fa-solid fa-compass-drafting text-[#2f54eb] text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800">项目交付进度与商务对标控点</h3>
    </div>

    <div class="grid grid-cols-2 gap-12">
        <!-- Left Column: 交付里程碑管理 -->
        <div class="space-y-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-gray-700 font-bold">
                    <i class="fa-solid fa-chart-line text-[#2f54eb]"></i>
                    <span>交付里程碑管理</span>
                </div>
                <div
                    class="bg-[#f0f5ff] text-[#2f54eb] text-[12px] px-3 py-1 rounded-full font-medium">
                    交付系数: 0.85</div>
            </div>

            <!-- 首付阶段 -->
            <div class="border border-gray-100 rounded-2xl p-6 bg-gray-50/20">
                <span
                    class="bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded-md font-bold mb-4 inline-block">首付阶段</span>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">阶段名称</div>
                        <div class="text-[15px] text-gray-800 font-bold">首付款申请</div>
                    </div>
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">预测时间</div>
                        <div class="text-[15px] text-gray-800 font-medium">2026-04-20</div>
                    </div>
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">实际时间</div>
                        <div class="text-[15px] text-gray-800 font-medium">2026-04-22</div>
                    </div>
                </div>
            </div>

            <!-- 履约阶段 1 -->
            <div
                class="border border-[#adc6ff] rounded-2xl p-6 bg-white shadow-sm ring-1 ring-[#f0f5ff]">
                <span
                    class="bg-[#2f54eb] text-white text-[10px] px-2 py-0.5 rounded-md font-bold mb-4 inline-block">履约阶段
                    1</span>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">阶段名称</div>
                        <input type="text" value="系统首版交付"
                            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#2f54eb] outline-none">
                    </div>
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">预测时间</div>
                        <div class="relative">
                            <input type="text" value="2026/06/15"
                                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#2f54eb] outline-none">
                            <i
                                class="fa-regular fa-calendar absolute right-3 top-2.5 text-gray-300"></i>
                        </div>
                    </div>
                    <div>
                        <div class="text-[12px] text-gray-400 mb-2">实际时间</div>
                        <div class="relative">
                            <input type="text" placeholder="年 / 月 / 日"
                                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#2f54eb] outline-none">
                            <i
                                class="fa-regular fa-calendar absolute right-3 top-2.5 text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add Button -->
            <button
                class="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <i class="fa-solid fa-plus text-sm"></i>
                <span class="text-sm">添加履约阶段</span>
            </button>
        </div>

        <!-- Right Column: 商务进度控点 -->
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 text-gray-700 font-bold">
                    <i class="fa-solid fa-clipboard-check text-[#2f54eb]"></i>
                    <span>商务进度控点</span>
                </div>
                <div
                    class="bg-[#f0f5ff] text-[#2f54eb] text-[12px] px-3 py-1 rounded-full font-medium">
                    商务系数: 0.55</div>
            </div>

            <!-- List Items -->
            <div class="space-y-2.5">
                <!-- Item 1 -->
                <div
                    class="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-all group">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-5 h-5 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        </div>
                        <div>
                            <div
                                class="text-[14px] text-gray-700 font-bold flex items-center gap-1.5">
                                无列账额度 <i
                                    class="fa-solid fa-circle-info text-gray-300 text-[10px]"></i>
                            </div>
                            <div class="text-[11px] text-gray-400">风险项: 对应系数 0.5</div>
                        </div>
                    </div>
                </div>

                <!-- Item 2 -->
                <div
                    class="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-all">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-5 h-5 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        </div>
                        <div>
                            <div
                                class="text-[14px] text-gray-700 font-bold flex items-center gap-1.5">
                                前项无回款 <i
                                    class="fa-solid fa-circle-info text-gray-300 text-[10px]"></i>
                            </div>
                            <div class="text-[11px] text-gray-400">风险项: 对应系数 0.5</div>
                        </div>
                    </div>
                </div>

                <!-- Item 3: Warning -->
                <div
                    class="flex items-center justify-between p-4 border border-red-100 bg-[#fff2f0] rounded-2xl">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-circle-check text-red-500 text-lg"></i>
                        <div>
                            <div
                                class="text-[14px] text-red-500 font-bold flex items-center gap-1.5">
                                无法回款 <i
                                    class="fa-solid fa-circle-info text-red-300 text-[10px]"></i>
                            </div>
                            <div class="text-[11px] text-red-400/80">风险项: 直接客户 / 直接业外 (0.5)</div>
                        </div>
                    </div>
                </div>

                <!-- Item 4 -->
                <div
                    class="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-all">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-5 h-5 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        </div>
                        <div>
                            <div
                                class="text-[14px] text-gray-700 font-bold flex items-center gap-1.5">
                                进度确认
                            </div>
                            <div class="text-[11px] text-gray-400">确权项: 客户盖章 (对应系数 0.6)</div>
                        </div>
                    </div>
                </div>

                <!-- Item 5: Active/Blue -->
                <div
                    class="flex items-center justify-between p-4 border border-blue-100 bg-[#f0f5ff] rounded-2xl ring-1 ring-[#e6f4ff]">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-circle-check text-[#2f54eb] text-lg"></i>
                        <div>
                            <div class="text-[14px] text-[#2f54eb] font-bold">验收即列账</div>
                            <div class="text-[11px] text-blue-400">标准商务流程</div>
                        </div>
                    </div>
                </div>

                <!-- Item 6 -->
                <div
                    class="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50 transition-all">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-5 h-5 rounded-full border-2 border-gray-100 flex items-center justify-center">
                        </div>
                        <div>
                            <div class="text-[14px] text-gray-700 font-bold">代收代付</div>
                            <div class="text-[11px] text-gray-400">财务结算类型</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
</script>
