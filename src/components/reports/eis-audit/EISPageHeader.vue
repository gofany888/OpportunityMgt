<template>
  <div class="flex items-center gap-3 h-full">
    <!-- 类似默认标题的左侧指示条 -->
    <div class="w-1 h-3.5 bg-[#1677ff] rounded-sm mr-1"></div>
    
    <!-- 标题文字 -->
    <span class="text-[15px] text-gray-800 font-bold">EIS 差异查询与审计中心</span>
    <span class="text-[12px] text-gray-400 font-normal mt-0.5">审计引擎: 经营推盘 (BO) VS 销服参考 (EIS)</span>
    
    <a-divider type="vertical" class="mx-1" />
    
    <!-- 右上角状态标注放到标题旁边紧凑显示 -->
    <a-badge status="success" text="对账快照已实时链接" class="tracking-wide mt-0.5" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped src="./styles/EISPageHeader.css"></style>
