<template>
	<div style="width: auto;height: 95%;margin:0px 20px 0px 20px;padding: 30px 0px 30px 0px; ">
		<!-- <div id="Chart_26" style="width:100%;height:95%;">
			
		</div> -->
		<dv-charts :option="option" />
	</div>
</template>

<script>
	import {
		bigdataindex
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				option: {
					
					legend:{
						selectAble:true,
						textStyle: {
						  fontFamily: 'Arial',
						  fontSize: 13,
						  fill: '#fff'
						},
						// textUnselectedStyle: {
						//   fontFamily: 'Arial',
						//   fontSize: 13,
						//   fill: '#999'
						// }
					},
					title:{
						style: {
						  fill: '#fff',
						  fontSize: 17,
						  fontWeight: 'bold',
						  textAlign: 'center',
						  textBaseline: 'bottom'
						}
					},
					xAxis: {
						name: '年龄阶段',
						data: ['0-18', '18-35', '35-60', '60-80', '80以上']
					},
					yAxis: {
						name: '数量',
						data: 'value',
					},
					series: [{
						data: [0, 30, 19, 21, 35],
						type: 'line',
						lineArea: {
							show: true,
							gradient: ['rgba(55, 162, 218, 0.8)', 'rgba(55, 162, 218, 0)']
						},
						label: {
							show: true,
							formatter: '{value}'
						}
					}]
				}
			}
		},
		mounted() {
			this.rawLine()
		},
		methods: {
			rawLine() {
				bigdataindex({
					access_token: this.$store.state.token,
				}).then(res => {
					// let name = ['0-18','18-35','35-60','60-80','80以上']
					let value = Object.values(res.people_age_count)
					// // this.option.xAxis.data=name
					this.option.series[0].data = value
					this.option = {
						...this.option
					}
					// const option = {
					// 	tooltip: {},
					// 	xAxis: {
					// 		data: name,
					// 		axisLabel: {
					// 			show: true,
					// 			textStyle: {
					// 				color: "#fff"
					// 			}
					// 		}
					// 	},
					// 	yAxis: {
					// 		axisLabel: {
					// 			show: true,
					// 			textStyle: {
					// 				color: "#fff"
					// 			}
					// 		}
					// 	},
					// 	series: [{
					// 		name: '数量',
					// 		type: 'bar',
					// 		data: value
					// 	}]
					// }
					// let myChart = this.$echarts.init(document.getElementById("Chart_26"));
					// myChart.setOption(option);
				})
			}

		}
	}
</script>

<style>
</style>
