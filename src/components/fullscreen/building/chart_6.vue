<template>
	<div class="building_footer_right">
		<div id="Chart_6" style="width:100%;height:100%;"></div>
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
					building_id: this.$store.state.buildingid
				}).then(res => {
					console.log(res.native_place)
					let value1 = Object.values(res.native_place)
					let value2 = Object.keys(res.native_place)

					const option = {
						tooltip: {},
						xAxis: {
							data: value2,
							axisLabel: {
								show: true,
								textStyle: {
									color: "#fff"
								}
							}
						},
						yAxis: {
							axisLabel: {
								show: true,
								textStyle: {
									color: "#fff"
								}
							}
						},
						series: [{
							name: '销量',
							type: 'bar',
							data: value1,
							label: {
								show: true,
								position: 'inner', // 数据会显示在图形上，'center':会显示在圆环的内部
								color: '#fff',
								formatter: '{b}' // 显示的数据
							},
						}]
					}
					let myChart = this.$echarts.init(document.getElementById("Chart_6"));
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
