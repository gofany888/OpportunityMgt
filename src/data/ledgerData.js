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
        procurement: '1,760.00',
        grossProfit: '640.00',
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
                procurement: '720.00',
                grossProfit: '330.00',
                status: '审计正常',
                statusTone: 'success'
            },
            {
                id: 'FF2023083490-02',
                title: '硬件集成分项',
                owner: '待指派',
                dept: '云运营产品部',
                amount: '0.00',
                procurement: '0.00',
                grossProfit: '0.00',
                status: '待指派',
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
        procurement: '530.00',
        grossProfit: '320.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: '编码:FF2023101188',
        displayTag: '编码:FF2023101188',
        displayTagTone: 'code',
        title: '某省国资云算力资源池扩容项目',
        type: '合同签署 > 内部会签',
        owner: '陈销售',
        dept: '政企交付事业部',
        updateTime: '今天 09:40',
        showUpdate: true,
        amount: '1,680.00',
        procurement: '1,140.00',
        grossProfit: '540.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: 'P-100387',
        displayTag: '自建商机',
        displayTagTone: 'self-built',
        title: '某地市应急指挥一体化平台升级项目',
        type: '商机确立 > 预算确认',
        owner: '赵经理',
        dept: '智慧城市产品部',
        updateTime: '今天 08:15',
        showUpdate: true,
        amount: '960.00',
        procurement: '610.00',
        grossProfit: '350.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: '编码:FF2023115602',
        displayTag: '编码:FF2023115602',
        displayTagTone: 'code',
        title: '某能源集团工业互联网安全加固项目',
        type: '采购环节 > 候选人公示',
        owner: '刘销售',
        dept: '工业互联网事业部',
        updateTime: '今天 07:52',
        showUpdate: true,
        amount: '1,220.00',
        procurement: '870.00',
        grossProfit: '350.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: 'P-100412',
        displayTag: '自建商机',
        displayTagTone: 'self-built',
        title: '某高校数据中台与统一门户建设项目',
        type: '立项环节 > 立项可研',
        owner: '待指派',
        dept: '教育行业拓展部',
        updateTime: '今天 07:20',
        showUpdate: true,
        amount: '430.00',
        procurement: '280.00',
        grossProfit: '150.00',
        status: '待指派',
        statusTone: 'info',
        expandable: false
    },
    {
        id: '编码:FF2024010277',
        displayTag: '编码:FF2024010277',
        displayTagTone: 'code',
        title: '某省卫健委区域影像云平台扩建项目',
        type: '采购环节 > 采购结果',
        owner: '孙经理',
        dept: '医疗行业事业部',
        updateTime: '昨天 18:46',
        showUpdate: true,
        amount: '2,060.00',
        procurement: '1,480.00',
        grossProfit: '580.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: 'P-100438',
        displayTag: '自建商机',
        displayTagTone: 'self-built',
        title: '某制造集团 AI 质检与产线协同项目',
        type: '商机发现 > 开发交互',
        owner: '何销售',
        dept: '智能制造方案部',
        updateTime: '昨天 16:12',
        showUpdate: true,
        amount: '720.00',
        procurement: '450.00',
        grossProfit: '270.00',
        status: '重点跟踪',
        statusTone: 'warning',
        expandable: false
    },
    {
        id: '编码:FF2024023319',
        displayTag: '编码:FF2024023319',
        displayTagTone: 'code',
        title: '某机场数字孪生运行监控平台项目',
        type: '公司立项 > 评审中',
        owner: '周经理',
        dept: '交通行业事业部',
        updateTime: '昨天 15:03',
        showUpdate: true,
        amount: '1,340.00',
        procurement: '930.00',
        grossProfit: '410.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    },
    {
        id: 'P-100451',
        displayTag: '自建商机',
        displayTagTone: 'self-built',
        title: '某园区综合能源管理云平台续建项目',
        type: '商机转化 > 方案收口',
        owner: '吴经理',
        dept: '双碳解决方案部',
        updateTime: '昨天 11:28',
        showUpdate: true,
        amount: '590.00',
        procurement: '360.00',
        grossProfit: '230.00',
        status: '审计正常',
        statusTone: 'success',
        expandable: false
    }
]

export const ledgerFooterData = {
    title: '年度核心资产核算',
    stats: [
        { label: '当前活跃商机数', value: '9', unit: '个' },
        { label: '活跃资产总规模', value: '10.25', unit: '亿元' }
    ],
    syncTime: '03-04 15:44:21'
}
