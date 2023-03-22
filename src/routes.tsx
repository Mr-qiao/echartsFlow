const routes = [
	{
		path: '/',
		redirect: '/login',
	},
	{
		name: '登录',
		path: '/login',
		layout: false,
		component: './login',
	},
	{
		name: '注册',
		path: '/register/:id',
		layout: false,
		component: './register',
	},
	{
		name: '修改密码',
		path: '/reset-password',
		layout: false,
		component: './register/resetPassword',
	},
	{
		path: '/help/:id',
		layout: false,
		component: './register/help',
	},
	{
		name: '商品管理',
		path: '/goods',
		icon: 'https://s.xinc818.com/files/webcila0pxx6pzc2vi7/外围投诉@2x.png',
		routes: [
			{
				name: '供应商商品列表',
				path: '/goods/list',
				component: './goods',
			},
			{
				name: '商品创建',
				path: '/goods/create',
				component: './goods/Create',
				hideInMenu: true,
			},
			{
				name: '商品查看',
				path: '/goods/detail/:id',
				component: './goods/Detail',
				hideInMenu: true,
			},
			{
				name: '样衣列表',
				path: '/goods/sample',
				component: './sample',
			},
		],
	},
	{
		name: '报价中心',
		path: '/quotation',
		icon: 'https://s.xinc818.com/files/webcila0pxx6pzc2vi7/外围投诉@2x.png',
		routes: [
			{
				name: '报价管理',
				path: '/quotation/list',
				component: './quotation',
				// hideChildrenInMenu:true,
			},
			{
				name: '报价编辑',
				path: '/quotation/edit/:id',
				hideInMenu: true,
				component: './quotation/edit',
			},
			{
				name: '报价编辑',
				path: '/quotation/editBoom/:id',
				hideInMenu: true,
				component: './quotation/editBoom',
			},
		],
	},
	{
		name: '订单管理',
		path: '/order',
		icon: 'https://s.xinc818.com/files/webcila0pxx6pzc2vi7/外围投诉@2x.png',
		routes: [
			{
				name: '销售订单列表',
				path: '/order/sales',
				component: './orderManagement',
			},
			{
				name: '售后订单列表',
				path: '/order/after-sales',
				component: './afterSales',
			},
			{
				name: '采购订单列表',
				path: '/order/purchase',
				component: './purchase/tab',
			},
			{
				name: '采购订单详情',
				hideInMenu: true,
				path: '/order/purchase-detail/:id',
				component: './purchase/detail',
			},
		],
	},
];

export {routes};
