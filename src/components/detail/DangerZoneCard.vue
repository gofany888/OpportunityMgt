<template>
  <div class="mt-8 mb-8 rounded-[20px] border border-red-100 bg-[#fffcfc] p-6 relative overflow-hidden">
    <!-- Watermark Icon -->
    <div class="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none">
      <SafetyCertificateOutlined class="text-[180px] text-red-50 opacity-80" />
    </div>

    <!-- Header -->
    <div class="flex items-center gap-2 mb-3 relative z-10">
      <WarningOutlined class="text-[#dc2626] text-[18px]" />
      <span class="text-[#991b1b] text-[16px] font-bold italic tracking-wide">商机生命周期终结操作</span>
    </div>

    <!-- Description -->
    <p class="text-[#b91c1c] text-[12px] italic mb-6 relative z-10 opacity-80 font-medium">
      以下操作将从当前活跃经营底账中移除该商机。执行这些操作后续可能需要经过部门经理或 BG 管理员的二次审核，且操作记录将永久保存。
    </p>

    <!-- Cards -->
    <div class="grid grid-cols-3 gap-6 relative z-10">
      <!-- Card 1 -->
      <div class="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[120px]">
        <div class="w-9 h-9 rounded-full bg-[#ecfdf5] flex items-center justify-center mb-3">
          <CheckCircleOutlined class="text-[#10b981] text-[16px]" />
        </div>
        <div>
          <div class="text-[14px] font-bold text-gray-800 mb-1">正常交付结项</div>
          <div class="text-[12px] text-gray-400 italic font-medium">所有款项已回收，正式封账</div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-[16px] p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[120px]">
        <div class="w-9 h-9 rounded-full bg-[#fff7ed] flex items-center justify-center mb-3">
          <CloseCircleOutlined class="text-[#f97316] text-[16px]" />
        </div>
        <div>
          <div class="text-[14px] font-bold text-gray-800 mb-1">丢单/异常关闭</div>
          <div class="text-[12px] text-gray-400 italic font-medium">需填写丢单归因并提交审批</div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-[#fff5f5] rounded-[16px] p-5 shadow-sm border border-red-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between min-h-[120px]">
        <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
          <DeleteOutlined class="text-red-500 text-[16px]" />
        </div>
        <div>
          <div class="text-[14px] font-bold text-[#b91c1c] mb-1">彻底删除底账记录</div>
          <div class="text-[12px] text-[#ef4444] italic font-medium">仅限处理错目录录入，强审计拦截</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons-vue'
</script>
