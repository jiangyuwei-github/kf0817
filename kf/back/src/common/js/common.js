// 公共js文件，存放基本js方法
// 正则地址 https://c.runoob.com/front-end/854
export const regPhoneAndEmail = /(^1[3456789]\d{9}$)|(^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/;// 手机和邮箱
export const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;// 邮箱正则
export const regPhoneNumber = /^1[3456789]\d{9}$/;// 手机
export const regTellNumber = /^([0-9-]+)$/;// 号码匹配-数字和横线
export const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;// 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
export const regNumber = /^[0-9]*$/;// 数字
export const regWebUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/){0,1}(([A-Za-z0-9-~]+)\.)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;



/**
 * [dataType 封装type]
 * // 要求：
// type([]) -> array
// type({}) -> object
// type(function) -> function
// type(new Number()) -> number Object
// type(123) -> number

 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
export function dataType(target) {
    // 1. 分析 原始值和引用值
    // 2. 如果是引用值，分析是
    var template = {
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Number]': 'number - object',
        '[object Boolean]': 'boolean - object',
        '[object String]': 'string - object'
    };

    var ret = typeof (target);

    if (target === null) {
        return 'null';
    } else if (ret == 'object') {
        // 引用值
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        // 原始值
        return ret;
    }
}

export function formatDate(time, fmt) {
    if (time) {
        var date = new Date(time);
        var o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'H+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };
        var week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }

        return fmt;
    } else {
        return '';
    }
};