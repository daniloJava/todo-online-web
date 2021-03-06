import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue') },
    { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue') },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      meta: { hidden: true },
      children: [{
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      }],
    },
    {
      path: '/task',
      name: 'Task',
      meta: { title: 'Task', icon: 'form' },
      component: Layout,
      children: [
        {
          path: 'list',
          name: 'TasksList',
          component: () => import(/* webpackChunkName: "form" */ '@/views/task/task-list.vue'),
          meta: { title: 'List', icon: 'form' },
        },
        {
          path: ':id/edit',
          name: 'TasksEdit',
          component: () => import(/* webpackChunkName: "form" */ '@/views/task/task-edit.vue'),
          meta: { title: 'Edit', icon: 'form' },
        },
        {
          path: 'create',
          name: 'TasksCreate',
          component: () => import(/* webpackChunkName: "form" */ '@/views/task/task-edit.vue'),
          meta: { title: 'Create', icon: 'form' },
        },
      ],
    },
    { path: '*', redirect: '/404' },
  ],
});
