<template>
	<div class="success">
		<h1>居民管理</h1>
		<el-form :inline="true" :model="{formInline}" class="demo-form-inline">
			<el-row :span="24">
				<el-col :span="3">
					<el-form-item>
						<el-input v-model="formInline.name" placeholder="姓名" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item>
						<el-input v-model="formInline.id_card" placeholder="身份证号" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item prop="education">
						<el-select v-model="formInline.education" placeholder="学历" clearable>
							<el-option label="小学" value="0"></el-option>
							<el-option label="初中" value="1"></el-option>
							<el-option label="高中" value="2"></el-option>
							<el-option label="大学" value="3"></el-option>
							<el-option label="硕士研究生" value="4"></el-option>
							<el-option label="博士研究生" value="5"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item prop="is_party">
						<el-select v-model="formInline.is_party" placeholder="党员" clearable>
							<el-option label="非党员" value="0"></el-option>
							<el-option label="党员" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item prop="is_resident">
						<el-select v-model="formInline.is_resident" placeholder="常驻人员" clearable>
							<el-option label="非常住" value="0"></el-option>
							<el-option label="常住" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item prop="age">
						<el-select v-model="formInline.age" placeholder="年龄段" clearable>
							<el-option label="0-10" value="0-10"></el-option>
							<el-option label="11-35" value="11-35"></el-option>
							<el-option label="36-65" value="36-65"></el-option>
							<el-option label="66-150" value="66-150"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="add">新增</el-button>
					</el-form-item>
					<el-form-item>
						<enterxlsx></enterxlsx>
					</el-form-item>
					<el-form-item>
						<el-button type="text" @click="exportexcel">导出</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<export-excel-common :list="listexport" v-if='show' @close='close'></export-excel-common>
		<div style="width: 100%; position: relative; ">
			<el-table :data="lists" style="width: 100% " height="580px" stripe highlight-current-row>
				<el-table-column prop="name" label="名字" width="150" fixed>
				</el-table-column>
				<el-table-column prop="gender" label="性别" width="150">
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="150">
				</el-table-column>
				<el-table-column prop="id_card" label="身份证号" width="150">
				</el-table-column>
				<el-table-column prop="tags" label="标签" width="150">
				</el-table-column>		
				<el-table-column prop="religion" label="电话" width="150">
				</el-table-column>
				<el-table-column prop="address" label="居住地址" width="150">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width='400'>
					<template slot-scope="scope">
						<el-button type="text" @click="handledetails(scope.row)">详情</el-button>
						<el-button type="text" @click="housebind(scope.row)">房屋绑定</el-button>
						<el-button type="text" @click="familybind(scope.row)">成员绑定</el-button>
						<el-button type="text" @click="handfamily(scope.row)">关联成员</el-button>
						<el-button type="text" @click="relacthouse(scope.row)">关联房屋</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
			@pagination="getData(form)" />
	</div>
</template>
<script>
	import {
		listres,
		analyzeIDCard,
		sexIDCard,
		itemall,
		isparty,
		isresident,
		marital
	} from "../../../assets/js/public.js"
	import {
		index,
		regiondetail
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				show: false,
				formInline: {
					name: "",
					id_card: "",
					education: "",
					age: '',
					is_party: '',
					is_resident: '',
					region_id:"",
				},
				form: {
					pageNum: 1,
					pageSize: 10
				},
				empty: false,
				total: 10,
				lists: [],
				listexport: [],
				addressname: "",
				value:''
			}
		},
		activated() {
			this.getList()
		},
		mounted() {
			this.getList()
			this.getData()
		},
		methods: {
			//新增
			add() {
				this.$router.push({
					path: "/inhabitant/inhabitantadd",
				});
			},
			//导出
			exportexcel() {
				this.show = true
			},
			//关闭
			close() {
				this.show = false
			},
			getList() {
				index({
					access_token: this.$store.state.token,
					page: this.form.pageNum,
					num: this.form.pageSize,
					age: this.formInline.age,
					id_card: this.formInline.id_card,
					name: this.formInline.name,
					education: this.formInline.education,
					is_party: this.formInline.is_party,
					is_resident: this.formInline.is_resident
				}).then(res => {
					// console.log(res,345)
					this.total = res.total
					let listall = []
					let listexport = []
					res.list.forEach(item => {
						const list = {
							id: item.id,
							name: item.name,
							id_card: listres(item.id_card),
							age: analyzeIDCard(item.id_card),
							gender: sexIDCard(item.id_card),
							id_card_address: item.id_card_address,
							tags: item.tags,
							religion: item.religion,
							is_resident: item.is_resident,
							addresss:item.address,
							region_id:'南河社区'
						}
						listall.push(list)
						regiondetail({
							id: item.native_place_province_id
						}).then(res => {
							// console.log(res,111)
							this.addressname = res.region_name
							const listexpo = {
								name: item.name,
								name_used_before: item.name_used_before,
								age: analyzeIDCard(item.id_card),
								id_card: item.id_card,
								tags: item.tags,
								address: this.addressname,
								gender: sexIDCard(item.id_card),
								is_party: isparty(item.is_party),
								native_place_id: item.native_place_id,
								profession: item.profession,
								id_card_address: item.id_card_address,
								residential_quarters_address: item
									.residential_quarters_address,
								company: item.company,
								company_address: item.company_address,
								birth_address: item.birth_address,
								education: item.education,
								marital_status: marital(item.marital_status),
								religion: item.religion,
								is_resident: isresident(item.is_resident)
							}
							listexport.push(listexpo)
						})
					})
					this.lists = listall
					this.listexport = listexport
				});
			},
			getData(form) {
				this.getList()
			},
			//家庭成员
			handfamily(row) {
				this.$router.push({
					path: "/inhabitant/inhabitfamily",
					query: {
						id: row.id,

					}
				});
			},
			//详情页
			handledetails(row) {
				this.$router.push({
					path: '/inhabitant/inhabitdetail',
					query: {
						id: row.id
					}
				});
			},
			//房屋绑定
			housebind(row) {
				this.$router.push({
					path: '/inhabitant/housebind',
					query: {
						id: row.id
					}
				});
			},
			//成员绑定
			familybind(row) {
				this.$router.push({
					path: '/inhabitant/familybind',
					query: {
						id: row.id
					}
				});
			},
			//房屋选择
			relacthouse(row) {
				this.$router.push({
					path: '/inhabitant/housefamily',
					query: {
						id: row.id
					}
				});
			}
		}
	}
</script>

<style>
	/* 用来设置当前页面element全局table 选中某行时的背景色*/
	.cafeteria_model>>>.el-table__body tr.current-row>td {
		background-color: #1F98FA !important;
		color: #fff;
	}
</style>
