<template>
  <div class="all">
    <div class="allcenter">
      <div class="allcenter-header">
        企业信息
        <div class="allcenter-right" @click="close">关闭</div>
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="allcenter-content">
            <div class="allcenter-content-header">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row>
                  <el-col :span="3">
                    <el-form-item>
                      <el-input v-model="formInline.name" placeholder="姓名" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                     <el-input v-model="formInline.id_card" placeholder="身份证号" clearable></el-input>
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
                  <el-col :span="3">
                    <el-form-item prop="tags">
                      <el-select v-model="formInline.tags" placeholder="标签">
                        <el-option label="吸毒" value="吸毒"></el-option>
                        <el-option label="社区矫正" value="社区矫正"></el-option>

                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-input v-model="formInline.rc" placeholder="居委" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item>
                      <el-input v-model="formInline.estate" placeholder="小区" disabled clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="allcenter-content-content">
              <el-table :data="lists" highlight-current-row @cell-click="cellHandleclick" >
                <el-table-column prop="name" label="姓名" >
                </el-table-column>
                <el-table-column prop="address" label="地址" >
                </el-table-column>
                <el-table-column prop="legal_person" label="法人" >
                </el-table-column>
                <el-table-column prop="staff_count" label="员工数量" >
                </el-table-column>
                <el-table-column prop="news" label="动态" >
                </el-table-column>

              </el-table>
            </div>
          </div>

        </el-col>
        <el-col :span="8  ">
          <div class="allcenter-righth">
            <div class="allcenter-content-header-one">
              人户分离
            </div>
            <div class="allcenter-content-contents">
              <el-descriptions title="公司信息" :column='1' class="sctives">
                <el-descriptions-item label="名称">{{list.name}}</el-descriptions-item>
                <el-descriptions-item label="法人">{{list.legal_person}}</el-descriptions-item>
                <el-descriptions-item label="股东">{{list.shareholder}}</el-descriptions-item>
                <el-descriptions-item label="员工数量">{{list.staff_count}}</el-descriptions-item>
                <el-descriptions-item label="地址">{{list.address}}</el-descriptions-item>
                <el-descriptions-item label="最新动态">{{list.news}}</el-descriptions-item>
                <el-descriptions-item label="备注">{{list.lremarks}}</el-descriptions-item>
              </el-descriptions>
              <div class="content_footer">
                <el-button class="allcenter-rights" @click="all">查看完整档案</el-button>
              </div>
              <div class="img">
                <img src="../../../assets/img/3.png" />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="show">
      <v-businessdetail @closeds="closeds" :id='id'></v-businessdetail>
    </div>
  </div>
</template>
<script>
  import {
    listres,
    analyzeIDCard,
    sexIDCard,
    itemall,
    sexchange
  } from '../../../assets/js/public.js'
  import {companyindex} from '../../../config/api.js'
  import businessdetail from './businessdetail.vue'
  export default {
    components: {
      'v-businessdetail': businessdetail
    },
    data() {
      return {
        show: false,
        formInline: {
          name: '',
          id_card:'',
          gender:'',
          age:""
        },
        lists:[],
        list:[],
        id:''
      }
    },
    mounted() {
      this.getlist()
      this.onSubmit()
    },
    methods: {
      close() {
        this.$router.go(-1)
      },
      onSubmit() {
        this.getlist()
      },
      getlist(){
        companyindex({
          access_token: this.$store.state.token,
          id_card:this.formInline.id_card,
          gender:this.formInline.gender,
          name:this.formInline.name,
          tags:this.formInline.tags,
          num:50
        }).then(res => {
          this.total = res.total
          this.lists=res.list
          let listall=[]
          res.list.forEach(item => {
           const list = {
             id:item.id,
             name: item.name,
             address:item.address,
             screening:item.screening,
             news:item.news,
             staff_count:item.staff_count,
             shareholder:item.shareholder,
             legal_person:item.legal_person,
             lat:item.lat,
             lon:item.lon
           }
           listall.push(list)
         })
         this.lists=listall
         this.list=this.lists[0]
        });
      },
      all() {
        this.show = true
        this.id=this.list.id
      },
      cellHandleclick(row, column, cell, event) {
            this.list=row
      },
      closeds(row) {
        this.show = row
      }
    }
  }
</script>

<style>

</style>
