<template>
	<div>
				<back-button></back-button>
        <div style="position: relative;">
          <el-table :data="tableData" style="width: 100% " height="580px" >
            <el-table-column prop="name" label="名字" width="100">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="100">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100">
            </el-table-column>
            <el-table-column prop="id_card" label="身份证号" width="100">
            </el-table-column>
            <el-table-column prop="tags" label="标签">
            </el-table-column>
            <el-table-column prop="native_place_id" label="籍贯">
            </el-table-column>
            <el-table-column prop="religion" label="宗教信仰">
            </el-table-column>
            <el-table-column label="操作" fixed='right'>
              <template slot-scope="scope">
                 <el-button type="text" @click="unhousebind(scope.row)">取消绑定</el-button>
                 <el-button type="text" @click="handledetails(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

			</div>
</template>

<script>
  import {housepeople,unbindpeoplehouse} from '../../../config/api.js'
	export default {
		data() {
			return {
				tableData: []
			}
		},
    mounted() {
      this.getlist()
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next()
    },
		methods: {
			getlist(){
        const id = this.$route.query.id
        housepeople({
          access_token: this.$store.state.token,
          house_id:id
        }).then(res=>{
          console.log(res,111)
          this.tableData=res
        })
      },
      //详情页
      handledetails(row) {
        this.$router.push({
          path:'/inhabitant/inhabitdetail',
          query:{
            id:row.people_id
          }
        });
      },
      unhousebind(row){
        this.$confirm('是否确认解绑？').then(_=>{
        unbindpeoplehouse({
          access_token: this.$store.state.token,
          id:row.id
        }).then(res=>{
          this.getlist()
          this.$message({
            message: '解绑成功',
            type: 'success'
          });

        })
        })
      }


		},

	}
</script>

<style>
</style>
