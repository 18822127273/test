<template>
	<div>
		<!-- 成员详情 -->
		<div>
			<div class="commaddcenter_header">
				<back-button></back-button>
				<!-- <el-button @click="backlast">返回</el-button> -->
				<el-button :plain="true" type="primary" @click="submitForm('ruleForm')">更新信息</el-button>
			</div>
			<div class="commadd_content">
				<el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="名字" prop="name">
						<el-input v-model=" ruleForm.name" width="100"></el-input>
					</el-form-item>
					<el-form-item label="曾用名" prop="name_used_before">
						<el-input v-model="ruleForm.name_used_before"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="id_card">
						<el-input v-model="ruleForm.id_card" disabled></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-radio-group v-model="ruleForm.gender" disabled>
							<el-radio :label="1">男</el-radio>
							<el-radio :label="0">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="年龄" prop="age">
						<el-input v-model="ruleForm.age" disabled></el-input>
					</el-form-item>
					<el-form-item label="标签" prop="tags">
						<el-checkbox-group v-model="ruleForm.tags">
							<el-checkbox label="社区矫正"></el-checkbox>
							<el-checkbox label="吸毒"></el-checkbox>
							<el-checkbox label="残疾人"></el-checkbox>
							<el-checkbox label="安置帮教"></el-checkbox>
							<el-checkbox label="矛盾冲突人员"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="是否党员" prop="is_party">
						<el-switch v-model="ruleForm.is_party" :active-value="1" :inactive-value="0"></el-switch>
					</el-form-item>
					<el-form-item label="省" prop="native_place_province_id">
						<el-select v-model="ruleForm.native_place_province_id" placeholder="请选择" @change="getdataone()">
							<el-option v-for="item in table" :key="item.id" :label="item.region_name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="市" prop="value">
						<el-select v-model="value" placeholder="请选择" @change="getdatatwo()">
							<el-option v-for="item in lasttable" :key="item.id" :label="item.region_name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="区" prop="native_place_id">
						<el-select v-model="ruleForm.native_place_id" placeholder="请选择">
							<el-option v-for="item in finaltable" :key="item.id" :label="item.region_name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="行业" prop="profession">
						<el-input v-model="ruleForm.profession"></el-input>
					</el-form-item>
					<el-form-item label="身份证地址" prop="id_card_address">
						<el-input v-model="ruleForm.id_card_address"></el-input>
					</el-form-item>
					<el-form-item label="小区地址" prop="residential_quarters_address">
						<el-input v-model="ruleForm.residential_quarters_address"></el-input>
					</el-form-item>
					<el-form-item label="工作单位" prop="company">
						<el-input v-model="ruleForm.company"></el-input>
					</el-form-item>
					<el-form-item label="工作单位地址" prop="company_address">
						<el-input v-model="ruleForm.company_address"></el-input>
					</el-form-item>
					<el-form-item label="出生地址" prop="birth_address">
						<el-input v-model="ruleForm.birth_address"></el-input>
					</el-form-item>
					<el-form-item label="婚姻状况" prop="marital_status">
						<el-select v-model="ruleForm.marital_status" placeholder="请选择">
							<el-option label="未婚" :value="0"></el-option>
							<el-option label="已婚" :value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="学历" prop="education">
						<el-select v-model="ruleForm.education" placeholder="请选择">
							<el-option label="小学" :value="0"></el-option>
							<el-option label="初中" :value="1"></el-option>
							<el-option label="高中" :value="2"></el-option>
							<el-option label="大学" :value="3"></el-option>
							<el-option label="硕士研究生" :value="4"></el-option>
							<el-option label="博士研究生" :value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="宗教信仰" prop="religion">
						<el-input v-model="ruleForm.religion"></el-input>
					</el-form-item>
					<el-form-item label="是否常住人口" prop="is_resident">
						<el-switch v-model="ruleForm.is_resident" :active-value="1" :inactive-value="0"></el-switch>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		analyzeIDCard,
	} from "../../../assets/js/public.js"
	import {
		detail,
		update,
		region,
		regiondetail
	} from '../../../config/api.js'
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					name_used_before: '',
					age: '',
					id_card: '',
					address: '',
					gender: '',
					desc: '',
					tags: [],
					is_party: '',
					native_place_id: '',
					native_place_value: "",
					native_place_province_id: '',
					profession: '',
					id_card_address: '',
					residential_quarters_address: '',
					company: '',
					company_address: '',
					birth_address: '',
					education: '',
					marital_status: '',
					religion: '',
					is_resident: '',
				},
				value: '',
				table: [],
				lasttable: [],
				finaltable: [],
				rules: {
					name: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					gender: [{
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					}],
					residential_quarters_address: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		beforeRouteLeave(to, from, next) {
			to.meta.keepAlive = true;
			next()
		},
		mounted() {
			this.getlist()
			this.getdata()
		},
		methods: {
			getlist() {
				const id = this.$route.query.id
				detail({
					access_token: this.$store.state.token,
					id: id
				}).then(res => {
					this.ruleForm = res
					this.ruleForm.age = analyzeIDCard(res.id_card)
					//备注判断
					if (res.tags == null) {
						this.ruleForm.tags = []
					} else if (res.tags != null) {
						const list = res.tags.split(',')
						this.ruleForm.tags = list
					}
					//显示区的列表
					regiondetail({
						id: res.native_place_id,
					}).then(res => {
						this.finaltable.push(res)
						//市列表名称显示
						regiondetail({
							id: res.parent_id,
						}).then(res => {
							this.value=res.region_name
						})
						//区列表显示
						region({
							parent_id: res.parent_id
						}).then(res => {
							this.finaltable=res
							// console.log(res,1234)			// this.table = res						
						})
					})
					//显示市区的列表
					region({
						parent_id: res.native_place_province_id
					}).then(res => {
						this.lasttable = res
						// console.log(res,234)
						// this.table = res
					})

				})
			},
			// 修改地区
			getdataone() {
				region({
					parent_id: this.ruleForm.native_place_province_id
				}).then(res => {
					// console.log(res,111)
					this.value = [],
						this.ruleForm.native_place_id = []
					this.lasttable = res
				})
			},
			//修改地区市
			getdatatwo() {
				region({
					parent_id: this.value
				}).then(res => {
					this.ruleForm.native_place_id = []
					this.finaltable = res
					// console.log(this.finaltable, 12234)
				})
			},
			//修改地区省
			getdata() {
				region({
					parent_id: 1
				}).then(res => {
					this.table = res
				});
			},
			submitForm() {
				const fromdata = this.ruleForm
				const id = this.$route.query.id
				const tags = this.ruleForm.tags.toString()
				update({
					access_token: this.$store.state.token,
					name: fromdata.name,
					id: id,
					name_used_before: fromdata.name_used_before,
					address: fromdata.address,
					gender: fromdata.gender,
					desc: fromdata.desc,
					tags: tags,
					is_party: fromdata.is_party,
					native_place_id: fromdata.native_place_id,
					native_place_province_id: fromdata.native_place_province_id,
					profession: fromdata.profession,
					id_card_address: fromdata.id_card_address,
					residential_quarters_address: fromdata.residential_quarters_address,
					company: fromdata.company,
					company_address: fromdata.company_address,
					birth_address: fromdata.birth_address,
					education: fromdata.education,
					marital_status: fromdata.marital_status,
					religion: fromdata.religion,
					is_resident: fromdata.is_resident,
				}).then(res => {
					this.$message.success("更新成功")
				})
			},
		}
	}
</script>

<style>
</style>
