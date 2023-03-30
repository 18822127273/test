<template>
  <div>
    <h1>这是修改页面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model=" ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="people">
        <el-input v-model="ruleForm.people"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <back-button></back-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ['commshow','detailss'],
    data() {
      return {
        detaillist:[],
        ruleForm: {
          name: '',
          people: '',
          address: '',
          desc: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          people: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          address: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }],

          desc: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }]
        },
      }
    },
    mounted() {
      this.detaillist=this.detailss
      this.ruleForm.name=this.detaillist.region
      this.ruleForm.people=this.detaillist.user
      this.ruleForm.address=this.detaillist.address
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });
            let result = this.ruleForm

            this.$emit('changeMsgs', result)
            let shows = false
            this.$emit('changeMsg', shows)
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      close() {
        let shows = false
        this.$emit('changeMsg', shows)

      }
    }
  }
</script>

<style>
</style>
