import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index.vue') },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/home/index.vue') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa/index.vue') },
      { path: '/video', name: 'video', component: () => import('@/views/video/index.vue') },
      { path: '/my', name: 'my', component: () => import('@/views/my/index.vue') },
    ],
  },
  { path: '/search', name: 'search', component: () => import('@/views/search/index.vue') },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true, // 开启props传参，说白了就是把路由参数映射到组件的props中
  },
];

const router = new VueRouter({
  routes,
});

export default router;
