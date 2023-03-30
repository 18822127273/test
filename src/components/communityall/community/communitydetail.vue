<template>
	<div class="commadds" >
	  <div class="commadd_centers">
		  <back-button></back-button>
	    <el-descriptions  direction=" horizontal" :column="1" border  >
	      <el-descriptions-item label="小区名" >{{detailss.region}}</el-descriptions-item>
	      <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="小区名" aria-rowindex="10%">{{detailss.region}}</el-descriptions-item>
	      <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="小区名" aria-rowindex="10%">{{detailss.region}}</el-descriptions-item>
	      <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="小区名" aria-rowindex="10%">{{detailss.region}}</el-descriptions-item>
	      <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	      <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  
		  <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  
		  <el-descriptions-item label="负责任人">{{detailss.user}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
		  <el-descriptions-item label="地址" >{{detailss.address}}</el-descriptions-item>
	    
	    </el-descriptions>
	     <el-button size="mini" @click="handleEdit()">编辑</el-button>
	    
	  </div>
	</div>
</template>

<script>
  export default{
    props: ['commshow','detailss'],
    methods:{
      close() {
        let shows = false
        this.$emit('changeMsg', shows)
      },
	  handleEdit(row) {
	  	this.$router.push('/community/communityrevise')
	  },
    },
    mounted() {
      // console.log(this.detailss)
    }
  }
</script>

<style>

</style>
