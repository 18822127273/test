<template>
  <div id="app">
      <router-view  />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  }
}
</script>

<style>
.amap-wrapper {
  width: 100%;
  height: 100%;
  z-index: 0;
  position: fixed;

}
/* 隐藏cesium标志 */
.cesium-viewer .cesium-widget-credits {
  display: none;
}

</style>
