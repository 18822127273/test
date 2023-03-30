<template>
  <div class="commadds">
    <div class="commadd_centers">
      <back-button></back-button>
      <div class="commadd_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address" width="100px"></el-input>
          </el-form-item>
          <el-form-item label="建筑名称" prop="buildingname">
            <el-input v-model="ruleForm.buildingname"></el-input>
          </el-form-item>
          <el-form-item label="房屋类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="政治面貌">
              <el-option label="自建房" value="0"></el-option>
              <el-option label="独立楼宇" value="1"></el-option>
              <el-option label="小区" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建筑类型" prop="kind">
            <el-select v-model="ruleForm.kind" placeholder="政治面貌">
              <el-option label="公寓" value="0"></el-option>
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商住两用" value="2"></el-option>
              <el-option label="商用" value="3"></el-option>
            </el-select>
          </el-form-item>
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
   buildingcreate
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        radio: 1,
        ruleForm: {
         address:'',
         buildingname:'',
         type:'',
         kind:''
        },
        rules: {
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }, ],
         buildingname: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }, ],
          type: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
          king: [{
            required: true,
            message: '请选择',
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
            buildingcreate({
              access_token: this.$store.state.token,
              address: fromdata.address,
              building_name: fromdata.buildingname,
              type: fromdata.type,
              kind: fromdata.kind,
            }).then(res => {
              console.log(res,111)
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
