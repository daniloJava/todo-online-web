import Router, { Route } from 'vue-router';
import { PositionResult, Position } from 'vue-router/types/router';
import Vue from 'vue';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  scrollBehavior: (to: Route, from: Route, savedPosition: void | Position): PositionResult => {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tasks',
      name: 'TasksList',
      component: () => import('./views/task/task-list.vue'),
    },
    {
      path: '/tasks/:id/edit',
      name: 'TasksDetail',
      component: () => import('./views/task/task-edit.vue'),
    },
  ],
});

export default router;
