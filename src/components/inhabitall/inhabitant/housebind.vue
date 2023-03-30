<template>
    <div>
      <h1>房屋绑定</h1>
      <back-button></back-button>
      <div class="commadd_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="房屋绑定">
            <el-select v-model="ruleForm.house_id" clearable>
              <el-option v-for="item in houseid" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="与房屋关系" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option label="房主" :value="0"></el-option>
              <el-option label="住户" :value="1"></el-option>
              <el-option label="租户" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否在此居住" prop="is_live">
            <el-select v-model="ruleForm.is_live" placeholder="请选择">
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          </el-form-item>
          <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即绑定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  import {
    bindpeoplehouse,
    houseindex
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        houseid: '',
        ruleForm: {
          type: '',
          is_live: '',
          house_id: ''
        },
        rules: {
          type: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }, ],
          is_live: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }, ],
        },
      }
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next()
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        houseindex({
          access_token: this.$store.state.token,
        }).then(res => {
          let lists = []
          res.list.forEach(item => {
            let result = {
              value: item.id,
              label: item.house_num
            }
            lists.push(result)
          })
          this.houseid = lists
        });
      },
      submitForm(formName) {
        const fromdata = this.ruleForm
        const id = this.$route.query.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            bindpeoplehouse({
              access_token: this.$store.state.token,
              people_id: id,
              house_id: fromdata.house_id,
              type: fromdata.type,
              is_live: fromdata.is_live
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
