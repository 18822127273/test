import Vue from 'vue'
import Router from 'vue-router'
import store from '../../src/store/store'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
	routes: [{
			path: '/',
			meta: {
				title: '系统首页',
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			component: () =>
				import('../components/main/main.vue'),
			children: [
				// {
				// 	path: '/community/communitylist',
				// 	name: 'communitylist', //社区列表
				// 	meta: {
				// 	  title: '社区列表',
				// 	  requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
				//         // keepAlive:true
				// 	},
				// 	component: () =>
				// 		import('../components/communityall/community/communitylist.vue'),
				// },
				{
					path: '/fullScreen',
					name: '/fullScreen', //社区列表
					meta: {
						title: '大屏',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/fullscreen/fullScreen.vue'),
					children: [{
							path: 'inhabitantlists',
							name: 'inhabitantlists', //居民列表
							meta: {
								title: '大屏居民',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/inhabit/inhabitantlists.vue'),
						},
						{
							path: 'inhabitantall',
							name: 'inhabitantall', //全部档案
							meta: {
								title: '居民详情',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/inhabit/inhabitantall.vue'),
						},
						{
							path: 'party',
							name: 'party', //党员列表
							meta: {
								title: '党员列表',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
								// keepAlive:true
							},
							component: () =>
								import('../components/fullscreen/party/partylist.vue'),
						},
						{
							path: 'business',
							name: 'business', //商户列表
							meta: {
								title: '商户列表',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/business/businsesslist.vue'),
						},
						{
							path: 'building',
							name: 'building', //房屋列表
							meta: {
								title: '房屋列表',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/building/buildinglist.vue'),
						},
						{
							path: 'all',
							name: 'all', //房屋列表
							meta: {
								title: '房屋列表',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/all.vue'),
						},
						{
							path: '3dtiles',
							name: '3dtiles', //房屋列表
							meta: {
								title: '模型',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/3dtiles.vue'),
						},
						{
							path: 'buildingadd',
							name: 'buildingadds', //房屋列表
							meta: {
								title: '房屋新增',
								requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
							},
							component: () =>
								import('../components/fullscreen/building/buildingadd.vue'),
						},
					]
				},
				{
					path: '/community/communityrevise',
					name: 'communityrevise', //社区列表
					meta: {
						title: '社区修改',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/communityall/community/communityrevise.vue'),
				},
				{
					path: '/community/communityadd',
					name: 'communityreadd', //社区新增
					meta: {
						title: '社区新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/communityall/community/communityadd.vue'),
				},
				{
					path: '/inhabitant/inhabitantlist',
					name: 'inhabitantlist', //居民列表
					meta: {
						title: '居民列表',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
						// keepAlive:true
					},
					component: () =>
						import('../components/inhabitall/inhabitant/inhabitantlist.vue'),
				},
				{
					path: '/',
					name: 'inhabitantlis', //居民列表
					meta: {
						title: '居民列表',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
						// keepAlive:true
					},
					component: () =>
						import('../components/inhabitall/inhabitant/inhabitantlist.vue'),
				},

				{
					path: '/inhabitant/inhabitantadd',
					name: 'inhabitantadd', //居民新增
					meta: {
						title: '居民新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/inhabitantadd.vue'),
				},
				{
					path: '/inhabitant/inhabitfamily',
					name: 'inhabitfamily', //家庭成员
					meta: {
						title: '家庭成员',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/inhabitfamily.vue'),
				},
				{
					path: '/inhabitant/inhabitdetail',
					name: 'inhabitdetail', //居民详情
					meta: {
						title: '居民详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/inhabitdetail.vue'),
				},
				{
					path: '/inhabitant/housefamily',
					name: 'housefamily', //居民详情
					meta: {
						title: '居民详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/housefamily.vue'),
				},
				{
					path: '/inhabitant/housebind',
					name: 'housebind', //居民详情
					meta: {
						title: '绑定房屋',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/housebind.vue'),
				},
				{
					path: '/module/peoplebind',
					name: 'peoplebind', //模块管理
					meta: {
						title: '网格员绑定',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/module/peoplebind.vue'),
				},
				{
					path: '/module/bulidlist',
					name: 'bulidlist', //模块管理
					meta: {
						title: '关联楼栋',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/module/buildlist.vue'),
				},
				{
					path: '/module/buildingmodule',
					name: 'module', //模块管理
					meta: {
						title: '模块管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/module/buildingmodule.vue'),
				},
				{
					path: '/inhabitant/familybind',
					name: 'familybind', //居民详情
					meta: {
						title: '绑定成员',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/inhabitant/familybind.vue'),
				},
				{
					path: '/community/communitydetail',
					name: 'communitydetail', //社区详情
					meta: {
						title: '社区详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/communityall/community/communitydetail.vue'),
				},
				{
					path: '/employee/employeelist',
					name: 'employeelist', //员工详情
					meta: {
						title: '社区员工',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/communityall/employee/employeelist.vue'),
				},
				{
					path: '/system/systemlist',
					name: 'systemlist', //社区制度
					meta: {
						title: '社区制度',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/communityall/system/systemlist.vue'),
				},
				{
					path: '/Delivery/Labellist',
					name: 'Labellist', //标签管理
					meta: {
						title: '标签管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Delivery/Labellist.vue'),
				},
				{
					path: '/Delivery/Deliveryadd',
					name: 'Deliveryadd', //外来人员管理
					meta: {
						title: '外来新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Delivery/deliveryadd.vue'),
				},
				{
					path: ' /Party/partylists',
					name: 'partylists', //党员管理
					meta: {
						title: '党员列表',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Party/partylists.vue'),
				},
				{
					path: ' /Party/Partyadd',
					name: 'Partyadd', //党员新增
					meta: {
						title: '党员新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Party/Partyadd.vue'),
				},
				{
					path: ' /Party/partydetail',
					name: 'partydetail', //党员详细
					meta: {
						title: '党员详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Party/partydetail.vue'),
				},
				{
					path: ' /Party/partyexpense',
					name: 'partyexpense', //党员党费缴纳信息
					meta: {
						title: '党员费用缴纳',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/Party/partyexpense.vue'),
				},

				{
					path: '/special/speciallist',
					name: 'speciallist', //特殊人员管理
					meta: {
						title: '特殊人员',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/special/speciallist.vue'),
				},
				{
					path: '/house/houselist',
					name: 'houselist', //房屋信息管理
					meta: {
						title: '房屋管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/house/houselist.vue'),
				},
				{
					path: '/house/houseadd',
					name: 'houseadd', //房屋新增
					meta: {
						title: '房屋新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/house/houseadd.vue'),
				},
				{
					path: '/house/housedetail',
					name: 'housedetail', //房屋详情
					meta: {
						title: '房屋详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/house/housedetail.vue'),
				},
				{
					path: '/house/housefamily',
					name: 'housefamilys', //房屋关联成员
					meta: {
						title: '房屋成员',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/house/housefamily.vue'),
				},
				{
					path: '/building/buildinglist',
					name: 'buildinglist', //建筑信息管理
					meta: {
						title: '建筑管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/building/buildinglist.vue'),
				},
				{
					path: '/building/buildingadd',
					name: 'buildingadd', //建筑新增
					meta: {
						title: '建筑新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/building/buildingadd.vue'),
				},
				{
					path: '/building/buildbind',
					name: 'buildbind', //建筑新增
					meta: {
						title: '建筑新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/building/buildbind.vue'),
				},
				{
					path: '/building/buildingdetail',
					name: 'buildingdetail', //房屋信息管理
					meta: {
						title: '建筑详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/inhabitall/building/buildingdetail.vue'),
				},
				{
					path: '/Businesses/Businesseslist',
					name: 'Businesseslist', //商户列表
					meta: {
						title: '商户管理',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/Businesseslist.vue'),
				},

				{
					path: '/Businesses/Businessesadd',
					name: 'Businessesadd', //商户新增
					meta: {
						title: '商户新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/Businessesadd.vue'),
				},
				{
					path: '/Businesses/Businessesrevise',
					name: 'Businessesrevise', //商户修改
					meta: {
						title: '商户修改',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/Businessesrevise.vue'),
				},
				{
					path: '/Businesses/BussinesspeopleDetail',
					name: 'Bussinesspeopledetail', //商户修改
					meta: {
						title: '商户人员详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/BussinesspeopleDetail.vue'),
				},
				{
					path: '/Businesses/Bussinesspeoplelist',
					name: 'Bussinesspeoplelist', //商户修改
					meta: {
						title: '商户人员修改',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/Bussinesspeoplelist.vue'),
				},
				{
					path: '/Businesses/Bussinesspeopleadd',
					name: 'Bussinesspeopleadd', //商户修改
					meta: {
						title: '商户人员新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Businesses/Bussinesspeopleadd.vue'),
				},
				{
					path: '/Approvalshequ/shequ',
					name: 'shequ', //社区
					meta: {
						title: '社区',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Approval/Approvalshequ/shequ.vue'),
				},
				{
					path: '/Approvalgongcheng/gongcheng',
					name: 'gongcheng', //工程审批列表
					meta: {
						title: '活动审批',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Approval/Approvalgongcheng/gongcheng.vue'),
				},
				{
					path: '/Approvalgongcheng/gongchengdetail',
					name: 'gongchengdetail', //工程审批详情
					meta: {
						title: '审批详情',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Approval/Approvalgongcheng/gongchengdetail.vue'),
				},
				{
					path: '/Approvalgongcheng/gongchengadd',
					name: 'gongchengadd', //审批新增
					meta: {
						title: '审批新增',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Approval/Approvalgongcheng/gongchengadd.vue'),
				},
				{
					path: '/Permissions/Permissionsadd',
					name: 'Permissionsadd', //权限
					meta: {
						title: '系统权限',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Permissions/Permissionsadd.vue'),
				},
				{
					path: '/Permissions/Permissionslist',
					name: 'Permissionslist', //商户修改
					meta: {
						title: '权限列表',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/Permissions/Permissionslist.vue'),
				},
				{
					path: '/main/changePassword',
					name: 'changepassword', //密码修改
					component: () =>
						import('../components/main/changepassword.vue'),
				},
				{
					path: '/main/usercenter',
					name: 'usercenter', //个人中心
					meta: {
						title: '个人中心',
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
					component: () =>
						import('../components/main/userCenter.vue'),
				},
				{
					path: '/region',
					name: 'region', //忘记密码
					component: () => import('../components/region/region.vue'),
				},
				{
					path: '/regions',
					name: 'regions', //注册
					component: () => import('../components/region/regions.vue'),
				},
				{
					name: 'login', //登录管理
					path: '/login',
					component: () => import('../components/login/login.vue'),
				},
			]
		},

	]
})
//守卫路由
router.beforeEach((to, from, next) => {
	store.state.token = localStorage.getItem('userToken'); //获取本地存储的token
	if (to.meta.title) { //判断是否有标题  该操作可以再监听路由时候处理 watch:{'$route'(to,from){xxx操作}}
		document.title = to.meta.title
	}
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (store.state.token) { // 通过vuex state获取当前的token是否存
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})

// router.afterEach(route => {
// 	//loading加载完成
// });

export default router;
