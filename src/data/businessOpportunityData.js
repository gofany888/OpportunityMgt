/**
 * 商机经营对账汇总报表 - 数据文件
 * 包含指标卡片、对账明细表、底部信息等全部 mock 数据
 */

/** 页面头部配置 */
export const pageHeaderConfig = {
    title: '商机经营对账汇总报表',
    backRoute: '/report',
    status: '正常运行',
}

/** 指标概览卡片 */
export const metricCards = [
    {
        key: 'managed-total',
        label: '经营侧总规模',
        value: '17,580',
        unit: '万',
        prefix: '¥',
        icon: 'fund-outlined',
        iconColor: '#52c41a',
        iconBg: '#f6ffed',
        footer: '核心业务经营核算数据',
    },
    {
        key: 'finance-total',
        label: '财务侧总口径',
        value: '17,029',
        unit: '万',
        prefix: '¥',
        icon: 'database-outlined',
        iconColor: '#1677ff',
        iconBg: '#e6f4ff',
        footer: '财务系统录入推盘数据',
    },
    {
        key: 'pm-self-built',
        label: 'PM自建规模',
        value: '1,860',
        unit: '万',
        prefix: '¥',
        icon: 'edit-outlined',
        iconColor: '#fa8c16',
        iconBg: '#fff7e6',
        dot: '#fa8c16',
        footerType: 'badge',
        badge: '高关注',
        badgeColor: '#fa8c16',
        footer: '涉及 24 个项目项',
    },
    {
        key: 'diff-total',
        label: '对账累计差异',
        value: '551',
        unit: '万',
        prefix: '¥',
        valueColor: '#ff4d4f',
        icon: 'warning-outlined',
        iconColor: '#ff4d4f',
        iconBg: '#fff2f0',
        footerType: 'rate',
        rate: '3.1%',
    },
]

/** 对账明细表数据 */
export const diffTableData = [
    {
        org: '交付服务部',
        managed: { count: '53', selfBuiltCount: '3', income: '3,708', procurement: '1,697', profit: '2,072' },
        forecast: { count: '50', income: '3,645', procurement: '1,697', profit: '1,988' },
        diff: { count: 3, income: 63, procurement: '0', profit: 84 },
    },
    {
        org: '生态业务部',
        managed: { count: '48', selfBuiltCount: '5', income: '6,247', procurement: '1,890', profit: '4,441' },
        forecast: { count: '45', income: '6,144', procurement: '1,866', profit: '4,343' },
        diff: { count: 3, income: 104, procurement: '24', profit: 99 },
    },
    {
        org: '智算应用产品部',
        managed: { count: '19', selfBuiltCount: '1', income: '1,313', procurement: '0', profit: '1,313' },
        forecast: { count: '18', income: '1,278', procurement: '0', profit: '1,278' },
        diff: { count: 1, income: 35, procurement: '0', profit: 35 },
    },
    {
        org: '云业务集成创新产品部',
        managed: { count: '15', selfBuiltCount: '2', income: '1,511', procurement: '243', profit: '1,268' },
        forecast: { count: '14', income: '1,388', procurement: '168', profit: '1,220' },
        diff: { count: 1, income: 123, procurement: '75', profit: 48 },
    },
    {
        org: '云运营产品部',
        managed: { count: '87', selfBuiltCount: '12', income: '4,604', procurement: '1,404', profit: '3,739' },
        forecast: { count: '83', income: '4,385', procurement: '1,394', profit: '3,520' },
        diff: { count: 4, income: 219, procurement: '10', profit: 219 },
    },
    {
        org: '云MSP能力中心',
        managed: { count: '5', selfBuiltCount: '1', income: '196', procurement: '0', profit: '246' },
        forecast: { count: '4', income: '189', procurement: '0', profit: '210' },
        diff: { count: 1, income: 8, procurement: '0', profit: 36 },
    },
]

/** 总计行 */
export const diffTableTotal = {
    org: '全局对账汇总总计',
    managed: { count: '227', selfBuiltCount: '24', income: '17,580', procurement: '5,233', profit: '13,079' },
    forecast: { count: '214', income: '17,029', procurement: '5,125', profit: '12,559' },
    diff: { count: 13, income: 551, procurement: '109', profit: 520 },
}

/** 底部信息 */
export const footerInfoData = {
    legends: [
        { type: 'dot', color: '#fa8c16', text: 'PM自建商机标识' },
        { type: 'link', color: '#1677ff', icon: 'link-outlined', text: '销售侧数据已全量联通核对' },
    ],
    warning: '自建暗坑存在系统外流失风险，建议在次月前完成库位映射',
}
