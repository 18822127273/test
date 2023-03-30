<template>
	<div style="width: auto;height: 95%;margin:0px 20px 0px 20px;padding: 70px 0px 60px 0px;">
		<dv-flyline-chart :config="config" style="width:100%;height:90%;" />
	</div>
</template>

<script>
	export default {
    data(){
      return{
        config:{
          centerPoint: [0.91, 0.36],
            points: [
              [0.52, 0.23],
              [0.43, 0.29],
              [0.59, 0.35],
              [0.53, 0.47],
              [0.45, 0.54],
              [0.36, 0.38],
              [0.62, 0.55],
              [0.56, 0.56],
              [0.37, 0.66],
              [0.55, 0.81],
              [0.55, 0.67],
              [0.37, 0.29],
              [0.20, 0.36],
              [0.76, 0.41],
              [0.59, 0.18],
              [0.68, 0.17],
              [0.59, 0.10]
            ],
            bgImgUrl: require('../../../assets/img/2.jpg')
        }
      }
    },
		
	}
</script>

<style>
</style>
