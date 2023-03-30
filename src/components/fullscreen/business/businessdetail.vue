<template>
	<div class="addtable">
		<div class="addtable_center">
			<div class="allcenter-headers">
				<span class="titles">企业档案</span>
				<div class="close" @click="close">X</div>
			</div>
			<div class="addtable-headers">
				<div class="header_tatle">
					<el-descriptions :column='1' class="sctives">
						<el-descriptions-item label="公司名称">{{list.name}}</el-descriptions-item>
						<el-descriptions-item label="股东">{{list.shareholder}}</el-descriptions-item>
						<el-descriptions-item label="法人">{{list.legal_person}}</el-descriptions-item>
					</el-descriptions>
				</div>
				<div class="header_img">
					<img src="../../../assets/img/3.png" />
				</div>
			</div>
			<div class="addtable_content">
				<el-descriptions :column='2' class="sctives">

					<el-descriptions-item label="公司地址">{{list.address}}</el-descriptions-item>
					<el-descriptions-item label="筛查情况">{{list.screening}}</el-descriptions-item>
					<el-descriptions-item label="最新动态">{{list.news}}</el-descriptions-item>
					<el-descriptions-item label="员工数量">{{list.staff_count}}</el-descriptions-item>
					<el-descriptions-item label="备注">{{list.remarks}}</el-descriptions-item>
					<el-descriptions-item label="经度">{{list.lat}}</el-descriptions-item>
					<el-descriptions-item label="纬度">{{list.lon}}</el-descriptions-item>
				</el-descriptions>
			</div>
		</div>
	</div>
</template>
<script>
  import {companydetail} from '../../../config/api.js'
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
        companydetail({
          access_token: this.$store.state.token,
          id: id
        }).then(res => {
          this.list = res
          this.list.address=res.address
          this.list.address=res.address
          this.list.screening=res.screening
          this.list.news=res.news
          this.list.staff_count=res.staff_count
          this.listshareholder=res.shareholder
          this.list.legal_person=res.legal_person
          this.list.lat=res.lat
          this.list.lon=res.lon
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
