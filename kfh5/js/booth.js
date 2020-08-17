function boothEvent(){
        // 底部按钮滚动
        $(".pc .newScoll").click(function(){
            var scollTop = $(".pc .banner").outerHeight() + $(".pc .downBox").outerHeight() +  $(".pc .titlebox").outerHeight()
            $("html,body").animate({scrollTop:scollTop}, 100);
        })
        
        $(".videoScoll").click(function(){
            var scollTop = $(".pc .banner").outerHeight() +  $(".pc .downBox").outerHeight() +  $(".pc .contentBox").outerHeight() + $(".pc .titlebox").outerHeight()
            $("html,body").animate({scrollTop:scollTop}, 100);
        })

        $(".mobile .newScoll").click(function(){
            var scollTop = $(".mobile .banner").outerHeight() + $(".mobile .downBox").outerHeight() +  $(".mobile .titlebox").outerHeight()
            $("html,body").animate({scrollTop:scollTop}, 100);
        })
        
        $(".mobile .videoScoll").click(function(){
            var scollTop = $(".mobile .banner").outerHeight() +  $(".mobile .downBox").outerHeight() +  $(".mobile .contentBox").outerHeight() + $(".mobile .titlebox").outerHeight()
            $("html,body").animate({scrollTop:scollTop}, 100);
        })
}


function formatDate(time, fmt) {
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
