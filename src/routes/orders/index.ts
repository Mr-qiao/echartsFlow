export default [
  {
    icon: 'ProjectOutlined',
    name: '订单管理',
    title: '销售订单列表',
    path: '/orders',
    routes: [
      {
        path: 'sales',
        name: '销售订单列表',
        title: '销售订单列表',
        component: './Orders',
      },
      {
        path: 'after-sales',
        name: '售后订单列表',
        title: '售后订单列表',
        component: './Orders/AfterSales',
      },
      {
        path: 'purchase',
        name: '采购订单列表',
        title: '采购订单列表',
        component: './Orders/Purchase/tab',
      },
      {
        path: 'purchase-detail/:id',
        name: '采购订单详情',
        title: '采购订单详情',
        component: './Orders/Purchase/Detail',
        hideInMenu: true,
      },
    ],
  },
];
