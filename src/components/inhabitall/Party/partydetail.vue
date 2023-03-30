<template>
	<div>
		<div class="commadd">
			<div class="commadd_center">
				<back-button></back-button>
				<el-form :model="list"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="名字" prop="name">
				    <el-input v-model=" list.name" ></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号" prop="card">
				    <el-input v-model="list.idcard"></el-input>
				  </el-form-item>
				  <el-form-item label="电话" prop="card">
				    <el-input v-model="list.idcard"></el-input>
				  </el-form-item>
				  <el-form-item label="地址" prop="card">
				    <el-input v-model="list.idcard"></el-input>
				  </el-form-item>
				  <el-form-item label="身份证号" prop="card">
				    <el-input v-model="list.idcard"></el-input>
				  </el-form-item>
				    <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">更新信息</el-button>
				    
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:{
					name:"",
					idcard:""
				}		
			}
		},
		created() {
			this.getlist()
			console.log(this.list)
		},
		methods: {
			getlist() {
				this.list.name = this.$route.query.id
				this.list.idcard = this.$route.query.haoma
			},

			close() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
</style>
