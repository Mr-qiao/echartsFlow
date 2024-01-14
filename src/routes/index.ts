import monitor from './monitor';

const GlobalRouters = [
  {
    name: '监控大屏页',
    path: '/',
    layout: false,
    component: './Home',
  },
  ...monitor,
];

export default GlobalRouters;
