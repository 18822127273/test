<template>
  <div class="gongchengdetail">
    <back-button></back-button>
    <el-row>
      <el-col :span="4">
        <div style="height: 600px;">
          <el-steps direction="vertical" :active="num">
            <el-step title="创建完成">
            </el-step>
            <el-step title="审批中"></el-step>
            <el-step title="上传成功"></el-step>
            <el-step title="任务完成"></el-step>
          </el-steps>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="gonghcengleft">
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="文档预览" placement="top">
                <el-card>
                  <el-button type="primary" size="small" @click="fileshow">点击预览</el-button>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="下载文档" placement="top">
                <el-card>
                  <el-button type="primary" size="small" @click="exportWordFile">文档下载</el-button>
                  <p>下载后的文档拍照后上传</p>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="图片上传" placement="top">
                <el-card>
                 <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                   :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
                   <el-button size="small" type="primary">点击上传</el-button>
                   <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                 </el-upload>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="提交文档" placement="top">
                <el-card>
                  <el-button type="primary" size="small" :disabled="val">提交</el-button>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
    </el-row>
    <v-file v-if="show" @close="close"></v-file>
  </div>
</template>

<script>
  import file from './file.vue'
  import {exportWord} from '@/assets/js/img.js'
  export default {
    components:{
      'v-file':file
    },
    data() {
      return {
        val:true,
        show:false,
        num: 2,
        imageUrl: '',
        tempUrl: '',
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      fileshow(){
        this.show=true
      },
      close(s){
        console.log(s,111)
        this.show=s
      },
      exportWordFile() {
      	let imgSize = {
      		imgUrl: [65, 65], //控制导出的word图片大小
      	};
      	let data = {
      		year: this.form.name,
      		imgpath: this.form.imgUrl
      	};
      	// console.log(data, 111)
      	exportWord("../static/test.docx", data, "demo.docx", imgSize);
      	//参数1：模板文档
      }
    }
  }
</script>

<style>
  .gongchengdetail {
    width: 100%;
    height: 800px;
  }

  .gonghcengleft {
    height: 800px;
  }
</style>
