/**
 * 报表中心页面数据
 * 报表卡片列表配置
 */

/** @type {Array<{key: string, title: string, description: string, icon: string, tag: string, route?: string, disabled?: boolean}>} */
export const reportCards = [
    {
        key: 'business-opportunity',
        title: '商机经营对账汇总',
        description: '提供经营侧规模、财务口径预算、PM自建规模及差异率等全方位对账分析。',
        icon: 'fund-outlined',
        tag: '管理报表',
        route: '/report/business-opportunity',
    },
    {
        key: 'profit-loss',
        title: '项目损益预估看板',
        description: '多维度的项目成本、收入利润率监控。',
        icon: 'pie-chart-outlined',
        tag: '开发中',
        disabled: true,
    },
    {
        key: 'human-resource',
        title: '人力资源工时报表',
        description: '各部门研发人员工时投入及效能透视。',
        icon: 'team-outlined',
        tag: '开发中',
        disabled: true,
    },
]
