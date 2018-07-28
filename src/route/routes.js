import { AuthGuard, LoginGuard } from './guards'

const Home = () => import(/* webpackChunkName: "base" */ './views/Home.vue');
const View = () => import(/* webpackChunkName: "base" */ './views/View.vue');
const Count = () => import(/* webpackChunkName: "count" */ './views/Count.vue');
const CountAdmin = () => import(/* webpackChunkName: "count" */ './views/+Count/Admin.vue');
const CountReset = () => import(/* webpackChunkName: "count" */ './views/+Count/Reset.vue');
const CountSet = () => import(/* webpackChunkName: "count" */ './views/+Count/Set.vue');
const CountHistory = () => import(/* webpackChunkName: "count" */ './views/+Count/History.vue');
const Login = () => import(/* webpackChunkName: "base" */ './views/Login.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ './views/Callback.vue');

const main = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/view',
    name: 'view',
    meta: { title: 'View' },
    component: View,
  },
  {
    path: '/count',
    name: 'count',
    component: Count,
    beforeEnter: AuthGuard,
    meta: { title: 'Count' },
    children: [
      { path: 'admin', name: 'countAdmin', meta: { title: 'Admin' }, beforeEnter: AuthGuard, component: CountAdmin },
      { path: 'reset', name: 'countReset', meta: { title: 'Reset counter' }, beforeEnter: AuthGuard, component: CountReset },
      { path: 'set', name: 'countSet', meta: { title: 'Set counter' }, beforeEnter: AuthGuard, component: CountSet },
      { path: 'history', name: 'countHistory', meta: { title: 'Counter history' }, beforeEnter: AuthGuard, component: CountHistory},
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login' },
    beforeEnter: LoginGuard,
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback,
    meta: { title: 'Callback' }
  }
];

const error = [
  {
    path: '*',
    name: 'error',
    redirect: '/'
  }
];

export default [].concat(main, error);
