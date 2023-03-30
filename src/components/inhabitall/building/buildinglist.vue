<template>
  <div class="success">
    <h1>建筑管理</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-row :span="24">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.address" placeholder="名称" clearable ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="type">
            <el-select v-model="formInline.type" placeholder="房屋类型" clearable>
              <el-option label="自建房" value="0"></el-option>
              <el-option label="独立楼宇" value="1"></el-option>
              <el-option label="小区" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="is_party">
            <el-select v-model="formInline.kind" placeholder="建筑类型" clearable>
              <el-option label="公寓" value="0"></el-option>
              <el-option label="住宅" value="1"></el-option>
              <el-option label="商住两用" value="2"></el-option>
              <el-option label="商用" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
		<el-col :span="3">
		  <el-form-item prop="type">
		    <el-select v-model="formInline.type" placeholder="是否老旧小区改造" clearable>
		      <el-option label="否" value="0"></el-option>
		      <el-option label="是" value="1"></el-option>
		    </el-select>
		  </el-form-item>
		</el-col>
        <el-col :span="9">
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="position: relative;">
      <el-table :data="lists" style="width: 100% " height="580px" >
        <el-table-column prop="address" label="地址" width="200" fixed>
        </el-table-column>
        <el-table-column prop="buildingname" label="建筑名称" width="200">
        </el-table-column>
        <el-table-column prop="type" label="房屋类型" width="150">
        </el-table-column>
        <el-table-column prop="kind" label="建筑类型" width="150">
        </el-table-column>
		<el-table-column prop="kind" label="是否老旧小区改造" width="150">
		</el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handledetails(scope.row)">详情</el-button>
            <el-button type="text" @click="handfamily(scope.row)">关联房屋</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
      @pagination="getData(form)" />
  </div>
</template>
<script>
  import {typechange,kindchange,unnull} from '../../../assets/js/public.js'
  import {
    buildingindex,housebuilding
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        show: false,
        formInline: {
          address:"",
          type:"",
          kind:"",
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
          path: "/building/buildingadd",
        });
      },
      getList(){
          buildingindex({
            access_token: this.$store.state.token,
            page: this.form.pageNum,
            num: this.form.pageSize,
            address:this.formInline.address,
			type: unnull(this.formInline.type),
			kind: unnull(this.formInline.kind),
          }).then(res => {
            this.total = res.total
            let listall=[]
            res.list.forEach(item => {
             const list = {
               id:item.id,
               address:item.address,
               type: typechange(item.type),
               buildingname:item.building_name,
               kind:kindchange(item.kind)
             }
             listall.push(list)
           })
           this.lists=listall
          });
      },
      getData(form) {
        this.getList()
      },
      //家庭成员
      handfamily(row) {
      // console.log(row.id)
       this.$router.push({
         path: "/building/buildbind",
         query: {
           id: row.id,
         }
       });
      },
      //详情页
      handledetails(row) {
          this.$router.push({
            path:'/building/buildingdetail',
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
