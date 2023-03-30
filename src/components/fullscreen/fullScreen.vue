<template>
  <div class="full">
    <div class="header">
      <div class="left">南河社区</div>
      <div style=" margin-left: 150px; width: auto; height: 35px;">
        <el-menu class="el-menu-demo" mode="horizontal" :router="true">
          <el-menu-item  index="/fullscreen/3dtiles" >小区信息</el-menu-item>
          <el-menu-item  index="/fullscreen/inhabitantlists">居民信息</el-menu-item>
          <el-menu-item  index="/fullscreen/party">党员信息</el-menu-item>
          <el-menu-item  index="/fullscreen/business">商户信息</el-menu-item>
          <el-menu-item  index="/fullscreen/building">楼栋信息</el-menu-item>
        </el-menu>
      </div>
      <div class="right">{{time}}</div>
      <router-view class="view"></router-view>
    </div>
    <v-all></v-all>
  </div>
</template>

<script>

  import screenfull from 'screenfull'
  import all from './all.vue'

  export default {
    components:{
      'v-all':all
    },
    data() {
      return {
        show:true,
        time:'',
        viewer: undefined,
        tempEntities: [],
        pointNum: 0,
        floatingPoint: undefined,
        activeShape: undefined,
        name: "",
        config: {
          num: 100,
          content: '{nt}'
        },
        buildMessageBoxShow: false,
        mapMouseDown: false,
        enitylist:[]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      //时间
      Date() {
      	let that = this
      	that.timer = setInterval(function() {
      		const nowDate = new Date();
      		const date = {
      			year: nowDate.getFullYear(),
      			month: nowDate.getMonth() + 1,
      			date: nowDate.getDate(),
      			hours: nowDate.getHours(),
      			minutes: nowDate.getMinutes(),
      			seconds: nowDate.getSeconds(),
      		};
      		const ampm = date.hours < 12 ? 'am' : 'pm';
      		const newhours = date.hours > 9 ? date.hours : "0" + date.hours
      		const newminutes = date.minutes > 9 ? date.minutes : "0" + date.minutes
      		const newsecond = date.seconds > 9 ? date.seconds : "0" + date.seconds
      		const newmonth = date.month > 9 ? date.month : "0" + date.month;
      		const newday = date.date > 9 ? date.date : "0" + date.date;
      		const year = date.year;
      		that.time = year+"/"+newmonth+"/"+newday+"-"+newhours + ":" + newminutes + ":" + newsecond;
      	}, 1000)
      },
      //进入浏览器
      init() {
         this.Date()
        if (!screenfull.isEnabled) {
          this.$message({
            message: '浏览器不支持',
            type: 'warning'
          })
          screenfull.toggle()
        } else {
          if (screenfull.isEnabled) {
            screenfull.request();
          }
        }
      },
      //判断大屏
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      destroy() {
        if (screenfull.enabled) {
          screenfull.off('change', this.change)
        }
      },
    }
  }
</script>
<style>
</style>
