<template>
  <a-card :bordered="false" class="detail-header-card">
    <div class="detail-header-row">
      <div class="detail-header-title-wrap">
        <a-button
          type="text"
          :icon="h(ArrowLeftOutlined)"
          class="detail-header-back"
          @click="router.back()"
        />
        <a-typography-title :level="4" class="detail-header-title">
          {{ detailHeaderConfig.title }}
        </a-typography-title>
        <div class="detail-owner-card">
          <div class="owner-avatar">
            <UserOutlined />
          </div>
          <div class="owner-info">
            <span class="owner-label">{{ detailHeaderConfig.ownerLabel }}</span>
            <span class="owner-name">{{ detailHeaderConfig.owner }}</span>
          </div>
          <EditOutlined class="owner-edit-icon" />
        </div>
      </div>

      <div class="detail-header-actions">
        <a-button class="action-btn-sync">
          <template #icon><SyncOutlined /></template>
          <span class="ml-[2px]">从 <span class="font-bold pr-[2px]">EIS</span> 更新</span>
        </a-button>
        
        <a-button type="primary" class="action-btn-submit">
          <template #icon><SaveFilled /></template>
          {{ detailHeaderConfig.saveText }}
        </a-button>

        <a-divider type="vertical" class="action-divider" />

        <a-dropdown placement="bottomRight">
          <a-button class="action-btn-more">
            <template #icon><EllipsisOutlined class="text-[18px]" /></template>
          </a-button>
          <template #overlay>
            <a-menu class="detail-more-menu">
              <a-menu-item key="link-eis">
                <template #icon><LinkOutlined /></template>
                手动关联 EIS 数据
              </a-menu-item>
              <a-menu-item key="assign-pm">
                <template #icon><UserAddOutlined /></template>
                指派项目经理
              </a-menu-item>
              
              <a-menu-divider />
              
              <a-menu-item key="history">
                <template #icon><HistoryOutlined /></template>
                变更记录与版本
              </a-menu-item>
              <a-menu-item key="export-pdf">
                <template #icon><FilePdfOutlined /></template>
                导出为 PDF
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeftOutlined, EditOutlined, UserOutlined, 
  SyncOutlined, EllipsisOutlined, SendOutlined, SaveFilled,
  LinkOutlined, UserAddOutlined, HistoryOutlined, FilePdfOutlined
} from '@ant-design/icons-vue'
import { detailHeaderConfig } from '@/data/detailPageData'

const router = useRouter()
</script>

<style scoped src="./styles/DetailHeader.css"></style>
