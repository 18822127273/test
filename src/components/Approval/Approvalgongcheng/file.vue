<template>
  <div class="gongchengfile">
    <div class="gongchengcontents">
      <el-button type="primary" @click="show" size="small">关闭</el-button>
      <div class="gongchengcontent">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      show() {
        const s = false
        this.$emit("close", s)
      }
    }
  }
</script>

<style>
  .gongchengfile {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .gongchengcontent {
    width: 595px;
    height: 842px;
    background-color: #fff;
    margin-top: 20px;
  }

  .gongchengcontents {
    width: 595px;
    margin: 10px auto;
  }
</style>
