<template>
  <div class="success">
    <h1>商户信息</h1>
    <el-form :inline="true" :model="{formInline}" class="demo-form-inline">
      <el-form-item >
        <el-select v-model="formInline.region" placeholder="小区名字">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="负责人"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="formInline.user" placeholder="负责人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-empty description="没有数据" v-if="lists.length==0" :image-size="430" ></el-empty>
    <el-table :data="lists.slice((form.pageNum-1)*form.pageSize,form.pageNum*form.pageSize)" style="width: 100% ;height:600px" v-if="lists.length">
      <el-table-column prop="region" label="小区名" width="100">
      </el-table-column>
      <el-table-column prop="user" label="职位" width="100">
      </el-table-column>
      <el-table-column prop="user" label="名字" width="100">
      </el-table-column>
      <el-table-column prop="user" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="user" label="电话" width="100">
      </el-table-column>
      <el-table-column prop="user" label="籍贯" width="100">
      </el-table-column>
      <el-table-column prop="user" label="入职日期" width="100">
      </el-table-column>
      <el-table-column prop="user" label="修改" width="100">
      </el-table-column>
      <el-table-column prop="address" label="家庭地址">
      </el-table-column>
      <el-table-column prop="address" label="详情">
      	<template slot-scope="scope">
      		<el-button size="mini" @click="handledetails(scope.row)" type="primary">详情</el-button>
      	</template>
      </el-table-column>
    </el-table>
		<pages v-show="total>0" :total="total" :page.sync="form.pageNum" :limit.sync="form.pageSize" @pagination="getData(form)" />

  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
				form: {
					pageNum: 1,
					pageSize: 10
				},
				total: 10,
        lists: [],
        list: [{
            user: 'wan',
            region: 'shanghai',
            address:"上海市徐汇区老沪闵路"
          },
          {
            user: 'wan4',
            region: 'beijing',
            address:"上海市徐汇区老沪闵路"
          },
          {
            user: 'wan1',
            region: 'shanghai',
            address:"上海市徐汇区老沪闵路"
          },
					{
						user: 'wan4',
						region: 'beijing',
						address:"上海市徐汇区老沪闵路"
					},
					{
						user: 'wan1',
						region: 'shanghai',
						address:"上海市徐汇区老沪闵路"
					},
					{
						user: 'wan4',
						region: 'beijing',
						address:"上海市徐汇区老沪闵路"
					},
					{
						user: 'wan1',
						region: 'shanghai',
						address:"上海市徐汇区老沪闵路"
					},
					{
						user: 'wan4',
						region: 'beijing',
						address:"上海市徐汇区老沪闵路"
					},
					{
						user: 'wan1',
						region: 'shanghai',
						address:"上海市徐汇区老沪闵路"
					},
          {
            user: 'wan2',
            region: 'shanghai',
            address:"上海市徐汇区老沪闵路"
          },
          {
            user: 'wan3',
            region: 'beijing',
            address:"上海市徐汇区老沪闵路"
          },
        ]




      }
    },
    mounted() {
      this.onshow()
			this.getData()
			this.total = this.lists.length

    },
    methods: {
			getData() {

						},
      onshow() {
        this.lists = this.list
      },
      onSubmit() {
        this.lists = []
        this.list.forEach(item => {
          // console.log(this.formInline.region)
          if (item.user == this.formInline.user) {
            this.lists.push(item)
            if (item.region == this.formInline.region) {
              this.lists = []
              this.lists.push(item)
            } else {
              // alert("没有此数据")
            }
          } else if (item.region == this.formInline.region) {

              this.lists.push(item)
            } else {
              // alert("没有此数据")
            }


        })

      }

    }
  }
</script>

<style scoped>

</style>
