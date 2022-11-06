function ajax_api(method, url, param, done) {
    // 兼容书写
    let data = null
    const xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP")

    const pairs = []
    for (let k in param) {
        pairs.push(k + "=" + param[k])
    }
    method = method.toUpperCase()
    if (method === "GET") {
        url += "?" + pairs.join("&")
        data = null
        xhr.open(method, url)
    } else {
        xhr.open(method, url)
    }

    if (method === "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        data = pairs.join("&")
    }

    xhr.send(data)
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return
        done(JSON.parse(this.responseText))
    }
}

function strToHex(str) {
    let strHex = "";
    let x = 0;
    for (x = 0; x < str.length; x++) {
        strHex += str.charCodeAt(x).toString(16).toUpperCase();
    }
    return (strHex);
}

function get_timezones() {
    let d, tz, s = "";
    d = new Date();
    tz = d.getTimezoneOffset();
    tz = tz * (-1);

    if (tz < 0) {
        s = s + "f";
        tz = tz * (-1);
    } else {
        s = s + "z";
    }
    if (tz >= 0) {
        let hour = Math.floor(tz / 60);

        let minute = tz - Math.floor(tz / 60) * 60;
        if (hour < 10) {
            s = s + "" + hour;
        } else {
            s = s + hour;
        }
        s = s + "i";
        if (minute < 10) {
            s = s + "0" + minute;
        } else {
            s = s + minute;
        }
        return s;
    }
}

//登录提示函数
function set_top_visible(v) {
    (!v) && (v = "block");
    try {
        document.getElementById("top_tooltip").style.display = v;
    } catch (e) {
    }
}

// 非法调用
function no_site() {
    document.title = "您所在的域名，非法调用了 “IP屏蔽系统”,请登录管理平台免费添加当前站点域名";
    document.body.innerHTML = '<iframe id="main" name="main" marginwidth="0" marginheight="0" scrolling="no" framespacing="0" vspace="0" hspace="0" frameborder="0" width="100%" height="680px" src="' + s_url + 'err/err0.html?err_id=0"></iframe>';
}

// 非法用在线翻译或在线代理调用
function no_proxy() {
    let page_url = s_url + 'err/err0.html?err_id=1';
    window.status = '请不要用在线翻译或在线代理访问 “IP屏蔽系统”';
    document.title = "请不要用在线翻译或在线代理访问 “IP屏蔽系统”";
    document.write("<body style='margin:0;padding:0;' scoll=no>");
    let w_h = window.screen.height - 100;
    document.write('<iframe id="main" name="main" marginwidth="0" marginheight="0" scrolling="auto" framespacing="0" vspace="0" hspace="0" frameborder="0" width="100%" height="' + w_h + 'px" style="background-color:#fff" src="' + page_url + '"></iframe>');
    document.write("</body></html><script type='text/javascript' defer>document.body.style.overflow=document.documentElement.style.overflow= 'hidden';<\/script><div style=display:none><noscript>");
}

// 当前站点的VIP功能未开通或已经过期
function no_vip() {
    document.title = "当前站点的VIP功能未开通或已经过期，请访问http://8888cn.cn进行续费";
    document.body.innerHTML = '<iframe id="main" name="main" marginwidth="0" marginheight="0" scrolling="no" framespacing="0" vspace="0" hspace="0" frameborder="0" width="100%" height="680px" src="' + s_url + 'err/err0.html?err_id=2"></iframe>';
}

// 用指定假的网页内容代替当前页2
function no_replace_page2() {
    let page_url = "";
    if (rules_url != '') {
        page_url = rules_url;
    }
    window.status = '';
    document.title = "";
    document.write("<body style='margin:0;padding:0;' scoll=no>");
    let w_h = window.screen.height - 100;
    document.write('<iframe id="main" name="main" marginwidth="0" marginheight="0" scrolling="auto" framespacing="0" vspace="0" hspace="0" frameborder="0" width="100%" height="' + w_h + 'px" style="background-color:#fff" src="' + page_url + '"></iframe>');
    document.write("</body></html><script type='text/javascript' defer>document.body.style.overflow=document.documentElement.style.overflow= 'hidden';<\/script><div style=display:none><noscript>");
}

function d_err(var_type) {
    window.status = '';
    switch (var_type) {
        case "404":
            // HTTP 404 网页未找到
            document.title = "404 Not Found";
            document.writeln("<!DOCTYPE HTML PUBLIC \'-//IETF//DTD HTML 2.0//EN\'><html><head><title>404 Not Found</title></head><body bgcolor=\'white\'><h1>404 Not Found</h1></body></html><div style=display:none><noscript>");
            break;
    }
    if (document.all) {
        document.execCommand("stop");
    } else {
        window.stop();
    }
}

function err_show_vip() {

    if ("undefined" == typeof (rules_url)) {
        var rules_url = "";
    }

    // 对错误类型分别处理
    switch (rules_type) {
        case "0":
            // 系统默认
            window.top.location.href = rules_url;
            break;
        case "1":
            // 空白页,因微信和QQ不能用空白页,会造成失效,所以特别制作了一个页面
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/qq/) == "qq" || ua.match(/weixin/) == "weixin") {
                window.top.location.href = "https://c.pc.qq.com/middlem.html";
            } else {
                window.top.location.href = "about:blank";
            }
            break;
        case "2":
            // 域名无法解析
            document.title = "DNS解析错误，无法显示该网页";
            window.top.location.href = "http://www.duba.com/iedns2.html?q=http%3A%2F%2Fwww." + this_dns + "%2F";
            break;
        case "3":
            // HTTP 404 错误的请求
            d_err("404");
            break;
        case "4":
            // 用指定假的网页内容代替当前页
            no_replace_page2();
            break;
        case "5":
            // 自定义网页模板
            window.location.href = rules_url;
            break;
        case "6":
            // 跳转到指定网址
            window.top.location.href = rules_url;
            break;
        case "7":
            // QQ登录页
            window.top.location.href = s_url + "admin/oauth/go.php?u=" + qq_url;
            break;
        case "9":
            // 非法调用
            // no_site();
            window.onload = no_site;
            break;
        case "10":
            // 使用在线代理或在线翻译
            no_proxy();
            //window.onload = no_proxy;
            break;
        case "11":
            // vip已经到期
            window.onload = no_vip;
            break;
        case "ok":
            // 正常登录
            let s_url2 = 'https:\/\/gcore.jsdelivr.net\/gh\/cn8star\/cdn\/';
            document.writeln("<div id=\"top_tooltip\" style=\"display:none;background:url(" + s_url2 + "top_tooltip.png) no-repeat;background-position:4px 4px;border-top:1px solid #fff; border-bottom:1px solid #aca899; height:26px; line-height:26px; padding-left:33px; font-size:12px; background-color:#ffffe1; text-align:left;color:#ff4e00; margin:1px auto\"><a style=\"background:url(" + s_url2 + "top_tooltip.png) no-repeat;background-position:-2px -115px;width:15px; height:14px;float:right; display:inline; margin:5px 10px;cursor:pointer;\" onclick=\'set_top_visible(\"none\");\'><\/a><span style=\"color:#333;\">星网 国内IP屏蔽系统(<b><font color=red>国外用户访问不会出此提示</font></b>) 提醒您：<\/span><font color=blue>用户您好:您已经验证通过，可以访问被屏蔽内容！</font>更多设置,请访问<a href=\"" + s_url + "\" target=_blank>http:\/\/8888CN.CN\/<\/a>，全程专家在线，实时一对一金牌服务！<\/div> ");
            let st = 1000;
            setTimeout("set_top_visible()", st);
            break;
    }
}


//获得客户端当前时区,如:Asia/Shanghai
let this_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let this_url2 = window.location.href;
this_url2 = strToHex(this_url2);
let r = document.referrer;
if (r == '') {
    r = 'null';
} else {
    r = strToHex(r);
}
let t = get_timezones();

//对中文浏览器或系统进行处理
if (window.is_cn) {
    var rules_type;
    // 浏览器语言
    var language = window.navigator.language;
    if (!language) {
        language = window.navigator.browserLanguage;
    }

    if (language.toUpperCase() == "ZH-CN" ||
        language.toUpperCase() == "ZH") {
        // 对错误类型分别处理
        rules_type = window.is_cn;
    }
}
//检测是否https生成不同的路径，以免因为安全原因不能执行
var s_url = 'https://cdn.fcxpack.com/' + 'ip/';
var c = window.screen.height + window.screen.width + window.screen.colorDepth;
var s = 'https://cdn.fcxpack.com/' + 'ip/ipchk2';

document.write('<scr' + 'ipt type="text/javascript" src="' + s + '_' + ID + '_' + this_url2 + '_' + r + '_' + t + '_' + c + '.js"></scr' + 'ipt>');
