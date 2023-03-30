<template>
	<div class="success">
		<h1>便民工程</h1>
		<el-form :inline="true" :model="{formInline}" class="demo-form-inline">
			<el-row :span="24">
				<el-col :span="4">
					<el-form-item>
						<el-input v-model="formInline.user" placeholder="名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-col>
        <el-col :span="4">
        	<el-form-item>
        		<el-button type="primary" @click="add">新增审批</el-button>
        	</el-form-item>
        </el-col>
			</el-row>
		</el-form>
    <el-empty description="没有数据" v-if="list.length==0" :image-size="430" ></el-empty>
		<el-table :data="list.slice((form.pageNum-1)*form.pageSize,form.pageNum*form.pageSize)" style="width: 100% ;height:600px"
		 v-if="list.length">
			<el-table-column prop="user" label="名称" width="100">
			</el-table-column>
			<el-table-column prop="user" label="创建时间" width="100">
			</el-table-column>
			<el-table-column prop="tel" label="内容" width="100">
			</el-table-column>
     <el-table-column
         align= "center"
         label="审批状态">
       <template slot-scope="scope">
         <span v-if="scope.row.status===1" style="color: #1890FF;font-size: 14px">
           审批中
         </span>
         <span v-else-if="scope.row.status===2" style="color:lightgreen;font-size: 14px">
           审批完成
         </span>
         <span v-else-if="scope.row.status===3" style="color: red;font-size: 14px">
           审批驳回
         </span>
     		  <span v-else-if="scope.row.status===4" style="color:orange;font-size: 14px">
     		    计划完成
     		  </span>
       </template>
     </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handledetails(scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
    <div v-if="show">
       <gadd @closed="closed"></gadd>
    </div>
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
  import gongchengadd from "./gongchengadd.vue"
	export default {
    components:{
     "gadd":gongchengadd
    },
		data() {
			return {
				show: false,
				formInline: {
					user: '',
					region: ''
				},
        status:"1",
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
						address: "上海市徐汇区老沪闵路",
            status:1
					},
					{
						user: 'wan4',
						region: 'beijing',
						tel: "15588889999",
						haoma: "1333894668995654",
						address: "上海市徐汇区老沪闵路",
            status:2,
					},
					{
						user: 'wan1',
						region: 'shanghai',
						tel: "15588889999",
						haoma: "146894668995654",
						address: "上海市徐汇区老沪闵路",
            status:3,
					},
					{
						user: 'wan2',
						region: 'shanghai',
						tel: "15588889999",
						haoma: "123444668995654",
						address: "上海市徐汇区老沪闵路",
						status:4,
					}
				]
			}
		},
		mounted() {
			this.onshow()
			// this.getData()
			this.total = this.lists.length
			let idcard = '142303199604053123'
			let age = analyzeIDCard(idcard)
			let sex = sexIDCard(idcard)
		},
		methods: {
			add() {
         this.$router.push("/Approvalgongcheng/gongchengadd")
			},
      closed(val){
        this.show=val
      },
			handledetails(row) {
				this.$router.push({
					path: "/Approvalgongcheng/gongchengdetail",
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
