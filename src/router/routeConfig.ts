/**
 * อาร์เรย์ของอ็อบเจ็กต์เส้นทางที่กำหนดเส้นทางสำหรับ Vue Router
 * @typedef {Object} RouteRecordRaw
 * @property {string} path - เส้นทาง URL ของเส้นทาง
 * @property {string} name - ชื่อของเส้นทาง
 * @property {Function} component - ฟังก์ชันที่ส่งคืน Promise สำหรับคอมโพเนนต์ที่จะแสดงเมื่อเยี่ยมชมเส้นทาง
 */
import { type RouteRecordRaw } from 'vue-router'

const routerList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layout/LayoutView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/UserListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'loginLogs',
        name: 'loginLogs',
        component: () => import('@/views/user/LoginLogsView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/OrdersListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'stock',
        name: 'stock',
        component: () => import('@/views/stock/StockListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/stock/ProductListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/admin/AdminListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'adminLogs',
        name: 'adminLogs',
        component: () => import('@/views/admin/AdminLogsListView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

export default routerList
