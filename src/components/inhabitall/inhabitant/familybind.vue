<template>
  <div>
    <h1>成员绑定</h1>
    <back-button></back-button>
    <div class="commadd_content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-autocomplete v-model="ruleForm.name" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
            @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="与成员关系" prop="relation_type">
          <el-select v-model="ruleForm.relation_type" placeholder="请选择">
            <el-option label="夫妻" :value="0"></el-option>
            <el-option label="父子/母子" :value="1"></el-option>
            <el-option label="其他关系" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即绑定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    bingpeoplerelation,
    index
  } from '../../../config/api.js'
  export default {
    data() {
      name:'familybinfd,'
      return {
        timeout:null,
        restaurants:[],
        list:[],
        id: '',
        ruleForm: {
          relation_type: '',
          id: '',
          name: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          relation_type: [{
            required: true,
            message: '请选择',
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
      // this.restaurants = this.loadAll();
    },
    methods: {
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) >-1);
        };
      },
      handleSelect(item) {
        this.id=item.id
      },
      init() {
        index({
          access_token: this.$store.state.token,
        }).then(res => {
          let listall=[]
          res.list.forEach(item => {
           const list = {
             id:item.id,
             value: item.name,
           }
           listall.push(list)
         })
         this.restaurants=listall
        });
      },
      submitForm(formName) {
        const fromdata = this.ruleForm
        const id = this.$route.query.id
        this.$refs[formName].validate((valid) => {
          if (valid) {
            bingpeoplerelation({
              access_token: this.$store.state.token,
              people_id: id,
              relation_id: this.id,
              relation_type: fromdata.relation_type,
            }).then(res => {});
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
