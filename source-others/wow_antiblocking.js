var is_error_page = !!window.is_UCBrowser_Error_page; // 当前页面是否是uc浏览器的内置错误页面

window.onerror = function(e){
    alert(e);
};
/*弹出红杏出墙的窗口
* 情况1： 错误页面主动调用antiblocking_check 可以触发客户端调用antiblocking_init_ui；
* 情况2： 其他情况客户端会自己决定是否调用antiblocking_init_ui
*/
function antiblocking_init_ui(cantAntiblock){
    is_error_page = !!window.is_UCBrowser_Error_page;
	var serverPath = "http://down.up1.uc.cn/wow/other/antiblocking/2.0/";
    //basic fn: create dom
    var $c = function(tag, cssText, innerHTML, parent) {
        var e = document.createElement(tag);
        if (cssText)e.style.cssText = cssText;
        if (innerHTML)e.innerHTML = innerHTML;//广州服务器做了特殊字符转义，所以这里不用innerText了也是安全的
        if (parent)parent.appendChild(e);
        return e;
    };
    
    //init dom
    if(!cantAntiblock) {
        var container = $c("div","position:fixed;left:50%;top: 50%;height:50%;width:472px;height:220px;margin-left:-236px;margin-top:-110px;font-family:微软雅黑,宋体;font-size:12px;background:center center no-repeat","",document.body),
        head = $c("header",";height:20px;overflow:hidden;border-top:","",container),
        title = $c("span","float:right","",head),
        cls = $c("button","position:absolute;right:25px;top:27px;width:19px;height:19px;background:url("+serverPath+"wow_close_bar_p.png) center center;text-indent:-1000px;border:none;outline:none;","关闭",head),
        body =  $c("div","margin:0;width:auto;height:auto","",container),
        img = $c("div","width:165px;height:196px;float:left;margin:-5px 0px 0px 7px;background:url("+serverPath+"wow_antiblocking.png) center center no-repeat;","",body),
        btn = $c("button",
                "position:absolute;bottom:40px;right:38px;outline:none;background:#ff7e00;color:#fff;border-radius:3px;line-height:26px;padding:0 21px;border:none;font-family:微软雅黑,宋体;font-size:12px;",
                "试试红杏出园",
                body),
        docUrl = document.location;
        var text = $c("p",
            "margin:0px 0 0 178px;padding-top:45px;line-height:30px;",
            "<div style='font-size:12px;color:#3e5062;width:auto;height:auto;margin:0;'>由于办公、校园网络等原因，无法访问本网页</div>" +
            "<div style='font-size:16px;color:#2b3b48;width:auto;height:auto;margin:0;'>红杏出园可以帮你冲出网络限制！</div>",
            body);

        container.style.backgroundImage = "url("+serverPath+"wow_antiblocking_bg.png)";
    } else {
        var c = document.getElementsByClassName('uc-error-antiblocking-clz');
        if(c.length > 0) {
            return;
        }
        var container = $c("div","position:fixed;left:50%;top: 50%;height:50%;width:500px;height:240px;margin-left:-236px;margin-top:-110px;font-family:微软雅黑,宋体;font-size:12px;background:center center no-repeat","",document.body),
        head = $c("header",";height:20px;overflow:hidden;border-top:","",container),
        title = $c("span","float:right","",head),
        cls = $c("button","position:absolute;right:19px;top:29px;;width:19px;height:19px;background:url("+serverPath+"wow_close_bar_p.png) center center;text-indent:-1000px;border:none;outline:none;","关闭",head),
        body =  $c("div","","",container),
        img = $c("div","width:165px;height:196px;float:left;margin:0px 0px 0px 7px;background:url("+serverPath+"wow_antiblocking2.png) center center no-repeat;","",body),
        btn = '',
        docUrl = document.location;
        var btnA = document.createElement("a");
        btnA.style.cssText = "position:absolute;bottom:40px;right:38px;outline:none;background:#ff7e00;color:#fff;" + 
                "border-radius:3px;text-decoration: blink;line-height:26px;padding:0 21px;border:none;font-family:微软雅黑,宋体;font-size:12px;";
        btnA.innerText = "试试红杏插件";
        btnA.href = 'http://img04.taobaocdn.com:80/tfscom/T1TAsBFx8cXXXSspjX.crx';
        body.appendChild(btnA);
        var text2 = $c("p",
            "margin:0px 0 0 172px;padding-top:32px;line-height:18px;padding-right: 30px;",
            "<div style='font-size:14px;color:#2b3b48;padding-bottom:16px;'>您正在访问的国外网站,可能由于网络限制等原因, 无法访问</div>" +
            "<ul style='font-size:12px;color:#ababab;line-height:16px;padding:0;margin:0px;position: relative;'>" +
            "<li style='position:relative;display: block;left: -7px;padding-left: 7px;width: 305px;background:url(" +serverPath + "wow_dot.png) 0px 5px no-repeat'>如果您有代理服务器,可以安装【<a style='color:#3089ef' href='http://img01.taobaocdn.com:80/tfscom/T1_xtpFldcXXXSspjX.crx'>Proxy SwitchySharp</a>】设置代理</li>" +
            "<li style='position:relative;margin-top:4px;display: block;left: -7px;padding-left: 7px;width: 305px;background:url(" +serverPath + "wow_dot.png) 0px 5px no-repeat'>如果您没有代理服务器,可以安装【<a style='color:#3089ef' href='http://img04.taobaocdn.com:80/tfscom/T1TAsBFx8cXXXSspjX.crx'>红杏插件</a>】试试哦</li>" +
            "</ul>",
            body);
        container.className = 'uc-error-antiblocking-clz';
        container.style.backgroundImage = "url("+serverPath+"wow_antiblocking_bg2.png)";
    }

    cls.onclick=function(e){
        document.body.removeChild(container);
    };
    cls.onmouseover=function(e){
        this.style.backgroundImage = "url("+serverPath+"wow_close_bar_h.png)";
    };
    cls.onmouseout=function(e){
        this.style.backgroundImage = "url("+serverPath+"wow_close_bar_p.png)";
    };

    container.onclick = function(e) {
        var t = e.target;
        if(t.tagName === 'A') {
            document.body.removeChild(container);
        }
    }
    
    btn.onclick=function(e){
        if(chrome && chrome.wowPrivate && chrome.wowPrivate.wowSend){//开始红杏出墙
            chrome.wowPrivate.wowSend("applyproxy", '{"is_error_page":'+is_error_page+'}');
        }else if(window.external && window.external.wowSend){
            window.external.wowSend("applyproxy", '{"is_error_page":'+is_error_page+'}');
        }
        document.body.removeChild(container);
    }; 
    btn.onmouseover=function(e){
        this.style.background = "#ff8d1d";
    };
    btn.onmouseout=function(e){
        this.style.background = "#ff7e00";
    };
    btn.onmousedown=function(){
        this.style.background = "#f46201";
    };
    btn.onmouseup=function(){
        this.style.background = "#ff8d1d";
    };
}

//检查当前页面是否需要弹出红杏出墙的窗口.
function antiblocking_check(){
    var is_error_page = !!window.is_UCBrowser_Error_page;
    if(chrome && chrome.wowPrivate && chrome.wowPrivate.wowSend){
        chrome.wowPrivate.wowSend("tryproxy", '{"is_error_page":'+is_error_page+'}', function(bool){
            bool && antiblocking_init_ui(false);
        });
    }else if(window.external && window.external.wowSend){
        function callback_tryproxy(bool) {
            bool && antiblocking_init_ui(false);
        }
        window.external.wowSend("tryproxy", '{"is_error_page":'+is_error_page+'}', "callback_tryproxy");
    }
}
