<template>
  <div class="commadds">
    <div class="commadd_centers">
      <back-button></back-button>
      <div class="commadd_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="房间号" prop="house_num">
            <el-input v-model="ruleForm.house_num" width="100px"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-input v-model="ruleForm.floor"></el-input>
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-input v-model="ruleForm.area"></el-input>
          </el-form-item>
          <el-form-item label="户型结构" prop="structure">
            <el-input v-model="ruleForm.structure"></el-input>
          </el-form-item>
          <el-form-item label="装修情况" prop="decoration">
            <el-input v-model="ruleForm.decoration"></el-input>
          </el-form-item>
          <el-form-item label="房屋朝向" prop="direction">
            <el-input v-model="ruleForm.direction"></el-input>
          </el-form-item>
          <el-form-item label="梯户比例" prop="elevator_house">
            <el-input v-model="ruleForm.elevator_house"></el-input>
          </el-form-item>
          <el-form-item label="房屋类型" prop="is_private_house">
            <el-select v-model="ruleForm.is_private_house" placeholder="是否私有">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建筑绑定" >
            <el-select v-model="ruleForm.building_id"  clearable>
              <el-option v-for="item in buildid" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
            <el-button :plain="true" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
   housecreate,buildingindex,housebuilding
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        buildid:[],
        // value:'',
        radio: 1,
        ruleForm: {
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
        rules: {
          is_private_house: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }, ],
         floor: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }, ],
          house_num: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
          area: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
          structure: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],

           decoration: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
          direction: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
         elevator_house: [{
            required: true,
            message: '请选择',
            trigger: 'blur'
          }, ],
        },
      }
    },
    beforeMount() {},
    mounted() {
      this.init()
    },
    methods: {
      init(){
        buildingindex({
          access_token: this.$store.state.token,
        }).then(res => {
          let lists=[]
          res.list.forEach(item=>{
            let result={
              value:item.id,
              label:item.building_name
            }
            lists.push(result)
          })
          this.buildid=lists
          console.log(this.buildid,111)
        });

      },
      submitForm(formName) {
        const fromdata = this.ruleForm
        this.$refs[formName].validate((valid) => {
          if (valid) {
           housecreate({
              access_token: this.$store.state.token,
              is_private_house:fromdata.is_private_house,
              building_id:fromdata.building_id,
              floor:fromdata.floor,
              house_num:fromdata.house_num,
              area:fromdata.area,
              structure:fromdata.structure,
              decoration:fromdata.decoration,
              direction:fromdata.direction,
              elevator_house:fromdata.elevator_house,
              building_id:fromdata.building_id
            }).then(res => {
              // console.log(res,111)
            });
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style>

</style>
