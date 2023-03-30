<template>
  <div>
    <!-- 成员解绑 -->
    <back-button></back-button>
    <el-table :data="tableData" style="width: 100% " height="580px">
      <el-table-column prop="relation_name" label="名字" width="100">
      </el-table-column>
      <el-table-column prop="relation_card" label="身份证" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="unfamilybind(scope.row)">解绑成员</el-button>
          <el-button size="mini" type="text" @click="handledetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    peoplerelationlist,
    unbingpeoplerelation
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
        peoplerelationlist({
          access_token: this.$store.state.token,
          people_id: id
        }).then(res => {
          this.tableData = res
        })
      },
      unfamilybind(row) {
        this.$confirm('是否确认解绑？').then(_ => {
          unbingpeoplerelation({
            access_token: this.$store.state.token,
            id: row.id
          }).then(res => {
            this.getlist()
            this.$message({
              message: '解绑成功',
              type: 'success'
            })
          })
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
      }
    },

  }
</script>

<style>
</style>
