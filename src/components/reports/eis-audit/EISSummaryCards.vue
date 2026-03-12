<template>
  <a-row :gutter="16" class="mb-6" type="flex">
    <a-col :flex="1" v-for="card in summaryCards" :key="card.key">
      <a-card 
        :bordered="false"
        class="rounded-[20px] card-shadow hover:-translate-y-1 transition-transform duration-300 h-full"
        :bodyStyle="{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }"
      >
        <div>
          <div class="text-[13px] text-gray-500 mb-2 font-medium">{{ card.title }}</div>
          <div class="flex items-baseline gap-1">
            <span v-if="card.trend === 'up' && card.value > 0" :class="`text-${card.color}-500 text-lg font-bold mr-1`">+</span>
            <span v-if="card.trend === 'down' && card.value > 0" :class="`text-${card.color}-500 text-lg font-bold mr-1`">-</span>
            
            <a-statistic 
              :value="card.value" 
              :value-style="{ color: getColorCode(card.color), fontSize: '28px', fontWeight: 'bold', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.5px' }" 
              class="num-font !flex !items-baseline"
            />
            <span class="text-[13px] text-gray-400 font-medium ml-1">{{ card.unit }}</span>
          </div>
        </div>
        
        <div 
          class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
        >
          <component :is="getIconComponent(card.icon)" class="text-xl" />
        </div>
      </a-card>
    </a-col>
  </a-row>
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
