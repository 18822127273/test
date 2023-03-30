<template>
	<div class="success">
		<h1>特殊群体管理</h1>
		<el-form :inline="true" :model="{formInline}" class="demo-form-inline">
			<el-row :span="24">
				<el-col :span="4">
					<el-form-item>
						<el-input v-model="formInline.user" placeholder="姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item>
						<el-input v-model="formInline.haoma" placeholder="身份证号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="add">新增</el-button>
					</el-form-item>
					<el-form-item>
						<enterxlsx></enterxlsx>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
    <el-empty description="没有数据" v-if="lists.length==0" :image-size="430" ></el-empty>
		<el-table :data="lists.slice((form.pageNum-1)*form.pageSize,form.pageNum*form.pageSize)" style="width: 100% " height="600px"
		 v-if="lists.length">
			<el-table-column prop="user" label="名字" width="100">
			</el-table-column>
			<el-table-column prop="user" label="性别" width="100">
			</el-table-column>
			<el-table-column prop="tel" label="电话" width="100">
			</el-table-column>
			<el-table-column prop="user" label="籍贯" width="100">
			</el-table-column>
			<el-table-column prop="user" label="入住日期" width="100">
			</el-table-column>
			<el-table-column prop="haoma" label="身份证号" width="100">
			</el-table-column>
			<el-table-column prop="address" label="家庭地址">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handledetails(scope.row)">详情</el-button>
				</template>
			</el-table-column>
			<el-table-column label="其他">
				<template slot-scope="scope">
					<el-button size="mini" @click="handfamily(scope.row)">家庭成员</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize" @pagination="getData(form)" />
	</div>
</template>
<script>
	import {
		listres,
		analyzeIDCard,
		sexIDCard,
		itemall
	} from "../../../assets/js/public.js"	
	export default {
		data() {
			return {
				show: false,
				formInline: {
					user: '',
					region: ''
				},
				form: {
					pageNum: 1,
					pageSize: 10
				},
				total: 10,
				lists: [],
				list: [{
						user: 'wan',
						region: 'shanghai',
						haoma: "14230319960405314",
						tel: "15588889999",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan4',
						region: 'beijing',
						tel: "15588889999",
						haoma: "1333894668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan1',
						region: 'shanghai',
						tel: "15588889999",
						haoma: "146894668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan2',
						region: 'shanghai',
						tel: "15588889999",
						haoma: "123444668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
					{
						user: 'wan3',
						region: 'beijing',
						tel: "15588889999",
						haoma: "123454668995654",
						address: "上海市徐汇区老沪闵路"
					},
				]
			}
		},
		mounted() {
			this.onshow()
			this.getData()
			this.total = this.lists.length
			let idcard = '142303199604053123'
			let age = analyzeIDCard(idcard)
			let sex = sexIDCard(idcard)
			// console.log(age,sex,11111)
		},
		methods: {
			add() {
				this.$router.push({
					path: "/inhabitant/inhabitantadd",

				});
			},
			getData() {

			},
			//家庭成员
			handfamily(row) {
				this.$router.push({
					path: "/inhabitant/inhabitfamily",
					query: {
						id: row.user,
						haoma: row.haoma
					}
				});
			},
			handledetails(row) {
				this.$router.push({
					path: "/inhabitant/inhabitdetail",
					query: {
						id: row.user,
						haoma: row.haoma
					}
				});
			},
			handleEdit(index, row) {
				this.commshowsa = true //编辑
			},
			onshow() {
				this.list.forEach(item => {
					let result = itemall(item)
					this.lists.push(result)
				})
			},
			onSubmit() {
				this.lists = []
				this.list.forEach(item => {
					// console.log(this.formInline.region)
					if (item.user == this.formInline.user) {
						let result = itemall(item)
						this.lists.push(result)

						if (item.tel == this.formInline.tel) {
							this.lists = []
							let result = itemall(item)
							this.lists.push(result)
						} else {
							// alert("没有此数据")
						}
					} else if (item.haoma == this.formInline.haoma) {
						let result = itemall(item)
						this.lists.push(result)
					} else {
						// alert("没有此数据")
					}
				})
			}
		}
	}
</script>

<style>

</style>
