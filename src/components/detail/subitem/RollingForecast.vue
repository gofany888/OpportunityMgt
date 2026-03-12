<template>
<!-- 5.4 财务月度滚动预测表 -->
<div
    class="bg-white rounded-2xl p-6 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-gray-100">
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
            <div
                class="w-10 h-10 rounded-xl bg-[#2f54eb] text-white flex items-center justify-center shadow-md shadow-blue-200">
                <i class="fa-solid fa-table-cells text-lg"></i>
            </div>
            <div>
                <h4 class="text-[16px] font-bold text-gray-800">财务月度滚动预测表</h4>
                <div class="text-[11px] text-gray-400 mt-0.5">1-12 月经营维度对标数据 (单位：万元)
                </div>
            </div>
        </div>
        <div class="flex bg-gray-100 rounded-lg p-1">
            <button
                class="px-4 py-1.5 text-[12px] font-medium rounded-md bg-[#2f54eb] text-white shadow-sm transition-all">100%
                把握</button>
            <button
                class="px-4 py-1.5 text-[12px] font-medium rounded-md text-gray-500 hover:text-gray-700 transition-all">60%
                把握</button>
        </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto no-scrollbar pb-2">
        <table class="w-full text-[12px] text-center whitespace-nowrap min-w-[1000px]">
            <thead>
                <!-- Quarter Headers -->
                <tr class="text-gray-400 text-[11px]">
                    <td class="text-left pb-2 w-48">维度对标 / 月份</td>
                    <td colspan="3" class="pb-2">第一季度</td>
                    <td colspan="3" class="pb-2">第二季度</td>
                    <td colspan="3" class="pb-2">第三季度</td>
                    <td colspan="3" class="pb-2">第四季度</td>
                    <td class="text-right pb-2 font-medium text-gray-600">年度合计</td>
                </tr>
                <!-- Month Headers -->
                <tr class="text-[11px] border-b border-gray-100">
                    <td></td>
                    <td class="pb-3 pt-1 text-gray-400">1月<br><span
                            class="text-[10px] text-gray-300">确权</span></td>
                    <td class="pb-3 pt-1 text-gray-400">2月<br><span
                            class="text-[10px] text-gray-300">预估</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">3月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">4月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">5月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">6月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">7月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">8月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">9月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">10月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">11月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td class="pb-3 pt-1 text-[#2f54eb] font-medium">12月<br><span
                            class="text-[10px] text-blue-300">预测</span></td>
                    <td></td>
                </tr>
            </thead>
            <tbody class="num-font font-medium">
                <!-- 销售收入预测 -->
                <tr>
                    <td class="py-4 text-left">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-gray-200 rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                                <i class="fa-solid fa-chart-line text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">销售收入预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">SO 维度
                                    / 财报</div>
                            </div>
                        </div>
                    </td>
                    <td>40</td>
                    <td>105</td>
                    <td>150</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">250</td>
                    <td class="text-[#2f54eb]">100</td>
                    <td class="text-[#2f54eb]">100</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">155</td>
                    <td class="text-right font-bold text-gray-800">1,650</td>
                </tr>

                <!-- 经营收入预测 -->
                <tr>
                    <td class="py-4 text-left">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-gray-200 rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-[#2f54eb] text-white flex items-center justify-center">
                                <i
                                    class="fa-solid fa-money-bill-trend-up text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">经营收入预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">PM
                                    按进度填报</div>
                            </div>
                        </div>
                    </td>
                    <td>40</td>
                    <td>105</td>
                    <td>120</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">150</td>
                    <td class="text-[#2f54eb]">200</td>
                    <td class="text-[#2f54eb]">80</td>
                    <td class="text-[#2f54eb]">50</td>
                    <td class="text-[#2f54eb]">100</td>
                    <td class="text-[#2f54eb]">120</td>
                    <td class="text-[#2f54eb]">40</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-right font-bold text-gray-800">1,200</td>
                </tr>

                <!-- 销售采购预测 -->
                <tr>
                    <td class="py-4 text-left">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-gray-200 rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                                <i class="fa-solid fa-cart-shopping text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">销售采购预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">SO 维度
                                    / 财报</div>
                            </div>
                        </div>
                    </td>
                    <td>15</td>
                    <td>30</td>
                    <td>45</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-[#2f54eb]">75</td>
                    <td class="text-[#2f54eb]">30</td>
                    <td class="text-[#2f54eb]">30</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-[#2f54eb]">45</td>
                    <td class="text-[#2f54eb]">46</td>
                    <td class="text-right font-bold text-gray-800">496</td>
                </tr>

                <!-- 经营采购预测 -->
                <tr class="border-b border-gray-100">
                    <td class="py-4 text-left">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-gray-200 rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center">
                                <i class="fa-solid fa-file-invoice text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">经营采购预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">含税总额
                                    / 消耗</div>
                            </div>
                        </div>
                    </td>
                    <td>10</td>
                    <td>25</td>
                    <td>30</td>
                    <td>40</td>
                    <td>40</td>
                    <td>60</td>
                    <td>20</td>
                    <td>15</td>
                    <td>25</td>
                    <td>30</td>
                    <td>10</td>
                    <td>15</td>
                    <td class="text-right font-bold text-gray-800">320</td>
                </tr>

                <!-- 销售毛利预测 -->
                <tr>
                    <td class="py-4 text-left pt-6">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-[#ffeed8] rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-[#fff2e8] text-[#fa541c] flex items-center justify-center">
                                <i class="fa-solid fa-arrow-trend-up text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">销售毛利预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">算数差值
                                    (估值)</div>
                            </div>
                        </div>
                    </td>
                    <td>25</td>
                    <td>75</td>
                    <td>105</td>
                    <td class="text-[#f5222d] font-bold">105</td>
                    <td class="text-[#f5222d] font-bold">105</td>
                    <td class="text-[#f5222d] font-bold">175</td>
                    <td class="text-[#f5222d] font-bold">70</td>
                    <td class="text-[#f5222d] font-bold">70</td>
                    <td class="text-[#f5222d] font-bold">105</td>
                    <td class="text-[#f5222d] font-bold">105</td>
                    <td class="text-[#f5222d] font-bold">105</td>
                    <td class="text-[#f5222d] font-bold">109</td>
                    <td class="text-right font-bold text-[#f5222d]">1,154</td>
                </tr>

                <!-- 经营毛利预测 -->
                <tr>
                    <td class="py-4 text-left">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-6 bg-[#f6ffed] rounded-full"></div>
                            <div
                                class="w-6 h-6 rounded-md bg-[#f6ffed] text-[#52c41a] flex items-center justify-center">
                                <i class="fa-solid fa-sack-dollar text-[10px]"></i>
                            </div>
                            <div>
                                <div class="text-[12px] text-gray-700 font-bold">经营毛利预测
                                </div>
                                <div class="text-[10px] text-gray-400 font-normal">算数差值
                                    / 利润</div>
                            </div>
                        </div>
                    </td>
                    <td>30</td>
                    <td>80</td>
                    <td>90</td>
                    <td class="text-[#52c41a] font-bold">110</td>
                    <td class="text-[#52c41a] font-bold">110</td>
                    <td class="text-[#52c41a] font-bold">140</td>
                    <td class="text-[#52c41a] font-bold">60</td>
                    <td class="text-[#52c41a] font-bold">35</td>
                    <td class="text-[#52c41a] font-bold">75</td>
                    <td class="text-[#52c41a] font-bold">90</td>
                    <td class="text-[#52c41a] font-bold">30</td>
                    <td class="text-[#52c41a] font-bold">30</td>
                    <td class="text-right font-bold text-[#52c41a]">880</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Bottom Status Bar -->
    <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#52c41a]"></div>
                <span class="text-[12px] text-gray-600 font-medium">年度预测对标率: <span
                        class="text-gray-800">94.2%</span></span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[#2f54eb]"></div>
                <span class="text-[12px] text-gray-600 font-medium">子项金额覆盖量: <span
                        class="text-[#2f54eb]">50%</span></span>
            </div>
        </div>
        <div
            class="bg-[#fffbe6] border border-[#ffe58f] text-[#faad14] text-[11px] px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>经营效益警示: 当前经营预算与销售端口径存在 450w 差额需补齐</span>
        </div>
    </div>
</div>


</template>

<script setup>
</script>
