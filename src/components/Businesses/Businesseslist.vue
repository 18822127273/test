<template>
  <div class="success">
    <h1>企业管理</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-row :span="24">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="姓名" clearable ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.id_card" placeholder="身份证号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="education">
            <el-select v-model="formInline.education" placeholder="学历" clearable>
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
            <el-select v-model="formInline.is_party" placeholder="党员" clearable>
              <el-option label="非党员" value="0"></el-option>
              <el-option label="党员" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="age">
            <el-select v-model="formInline.age" placeholder="年龄段" clearable>
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
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
          <el-form-item>
            <enterxlsx></enterxlsx>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="position: relative;">
      <el-table :data="lists" style="width: 100% " height="580px" >
        <el-table-column prop="name" label="名字" width="100">
        </el-table-column>
        <el-table-column prop="address" label="公司地址" width="100">
        </el-table-column>
		<el-table-column prop="staff_count" label='员工数量' width="100">
		</el-table-column>
		<el-table-column prop="legal_person" label="法人" width="100">
		</el-table-column>
        <el-table-column prop="screening" label="筛查情况" width="100">
        </el-table-column>
        <el-table-column prop="news" label="最新动态" width="100">
        </el-table-column>
       <el-table-column prop="remarks" label="备注" width="100">
       </el-table-column>
	   <el-table-column prop="lon" label="经度" width="100">
	   </el-table-column> 
	   <el-table-column prop="lat" label="纬度" width="100">
       </el-table-column>
	  <!-- <el-table-column prop="news" label="最新动态" width="100">
	   </el-table-column> -->
       <!-- <el-table-column prop="shareholder" label="	股东">
        </el-table-column> -->
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="housebind(scope.row)">房屋绑定</el-button>
            <el-button size="mini"type="text" @click="handledetails(scope.row)">详情</el-button>
            <el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
      @pagination="getData(form)" />
  </div>
</template>
<script>
  import {
    companyindex,companydelete
  } from '../../config/api.js'
  export default {
    data() {
      return {
        formInline: {
          name: '',
          address: "",
          screening: "",
          news: '',
          staff_count: '',
          shareholder: '',
          legal_person: '',
          remarks:'',
          lat: "",
          lon: "",
        },
        form: {
          pageNum: 1,
          pageSize: 10
        },
        empty: false,
        total: 10,
        lists: [],
        listall:[],
      }
    },
    activated() {
      this.getList()
    },
    mounted() {
      this.getList()
      this.getData()
    },
    methods: {
      add() {
        this.$router.push({
          path: "/Businesses/Businessesadd",
        });
      },
      del(row){
        this.$confirm('是否确认删除？').then(_=>{
        companydelete({
          access_token: this.$store.state.token,
          id: row.id,
        }).then(res=>{
          this.getList()
        })
        }).catch(_=>{

        })

      },
      getList(){
          companyindex({
            access_token: this.$store.state.token,
            page: this.form.pageNum,
            num: this.form.pageSize,
          }).then(res => {
            this.lists=res.list
            this.total = res.total
            let listall=[]
            res.list.forEach(item => {
             const list = {
               id:item.id,
               name: item.name,
               address: item.address,
               screening:item.screening,
               news: item.news,
               staff_count: item.staff_count,
               shareholder: item.shareholder,
               legal_person: item.legal_person,
               remarks:item.remarks,
               lat: item.lat,
               lon: item.lon,
             }
             listall.push(list)
           })
           this.lists=listall
          })
      },
      getData(form) {
        this.getList()
      },
      //详情页
      handledetails(row) {
        this.$router.push({
          path:'/Businesses/Businessesrevise',
          query:{
            id:row.id
          }
        });
      },
    }
  }
</script>

<style>

</style>
