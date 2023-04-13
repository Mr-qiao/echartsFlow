export default [
  {
    icon: 'AccountBookOutlined',
    name: '报价中心',
    title: '报价管理',
    path: '/quotations',
    routes: [
      {
        path: 'list',
        name: '报价管理',
        title: '报价管理',
        component: './Quotations1',
      },
      {
        path: 'edit/:id',
        name: '报价编辑',
        title: '报价编辑',
        component: './Quotations1/edit',
        hideInMenu: true,
      },
      {
        path: 'editBoom/:id',
        name: '报价编辑',
        title: '报价编辑',
        component: './Quotations1/editBoom',
        hideInMenu: true,
      },
    ],
  },
];
