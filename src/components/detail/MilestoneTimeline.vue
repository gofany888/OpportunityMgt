<template>
<!-- 3. 商机环节执行里程碑管理 -->
<div class="bg-white rounded-3xl p-8 card-shadow border border-gray-100">
    <div class="flex justify-between items-center mb-8">
        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2">
            <i class="fa-solid fa-flag text-[#2f54eb]"></i> 商机环节执行里程碑管理
        </h3>
        <button
            class="bg-[#2f54eb] text-white text-[13px] px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md">
            <i class="fa-solid fa-clock-rotate-left"></i> 开启排期重排工具
        </button>
    </div>

    <div class="w-full overflow-auto">
        <!-- 表头 -->
        <div
            class="flex items-center px-4 py-3 text-[13px] font-medium text-gray-400 border-b border-gray-50 mb-2">
            <div class="flex-1">环节阶段 / 具体子项</div>
            <div class="w-[220px] flex-shrink-0 text-center">经营实际时刻 (PM 填报)</div>
            <div class="w-[100px] flex-shrink-0 text-center">证明材料</div>
            <div class="w-[240px] flex-shrink-0 text-center">计划周期</div>
            <div class="w-[100px] flex-shrink-0 text-right">当前状态</div>
        </div>

        <!-- 列表内容 -->
        <div class="space-y-1">
            <!-- L1 -->
            <div class="flex items-center px-4 py-4 hover:bg-gray-50/50 transition-colors group">
                <div class="flex-1 flex items-center gap-3">
                    <div class="w-[3px] h-4 bg-[#52c41a] opacity-30 rounded-full"></div>
                    <span class="text-[14px] text-gray-500 italic font-medium">L1. 商机发现</span>
                    <i
                        class="fa-solid fa-chevron-down text-[10px] text-gray-300 group-hover:text-gray-400"></i>
                </div>
                <div
                    class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-400 italic font-medium whitespace-nowrap">
                    2026-01-01 ~ 2026-01-10</div>
                <div class="w-[100px] flex-shrink-0 flex justify-center">
                    <i class="fa-solid fa-circle-check text-[#52c41a] text-[16px]"></i>
                </div>
                <div class="w-[240px] flex-shrink-0 px-2">
                    <div
                        class="bg-gray-50/30 rounded-md px-3 py-1.5 flex items-center justify-center text-[12px] text-gray-300 italic font-medium whitespace-nowrap">
                        2026-01-01 ~ 2026-01-15
                    </div>
                </div>
                <div
                    class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#52c41a] font-medium">
                    已完成</div>
            </div>

            <!-- L2 -->
            <div class="flex items-center px-4 py-4 hover:bg-gray-50/50 transition-colors group">
                <div class="flex-1 flex items-center gap-3">
                    <div class="w-[3px] h-4 bg-[#52c41a] opacity-30 rounded-full"></div>
                    <span class="text-[14px] text-gray-500 italic font-medium">L2. 商机确立</span>
                    <i
                        class="fa-solid fa-chevron-down text-[10px] text-gray-300 group-hover:text-gray-400"></i>
                </div>
                <div
                    class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-400 italic font-medium whitespace-nowrap">
                    2026-01-12 ~ 2026-01-25</div>
                <div class="w-[100px] flex-shrink-0 flex justify-center">
                    <i class="fa-solid fa-circle-check text-[#52c41a] text-[16px]"></i>
                </div>
                <div class="w-[240px] flex-shrink-0 px-2">
                    <div
                        class="bg-gray-50/30 rounded-md px-3 py-1.5 flex items-center justify-center text-[12px] text-gray-300 italic font-medium whitespace-nowrap">
                        2026-01-10 ~ 2026-01-25
                    </div>
                </div>
                <div
                    class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#52c41a] font-medium">
                    已完成</div>
            </div>

            <!-- L3 -->
            <div class="flex items-center px-4 py-4 hover:bg-gray-50/50 transition-colors group">
                <div class="flex-1 flex items-center gap-3">
                    <div class="w-[3px] h-4 bg-[#52c41a] opacity-30 rounded-full"></div>
                    <span class="text-[14px] text-gray-500 italic font-medium">L3. 立项环节</span>
                    <i
                        class="fa-solid fa-chevron-down text-[10px] text-gray-300 group-hover:text-gray-400"></i>
                </div>
                <div
                    class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-400 italic font-medium whitespace-nowrap">
                    2026-02-01 ~ 2026-02-20</div>
                <div class="w-[100px] flex-shrink-0 flex justify-center">
                    <i class="fa-solid fa-circle-check text-[#52c41a] text-[16px]"></i>
                </div>
                <div class="w-[240px] flex-shrink-0 px-2">
                    <div
                        class="bg-gray-50/30 rounded-md px-3 py-1.5 flex items-center justify-center text-[12px] text-gray-300 italic font-medium whitespace-nowrap">
                        2026-02-01 ~ 2026-02-15
                    </div>
                </div>
                <div
                    class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#52c41a] font-medium">
                    已完成</div>
            </div>

            <!-- L4 - Active -->
            <div class="bg-[#f0f5ff]/40 rounded-xl overflow-hidden mb-2">
                <div class="flex items-center px-4 py-5 font-medium">
                    <div class="w-[3px] h-4 bg-[#2f54eb] rounded-full mr-3"></div>
                    <div class="flex-1 flex items-center gap-3">
                        <span
                            class="text-[14px] text-[#2f54eb] font-bold border-b border-[#2f54eb]">L4.
                            采购环节</span>
                        <i class="fa-solid fa-chevron-up text-[10px] text-[#2f54eb]"></i>
                    </div>
                    <div class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-300">--
                    </div>
                    <div class="w-[100px] flex-shrink-0"></div>
                    <div class="w-[240px] flex-shrink-0 px-2">
                        <div
                            class="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-gray-800 shadow-sm hover:border-gray-300 cursor-pointer transition-all whitespace-nowrap">
                            <div class="flex items-center gap-2">
                                <i class="fa-regular fa-calendar text-gray-400"></i> 2026-03-15 ~
                                2026-03-30
                            </div>
                            <i class="fa-solid fa-caret-down text-[10px] text-gray-300"></i>
                        </div>
                    </div>
                    <div
                        class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#2f54eb] font-medium">
                        进行中</div>
                </div>

                <!-- 子项列表 -->
                <div class="pb-6 space-y-6">
                    <!-- 采购需求 -->
                    <div class="flex items-center px-4 pl-12">
                        <div class="flex-1 flex items-center gap-2">
                            <span class="text-[14px] text-gray-700">采购需求</span>
                            <span
                                class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-2 py-0.5 rounded italic whitespace-nowrap">当前节点
                                (PM)</span>
                        </div>
                        <div class="w-[220px] flex-shrink-0 px-4">
                            <div
                                class="bg-[#2f54eb] text-white rounded-lg flex items-center overflow-hidden h-9 shadow-sm whitespace-nowrap">
                                <div
                                    class="flex-1 flex items-center justify-center gap-2 border-r border-white/20 hover:bg-blue-600 cursor-pointer transition-colors">
                                    <i class="fa-regular fa-calendar-check text-[12px]"></i>
                                    <span class="text-[12px]">起</span>
                                </div>
                                <div class="w-8 text-center text-[12px] opacity-80">~</div>
                                <div
                                    class="flex-1 flex items-center justify-center gap-2 hover:bg-blue-600 cursor-pointer transition-colors">
                                    <span class="text-[12px]">止</span>
                                    <i class="fa-solid fa-caret-down text-[10px] opacity-80"></i>
                                </div>
                            </div>
                        </div>
                        <div class="w-[100px] flex-shrink-0 flex justify-center">
                            <div
                                class="w-8 h-8 rounded-lg bg-[#e6f4ff] text-[#2f54eb] flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                                <i class="fa-solid fa-paperclip text-[14px]"></i>
                            </div>
                        </div>
                        <div class="w-[240px] flex-shrink-0 px-2">
                            <div
                                class="bg-[#2f54eb] border border-[#2f54eb] rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-white shadow-md hover:bg-blue-600 cursor-pointer transition-all whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-calendar"></i> 2026-03-15 ~ 2026-03-20
                                </div>
                                <i class="fa-solid fa-caret-down text-[10px] opacity-80"></i>
                            </div>
                        </div>
                        <div
                            class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#2f54eb] font-medium">
                            进行中
                        </div>
                    </div>

                    <!-- 采购方案 -->
                    <div class="flex items-center px-4 pl-12">
                        <div class="flex-1 text-[14px] text-gray-700">采购方案</div>
                        <div class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-300">
                            --
                        </div>
                        <div class="w-[100px] flex-shrink-0"></div>
                        <div class="w-[240px] flex-shrink-0 px-2">
                            <div
                                class="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-gray-800 shadow-sm hover:border-gray-300 cursor-pointer transition-all whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-calendar text-gray-400"></i> 2026-03-17
                                    ~
                                    2026-03-22
                                </div>
                                <i class="fa-solid fa-caret-down text-[10px] text-gray-300"></i>
                            </div>
                        </div>
                        <div class="w-[100px] flex-shrink-0 text-right text-[13px] text-gray-400">
                            计划中
                        </div>
                    </div>

                    <!-- 公告发布 -->
                    <div class="flex items-center px-4 pl-12">
                        <div class="flex-1 flex items-center gap-2">
                            <span
                                class="text-[14px] text-[#2f54eb] font-medium border-b border-[#2f54eb]">公告发布</span>
                            <span
                                class="bg-[#2f54eb] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                <i class="fa-solid fa-link text-[8px] rotate-45"></i> EIS 认定进度
                            </span>
                        </div>
                        <div class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-300">
                            --
                        </div>
                        <div class="w-[100px] flex-shrink-0"></div>
                        <div class="w-[240px] flex-shrink-0 px-2">
                            <div
                                class="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-gray-800 shadow-sm hover:border-gray-300 cursor-pointer transition-all whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-calendar text-gray-400"></i> 2026-03-19
                                    ~
                                    2026-03-24
                                </div>
                                <i class="fa-solid fa-caret-down text-[10px] text-gray-300"></i>
                            </div>
                        </div>
                        <div
                            class="w-[100px] flex-shrink-0 text-right text-[13px] text-gray-400 italic">
                            计划中</div>
                    </div>

                    <!-- 文件传递截止及递交 -->
                    <div class="flex items-center px-4 pl-12">
                        <div class="flex-1 text-[14px] text-gray-700">文件传递截止及递交</div>
                        <div class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-300">
                            --
                        </div>
                        <div class="w-[100px] flex-shrink-0"></div>
                        <div class="w-[240px] flex-shrink-0 px-2">
                            <div
                                class="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-gray-800 shadow-sm hover:border-gray-300 cursor-pointer transition-all whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-calendar text-gray-400"></i> 2026-03-21
                                    ~
                                    2026-03-26
                                </div>
                                <i class="fa-solid fa-caret-down text-[10px] text-gray-300"></i>
                            </div>
                        </div>
                        <div
                            class="w-[100px] flex-shrink-0 text-right text-[13px] text-gray-400 italic">
                            计划中</div>
                    </div>

                    <!-- 候选人公示 -->
                    <div class="flex items-center px-4 pl-12">
                        <div class="flex-1 text-[14px] text-gray-700">候选人公示</div>
                        <div class="w-[220px] flex-shrink-0 text-center text-[13px] text-gray-300">
                            --
                        </div>
                        <div class="w-[100px] flex-shrink-0"></div>
                        <div class="w-[240px] flex-shrink-0 px-2">
                            <div
                                class="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between text-[12px] text-gray-800 shadow-sm hover:border-gray-300 cursor-pointer transition-all whitespace-nowrap">
                                <div class="flex items-center gap-2">
                                    <i class="fa-regular fa-calendar text-gray-400"></i> 2026-03-24
                                    ~
                                    2026-03-30
                                </div>
                                <i class="fa-solid fa-caret-down text-[10px] text-gray-300"></i>
                            </div>
                        </div>
                        <div
                            class="w-[100px] flex-shrink-0 text-right text-[13px] text-[#fa8c16] font-medium">
                            当前子环节</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
</script>
