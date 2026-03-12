# B端企业级页面最佳设计规范 (Modern Soft Enterprise)

这份文档总结了对于复杂业务数据页面（如财务报表、经营看板等）重构中得出的核心设计规范与最佳实践。旨在平衡高密度数据阅读的严谨性与现代 B 端系统的亲和力。

## 1. 全局设计基调：冷静、专业、透气
*   **企业级底色与卡片**：放弃过度的渐变色与抢眼修饰。使用标准的后台冷灰 (`#f0f2f5`) 作为页面大底色，搭配纯白 (`#ffffff`) 的悬浮卡片。通过克制的弥散阴影 (`box-shadow`) 建立页面的立体层级感。
*   **现代软和风 (Modern Soft)**：摒弃传统的锐利直角。全局核心的承载容器（如大卡片、表格外部包裹块）统一使用 `16px` 大圆角（例如 Tailwind 的 `rounded-2xl`），而内部小组件、标签采用适中的 `8px` (`rounded-lg`)。大圆角能极大削弱复杂数据的心理压迫感，呈现类似 Notion、飞书等现代 SaaS 产品的无压交互体验。

## 2. 表格视觉结构：去线化与横向引导
*   **彻底打破“牢笼感” (去外框线)**：在现代企业级大表格中，**坚决去除表格最外侧的左右实线边框**（包括表头、数据行、总计行）。让表格两侧“透气”，避免数据被框死。
*   **垂直业务域划分**：复杂的对账表格往往需要横跨多个口径（如经营侧、推盘侧、差异分析侧）。对于表头 (`thead`)，可使用柔和的浅色块背景（如极浅绿、浅蓝、浅红）进行逻辑分区，结合对应的色彩基调约束当前业务块。
*   **水平视线引导**：表体 (`tbody`) 数据采用轻量的横向底部分界线（`border-b`)，辅以整行 hover 状态的淡色遮罩（如 20% 透明度的同色系背景），引导视线从左向右平滑扫视。切忌在中间加入大量全框实线。

## 3. 表脚 (Footer) 总计行的稳固感
*   **双线兜底 (Border-Y)**：作为表格数据的“终点结账行”，不需要左右侧封口，但必须使用带有物理切割感的上下加粗边框 (如 `border-y-[3px]`) 对表格进行收尾承托，防止视觉下流。
*   **高对比度提权**：总计行是结论所在。需加深该行的整体底色，并通过字号放大 (`text-lg`) 和字重加粗 (`font-bold`) 从上方密密麻麻的常规数据中“跳”出来，做到一眼抓取结论。

## 4. 极致的数据对齐：等宽数字字体
*   高精度的对账表，数字必须上下能够对齐阅读。全局运用**等宽数字排版特（Tabular Nums）**。
*   **实现方案**：通过 CSS 定义 `font-variant-numeric: tabular-nums;` 让任何西文字体（例如 Inter 或 Helvetica）呈现小数点和个位、十位严格对齐的排版，这对于千万、百万级别的资金校对至关重要。

## 5. Ant Design Vue 组件优先原则

*   **能用 antdv 就用 antdv**：所有 UI 元素优先使用 Ant Design Vue 4.x 组件，禁止手写原生 HTML 再加 Tailwind 类名来平替已有的 antdv 组件。
*   **常用组件映射表**：

    | 场景 | 使用 antdv 组件 | 禁止做法 |
    |------|----------------|---------|
    | 页面布局 | `a-layout` / `a-layout-sider` / `a-layout-header` / `a-layout-content` | 手写 `<aside>` / `<header>` + Tailwind |
    | 侧边栏导航 | `a-menu` / `a-menu-item`（支持 `selected-keys` 自动高亮） | 手写 `<a>` / `<router-link>` 列表 |
    | 按钮 | `a-button`（支持 `type`、`:icon`、`loading` 等） | `<button class="...">` |
    | 标签/徽章 | `a-tag`（`color` 属性）/ `a-badge` | 手写 `<span>` + 背景色 |
    | 数据统计 | `a-statistic`（内置 `prefix`、`suffix`、`value-style`） | 手写 `<div>` 拼数字 |
    | 数据表格 | `a-table`（`columns.children` 分组表头、`#summary` 总计行） | 原生 `<table>` |
    | 搜索框 | `a-input`（`prefix` / `suffix` 插槽） | `<input>` + 图标 |
    | 提示/警告 | `a-alert`（`type="error/warning/info"`） | 手写红色 div |
    | 间距 | `a-space`（`size` 属性） | 手写 `gap` |
    | 分割线 | `a-divider` | `<hr>` 或 `border-b` |
    | 文字排版 | `a-typography-title` / `a-typography-text` / `a-typography-paragraph` | 原生 `<h1>` ~ `<p>` |
    | 栅格布局 | `a-row` / `a-col`（`:gutter`、`:xs`/`:sm`/`:lg`/`:xl` 响应式） | Tailwind `grid` |
    | 卡片容器 | `a-card`（`:bordered="false"`、`#title` 插槽） | 手写 `<div class="bg-white rounded...">` |
    | 头像 | `a-avatar` | `<img class="rounded-full">` |
    | 图标 | `@ant-design/icons-vue`（按需 import） | Font Awesome / 手写 SVG |

*   **a-table 使用规范**：
    *   分组表头用 `columns` 中的 `children` 嵌套，而非手写 `rowspan` / `colspan`。
    *   单元格差异化样式用 `customHeaderCell` / `customCell` 回调返回内联 `style`。
    *   单元格内容定制用 `#bodyCell="{ column, record }"` 插槽按 `column.dataIndex` 分发。
    *   总计行用 `#summary` 插槽 + `a-table-summary-row` + `a-table-summary-cell`。
    *   行点击用 `customRow` 返回 `{ onClick }` 而非在 `<tr>` 上绑定事件。
    *   不需要横向滚动时**禁止**设置 `scroll: { x }` 和 `fixed`。

## 6. 中文排版反模式（必须避免）

*   **禁止 `italic`（斜体）**：中文字形未设计斜体变体，CSS `font-style: italic` 只会让字形产生不自然的错切变形。
*   **禁止 `letter-spacing`（字间距）**：中文字符本身已含内建间距，额外的 `tracking-widest` / `tracking-wide` 会破坏阅读节奏。
*   **禁止 `uppercase` / `lowercase`**：仅对拉丁字母有效，对中文无意义且易造成混淆。
*   **字号规范**：页面标题 `16px`、正文 `14px`（antdv 默认）、辅助说明 `13px`、分组标签/脚注 `12px`。

## 7. 数据分离与文件结构

*   **所有静态/Mock 数据必须外置**：将页面中的硬编码数据、菜单配置、表格列定义等提取到 `src/data/` 目录下的独立 JS 文件中。
*   **命名约定**：`{页面名}Data.js`，如 `menuData.js`、`dashboardData.js`、`reportCenterData.js`、`businessOpportunityData.js`。
*   **导出格式**：使用具名 `export const`，禁止 `export default`，便于 tree-shaking 和按需引用。
*   **未来扩展**：数据文件格式与后端 API 返回结构保持一致，方便后续从 mock 切换为真实接口调用。

## 8. 布局架构：Teleport 动态注入

*   **全局 Header 的动态内容**：`BaseLayout.vue` 的 Header 中预置两个 Teleport 锚点：
    *   `#header-title-portal` — 标题区（返回按钮 + 页面标题 + 状态标签）
    *   `#header-actions-portal` — 操作区（按钮组）
*   **子页面注入方式**：各子页面通过 `<Teleport to="#header-title-portal">` 将自己的标题/操作注入全局 Header，需使用 `v-if="isMounted"` 确保目标DOM已就绪。
*   **路由 meta 配置**：在 `router/index.js` 中为每个路由设置 `meta.title`、`meta.customTitle`、`meta.customActions`，`BaseLayout.vue` 根据 meta 决定是否显示默认标题/操作。

## 9. 间距与设计 Token

*   **间距倍数**：所有间距（margin、padding、gap）严格使用 **8px 倍数**：`8`、`12`（1.5倍，仅限紧凑场景）、`16`、`24`、`32`、`40`。
*   **色彩 Token**：
    *   主色：`#1677ff`（antdv 标准蓝）
    *   页面底色：`#f0f2f5`
    *   卡片：`#ffffff`
    *   成功/经营类：`#52c41a` / `#f6ffed` / `#389e0d`
    *   警告/关注类：`#fa8c16` / `#fff7e6`
    *   危险/差异类：`#ff4d4f` / `#fff2f0` / `#cf1322`
    *   信息/预测类：`#1677ff` / `#e6f4ff` / `#0958d9`
*   **卡片圆角**：外层大容器 `16px`（`border-radius: 16px`），内部小组件 `8px`。
*   **阴影层级**：统一使用克制的三层弥散阴影：
    ```css
    box-shadow: 0 1px 2px rgba(0,0,0,0.03),
                0 1px 6px -1px rgba(0,0,0,0.02),
                0 2px 4px rgba(0,0,0,0.02);
    ```

## 10. CSS 样式分离 (关注点分离)

*   **隔离通用与个性样式**：为了避免 Vue 单文件组件 (SFC) 代码过于臃肿，以及遵循关注点分离的原则，所有的业务组件（尤其是重型报表表格、卡片面板等）的局部样式必须抽离。
*   **提取规则**：将原本写在 `.vue` 文件内部的 `<style scoped>...</style>` 块里的 CSS 样式，完整提取到该组件同级目录下的 `styles/` 文件夹中。
*   **命名规范**：提取的 css 文件名应与其对应的 Vue 组件名保持绝对一致。例如 `DiffTable.vue` 对应的样式文件必须为 `styles/DiffTable.css`。
*   **引入方式**：在 Vue 组件中，通过 `src` 属性以外链的方式引入这个局部作用域样式文件：
    ```vue
    <style scoped src="./styles/ComponentName.css"></style>
    ```
*   **Tailwind 结合**：对于轻量级的布局、间距、颜色调整，依然鼓励在 `<template>` 中直接使用纯 Tailwind CSS 工具类。只有当遇到无法用 Tailwind 简洁表达的复杂复合选择器（如对 antdv 第三方组件库深层 DOM 节点 `:deep()` 的覆盖重写、复杂的伪类交互态、特化的动画定义等），才必须提取进入这套独立的 `.css` 文件规范中。直接使用纯 Tailwind 的组件不需要创建空的 `.css` 文件和 `<style>` 标签。
