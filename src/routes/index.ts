
const GlobalRouters = [
  {
    path: '/',
    redirect: '/parkMonitor',
  },
  {
    name: '园区概况',
    path: '/parkMonitor',
    component: './ParkMonitor'
  },
  {
    name: '安防检测',
    path: '/securityMonitor',
    component: './SecurityMonitor'
  },
  {
    name: '历史监控',
    path: '/historyMonitor',
    component: './HistoryMonitor',
  },
  {
    name: '实时监控',
    path: '/realtimeMonitor',
    component: './RealtimeMonitor'
  }
];

export default GlobalRouters;
