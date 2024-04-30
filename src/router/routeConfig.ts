/**
 * อาร์เรย์ของอ็อบเจ็กต์เส้นทางที่กำหนดเส้นทางสำหรับ Vue Router
 * @typedef {Object} RouteRecordRaw
 * @property {string} path - เส้นทาง URL ของเส้นทาง
 * @property {string} name - ชื่อของเส้นทาง
 * @property {Function} component - ฟังก์ชันที่ส่งคืน Promise สำหรับคอมโพเนนต์ที่จะแสดงเมื่อเยี่ยมชมเส้นทาง
 */
import { type RouteRecordRaw } from 'vue-router';

const routerList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/LayoutView.vue'),
    meta: { auth: true },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'loginLogs',
        name: 'loginLogs',
        component: () => import('@/views/user/LoginLogsView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
];

export default routerList;
