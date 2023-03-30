<template>
  <div class="first_login_container">
    <div class="login_form">
      <h1 class="login-title">社区管理系统</h1>
      <p style="text-align: center;font-size: 14px;color: #1890FF;margin-top: 10px">欢迎登录</p>
      <el-form style="margin-top: 10px ;" :model="loginData" :rules="rules" ref="loginForm">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <el-form-item prop="account">
              <el-input size="small" placeholder="用户名" v-model="loginData.account" prefix-icon="el-icon-user-solid"
                clearable @keyup.enter.native="cuLoginCheck" >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="6">
            <el-form-item style="margin-top: 10px " prop="password">
              <el-input size="small" placeholder="密码" v-model="loginData.password" prefix-icon="el-icon-lock"
                type="password" @keyup.enter.native="cuLoginCheck" clearable>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 10px ">
				<el-link  style="float: left;" @click="regions">注册</el-link>
              <el-link type="danger" style="float: right;" @click="region">忘记密码</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="6">
            <el-button @click="cuLoginCheck" type="primary">用户登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    login
  } from "../../config/api";
  import store from "../../store/store";
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
      return {
        loginData: {
          account: '', //用户名
          password: '', //密码
        },
        rules: {
          account: [{
            required: true,
            // message: '用户名不能为空',
            validator: checkphone,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],

        }
      }
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
	  regions() {
	    this.$router.replace('/regions') //否则跳转至首页
	  },
      region() {
        this.$router.replace('/region') //否则跳转至首页
      },
      cuLoginCheck: function() {
        const requestData = this.loginData
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            login({
              account: requestData.account,
              password: requestData.password
            }).then(res => {
              store.commit('LOGIN_IN', res.access_token);
              if (this.$route.query.redirect) { //如果存在参数
                this.$message.success("登录成功")
                let redirect = this.$route.query.redirect
                this.$router.replace(redirect) //则跳转至进入登录页前的路由
              } else {
                this.$router.replace('/') //否则跳转至首页
              }
            })
          }
        })
      },

    }
  }
</script>

<style scope>

</style>
