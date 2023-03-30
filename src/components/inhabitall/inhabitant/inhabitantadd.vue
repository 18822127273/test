<template>
  <div class="commadds">
    <div class="commadd_centers">
      <back-button></back-button>
      <div class="commadd_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" width="100px"></el-input>
          </el-form-item>
          <el-form-item label="曾用名" prop="name_used_before">
            <el-input v-model="ruleForm.name_used_before"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_card">
            <el-input v-model="ruleForm.id_card"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-checkbox-group v-model="ruleForm.tags">
              <el-checkbox label="社区矫正" name="tags"></el-checkbox>
              <el-checkbox label="吸毒" name="tags"></el-checkbox>
              <el-checkbox label="残疾人" name="tags"></el-checkbox>
              <el-checkbox label="安置帮教" name="tags"></el-checkbox>
              <el-checkbox label="矛盾冲突人员" name="tags"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="是否党员" prop="is_party">
            <el-switch v-model="ruleForm.is_party" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="省" prop="native_place_province_id">
            <el-select v-model="ruleForm.native_place_province_id" placeholder="请选择" @change="getdataone()">
              <el-option v-for="item in table" :key="item.id" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市" prop="">
            <el-select v-model="value" placeholder="请选择" @change="getdatatwo()">
              <el-option v-for="item in lasttable" :key="item.id" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="区" prop="native_place_id">
            <el-select v-model="ruleForm.native_place_id" placeholder="请选择" >
              <el-option v-for="item in finaltable" :key="item.id" :label="item.region_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业" prop="profession">
            <el-input v-model="ruleForm.profession"></el-input>
          </el-form-item>
          <el-form-item label="身份证地址" prop="id_card_address">
            <el-input v-model="ruleForm.id_card_address"></el-input>
          </el-form-item>
          <el-form-item label="所在小区" prop="residential_quarters_address	">
            <el-input v-model="ruleForm.residential_quarters_address	"></el-input>
          </el-form-item>
          <el-form-item label="所在单位" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
          </el-form-item>
          <el-form-item label="工作单位地址" prop="company_address">
            <el-input v-model="ruleForm.company_address"></el-input>
          </el-form-item>
          <el-form-item label="出生地址" prop="birth_address">
            <el-input v-model="ruleForm.birth_address"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="ruleForm.education" placeholder="请选择">
              <el-option label="小学" value="0"></el-option>
              <el-option label="初中" value="1"></el-option>
              <el-option label="高中" value="2"></el-option>
              <el-option label="大学" value="3"></el-option>
              <el-option label="硕士研究生" value="4"></el-option>
              <el-option label="博士研究生" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="marital_status">
            <el-select v-model="ruleForm.marital_status" placeholder="政治面貌">
              <el-option label="未婚" value="0"></el-option>
              <el-option label="已婚" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宗教信仰" prop="religion">
            <el-input v-model="ruleForm.religion"></el-input>
          </el-form-item>
          <el-form-item label="是否常住人口" prop="is_resident">
            <el-switch v-model="ruleForm.is_resident" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item>
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
    create,
    region
  } from '../../../config/api.js'
  export default {
    data() {
      return {
        radio: 1,
        ruleForm: {
          name: '',
          name_used_before: "",
          id_card: "",
          address: '',
          desc: '',
          tags: [],
          gender: '',
          is_party: false,
          native_place_id: '',
          profession: "",
          id_card_address: "",
          native_place_province_id: '',
          residential_quarters_address: "",
          company: "",
          company_address: "",
          birth_address: "",
          education: "",
          marital_status: "",
          religion: "",
          is_resident: false,
        },
        value:'',
        table: [],
        lasttable: [],
        finaltable: [],
        rules: {
          name: [{
            required: true,
            message: '请输入名字',
            trigger: 'blur'
          }, ],
          id_card: [{
              required: true,
              message: '请输入身份证号',
              trigger: 'blur'
            },
            {
              min: 18,
              max: 18,
              message: '长度在 18个字符',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdataone(){
        region({
          parent_id: this.ruleForm.native_place_province_id
        }).then(res => {
          this.value=[],
          this.ruleForm.native_place_id=[]        
          this.lasttable = res
        })
      },
      getdatatwo(){
        region({
          parent_id: this.value
        }).then(res => {
          this.finaltable = res
        })
      },
      getdata() {
        region({
          parent_id: 1
        }).then(res => {
          this.table = res
        })
      },
      submitForm(formName) {
        const fromdata = this.ruleForm
        const tags = this.ruleForm.tags.toString()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            create({
              access_token: this.$store.state.token,
              name: fromdata.name,
              name_used_before: fromdata.name_used_before,
              id_card: fromdata.id_card,
              address: fromdata.address,
              gender: fromdata.gender,
              desc: fromdata.desc,
              tags: tags,
              is_party: fromdata.is_party,
              native_place_province_id: fromdata.native_place_province_id,
              native_place_id: fromdata.native_place_id,
              profession: fromdata.profession,
              id_card_address: fromdata.id_card_address,
              residential_quarters_address: fromdata.residential_quarters_address,
              company: fromdata.company,
              company_address: fromdata.company_address,
              birth_address: fromdata.birth_address,
              education: fromdata.education,
              marital_status: fromdata.marital_status,
              religion: fromdata.religion,
              is_resident: fromdata.is_resident,
            }).then(res => {});
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            let shows = false
            this.$emit('changeMsg', shows)
          } else {
            // console.log('error submit!!');
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
