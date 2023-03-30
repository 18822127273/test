<template>
  <div>
    <back-button></back-button>
    <el-table :data="tableData" style="width: 100% " height="580px">
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
    peoplehouse
  } from '../../../config/api.js'
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
      getlist() {
        const id = this.$route.query.id
        peoplehouse({
          access_token: this.$store.state.token,
          people_id: id
        }).then(res => {
          this.tableData = res
        })
      },
      //详情页
      handledetails(row) {
        this.$router.push({
          path: '/inhabitant/inhabitdetail',
          query: {
            id: row.id
          }
        });
      },
      //家庭成员
      handfamily(row) {
        console.log(row, 111)
        this.$router.push({
          path: "/house/housefamily",
          query: {
            id: row.house_id,
          }
        });
      },
    },

  }
</script>

<style>
</style>
