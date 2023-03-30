<template>
  <!-- 上传模块 -->
	<div>
		<el-upload class="upload-demo" ref="upload" action="" :auto-upload="false" :file-list="fileList"
			accept=".xls,.xlsx" :on-change="handleChange" multiple :show-file-list="true">
			<el-button type="text">点击上传</el-button>
		</el-upload>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				fileList: [],
				file: ""
			}
		},
		methods: {
			submit_from(data) {
			
			},
			handleChange(file, fileList) {
				this.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的        
				this.file = file.raw;
				let reader = new FileReader()			
				let that = this
				//如果想让xlsx帮我们解析时，就完成解析时间格式，只需要加上如下配置即可
				reader.readAsArrayBuffer(this.file)
				reader.onload = function() {
					try {
						let buffer = reader.result
						let bytes = new Uint8Array(buffer)
						let length = bytes.byteLength
						let binary = ''
						for (let i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i])
						}
						let XLSX = require('xlsx')
						let wb = XLSX.read(binary, {
							type: 'binary'
						})
						let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
						// 定义一个新数组，存放处理后的表格数据
						let lists = []
						outdata.forEach(item => {
							// let result=JSON.stringify(item);
							lists.push(JSON.stringify(item))
						})
						let list=lists
						console.log(list,222)
						// 调用方法将lists数组发送给后端
						this.submit_form(that.lists)
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						
					} catch (e) {
						return false
					}					
				}
			}
		}
	}
</script>

<style>
</style>
