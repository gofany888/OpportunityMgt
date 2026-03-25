<template>
<a-layout class="layout-root">

  <!-- 左侧侧边栏 -->
  <a-layout-sider
    v-model:collapsed="collapsed"
    :width="240"
    :collapsed-width="64"
    :trigger="null"
    collapsible
    theme="light"
    class="layout-sider"
  >
    <!-- Logo 区域 -->
    <div class="sider-logo">
      <div class="logo-icon">
        <i class="fa-solid fa-layer-group"></i>
      </div>
      <span v-show="!collapsed" class="logo-text">{{ appInfo.name }}</span>
      <template v-if="!collapsed">
        <div class="logo-actions">
          <a-badge :count="3" :offset="[-2, 2]" size="small">
            <i class="fa-regular fa-bell logo-action-icon"></i>
          </a-badge>
          <a-avatar :size="28" class="logo-avatar">
            <template #icon><i class="fa-regular fa-user" style="font-size: 12px"></i></template>
          </a-avatar>
        </div>
      </template>
    </div>

    <!-- 搜索栏 -->
    <div v-show="!collapsed" class="sider-search">
      <a-input
        placeholder="快速检索..."
        :bordered="false"
        class="search-input"
      >
        <template #prefix>
          <search-outlined class="search-icon" />
        </template>
        <template #suffix>
          <a-tag class="search-shortcut">Ctrl K</a-tag>
        </template>
      </a-input>
    </div>

    <!-- 导航菜单 -->
    <div class="sider-menu-area">
      <div v-for="group in menuGroups" :key="group.key" class="menu-group">
        <div v-show="!collapsed" class="menu-group-title">{{ group.label }}</div>
        <a-menu
          :selected-keys="selectedKeys"
          mode="inline"
          :inline-collapsed="collapsed"
          class="sider-menu"
        >
          <a-menu-item
            v-for="item in group.items"
            :key="item.key"
            :disabled="item.disabled"
            @click="handleMenuClick(item)"
          >
            <template #icon>
              <component :is="getIcon(item.icon)" />
            </template>
            <span>{{ item.label }}</span>
          </a-menu-item>
        </a-menu>
      </div>
    </div>

    <!-- 底部设置 -->
    <div class="sider-bottom">
      <a-divider class="sider-divider" />
      <a-menu
        mode="inline"
        :inline-collapsed="collapsed"
        :selected-keys="[]"
        class="sider-menu"
      >
        <a-menu-item
          v-for="item in bottomMenuItems"
          :key="item.key"
          :disabled="item.disabled"
        >
          <template #icon>
            <component :is="getIcon(item.icon)" />
          </template>
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </div>

    <!-- 收起按钮 -->
    <div class="collapse-trigger" @click="collapsed = !collapsed">
      <right-outlined v-if="collapsed" />
      <left-outlined v-else />
    </div>
  </a-layout-sider>

  <!-- 右侧内容区 -->
  <a-layout class="layout-content-area">

    <!-- 顶部导航栏 -->
    <a-layout-header v-if="showLayoutHeader" class="layout-header">
      <!-- 页面标题 -->
      <div class="header-title-block">
        <template v-if="!route.meta.customTitle">
          <div class="header-indicator"></div>
          <a-typography-title :level="4" class="header-title">
            {{ pageTitle }}
          </a-typography-title>
        </template>
        <!-- Teleport 注入点：子页面自定义标题 -->
        <div id="header-title-portal" class="header-portal"></div>
      </div>

      <!-- 右侧操作区 -->
      <div class="header-actions">
        <!-- Teleport 注入点：子页面自定义按钮 -->
        <div id="header-actions-portal" class="header-portal"></div>
        <!-- 默认视角信息 -->
        <template v-if="!route.meta.customActions">
          <a-space :size="8">
            <a-typography-text type="secondary" class="context-label">当前视角：</a-typography-text>
            <a-tag color="blue">BG_LEADER</a-tag>
          </a-space>
        </template>
      </div>
    </a-layout-header>

    <!-- 可滚动内容视口 -->
    <a-layout-content class="layout-main-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</a-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  AppstoreOutlined,
  SearchOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  HistoryOutlined,
  SettingOutlined,
  SlidersOutlined,
  LeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue'
import { menuGroups, bottomMenuItems, appInfo } from '@/data/menuData'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const showLayoutHeader = computed(() => route.meta.layoutHeader !== false)

/** 当前选中的菜单项 */
const selectedKeys = computed(() => {
  // 必须优先精确匹配 /report/eis-audit，否则会被外层的 /report 捕获
  if (route.path === '/report/eis-audit') return ['/report/eis-audit']
  
  // 对于 /report/xxx 子路由（如商机明细等未在侧边栏明确列出的子页），高亮到 /report
  if (route.path.startsWith('/report')) return ['/report']

  if (route.path.startsWith('/sync')) return ['/sync']
  
  return [route.path]
})

/** 页面标题，从路由 meta 中读取 */
const pageTitle = computed(() => route.meta.title || '运营管理平台')

/** 菜单点击处理 */
const handleMenuClick = (item) => {
  if (!item.disabled) {
    router.push(item.key)
  }
}

/** 图标名称映射到组件 */
const iconMap = {
  'appstore-outlined': AppstoreOutlined,
  'search-outlined': SearchOutlined,
  'check-square-outlined': CheckSquareOutlined,
  'bar-chart-outlined': BarChartOutlined,
  'history-outlined': HistoryOutlined,
  'setting-outlined': SettingOutlined,
  'sliders-outlined': SlidersOutlined,
  'safety-certificate-outlined': SafetyCertificateOutlined,
}

const getIcon = (iconName) => iconMap[iconName] || AppstoreOutlined
</script>

<style scoped src="./styles/BaseLayout.css"></style>
