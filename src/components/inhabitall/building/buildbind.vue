<template>
  <div class="success">
    <back-button></back-button>
    <el-table :data="lists" style="width: 100% " height="580px" >
      <el-table-column prop="house_num" label="房间号" width="100">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" width="100">
      </el-table-column>
      <el-table-column prop="area" label="面积" width="100">
      </el-table-column>
      <el-table-column prop="structure" label="户型结构" width="100">
      </el-table-column>
      <el-table-column prop="decoration" label="装修情况" width="100">
      </el-table-column>
      <el-table-column prop="direction" label="房屋朝向" width="100">
      </el-table-column>
      <el-table-column prop="elevator_house" label="梯户比例" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handledetails(scope.row)">详情</el-button>
          <el-button type="text" @click="handfamily(scope.row)">关联成员</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {
    houseindex
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        formInline: {
         is_private_house:'',
         building_id:'',
         floor:'',
         house_num:'',
         area:'',
         structure:'',
         decoration:'',
         direction:'',
         elevator_house:'',
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
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next()
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList(){
          const id = this.$route.query.id
          houseindex({
            access_token: this.$store.state.token,
            building_id:id,
          }).then(res => {
            this.total = res.total
            let listall=[]
            res.list.forEach(item => {
             const list = {
               id:item.id,
              is_private_house:item.is_private_house,
              building_id:item.building_id,
              floor:item.floor,
              house_num:item.house_num,
              area:item.area,
              structure:item.structure,
              decoration:item.decoration,
              direction:item.direction,
              elevator_house:item.elevator_house,
             }
             listall.push(list)
           })
           this.lists=listall
          });
      },
      //家庭成员
      handfamily(row) {
        this.$router.push({
          path: "/house/housefamily",
          query: {
            id: row.id,
          }
        });
      },
      //详情页
      handledetails(row) {
        this.$router.push({
          path:'/house/housedetail',
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
