<template>
  <div class="all">
    <div class="allcenter">
      <div class="allcenter-header">
        居民信息
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
                <el-table-column prop="gender" label="性别" >
                </el-table-column>
                <el-table-column prop="age" label="年龄" >
                </el-table-column>
                <el-table-column prop="tags" label="标签" >
                </el-table-column>
                <el-table-column prop="is_resident" label="常驻居民" >
                </el-table-column>
                <el-table-column prop="residential_quarters_address	" label="所属社区" >
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
              <el-descriptions title="用户信息" :column='1' class="sctives">
                <el-descriptions-item label="姓名">{{list.name}}</el-descriptions-item>
                <el-descriptions-item label="年龄">{{list.age}}</el-descriptions-item>
                <el-descriptions-item label="性别">{{list.gender}}</el-descriptions-item>
                <el-descriptions-item label="小区地址">{{list.residential_quarters_address}}</el-descriptions-item>
                <el-descriptions-item label="宗教信仰">{{list.religion}}</el-descriptions-item>
                <el-descriptions-item label="行业">{{list.profession}}</el-descriptions-item>
                <el-descriptions-item label="公司">{{list.company}}</el-descriptions-item>
                <el-descriptions-item label="备注">
                  <el-tag size="small">{{list.tags}}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <div class="content_footer">
                <el-button class="allcenter-rights" @click="all">查看完整档案</el-button>
                <!-- <el-button class="allcenter-rights" @click="family">查看亲属关系</el-button> -->
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
      <v-inhabit @closeds="closeds" :id='id'></v-inhabit>
    </div>
    <div v-if="shows">
      <v-inhabitdetail  @closeds="closeds" :ids='ids'></v-inhabitdetail>
    </div>
  </div>
</template>
<script>
  import {
    listres,
    analyzeIDCard,
    sexIDCard,
    itemall,
    sexchange,
    isresident
  } from '../../../assets/js/public.js'
  import {index} from '../../../config/api.js'
  import inhabitall from './inhabitantall.vue'
  import inhabitdetail from './inhabitfamily.vue'
  export default {
    components: {
      'v-inhabit':inhabitall,
      'v-inhabitdetail': inhabitdetail
    },
    data() {
      return {
        show: false,
        shows:false,
        formInline: {
          name: '',
          id_card:'',
          gender:'',
          age:""
        },
        lists:[],
        list:[],
        id:'',
        ids:''
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
        index({
          access_token: this.$store.state.token,
          id_card:this.formInline.id_card,
          age:this.formInline.age,
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
             age:analyzeIDCard(item.id_card),
             gender:sexchange(item.gender),
             tags:item.tags,
             is_resident:isresident(item.is_resident),
             residential_quarters_address:item.residential_quarters_address,
             profession:item.profession,
             company:item.company,
             religion:item.religion
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
      family(){
        this.shows = true
        this.ids=this.list.id

      },
      cellHandleclick(row, column, cell, event) {
            this.list=row
      },
      closeds(row) {
        this.show = row
        this.shows=row
      }
    }
  }
</script>

<style>

</style>
