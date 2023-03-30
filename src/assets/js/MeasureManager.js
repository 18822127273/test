/* cesium空间两点距离计算函数 */
 export function getLength(start, end) {
   // 将起点与终点位置信息从笛卡尔坐标形式转换为Cartographic形式
   let startCartographic = Cesium.Cartographic.fromCartesian(start)
   let endCartographic = Cesium.Cartographic.fromCartesian(end)
   // 初始化测地线
   let geodesic = new Cesium.EllipsoidGeodesic()
   // 设置测地线起点和终点，EllipsoidGeodesic中setEndPoints常与surfaceDistance搭配使用
   geodesic.setEndPoints(startCartographic, endCartographic)
   // 获取起点和终点之间的表面距离，单位为km，规定四舍五入保留两位小数
   // surfaceDistance返回number 单位为m，带小数
   // console.log((geodesic.surfaceDistance / 1000).toFixed(2))
   return (geodesic.surfaceDistance / 1000).toFixed(2)
 }
 /* 空间两点计算中点函数 */
 export function getMidpoint(start, end) {
   let startPoint = Cesium.Cartographic.fromCartesian(start)
   let endPoint = Cesium.Cartographic.fromCartesian(end)
   let geodesic = new Cesium.EllipsoidGeodesic()
   geodesic.setEndPoints(startPoint, endPoint)
   let geoPoint = geodesic.interpolateUsingFraction(0.5)
   // console.log(Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint))
   return Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint)
 }
 export function addLabel(viewer,midPoint, labelLength) {
   // let viewer = this.viewer

   let box= viewer.entities.add({
     name: '中点',
     position: midPoint,
     label: {
       text: labelLength + 'km',
       font: '20px sans-serif',
       fillColor: Cesium.Color.WHITE,
       outlineWidth: 2,
       backgroundColor: Cesium.Color.BLACK,
       showBackground: true,
       style: Cesium.LabelStyle.FILL,
       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
       disableDepthTestDistance: Number.POSITIVE_INFINITY
     }
   })
   return box
 }
 export function Bearing(from, to) {
   let fromCartographic = Cesium.Cartographic.fromCartesian(from)
   let toCartographic = Cesium.Cartographic.fromCartesian(to)
   let lat1 = fromCartographic.latitude
   let lon1 = fromCartographic.longitude
   let lat2 = toCartographic.latitude
   let lon2 = toCartographic.longitude
   let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) *
     Math.cos(lat2) * Math.cos(lon1 - lon2))
   if (angle < 0) {
     angle += Math.PI * 2.0
   }
   return angle
 }
 export function addArea(viewer,area, positions) {
   // let viewer = this.viewer
   let box = viewer.entities.add({
     name: '多边形面积',
     position: positions[positions.length - 1],
     label: {
       text: area + '平方公里',
       font: '20px sans-serif',
       fillColor: Cesium.Color.WHITE,
       outlineWidth: 2,
       backgroundColor: Cesium.Color.BLACK,
       showBackground: true,
       style: Cesium.LabelStyle.FILL,
       pixelOffset: new Cesium.Cartesian2(60, -60),
       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
       disableDepthTestDistance: Number.POSITIVE_INFINITY
     }
   })
   return box
 }
 /* 绘制函数 */
 export function drawPointLabel(viewer,position, pointNum) {
   // let viewer = this.viewer
   // 本质上就是添加一个点的实体
   let box= viewer.entities.add({
     name: '点几何对象',
     position: position,
     point: {
       color: Cesium.Color.WHEAT,
       pixelSize: 5,
       outlineWidth: 3,
       disableDepthTestDistance: Number.POSITIVE_INFINITY, //
       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
     },
     label: {
       text: pointNum,
       font: '30px sans-serif',
       fillColor: Cesium.Color.WHITE,
       outlineWidth: 2,
       backgroundColor: Cesium.Color.BLACK,
       showBackground: true,
       style: Cesium.LabelStyle.FILL,
       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
       horizontalOrigin: Cesium.HorizontalOrigin.CENTER
     }
   })
   return box
 }
 export function drawPoint(viewer,position) {
   // let viewer = this.viewer
   // 本质上就是添加一个点的实体
   let box= viewer.entities.add({
     position: position,
     point: {
       color: Cesium.Color.WHEAT,
       pixelSize: 5,
       outlineWidth: 3,
       disableDepthTestDistance: Number.POSITIVE_INFINITY,
       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 规定贴地
     }
   })
   return box
 }
 export function drawPolyline(viewer,positions) {
   // let viewer = this.viewer
   if (positions.length < 1) return
   let box= viewer.entities.add({
     name: '线几何对象',
     polyline: {
       positions: positions,
       width: 5.0,
       material: new Cesium.PolylineGlowMaterialProperty({
         // eslint-disable-next-line new-cap
         color: Cesium.Color.WHEAT
       }),
       depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
         // eslint-disable-next-line new-cap
         color: Cesium.Color.WHEAT
       }),
       clampToGround: true
     }
   })
   return box
 }
 export function drawPolygon(viewer,positions) {
   // let viewer = this.viewer
   if (positions.length < 2) return
   let box= viewer.entities.add({
     name: '面几何对象',
     polygon: {
       hierarchy: positions,
       // eslint-disable-next-line new-cap
       material: new Cesium.ColorMaterialProperty(
         Cesium.Color.WHEAT.withAlpha(0.4)
       )
     }
   })
   return box
 }
