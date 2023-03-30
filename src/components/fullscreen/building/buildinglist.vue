<template>
	<div class="all">
		<div class="allcenter">
			<div class="allcenter-header">
				楼栋信息
				<div class="allcenter-right" @click="close">关闭</div>
			</div>
			<el-row :gutter="20">
				<el-col :span="16">
					<div class="allcenter-content">
						<div class="allcenter-content-header">
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-row>
									<el-col :span="4">
										<el-form-item>
											<el-input v-model="formInline.address" placeholder="地址" clearable>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<el-form-item prop="type">
											<el-select v-model="formInline.type" placeholder="房屋类型" clearable>
												<el-option label="自建房" value="0"></el-option>
												<el-option label="独立楼宇" value="1"></el-option>
												<el-option label="小区" value="2"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<el-form-item prop="is_party">
											<el-select v-model="formInline.kind" placeholder="建筑类型" clearable>
												<el-option label="公寓" value="0"></el-option>
												<el-option label="住宅" value="1"></el-option>
												<el-option label="商住两用" value="2"></el-option>
												<el-option label="商用" value="3"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<el-form-item>
											<el-button type="primary" @click="getList">查询</el-button>
										</el-form-item>

									</el-col>
								</el-row>
							</el-form>
						</div>
						<div class="allcenter-content-content">
							<el-table :data="tableData" highlight-current-row @cell-click="cellHandleclick"
								style="width: 100%;height: 100%;	">
								<el-table-column prop="address" label="地址" width="200">
								</el-table-column>
								<el-table-column prop="buildingname" label="建筑名称" width="200">
								</el-table-column>
								<el-table-column prop="type" label="房屋类型" width="150">
								</el-table-column>
								<el-table-column prop="kind" label="建筑类型" width="150">
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-col>
				<el-col :span='8'>
					<div class="allcenter-righth">
						<div class="allcenter-content-header-one">
							人户分离
						</div>
						<div class="allcenter-content-contents">
							<el-descriptions title="楼栋信息" :column='1' class="sctives">
								<el-descriptions-item label="小区">{{list.address}}</el-descriptions-item>
								<el-descriptions-item label="楼栋号">{{list.type}}</el-descriptions-item>
								<el-descriptions-item label="户数">{{list.kind}}</el-descriptions-item>
								<el-descriptions-item label="人口">{{list.age}}</el-descriptions-item>
								<el-descriptions-item label="群组户数">2</el-descriptions-item>
								<el-descriptions-item label="消防设施">齐全</el-descriptions-item>
								<el-descriptions-item label="群组户数">2</el-descriptions-item>
								<el-descriptions-item label="群组户数">2</el-descriptions-item>
							</el-descriptions>
							<div class="content_footer">
								<el-button class="allcenter-rights" size="mini" @click="all()">房屋绑定</el-button>

							</div>
							<div class="img">
								<img src="../../../assets/img/3.png" />
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div v-if="show">
			<v-build @closeds="closeds" :id='id' :name='name'></v-build>
		</div>
	</div>
</template>
<script>
	import {
		typechange,
		kindchange,
		unnull
	} from '../../../assets/js/public.js'
	import {
		buildingindex,
		buildingdetail
	} from '../../../config/api.js'
	import buildingadd from './buildingadd.vue'
	import store from "../../../store/store";
	export default {
		components: {
			'v-build': buildingadd
		},
		data() {
			return {
				id: "",
				name: "",
				show: false,
				formInline: {
					address: "",
					type: "",
					kind: "",
				},
				list: [],
				tableData: [],
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				buildingindex({
					access_token: this.$store.state.token,
					address: this.formInline.address,
					num: 50,
					type: unnull(this.formInline.type),
					kind: unnull(this.formInline.kind),
				}).then(res => {
					this.total = res.total
					let listall = []
					res.list.forEach(item => {
						const list = {
							id: item.id,
							address: item.address,
							type: typechange(item.type),
							building_name: item.building_name,
							kind: kindchange(item.kind)
						}
						listall.push(list)
					})
					this.tableData = listall
					this.list = this.tableData[0]
				});
			},
			close() {
				this.$router.go(-1)
			},
			cellHandleclick(row, column, cell, event) {
				let that = this
				buildingdetail({
					access_token: this.$store.state.token,
					id: row.id
				}).then(res => {
					that.list = res
				})
			},
			all(row) {
				this.show = true
				this.id = this.list.id
				this.name = this.list.building_name
				let buildingid = this.id
				store.commit('buildingid', buildingid)
			},
			closeds(row) {
				this.show = row
			}
		}
	}
</script>

<style>

</style>
