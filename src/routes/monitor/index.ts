export default [
  {
    icon: 'SmileOutlined',
    name: '监控',
    title: '监控列表',
    path: '/monitor',
    routes: [
      {
        path: 'list/:id',
        name: '监控列表',
        title: '监控列表',
        component: './Monitor/List',
      },
    ]
  },
];
