<template>
  <div>
     <back-button></back-button>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
   	<h3 class="login-title">修改密码</h3>
   	<el-form-item label="密码" prop="pass">
   		<el-input v-model="ruleForm.pass" autocomplete="off" placeholder="请输入旧密码"></el-input>
   	</el-form-item>
   	<el-form-item label="新密码" prop="newpassword">
   		<el-input  v-model="ruleForm.newpassword" autocomplete="off" placeholder="请确认新密码">
   		</el-input>
   	</el-form-item>
   	<el-form-item>
   		<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
   		<el-button @click="resetForm('ruleForm')">重置</el-button>
   	</el-form-item>
   </el-form>
  </div>
</template>

<script>
  import {changepassword} from "../../config/api";
  import store from "../../store/store";
  import router from "../../router/index";
  export default {
  	data() {
  		var validatePass = (rule, value, callback) => {
  			if (value === "") {
  				callback(new Error("请输入密码"));
  			} else {
  				if (this.ruleForm.checkPass !== "") {
  					this.$refs.ruleForm.validateField("checkPass");
  				}
  				callback();
  			}
  		};
  		var validatePass2 = (rule, value, callback) => {
  			if (value === "") {
  				callback(new Error("请再次输入密码"));
  			} else if (value == this.ruleForm.pass) {
  				callback(new Error("两次输入密码一致!"));
  			} else {
  				callback();
  			}
  		};
  		return {
  			ruleForm: {
  				pass: "",
  				newpassword:''
  			},
  			rules: {
  				pass: [{
  					required: true,
  					validator: validatePass,
  					trigger: "blur"
  				}],
  				newpassword: [{
  					required: true,
  					validator: validatePass2,
  					trigger: "blur"
  				}, ],
  			},
  		};
  	},
  	methods: {
  		submitForm(formName) {
  			const requestData = this.ruleForm
			console.log(requestData,2354)
  			this.$refs.ruleForm.validate(valid => {
  				if (valid) {
  					changepassword({
						access_token: this.$store.state.token,
  						password:requestData.pass,
						new_password:requestData.newpassword
  					}).then(res => {
						console.log(res,123)
						this.$message.success("修改成功")
						localStorage.removeItem('userToken');
						store.commit('LOGIN_OUT', null);
						setTimeout(() => {
							router.replace({
								path: '/login',
								query: {
									redirect: router.currentRoute.fullPath
								}
							});
						}, 1000);
  						// if (this.$route.query.redirect) { //如果存在参数
  							
  						// } else {
  						// 	this.$router.replace('/') //否则跳转至首页
  						// }

  					})
  				}
  			})


  		},
  		resetForm(formName) {
  			this.$refs[formName].resetFields();
  		},
  	},
  };
</script>

<style>
</style>
