<template>
  <div class="import-log-section">
    <div class="import-log-section__label">
      <HistoryOutlined class="import-log-section__icon" />
      <span>{{ importLogSection.title }}</span>
    </div>

    <a-card :bordered="false" class="import-log-card">
      <div v-if="showEmpty" class="import-log-empty">
        <div class="import-log-empty__icon">
          <FileSearchOutlined />
        </div>
        <div class="import-log-empty__title">暂无流水记录</div>
        <div class="import-log-empty__desc">尚未执行任何数据采集或变更定稿任务</div>
      </div>
      <a-table
        v-else
        :columns="importLogColumns"
        :data-source="importLogRows"
        :pagination="paginationConfig"
        :bordered="false"
        row-key="key"
        class="import-log-table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'source'">
            <a-tag :color="record.source === 'EIS' ? 'blue' : 'processing'" class="import-log-table__tag">
              {{ record.source }}
            </a-tag>
          </template>

          <template v-else-if="column.dataIndex === 'operator'">
            <a-space :size="8" class="import-log-table__operator-cell">
              <UserOutlined class="import-log-table__user-icon" />
              <span>{{ record.operator }}</span>
            </a-space>
          </template>

          <template v-else-if="column.dataIndex === 'status'">
            <a-tag color="success" class="import-log-table__status">
              {{ record.status }}
            </a-tag>
          </template>

          <template v-else-if="column.dataIndex === 'attachment'">
            <a-button type="link" class="import-log-table__attachment">
              <template #icon>
                <PaperClipOutlined />
              </template>
              {{ record.attachment }}
            </a-button>
          </template>

          <template v-else-if="column.dataIndex === 'recordCount'">
            <span class="import-log-table__count tabular-num">{{ formatAmount(record.recordCount) }}</span>
          </template>

          <template v-else-if="column.dataIndex === 'action'">
            <div class="import-log-table__action-cell">
              <a-button type="link" class="import-log-table__action" @click="openDetail(record)">
                {{ importLogSection.detailActionText }}
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  FileSearchOutlined,
  HistoryOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import {
  importLogColumns,
  importLogRows,
  importLogSection,
} from '@/data/data-import-center/dataImportCenterData'

const router = useRouter()
defineProps({
  showEmpty: {
    type: Boolean,
    default: false,
  },
})

const paginationConfig = computed(() => ({
  total: importLogSection.total,
  current: importLogSection.current,
  pageSize: importLogSection.pageSize,
  showSizeChanger: false,
  showTotal: importLogSection.totalText,
}))

const formatAmount = (value) => Math.round(Number(String(value).replace(/,/g, '')))

const openDetail = (record) => {
  router.push({
    name: 'data-import-audit-detail',
    params: {
      logId: record.recordNo,
    },
  })
}
</script>

<style scoped src="./styles/ImportLogsTable.css"></style>
