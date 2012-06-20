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
    var __hd = (typeof (rHd) == "string") ? rHd : "jskitAreaSelector";
    var __mode = "select"; //pop
    var __textObj = null;
    var __valueObj = null;
    var __data = null;
    var __startLevel = 1;
    var __endLevel = 3;

    //BEGIN pop mode
    var __panel = null;
    var __container = null;
    var __header = null;

    
    var __path = [];
    var __loadData = function(){
    	if(__path.length==0){
    		return __data;
    	}else{
    		var _data = __data;
    		for(var i=0;i<__path.length;i++){
    			_data = _data[__path[i]][2];
    		}
    		return _data;
    	}
    };
    var __parseText = function(path){
		var _data = __data;
		var _str = [];
		for(var i=0;i<path.length;i++){
			if(i>=__startLevel-1){
				_str.push(_data[path[i]][1]);
			}
			_data = _data[path[i]][2];
		}
		_data = null;
		return _str.join(__separated);
    };
    var __parseKey = function(path){
		var _data = __data;
		for(var i=0;i<path.length-1;i++){
			_data = _data[path[i]][2];
		}
		return _data[path[path.length-1]][0];
    };
    var __bind = function(){
        var _str = [];
        var _data = __loadData();
        _str.push('<table cellspacing="0" cellpadding="0" class="JskitAreaSelector_table"><tbody><tr>');
        var _action = "";
        for (var i = 0; i < _data.length; i++) {
        	_action = (_data[i][2].length<1 || (__path.length-1)==__endLevel)?"onSelect":"onNext";
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
    
    this.onNext = function(idx){
    	__path.push(idx);
    	__bind();
    };
    this.onSelect = function(idx){
    	__path.push(idx);
        var _txt = __parseText(__path);
    	var _key = __parseKey(__path);
        __callback(_key,_txt);
        __closePanel();
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
    	}else{
    		__panel.style.display = "block";
    	}
    };

    var __initPath = function(){
        __path = (__startLevel===1)?[]:[0];
    };
    
    this.reset = function () {
    	__initPath();
        __bind();
    };
    this.clear = function () {
    	__callback("","");
    	__initPath();
    	__closePanel();
    };
    var __closePanel = function () {
        if (__panel != null) {
            __panel.style.display = "none";
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
    this.getNameByKey = function (rData,rKey,rPath) {
        if (typeof (rKey) != "string" || rKey == "") return "";
        var path = __find(__data,rKey,[]);
        return __parseText(path);
    };
    this.setTextField = function (v) {
        __textObj = (typeof (v) == "object") ? v : null;
    };
    this.setValueField = function (v) {
        __valueObj = (typeof (v) == "object") ? v : null;
    };
    this.setData = function (v) {
        __data = v;
    };
    this.hasCountry = function (v) {
        if(v===true){
        	__startLevel = 1;
        }else{
        	__startLevel = 2;
        }
    };
    this.setEndLevel = function (v) {
        __endLevel = parseInt(v);
    };
    this.active = function (sender, e) {
        sender.className = "_active";
    };
    this.unactive = function (sender, e) {
        sender.className = "";
    };
    this.toCountry = function (countryIdx) {
        return __data[countryIdx].Name;
    };
    this.toProvince = function (countryIdx, provinceIdx) {
        return __data[countryIdx].Sub[provinceIdx].Name;
    };
    this.toCity = function (countryIdx, provinceIdx, cityIdx) {
        return __data[countryIdx].Sub[provinceIdx].Sub[cityIdx].Name;
    };

    this.open = function (rTextFieldId, rValueFieldId, rHasCountry,rSeparated) {
    	this.clear();
        __textObj = $$("#" + rTextFieldId);
        __valueObj = $$("#" + rValueFieldId);
        __separated = (typeof(rSeparated)==="string")?rSeparated:",";
        this.hasCountry(rHasCountry);
    	__initPath();
        __showPopPanel();
        __bind();
    };
    this.close = function () {
        __closePanel();
    };
    //END pop mode

};