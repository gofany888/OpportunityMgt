<template>
  <a-card :bordered="false" class="annual-init-conflict-card">
    <div class="annual-init-conflict-card__banner">
      <div class="annual-init-conflict-card__banner-main">
        <div class="annual-init-conflict-card__alert-shell">
          <SafetyCertificateOutlined />
        </div>
        <div class="annual-init-conflict-card__banner-copy">
          <div class="annual-init-conflict-card__banner-title">
            {{ annualInitializationVersionConflict.bannerTitle }}
          </div>
          <div
            v-if="annualInitializationVersionConflict.bannerSubtitle"
            class="annual-init-conflict-card__banner-subtitle"
          >
            {{ annualInitializationVersionConflict.bannerSubtitle }}
          </div>
        </div>
      </div>
      <a-button
        type="text"
        shape="circle"
        class="annual-init-conflict-card__close"
        @click="emit('close')"
      >
        <CloseOutlined />
      </a-button>
    </div>

    <div class="annual-init-conflict-card__body">
      <p class="annual-init-conflict-card__summary">
        {{ annualInitializationVersionConflict.summary.prefix }}
        <span>{{ annualInitializationVersionConflict.summary.highlight }}</span>
        {{ annualInitializationVersionConflict.summary.suffix }}
      </p>

      <div class="annual-init-conflict-card__compare">
        <div class="annual-init-conflict-card__version-card is-latest">
          <div class="annual-init-conflict-card__version-title">
            {{ annualInitializationVersionConflict.latestBaseline.title }}
          </div>
          <div class="annual-init-conflict-card__version-time">
            {{ annualInitializationVersionConflict.latestBaseline.time }}
          </div>
          <a-tag class="annual-init-conflict-card__tag is-latest">
            {{ annualInitializationVersionConflict.latestBaseline.tag }}
          </a-tag>
        </div>

        <div class="annual-init-conflict-card__compare-center">
          <HistoryOutlined />
        </div>

        <div class="annual-init-conflict-card__version-card is-outdated">
          <div class="annual-init-conflict-card__version-title">
            {{ annualInitializationVersionConflict.outdatedSource.title }}
          </div>
          <div class="annual-init-conflict-card__version-time is-outdated">
            {{ annualInitializationVersionConflict.outdatedSource.time }}
          </div>
          <a-tag class="annual-init-conflict-card__tag is-outdated">
            {{ annualInitializationVersionConflict.outdatedSource.tag }}
          </a-tag>
        </div>
      </div>

      <div class="annual-init-conflict-card__notice">
        <div class="annual-init-conflict-card__notice-title">
          <InfoCircleOutlined />
          <span>{{ annualInitializationVersionConflict.noticeTitle }}</span>
        </div>
        <ul class="annual-init-conflict-card__notice-list">
          <li
            v-for="item in annualInitializationVersionConflict.noticeItems"
            :key="item.label"
            :class="[
              'annual-init-conflict-card__notice-item',
              { 'is-positive': item.label === '数据权属隔离' },
            ]"
          >
            <span class="annual-init-conflict-card__notice-dot" />
            <div>
              <strong>{{ item.label }}：</strong>{{ item.text }}
            </div>
          </li>
        </ul>
      </div>

      <a-button
        danger
        type="primary"
        size="large"
        block
        class="annual-init-conflict-card__primary"
        @click="emit('close')"
      >
        <SyncOutlined />
        <span>{{ annualInitializationVersionConflict.primaryActionText }}</span>
      </a-button>

      <a-button type="link" class="annual-init-conflict-card__secondary" @click="emit('close')">
        {{ annualInitializationVersionConflict.secondaryActionText }}
      </a-button>
    </div>
  </a-card>
</template>

<script setup>
import {
  CloseOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { annualInitializationVersionConflict } from '@/data/data-import-center/annualInitializationData'

const emit = defineEmits(['close'])
</script>

<style scoped src="./styles/AnnualInitializationVersionConflict.css"></style>
