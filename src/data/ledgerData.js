/**
 * 台账中心 - 商机管控工作台数据
 */

export const ledgerHeaderConfig = {
    title: '商机管控工作台',
    alertText: '仅展示年度活跃商机',
    searchPlaceholder: '搜索项目、编号或负责人...',
    badges: [
        { label: '待指派项目经理', count: '02', type: 'pending' }
    ]
}

export const opportunityTabs = [
    { key: 'all', label: '全部' },
    {
        key: 'discovery',
        label: '商机发现',
        subStages: ['初步接触', '开发交互']
    },
    {
        key: 'confirmed',
        label: '商机确立',
        subStages: ['需求确认', '预算确认']
    },
    {
        key: 'bidding',
        label: '立项环节',
        subStages: ['立项方案确认', '立项可研', '立项批复']
    },
    {
        key: 'procurement',
        label: '采购环节',
        subStages: ['采购需求', '采购方案', '公告发布', '文件投递截止及递交', '候选人公示', '采购结果', '订单生成']
    },
    { key: 'contract', label: '合同签署' },
    { key: 'project-init', label: '公司立项' },
    { key: 'conversion', label: '商机转化' }
]

export const opportunityListData = [
    {
        id: '编码:FF2023083490',
        displayTag: '编码:FF2023083490',
        displayTagTone: 'code',
        title: '某省电力数字化转型二期总集成项目',
        type: '采购环节 > 公开招标',
        owner: '张销售',
        dept: '云运营产品部',
        updateTime: '1小时前',
        showUpdate: true,
        amount: '2,400.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: true,
        subItems: [
            {
                id: 'FF2023083490-01',
                title: '软件开发分项',
                owner: '李经理',
                dept: '云运营产品部',
                amount: '1,050.00',
                forecast: '1,050.00',
                achievement: '37.5%',
                status: '审计正常',
                statusTone: 'success'
            },
            {
                id: 'FF2023083490-02',
                title: '硬件集成分项',
                owner: '待指派',
                dept: '云运营产品部',
                amount: '0.00',
                forecast: '800.00',
                achievement: '0%',
                status: '待指派项目经理',
                statusTone: 'info'
            }
        ]
    },
    {
        id: 'P-100240',
        displayTag: '自建商机',
        displayTagTone: 'self-built',
        title: '某市智慧政务大屏展示系统',
        type: '立项环节 > 方案确认',
        owner: '王经理',
        dept: '云调度产品部',
        updateTime: '2小时前',
        showUpdate: true,
        amount: '850.00',
        achievement: '68.2%',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    }
]

export const ledgerFooterData = {
    title: '年度核心资产核算',
    stats: [
        { label: '当前活跃商机数', value: '2', unit: '个' },
        { label: '活跃资产总规模', value: '1.66', unit: '亿元' }
    ],
    syncTime: '03-04 15:44:21'
}
