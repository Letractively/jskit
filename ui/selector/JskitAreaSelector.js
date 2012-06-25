/*****************************************************
*
* Jskit Area Selector
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #QQ		  : 499199
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
* #Requied   : core/*
* #Created   : 2010-8-31
*
******************************************************/
var JskitAreaSelector = function (rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitAreaSelector";
    var __mode = 1; //pop
    var __textObj = null;
    var __valueObj = null;
    var __data = null;
    var __startLevel = 1;
    var __endLevel = 3;
    var __useKeyAsValue = true;
    var __path = [];
    var __values = [];
	this.setValues = function(v){
		__values = (typeof(v)=="object")?v:[];
	};
    this.onSelected = null;

    //#BEGIN  ================ pop mode ===============================
    var __panel = null;
	var __panelId = jskitUtil.guid();
    var __container = null;
    var __header = null;
    var __bind = function(){
        var _str = [];
        var _data = __loadData();
        _str.push('<table cellspacing="0" cellpadding="0" class="JskitAreaSelector_table"><tbody><tr>');
        var _action = "";
        for (var i = 0; i < _data.length; i++) {
        	_action = (_data[i][2].length<1 || (__path.length-1)==__endLevel)?"__onSelected":"__onNext";
            _str.push('<td onclick="' + __hd + '.'+_action+'(' + i + ')" onmouseover="'+__hd+'.active(this)" onmouseout="'+__hd+'.unactive(this)">' + (_data[i][1]) + '</td>');
            if ((i + 1) % 5 == 0) {
                _str.push('</tr><tr>');
            }
        }
        _str.push('</tbody></table>');
        $$("#" + __hd + "_container").innerHTML = _str.join('');
        _str = null;
    };
    
    var __callback = function(key,txt){
        if (__textObj != null) {
            if (typeof (__textObj.value) == "string") {
                __textObj.value = txt;
            } else {
                __textObj.innerHTML = txt;
            }
        }
        if (__valueObj != null) {
            if (typeof (__valueObj.value) == "string") {
                __valueObj.value = key;
            } else {
                __valueObj.innerHTML = key;
            }
        }	
    };
    var __showPopPanel = function () {
    	if(__panel==null){
	        var str = '<div id="' + __hd + '_header" class="JskitAreaSelector_header">';
	        str += '<div style="float:left">' + unescape("%u9009%u62E9%u533A%u57DF") + '</div>';
	        str += '<div class="JskitAreaSelector_btn" onclick="' + __hd + '.close()">[' + unescape("%u5173%u95ED") + ']</div>';
	        str += '<div class="JskitAreaSelector_btn" onclick="' + __hd + '.clear()">[' + unescape("%u7F6E%u7A7A") + ']</div>';
	        str += '<div class="JskitAreaSelector_btn" onclick="' + __hd + '.reset()">[' + unescape("%u91CD%u7F6E") + ']</div>';
	        str += '</div>';
	        str += '<div id="' + __hd + '_container" class="JskitAreaSelector_container"></div>';
	        __panel = jskitUtil.doc.pop(__panel, __textObj, str, "position=down");
	        __panel.className = "JskitAreaSelector_panel";
			__panel.setAttribute("id",__panelId);
    	}else{
    		$$("#"+__panelId).style.display = "block";
    	}
    };
    var __closePanel = function () {
        if ($$("#"+__panelId) != null) {
            $$("#"+__panelId).style.display = "none";
        }
    };
    var __find = function(data,key,path){
        for(var i=0;i<data.length;i++){
        	if(key==data[i][0]){
        		return path.push(data[i][0]);
        	}
        	if(data[i][2].length>0){
        		path = __find(data[i][2],data[i][0],path.push(data[i][0]));
        	}
        }
        return path;
    };

    this.active = function (sender, e) {
        sender.className = "_active";
    };
    this.unactive = function (sender, e) {
        sender.className = "";
    };

    this.clear = function () {
    	__callback("","");
    	__initPath();
    	__closePanel();
    };
    this.__onNext = function(idx){
    	__path.push(idx);
    	__bind();
    };
    this.setTextField = function (v) {
        __textObj = (typeof (v) == "object") ? v : null;
    };
    this.setValueField = function (v) {
        __valueObj = (typeof (v) == "object") ? v : null;
    };
    this.open = function (json){
    	__mode = 1;
    	this.setUseKeyAsValue(json.useKeyAsValue);
    	this.clear();
    	this.setData(json.data);
        __textObj = $$("#" + json.textFieldId);
        __valueObj = $$("#" + json.valueFieldId);
        __separate = (typeof(json.separate)==="string")?json.separate:",";
        this.setStartLevel(json.startLevel);
        this.setEndLevel(json.endLevel);
    	this.onSelected = json.onSelected;
		this.setValues(json.values);
    	__initPath();
        __showPopPanel();
        __bind();
    };
    this.reset = function () {
    	__initPath();
        __bind();
    };
    this.close = function () {
        __closePanel();
    };
    //#END  ================ pop mode ===============================

    //#BEGIN  ================ DropdownList mode ===============================
	var __ddlEmpty = null;
	this.setDdlEmpty = function(v){
		__ddlEmpty = ((typeof(v)=="object") &&(typeof(v.key)!="undefined") && (typeof(v.value)!="undefined"))?v:null;
	};
    var __ddlIds = [];
    var __ddls = [];
    var __initDdls = function(){
    	__ddls = [];
    	for(var i=0;i<__ddlIds.length;i++){
    		__ddls.push($$("#"+__ddlIds[i]));
    	}
    	for(var i=0;i<__ddls.length;i++){
    		__ddls[i].innerHTML = "";
    		__ddls[i].setAttribute("idx",i);
    		jskitEvents.add(__ddls[i],"onchange",__hd+".__onNextSelect");
    	}
    	__renderDddl(0);
    	__ddlsFresh(1);
    };
    var __renderDddl = function(ddlIdx){
		var _ddl = __ddls[ddlIdx];
    	var _str = [];
    	var _val = null;
    	var _data = __loadData();
		if(_data==null){
			_ddl.innerHTML = "";
			_ddl = null;
			return;
		}
    	var _currentVal = __loadValue();
		if(ddlIdx===0 && __ddlEmpty!=null){
			_str.push('<option value="'+__ddlEmpty.key+'">'+__ddlEmpty.value+'</option>');
		}
    	for(var i=0;i<_data.length;i++){
    		_val = (__useKeyAsValue===true)?_data[i][0]:_data[i][1];
    		if(_currentVal==_val){
        		_str.push('<option value="'+_val+'" idx="'+i+'" selected="selected">'+_data[i][1]+'</option>');
    		}else{
        		_str.push('<option value="'+_val+'" idx="'+i+'">'+_data[i][1]+'</option>');
    		}
    	}
    	_ddl.innerHTML = _str.join('');
    	_ddl = _str = _data = _currentVal = _val = null;
    };
    var __ddlsFresh = function(ddlIdx){
    	for(var d=ddlIdx;d<__ddls.length;d++){
    		__resetPathBySelectChange(d-1);
            __renderDddl(d);
    	}
    	__resetPathBySelectChange(__ddls.length-1);
   };
    
    
    var __resetPathBySelectChange = function(ddlIdx){
    	__path = __path.slice(0, __startLevel+ddlIdx-1);
    	var opr = __ddls[ddlIdx].options[__ddls[ddlIdx].selectedIndex];
		var idx = (typeof(opr)=="object")?opr.getAttribute("idx"):null;
		if(idx!=null && !isNaN(parseInt(idx))){
			idx = parseInt(idx);
		}
	    __path.push(idx);
    };
    this.__onNextSelect = function(e){
    	var ddlIdx = parseInt(e.srcElement.getAttribute("idx"));
    	__resetPathBySelectChange(ddlIdx);
    	for(var i=ddlIdx+1;i<__ddls.length;i++){
    		__ddls[i].innerHTML = "";
    	}
		__ddlsFresh(ddlIdx+1);
		this.__onSelected();
    };
    this.select = function(json){
    	__mode = 2;
    	this.setUseKeyAsValue(json.useKeyAsValue);
    	this.clear();
    	this.setData(json.data);
    	__ddlIds = json.selectFieldIdList;
        __separate = (typeof(json.separate)==="string")?json.separate:",";
        this.setStartLevel(json.startLevel);
        this.setEndLevel(__startLevel+__ddlIds.length-1);
		this.setValues(json.values);
		this.setDdlEmpty(json.empty);
    	__initPath();
    	__initDdls();
    	this.onSelected = json.onSelected;
		this.__onSelected();
	};

    //#END  ================ DropdownList mode ===============================
    var __initPath = function(){
        __path = (__startLevel===1)?[]:[0];
    };
    var __loadData = function(){
    	if(__path.length==0){
    		return __data;
    	}else{
    		var _data = __data;
    		for(var i=0;i<__path.length;i++){
				if(__path[i]==null){return null;}
    			_data = _data[__path[i]][2];
    		}
    		return _data;
    	}
    };
    var __loadValue = function(){
    	return (__values.length>=__path.length)?__values[__path.length-1]:"";
    };
    var __parseText = function(path){
		var _data = __data;
		var _str = [];
		for(var i=0;i<path.length;i++){
			if(path[i]==null){return "";}
			if(i>=__startLevel-1){
				_str.push(_data[path[i]][1]);
			}
			_data = _data[path[i]][2];
		}
		_data = null;
		return _str.join(__separate);
    };
    var __parseKey = function(path){
		var _data = __data;
		for(var i=0;i<path.length-1;i++){
			if(path[i]==null){return [];}
			_data = _data[path[i]][2];
		}
		return _data[path[path.length-1]][0];
    };

    this.__onSelected = function(idx){
    	var _txt = "";
    	var _key = "";
    	if(__mode==1){//pop
        	__path.push(idx);
            _txt = __parseText(__path);
        	_key = __parseKey(__path);
            __callback(_key,_txt);
    	}else{//select
            _txt = __parseText(__path);
        	_key = __parseKey(__path);
    	}
        if(__mode==1){//pop
        	__closePanel();
        }
        if(typeof(this.onSelected)!=="undefined"){
            this.onSelected(_key,_txt.split(__separate));
        }
    };
    this.getNameByKey = function (rKey) {
        if (typeof (rKey) != "string" || rKey == "") return "";
        var path = __find(__data,rKey,[]);
        return __parseText(path);
    };
    this.setData = function (v) {
        __data = v;
    };
    this.setStartLevel = function (v) {
        __startLevel = (v===1)?1:2;
    };
    this.setEndLevel = function (v) {
        __endLevel = (v===4)?4:3;
    };
    this.setUseKeyAsValue = function(v){
    	__useKeyAsValue = (v===true);
    };
    

};