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
      {
        path: 'create',
        name: '商品创建',
        title: '商品创建',
        component: './Goods/Info/Create',
        hideInMenu: true,
      },
      {
        path: 'edit/:id',
        name: '商品编辑',
        title: '商品编辑',
        component: './Goods/Info/Create',
        hideInMenu: true,
      },
      {
        path: 'detail/:id',
        name: '商品查看',
        title: '商品查看',
        component: './Goods/Info/Detail',
        hideInMenu: true,
      },
    ],
  },
];
