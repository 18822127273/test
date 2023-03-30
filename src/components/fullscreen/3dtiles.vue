<template>
	<div class="full">
		<dv-border-box-13>
			<div class="amap-wrapper">
				<div id="cesiumDemo"></div>
				<transition name="el-fade-in-linear">
					<div class="buildMessageBox messageBox" v-show="buildMessageBoxShow">
						<div class="topLine"></div>
						<div class="slantLine"></div>
						<div class="title">
							<span class="messageBoxTit">{{name}}</span>
						</div>
						<div class="contList">
							<span class="messageBoxTit">楼栋数：</span><span class="messageVal">80</span>
						</div>
						<div class="contList">
							<span class="messageBoxTit">户数：</span><span class="messageVal">314</span>
						</div>
						<div class="contList">
							<span class="messageBoxTit">人数：</span><span class="messageVal">1149</span>
						</div>
						<div class="contList">
							<span class="messageBoxTit">党员数：</span><span class="messageVal">124人</span>
						</div>
					</div>
				</transition>
			</div>
			<div style="position: absolute;left: 10px ;">
				<back-button></back-button>
			</div>
			<div class="btnContainer">
				<button @click="draw('Polyline')">标点测距</button>
				<button @click="draw('Polygon')">标点测面</button>
				<button @click="clearAllDrawn()">清空数据</button>
				<div class="tip">
					<p>点击按钮后，在场景内单击左键标点，单击右键结束测量。</p>
					<p>点击“标点测距”按钮后在场景内单击鼠标左键加点，在两点间显示距离，单击右键结束测量。</p>
					<p>点击“标点测面”按钮后在场景内单击鼠标左键加点，单击右键在勾出的范围中显示面积。</p>
					<p>点击“清空数据”按钮删除所有数据。</p>
				</div>
			</div>
		</dv-border-box-13>

	</div>
</template>

<script>
	import {
		Loading
	} from 'element-ui';
	let options
	import {
		set3Dtitle2,
		lablelist,
		cylinderModel
	} from '../../assets/js/cusium.js'
	import {
		getLength,
		getMidpoint,
		addLabel,
		Bearing,
		drawPolyline,
		drawPolygon,
		drawPoint,
		addArea,
		drawPointLabel
	} from '../../assets/js/MeasureManager.js'
	let viewer
	let tilesFloodTest
	export default {
		data() {
			return {
				viewer: undefined,
				tempEntities: [],
				pointNum: 0,
				floatingPoint: undefined,
				activeShape: undefined,
				name: "",
				config: {
					num: 100,
					content: '{nt}'
				},
				buildMessageBoxShow: false,
				mapMouseDown: false,
				// // 分层单体化反选数据
				layered: {
					first: {
						// x: -2716017.9098884147
						// y: 4733221.085409288
						// z: 3290520.383644969

						center: {
							x: -2716017.9098884147,
							y: 4733221.085409288,
							z: 3290520.383644969,

						},
						priipt1: 0,
						priipt2: 0,
						priipt3: 0,
						priipt4: 0,
						priipt5: 0,
						priipt6: 48,
						priipt7: 240,
						priipt8: 240,
						priipt9: 60,
					},
					second: {
						// x: -2715916.7808021326
						// y: 4733118.934902318
						// z: 3290749.2402792173
						center: {
							x: -2715916.7808021326,
							y: 4733118.934902318,
							z: 3290749.2402792173,
						},
						priipt1: 0,
						priipt2: 0,
						priipt3: 0,
						priipt4: -25,
						priipt5: -8,
						priipt6: 42,
						priipt7: 200,
						priipt8: 200,
						priipt9: 50,
					}
				},
				lablelists: [{
						x: "120.80302807741732",
						y: '31.30709242677048',
						z: 40,
						Text: '1'
					},
					{
						x: '120.80408198509431',
						y: '31.30709242677048',
						Text: '2',
						z: 40
					},
				],
				building: {
					first: {
						cylinder1: 100,
						id: 'first',
						x: "119.8480302488737",
						y: '31.259695847684014'
					},
					second: {
						cylinder1: 100,
						id: 'second',
						x: '119.84770232077288',
						y: '31.26175225162898'
					},
				},
				enitylist: []
			}
		},
		mounted() {
			this.getCesiumDem()
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			setTimeout(() => {
				loading.close();
			}, 2000);
		},
		methods: {
			// 角度
			pointAngle(point1, point2, point3) {
				let bearing21 = Bearing(point2, point1)
				let bearing23 = Bearing(point2, point3)
				let angle = bearing21 - bearing23
				if (angle < 0) {
					angle += Math.PI * 2.0
				}
				return angle
			},
			getArea(positions) {
				let res = 0
				for (let i = 0; i < positions.length - 2; i++) {
					let j = (i + 1) % positions.length
					let k = (i + 2) % positions.length
					let totalAngle = this.pointAngle(positions[i], positions[j], positions[k])
					let tempLength1 = getLength(positions[j], positions[0])
					let tempLength2 = getLength(positions[k], positions[0])
					res += tempLength1 * tempLength2 * Math.sin(totalAngle) / 2
				}
				res = res.toFixed(2)
				// console.log(res)
				res = parseFloat(res)
				// console.log(Math.abs(res))
				return Math.abs(res)
			},
			/* 清除实体 */
			clearAllDrawn() {
				this.tempEntities = []
				this.pointNum = 0
				viewer.entities.removeAll()
				set3Dtitle2(viewer)
				for (var i = 0; i < this.lablelists.length; i++) {
					let a = i;
					let data = this.lablelists
					lablelist(viewer, data, a)
				}
				let building = this.building
				cylinderModel(viewer, building, 'first')
				cylinderModel(viewer, building, 'second')
			},
			/* 根据类型绘制对象
			 * @param type point polyline polygon */
			draw(type) {
				let that = this
				let tempEntities = this.tempEntities
				let floatingPoint = this.floatingPoint
				let activeShape = this.activeShape
				let position = []
				let tempPoints = []
				let activeShapePoints = []
				// 开启深度检测
				// viewer.scene.globe.depthTestAgainstTerrain = true
				// 创建场景的HTML canvas元素
				let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
				switch (type) {
					// 绘制线
					case 'Polyline':
						// 取消鼠标双击事件
						viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType
							.LEFT_DOUBLE_CLICK)
						// 监听鼠标移动
						handler.setInputAction(function(movement) {
							if (Cesium.defined(floatingPoint)) {
								let newPosition = viewer.scene.pickPosition(movement.endPosition)
								if (Cesium.defined(newPosition)) {
									floatingPoint.position.setValue(newPosition)
									activeShapePoints.pop()
									activeShapePoints.push(newPosition)
								}
							}
						}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
						// 左键单击开始画线
						handler.setInputAction(function(click) {
							let earthPosition = viewer.scene.pickPosition(click.position)
							if (Cesium.defined(earthPosition)) {
								floatingPoint = drawPoint(viewer, earthPosition)
							}
							// 获取位置信息
							// 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标,返回Cartesian3坐标
							let ray = viewer.camera.getPickRay(click.position)
							// 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3坐标
							position = viewer.scene.globe.pick(ray, viewer.scene)
							tempPoints.push(position) // 记录点位
							that.pointNum += 1
							let tempLength = tempPoints.length // 记录点数
							// 调用绘制点的接口
							let point = drawPointLabel(viewer, tempPoints[tempPoints.length - 1], JSON.stringify(
								that.pointNum))
							tempEntities.push(point)
							// 存在超过一个点时
							if (tempLength > 1) {
								// 绘制线
								let pointLength = getLength(tempPoints[tempPoints.length - 2], tempPoints[
									tempPoints.length - 1])
								let midPosition = getMidpoint(tempPoints[tempPoints.length - 2], tempPoints[
									tempPoints.length - 1])
								let pointline = drawPolyline(viewer, [tempPoints[tempPoints.length - 2],
									tempPoints[tempPoints.length - 1]
								])
								let pointLabel = addLabel(viewer, midPosition, pointLength)
								tempEntities.push(pointline) // 保存记录
								tempEntities.push(pointLabel)
							}
						}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
						// 右键单击结束画线
						handler.setInputAction(function(click) {
							// console.log(that.pointNum)
							activeShapePoints.pop()
							viewer.entities.remove(activeShapePoints)
							viewer.entities.remove(floatingPoint)
							tempPoints = [] // 清空点位记录
							handler.destroy()
							handler = null
							floatingPoint = undefined
							activeShape = undefined
							activeShapePoints = []
							// console.log(that.pointNum)
						}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
						break
						// 绘制面
					case 'Polygon':
						// 取消鼠标双击事件
						viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType
							.LEFT_DOUBLE_CLICK)
						// 监听鼠标移动
						handler.setInputAction(function(movement) {
							if (Cesium.defined(floatingPoint)) {
								let newPosition = viewer.scene.pickPosition(movement.endPosition)
								if (Cesium.defined(newPosition)) {
									floatingPoint.position.setValue(newPosition)
									activeShapePoints.pop()
									activeShapePoints.push(newPosition)
								}
							}
						}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
						// 左键单击开始画线
						handler.setInputAction(function(click) {
							let earthPosition = viewer.scene.pickPosition(click.position)
							if (Cesium.defined(earthPosition)) {
								if (activeShapePoints.length === 0) {
									floatingPoint = drawPoint(viewer, earthPosition)
									activeShapePoints.push(earthPosition)
									const dynamicPositions = new Cesium.CallbackProperty(function() {
										return new Cesium.PolygonHierarchy(activeShapePoints)
									}, false)
									activeShape = drawPolygon(viewer, dynamicPositions)
								}
								activeShapePoints.push(earthPosition)
							}
							// 获取位置信息
							let ray = viewer.camera.getPickRay(click.position)
							position = viewer.scene.globe.pick(ray, viewer.scene)
							tempPoints.push(position) // 记录点位
							let tempLength = tempPoints.length // 记录点数
							that.pointNum += 1
							// 调用绘制点的接口
							let point = drawPointLabel(viewer, tempPoints[tempPoints.length - 1], JSON.stringify(
								that.pointNum))
							tempEntities.push(point)
							// 存在超过一个点时
							if (tempLength > 1) {
								// 绘制线
								let pointline = drawPolyline(viewer, [tempPoints[tempPoints.length - 2],
									tempPoints[tempPoints.length - 1]
								])
								tempEntities.push(pointline) // 保存记录
							}
						}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
						// 右键单击结束画面
						handler.setInputAction(function(click) {
							// 选择一个椭球或地图
							let cartesian = viewer.camera.pickEllipsoid(click.position, viewer.scene.globe
								.ellipsoid)
							if (cartesian) {
								let tempLength = tempPoints.length
								if (tempLength < 3) {
									alert('闭合操作需要至少3个点嗷')
								} else {
									// 闭合最后一条线
									let pointline = drawPolyline(viewer, [tempPoints[0], tempPoints[tempPoints
										.length - 1]])
									tempEntities.push(pointline)
									drawPolygon(viewer, tempPoints)
									let pointArea = that.getArea(tempPoints)
									addArea(viewer, JSON.stringify(pointArea), tempPoints)
									tempEntities.push(tempPoints)
									handler.destroy()
									handler = null
								}
							}
							activeShapePoints.pop()
							viewer.entities.remove(activeShapePoints)
							viewer.entities.remove(floatingPoint)
							floatingPoint = undefined
							activeShapePoints = []
						}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
						break
				}
			},
			// 分层单体化
			layeredTilesModel(data) {
				let scene = viewer.scene
				if (tilesFloodTest) {
					tilesFloodTest.destroy()
				}
				var center = new Cesium.Cartesian3(
					this.layered[data].center.x, this.layered[data].center.y, this.layered[data].center.z,
				)
				var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center)
				var hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(
					// 第一个参数是y轴偏移角度，第二个参数是x轴偏移角度，第三个参数是z轴偏移角度
					new Cesium.HeadingPitchRoll(Number(this.layered[data].priipt1), Number(this.layered[data].priipt2),
						Number(
							this.layered[data].priipt3))
				)
				var hpr = Cesium.Matrix4.fromRotationTranslation(
					hprRotation,
					// 第一个参数是遮罩整体的横向定位，第二个参数是竖向定位，第三个参数是高度定位
					new Cesium.Cartesian3(Number(this.layered[data].priipt4), Number(this.layered[data].priipt5),
						Number(this
							.layered[data].priipt6))
				)
				Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix)
				tilesFloodTest = scene.primitives.add(
					new Cesium.ClassificationPrimitive({
						geometryInstances: new Cesium.GeometryInstance({
							geometry: Cesium.BoxGeometry.fromDimensions({
								vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
								// 第一个参数是遮罩的整体横向长度，第二个参数是竖向长度，第三个参数是整体高度
								dimensions: new Cesium.Cartesian3(Number(this.layered[data]
									.priipt7), Number(this.layered[
									data].priipt8), Number(this.layered[data].priipt9))
							}),
							modelMatrix: modelMatrix,
							attributes: {
								color: Cesium.ColorGeometryInstanceAttribute.fromColor(
									Cesium.Color.fromCssColorString('#D22809').withAlpha(0.5)
								),
								show: new Cesium.ShowGeometryInstanceAttribute(true)
							},
							// id: 'volume 1'
						}),
						classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
					})
				)
			},
			// 实例cesium
			getCesiumDem() {
				let self = this
				Cesium.Ion.defaultAccessToken =
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjgwMDgwNS1mMzFmLTQ3ODItYmRhOS1hYjNhMTFkM2I0N2YiLCJpZCI6MTMxMDkwLCJpYXQiOjE2ODAwNjU0MTZ9.nvutxZY3TNl8df3PURG96km6EFH85SmlzWCW-75QHuE'
				viewer = new Cesium.Viewer('cesiumDemo', {
					animation: false, // 是否显示动画控件
					baseLayerPicker: false, // 是否显示图层选择控件
					geocoder: false, // 是否显示地名查找控件
					timeline: false, // 是否显示时间线控件
					sceneModePicker: true, // 是否显示投影方式控件
					navigationHelpButton: false, // 是否显示帮助信息控件
					infoBox: true, // 是否显示点击要素之后显示的信息
					fullscreenButton: false, // 是否显示全屏按钮
					selectionIndicator: false, // 是否显示选中指示框
					scene3DOnly: true,
					homeButton: false,
					terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
					// imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
					// 	url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
					// 	//url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
					// }),
				})
				viewer.terrainProvider = Cesium.createWorldTerrain({
					requestWaterMask: true,
					requestVertexNormals: true
				});

				// const measureManager = new MeasureManager(viewer)
				// measureManager.measurePolygon()
				set3Dtitle2(viewer)
				// self.cylinderModel()
				for (var i = 0; i < self.lablelists.length; i++) {
					let a = i
					let data = self.lablelists
					lablelist(viewer, data, a)
				}
				let building = self.building
				cylinderModel(viewer, building, 'first')
				cylinderModel(viewer, building, 'second')
				// 地图事件开始
				// 得到当前三维场景
				let scene = viewer.scene
				var terrainProvider = Cesium.createWorldTerrain({
					requestVertexNormals: true
				});
				viewer.terrainProvider = terrainProvider;
				viewer.scene.globe.enableLighting = true;
				// 得到当前三维场景的椭球体
				let ellipsoid = scene.globe.ellipsoid
				let entity = viewer.entities.add({
					label: {
						show: false
					}
				})
				let longitudeString = null
				let latitudeString = null
				let height = null
				// 定义当前场景的画布元素的事件处理
				let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
				// 设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
				handler.setInputAction(function(event) {
					if (self.mapMouseDown === true) {
						self.buildMessageBoxShow = false
						if (tilesFloodTest) {
							tilesFloodTest.destroy()
						}
					}
				}, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
				// 鼠标按下
				handler.setInputAction(function(movement) {
					self.mapMouseDown = true
				}, Cesium.ScreenSpaceEventType.LEFT_DOWN)
				// 鼠标弹起
				handler.setInputAction(function(movement) {
					self.mapMouseDown = false
				}, Cesium.ScreenSpaceEventType.LEFT_UP)
				//  设置鼠标点击事件
				handler.setInputAction(function(event) {
					let cartesian = viewer.camera.pickEllipsoid(event.position, ellipsoid)
					if (cartesian) {
						// console.log(cartesian, 111)
						// 将笛卡尔坐标转换为地理坐标
						let cartographic = ellipsoid.cartesianToCartographic(cartesian)
						// 将弧度转为度的十进制度表示
						longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
						latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
						// 获取相机高度
						height = Math.ceil(viewer.camera.positionCartographic.height)
						entity.position = cartesian
						// console.log(longitudeString)
						// console.log(latitudeString)
						let pick = viewer.scene.pick(event.position)
						if (Cesium.defined(pick) && pick) {
							if (pick.id && pick.id.name) {
								let modelDataObj = JSON.parse(pick.id.name)
								// 检测点击楼栋实体
								if (modelDataObj.cesiumType === 'cylinderBuilding') {
									self.buildMessageBoxShow = true
									let winpos = viewer.scene.cartesianToCanvasCoordinates(
										pick.id.position._value
									)
									let name = pick.id.id
									self.name = name
									// 计算弹框的位置
									self.layeredTilesModel(pick.id.id)
									setTimeout(() => {
										let mainMessageBoxDom = document.querySelector('.buildMessageBox')
										let winposWihth = mainMessageBoxDom.offsetWidth
										let winposHeight = mainMessageBoxDom.offsetHeight
										mainMessageBoxDom.style.left = (Math.floor(winpos.x) - (
											winposWihth / 2) + 230) + 'px'
										mainMessageBoxDom.style.top = (Math.floor(winpos.y) -
											winposHeight - 70) + 'px'
									}, 10)
									// 检测点击到分层实体
								}
							} else {
								self.buildMessageBoxShow = false
								if (tilesFloodTest) {
									tilesFloodTest.destroy()
								}
							}
						} else {
							self.buildMessageBoxShow = false
							if (tilesFloodTest) {
								tilesFloodTest.destroy()
							}
						}
					} else {
						entity.label.show = false
					}
				}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
				// 地图事件结束
			}
		}
	}
</script>
<style>
	.btnContainer {
		position: absolute;
		left: 15px;
		top: 80px;
		padding: 10px 15px;
		/*添加圆角边框*/
		border-radius: 5px;
		border: 1px solid rgba(128, 128, 128, 0.5);
		color: #ffffff;
		background: rgba(0, 0, 0, 0.4);
		box-shadow: 0 4px 8px rgb(128 128 128 / 50%);
		max-width: 300px;
	}

	button {
		background: transparent;
		border: 1px solid #00d0ffb8;
		color: white;
		padding: 7px 9px;
		border-radius: 3px;
		cursor: pointer;
	}

	.tip p {
		margin: 2px 0px;
		padding: 5px 1px;
	}
</style>
