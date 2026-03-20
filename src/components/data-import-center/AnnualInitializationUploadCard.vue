<template>
  <a-card :bordered="false" class="annual-init-upload-card">
    <div class="annual-init-upload-card__dragger">
      <component :is="iconMap[uploadCard.watermarkIcon]" class="annual-init-upload-card__watermark" />

      <div class="annual-init-upload-card__icon-shell">
        <component :is="iconMap[uploadCard.mainIcon]" class="annual-init-upload-card__icon" />
      </div>

      <a-typography-title :level="2" class="annual-init-upload-card__title">
        {{ uploadCard.title }}
      </a-typography-title>

      <a-typography-paragraph class="annual-init-upload-card__desc">
        {{ uploadCard.descriptionPrefix }}
        <span class="annual-init-upload-card__desc-highlight">
          {{ uploadCard.descriptionHighlight }}
        </span>
        {{ uploadCard.descriptionSuffix }}
      </a-typography-paragraph>

      <a-button
        type="primary"
        size="large"
        class="annual-init-upload-card__button"
        @click.stop="openFilePicker"
      >
        {{ uploadCard.buttonText }}
      </a-button>

      <div class="annual-init-upload-card__helper">{{ uploadCard.helperText }}</div>
      <input
        ref="fileInputRef"
        type="file"
        class="annual-init-upload-card__input"
        accept=".xlsx,.csv"
        @change="handleFileChange"
      />
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { CloudUploadOutlined, FileAddOutlined, FileTextOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['select'])
defineProps({
  uploadCard: {
    type: Object,
    required: true,
  },
})

const iconMap = {
  CloudUploadOutlined,
  FileAddOutlined,
  FileTextOutlined,
}

const fileInputRef = ref(null)

const openFilePicker = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (event) => {
  const [file] = event.target.files || []
  if (!file) return

  emit('select', file)
  event.target.value = ''
}
</script>

<style scoped src="./styles/AnnualInitializationUploadCard.css"></style>
