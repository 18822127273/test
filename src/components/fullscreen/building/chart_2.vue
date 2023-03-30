<template>
	<div class="building_right_one">
		<div id="Chart_2" style="width:100%;height:100%;">
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
					let resident=(res.people_is_resident_count/res.house_count).toFixed(2)*100
					let unresident=((res.house_count-res.people_is_resident_count)/res.house_count).toFixed(2)*100
					console.log(res)
					const option = {
						title: {
							text: '人户分离占比',
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
									value: resident,
									name: "人户一致",
									itemStyle: {
										color: '#5470C6',
									}
								},
								{
									value: unresident,
									name: "人户分离",
									itemStyle: {
										color: 'transparent',
									}
								}
							], //
						}, ]
					};

					let myChart = this.$echarts.init(document.getElementById("Chart_2"));
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						// 让我们的图表调用 resize这个方法
						myChart.resize();
					});s
				})

			}

		}
	}
</script>

<style>
</style>
