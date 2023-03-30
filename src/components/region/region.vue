<template>
	<div class="reg">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="login_form">
			<h3 class="login-title">忘记密码</h3>
			<el-form-item label="手机号码" prop="account">
				<el-input v-model.number="ruleForm.account" placeholder="请输入手机号码"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="captch">
				<div class="bind_code margin_top">
					<el-input class="bind_code_input code" v-model="ruleForm.captcha" type="text"
						placeholder="请输入验证码" />
					<el-link class="bind_code_gain" type="info" :disabled="ruleForm.disabled" :underline="false"
						@click="bindforgetSendCode">{{ ruleForm.btnText }}</el-link>
				</div>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认新密码">
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<back-button></back-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {
		forgetPwd,
		captcha
	} from "../../config/api";
	export default {
		name: 'region',
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
							type: 0
						}).then(res => {
							// console.log(res,1111)
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
			submitForm() {
				const requestData = this.ruleForm
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						forgetPwd({
							account: requestData.account,
							captcha: requestData.captcha,
							password: requestData.pass
						}).then(res => {
							this.$message.success("修改成功")
							this.$router.replace('/login') //否则跳转至首页
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
