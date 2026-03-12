<template>
  <aside class="w-[240px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto">
    <div class="p-4 flex-1">
      <div class="space-y-6">
        <!-- 维度导航 Section -->
        <div>
          <div class="px-4 py-2 text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-2">维度导航</div>
          <div class="space-y-1">
            <!-- 激活菜单项 -->
            <div class="px-4 py-3 bg-[#f0f5ff] text-[#2f54eb] font-bold cursor-pointer text-[14px] flex items-center gap-3 relative">
              <div class="absolute right-0 top-0 bottom-0 w-1 bg-[#2f54eb]"></div>
              <i class="fa-solid fa-table-cells-large w-5 text-center"></i> 商务全景
            </div>
            <div class="px-4 py-3 text-gray-500 hover:bg-gray-50 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-file-contract w-5 text-center"></i> 合同明细
            </div>
            <div class="px-4 py-3 text-gray-500 hover:bg-gray-50 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-flag w-5 text-center"></i> 环节里程碑
            </div>
            <div class="px-4 py-3 text-gray-500 hover:bg-gray-50 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-wave-square w-5 text-center"></i> 交付管控
            </div>
          </div>
        </div>

        <!-- 已挂载子商机记录 Section -->
        <div>
          <div class="px-4 py-2 text-[12px] font-medium text-gray-400 uppercase tracking-wider mb-2">已挂载子商机记录</div>
          <div class="space-y-1">
            <div class="px-4 py-3 text-gray-500 hover:bg-gray-50 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-folder w-5 text-center"></i> 软件开发分项
            </div>
            <div class="pl-12 py-2.5 text-gray-500 hover:text-blue-500 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-chart-line w-4 text-center text-gray-400"></i> 滚动预测
            </div>
            <div class="pl-12 py-2.5 text-gray-500 hover:text-blue-500 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-circle-user w-4 text-center text-gray-400"></i> 经营性质与产品画像
            </div>
            <div class="pl-12 py-2.5 text-gray-500 hover:text-blue-500 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-users-gear w-4 text-center text-gray-400"></i> 人力资源与采购
            </div>
            <div class="px-4 py-3 text-gray-500 hover:bg-gray-50 cursor-pointer text-[14px] flex items-center gap-3 transition-colors">
              <i class="fa-solid fa-folder w-5 text-center"></i> 硬件集成分项
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
</script>
