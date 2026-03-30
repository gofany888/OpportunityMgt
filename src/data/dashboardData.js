/**
 * Dashboard Mock Data
 */

export const summaryCardsData = [
    {
        title: '收入',
        icon: 'fa-regular fa-calendar',
        bgColor: '#e6f4ff',
        iconColor: '#1677ff',
        target: '400.0',
        actual: '316.0',
        actualUnit: '万元',
        completeRate: 79,
        forecast: '420.0', // PM 较高
        eisForecast: '418.0', // EIS 较低 -> 红色警告 (!)
        yearCompleteRate: '105',
        type: 'primary'
    },
    {
        title: '采购',
        icon: 'fa-solid fa-cart-shopping',
        bgColor: '#f9f0ff',
        iconColor: '#722ed1',
        target: '150.0',
        actual: '131.0',
        actualUnit: '万元',
        completeRate: 87,
        forecast: '180.0', // 完全一致
        eisForecast: '180.0', // -> 无图标，完美匹配
        yearCompleteRate: '120',
        type: 'purple'
    },
    {
        title: '毛利',
        icon: 'fa-solid fa-arrow-trend-up',
        bgColor: '#f6ffed',
        iconColor: '#52c41a',
        target: '900.0',
        actual: '867.0',
        actualUnit: '万元',
        completeRate: 96,
        forecast: '945.0',
        eisForecast: '950.0',
        yearCompleteRate: '105',
        type: 'success'
    }
];

export const trendChartData = {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    revenue: {
        eis: [45, 38, 55, 62, 65, 75, 78, 85, 82, 90, 100, 95],
        ledger: [40, 35, 58, 60, 62, 70, 75, 80, 78, 85, 95, 95]
    },
    cost: {
        eis: [20, 18, 25, 30, 28, 35, 33, 40, 38, 45, 50, 48],
        ledger: [22, 19, 24, 28, 26, 32, 31, 38, 36, 42, 48, 46]
    },
    grossProfit: {
        eis: [25, 20, 30, 32, 37, 40, 45, 45, 44, 45, 50, 47],
        ledger: [18, 16, 26, 32, 36, 38, 44, 42, 42, 43, 47, 49]
    }
};

export const ytdDataMap = {
    revenue: { eis: '894', ledger: '845', matchRate: '94.5%' },
    cost: { eis: '412', ledger: '390', matchRate: '94.6%' },
    grossProfit: { eis: '482', ledger: '455', matchRate: '94.4%' }
};

export const performanceTableData = [
    { key: '1', dept: '云监控产品部', headcount: 58, effective: 53, revenue: 0, procurement: 0, grossProfit: 0, cost: 0, profit: 0 },
    { key: '2', dept: '云运营产品部', headcount: 48, effective: 48, revenue: 0, procurement: 0, grossProfit: 0, cost: 0, profit: 0 },
    { key: '3', dept: '云调度产品部', headcount: 22, effective: 19, revenue: 0, procurement: 0, grossProfit: 0, cost: 0, profit: 0 },
    { key: '4', dept: '产数产品部', headcount: 15, effective: 15, revenue: 260, procurement: 131, grossProfit: 354, cost: 15.3, profit: 0.2 },
    { key: '5', dept: '交付服务部', headcount: 87, effective: 87, revenue: 0, procurement: 0, grossProfit: 0, cost: 0, profit: 0 },
    { key: '6', dept: '智算应用产品部', headcount: 8, effective: 5, revenue: 56, procurement: 0, grossProfit: 86, cost: 4.56, profit: 0 }
];

export const performanceTotalRow = {
    dept: '合计', headcount: 465, effective: 454, revenue: 316, procurement: 131, grossProfit: 867, cost: 39.19, profit: 0.2
};

export const discrepancyTableData = [
    {
        key: '1',
        dept: '云监控产品部',
        deptHasCount: 55, deptHasAmt: 100,
        eisHasCount: 1, eisHasAmt: 100,
        diffRevCount: 6, diffRevAmt: 14.5,
        diffProcCount: -2, diffProcAmt: -6.0,
        diffGrossCount: 3, diffGrossAmt: 8.5
    },
    {
        key: '2',
        dept: '云运营产品部',
        deptHasCount: 48, deptHasAmt: 101,
        eisHasCount: 2, eisHasAmt: 101,
        diffRevCount: -4, diffRevAmt: -10.2,
        diffProcCount: 5, diffProcAmt: 12.8,
        diffGrossCount: -1, diffGrossAmt: -2.6
    },
    {
        key: '3',
        dept: '云调度产品部',
        deptHasCount: 10, deptHasAmt: 102,
        eisHasCount: 3, eisHasAmt: 102,
        diffRevCount: 0, diffRevAmt: 0,
        diffProcCount: -3, diffProcAmt: -5.5,
        diffGrossCount: 2, diffGrossAmt: 4.1
    },
    {
        key: '4',
        dept: '云产数产品部',
        deptHasCount: 15, deptHasAmt: 103,
        eisHasCount: 4, eisHasAmt: 103,
        diffRevCount: 3, diffRevAmt: 9.3,
        diffProcCount: 0, diffProcAmt: 0,
        diffGrossCount: -2, diffGrossAmt: -3.2
    },
    {
        key: '5',
        dept: '交付服务部',
        deptHasCount: 87, deptHasAmt: 104,
        eisHasCount: 5, eisHasAmt: 104,
        diffRevCount: -6, diffRevAmt: -11.4,
        diffProcCount: 4, diffProcAmt: 7.6,
        diffGrossCount: -3, diffGrossAmt: -6.7
    },
    {
        key: '6',
        dept: '智算应用产品部',
        deptHasCount: 8, deptHasAmt: 105,
        eisHasCount: 6, eisHasAmt: 105,
        diffRevCount: 2, diffRevAmt: 4.8,
        diffProcCount: -1, diffProcAmt: -1.9,
        diffGrossCount: 0, diffGrossAmt: 0
    },
    {
        key: '7',
        dept: '云业务生态业务部',
        deptHasCount: 227, deptHasAmt: 106,
        eisHasCount: 7, eisHasAmt: 106,
        diffRevCount: 5, diffRevAmt: 13.7,
        diffProcCount: 2, diffProcAmt: 5.4,
        diffGrossCount: -4, diffGrossAmt: -9.8
    }
];

export const discrepancyTotalRow = {
    dept: '合计',
    deptHasCount: 454, deptHasAmt: 721,
    eisHasCount: 28, eisHasAmt: 721,
    diffRevCount: 6, diffRevAmt: 20.7,
    diffProcCount: 5, diffProcAmt: 12.4,
    diffGrossCount: -5, diffGrossAmt: -9.7
};
