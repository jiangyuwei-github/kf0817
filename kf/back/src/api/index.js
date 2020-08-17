import axios from 'axios';
import qs from 'qs';


// Login
export const Login = params => {
    return axios.post('/pokerclubs/back/system/login', params,{headers: {'Content-Type': 'application/json'}}).then(res => res.data);
};


// 登出
export const logout = params => {
    return axios.get('/pokerclubs/back/system/logout?' + qs.stringify(params)).then(res => res.data);
};


// 获取列表
export const articleList = params => {
    return axios.get('/pokerclubs/back/article/all?' + qs.stringify(params)).then(res => res.data);
};


// 获取详情
export const articleOne = params => {
    return axios.get('/pokerclubs/back/article/one?' + qs.stringify(params)).then(res => res.data);
};

// 新增
export const save = params => {
    return axios.post('/pokerclubs/back/article/save', params,{headers: {'Content-Type': 'application/json'}}).then(res => res.data);
};


// 排序
export const sort = params => {
    return axios.post('/pokerclubs/back/article/sort?'+qs.stringify(params, { indices: false })).then(res => res.data);
};

// 上线
export const online = params => {
    return axios.post('/pokerclubs/back/article/online?' + qs.stringify(params)).then(res => res.data);
};

// 下线
export const offline = params => {
    return axios.post('/pokerclubs/back/article/offline?' + qs.stringify(params)).then(res => res.data);
};


// 删除
export const deleteItem = params => {
    return axios.post('/pokerclubs/back/article/delete?' + qs.stringify(params)).then(res => res.data);
};

// 修改
export const editDetail = params => {
    return axios.post('/pokerclubs/back/article/edit', params,{headers: {'Content-Type': 'application/json'}}).then(res => res.data);
};


// Login
// export const Login = params => {
//     return axios.get('/pokerclubs/back/system/login?' + qs.stringify(params)).then(res => res.data);
// };


// 详情
export const article = params => {
    return axios.get('/pokerclubs/back/article?' + qs.stringify(params)).then(res => res.data);
};