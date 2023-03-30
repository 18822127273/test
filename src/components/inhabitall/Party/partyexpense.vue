<template>
	<div class="success">
		<h1>党费管理</h1>
		<el-form :inline="true" class="demo-form-inline">
			<el-row :span="24">
				
				<el-col :span="3">
					<el-form-item>
						<el-select v-model="time" placeholder="请选择">
							<el-option v-for="(item,index ) in list" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item>
						<back-button></back-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div style="position: relative; overflow: auto; height: 580px;">
			<el-form ref="ruleForm" v-for="(item,index) in ruleForm" :key="index" label-width="50px">
				<el-row :span="24">
					<el-col :span="4">
						<el-form-item label="名字" prop="item.name">
							<el-input v-model=" item.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="金额" prop="item.value">
							<el-input v-model=" item.value"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="标签" prop="item.tags">
							<el-checkbox-group v-model="item.tags">
								<el-checkbox label="1月"></el-checkbox>
								<el-checkbox label="2月"></el-checkbox>
								<el-checkbox label="3月"></el-checkbox>
								<el-checkbox label="4月"></el-checkbox>
								<el-checkbox label="5月"></el-checkbox>
								<el-checkbox label="6月"></el-checkbox>
								<el-checkbox label="7月"></el-checkbox>
								<el-checkbox label="8月"></el-checkbox>
								<el-checkbox label="9月"></el-checkbox>
								<el-checkbox label="10月"></el-checkbox>
								<el-checkbox label="11月"></el-checkbox>
								<el-checkbox label="12月"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
			@pagination="getData(form)" />
	</div>
</template>
<script>
	import {
		isprity
	} from '../../../assets/js/public.js'
	import data from '../../../assets/test.json'
	import {
		houseindex
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				list: [],
				time: '',
				ruleForm: [
					
				],
				jsondata:data,
				form: {
					pageNum: 1,
					pageSize: 10
				},
				total: 10
			}
		},
		mounted() {
			this.time=Object.keys(this.jsondata)[Object.keys(this.jsondata).length-1]
			this.getList()		
		},
		methods: {
			add() {
				this.$router.push({
					path: "/house/houseadd",
				});
			},
			getList() {
				this.list=Object.keys(this.jsondata)	
				let arr = Object.keys(this.jsondata).map(key => {
					if(key==this.time){
						this.ruleForm=this.jsondata[key]
					}
					return data[key]
				})

			},
			submitForm() {
				const fromdata = this.ruleForm
				console.log(this.time,3456)
				// console.log(fromdata, 1111)
			},
		}
	}
</script>

<style>

</style>
