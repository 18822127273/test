<template>
	<div class="building_footer_left">
		<div id="Chart_5" style="width:100%;height:100%;">
		</div>
	</div>
	
</template>

<script>
	import {
		bigdatadetail
	} from '../../../config/api.js'
	export default {
		data() {
			return {
	
			}
	
		},
		mounted() {
			this.rawLine()
	
		},
		methods: {
			rawLine() {
				bigdatadetail({
					access_token: this.$store.state.token,
					building_id:this.$store.state.buildingid
				}).then(res => {
					let value = Object.values(res.people_age_count)
					console.log(value)
					const option = {
						tooltip: {},
						xAxis: {
							data: ['0-18', '18-35', '35-60', '60-80', '80以上'],
							axisLabel:{
								show:true,
								textStyle:{
									color:"#fff"
								}
							}
						},
						yAxis: {
							axisLabel:{
								show:true,
								textStyle:{
									color:"#fff"
								}
							}
						},
						series: [{
							name: '销量',
							type: 'bar',
							data: value
						}]
					}
					let myChart = this.$echarts.init(document.getElementById("Chart_5"));
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						// 让我们的图表调用 resize这个方法
						myChart.resize();
					});
				})
				
			}
	
		}
	}
</script>

<style>
</style>