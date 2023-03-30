<template>
	<div class="inhabitall">
		<div class="inhabitcenter">
			<div class="allcenter-headers">
				<span class="titles">楼栋档案</span>
				<div class="close" @click="close">关闭</div>
				<div style="float: right;margin-right: 30px;">
					<el-radio v-model="radio" label="1">户籍人员</el-radio>
					<el-radio v-model="radio" label="2">实住人员</el-radio>
				</div>
			</div>
			<div class="inhabitcontennt">
				<div class="inhabitcontennt-child" :style="{width:scrollerwidth}">
					<div class="inhabit" v-for="(item,index) in list">
						<el-descriptions title="用户信息" :column='1' class="sctives">
							<el-descriptions-item label="用户名">{{item.name}}</el-descriptions-item>
							<el-descriptions-item label="曾用名">{{item.sex}}</el-descriptions-item>
							<el-descriptions-item label="年龄">{{list.age}}</el-descriptions-item>
							<el-descriptions-item label="性别">{{list.gender}}</el-descriptions-item>
							<el-descriptions-item label="标签">{{item.tags}}</el-descriptions-item>
							<el-descriptions-item label="身份证号">{{item.id_card}}</el-descriptions-item>
							<el-descriptions-item label="身份证地址">{{item.id_card_address}}</el-descriptions-item>
							<el-descriptions-item label="是否居住">{{item.is_live}}</el-descriptions-item>
							<el-descriptions-item label="公司">{{item.company}}</el-descriptions-item>
							<el-descriptions-item label="是否党员">{{item.is_party}}</el-descriptions-item>
							<el-descriptions-item label="行业">{{item.profession}}</el-descriptions-item>
							<el-descriptions-item label="小区地址">{{item.residential_quarters_address}}</el-descriptions-item>
							<el-descriptions-item label="出生地址">{{item.birth_address}}</el-descriptions-item>
							<el-descriptions-item label="婚姻状况">{{item.marital_status}}</el-descriptions-item>
							<el-descriptions-item label="学历">{{item.education}}</el-descriptions-item>
						</el-descriptions>
						<div class="img">
							<img src="../../../assets/img/3.png" />
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		housepeople
	} from '../../../config/api.js'
	import store from "../../../store/store";
	export default {
		data() {
			return {
				radio: '1',
				list: []
			};
		},
		mounted() {
			this.getlist()
		},
		beforeRouteLeave(to, from, next) {
			to.meta.keepAlive = true;
			next()
		},
		computed: {
			scrollerwidth() {
				let i = this.list.length
				if (i >= 3) {
					return (i * 490) + 'px'
				}
			},
			// scrollerwidths() {
			// 	let i = this.list.length
			// 	if (i == 1) {
			// 		return (99)+'%'
			// 	} else if (i == 2) {
			// 		return (49)+'%'
			// 	} else if (i >= 3) {
			// 		return (500) + 'px'
			// 	}

			// }
		},
		methods: {
			close() {
				this.$emit("closeds", this.show)
			},
			getlist() {
				const id = this.$store.state.houseid
				housepeople({
					access_token: this.$store.state.token,
					house_id: id
				}).then(res => {
					console.log(res, 111)
					this.list = res
				})
			},
		}
	}
</script>

<style>
	.inhabitall {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		overflow: auto;
	}

	.inhabitcenter {
		width: calc(100%-400px);
		height: 810px;
		background-color: rgba(0, 0, 0, 0.8);
		margin: 100px 200px;
	}

	.close {
		text-align: center;
	}

	.inhabitcontennt {
		width: 100%;
		height: 740px;
		overflow: auto;
		overflow-y: hidden;
		display: block;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.inhabitcontennt-child {
		margin: 10px 10px 0px 0px;
		background-color: transparent;
	}

	.inhabit {
		height: 740px;
		width: 480px;
		position: relative;
		float: left;
		margin: 0px 0px 0px 10px;
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
