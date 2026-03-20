import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/BaseLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'index-dashboard',
                    component: () => import('../views/IndexDashboard.vue'),
                    meta: { title: '经营驾驶舱' }
                },
                {
                    path: 'report',
                    name: 'report-center',
                    component: () => import('../views/ReportCenter.vue'),
                    meta: { title: '报表中心' }
                },
                {
                    path: 'report/business-opportunity',
                    name: 'business-opportunity',
                    component: () => import('../views/reports/BusinessOpportunityReconciliation.vue'),
                    meta: {
                        customTitle: true,
                        customActions: true
                    }
                },
                {
                    path: 'report/eis-audit',
                    name: 'eis-audit',
                    component: () => import('../views/reports/EISAudit.vue'),
                    meta: {
                        customTitle: true,
                        customActions: true
                    }
                },
                {
                    path: 'sync',
                    name: 'data-import-center',
                    component: () => import('../views/data-import-center/DataImportCenter.vue'),
                    meta: {
                        customTitle: true,
                        customActions: true
                    }
                },
                {
                    path: 'sync/log/:logId',
                    name: 'data-import-audit-detail',
                    component: () => import('../views/data-import-center/DataImportAuditDetail.vue'),
                    meta: {
                        customTitle: true,
                        customActions: true
                    }
                },
                {
                    path: 'sync/annual-init',
                    name: 'data-import-annual-initialization',
                    component: () => import('../views/data-import-center/AnnualInitialization.vue'),
                    meta: {
                        customTitle: true,
                        customActions: true
                    }
                }
            ]
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('../views/DetailPage.vue'),
        }
    ],
})

export default router
