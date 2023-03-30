<template>
	<div style="width: auto;height: 95%;margin:0px 20px 0px 20px;padding: 30px 0px 30px 0px;">
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
					xAxis: {
						name: '类型',
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						name: '数量',
						data: 'value',
					},
					series: [{
						data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
						type: 'bar',
						gradient: {
							color: ['#37a2da', '#67e0e3']
						},
						label: {
							show: true,
							position: 'center',
							offset: [0, 0],
							style: {
								fill: '#fff'
							}
						},
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
					// let name = Object.keys(res.people_special_count)
					let name=['党员','前端','吸毒','安置帮教','残疾人','犯罪','矛盾冲突人员','社区矫正','程序员']
					// console.log(name,11)
					let value = Object.values(res.people_special_count)
					this.option.xAxis.data = name
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
					// 		name: '销量',
					// 		type: 'bar',
					// 		data: value
					// 	}]
					// }
					// let myChart = this.$echarts.init(document.getElementById("Chart_27"));
					// myChart.setOption(option);
				})
			}

		}
	}
</script>

<style>
 canvas{
	 color: #fff;
 }
</style>
