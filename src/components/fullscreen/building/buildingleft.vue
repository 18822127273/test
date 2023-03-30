<template>
	<div class="building_left">
		<ul v-for="(item,index) in list" :key="index">
			<li>
				{{index+1}}层
			</li>
			<li>
				<span v-for="(item,index) in item" @click="openhouse(item)">
					<el-badge :value="index" class="item">
						{{item.house_num}}室
					</el-badge>
				</span>
			</li>
		</ul>
		<v-inhabit v-if="show" @closeds='closed'></v-inhabit>
	</div>
</template>
<script>
	import {
		buildingstructure,
		housepeople
	} from '../../../config/api.js'
	import inhabit from './buildinginhabieall.vue'
	import store from "../../../store/store";
	export default {
		components: {
			'v-inhabit': inhabit
		},
		data() {
			return {
				show: false,
				houseid: '',
				list: {},
				value: 1
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				const id = this.$store.state.buildingid
				buildingstructure({
					access_token: this.$store.state.token,
					building_id: id,
				}).then(res => {
					console.log(res, 111)
					let arr = Object.keys(res).map(key => {
						return res[key]
					})
					this.list = arr
				})
				// housepeople({
				// 	access_token: this.$store.state.token,
				// 	house_id: this.$store.state.houseid
				// }).then(res => {
				// 	console.log(res, 111)
				// })
			},
			openhouse(item) {
				this.show = true
				this.houseid = item.id
				const houseid = this.houseid
				store.commit('houseid', houseid)
			},
			closed() {
				this.show = false
			}
		}
	}
</script>

<style>
</style>
