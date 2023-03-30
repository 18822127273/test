<template>
	<div class="addtable">
		<div class="addtable_centers">
			<div class="allcenter-headers">
				<span class="titles">楼栋档案</span>
				<div class="close" @click="close">关闭</div>
			</div>
			<div class="building_header">
				<el-row>
					<el-col :span="18">
						<div style=" font-size: 30px;">
							<span>{{name}}&nbsp;</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div style="background-color: rgba(255, 255, 255, 0.3);text-align: left; margin-right: 20px;">
							<el-row>
								<el-col :span="12">
									<p style="height: 30px; font-size: 20px;">总户数</p>
									<p style="height: 60px; font-size: 30px;">{{num}}</p>
								</el-col>
								<el-col :span="12">
									<p style="height: 30px; font-size: 20px;">总人数</p>
									<p style="height: 60px; font-size: 30px;">{{peoplenum}}</p>
								</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="building_content">
				<el-row>
					<el-col :span="5">
						<v-left :houseid="houseid"></v-left>
					</el-col>
					<el-col :span="15">
						<v-chart1 :id='id' ></v-chart1>
					</el-col>
					<el-col :span="4">
						<el-row>
							<v-chart2></v-chart2>
						</el-row>
						<el-row>
							<v-chart4></v-chart4>
						</el-row>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<v-chart5></v-chart5>
					</el-col>
					<el-col :span="10">
						<v-chart6></v-chart6>
					</el-col>
					<el-col :span="4">
						<v-chart3></v-chart3>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		houseindex,
		bigdatadetail
	} from '../../../config/api.js'
	import chart_2 from './chart_2.vue'
	import chart_3 from './chart_3.vue'
	import chart_4 from './chart_4.vue'
	import chart_5 from './chart_5.vue'
	import chart_6 from './chart_6.vue'
	import chart_1 from './chart_1.vue'
	import left from './buildingleft.vue'
	export default {
		props: ['id', 'name'],
		components: {
			'v-chart1': chart_1,
			'v-chart2': chart_2,
			'v-chart3': chart_3,
			'v-chart4': chart_4,
			'v-chart5': chart_5,
			'v-chart6': chart_6,
			'v-left': left
		},
		data() {
			return {
				show: false,
				list: {
					user: '',
					sex: '',
					age: '',
					rc: "",
					estate: ''
				},
				num: '',
				houseid: '',
				peoplenum: ''
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				bigdatadetail({
					access_token: this.$store.state.token,
					building_id: this.id
				}).then(res => {
					this.num = res.house_count
					this.peoplenum = res.people_total_count
				});
			},
			close() {
				this.$emit("closeds", this.show)
			}
		}
	}
</script>

<style>
</style>
