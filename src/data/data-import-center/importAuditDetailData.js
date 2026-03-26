export const importAuditDetailMap = {
  'LOG-8821': {
    recordNo: 'LOG-8821',
    title: '导入审计详情：LOG-8821',
    subtitle: '含多维度变动及分级忽略决策痕迹',
    exportText: '导出决策报告',
    statusText: '审计已定稿',
    statusTone: 'success',
    sectionLabel: '导入执行详情',
    sourceTitle: 'EIS 系统 / EXCEL导入',
    sourceSubtitle: '数据源与方式',
    operatorName: '张管理 (Admin_01)',
    operatorLabel: '导入执行人',
    baselineLabel: '审计对标基准（口径对比）',
    baselineFile: 'EIS_RAW_SNAPSHOT_20260307_V0.9.xlsx',
    baselineHint: '基于上次同步快照执行增量比对',
    watermarkIcon: 'CloudDownloadOutlined',
    metrics: [
      {
        key: 'scanned',
        title: '扫描总条数',
        value: '45,210',
        icon: 'DatabaseOutlined',
        tone: 'blue',
      },
      {
        key: 'pending',
        title: '待管理员决策',
        value: '2',
        icon: 'SettingOutlined',
        tone: 'orange',
      },
      {
        key: 'skipped',
        title: '本次跳过报错',
        value: '1',
        icon: 'CloseCircleOutlined',
        tone: 'slate',
      },
      {
        key: 'accepted',
        title: '已纳加入库',
        value: '45,207',
        icon: 'CheckCircleOutlined',
        tone: 'green',
      },
    ],
    filterTitle: '进场物理轨迹与管理员决策审计',
    filterOptions: [
      { label: '全部明细', value: 'all' },
      { label: '正常入库', value: 'accepted' },
      { label: '待决策', value: 'pending' },
      { label: '已跳过', value: 'skipped' },
    ],
    columns: [
      { title: '商机主体（EXCEL 行）', dataIndex: 'entity', key: 'entity', width: '28%' },
      { title: '审计判定 / 决策路由', dataIndex: 'decision', key: 'decision', width: '20%' },
      { title: '增量对比 / 决策说明', dataIndex: 'comparison', key: 'comparison' },
    ],
    rows: [
      {
        key: 'row-2',
        filter: 'accepted',
        rowLabel: '第 2 行',
        entityName: '某省智慧电力数字化二期',
        entityCode: 'EIS-2026-001',
        decisionBadge: '更新项',
        decisionStatus: '正常入库',
        decisionTone: 'green',
        comparisonBlocks: [
          {
            type: 'diff',
            rows: [
              { label: '预测收入', from: '2,280万', to: '2,400万' },
              { label: '核心环节', from: 'L3 立项', to: 'L4 采购' },
              { label: '采购预算', from: '450万', to: '520万' },
            ],
          },
        ],
      },
      {
        key: 'row-10',
        filter: 'skipped',
        rowLabel: '第 10 行',
        entityName: '边缘计算节点扩容(二期)',
        entityCode: 'MISSING_ID_04',
        decisionBadge: '异常行',
        decisionStatus: '忽略报错(跳过)',
        decisionTone: 'slate',
        comparisonBlocks: [
          {
            type: 'pair',
            label: 'EIS 编码',
            from: '空',
            to: '已跳过',
          },
          {
            type: 'note',
            tone: 'slate',
            text: '数据异常：检测到该行 EIS 编码缺失。管理员在导入界面已执行“忽略报错”动作，该记录本次不入库。',
          },
        ],
      },
      {
        key: 'row-25',
        filter: 'pending',
        rowLabel: '第 25 行',
        entityName: '非标测试项目(外部新增)',
        entityCode: 'EIS-NEW-999',
        decisionBadge: 'EIS 新增',
        decisionStatus: '待管理员确认',
        decisionTone: 'orange',
        comparisonBlocks: [
          {
            type: 'pair',
            label: '入场性质',
            from: '外部新增',
            to: '待决策',
          },
          {
            type: 'note',
            tone: 'orange',
            text: '决策路由：检测到 EIS 新增项，确认任务已发送至【部门商机管理员】判定是否执行“永久忽略”。',
          },
        ],
      },
      {
        key: 'row-45',
        filter: 'accepted',
        rowLabel: '第 45 行',
        entityName: '数据库国产化替代分项',
        entityCode: 'EIS-2026-ENUM-01',
        decisionBadge: '异常更新',
        decisionStatus: '已修正准入',
        decisionTone: 'blue',
        comparisonBlocks: [
          {
            type: 'pair',
            label: '项目性质',
            from: '自研',
            to: '产品能力',
          },
          {
            type: 'note',
            tone: 'blue',
            text: '管理决策：原枚举值【自研】非标准，管理员已在导入界面手动修正为【产品能力】后准入。',
          },
        ],
      },
      {
        key: 'row-89',
        filter: 'pending',
        rowLabel: '第 89 行',
        entityName: '全省数据库国产化分项',
        entityCode: 'EIS-2026-S11',
        decisionBadge: '待定落场',
        decisionStatus: '待管理员核销',
        decisionTone: 'red',
        comparisonBlocks: [
          {
            type: 'pair',
            label: '变动状态',
            from: '在管',
            to: '待确认移除',
          },
          {
            type: 'note',
            tone: 'orange',
            text: '决策路由：源头数据缺失，核销申请已自动发送至【部门商机管理员】执行确认。',
          },
        ],
      },
    ],
    pagination: {
      total: 45210,
      pageSize: 5,
      current: 1,
      totalText: (total, range) => `显示第 ${range[0]}-${range[1]} 条审计记录，共 ${total.toLocaleString()} 条`,
    },
  },
}

export const getImportAuditDetail = (recordNo) => {
  const normalized = String(recordNo || '').toUpperCase()

  return importAuditDetailMap[normalized] || importAuditDetailMap['LOG-8821']
}
