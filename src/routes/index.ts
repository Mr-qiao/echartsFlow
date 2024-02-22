import monitor from './monitor';

const GlobalRouters = [
  {
    name: '监控大屏页',
    path: '/',
    layout: false,
    component: './Home',
  },
  {
    name: '历史监控',
    path: '/historyMonitor',
    layout: false,
    component: './HistoryMonitor',
  },
  ...monitor,
];

export default GlobalRouters;
