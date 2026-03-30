<template>
  <div class="audit-decision-table">
    <div class="audit-decision-table__toolbar">
      <div class="audit-decision-table__toolbar-main">
        <div class="audit-decision-table__title">
          <SyncOutlined class="audit-decision-table__title-icon" />
          <span>{{ detail.filterTitle }}</span>
        </div>

        <a-segmented
          v-model:value="activeFilter"
          :options="detail.filterOptions"
          class="audit-decision-table__segmented"
        />
      </div>
    </div>

    <a-card :bordered="false" class="audit-decision-table__card">
      <a-table
        :columns="detail.columns"
        :data-source="filteredRows"
        :pagination="paginationConfig"
        :bordered="false"
        row-key="key"
        class="audit-decision-table__table"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'entity'">
            <div class="audit-decision-table__entity">
              <div class="audit-decision-table__entity-row">{{ record.rowLabel }}</div>
              <div class="audit-decision-table__entity-name">{{ record.entityName }}</div>
              <div class="audit-decision-table__entity-code">{{ record.entityCode }}</div>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'decision'">
            <div class="audit-decision-table__decision">
              <a-tag class="audit-decision-table__decision-badge">{{ record.decisionBadge }}</a-tag>
              <div :class="['audit-decision-table__decision-status', `is-${record.decisionTone}`]">
                <span class="audit-decision-table__decision-dot"></span>
                {{ record.decisionStatus }}
              </div>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'comparison'">
            <div class="audit-decision-table__comparison">
              <template v-for="block in record.comparisonBlocks" :key="`${record.key}-${block.type}-${block.label || block.text}`">
                <div v-if="block.type === 'diff'" class="audit-decision-table__diff-list">
                  <div v-for="item in block.rows" :key="`${record.key}-${item.label}`" class="audit-decision-table__diff-row">
                    <span class="audit-decision-table__diff-label">{{ item.label }}</span>
                    <span class="audit-decision-table__diff-from tabular-num">{{ item.from }}</span>
                    <ArrowRightOutlined class="audit-decision-table__diff-arrow" />
                    <span class="audit-decision-table__diff-to tabular-num">{{ item.to }}</span>
                  </div>
                </div>

                <div v-else-if="block.type === 'pair'" class="audit-decision-table__pair-row">
                  <span class="audit-decision-table__pair-label">{{ block.label }}</span>
                  <span class="audit-decision-table__pair-from tabular-num">{{ block.from }}</span>
                  <ArrowRightOutlined class="audit-decision-table__diff-arrow" />
                  <span class="audit-decision-table__pair-to tabular-num">{{ block.to }}</span>
                </div>

                <a-alert
                  v-else-if="block.type === 'note'"
                  :class="['audit-decision-table__note', `is-${block.tone}`]"
                  :message="block.text"
                  show-icon
                  :type="alertTypeMap[block.tone] || 'info'"
                />
              </template>
            </div>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ArrowRightOutlined, SyncOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
})

const activeFilter = ref('all')

const filteredRows = computed(() => {
  if (activeFilter.value === 'all') {
    return props.detail.rows
  }

  return props.detail.rows.filter((row) => row.filter === activeFilter.value)
})

const paginationConfig = computed(() => ({
  total: props.detail.pagination.total,
  current: props.detail.pagination.current,
  pageSize: props.detail.pagination.pageSize,
  showSizeChanger: false,
  showTotal: props.detail.pagination.totalText,
}))

const alertTypeMap = {
  slate: 'info',
  orange: 'warning',
  blue: 'info',
}
</script>

<style scoped src="./styles/AuditDecisionTable.css"></style>
