<template>
  <div class="success">
    <h1>社区员工管理</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-row :span="24">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="3">
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
        </el-col> -->
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="lists" style="width: 100% " height="580px" >
	  <el-table-column align="center" border label="员工头像">
	  	<template width="100" slot-scope="scope">
	  		<img style="width:50px;height:50px;border:none;margin-top: 5px;margin-bottom: 5px"
	  			v-if="scope.row.photo"
	  			:src="'http://harbor-test-api.yfaj.cn/uploads/photos/' +scope.row.photo.name">
	  	</template>
	  </el-table-column>
      <el-table-column prop="name" label="名字" width="100">
      </el-table-column>
      <el-table-column prop="account" label="电话" width="150">
      </el-table-column>
	  <el-table-column prop="account" label="性别" width="150">
	  </el-table-column>
	  <el-table-column prop="account" label="类别" width="150">
	  </el-table-column>
	  <el-table-column prop="account" label="地址" width="150">
	  </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handledetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
      @pagination="getData(form)" />
  </div>
</template>
<script>
  import {
    stufflist
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        show: false,
        formInline: {
          name:"",
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
      add() {
        this.$router.push({
          path: "/inhabitant/inhabitantadd",
        });
      },
      getList(){
          stufflist({
            access_token: this.$store.state.token,
            page: this.form.pageNum,
            num: this.form.pageSize,
            name:this.formInline.name,
          }).then(res => {
            // console.log(res,111)
            this.total = res.total
            this.lists=res.list
          });
      },
      getData(form) {
        this.getList()
      },
      //详情页
      handledetails(row) {
        this.$router.push({
          path: "/inhabitant/inhabitdetail",
          query: {
            id: row.id,
          }
        });
      },
      handleEdit(index, row) {
        this.commshowsa = true //编辑
      },
    }
  }
</script>

<style>

</style>
