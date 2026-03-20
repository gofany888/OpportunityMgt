<template>
  <div class="data-import-audit-detail-page max-w-[1600px] mx-auto min-h-[calc(100vh-104px)]">
    <Teleport to="#header-title-portal" v-if="isMounted">
      <AuditDetailHeader :detail="detail" />
    </Teleport>

    <Teleport to="#header-actions-portal" v-if="isMounted">
      <a-button class="data-import-audit-detail-page__export">
        <template #icon>
          <FilePdfOutlined />
        </template>
        {{ detail.exportText }}
      </a-button>
    </Teleport>

    <div class="data-import-audit-detail-page__content">
      <AuditOverviewPanel :detail="detail" />
      <AuditDecisionTable :detail="detail" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { FilePdfOutlined } from '@ant-design/icons-vue'
import AuditDecisionTable from '@/components/data-import-center/detail/AuditDecisionTable.vue'
import AuditDetailHeader from '@/components/data-import-center/detail/AuditDetailHeader.vue'
import AuditOverviewPanel from '@/components/data-import-center/detail/AuditOverviewPanel.vue'
import { getImportAuditDetail } from '@/data/data-import-center/importAuditDetailData'

const route = useRoute()
const isMounted = ref(false)

const detail = computed(() => getImportAuditDetail(route.params.logId))

onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped src="./styles/DataImportAuditDetail.css"></style>
