<template>
  <div>
    <back-button></back-button>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <div class="gongchengheader">
      <div class="words">
        <div class="words_center">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
            <el-row>
              <el-col :span='6'>
                <el-form-item label="活动名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='6'>
                <el-form-item label="活动时间" prop="date1">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <table border="1" width="600" height="300" cellspacing="0">
                <tbody>
                  <tr>
                    <td>
                      姓名
                    </td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                    <td>性别</td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                    <td rowspan="4">

                    </td>

                  </tr>
                  <tr>
                    <td>
                      政治面貌
                    </td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                    <td>籍贯</td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>

                  </tr>
                  <tr>
                    <td>
                      出生年月
                    </td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                    <td>工作单位</td>
                    <td>
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      备注
                    </td>
                    <td colspan="2">
                      <el-input v-model="ruleForm.name"></el-input>
                    </td>
                  </tr>
                  <tr >
                    <td style="height: 200px;">
                      照片
                    </td>
                    <td colspan="2" >
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                    <td colspan="3" >
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="5" >
                      备注
                    </td>
                    <td colspan="4" >
                       <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        imageUrl: '',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          resource: '',
          desc: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          region: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],

          resource: [{
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$router.push('/Approvalgongcheng/gongcheng')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       handleAvatarSuccess(res, file) {
              this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';           
              if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
              }
              return isJPG 
            },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returns() {
        let show = false
        this.$emit("closed", show)
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  .words {
    width: calc(100%-30px);
    border: 2px solid black;
    font-size: 28px;
  }

  .gongchengheader {
    width: 100%;
    height: 700px;
    overflow: auto;
  }

  .words_center {
    width: 1190px;
    height: 1682px;
    padding: 100px;
    margin: 10px auto;
    font-size: 25px;
    box-shadow: 0 0 20px black;
  }

  table {
    width: 100%;
    height: 400px;

  }
  td {
    vertical-align: middle;
    text-align: center;
    border: 1px solid black;
  }
</style>
