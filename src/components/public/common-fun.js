import Router from "../../router/index";
// import html2canvas from "html2canvas";
export function backPop() {
    Router.go(-1)
}
// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0, img.width, img.height);
//     var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
//     var dataURL = canvas.toDataURL("image/" + ext);
//     console.log(dataURL)
//     return dataURL;
// }
// export const test11=(img)=>{
//    var img = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=508387608,2848974022&fm=26&gp=0.jpg"; //imgurl 就是你的图片路径
//    //  var img = 'https://harbor-test-api.yfaj.cn/uploads/photos/32991081cc998d15b51934b6900e3611.png'
//
//
//     var image = new Image();
//     image.src = img;
//     image.setAttribute("crossOrigin", "Anonymous");
//     var base64 = getBase64Image(image);//转换base64到file
//       return  btof(base64, new Date().getTime());
// }
// function btof(data, fileName) {
//     const dataArr = data.split(",");
//     const byteString = atob(dataArr[1]);
//
//     const options = {
//         type: "image/jpeg",
//         endings: "native"
//     };
//     const u8Arr = new Uint8Array(byteString.length);
//     for (let i = 0; i < byteString.length; i++) {
//         u8Arr[i] = byteString.charCodeAt(i);
//     }
//     return new File([u8Arr], fileName + ".jpg", options);
// }
export const imageToBase64 = (img) => {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
};
export const base64ToFile = (urlData, fileName) => {
    let lastPath = ''
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]); // 解码base64
    let n = bytes.length
    let ia = new Uint8Array(n);
    if (mime){
        lastPath = mime.split('/')[1]
    }

    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName+lastPath, { type: mime });
}
