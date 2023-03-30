<template>
	<div class="building_center">
		<div id="myChart" style="width:100%;height: 380px;">
		</div>
	</div>
</template>
<script>
	import {
		bigdatadetail
	} from '../../../config/api.js'
	export default {
		prop:['id'],
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
					building_id: this.$store.state.buildingid
				}).then(res=>{
					let value = Object.values(res.people_special_count)
					let key = Object.keys(res.people_special_count)
					// console.log(value,key,345)
					const option = {
						tooltip: {},
						xAxis: {
							data: ['60岁以上', '正式党员', '单双独', '志愿者', '儿童', ],
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
					let myChart = this.$echarts.init(document.getElementById("myChart"));
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
