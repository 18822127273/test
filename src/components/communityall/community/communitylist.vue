<template>
  <div class="success">
    <h1>暂未开放</h1>
    <!-- <h1>社区管理</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-row :span="24">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.id_card" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="education">
            <el-select v-model="formInline.education" placeholder="学历">
              <el-option label="小学" value="0"></el-option>
              <el-option label="初中" value="1"></el-option>
              <el-option label="高中" value="2"></el-option>
              <el-option label="大学" value="3"></el-option>
              <el-option label="硕士研究生" value="4"></el-option>
              <el-option label="博士研究生" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="is_party">
            <el-select v-model="formInline.is_party" placeholder="党员">
              <el-option label="非党员" value="0"></el-option>
              <el-option label="党员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="age">
            <el-select v-model="formInline.age" placeholder="年龄段">
              <el-option label="0-10" value="0-10"></el-option>
              <el-option label="11-35" value="11-35"></el-option>
              <el-option label="36-65" value="36-65"></el-option>
              <el-option label="66-150" value="66-150"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <enterxlsx></enterxlsx>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="lists" style="width: 100% " height="580px" >
      <el-table-column prop="name" label="名字" width="100">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100">
      </el-table-column>
      <el-table-column prop="id_card" label="身份证号" width="100">
      </el-table-column>
      <el-table-column prop="id_card_address" label="家庭地址">
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
  import {
    communitydetail
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        show: false,
        formInline: {
          name:"",
          id_card:"",
          education:"",
          age:'',
          is_party:''
        },
        form: {
          pageNum: 1,
          pageSize: 10
        },
        empty: false,
        total: 10,
        lists: [],
        listall:[]
      }
    },
    beforeMount() {
       this.getList()
       this.getData()
    },
    methods: {
      getList(){
          communitydetail({
            access_token: this.$store.state.token,
          }).then(res => {
            this.total = res.total
           this.lists=res.list
          });
      },
      getData(form) {
        this.getList()

      },
    }
  }
</script>

<style>

</style>
