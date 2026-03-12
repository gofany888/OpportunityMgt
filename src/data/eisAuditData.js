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
        tag: '需联调',
        tagType: 'warning',
        manager: '李经理',
        updateTime: '03-08 10:15',
        metrics: {
            opportunityAmount: {
                management: 500,
                sales: 450,
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
        tag: '匹配优',
        tagType: 'success',
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
    }
];
