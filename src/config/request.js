import axios from "axios";
import store from '../store/store.js'; // 引入vuex-store
import {dict} from "./dict";
import router from '../router/index.js'
import Vue from 'vue'
// import {Loading} from 'element-ui'
// 创建axios实例
/*状态码
     401 授权失败
     200 请求成功
     -1 请求失败*/
let vue = new Vue();

axios.defaults.withCredentials = true;
const httpService = axios.create({
  baseURL: dict.requestUrl,
  timeout: 300000, // 需自定义 请求超时时间   5分钟
  withCredentials: false, // `withCredentials` 表示跨域请求时是否需要使用凭证
});

// request拦截器
httpService.interceptors.request.use(
  config => {
    if (store.state.token) {
      startLoading()
    }
    return config;
  },
  error => {
    // 请求错误处理
    endLoading()
    return Promise.reject(error);
  }
)

export function startLoading() {
  // Loading.service({
  //   lock: true,
  //   body: false
  //   // target:document.querySelector('#body')
  // })
}
export function endLoading() {
  // Loading.service({
  //   text: "数据加载完毕....",
  // }).close()
}

// response拦截器
httpService.interceptors.response.use(
  response => {
    endLoading()
    if (response.status == 200) {
      if (response.data.error == 0) {
        return Promise.resolve(response.data.data)
      } else if (response.data.error == 401) {
        store.commit('LOGIN_OUT', null);
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      } else {
        vue.$message.error(response.data.message);
        return Promise.reject(response)
      }
      // 统一处理状态

    } else {
      return Promise.reject(response)
    }
  },
  // 处理处理
  error => {
    endLoading()
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
      vue.$message.error(error.message)
    } else {
      error.message = "连接到服务器失败";
      vue.$message.error(error.message)
    }
    return Promise.reject(error);
  }
)

/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     httpService({
//       url: url,
//       method: 'get',
//       params: params
//     }).then(response => {
//       resolve(response);
//     }).catch(error => {
//       reject(error);
//     });
//   });
// }


/*
 *  delete请求
 *  url:请求地址
 *  params:参数
 * */
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService.delete(url, {
      params: params
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/*
 *  delete请求体
 *  url:请求地址
 *  params:参数
 * */
export function delc(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService.delete(url, {
      data: params
    }).then(response => {
      resolve(response);
    }).catch(error => {

      reject(error);
    });
  });
}
/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
        url: url,
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        resolve(response);
    })
      .catch(error => {
        reject(error);
      })
  });
}

/*
 *  put请求
 *  url:请求地址
 *  params:参数
 * */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService.put(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      })
  });
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
// export function upload(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     let config = {
//       headers: {
//         "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
//       }
//     };
//     httpService.post(url, params, config).then(response => {
//       resolve(response)
//     }).catch(error => {
//       reject(error)
//     })
//     // httpService({
//     //     url: url,
//     //     method: 'post',
//     //     data: params,
//     //     headers:{'Content-Type':'multipart/form-data'}
//     // }).then(response => {
//     //     resolve(response);
//     // }).catch(error => {
//     //     reject(error);
//     // });
//   });
// }



export default {
  install: function(Vue) {
    Vue.prototype.$rq = httpService
  },
  // get,
  del,
  delc,
  post,
  put,
  // upload

}
