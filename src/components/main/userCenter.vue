<template>
  <div>
    <back-button></back-button>
     个人中心
  </div>
</template>

<script>
  import {forgetPwd,captcha} from "../../config/api";
  export default {
  	data() {
  		var checkphone = (rule, value, callback) => {
  			// let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
  			if (value == "") {
  				callback(new Error("请输入手机号"));
  			} else if (!this.isCellPhone(value)) {
  				//引入methods中封装的检查手机格式的方法
  				callback(new Error("请输入正确的手机号!"));
  			} else {
  				callback();
  			}
  		};
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
  			} else if (value !== this.ruleForm.pass) {
  				callback(new Error("两次输入密码不一致!"));
  			} else {
  				callback();
  			}
  		};
  		return {
  			ruleForm: {
  				pass: "",
  				checkPass: "",
  				account: "",
  				btnText: "发送验证码",
  				disabled: false,
  			},
  			rules: {
  				pass: [{
  					required: true,
  					validator: validatePass,
  					trigger: "blur"
  				}],
  				checkPass: [{
  					required: true,
  					validator: validatePass2,
  					trigger: "blur"
  				}, ],
  				account: [{
  					required: true,
  					validator: checkphone,
  					trigger: "blur"
  				}],
  				captcha: [{
  					required: true,
  					message: "请输入短信验证码",
  					trigger: "blur"
  				}, ],
  			},
  		};
  	},
  	methods: {
  		//检查手机号
  		isCellPhone(val) {
  			if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
  				return false;
  			} else {
  				return true;
  			}
  		},
  		// 发送验证码
  		bindforgetSendCode() {
  			//手机号 为空的话
  			const requestData = this.ruleForm
  			this.$refs.ruleForm.validateField("account", (errorMessage) => {
  				console.log(errorMessage);
  				if (!errorMessage) {
  					this.$message("已发送验证码，请查收");

  					this.ruleForm.btnText = "请稍候...";
  					captcha({
  						account: requestData.account,
  						type:0
  					}).then(res => {
  						console.log(res,1111)
  					})
  					setTimeout(() => {
  						this.ruleForm.disabled = true;
  						this.doLoop(60);
  					}, 500);
  				} else {
  					return false;
  				}
  			})
  		},
  		doLoop(seconds) {
  			console.log(seconds);
  			seconds = seconds ? seconds : 60;
  			this.ruleForm.btnText = seconds + "s后获取";
  			// this.code = code
  			let countdown = setInterval(() => {
  				if (seconds > 0) {
  					this.ruleForm.btnText = seconds + "s后获取";
  					--seconds;
  				} else {
  					this.ruleForm.btnText = "获取验证码";
  					this.ruleForm.disabled = false;
  					clearInterval(countdown);
  				}
  			}, 1000);

  		},
  		submitForm(formName) {
  			const requestData = this.ruleForm
  			this.$refs.ruleForm.validate(valid => {
  				if (valid) {
  					forgetPwd({
  						account: requestData.account,
  						captcha:requestData.captcha,
  						password:requestData.pass
  					}).then(res => {
  						console.log("忘记密码");
  						if (this.$route.query.redirect) { //如果存在参数
  							this.$message.success("修改成功")
  							let redirect = this.$route.query.redirect
  							this.$router.replace(redirect) //则跳转至进入登录页前的路由
  						} else {
  							this.$router.replace('/') //否则跳转至首页
  						}

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
