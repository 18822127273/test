<template>
  <div class="commadds">
    <div class="commadd_centers">
      <back-button></back-button>
      <div class="commadd_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
          <el-form-item>
            <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    companycreate,
  } from '../../config/api.js'
  export default {
    data() {
      return {
        radio: 1,
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
            message: '请输入名字',
            trigger: 'blur'
          }, ],
          address: [{
            required: true,
            message: '请输入名字',
            trigger: 'blur'
          }, ],
        },
      }
    },
    beforeMount() {},
    methods: {
      submitForm(formName) {
        const fromdata = this.ruleForm
        this.$refs[formName].validate((valid) => {
          if (valid) {
            companycreate({
              access_token: this.$store.state.token,
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
            });
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style>

</style>
