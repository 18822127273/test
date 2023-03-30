<template>
	<div style="height: 750px;">
		<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
			修改
		</el-button>
		<el-drawer title="制度修改" :visible.sync="drawer" :before-close="handleClose">
			<el-form ref="FormData" :model="FormData" label-width="80px">		
				<el-form-item label="工作制度" prop="profile">
					<el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="FormData.profile"></el-input>
				</el-form-item>
				<el-form-item label="人员制度"  prop="system">
					<el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" v-model="FormData.system"></el-input>
				</el-form-item>
				<span style="color: red; padding-left: 90px;">*每一条请以句号结尾</span>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">修改</el-button>
				</el-form-item>
			</el-form>
		</el-drawer>
		<div class="block">
			<el-timeline>
				<el-timeline-item :timestamp="lists.time" placement="top">
					<strong>社区工作制度</strong>
					<div v-for="(item,index) in profilelist">
						<el-card>
							{{item}}
						</el-card>
					</div>
					<strong>社区工作人员管理制度</strong>
					<div v-for="(item,index) in systemlist">
						<el-card>
							{{item}}
						</el-card>
					</div>
				</el-timeline-item>
			</el-timeline>
		</div>
	</div>
</template>
<script>
	import {
		communitydetail,
		communityupdate
	} from '../../../config/api.js'
	import {
		conversionTime
	} from '../../../assets/js/public.js'
	export default {
		data() {
			return {
				drawer: false,
				direction: 'rtl',
				FormData: {
					profile: '',
					system: ''
				},
				lists: [],
				profilelist:[],
				systemlist:[],
			};
		},
		mounted() {		
			this.getList()
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			onSubmit() {
				const formdata=this.FormData
				communityupdate({
					access_token: this.$store.state.token,
					profile: formdata.profile,
					system: formdata.system
				}).then(res => {
					this.$message.success("更新成功")
					this.getList()
				})
			},
			getList() {
				communitydetail({
					access_token: this.$store.state.token,
				}).then(res => {
					this.total = res.total
					this.FormData=res
					//工作制度
					this.profilelist=res.profile.split('。')
					//社区人员制度
					this.systemlist=res.system.split('。')
					//更新时间
					this.lists.time = conversionTime(res.updated_at)
				});
			},
		}
	};
</script>

<style>
	strong{
		font-size: 25px;
	}
</style>
