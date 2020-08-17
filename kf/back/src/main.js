// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store/index';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import axios from 'axios';
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';

import './common/stylus/base.styl';
import './common/stylus/resetView.styl';
import './common/stylus/iconfont.styl';
// import 'iview/dist/styles/iview.css';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// require styles 引入样式
Vue.use(VueCookie);
Vue.use(iView);

// 路由判断
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
    // if (VueCookie.get('Authorization')) {
    //     next();
    // } else {
    //     // 如果没有登录，访问非登录页面,则跳转到登录页面
    //     if (!to.path.match('/account/')) {
    //         next({
    //             path: '/account/login'
    //         });
    //     } else {
    //         // 如果没有登录，但访问的是登录页面,直接进入
    //         next();
    //     }
    // }
});

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         let _author = VueCookie.get('Authorization');

//         if (_author) {
//             config.headers.Authorization = `Bearer ${_author}`;
//         }

//         return config;
//     },
//     error => {
//         return Promise.reject(error.response);
//     }
// );

axios.interceptors.response.use(
    response => {
        let _state = parseInt(response.data.state);
        // && _state <= 209
        if (_state == 201 || _state == 207) {
            // 登录失效
            router.replace({
                path: '/account/login'
            });
        }

        return response;
    },
    error => {
        let errMes = '连接服务器失败!';

        if (error && error.response) {
            switch (error.response.status) {
            case 400: errMes = '请求错误(400)'; break;
            case 401: errMes = '未授权，请重新登录(401)'; break;
            case 403: errMes = '拒绝访问(403)'; break;
            case 404: errMes = '请求出错(404)'; break;
            case 408: errMes = '请求超时(408)'; break;
            case 500: errMes = '服务器错误(500)'; break;
            case 501: errMes = '服务未实现(501)'; break;
            case 502: errMes = '网络错误(502)'; break;
            case 503: errMes = '服务不可用(503)'; break;
            case 504: errMes = '网络超时(504)'; break;
            case 505: errMes = 'HTTP版本不受支持(505)'; break;
            default: errMes = `连接出错(${error.response.status})!`;
            }
        }

        console.log(error.response.data);

        iView.Message.error({content: errMes, duration: 3});

        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

router.afterEach(route => {
    iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
