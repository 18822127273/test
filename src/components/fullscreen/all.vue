<template>
	<div class="fullall">
		<dv-border-box-10>
			<div class="fullall_header">
				<div class=" ina fullall_headerone">
					<div style=" height:60%;margin: 20px;text-align: center;">
						<dv-border-box-8>
							<div style="padding:10px;display: inline-block;">
								<div style="color: #fff;float:left;font-size: 30px;">
									<h1>小区数:</h1>
								</div>
								<div style="float: left;">
									<dv-digital-flop :config="config" style="width:100px;height:50px;" />
								</div>
							</div>
						</dv-border-box-8>
					</div>
				</div>
				<div class="ina fullall_headertwo">
					<div style=" height:60%;margin: 20px;text-align: center;">
						<dv-border-box-8>
							<div style="padding:10px;display: inline-block;">
								<div style="color: #fff;float:left;font-size: 30px;">
									<h1>楼栋数:</h1>
								</div>
								<div style="float: left;">
									<dv-digital-flop :config="config1" style="width:100px;height:50px;" />
								</div>
							</div>
						</dv-border-box-8>
					</div>
				</div>
				<div class="ina fullall_headerthree">
					<div style=" height:60%;margin: 20px;text-align: center;">
						<dv-border-box-8>
							<div style="padding:10px;display: inline-block;">
								<div style="color: #fff;float:left;font-size: 30px;">
									<h1>户数:</h1>
								</div>
								<div style="float: left; ">
									<dv-digital-flop :config="config2" style="width:100px;height:50px;" />
								</div>
							</div>
						</dv-border-box-8>
					</div>
				</div>
				<div class="ina fullall_headerfour">
					<div style=" height:60%;margin: 20px;text-align: center;">
						<dv-border-box-8>
							<div style="padding:10px;display: inline-block;">
								<div style="color: #fff;float:left;font-size: 30px;">
									<h1>总人数:</h1>
								</div>
								<div style="float: left;">
									<dv-digital-flop :config="config3" style="width:100px;height:50px;" />
								</div>
							</div>
						</dv-border-box-8>
					</div>
				</div>
				<div class="ina fullall_headerfive">
					<div style=" height:60%;margin: 20px;text-align: center;">
						<dv-border-box-8>
							<div style="padding:10px;display: inline-block;">
								<div style="color: #fff;float:left;font-size: 30px;">
									<h1>党员数:</h1>
								</div>
								<div style="float: left; ">
									<dv-digital-flop :config="config4" style="width:100px;height:50px;" />
								</div>
							</div>
						</dv-border-box-8>
					</div>
				</div>
			</div>
			<div class="fullall_content">
				<div class="inb fullall_contentone">
					<div style="height: 50%;">
						<dv-border-box-11 title="人户分离">
							<v-chart1></v-chart1>
						</dv-border-box-11>
					</div>
					<div style="height: 50%;">
						<dv-border-box-11 title="男女比例">
							<v-chart2></v-chart2>
						</dv-border-box-11>
					</div>
				</div>
				<div class="inb fullall_contenttwo">
					<div style="height: 100%;" @click="totiles">
						<dv-border-box-11 title="社区图示">
							<v-chart3></v-chart3>
						</dv-border-box-11>
					</div>
				</div>
				<div class="inb fullall_contentthree">
					<div style="height: 100%;">
						<dv-border-box-11 title="社区制度">
							<v-chart4></v-chart4>
						</dv-border-box-11>
					</div>
				</div>
			</div>
			<div class="fullall_footer">
				<div class="inc fullall_footerone">
					<dv-border-box-11 title="党员比例">
						<v-chart5></v-chart5>
					</dv-border-box-11>
				</div>
				<div class="inc fullall_footertwo">
					<dv-border-box-11 title="年龄分布">
						<v-chart6></v-chart6>
					</dv-border-box-11>
				</div>
				<div class="inc fullall_footerthree">
					<dv-border-box-11 title="群体分布">
						<v-chart7></v-chart7>
					</dv-border-box-11>
					
				</div>
			</div>
		</dv-border-box-10>
	</div>
</template>
<script>
	import chart_2 from './all/chart_2.vue'
	import chart_3 from './all/chart_3.vue'
	import chart_4 from './all/chart_4.vue'
	import chart_5 from './all/chart_5.vue'
	import chart_1 from './all/chart_1.vue'
	import chart_6 from './all/chart_6.vue'
	import chart_7 from './all/chart_7.vue'
	import {
		bigdataindex
	} from '../../config/api.js'
	export default {
		name: "all",
		components: {
			'v-chart1': chart_1,
			'v-chart2': chart_2,
			'v-chart3': chart_3,
			'v-chart4': chart_4,
			'v-chart5': chart_5,
			'v-chart6': chart_6,
			'v-chart7': chart_7,
		},
		data() {
			return {
				config: {
					number: [],
				},
				config1: {
					number: [],
				},
				config2: {
					number: [],
				},
				config3: {
					number: [],
				},
				config4: {
					number: [],
				},
			}
		},
		created() {
			this.getlist()
		},
		methods: {
			totiles() {
				this.$router.push('/fullscreen/3dtiles')
			},
			getlist() {
				bigdataindex({
					access_token: this.$store.state.token,
				}).then(res => {
					const one = res.people_is_party_count
					const two = res.building_count
					const three = res.house_count
					const four = res.people_total_count
					const five = res.people_is_party_count
					this.config.number = [one]
					this.config1.number = [two]
					this.config2.number = [three]
					this.config3.number = [four]
					this.config4.number = [five]
					this.config = {
						...this.config
					}
					this.config1 = {
						...this.config1
					}
					this.config2 = {
						...this.config2
					}
					this.config3 = {
						...this.config3
					}
					this.config4 = {
						...this.config4
					}
				})
			}
		}
	}
</script>
<style>
	.fullall {
		position: fixed;
		top: 60px;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(3, 80, 116, 0.8)
	}
	.fullall_header {
		height: 10%;
		width: 100%;
	}
	.ina {
		float: left;
		width: 20%;
		height: 100%
	}
	.fullall_headerone {}
	.fullall_headertwo {}
	.fullall_headerthree {}
	.fullall_headerfour {}
	.fullall_headerfive {}
	.fullall_content {
		height: 60%;
		width: 100%;

	}
	.inb {
		float: left;
		height: 100%
	}
	.fullall_contentone {
		width: 25%;
		height: 100%;
	}
	.fullall_contenttwo {
		width: 50%;
		height: 100%;
	}
	.fullall_contentthree {
		width: 25%;
		height: 100%;
	}
	.inc {
		float: left;
		height: 100%
	}
	.fullall_footertwo {
		width: 37.5%
	}
	.fullall_footerone {
		width: 25%;
	}
	.fullall_footerthree {
		width: 37.5%
	}
	.fullall_footer {
		height: 30%;
		width: 100%;
	}
</style>
