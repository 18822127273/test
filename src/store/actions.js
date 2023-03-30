export default{
    //actions这里提交的是mutation
    getLoginInInfo({commit},token){
        commit('LOGIN_IN',token)
    },
    getLoginOutInfo({commit},token){
        commit('LOGIN_OUT',token)
    },
    buildingid({commit},buildingid){
        commit('buildingid',buildingid)
    },
    houseid({commit},houseid){
        commit('houseid',houseid)
    },
}
