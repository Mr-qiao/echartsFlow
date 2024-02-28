
const GlobalRouters = [
  {
    path: '/',
    redirect: '/nationalOverview',
  },
  {
    name: '全国概况',
    path: '/nationalOverview',
    component: './NationalOverview'
  },
  {
    name: '园区概况',
    path: '/parkOverview',
    component: './ParkOverview'
  },
  {
    name: '园区监控',
    path: '/parkMonitor',
    component: './ParkMonitor',
  },
  {
    name: '安防检测',
    path: '/securityMonitor',
    component: './SecurityMonitor'
  }
];

export default GlobalRouters;
