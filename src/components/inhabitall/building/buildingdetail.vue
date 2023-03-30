<template>
  <div>
    <div>
      <div class="commaddcenter_header">
        <back-button></back-button>
        <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">更新信息</el-button>
      </div>
      <div class="commadd_content">
        <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="地址" prop="address">
            <el-input v-model=" ruleForm.address" width="100"></el-input>
          </el-form-item>
          <el-form-item label="建筑名称" prop="building_name">
            <el-input v-model="ruleForm.building_name"></el-input>
          </el-form-item>
		  <el-form-item label="建筑类型" prop="kind">
		    <el-select v-model="ruleForm.kind"  clearable>
		      <el-option label="公寓" :value="0"></el-option>
		      <el-option label="住宅" :value="1"></el-option>
		      <el-option label="商住两用" :value="2"></el-option>
			  <el-option label="商用" :value="3"></el-option>
		    </el-select>
		  </el-form-item>
          <el-form-item label="房屋类型" prop="type">
            <el-select v-model="ruleForm.type"  clearable>
              <el-option label="自建房" :value="0"></el-option>
              <el-option label="独立楼宇" :value="1"></el-option>
              <el-option label="小区" :value="2"></el-option>
            </el-select>
          </el-form-item>
		  <el-form-item label="是否老旧小区改造" prop="type">
		    <el-select v-model="ruleForm.type"  clearable>
		      <el-option label="否" :value="0"></el-option>
		      <el-option label="是" :value="1"></el-option>
		    </el-select>
		  </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    buildingdetail,
    buildingupdate
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        ruleForm: {
          address: '',
          building_name: '',
          kind: '',
          type: '',
        },
        rules: {
          address: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
         building_name: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
         type: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }],
          kind: [{
             required: true,
             message: '请选择',
             trigger: 'blur'
           }],

        }
      }
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next()
    },
    mounted() {
      this.getlist()
    },
    methods: {
      getlist() {
        const id = this.$route.query.id
        buildingdetail({
          access_token: this.$store.state.token,
          id: id
        }).then(res => {
          // console.log(res,111)
          this.ruleForm = res
        })
      },
      submitForm() {
        const fromdata = this.ruleForm
        const id = this.$route.query.id
        buildingupdate({
          access_token: this.$store.state.token,
          id: id,
          address: fromdata.address,
          building_name: fromdata.building_name,
          type: fromdata.type,
          kind: fromdata.kind,
        }).then(res => {
          this.$message.success("更新成功")
        })
      },
    }
  }
</script>

<style>
</style>
