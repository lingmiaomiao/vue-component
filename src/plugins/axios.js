"use strict";

import Vue from 'vue';
import axios from "axios";

import baseUrl from '../setBaseUrl'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.url = '/API/v1'+config.url
    return config;
  },
  function(error) {
    // Do something with request error
    if (error && error.response) {
      switch (error.response.status) {
          case 400:
              error.message = '请求错误'
              break

          case 401:
              error.message = '未授权，请登录'
              break

          case 403:
              error.message = '拒绝访问'
              break

          case 404:
              error.message = `请求地址出错: ${error.response.config.url}`
              break

          case 408:
              error.message = '请求超时'
              break

          case 500:
              error.message = '服务器内部错误';
              break

          case 501:
              error.message = '服务未实现'
              break

          case 502:
              error.message = '网关错误'
              break

          case 503:
              error.message = '服务不可用'
              break

          case 504:
              error.message = '网关超时'
              break

          case 505:
              error.message = 'HTTP版本不受支持'
              break

          default:
      }
  }
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data

    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
