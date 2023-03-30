<template>
	<div>
		<el-container>
			<el-header>
				<v-header></v-header>
			</el-header>
			<el-container>
				<el-aside width="220px" height="300px">
					<v-left :navdata="navData"></v-left>
				</el-aside>
				<el-main>
					<keep-alive>
						<v-content v-if="$route.meta.keepAlive">
						</v-content>
					</keep-alive>
					<v-content v-if="!$route.meta.keepAlive">
					</v-content>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	import mainheader from "./main-header.vue"
	import maincontent from "./main-content.vue"
	import navleft from './nav-left.vue'
	export default {
		name: 'Main',
		components: {
			'v-header': mainheader,
			'v-content': maincontent,
			'v-left': navleft
		},
		data() {
			return {
				activityId: '',
				activeIndex: '0',
				navData: [{
						title: '社区管理',
						path: '',
						code: 'M001',
						children: [
							// {
							// 	title: '社区列表',
							// 	path: '/community/communitylist',
							// 	code: 'M00101',
							// },
							{
								title: '社区员工管理',
								path: '/employee/employeelist',
								code: 'M00102',

							},
							{
								title: '社区制度管理',
								path: '/system/systemlist',
								code: 'M00103',

							},
						]
					},
					{
						title: '社区居民管理',
						path: '',
						code: 'M002',
						children: [{
								title: '居民信息管理',
								path: '/inhabitant/inhabitantlist',
								code: 'M00201',
							},
							{
								title: '党员信息管理',
								path: '/Party/partylists',
								code: 'M00202',
							},
							{
								title: '标签管理',
								path: '/Delivery/Labellist',
								code: 'M00203',
							},
							// {
							//   title: '特殊人员管理',
							//   path: '/special/speciallist',
							//   code: 'M00204',

							// },
						]
					},
					{
						title: '房屋信息管理',
						path: '',
						code: 'M003',
						children: [{
								title: '模块管理',
								path: '/module/buildingmodule',
								code: 'M00401',
							},
							{
								title: '建筑信息',
								path: '/building/buildinglist',
								code: 'M00402',
							},
							{
								title: '房屋信息',
								path: '/house/houselist',
								code: 'M00301',
							},
						]
					},
					{
						title: '企业管理',
						path: '',
						code: 'M004',
						children: [{
								title: '企业列表',
								path: '/Businesses/Businesseslist',
								code: 'M00401',
							},
							// {
							// 	title: '商户人员列表',
							// 	path: '/Businesses/Bussinesspeoplelist',
							// 	code: 'M00402',
							// },

						]
					},
					// {
					// 	title: '审批管理',
					// 	path: '',
					// 	code: 'M005',
					// 	children: [{
					// 			title: '便民工程审批',
					// 			path: '/Approvalgongcheng/gongcheng',
					// 			code: 'M00501',
					// 		},
					// 		// {
					// 		//   title: '社区活动审批',
					// 		//   path: '/Approvalshequ/shequ',
					// 		//   code: 'M00502',
					// 		// },
					// 	]
					// },
					// {
					// 	title: '权限管理',
					// 	path: '',
					// 	code: 'M006',
					// 	children: [{
					// 			title: '权限列表',
					// 			path: '/Permissions/Permissionslist',
					// 			code: 'M00601',
					// 		},
					// 		{
					// 			title: '新增权限',
					// 			path: '/Permissions/Permissionsadd',
					// 			code: 'M00602',

					// 		},
					// 	]
					// },
				]
			}
		}
	}
</script>
<style>

</style>
