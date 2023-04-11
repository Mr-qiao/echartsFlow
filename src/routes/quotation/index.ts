export default [
  {
    icon: 'AccountBookOutlined',
    name: '报价中心',
    title: '报价管理',
    path: '/quotation',
    routes: [
      {
        path: 'list',
        name: '报价管理',
        title: '报价管理',
        component: './Quotation',
      },
      {
        path: 'edit/:id',
        name: '报价编辑',
        title: '报价编辑',
        component: './Quotation/edit',
        hideInMenu: true,
      },
      {
        path: 'editBoom/:id',
        name: '报价编辑',
        title: '报价编辑',
        component: './Quotation/editBoom',
        hideInMenu: true,
      },
    ],
  },
];
