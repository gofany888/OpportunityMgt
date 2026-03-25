/**
 * EIS 差异查询与审计中心 - 数据配置
 */

// 顶部 5 个汇总指标卡片数据
export const summaryCards = [
    {
        key: 'totalAmount',
        title: '累计总额偏差',
        value: 2450,
        unit: '万',
        trend: 'up',
        color: 'red', // text-[#ff4d4f]
        icon: 'dollar-circle-outlined',
        iconBg: '#fff2f0',
        iconColor: '#ff4d4f'
    },
    {
        key: 'profit',
        title: '毛利偏差总额',
        value: 685,
        unit: '万',
        trend: 'up',
        color: 'red',
        icon: 'calculator-outlined',
        iconBg: '#fff2f0',
        iconColor: '#ff4d4f'
    },
    {
        key: 'procurement',
        title: '采购金额偏差',
        value: 312,
        unit: '万',
        trend: 'up',
        color: 'blue', // text-[#1677ff] - 按照设计图显示为蓝色 (+)
        icon: 'shopping-cart-outlined',
        iconBg: '#e6f4ff',
        iconColor: '#1677ff'
    },
    {
        key: 'invoice',
        title: '开票总额偏差',
        value: 156,
        unit: '万',
        trend: 'up',
        color: 'blue', // text-[#1677ff]
        icon: 'file-text-outlined',
        iconBg: '#e6f4ff',
        iconColor: '#1677ff'
    },
    {
        key: 'stageMismatch',
        title: '环节不匹配项',
        value: 14,
        unit: '项',
        trend: 'none',
        color: 'purple', // text-[#722ed1]
        icon: 'node-index-outlined', // 表示环节的 node 图标
        iconBg: '#f9f0ff',
        iconColor: '#722ed1'
    }
];

// 差异记录列表数据
export const auditRecords = [
    {
        id: 'OPP-26-889',
        name: '行业大模型训练节点扩容',
        tag: '自建商机',
        tagType: 'warning',
        manager: '李经理',
        updateTime: '03-08 10:15',
        metrics: {
            opportunityAmount: {
                management: 500,
                sales: 2450,
                diff: 50,
                diffType: 'danger' // 正偏差
            },
            profit: {
                management: 150,
                sales: 135,
                diff: 15,
                diffType: 'danger' // 正偏差
            },
            procurement: {
                management: 310,
                sales: 280,
                diff: 30,
                diffType: 'danger' // 正偏差
            },
            invoice: {
                management: 50,
                sales: 50,
                diff: 0,
                diffType: 'normal' // 无偏差
            },
            parentStage: {
                management: 'L4 采购',
                sales: 'L3 立项',
                diff: '进度超前', // 经营侧已经到了采购，销服还在立项，所以是进度超前
                diffType: 'success' // 绿底绿字
            }
        }
    },
    {
        id: 'OPP-26-Z005',
        name: '某省智慧电力数字化二期',
        tag: '孤儿项',
        tagType: 'danger',
        manager: '张经理',
        updateTime: '03-08 11:20',
        metrics: {
            opportunityAmount: {
                management: 1200,
                sales: 1300,
                diff: -100,
                diffType: 'success' // 负偏差（绿色）
            },
            profit: {
                management: 360,
                sales: 400,
                diff: -40,
                diffType: 'success'
            },
            procurement: {
                management: 800,
                sales: 800,
                diff: 0,
                diffType: 'normal'
            },
            invoice: {
                management: 200,
                sales: 220,
                diff: -20,
                diffType: 'success'
            },
            parentStage: {
                management: 'L5 签约',
                sales: 'L4 采购',
                diff: '进度超前',
                diffType: 'success'
            }
        }
    },
    {
        id: 'OPP-26-001',
        name: '政务云底座扩容工程',
        tag: '失联项',
        tagType: 'warning',
        manager: '王经理',
        updateTime: '03-07 16:20',
        metrics: {
            opportunityAmount: {
                management: 2400,
                sales: null, // 表示缺失
                diff: 2400,
                diffType: 'danger'
            },
            profit: {
                management: 720,
                sales: null,
                diff: 720,
                diffType: 'danger'
            },
            procurement: {
                management: 1200,
                sales: null,
                diff: 1200,
                diffType: 'danger'
            },
            invoice: {
                management: 180,
                sales: null,
                diff: 180,
                diffType: 'danger'
            },
            parentStage: {
                management: 'L4 采购',
                sales: null,
                diff: '缺失项',
                diffType: 'success' // 尽管叫缺失项，但设计稿上显示为绿色底
            }
        }
    },
    {
        id: 'OPP-26-102',
        name: '数字孪生水利枢纽监控平台',
        tag: '孤儿项',
        tagType: 'danger',
        manager: '吴经理',
        updateTime: '03-08 09:30',
        metrics: {
            opportunityAmount: { management: 450, sales: 0, diff: 450, diffType: 'danger' },
            profit: { management: 135, sales: 0, diff: 135, diffType: 'danger' },
            procurement: { management: 280, sales: 0, diff: 280, diffType: 'danger' },
            invoice: { management: 0, sales: 0, diff: 0, diffType: 'normal' },
            parentStage: { management: 'L2 引导', sales: null, diff: '销服缺失', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-Z008',
        name: '智慧园区能源运维管理系统',
        tag: '失联项',
        tagType: 'warning',
        manager: '陈经理',
        updateTime: '03-07 14:50',
        metrics: {
            opportunityAmount: { management: 320, sales: null, diff: 320, diffType: 'danger' },
            profit: { management: 96, sales: null, diff: 96, diffType: 'danger' },
            procurement: { management: 150, sales: null, diff: 150, diffType: 'danger' },
            invoice: { management: 0, sales: null, diff: 0, diffType: 'normal' },
            parentStage: { management: 'L3 立项', sales: null, diff: '销服缺失', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-115',
        name: '城市交通视觉感知算法升级',
        tag: '自建商机',
        tagType: 'warning',
        manager: '赵经理',
        updateTime: '03-08 11:05',
        metrics: {
            opportunityAmount: { management: 180, sales: 210, diff: -30, diffType: 'success' },
            profit: { management: 54, sales: 63, diff: -9, diffType: 'success' },
            procurement: { management: 110, sales: 110, diff: 0, diffType: 'normal' },
            invoice: { management: 30, sales: 30, diff: 0, diffType: 'normal' },
            parentStage: { management: 'L4 采购', sales: 'L4 采购', diff: '对齐', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-342',
        name: '工业互联网标识解析平台',
        tag: '孤儿项',
        tagType: 'danger',
        manager: '孙经理',
        updateTime: '03-06 17:15',
        metrics: {
            opportunityAmount: { management: 0, sales: 850, diff: -850, diffType: 'success' },
            profit: { management: 0, sales: 255, diff: -255, diffType: 'success' },
            procurement: { management: 0, sales: 500, diff: -500, diffType: 'success' },
            invoice: { management: 0, sales: 120, diff: -120, diffType: 'success' },
            parentStage: { management: null, sales: 'L5 签约', diff: '经营缺失', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-056',
        name: '应急联动大数据指挥舱',
        tag: '孤儿项',
        tagType: 'warning',
        manager: '周经理',
        updateTime: '03-08 10:40',
        metrics: {
            opportunityAmount: { management: 1250, sales: 1100, diff: 150, diffType: 'danger' },
            profit: { management: 375, sales: 330, diff: 45, diffType: 'danger' },
            procurement: { management: 780, sales: 750, diff: 30, diffType: 'danger' },
            invoice: { management: 100, sales: 150, diff: -50, diffType: 'success' },
            parentStage: { management: 'L5 签约', sales: 'L4 采购', diff: '进度超前', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-Z012',
        name: '医院智慧后勤管理中心',
        tag: '失联项',
        tagType: 'warning',
        manager: '刘经理',
        updateTime: '03-07 09:20',
        metrics: {
            opportunityAmount: { management: 680, sales: 600, diff: 80, diffType: 'danger' },
            profit: { management: 204, sales: 180, diff: 24, diffType: 'danger' },
            procurement: { management: 450, sales: 450, diff: 0, diffType: 'normal' },
            invoice: { management: 80, sales: 80, diff: 0, diffType: 'normal' },
            parentStage: { management: 'L6 交付', sales: 'L5 签约', diff: '进度超前', diffType: 'success' }
        }
    },
    {
        id: 'OPP-26-921',
        name: '智能仓储自动避障系统',
        tag: '孤儿项',
        tagType: 'danger',
        manager: '马经理',
        updateTime: '03-08 12:10',
        metrics: {
            opportunityAmount: { management: 560, sales: null, diff: 560, diffType: 'danger' },
            profit: { management: 168, sales: null, diff: 168, diffType: 'danger' },
            procurement: { management: 320, sales: null, diff: 320, diffType: 'danger' },
            invoice: { management: 0, sales: null, diff: 0, diffType: 'normal' },
            parentStage: { management: 'L4 采购', sales: null, diff: '销服缺失', diffType: 'success' }
        }
    }
];
