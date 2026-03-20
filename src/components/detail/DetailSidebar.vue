<template>
  <a-layout-sider width="240" theme="light" class="detail-sidebar">
    <div class="detail-sidebar-inner">
      <section class="detail-sidebar-section">
        <p class="detail-sidebar-label">{{ detailSidebarConfig.primaryLabel }}</p>
        <a-menu mode="inline" :selected-keys="primarySelectedKeys" class="detail-sidebar-menu">
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
        >
          <template v-for="item in detailSidebarConfig.secondaryItems" :key="item.key">
            <a-sub-menu v-if="item.children" :key="item.key">
              <template #icon>
                <component :is="iconMap[item.icon]" />
              </template>
              <template #title>{{ item.label }}</template>
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
  TeamOutlined,
} from '@ant-design/icons-vue'
import { detailSidebarConfig } from '@/data/detailPageData'

const iconMap = {
  AppstoreOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FlagOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
  ProfileOutlined,
  TeamOutlined,
}

const primarySelectedKeys = ref([
  detailSidebarConfig.primaryItems.find((item) => item.active)?.key || 'overview',
])
const secondarySelectedKeys = ref([])
const openKeys = ref(['software'])
</script>

<style scoped src="./styles/DetailSidebar.css"></style>
