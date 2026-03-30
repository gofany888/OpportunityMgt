<template>
  <div class="summary-cards-container">
    <div 
      v-for="card in summaryCards" 
      :key="card.key"
      class="summary-card-wrapper"
    >
      <a-card :bordered="false" class="eis-summary-card">
        <div class="eis-summary-card__body">
          <div 
            class="eis-summary-card__icon" 
            :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
          >
            <component :is="getIconComponent(card.icon)" class="eis-summary-card__icon-svg" />
          </div>
          <div class="eis-summary-card__copy">
            <div class="eis-summary-card__title">{{ card.title }}</div>
            <div class="eis-summary-card__value-row">
              <a-statistic 
                :value="card.value" 
                :value-style="{ color: getColorCode(card.color), fontSize: '24px', fontWeight: 600 }" 
                class="num-font" 
              />
              <span class="eis-summary-card__unit">{{ card.unit }}</span>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { 
    DollarCircleOutlined, 
    CalculatorOutlined, 
    ShoppingCartOutlined, 
    FileTextOutlined, 
    NodeIndexOutlined 
} from '@ant-design/icons-vue'
import { summaryCards } from '@/data/eisAuditData'

const getIconComponent = (iconName) => {
    const map = {
        'dollar-circle-outlined': DollarCircleOutlined,
        'calculator-outlined': CalculatorOutlined,
        'shopping-cart-outlined': ShoppingCartOutlined,
        'file-text-outlined': FileTextOutlined,
        'node-index-outlined': NodeIndexOutlined
    }
    return map[iconName]
}

const getColorCode = (color) => {
    const map = {
        'red': '#ff4d4f',
        'blue': '#1677ff',
        'purple': '#722ed1'
    }
    return map[color] || '#333'
}
</script>

<style scoped src="./styles/EISSummaryCards.css"></style>
