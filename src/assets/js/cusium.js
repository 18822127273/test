// cesium模型摄影代码封装
export function set3Dtitle2(viewer) {
	let translation = Cesium.Cartesian3.fromArray([0, 0, -170])
	let m = Cesium.Matrix4.fromTranslation(translation)
	let palaceTileset = new Cesium.Cesium3DTileset({
		// url: '../static/Data/tileset.json',
		 // url: Cesium.IonResource.fromAssetId(1602458),
		url: 'http://localhost:9003/model/WktjX1Mi/tileset.json',
		modelMatrix: m,
		maximumScreenSpaceError: 64, // 默认16
		maximumMemoryUsage: 512, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
		dynamicScreenSpaceErrorDensity: 1, // 数值加大，能让周边加载变快
	})
	//添加到场景
	viewer.scene.primitives.add(palaceTileset);
	viewer.scene.sun.show = false;
	viewer.scene.skyBox.show = false;
	viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;//最小缩放
	// 去除logo
	viewer.cesiumWidget.creditContainer.style.display = "none";

	//控制模型的位置
	palaceTileset.readyPromise.then(function(palaceTileset) {
		viewer.scene.primitives.add(palaceTileset);
		var heightOffset = 10; //可以改变3Dtiles的高度
		var boundingSphere = palaceTileset.boundingSphere;
		var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
		var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
		var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
		var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
		palaceTileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		viewer.zoomTo(palaceTileset, new Cesium.HeadingPitchRange(0.5, -0.2, palaceTileset.boundingSphere
			.radius *
			1.0));
	});
	//定位到三维模型
	viewer.zoomTo(palaceTileset)
}
//单点值
export function lablelist(viewer, data, a) {
	//添加点位
	// fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
	viewer.entities.add({
		position: Cesium.Cartesian3.fromDegrees(data[a].x, data[a].y, data[
			a].z),
		// 文字
		label: {
			// 文本。支持显式换行符“ \ n”
			text: data[a].Text,
			// 字体样式，以CSS语法指定字体
			font: '14pt Source Han Sans CN',
			// 字体颜色
			fillColor: Cesium.Color.WHITE,
			// 背景颜色
			backgroundColor: Cesium.Color.BLUE,
			// 是否显示背景颜色
			showBackground: true,
			// 字体边框
			outline: true,
			// 字体边框颜色
			outlineColor: Cesium.Color.WHITE,
			// 字体边框尺寸
			outlineWidth: 2,
			// 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
			scale: 1.0,
			// 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
			style: Cesium.LabelStyle.FILL_AND_OUTLINE,
			// 相对于坐标的水平位置
			verticalOrigin: Cesium.VerticalOrigin.CENTER,
			// 相对于坐标的水平位置
			horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
			// 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
			pixelOffset: new Cesium.Cartesian2(10, 0),
			// 显示在距相机的距离处的属性，多少区间内是可以显示的
			distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000),
			// 是否显示
			show: true
		}
	});
}
// 楼栋柱体实体
export function cylinderModel(viewer, building, data) {
	viewer.entities.add({
		id: building[data].id,
		name: '{"cesiumType": "cylinderBuilding"}',
		position: Cesium.Cartesian3.fromDegrees(building[data].x, building[data].y, 10),
		orientation: Cesium.Transforms.headingPitchRollQuaternion(
			new Cesium.Cartesian3.fromDegrees(building[data].x, building[data].y, 10),
			new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(140), Cesium.Math.toRadians(0), Cesium.Math
				.toRadians(0))
		),
		cylinder: {
			length: 50, // 圆柱体高度
			topRadius: 100, // 圆柱体顶部半径
			bottomRadius: 100, // 圆柱体底部半径
			material: Cesium.Color.fromCssColorString('rgba(255,255,255,0.01)'), // 材质
			// material: Cesium.Color.fromCssColorString('rgba(255, 255, 255, 1)'), // 材质
			slices: 100, // 圆柱周围圆圈分段数
			numberOfVerticalLines: 100 // 圆柱垂直线分段数
		}
	}, )

}
