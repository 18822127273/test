// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
//rem文件
import rem from '@/assets/js/rem.js'

Vue.config.productionTip = false
//vuex文件
import store from './store/store'
//elementui文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//大屏
import "./assets/css/index.css"
//主页面数据css
import "@/assets/css/common.css"
import "@/assets/css/reset.css"
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
//echarts引入
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts //如果报错可以使用
//公用返回按钮
import backButton from "./components/public/back-button.vue"
Vue.component("back-button", backButton)
//导出文件
import exportExcel from "./components/public/excelpublic.vue"
Vue.component("export-excel-common", exportExcel)
//导入文件
import enterxlsx from "./components/public/enterxlsx.vue"
Vue.component("enterxlsx", enterxlsx)
//分页
import pages from "./components/public/pages.vue"
Vue.component("pages", pages)
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({ //可全局初始化，也可按需初始化
  key: '9249cfe4f4895b41dc71ce9d48774a90',
  uiVersion: '1.0.11', // 如果要使用官方的ui 在此必须要配置
  //plugin是你要使用到的插件，直接在这里注册
  plugin: [
    'AMap.Geocoder',
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
