//unnull非空字符判断
export function unnull(items){
	if(items==''){
		return 
	}else{
		return items
	}
}
//身份证号隐藏
export function listres(items) {
  return items.replace(/^(.{3})(?:\w+)(.{4})$/, "\$1**\$2");
}
//根据数据返回性别
export function sexchange(num) {
  if (num == 0) {
    return "女"
  } else {
    return "男"
  }
}
//是否私有
export function isprity(num) {
  if (num == 0) {
    return "否"
  } else {
    return "是"
  }
}
//type判断
export function typechange(num) {
  if (num == 0) {
    return "自建房"
  } else if (num == 1) {
    return "独立楼宇"
  } else if (num == 2) {
    return "小区"
  }
}
//type判断
export function kindchange(num) {
  if (num == 0) {
    return "公寓"
  } else if (num == 1) {
    return "住宅"
  } else if (num == 2) {
    return "商住两用"
  } else if (num == 3) {
    return "商用"
  }
}
//已婚未婚判断
export function marital(num) {
  if (num == 0) {
    return "未婚"
  } else {
    return "已婚"
  }
}
//常住居民判断
export function resident(num) {
  if (num == 0) {
    return "否"
  } else {
    return "是"
  }
}
//政治面貌返回
export function isparty(num) {
  if (num == 0) {
    return "非党员"
  } else {
    return "党员"
  }
}
//常驻剧名返回
export function isresident(num) {
  if (num == 0) {
    return "否"
  } else {
    return "是"
  }
}
//数组去重
export function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

//根据身份证号显示年龄
export function analyzeIDCard(IDCard) {
  var age = 0,
    yearBirth, monthBirth, dayBirth;
  //获取用户身份证号码
  var userCard = IDCard;
  //如果身份证号码为undefind则返回空
  if (!userCard) {
    return age;
  }
  var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; //验证身份证号码的正则
  if (reg.test(userCard)) {
    if (userCard.length == 15) {
      var org_birthday = userCard.substring(6, 12);
      //获取出生年月日
      yearBirth = "19" + org_birthday.substring(0, 2);
      monthBirth = org_birthday.substring(2, 4);
      dayBirth = org_birthday.substring(4, 6);
    } else if (userCard.length == 18) {
      //获取出生年月日
      yearBirth = userCard.substring(6, 10);
      monthBirth = userCard.substring(10, 12);
      dayBirth = userCard.substring(12, 14);
    }
    //获取当前年月日并计算年龄
    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDate();
    var age = myDate.getFullYear() - yearBirth;
    if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
      age--;
    }
    //返回年龄
    return age;
  } else {
    return ''
  }
}
//根据身份证号返性别
export function sexIDCard(IDCard) {
  var userCard = IDCard;
  if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
    return "男";
  } else {
    return "女";
  }
}
//item操作的封装
export function itemall(item) {
  const telall = listres(item.tel)
  const cardNo = listres(item.haoma)
  const result = {
    user: item.user,
    region: item.region,
    tel: telall,
    haoma: cardNo,
    address: item.address
  }
  return result
}
//根据时间戳转化为时间
export function conversionTime(timestamp, format) {
  //timestamp = 时间戳  format = 格式
  let data = timestamp.toString().length < 13 ? new Date(timestamp * 1000) : new Date(timestamp); //判断时间戳是否需要*1000
  let Y = data.getFullYear(); //获取传入时间戳的年
  let M = data.getMonth() + 1; //获取月份
  let D = data.getDate(); //获取当前天
  let H = data.getHours() < 10 ? `0${data.getHours()}` : data.getHours(); //小时>10 时默认在前面加0
  let m = data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes(); //分钟>10时默认在前面加0
  let s = data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds(); //秒>10时默认在前面加0
  format = format || 'Y-M-D H:m:s'; //设定一个默认格式
  format = format.indexOf('Y') > -1 ? format.replace('Y', Y) : format;
  format = format.indexOf('M') > -1 ? format.replace('M', M) : format;
  format = format.indexOf('D') > -1 ? format.replace('D', D) : format;
  format = format.indexOf('H') > -1 ? format.replace('H', H) : format;
  format = format.indexOf('h') > -1 ? format.replace('h', H > 12 ? H - 12 : H) : format; //传H则是24小时制 h则是12小时制
  format = format.indexOf('m') > -1 ? format.replace('m', m) : format;
  format = format.indexOf('s') > -1 ? format.replace('s', s) : format;
  return format
}
