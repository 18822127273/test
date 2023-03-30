<template>
	<div class="addtable">
		<div class="addtable_center">
			<div class="allcenter-headers">
				<span class="titles">党员个人档案</span>
				<div class="close" @click="close">X</div>
			</div>
			<div class="addtable-headers">
				<div class="header_tatle">
					<el-descriptions :column='1' class="sctives">
						<el-descriptions-item label="用户名">{{list.name}}</el-descriptions-item>
						<el-descriptions-item label="性别">{{list.gender}}</el-descriptions-item>
						<el-descriptions-item label="年龄">{{list.age}}</el-descriptions-item>
					</el-descriptions>
				</div>
				<div class="header_img">
					<img src="../../../assets/img/3.png" />
				</div>
			</div>
			<div class="addtable_content">
				<el-descriptions :column='2' class="sctives">
					<el-descriptions-item label="人口类别">{{id}}</el-descriptions-item>
					<el-descriptions-item label="证件种类">身份证</el-descriptions-item>
					<el-descriptions-item label="曾用名">{{list.age}}</el-descriptions-item>
					<el-descriptions-item label="证件号码">{{list.id_card}}</el-descriptions-item>
					<el-descriptions-item label="证件地址">{{list.id_card_address}}</el-descriptions-item>
					<el-descriptions-item label="政治面貌">{{list.is_party}}</el-descriptions-item>
					<el-descriptions-item label="标签">{{list.tags}}</el-descriptions-item>
					<el-descriptions-item label="行业">{{list.profession}}</el-descriptions-item>
					<el-descriptions-item label="小区地址">{{list.residential_quarters_address}}</el-descriptions-item>
					<el-descriptions-item label="地址">{{list.sex}}</el-descriptions-item>
					<el-descriptions-item label="工作单位">{{list.company}}</el-descriptions-item>
					<el-descriptions-item label="工作单位地址">{{list.company_address}}</el-descriptions-item>
					<el-descriptions-item label="出生地址">{{list.birth_address}}</el-descriptions-item>
					<el-descriptions-item label="学历">{{list.education}}</el-descriptions-item>
					<el-descriptions-item label="婚姻状况">{{list.marital_status}}</el-descriptions-item>
					<el-descriptions-item label="宗教信仰">{{list.religion}}</el-descriptions-item>
					<el-descriptions-item label="常住居民">{{list.is_resident}}</el-descriptions-item>
				</el-descriptions>
			</div>
		</div>
	</div>
</template>
<script>
  import {detail} from '../../../config/api.js'
  import {
    analyzeIDCard,
    sexIDCard,
    sexchange,
    isparty,
    marital,
    resident
  } from '../../../assets/js/public.js'
	export default {
    props:['id'],
		data() {
			return {
				show: false,
				list: {
					user: '',
					sex: '',
					age: '',
					rc: "",
					estate: '',
          id:''
				},
			}
		},
    mounted() {
      this.getlist()
    },
		methods: {
      getlist(){
        const id = this.id
        detail({
          access_token: this.$store.state.token,
          id: id
        }).then(res => {
          this.list = res
          this.list.gender=sexchange(res.gender)
          this.list.age=analyzeIDCard(res.id_card)
          this.list.is_party=isparty(res.is_party)
          this.list.marital_status=marital(res.marital_status)
          this.list.is_resident=resident(res.is_resident)
          console.log(res,111)
        })
      },
			close() {
				this.$emit("closeds", this.show)
			}
		}
	}
</script>

<style>
</style>
