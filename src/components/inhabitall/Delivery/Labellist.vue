<template>
	<div class="success">
		<h1>标签管理</h1>
		<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
			{{tag}}
		</el-tag>
		<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
			@keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
		</el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleCloses">
			<span>是否确认添加？添加后无法删除</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible=false">取 消</el-button>
				<el-button type="primary" @click="updatalist">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				dynamicTags: ['标签一', '标签二', '标签三'],
				inputVisible: false,
				inputValue: '',
				dialogVisible: false
			};
		},
		methods: {
			handleClose(tag) {
				alert("不可删除")
				// this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				this.dialogVisible = true
				this.inputVisible = false;
			},
			handleCloses(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			updatalist() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
					this.dialogVisible = false
				}
			}


		}
	}
</script>
<style>
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
