/*
*
*    401 授权失败
     200 请求成功
     -1 请求失败
* */
export let dict = {
	requestUrl: 'https://smart-city.yfaj.cn',
	userCenter: '/api/community/auth',
	People: '/api/community/people',
	community: '/api/community/community',
	Building: '/api/community/building',
	Company: '/api/community/company',
	Bigdata: '/api/community/big-data',
	Region: '/api/community/region',
	BigdataInterFace: {
		index: '/index',
		bigdatadetail: '/building-detail'
	},
	RegionInterFace: {
		list: '/list',
		detail: '/detail'
	},
	userCenterInterFace: {
		login: '/login',
		forgetPwd: '/forget-password',
		captcha: '/captcha',
		register: '/register',
		changepassword:'/change-password'
	},
	PeopleInterFace: {
		create: '/create',
		detail: '/detail',
		update: '/update',
		index: '/index',
		housepeople: '/house-people',
		peoplehouse: '/people-house',
		bindpeoplehouse: '/bind-people-house',
		unbindpeoplehouse: '/unbind-people-house',
		bingpeoplerelation: '/bind-people-relation',
		peoplerelationlist: '/people-relation-list',
		unbingpeoplerelation: '/unbind-people-relation'
	},
	communityInterFace: {
		communityupdate: '/update',
		stufflist: '/stuff-list',
		communitydetail: '/detail'
	},
	buildingInterFace: {
		index: '/index',
		create: '/create',
		update: '/update',
		detail: '/detail',
		houseindex: '/house-index',
		housecreate: '/house-create',
		houseupdate: '/house-update',
		housedetail: '/house-detail',
		housebuilding: '/house-building',
		buildingstructure: '/building-structure',
	},
	CompanyInterFace: {
		index: '/index',
		create: '/create',
		update: '/update',
		detail: '/detail',
		delete: '/delete'
	}
}
export let Dict = {
	install: function(Vue) {
		Vue.prototype.$dict = dict
	}
}
