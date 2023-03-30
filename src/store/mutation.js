import * as type from './mutation-types'
export default {
    //登入
    [type.LOGIN_IN](state, token) {
        state.token = token;
        localStorage.setItem('userToken', token);
    },
    //登出 or 退出登入
    [type.LOGIN_OUT](state, token) {
        localStorage.removeItem("userToken", token);
        state.token = token;
    },
    //建筑id
    [type.buildingid](state, buildingid) {
        state.buildingid = buildingid;
    },
    //房屋id
    [type.houseid](state, houseid) {
        state.houseid = houseid;
    },

}
