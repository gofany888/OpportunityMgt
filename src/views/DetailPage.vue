<template>
  <div class="detail-page">
    <div class="detail-page__header">
      <DetailHeader />
    </div>

    <a-layout has-sider class="detail-page__layout">
      <div class="detail-page__sidebar">
        <DetailSidebar ref="sidebarRef" @navigate="handleNavigate" />
      </div>
      <a-layout-content class="detail-page__content">
        <div id="overview">
          <ProgressStepper />
        </div>
        <div id="contract">
          <BasicInfoCards />
        </div>
        <div id="progress">
          <ProgressTrackingCard />
        </div>
        <div id="milestone">
          <MilestoneTimeline />
        </div>
        <div id="delivery">
          <DeliveryBenchmark />
          <SubItemContainer />
          <DangerZoneCard />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DetailHeader from '@/components/detail/DetailHeader.vue'
import DetailSidebar from '@/components/detail/DetailSidebar.vue'
import ProgressStepper from '@/components/detail/ProgressStepper.vue'
import BasicInfoCards from '@/components/detail/BasicInfoCards.vue'
import ProgressTrackingCard from '@/components/detail/ProgressTrackingCard.vue'
import MilestoneTimeline from '@/components/detail/MilestoneTimeline.vue'
import DeliveryBenchmark from '@/components/detail/DeliveryBenchmark.vue'
import SubItemContainer from '@/components/detail/SubItemContainer.vue'
import DangerZoneCard from '@/components/detail/DangerZoneCard.vue'

const sidebarRef = ref(null)
let isScrolling = false

// 定义所有锚点的顺序（主菜单和子菜单）
const anchorOrder = [
  { key: 'overview', isPrimary: true },
  { key: 'contract', isPrimary: true },
  { key: 'progress', isPrimary: true },
  { key: 'milestone', isPrimary: true },
  { key: 'delivery', isPrimary: true },
  { key: 'software', isPrimary: false },
  { key: 'forecast', isPrimary: false },
  { key: 'profile', isPrimary: false },
  { key: 'procurement', isPrimary: false },
  { key: 'hardware', isPrimary: false },
]

const handleNavigate = (key) => {
  console.log('Navigating to:', key)
  const element = document.getElementById(key)
  console.log('Found element:', element)
  if (element) {
    // 设置标志，防止滚动时触发高亮更新
    isScrolling = true
    
    const headerHeight = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 24
    
    console.log('Scrolling to:', offsetPosition)
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // 滚动结束后重置标志
    setTimeout(() => {
      isScrolling = false
    }, 1000)
  } else {
    console.error('Element not found for key:', key)
  }
}

// 滚动监听，自动更新导航高亮
const handleScroll = () => {
  if (isScrolling) return // 如果正在手动滚动，不更新高亮
  
  const headerHeight = 80
  const offset = 150 // 额外偏移量，让高亮更早触发
  
  let activeKey = null
  let activePrimary = true
  let minDistance = Infinity
  
  // 遍历所有锚点，找到距离视口顶部最近的可见元素
  for (const { key, isPrimary } of anchorOrder) {
    const element = document.getElementById(key)
    
    if (element) {
      const rect = element.getBoundingClientRect()
      const distance = Math.abs(rect.top - headerHeight - offset)
      
      // 如果元素在视口上方或视口内，且距离更近
      if (rect.top <= headerHeight + offset && distance < minDistance) {
        minDistance = distance
        activeKey = key
        activePrimary = isPrimary
      }
    }
  }
  
  // 如果没有找到在视口上方的元素，使用第一个
  if (!activeKey) {
    activeKey = 'overview'
    activePrimary = true
  }
  
  if (sidebarRef.value && activeKey) {
    sidebarRef.value.updateActiveKey(activeKey, activePrimary)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化时检查一次
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  background: var(--page-background);
}

.detail-page__header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #ffffff;
}

.detail-page__layout {
  background: transparent;
  padding-top: 24px;
}

.detail-page__sidebar {
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.detail-page__content {
  padding-left: 24px;
  display: flex !important;
  flex-direction: column !important;
  gap: 24px !important;
}

.detail-page__content > div {
  width: 100%;
}
</style>
