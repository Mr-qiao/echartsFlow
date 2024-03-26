


import system from "./system";

const GlobalRouters = [
  {
    path: '/',
    redirect: './NationalOverview',
  },
  {
    name: '登录',
    path: '/login',
    layout: false,
    component: './Login'
  },
  {
    name: '全国概况',
    path: '/nationalOverview',
    layout: false,
    component: './NationalOverview'
  },
  {
    name: '园区概况',
    path: '/parkOverview',
    layout: false,
    component: './ParkOverview'
  },
  {
    name: '园区监控',
    path: '/parkMonitor',
    layout: false,
    component: './ParkMonitor',
  },
  {
    name: '安防检测',
    path: '/securityMonitor',
    layout: false,
    component: './SecurityMonitor'
  },
  ...system
];

export default GlobalRouters;
