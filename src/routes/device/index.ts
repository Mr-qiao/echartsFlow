export default [
  {
    icon: 'SmileOutlined',
    name: '设备管理',
    title: '设备列表',
    path: '/device',
    routes: [
      {
        path: 'list',
        name: '供应商商品列表',
        title: '供应商商品列表',
        component: './Device/Info',
      },
    ],
  },
];
