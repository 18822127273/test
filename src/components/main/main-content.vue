<template>
  <div class="content_header">
       <router-view ref="deal_router" :activityId="activityId"></router-view>
  </div>
</template>
<script>
  import navleft from './nav-left.vue'
  export default{
    name:'maincontent',
    data(){
      return{
        activityId:''
      }
    }
  }
</script>
<style>
  
</style>
