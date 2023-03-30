<template>
  <div>
    <div>
      <div class="commaddcenter_header">
        <back-button></back-button>
        <!-- <el-button @click="backlast">返回</el-button> -->
        <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">更新信息</el-button>
      </div>
      <div class="commadd_content">
        <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="ruleForm.name" width="100px"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="筛查情况" prop="screening">
            <el-input v-model="ruleForm.screening"></el-input>
          </el-form-item>
          <el-form-item label="最新动态" prop="news">
            <el-input v-model="ruleForm.news"></el-input>
          </el-form-item>
          <el-form-item label="员工数量" prop="staff_count">
            <el-input v-model="ruleForm.id_card_address"></el-input>
          </el-form-item>
          <el-form-item label="股东" prop="shareholder	">
            <el-input v-model="ruleForm.shareholder"></el-input>
          </el-form-item>
          <el-form-item label="法人" prop="legal_person">
            <el-input v-model="ruleForm.legal_person"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="ruleForm.remarks"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="lat">
            <el-input v-model="ruleForm.lat"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="lon">
            <el-input v-model="ruleForm.lon"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    companydetail,companyupdate
  } from '../../config/api.js'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          address: "",
          screening: "",
          news: '',
          staff_count: '',
          shareholder: '',
          legal_person: '',
          lat: "",
          lon: "",
          remarks:''
        },
        rules: {
          name: [{
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }]
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
        companydetail({
          access_token: this.$store.state.token,
          id: id
        }).then(res => {
          this.ruleForm=res
        })
      },
      submitForm() {
        const fromdata = this.ruleForm
        const id = this.$route.query.id
        companyupdate({
          access_token: this.$store.state.token,
          id: id,
          name: fromdata.name,
          address: fromdata.address,
          screening: fromdata.screening,
          news: fromdata.news,
          staff_count: fromdata.staff_count,
          shareholder: fromdata.shareholder,
          legal_person: fromdata.legal_person,
          remarks:fromdata.remarks,
          lat:fromdata.lat,
          lon:fromdata.lon,
        }).then(res => {
          this.$message.success("更新成功")
        })
      },
    }
  }
</script>

<style>
</style>
