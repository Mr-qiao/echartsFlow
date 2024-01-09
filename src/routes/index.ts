import device from './device';

const GlobalRouters = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: '登录',
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    name: '注册',
    path: '/register/:id',
    layout: false,
    component: './Register',
  },
  {
    name: '修改密码',
    path: '/reset-password',
    layout: false,
    component: './Register/resetPassword',
  },
  {
    path: '/help/:id',
    layout: false,
    component: './Register/help',
  },
  {
    name: '监控大屏页',
    path: '/home',
    component: './Home',
  },
  ...device,
];

export default GlobalRouters;
