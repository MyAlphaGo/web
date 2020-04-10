import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

axios.defaults.baseURL = "http://127.0.0.1:7001/"
axios.default.timeOut = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//允许axio请求携带cookies
axios.defaults.withCredentials = true;

//请求拦截器
axios.interceptors.request.use(
	(config) => {
		if (config.method === 'post') {
			config.data = qs.stringify(config.data);
		}
		console.log("打印请求日志" + config.url)
		if (localStorage.token) {
			config.headers.Authorization = localStorage.token || localStorage.admin;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			if (response.data.success === 1) {
				console.log("打印响应日志" + response.config.url)
				return Promise.resolve(response.data);
			} else {
				console.log(response)
				message.error(response.data.message);
			}
		} else {
			return Promise.reject(response);
		}
	},
	(error) => {
		if (error.response.status) {
			switch (error.response.status) {
				case 401:
					message.error('登录过期，请重新登录');
					localStorage.removeItem('token');
					hashHistory.push('/login')
					break;
				case 404:
					message.error("资源不存在");
					break;
				default:
					message.error('请求有误');
			}
		}
	}
);
export default axios;