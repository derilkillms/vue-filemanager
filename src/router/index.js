// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Explorer from '@/components/Explorer.vue'; // Import komponen Explorer dengan path yang benar

const routes = [
  {
    path: '/',
    name: 'home',
    component: Explorer, // Gunakan komponen Explorer sebagai halaman home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue') // Contoh route lain
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
