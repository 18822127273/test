<template>
	<div style="width: auto;height: 90%;margin:0px 20px 20px 20px;padding: 70px 0px 80px 0px;">
		<!-- <div id="Chart_25" style="width:100%;height:100%;">
		</div> -->
		<dv-water-level-pond :config="config" style="width:200px;height:200px;margin: auto;" />
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
				total: '',
				config: {
					data: [50],
					shape: 'round'
				}
			}
		},
		created() {
			this.rawLine()
		},
		methods: {
			rawLine() {
				bigdataindex({
					access_token: this.$store.state.token,
				}).then(res => {
					const data=[parseInt((res.people_is_party_count/res.people_total_count)*100)]
					this.config.data = data
					this.config = { ...this.config }
					
				})

			}

		}
	}
</script>

<style>
</style>
