import {post} from './request'
import {dict} from "./dict";
//员工登录
export function login(data = {}) {
    return post(dict.userCenter+dict.userCenterInterFace.login, data);
}
//忘记密码
export function forgetPwd(data = {}) {
    return post(dict.userCenter+dict.userCenterInterFace.forgetPwd	, data);
}
//密码修改
export function changepassword(data = {}) {
    return post(dict.userCenter+dict.userCenterInterFace.changepassword	, data);
}
//验证码
export function captcha(data = {}) {
    return post(dict.userCenter+dict.userCenterInterFace.captcha, data);
}
//注册
export function register(data = {}) {
    return post(dict.userCenter+dict.userCenterInterFace.register, data);
}
//居民新增
export function create(data={}){
   return post(dict.People+dict.PeopleInterFace.create,data);
}
//居民列表
export function index(data={}){
   return post(dict.People+dict.PeopleInterFace.index,data);
}
//居民查看
export function detail(data={}){
   return post(dict.People+dict.PeopleInterFace.detail,data);
}
//居民修改
export function  update(data={}){
   return post(dict.People+dict.PeopleInterFace.update,data);
}
//社区咧表
export function  stufflist(data={}){
   return post(dict.community+dict.communityInterFace.stufflist,data);
}
//社区修改
export function  communityupdate(data={}){
   return post(dict.community+dict.communityInterFace.communityupdate,data);
}
//社区详情
export function  communitydetail(data={}){
   return post(dict.community+dict.communityInterFace.communitydetail,data);
}
//建筑列表
export function buildingindex(data={}){
   return post(dict.Building+dict.buildingInterFace.index,data);
}
//建筑新建
export function buildingcreate(data={}){
   return post(dict.Building+dict.buildingInterFace.create,data);
}
//建筑详情
export function buildingdetail(data={}){
   return post(dict.Building+dict.buildingInterFace.detail,data);
}
//建筑修改
export function buildingupdate(data={}){
   return post(dict.Building+dict.buildingInterFace.update,data);
}

//房屋列表
export function houseindex(data={}){
   return post(dict.Building+dict.buildingInterFace.houseindex,data);
}
//新建房屋
export function housecreate(data={}){
   return post(dict.Building+dict.buildingInterFace.housecreate,data);
}
//房屋详情
export function housedetail(data={}){
   return post(dict.Building+dict.buildingInterFace.housedetail,data);
}
//房屋修改
export function houseupdate(data={}){
   return post(dict.Building+dict.buildingInterFace.houseupdate,data);
}
//房找房
export function housebuilding(data={}){
   return post(dict.Building+dict.buildingInterFace.housebuilding,data);
}
//房找人housepeople
export function housepeople(data={}){
   return post(dict.People+dict.PeopleInterFace.housepeople,data);
}
//人找房
export function peoplehouse(data={}){
   return post(dict.People+dict.PeopleInterFace.peoplehouse,data);
}
//居民房屋关联
export function bindpeoplehouse(data={}){
   return post(dict.People+dict.PeopleInterFace.bindpeoplehouse,data);
}
//居民房屋取关
export function unbindpeoplehouse(data={}){
   return post(dict.People+dict.PeopleInterFace.unbindpeoplehouse,data);
}
//企业列表
export function companyindex(data={}){
   return post(dict.Company+dict.CompanyInterFace.index,data);
}
//企业新增
export function companycreate(data={}){
   return post(dict.Company+dict.CompanyInterFace.create,data);
}
//企业更新
export function companyupdate(data={}){
   return post(dict.Company+dict.CompanyInterFace.update,data);
}
//企业详情
export function companydetail(data={}){
   return post(dict.Company+dict.CompanyInterFace.detail,data);
}
///企业删除
export function companydelete(data={}){
   return post(dict.Company+dict.CompanyInterFace.delete,data);
}

//房屋建筑关联
export function buildingstructure(data={}){
   return post(dict.Building+dict.buildingInterFace.buildingstructure,data);
}
//人员绑定
export function bingpeoplerelation(data={}){
   return post(dict.People+dict.PeopleInterFace.bingpeoplerelation,data);
}
//查看人员关系
export function peoplerelationlist(data={}){
   return post(dict.People+dict.PeopleInterFace.peoplerelationlist,data);
}
//解绑人员绑定
export function unbingpeoplerelation(data={}){
   return post(dict.People+dict.PeopleInterFace.unbingpeoplerelation,data);
}
//大屏看板
export function bigdataindex(data={}){
   return post(dict.Bigdata+dict.BigdataInterFace.index,data);
}
//大屏看板
export function bigdatadetail(data={}){
   return post(dict.Bigdata+dict.BigdataInterFace.bigdatadetail,data);
}
//地区列表
export function region(data={}){
   return post(dict.Region+dict.RegionInterFace.list,data);
}
//地区详情
export function regiondetail(data={}){
   return post(dict.Region+dict.RegionInterFace.detail,data);
}
