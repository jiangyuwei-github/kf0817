'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');


module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    AXIOS_API: 'http://pokerclubs.nooly.top', // 如果代理到正式服务器-正常接口

})
