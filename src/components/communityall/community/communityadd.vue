<template>
	<div class="commadds" >
	  <div class="commadd_centers">
		  <back-button></back-button>
	   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	   	<el-form-item label="名称" prop="name">
	   		<el-input v-model="ruleForm.name"></el-input>
	   	</el-form-item>
	   	<el-form-item label="负责人" prop="people">
	   		<el-input v-model="ruleForm.people"></el-input>
	   	</el-form-item>
	   	<el-form-item label="地址" prop="address">
	   		<el-input v-model="ruleForm.address"></el-input>
	   	</el-form-item>
	   	<el-form-item label="政治面貌" prop="desc">
	   		<el-select v-model="ruleForm.party" placeholder="政治面貌">
	   			<el-option label="党员" value="党员"></el-option>
	   			<el-option label="团员" value="团员"></el-option>
	   			<el-option label="群众" value="群众"></el-option>
	   		</el-select>
	   	</el-form-item>
	   	<el-form-item label="备注" prop="desc">
	   		<el-input type="textarea" v-model="ruleForm.desc"></el-input>
	   	</el-form-item>
	   	<el-form-item>
	   		<el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
	   		<el-button @click="resetForm('ruleForm')">重置</el-button>
	   	</el-form-item>
	   </el-form>
	  </div>
	</div>
</template>

<script>
	export default {
		props: ['commshow'],
		data() {
			return {
				ruleForm: {
					name: '',
					people: '',
					address: '',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					people: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					address: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}],
					party: [{
						required: true,
						message: '请填写',
						trigger: 'blur'
					}],

					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			submitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						let result = this.ruleForm
						console.log(this.ruleForm,111)
						this.$emit('changeMsgs', result)
						let shows = false
						this.$emit('changeMsg', shows)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		}
	}
</script>

<style>
	
</style>
