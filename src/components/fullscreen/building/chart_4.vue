<template>
	<div class="building_right_three">
		<div id="Chart_4" style="width:100%;height:100%;"></div>
	</div>
</template>
<script>
	import {
		bigdatadetail
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
				const id = this.$store.state.buildingid
				bigdatadetail({
					access_token: this.$store.state.token,
					building_id: id,
				}).then(res => {
					let value1 =( res.people_is_party_count / res.people_total_count).toFixed(2)*100
					let value2 = ((res.people_total_count-res.people_is_party_count )/ res.people_total_count).toFixed(2)*100
					const option = {
						title: {
							text: '党员比例占比',
							textStyle: {
								color: '#fff'
							}
						},
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
									value: value1,
									name: "党员",
									itemStyle: {
										color: '#5470C6',
									}
								},
								{
									value: value2,
									name: "非党员",
									itemStyle: {
										color: 'transparent',
									}
								}
							], //
						}, ]
					};

					let myChart = this.$echarts.init(document.getElementById("Chart_4"));
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
