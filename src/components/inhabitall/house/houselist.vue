<template>
	<div class="success">
		<h1>房屋管理</h1>
		<el-form :inline="true" :model="{formInline}" class="demo-form-inline">
			<el-row :span="24">
				<el-col :span="3">
					<el-form-item>
						<el-input v-model="formInline.house_num" placeholder="房间号" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
				  <el-form-item >
				    <el-select v-model="formInline.is_private_house" placeholder="是否自建房" clearable>
				      <el-option label="否" value="0"></el-option>
				      <el-option label="是" value="1"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="15">
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="add">新增</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div style="position: relative;">
			<el-table :data="lists" style="width: 100% " height="580px">
				<el-table-column prop="house_num" label="房间号" width="100">
				</el-table-column>
				<el-table-column prop="floor" label="楼层" width="100">
				</el-table-column>
				<el-table-column prop="area" label="面积" width="100">
				</el-table-column>
				<el-table-column prop="structure" label="楼房结构" width="100">
				</el-table-column>
				<el-table-column prop="decoration" label="装修情况" width="100">
				</el-table-column>
				<el-table-column prop="direction" label="房屋朝向" width="100">
				</el-table-column>
				<el-table-column prop="is_private_house" label="是否自建房" width="100">
				</el-table-column>
				<el-table-column prop="elevator_house" label="梯户比例" width="100">
				</el-table-column>
				<el-table-column label="操作" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="handledetails(scope.row)">详情</el-button>
						<el-button type="text" @click="handfamily(scope.row)">关联成员</el-button>
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
		isprity
	} from '../../../assets/js/public.js'
	import {
		houseindex
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				formInline: {
					is_private_house: '',
					building_id: '',
					floor: '',
					house_num: '',
					area: '',
					structure: '',
					decoration: '',
					direction: '',
					elevator_house: '',
				},
				form: {
					pageNum: 1,
					pageSize: 10
				},
				empty: false,
				total: 10,
				lists: [],
				listall: [],
			}
		},
		activated() {
			this.getList()
		},
		mounted() {
			this.getList()
			// this.getData()
		},
		methods: {
			add() {
				this.$router.push({
					path: "/house/houseadd",
				});
			},
			getList() {
				const id = this.$route.query.id
				houseindex({
					access_token: this.$store.state.token,
					building_id: id,
					house_num: this.formInline.house_num,
					is_private_house:this.formInline.is_private_house,
					page: this.form.pageNum,
					num: this.form.pageSize,
				}).then(res => {
					this.total = res.total
					let listall = []
					res.list.forEach(item => {
						const list = {
							id: item.id,
							is_private_house: isprity(item.is_private_house),
							building_id: item.building_id,
							floor: item.floor,
							house_num: item.house_num,
							area: item.area,
							structure: item.structure,
							decoration: item.decoration,
							direction: item.direction,
							elevator_house: item.elevator_house,
						}
						listall.push(list)
					})
					this.lists = listall
				});
			},
			getData(form) {
				this.getList()
			},
			//家庭成员
			handfamily(row) {
				this.$router.push({
					path: "/house/housefamily",
					query: {
						id: row.id,
					}
				});
			},
			//详情页
			handledetails(row) {
				this.$router.push({
					path: '/house/housedetail',
					query: {
						id: row.id
					}
				});
			},
		}
	}
</script>

<style>

</style>
