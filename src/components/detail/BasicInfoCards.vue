<template>
<!-- 2. 分列基础信息卡与预算卡 - 组织归属与客户全景 & 合同财务与经营画像 -->
<div class="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">

    <!-- 左侧：组织归属与客户全景 -->
    <div class="bg-white rounded-3xl p-6 card-shadow border border-gray-100 flex flex-col">
        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2 mb-6">
            <i class="fa-solid fa-users-viewfinder text-[#2f54eb]"></i> 组织归属与客户全景
        </h3>

        <div class="grid grid-cols-2 gap-y-6 gap-x-12 px-2 mb-8">
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">二级部门</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">云业务运营产品部</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">销售单元</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">南部部分公司 / 张销售</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">客户经理</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">李经理</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">地区</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">华南大区 / 某省</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">客户归属</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">某省电力公司</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">最终客户名称</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">某省电力集团物资部</span>
            </div>
        </div>

        <!-- 商机进度执行轨迹 -->
        <div class="border-t border-gray-100 pt-6">
            <div class="flex justify-between items-center mb-6">
                <div class="text-gray-500 text-[13px] flex items-center gap-2">
                    <i class="fa-regular fa-clock"></i> 商机进度执行轨迹 (经营必要)
                </div>
                <a href="#" class="text-[#2f54eb] text-[13px] hover:underline">查看完整轨迹记录</a>
            </div>

            <div class="relative pl-6 space-y-8">
                <!-- 垂直连线 -->
                <div class="absolute left-[7px] top-36 bottom-2 w-px bg-gray-200"></div>

                <!-- 输入框 -->
                <div class="relative">
                    <textarea placeholder="追加客观商务进展说明..."
                        class="w-full h-24 p-4 text-[14px] border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#2f54eb] outline-none transition-all resize-none"></textarea>
                    <div class="flex justify-end mt-2">
                        <button
                            class="bg-[#141414] text-white text-[13px] px-4 py-1.5 rounded hover:bg-black transition-colors flex items-center gap-1.5">
                            <i class="fa-solid fa-plus text-[10px]"></i> 追加草稿
                        </button>
                    </div>
                </div>

                <!-- 轨迹项 1 (草稿态) -->
                <div class="relative pl-6">
                    <div
                        class="absolute left-[-23px] top-1.5 w-3 h-3 rounded-full bg-[#1677ff] border-2 border-white shadow-sm ring-4 ring-blue-50">
                    </div>
                    <div
                        class="bg-white border border-dashed border-[#91caff] rounded-xl p-4 relative bg-[#f0f5ff]/30">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2 text-[13px] text-[#2f54eb] font-medium">
                                会话中 · 当前用户 <span
                                    class="bg-[#fff7e6] text-[#fa8c16] text-[10px] px-1.5 py-0.5 rounded border border-[#ffd591]">待提交草稿</span>
                            </div>
                            <div class="flex items-center gap-3 text-gray-400 text-[12px]">
                                <i class="fa-solid fa-pencil cursor-pointer hover:text-gray-600"></i>
                                <i
                                    class="fa-regular fa-trash-can cursor-pointer hover:text-red-500"></i>
                            </div>
                        </div>
                        <div class="text-[14px] text-gray-800">测试</div>
                    </div>
                </div>

                <!-- 轨迹项 2 -->
                <div class="relative pl-6">
                    <div
                        class="absolute left-[-23px] top-1.5 w-3 h-3 rounded-full border-2 border-[#1677ff] bg-white">
                    </div>
                    <div class="text-[12px] text-gray-400 mb-2">2026-03-02 10:15 · 张销售</div>
                    <div class="bg-[#f6f8fa] rounded-xl p-3 text-[14px] text-gray-700">
                        客户侧预算批复已过会，准备进行单一来源采购公示。
                    </div>
                </div>

                <!-- 轨迹项 3 -->
                <div class="relative pl-6 pb-2">
                    <div
                        class="absolute left-[-23px] top-1.5 w-3 h-3 rounded-full bg-[#91caff] border-2 border-white">
                    </div>
                    <div class="text-[12px] text-gray-400 mb-1.5">2026-02-25 14:30 · 李经理</div>
                    <div class="text-[14px] text-gray-700">二期方案对齐会结束，技术参数已录入客户内审系统。</div>
                </div>
            </div>
        </div>
    </div>

    <!-- 右侧：合同财务与经营画像 -->
    <div class="bg-white rounded-3xl p-6 card-shadow border border-gray-100 flex flex-col">
        <h3 class="text-base font-bold text-gray-800 flex items-center gap-2 mb-8">
            <i class="fa-solid fa-file-invoice-dollar text-[#2f54eb]"></i> 合同财务与经营画像
        </h3>

        <div class="grid grid-cols-2 gap-y-8 gap-x-12 px-2 mb-2">
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">合同编号</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span
                    class="text-gray-900 font-bold text-[15px] num-font uppercase">CT-2026-X8992</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">合同状态</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">执行中</span>
            </div>
            <div class="col-span-2">
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">合同名称</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">某省电力数字化转型二期框架协议</span>
            </div>
            <div>
                <label class="block text-gray-400 text-xs text-[12px] mb-2">投标类型 (本地核定)</label>
                <div class="relative">
                    <select
                        class="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 font-medium py-2 pl-3 pr-10 rounded-lg text-sm focus:outline-none focus:border-[#2f54eb] transition-all">
                        <option>公开招标</option>
                        <option>邀请招标</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <i class="fa-solid fa-chevron-down text-[10px]"></i>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">关联交易类型</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">IT服务</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">财务分类</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">国内软件技术服务收入</span>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-gray-400 text-xs text-[12px]">项目属性</span>
                    <span
                        class="bg-[#f0f5ff] text-[#2f54eb] text-[10px] px-1.5 py-0.5 rounded leading-none">EIS同步</span>
                </div>
                <span class="text-gray-900 font-bold text-[15px]">非资源池</span>
            </div>
        </div>

        <!-- 黑色金额汇总块 -->
        <div class="mt-4 bg-[#1a1f2c] rounded-[24px] p-8 relative overflow-hidden shadow-xl">
            <!-- 背景图标 -->
            <i
                class="fa-solid fa-building-columns absolute right-8 top-1/2 -translate-y-1/2 text-[100px] text-white opacity-[0.05] z-0"></i>

            <div class="relative z-10">
                <div class="text-gray-400 text-[15px] mb-1">子项总金额 (含税)</div>
                <div class="flex items-baseline gap-1 text-[#adc6ff]">
                    <span
                        class="text-[64px] font-medium num-font tracking-tight leading-none">¥2,400.00</span>
                    <span class="text-[18px] font-medium opacity-80">万</span>
                </div>

                <div class="mt-6">
                    <div
                        class="bg-[#132322] border border-[#1d3d3b] rounded-lg px-4 py-2 flex items-center gap-2 text-[14px] text-[#52c41a] w-full">
                        <i class="fa-solid fa-certificate"></i> 基因已锁定至 2026 年度底稿
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
</script>
