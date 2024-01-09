export default [
  {
    icon: 'SmileOutlined',
    name: '商品管理',
    title: '供应商商品列表',
    path: '/goods',
    routes: [
      {
        path: 'list',
        name: '供应商商品列表',
        title: '供应商商品列表',
        component: './Goods/Info',
      },
    ],
  },
];
