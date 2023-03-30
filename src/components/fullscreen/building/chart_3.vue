<template>
	<div class="building_right_two">
		<div id="Chart_3" style="width:100%;height:100%;"></div>
	</div>

</template>

<script>
	import {
		bigdatadetail
	} from '../../../config/api.js'
	export default {
		mounted() {
			this.rawLine()
		},
		methods: {
			rawLine() {
				const id = this.$store.state.buildingid
				bigdatadetail({
					access_token: this.$store.state.token,
					building_id: id,
				}).then(res => {
					let male =( res.people_male_count / res.people_total_count).toFixed(2)*100
					let female = (res.people_female_count / res.people_total_count).toFixed(2)*100
					const option = {
						tooltip: {},
						series: [{ // 第一个圆环
							type: 'pie',
							// avoidLabelOverlap: false,
							itemStyle: {
								borderColor: '#fff',
								borderWidth: 2,
							},
							top: '10%',
							startAngle: 180, //起始角度
							label: {
								show: true,
								position: 'inner', // 数据会显示在图形上，'center':会显示在圆环的内部
								color: '#fff',
								formatter: '{b}{c}%' // 显示的数据
							},
							data: [{
									value: female,
									name: "女",
									itemStyle: {
										color: 'transparent',
									}
								},
								{
									value: male,
									name: "男",
									itemStyle: {
										color: '#5470C6',
									}
								}
							], //
						}, ]
					};
					let myChart = this.$echarts.init(document.getElementById("Chart_3"));
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
