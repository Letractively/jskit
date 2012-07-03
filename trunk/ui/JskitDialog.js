/*****************************************************
 *
 * JskitDialog
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : core/*;
 *
 ******************************************************/
var JskitDialog = function(rHd){
    var __hd = (typeof(rHd)=="string")?rHd:"jskitDialog";
    var __mode = 0;//0:模态,1:非模态
    var __position = null; //[0,0]顶点坐标和宽高
    var __title = null;
    var __content = null;
    var __bodyWidth = null;
    var __bodyHeight = null;
    var __btnOkText = "OK";
    var __btnCancelText = "Cancel";
    var __onCallback = null;
    var __panelId = jskitUtil.guid();
    var __shadowId = jskitUtil.guid();
    var __srcObjectId = null;
    var __moveable = true;
    //BEGIN: properties
    this.setMode = function(v){
    	__mode = (v===1)?1:0;
    };
    this.setContent = function(v){
    	if(typeof(v)!="undefined"){
    		__content = v;
    	}
    };
    this.setSrcObjectId = function(v){
    	__srcObjectId = ($t.isString(v))?v:null;
    };
    this.setBodyWidth = function(v){
    	__bodyWidth = (isNaN(parseFloat(v)))?null:parseFloat(v);
    };
    this.setBodyHeight = function(v){
    	__bodyHeight = (isNaN(parseFloat(v)))?null:parseFloat(v);
    };
    this.setOkText = function(v){
    	__btnOkText = (typeof(v)=="undefined")?"OK":v;
    };
    this.setCancelText = function(v){
    	__btnCancelText = (typeof(v)=="undefined")?"Cancel":v;
    };
    this.setMoveable = function(v){
    	__moveable = (v===true);
    };
    //END: properties

    //BEGIN: private methods
    var __parseTitle = function(){
    	var _src = $$("#"+__srcObjectId);
    	if($t.isString(__title)){
    		return __title;
    	}else{
        	return ( (_src!=null) && $t.isString(_src.getAttribute("title")) )?_src.getAttribute("title"):"";
    	}
    };
    var __buildDialog = function(){
    	var _panel = $$("#"+__panelId);
    	if(_panel==null){
    		_panel = document.createElement("div");
        	$$("body").appendChild(_panel);
    		_panel.setAttribute("id",__panelId);
    		_panel.style.zIndex = 100000;
    		_panel.className = "JskitDialog";
        	var _str = '<div id="'+__panelId+'_h" class="head">'+__parseTitle()+'<div class="btnClose" onclick="'+__hd+'.close()">X</div></div>';
        	_str += '<div id="'+__panelId+'_b" class="body" style="width:'+__bodyWidth+'px;height:'+__bodyHeight+'px;overflow:auto;">';
        	_str += '</div>';
        	_str += '<div class="btnbar">';
    		_str += '<a href="javascript:'+__hd+'.cancel()"><div>'+__btnCancelText+'</div></a>';
    		_str += '<a href="javascript:'+__hd+'.ok()"><div>'+__btnOkText+'</div></a>';
        	_str += '</div>';
        	_panel.innerHTML = _str;
        	if(__srcObjectId!=null){
            	$$("#"+__panelId+"_b").appendChild($$("#"+__srcObjectId));
        	}else{
            	$$("#"+__panelId+"_b").innerHTML = __content;
        	}
        	if(__position==null){
        		jskitUtil.doc.centre(_panel);
        	}else{
        		_panel.style.position = "absolute";
        		_panel.style.left = __position[0]+"px";
        		_panel.style.top = __position[1]+"px";
        	}
        	if(__moveable){
        		jskitDynamic.add("#"+__panelId);
        		jskitDynamic.play();
        	}
    	}
    	_panel.style.display = "block";
    };
    var __buildShadow = function(){
    	var _shadow = $$("#"+__shadowId);
    	if(_shadow==null){
    		_shadow = document.createElement("div");
    		_shadow.setAttribute("id",__shadowId);
    		_shadow.style.zIndex = 99999;
    		_shadow.className = "JskitDialogShadow";
    	}
    	_shadow.style.position = "absolute";
    	_shadow.style.width = "100%";
    	_shadow.style.height = "100%";
    	_shadow.style.top = "0px";
    	_shadow.style.left = "0px";
    	_shadow.style.display = "block";
    	$$("body").appendChild(_shadow);
    };
    var __show = function(){
    	__buildDialog();
    	if(__mode===0){
    		__buildShadow();
    	}
    };
    var __close = function(){
    	if($$("#"+__panelId)!=null){$$("#"+__panelId).style.display = "none";}
    	if($$("#"+__shadowId)!=null){$$("#"+__shadowId).style.display = "none";}
    };
    //END: private methods
    
    //BEGIN: action
    this.close = function(){
    	__close();
    };
    this.ok = function(){
    	if($t.isFunction(__onCallback)){
    		__onCallback(true);
    	}
    	__close();
    };
    this.cancel = function(){
    	if($t.isFunction(__onCallback)){
    		__onCallback(false);
    	}
    	__close();
    };
    //BEGIN: action
    
    this.show = function(json){
    	this.init(json);
    	__show();
    };
    this.open = function(){
    	__show();
    };
    this.init = function(json){
    	__title = json.title;
    	this.setOkText(json.ok);
    	this.setCancelText(json.cancel);
    	this.setBodyWidth(json.width);
    	this.setBodyHeight(json.height);
    	this.setMode(json.mode);//设置是否为模态
    	this.setSrcObjectId(json.src);//设置对话框显示内容的原始对象
    	this.setContent(json.content);
    	this.setMoveable(json.moveable);
    	__onCallback = json.callback;
    };
};