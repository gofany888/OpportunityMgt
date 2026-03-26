<template>
  <a-layout-sider width="240" theme="light" class="detail-sidebar">
    <div class="detail-sidebar-inner">
      <section class="detail-sidebar-section">
        <p class="detail-sidebar-label">{{ detailSidebarConfig.primaryLabel }}</p>
        <a-menu mode="inline" :selected-keys="primarySelectedKeys" class="detail-sidebar-menu" @click="handleMenuClick">
          <a-menu-item
            v-for="item in detailSidebarConfig.primaryItems"
            :key="item.key"
          >
            <template #icon>
              <component :is="iconMap[item.icon]" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </a-menu>
      </section>

      <section class="detail-sidebar-section">
        <p class="detail-sidebar-label">{{ detailSidebarConfig.secondaryLabel }}</p>
        <a-menu
          mode="inline"
          class="detail-sidebar-menu"
          :selected-keys="secondarySelectedKeys"
          :open-keys="openKeys"
          @click="handleSecondaryMenuClick"
          @update:openKeys="openKeys = $event"
        >
          <template v-for="item in detailSidebarConfig.secondaryItems" :key="item.key">
            <a-sub-menu 
              v-if="item.children" 
              :key="item.key"
              :class="{ 'submenu-selected': secondarySelectedKeys.includes(item.key) }"
            >
              <template #icon>
                <component :is="iconMap[item.icon]" />
              </template>
              <template #title>
                <span @click.stop="handleSubMenuTitleClick(item.key)">{{ item.label }}</span>
              </template>
              <a-menu-item
                v-for="child in item.children"
                :key="child.key"
              >
                <template #icon>
                  <component :is="iconMap[child.icon]" />
                </template>
                {{ child.label }}
              </a-menu-item>
            </a-sub-menu>

            <a-menu-item v-else :key="item.key">
              <template #icon>
                <component :is="iconMap[item.icon]" />
              </template>
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </section>
    </div>
  </a-layout-sider>
</template>

<script setup>
import { ref } from 'vue'
import {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FlagOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
  ProfileOutlined,
  RiseOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { detailSidebarConfig } from '@/data/detailPageData'

const emit = defineEmits(['navigate'])

const iconMap = {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FlagOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
  ProfileOutlined,
  RiseOutlined,
  TeamOutlined,
}

const primarySelectedKeys = ref(['overview'])
const secondarySelectedKeys = ref([])
const openKeys = ref(['software'])

const handleMenuClick = ({ key }) => {
  // 点击主菜单时，清空子菜单选中状态
  primarySelectedKeys.value = [key]
  secondarySelectedKeys.value = []
  emit('navigate', key)
}

const handleSecondaryMenuClick = ({ key, keyPath }) => {
  // 点击子菜单时，清空主菜单选中状态
  primarySelectedKeys.value = []
  secondarySelectedKeys.value = [key]
  emit('navigate', key)
}

const handleSubMenuTitleClick = (key) => {
  // 点击子菜单标题（父级）时，也触发导航，并高亮该项
  console.log('SubMenu title clicked, key:', key)
  primarySelectedKeys.value = []
  secondarySelectedKeys.value = [key]
  emit('navigate', key)
}

// 暴露方法供父组件调用，用于滚动时更新选中状态
const updateActiveKey = (key, isPrimary = true) => {
  if (isPrimary) {
    primarySelectedKeys.value = [key]
    secondarySelectedKeys.value = []
  } else {
    primarySelectedKeys.value = []
    secondarySelectedKeys.value = [key]
  }
}

defineExpose({
  updateActiveKey
})
</script>

<style scoped src="./styles/DetailSidebar.css"></style>
