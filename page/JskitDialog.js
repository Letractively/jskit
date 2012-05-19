/*****************************************************
 *
 * JskitDialog
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *
 ******************************************************/
var JskitDialog = function(rHd){
    var __hd = (typeof(rHd)=="string")?rHd:"jskitDialog";
    var __TYPE = new function(){
        this.ALERT = 0;
        this.CONFIRM = 1;
    };
    //style----------
    var __buttonCssClass = "";
    var __panelCssClass = "";
    //text-----------
    var __txtOK = "OK";
    var __txtCancel = "Cancel";
    //---------------
    var __moveAble = false;
    
    var __type = null;//dialog type
    var __content = null;//dialog content
    var __x = null;//dialog left position
    var __y = null;//dialog top position
    var __panel = null; //dialog
    var __panelId = jskitUtil.guid();//dialog id
    var __zIndex = 99999;
    var __buildPanel = function(){
        if(__panel==null){
            __panel = document.createElement("div");
            __panel.setAttribute("id",__panelId);
            $$("body").appendChild(__panel);
        }
        __panel.style.display = "none";
        __panel.style.position = "absolute";
        __panel.style.zIndex = __zIndex;
    };
    var __setPanelStyle = function(){
        __panel.style.className = __panelCssClass;
        if(__x!=null){
            __panel.style.left = __x;
        }
        if(__y!=null){
            __panel.style.top = __y;
        }
    };
    var __fillPanel = function(){
        __panel.innerHTML = "";
        if(__type==null){
            __panel.innerHTML = __content;
        }else if(__type==__TYPE.ALERT){
            __panel.innerHTML = __content+'<div><button class="'+__buttonCssClass+'" onclick="'+__hd+'.onOK(this,event)">'+__txtOK+'</button></div>';
        }
    };
    var __open = function(rContent,rX,rY){
        __content = (typeof(rContent)=="string")?rContent:"";
        __x = (typeof(rX)=="number")?rX:null;
        __y = (typeof(rY)=="number")?rY:null;
        __buildPanel();
        __setPanelStyle();
        __fillPanel();
        __panel.style.display = "block";
        
    };
    var __close = function(){
        if(__panel!=null){
            __panel.style.display = "none";
        }
    };
    //events
    var __onOK = function(sender,e){
        __close();
        return true;
    };
    var __onCancel = function(sender,e){
        __close();
        return false;
    };
    //public
    this.setZIndex = function(v){
        if(typeof(v)=="number"){__zIndex = v;}  
    };
    this.open = function(rContent,rX,rY){
        __type = null;
        __open(rContent,rX,rY);
    };
    this.alert = function(rContent,rX,rY){
        __type = __TYPE.ALERT;
        __open(rContent,rX,rY);
    };
    this.onOK = function(sender,e){
        __onOK(sender,e);
    };
    this.onCancel = function(sender,e){
        __onCancel(sender,e);
    };
};