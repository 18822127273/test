<template>
<el-button type="primary" @click="backPop" class="backpack">返回</el-button>
</template>
<script>
import {backPop} from "./common-fun";

export default {
name: "back-button",
  methods:{
  backPop(){
    backPop()
  }
  }
}
</script>

<style>

</style>