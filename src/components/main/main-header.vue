<template>
  <div class="main_header">
  	<span class="title">智慧社区</span>
  	<div class="main_headerright">
  			<div style="display: inline-block;float: left;">
  				<el-dropdown trigger="click"  @command="handleCommand">
  					<span class="el-dropdown-link" >
  						个人中心<i class="el-icon-arrow-down el-icon--right"></i>
  					</span>
  					<el-dropdown-menu>
  						<el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
  						<el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
  					</el-dropdown-menu>
  				</el-dropdown>
  			</div>
  			<div style="float: left">
  				<img style="height:17px;width:1px; margin-left:10px;margin-right: 10px" :src="cutPng" />
  				<img @click="launchToScreen()" style="width:22px;" :src="wxb" />
  				<img style="height:17px;width:1px; margin-left:10px;margin-right: 10px" :src="cutPng" />
  				<img @click="exit()" style="width:22px;" :src="exitPng" />
  			</div>

  	</div>
  </div>
</template>

<script>
	import cutPng from "../../assets/img/cut.jpg";
	import exitPng from "../../assets/img/exit.png"
	import wxb from "../../assets/img/wxb.png"
    import router from "../../router/index";
	import store from "../../store/store";
  export default{
    name:"mainheader",
    data(){
        return{
		  wxb: wxb,
		  cutPng: cutPng,
		  exitPng: exitPng
        }
    },
    methods: {
        handleCommand(command) {
        	if (command === 'changePwd') {
        		this.$router.replace("/main/changePassword")
        	} else {

        		this.$router.replace("/main/userCenter")
        	}
        },
		launchToScreen(){
			setTimeout(() => {
				router.push({
					path: '/fullScreen',
				});
			}, 1500);
		},
		exit() {
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
		},
    }
  }
</script>

<style>

</style>
