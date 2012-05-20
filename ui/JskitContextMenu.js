/*****************************************************
*
* JsKit context menu
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
* #Require	 : /base/JskitBase.js
* 			 : /base/JskitUtil.js
******************************************************/
var JskitContextMenu = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitContextMenu";
    var __panelID = jskitUtil.guid();
	var __content = "";
    var __panel = null;
    var __firedObj = null;
    var __enable = true;
    var __provider = "";

    var __removeMenu = function(){
        if($$("#"+__panelID)!=null){
            $$("#"+__panelID).finalize(true);
        }
        __panel = null;
    };
    var __defaultContent = function(rMsg){
        var _html = "<table  width='100%' cellspacing='0'>";
        _html += "<tr><td class='JskitContextMenu_title'>Jskit.org Context</td></tr>";
        _html += "<tr><td class='JskitContextMenu_item_disabled'>"+rMsg+"</td></tr>";
        _html += "<tr><td class='JskitContextMenu_item' onclick=\"window.open('"+jskitLoad.path()+"doc/index.html')\" >About Jskit.org</td></tr>";
        _html += "</table>";
        return _html;
    };
    var __fixPos = function(rMx,rMy){
        var _obj = $$("#"+__panelID);
        var _oh = parseFloat($$("#"+__panelID+"_content").offsetHeight);
        var _ow = parseFloat($$("#"+__panelID+"_content").offsetWidth);
        var _left = parseFloat(rMx);
        var _top = parseFloat(rMy);
        var _wh = $$("body").clientHeight+$$("body").scrollTop;
        var _ww = $$("body").clientWidth+$$("body").scrollLeft;

        if((_top+_oh)>_wh){
            _top = _wh-_oh;
        }
        if((_left+_ow)>_ww){
            _left = _ww-_ow;
        }
        _obj.style.left = _left;
        _obj.style.top = _top;
    };
    var __deployContextMenu = function(e){
        __firedObj = e.srcElement;
        __removeMenu();
        if(__panel==null){
            __panel = document.createElement("div");
            __panel.id = __panelID;
            __panel.style.position = "absolute";
            __panel.style.left = 0;
            __panel.style.top = 0;
            __panel.style.width = "5px";
            __panel.style.height = "5px";
            __panel.style.zIndex = jskitBase.topIndex+10;

            var _content = document.createElement("div");
            _content.id = __panelID+"_content";
            _content.style.position = "absolute";
            _content.style.left = 0;
            _content.style.top = 0;
            _content.style.width = "100%";
            _content.style.height = "100%";
            _content.style.backgroundColor = "#ffffe0";
            _content.style.border = "outset 2px #ffffff";
            _content.style.zIndex = jskitBase.topIndex+10;
            _content.innerHTML = __content;
            __panel.appendChild(_content);

            // menu background,to cover <select> element
            var _iframe = document.createElement("iframe");
            _iframe.style.position = "absolute";
            _iframe.style.zIndex = jskitBase.topIndex+10;
            _iframe.style.visibility = "inherit";
            _iframe.style.left = 0;
            _iframe.style.top = 0;
            _iframe.style.width = "100%";
            _iframe.style.height = "100%";
            __panel.insertBefore(_iframe,_content);
            jskitBase.append(__panel);
        }
    };
    var __display = function(e){
        if(!__enable)return true;
        __deployContextMenu(e);
        __fixPos(e.clientX,e.clientY);
    };
    var __close = function(){
        __removeMenu();
    };
    var __open = function(e){
        __content = eval(__provider);
        __display(e);
    };
    this.setContent = function(rContent){
        __content = (typeof(rContent)=="string")?rContent:__defaultContent("");
    };
    this.open = function(e){
       __open(e);
	   return false;
    };
    this.close = function(){
        __close();
    };
    this.setEnable = function(v){
        __enable = (typeof(v)=="boolean")?v:true;
    };
    this.setProvider = function(v){
        __provider = v;
    };
};
