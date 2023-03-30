<template>
	<div style="width: auto;height: 95%;margin:0px 20px 0px 20px; overflow: hidden;">
		<div style="padding: 60px 20px; font-size: 25px; color: #fff; height: 95%;line-height: 35px; text-indent: 2rem;">
			<div v-for="(item,index) in system">
				<p>{{item}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		communitydetail,
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				system: ''
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				communitydetail({
					access_token: this.$store.state.token,
				}).then(res => {
					this.system = res.system.split('。')
				});
			},

		}
	}
</script>

<style>
</style>
