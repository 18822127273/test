export default {
    state: {
        // 存储token
        token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '',
        buildingid:'',
        houseid:''
    },
}
