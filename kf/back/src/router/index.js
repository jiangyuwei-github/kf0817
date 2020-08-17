import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

/**
 * 重写路由的push方法
 */
// const routerPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error);
// };

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/account/login'
        },
        {
            path: '/account/login', // 登陆
            name: 'login',
            component: resolve => require(['@/components/account/login'], resolve)
        },
        {
            path: '/project/new/edit', // 编辑
            name: 'newEdit',
            component: resolve => require(['@/components/project/edit'], resolve)
        },
        // {
        //     path: '/project/banner', // banner管理
        //     name: 'banner',
        //     component: resolve => require(['@/components/project/index'], resolve)
        // },
        {
            path: '/project/new', // 新闻管理
            name: 'new',
            component: resolve => require(['@/components/project/new'], resolve)
        },
        // {
        //     path: '/project/video', // 视频管理
        //     name: 'video',
        //     component: resolve => require(['@/components/project/video'], resolve)
        // }
    ]
});
