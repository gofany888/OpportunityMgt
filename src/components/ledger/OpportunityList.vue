<template>
  <div class="opportunity-list">
    <!-- List Header -->
    <div class="opportunity-list-header">
      <div class="opportunity-list-header__lead">
        <a-checkbox />
      </div>
      <div class="opportunity-list-header__check"></div>
      <div class="opportunity-list-header__info">商机标识与生命周期路径</div>
      <div class="opportunity-list-header__responsible">责任主体与填报进度</div>
      <div class="opportunity-list-header__amount text-center">金额(万)</div>
      <div class="opportunity-list-header__status text-center">状态</div>
      <div class="opportunity-list-header__actions">操作</div>
    </div>

    <!-- List Rows -->
    <div class="opportunity-rows">
      <div 
        v-for="proj in filteredOpportunityList" 
        :key="proj.id" 
        class="opportunity-row-group"
      >
        <!-- Parent Row -->
        <div class="opportunity-row is-parent">
          <div class="opportunity-row__lead">
            <a-checkbox />
            <button 
              v-if="proj.expandable"
              class="expand-btn"
              @click="toggleExpand(proj.id)"
            >
              <component :is="isExpanded(proj.id) ? DownOutlined : RightOutlined" />
            </button>
          </div>
          <div class="opportunity-row__check">
            <div class="opportunity-row__status-line is-normal"></div>
          </div>
          
          <!-- Info Column -->
          <div class="opportunity-row__info">
            <div class="opportunity-info-card">
              <div class="opportunity-info-card__icon">
                <div class="proj-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" class="proj-icon-box__svg">
                    <path
                      d="M8.5 7.5V6.5C8.5 5.39543 9.39543 4.5 10.5 4.5H13.5C14.6046 4.5 15.5 5.39543 15.5 6.5V7.5"
                      stroke="currentColor"
                      stroke-width="1.9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      x="5"
                      y="7.5"
                      width="14"
                      height="11"
                      rx="2.8"
                      stroke="currentColor"
                      stroke-width="1.9"
                    />
                    <path
                      d="M12 7.8V18.2"
                      stroke="currentColor"
                      stroke-width="1.9"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="opportunity-info-card__content">
                <div class="opportunity-info-card__meta">
                  <a-typography-text
                    :class="[
                      'proj-id',
                      'tabular-nums',
                      {
                        'is-code': proj.displayTagTone === 'code',
                        'is-self-built': proj.displayTagTone === 'self-built'
                      }
                    ]"
                  >
                    {{ proj.displayTag || proj.id }}
                  </a-typography-text>
                  <a-typography-text type="secondary" class="proj-type">{{ proj.type }}</a-typography-text>
                </div>
                <a-typography-text strong class="opportunity-info-card__title" @click="navigateToDetail(proj.id)">
                  {{ proj.title }}
                </a-typography-text>
              </div>
            </div>
          </div>

          <!-- Responsible Column -->
          <div class="opportunity-row__responsible">
            <div class="responsible-info">
              <div class="responsible-info__main">
                <component :is="proj.owner === '待指派' ? UserAddOutlined : UserOutlined" class="sub-owner-icon" />
                <a-tag
                  v-if="proj.owner === '待指派'"
                  :bordered="false"
                  class="responsible-role responsible-role--pending"
                >
                  {{ proj.owner }}
                </a-tag>
                <a-typography-text v-else strong class="responsible-name">{{ proj.owner }}</a-typography-text>
              </div>
              <a-typography-text type="secondary" class="responsible-dept">{{ proj.dept }}</a-typography-text>
              <div v-if="proj.showUpdate !== false" class="responsible-update tabular-nums">
                <ClockCircleOutlined class="update-icon" />
                最近更新: {{ proj.updateTime }}
              </div>
            </div>
          </div>

          <!-- Amount Column -->
          <div class="opportunity-row__amount tabular-nums text-center">
            <template v-if="proj.achievement">
              <div class="amount-group">
                <a-statistic
                  :value="proj.amount"
                  prefix="¥"
                  :value-style="{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }"
                />
                <div class="amount-progress">
                  <a-progress 
                    :percent="parseFloat(proj.achievement)" 
                    size="small" 
                    :show-info="false"
                    stroke-color="#3b82f6" 
                  />
                  <span class="progress-text">年度实绩达成: {{ proj.achievement }}</span>
                </div>
              </div>
            </template>
            <a-statistic
              v-else
              :value="proj.amount"
              prefix="¥"
              :value-style="{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }"
            />
          </div>

          <!-- Status Column -->
          <div class="opportunity-row__status text-center">
            <a-tag :color="getStatusColor(proj.statusTone)" class="status-badge" :bordered="false">
              {{ proj.status }}
            </a-tag>
          </div>

          <!-- Actions Column -->
          <div class="opportunity-row__actions">
            <a-dropdown 
              v-if="proj.owner === '待指派' || proj.id === opportunityListData[opportunityListData.length - 1].id"
              :trigger="['hover']" 
              placement="bottomLeft"
              :mouseEnterDelay="0.1"
              @visibleChange="(visible) => handleDropdownVisibleChange(visible, proj.id)"
            >
              <template #default>
                <a-button-group class="action-button-group" :class="{ 'is-dropdown-open': isDropdownOpen(proj.id) }">
                  <a-button size="small" class="action-detail-btn" @click="navigateToDetail(proj.id)">
                    详情
                  </a-button>
                  <a-button size="small" class="action-more-btn" @click.stop>
                    <MoreOutlined />
                  </a-button>
                </a-button-group>
              </template>
              <template #overlay>
                <a-menu class="action-dropdown-menu">
                  <a-menu-item key="assign" v-if="proj.owner === '待指派'">
                    <template #icon>
                      <UserAddOutlined />
                    </template>
                    指派项目经理
                  </a-menu-item>
                  <a-menu-item key="link-eis" v-if="proj.id === opportunityListData[opportunityListData.length - 1].id">
                    <template #icon>
                      <LinkOutlined />
                    </template>
                    关联 EIS 数据
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-button-group v-else class="action-button-group">
              <a-button size="small" class="action-detail-btn" @click="navigateToDetail(proj.id)">
                详情
              </a-button>
            </a-button-group>
          </div>
        </div>

        <!-- Sub Items (Expandable) -->
        <div 
          v-if="proj.expandable && isExpanded(proj.id)"
          class="opportunity-sub-rows"
        >
          <div 
            v-for="sub in proj.subItems" 
            :key="sub.id"
            class="opportunity-row is-sub"
            :style="{ '--sub-line-bg': getSubLineGradient(sub.statusTone) }"
          >
            <!-- Checkbox & Indent -->
            <div class="opportunity-row__lead">
              <a-checkbox />
            </div>
            <div class="opportunity-row__check"></div>

            <!-- Sub Info -->
            <div class="opportunity-row__info">
              <div class="opportunity-info-card is-sub">
                <div class="opportunity-info-card__content">
                  <div class="opportunity-info-card__meta">
                    <a-typography-text type="secondary" class="proj-id tabular-nums">子项编码: {{ sub.id }}</a-typography-text>
                  </div>
                  <a-typography-text strong class="opportunity-info-card__title sub-title">
                    {{ sub.title }}
                  </a-typography-text>
                </div>
              </div>
            </div>

            <!-- Sub Responsible -->
            <div class="opportunity-row__responsible">
            <div class="responsible-info is-sub">
              <div class="responsible-info__main">
                <component :is="sub.owner === '待指派' ? UserAddOutlined : UserOutlined" class="sub-owner-icon" />
                  <a-tag
                    v-if="sub.owner === '待指派'"
                    :bordered="false"
                    class="responsible-role responsible-role--pending"
                  >
                    {{ sub.owner }}
                  </a-tag>
                  <a-typography-text v-else strong class="responsible-name sub-name">{{ sub.owner }}</a-typography-text>
              </div>
              <a-typography-text type="secondary" class="responsible-dept">{{ sub.dept }}</a-typography-text>
            </div>
            </div>

            <!-- Sub Amount -->
            <div class="opportunity-row__amount text-center tabular-nums">
              <template v-if="sub.achievement">
                <div class="amount-group">
                  <a-statistic
                    :value="sub.amount"
                    prefix="¥"
                    :value-style="{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }"
                  />
                  <div class="amount-progress">
                    <a-progress 
                      :percent="parseFloat(sub.achievement)" 
                      size="small" 
                      :show-info="false"
                      stroke-color="#3b82f6" 
                    />
                    <span class="progress-text">年度实绩达成: {{ sub.achievement }}</span>
                  </div>
                </div>
              </template>
              <a-statistic
                v-else
                :value="sub.amount"
                prefix="¥"
                :value-style="{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }"
              />
            </div>

            <!-- Sub Status -->
            <div class="opportunity-row__status text-center">
              <a-tag :color="getStatusColor(sub.statusTone)" class="status-badge is-sub" :bordered="false">
                <component :is="sub.statusTone === 'warning' ? InfoCircleOutlined : UserAddOutlined" v-if="sub.statusTone !== 'success'" />
                {{ sub.status }}
              </a-tag>
            </div>

            <!-- Sub Actions -->
            <div class="opportunity-row__actions">
              <a-dropdown 
                v-if="sub.owner === '待指派'"
                :trigger="['hover']" 
                placement="bottomLeft"
                :mouseEnterDelay="0.1"
                @visibleChange="(visible) => handleDropdownVisibleChange(visible, sub.id)"
              >
                <template #default>
                  <a-button-group class="action-button-group" :class="{ 'is-dropdown-open': isDropdownOpen(sub.id) }">
                    <a-button size="small" class="action-detail-btn" @click="navigateToDetail(sub.id)">
                      详情
                    </a-button>
                    <a-button size="small" class="action-more-btn" @click.stop>
                      <MoreOutlined />
                    </a-button>
                  </a-button-group>
                </template>
                <template #overlay>
                  <a-menu class="action-dropdown-menu">
                    <a-menu-item key="assign">
                      <template #icon>
                        <UserAddOutlined />
                      </template>
                      指派项目经理
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <a-button-group v-else class="action-button-group">
                <a-button size="small" class="action-detail-btn" @click="navigateToDetail(sub.id)">
                  详情
                </a-button>
              </a-button-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  DownOutlined, 
  RightOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  LinkOutlined
} from '@ant-design/icons-vue'
import { opportunityListData } from '@/data/ledgerData'

const props = defineProps({
  pendingFilterActive: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const expandedRows = ref(['P-100239'])
const openDropdowns = ref(new Set())

const filteredOpportunityList = computed(() => {
  if (!props.pendingFilterActive) return opportunityListData

  return opportunityListData.filter((proj) => {
    if (proj.owner === '待指派') return true
    return (proj.subItems || []).some((sub) => sub.owner === '待指派')
  })
})

const toggleExpand = (id) => {
  const index = expandedRows.value.indexOf(id)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(id)
  }
}

const isExpanded = (id) => expandedRows.value.includes(id)

const handleDropdownVisibleChange = (visible, id) => {
  if (visible) {
    openDropdowns.value.add(id)
  } else {
    openDropdowns.value.delete(id)
  }
}

const isDropdownOpen = (id) => openDropdowns.value.has(id)

const navigateToDetail = (id) => {
  const routeUrl = router.resolve({ path: '/detail' })
  window.open(routeUrl.href, '_blank')
}

const getStatusColor = (tone) => {
  const colors = {
    success: 'success',
    warning: 'error',
    info: 'warning'
  }
  return colors[tone] || 'default'
}

const getSubLineGradient = (tone) => {
  const gradients = {
    success: 'linear-gradient(180deg, #9ddcc2 0%, #66c18c 100%)',
    warning: 'linear-gradient(180deg, #ffb48c 0%, #f97316 100%)',
    info: 'linear-gradient(180deg, #ffdba6 0%, #d46b08 100%)'
  }
  return gradients[tone] || 'linear-gradient(180deg, #d9e6ff 0%, #c4d8ff 100%)'
}
</script>

<style scoped src="./styles/OpportunityList.css"></style>
