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
        component: './goods/index',
      },
      {
        path: 'create',
        name: '商品创建',
        title: '商品创建',
        component: './goods/Create',
        hideInMenu: true,
      },
      {
        path: 'edit/:id',
        name: '商品编辑',
        title: '商品编辑',
        component: './goods/Create',
        hideInMenu: true,
      },
      {
        path: 'detail/:id',
        name: '商品查看',
        title: '商品查看',
        component: './goods/Detail',
        hideInMenu: true,
      },
      {
        path: 'sample',
        name: '打样需求列表',
        title: '打样需求列表',
        component: './goods/Sample',
      },
      {
        path: 'sample/detail',
        name: '打样需求详情',
        title: '打样需求详情',
        hideInMenu: true,
        component: './goods/Sample/CreateProof',
      },
    ],
  },
];
