import goods from './goods';
import orders from './orders';
import quotations from './quotations';
const GlobalRouters = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: '登录',
    path: '/login',
    layout: false,
    component: './login',
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

  ...goods,
  ...quotations,
  ...orders,
];

export default GlobalRouters;
