<template>
  <div class="success">
    <h1>模块管理</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-row :span="24">
        <el-col :span="3">
          <el-form-item>
            <el-input v-model="formInline.address" placeholder="名称" clearable ></el-input>
          </el-form-item>
        </el-col>
        
        <el-col :span="9">
          <el-form-item>
            <el-button type="primary" >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="position: relative;">
      <el-table :data="lists" style="width: 100% " height="580px" >
        <el-table-column prop="name" label="名称" width="100" fixed>
        </el-table-column>
		<el-table-column prop="housenumber" label="楼栋数" width="100">
		</el-table-column>
        <el-table-column prop="housenumber" label="总户数" width="100">
        </el-table-column>
        <el-table-column prop="peoplenumber" label="总人数" width="100">
        </el-table-column>
        <el-table-column prop="man" label="男性" width="100">
        </el-table-column>
		<el-table-column prop="famale" label="女性" width="100">
		</el-table-column>
		<el-table-column prop="build" label="建筑类型" width="100">
		</el-table-column>
		<el-table-column prop="staff" label="网格员" width="100">
		</el-table-column>
		<el-table-column prop="elenumber" label="出租户数" width="100">
		</el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="peoplebind(scope.row)">网格员绑定</el-button>
            <el-button type="text" @click="buildlist(scope.row)">关联楼栋</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize"
      @pagination="getData(form)" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        formInline: [
			{
				name:"模块一",
				housenumber:"20",
				peoplenumber:100,
				man:40,
				famale:60,
				build:"1",
				staff:"李一",
				elenumber:20,
			}
		],
        form: {
          pageNum: 1,
          pageSize: 10
        },
        empty: false,
        total: 10,
        lists: [
			{
				name:"模块一",
				housenumber:"20",
				peoplenumber:100,
				man:40,
				famale:60,
				build:"1",
				staff:"李一",
				elenumber:20,
			},
			{
				name:"模块二",
				housenumber:"50",
				peoplenumber:100,
				man:50,
				famale:50,
				build:"1",
				staff:"李一",
				elenumber:20,
			},
			{
				name:"模块三",
				housenumber:"20",
				peoplenumber:100,
				man:40,
				famale:60,
				build:"1",
				staff:"李一",
				elenumber:20,
			},
			{
				name:"模块四",
				housenumber:"20",
				peoplenumber:100,
				man:40,
				famale:60,
				build:"1",
				staff:"李一",
				elenumber:20,
			}
		],
        listall:[],
      }
    },
    mounted() {
      
     
    },
    methods: {
      peoplebind(){
      		this.$router.push({
      			path: '/inhabitant/familybind',
      			query: {
      				id: row.id
      			}
      		});  
      },
      buildlist(){
      		this.$router.push({
      			path: '/inhabitant/familybind',
      			query: {
      				id: row.id
      			}
      		});  
      }
    
    }
  }
</script>

<style>

</style>
