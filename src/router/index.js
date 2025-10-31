import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/b2b/Dashboard.vue')
  },
  {
    path: '/segmentation',
    name: 'Segmentation',
    component: () => import('@/views/b2b/Segmentation.vue')
  },
  {
    path: '/content-generator',
    name: 'ContentGenerator',
    component: () => import('@/views/b2b/ContentGenerator.vue')
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: () => import('@/views/b2b/Campaigns.vue')
  },
  {
    path: '/store',
    name: 'StoreFront',
    component: () => import('@/views/b2c/StoreFront.vue')
  },
  {
    path: '/store/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/b2c/ProductDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;