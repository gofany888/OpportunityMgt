<template>
<!-- 5.6 人力资源与采购全周期管控 -->
<div
    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col mb-2">
    <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold text-[14px]">
        <i class="fa-solid fa-users-gear text-[#1677ff]"></i> 人力资源与采购全周期管控
    </div>

    <div class="grid grid-cols-2 gap-y-5 gap-x-8">
        <!-- Field 1 -->
        <div>
            <label class="block text-[11px] text-gray-500 mb-1.5">采购总金额 (万元，不含税)</label>
            <input type="text" value="450.00"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 bg-[#fafafa] focus:bg-white outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
        </div>

        <!-- Field 2 -->
        <div>
            <label class="block text-[11px] text-gray-500 mb-1.5">其中人力采购供应商</label>
            <input type="text" value="华为技术有限公司"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 bg-[#fafafa] focus:bg-white outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
        </div>

        <!-- Field 3 -->
        <div>
            <label class="block text-[11px] text-gray-500 mb-1.5">其中人力采购金额
                (万元，不含税)</label>
            <input type="text" value="120.00"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 bg-[#fafafa] focus:bg-white outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
        </div>

        <!-- Field 4 (Dropdown & Date next to each other in design? No, they are separated. Let's trace the layout: 2 cols. Row 1: Amount, Supplier. Row 2: HR Amount, [Dropdown + Date in two cols? No, the screenshot has 4 fields visible, oh wait it has 5. Let's look closely at the screenshot.
 column: 采购总金额, 其中人力采购金额.
t column: 其中人力采购供应商, 是否已采购, 计划采购时间.
s adjust to match exact layout.]
                            -->
    </div>

    <!-- Actually, the screenshot has:
购总金额 (Left), 其中人力采购供应商 (Right)
中人力采购金额 (Left), 然后右边是一排两个: 是否已采购, 计划采购时间
                        -->
    <div class="grid grid-cols-2 gap-y-5 gap-x-8 mt-5">
        <div class="grid grid-cols-2 gap-x-8 col-start-2">
            <div>
                <label class="block text-[11px] text-gray-500 mb-1.5">是否已采购</label>
                <div class="relative">
                    <select
                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 appearance-none bg-white focus:outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                        <option>是</option>
                    </select>
                    <i
                        class="fa-solid fa-angle-down absolute right-3 top-3 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
            </div>
            <div class="relative">
                <label class="block text-[11px] text-gray-500 mb-1.5">计划采购时间</label>
                <div class="relative">
                    <input type="text" value="2026/06/15"
                        class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 bg-white outline-none focus:border-[#2f54eb] focus:ring-1 focus:ring-[#f0f5ff]">
                    <i
                        class="fa-regular fa-calendar absolute right-3 top-2.5 text-gray-400 text-[12px] pointer-events-none"></i>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script setup>
</script>
