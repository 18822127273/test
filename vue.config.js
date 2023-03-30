const {
	defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	runtimeCompiler: true,
	publicPath:'./',
	lintOnSave: false, //关闭语法检查,
})
