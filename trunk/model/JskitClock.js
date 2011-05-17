 /****************************************************************************
 *
 * JsKitClock
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ****************************************************************************/
var JskitClock = function(rHd){
    var __hd = (typeof(rHd)=="string")?rHd:"jskitClock";
    var __key = jskitUtil.guid();
    var __hotKey = "";
    var __dstDt = null;
    var __nowDt = null;
    var __attr = new Array();
    __attr["state"] = 0;//0:full,1:small,2:min;
    __attr["float"] = "left";//left,top,none;
    __attr["left"] = 10;
    __attr["top"] = 10;
    var __panel = null;
    var __panelCssClass = "";
    var __timer = null;
    var __initPanel = function(){
        __panel = document.createElement("div");
        __panel.setAttribute("id",__key+"panel");
        __panel.style.left = __attr["left"];
        __panel.style.top = __attr["top"];
        __panel.style.position = "absolute";
        __panel.style.display = "block";
        __panel.className = __panelCssClass;
        if($("body")!=null){
            $("body").appendChild(__panel);
        }
    };
    var __fresh = function(){
        if(__panel==null){
           __initPanel();
        }
        if(__panelCssClass!=""){
            __panel.className = __panelCssClass;
        }
        if(__attr["state"]=="min"){
            __panel.style.display = "none";
        }else if(__attr["state"]==1){
            __panel.innerHTML = '<button onclick="'+__hd+'.changeState(0)">Clock</button>';
        }else if(__attr["state"]==2){
            __panel.innerHTML = '<button onclick="'+__hd+'.changeState(0)">Clock</button>';
        }
    };

};