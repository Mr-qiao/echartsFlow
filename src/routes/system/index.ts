export default [
  {
    icon: 'ProjectOutlined',
    name: '系统管理',
    title: '用户列表',
    path: '/system',
    routes: [
      {
        exact: true,
        path: 'user',
        name: '用户列表',
        title: '用户列表',
        component: './System/User'
      },
      // {
      //   exact: true,
      //   path: 'park',
      //   name: '园区列表',
      //   title: '园区列表',
      //   component: './System/Park'
      // }
    ]
  }
]