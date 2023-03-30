<template>
	<!-- 导出模块 -->
	<div class="exportfull">
		<div style="margin: 100px 100px; overflow: auto;">
			<div style="margin-top: 20px">
				<el-button type="primary" @click="backPop">返回</el-button>
				<el-button @click="toggleSelection()">取消选择</el-button>
				<el-button @click="exportexcel()">确认导出</el-button>
			</div>
			<div style="position: relative;">
				<!-- 列表显示内容，需要根据自己需要导出的部分填写 -->
				<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" height="600px"
					@selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="120" fixed></el-table-column>
					<el-table-column prop="name_used_before" label="曾用名" width="120"></el-table-column>
					<el-table-column prop="age" label="年龄" width="120"></el-table-column>
					<el-table-column prop="id_card" label="身份证号" width="120"></el-table-column>
					<el-table-column prop="tags" label="标签" width="120"></el-table-column>
					<el-table-column prop="address" label="地址" width="120"></el-table-column>
					<el-table-column prop="gender" label="性别" width="120"></el-table-column>
					<el-table-column prop="is_party" label="党员" width="120"></el-table-column>
					<el-table-column prop="native_place_id" label="籍贯" width="120"></el-table-column>
					<el-table-column prop="profession" label="行业" width="120"></el-table-column>
					<el-table-column prop="id_card_address" label="身份证地址" width="120"></el-table-column>
					<el-table-column prop="residential_quarters_address" label="小区地址" width="120"></el-table-column>
					<el-table-column prop="company" label="工作单位" width="120"></el-table-column>
					<el-table-column prop="company_address" label="工作单位地址" width="120"></el-table-column>
					<el-table-column prop="birth_address" label="出生地址" width="120"></el-table-column>
					<el-table-column prop="education" label="学历" width="120"></el-table-column>
					<el-table-column prop="marital_status" label="婚姻状况" width="120"></el-table-column>
					<el-table-column prop="religion" label="宗教信仰" width="120"></el-table-column>
					<el-table-column prop="is_resident" label="常驻居民" width="120"></el-table-column>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<script>
	//npm i js-export-excel
	import ExportJsonExcel from "js-export-excel";
	export default {
		props: ["list"],
		data() {
			return {
				multipleSelection: [],
				lists: []
			}
		},
		mounted() {},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection, 555)
			},
			backPop() {
				let shows = false
				this.$emit('close', shows)
			},
			exportexcel() {
				const dataList = this.multipleSelection;
				let lengths = dataList.length;
				if (lengths > 0) {
					let option = {}; //   option代表的就是excel文件
					let dataTable = []; //   dataTable代表excel文件中的数据内容
					if (dataList) {
						for (let i in dataList) {
							let j = Number(i) + 1
							let obj = {
								序号: j,
								姓名: dataList[i].name,
								曾用名: dataList[i].name_used_before,
								年龄: dataList[i].age,
								身份证号: dataList[i].id_card,
								标签: dataList[i].tags,
								地址: dataList[i].address,
								性别: dataList[i].gender,
								党员: dataList[i].is_party,
								籍贯: dataList[i].native_place_id,
								行业: dataList[i].profession,
								身份证地址: dataList[i].id_card_address,
								小区地址: dataList[i].residential_quarters_address,
								工作单位: dataList[i].company,
								工作单位地址: dataList[i].company_address,
								出生地址: dataList[i].birth_address,
								学历: dataList[i].education,
								婚姻状况: dataList[i].marital_status,
								宗教信仰: dataList[i].religion,
								常住居民: dataList[i].is_resident,
							};
							dataTable.push(obj); //   设置excel每列获取的数据源
						}
					}
					option.filename = "小区列表"; //excel文件名
					//excel文件数据
					option.datas = [{
						//   excel文件的数据源
						sheetData: dataTable,
						//   excel文件sheet的表名
						sheetName: "sheet",
						//   excel文件表头名
						sheetHeader: ["序号", "姓名", "曾用名", "年龄", "身份证号", "标签", "地址", "性别", "党员", "籍贯", "行业", "身份证地址",
							"小区地址", "工作单位", "工作单位地址", "出生地址", "学历", "婚姻状况", "宗教信仰", "常驻居民"
						],
						//   excel文件列名
						sheetFilter: ["序号", "姓名", "曾用名", "年龄", "身份证号", "标签", "地址", "性别", "党员", "籍贯", "行业", "身份证地址",
							"小区地址", "工作单位", "工作单位地址", "出生地址", "学历", "婚姻状况", "宗教信仰", "常驻居民"
						],
					}, ];
					//   创建ExportJsonExcel实例对象
					let toExcel = new ExportJsonExcel(option);
					//   调用保存方法
					toExcel.saveExcel();
				} else {
					this.$message({
						message: '没有选择导出列',
						type: 'warning'
					});
				}
			}
		}
	}
</script>

<style>
	.exportfull {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 1000;
	}
</style>
