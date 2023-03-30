<template>
	<div style="width: auto;height: 90%;margin:0px 20px 20px 20px;padding-top: 20px;">
		<div id="Chart_21" style="width:100%;height:100%;margin-top: 0px;"></div>
	</div>
</template>
<script>
	import {
		bigdataindex
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				party: '',
				unparty: '',
				total: ''
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
					let resident = (res.people_is_resident_count / res.house_count).toFixed(2)*100
					let unresident = ((res.house_count - res.people_is_resident_count) / res.house_count).toFixed(2)*100
					const option = {
						tooltip: {},
						series: [{ // 第一个圆环
							type: 'pie',
							// avoidLabelOverlap: false,
							itemStyle: {
								borderColor: '#3AE5CB',
								borderWidth: 3,
							},
							top: '10%',
							startAngle: 180, //起始角度
							label: {
								show: true,
								position: 'inner', // 数据会显示在图形上，'center':会显示在圆环的内部
								color: '#fff',
								fontSize: 16,
								formatter: '{b}({c}%)' // 显示的数据
							},
							data: [{
									value: resident,
									name: "人户一致",
									itemStyle: {
										color: 'transparent',
									}
								},
								{
									value: unresident,
									name: "人户分离",
									itemStyle: {
										color: '#1FA1C7',
									}
								}
							], //
						}, ]
					};
					let myChart = this.$echarts.init(document.getElementById("Chart_21"));
					myChart.setOption(option);
					//等比例缩放
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
