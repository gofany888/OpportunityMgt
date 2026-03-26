/**
 * 侧边栏菜单配置数据
 * 集中管理导航菜单结构，便于后续动态化和权限控制
 */

/**
 * 菜单分组配置
 * @typedef {Object} MenuGroup
 * @property {string} key - 分组唯一标识
 * @property {string} label - 分组名称
 * @property {Array} items - 菜单项列表
 */

/** @type {MenuGroup[]} */
export const menuGroups = [
    {
        key: 'cockpit',
        label: '经营驾驶舱',
        items: [
            { key: '/', label: '工作台首页', icon: 'appstore-outlined' },
        ],
    },
    {
        key: 'ledger',
        label: '商机台帐',
        items: [
            { key: '/ledger', label: '台账中心', icon: 'profile-outlined' },
            { key: '/approval', label: '审批待办中心', icon: 'check-square-outlined', disabled: true },
        ],
    },
    {
        key: 'audit',
        label: '审计报表',
        items: [
            { key: '/report', label: '报表中心', icon: 'bar-chart-outlined' },
            { key: '/report/eis-audit', label: 'EIS 差异对标', icon: 'safety-certificate-outlined' },
            { key: '/snapshot', label: '历史快照溯源', icon: 'history-outlined', disabled: true },
        ],
    },
    {
        key: 'data-hub',
        label: '数据中枢',
        items: [
            { key: '/sync', label: '数据导入中心', icon: 'setting-outlined' },
        ],
    },
]

/** 底部菜单项 */
export const bottomMenuItems = [
    { key: '/settings', label: '策略参数配置', icon: 'sliders-outlined', disabled: true },
]

/** 应用信息 */
export const appInfo = {
    name: '运营管理平台',
    shortName: '运管',
}
