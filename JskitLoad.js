/*****************************************************
*
* JsKit loader
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
var $import = new function(){
	var __loadedFiles = new Array();
	var __defaultKey  = "/JskitLoad.js";
	this.setKey = function(v){
		__defaultKey = v;
	};
	var __totalFils   = 0;
	var __loadTimer   = null;
	var __checkStatus = function(){
		var _info = "["+__loadedFiles.length+"/"+__totalFils+"]";
		if(__loadedFiles.length>=__totalFils){
			_info += "Finished!";
			window.clearInterval(__loadTimer);
		}else{
			_info += __loadedFiles[__loadedFiles.length-1]+"ok";
		}
		window.status = _info;
	};
	this.check = function(){
		var _str = "";
		for(var i=0;i<__loadedFiles.length;i++){
			_str += "\n"+__loadedFiles[i];
		}
		alert(_str);
	};
	this.path = function(rKey) {
		if(typeof(rKey)!="string"){rKey = __defaultKey;}
		var _path = "";
		var elements = document.getElementsByTagName("script");
		var len = elements.length;
		//get base url from the 'src' attribute of the script tags
		for (var i=0; i<len; i=i+1) {
			if (typeof(elements[i].src)!="undefined" && elements[i].src.toLowerCase().indexOf(rKey.toLowerCase()) != -1) {
				var src = elements[i].src;
				_path = src.substring(0, src.lastIndexOf('/')+1);
				break;
			}
		}
		//get current broswer fullpath without parms
		var _fullPath = document.location.href;
		if (_fullPath.indexOf('?')!==-1)
			_fullPath = _fullPath.substring(0, _fullPath.indexOf('?'));
		_fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
		//special url with '://' or '/'
		if (_path.indexOf('://') == -1 && _path.indexOf('/')!=0) {
			var _tail = _path;
			while(_tail.indexOf("../")!=-1){
				_fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
				_tail = _tail.replace("../","");
			}
			_tail = _tail.replace("./","");
			_path = _fullPath+"/"+_tail;
		}
		return _path;
	};
	this.js = function(rUrl,rKey) {
		for (var i=0; i<__loadedFiles.length;i=i+1) {
			if (__loadedFiles[i] == rUrl){return;}
		}
		var _base = this.path(rKey);
		var _tags = "<script language=\"javascript\" type=\"text/javascript\" src=\""+ _base+rUrl + "\"></script>";
		document.write(_tags);
		__loadedFiles[__loadedFiles.length] = _tags;
	};
	this.css = function(rUrl,rKey) {
		for (var i=0; i<__loadedFiles.length; i=i+1) {
			if (__loadedFiles[i] == rUrl){return;}
		}
		var _base = this.path(rKey);
		var _tags = "<link href=\"" + _base+rUrl + "\" rel=\"stylesheet\" type=\"text/css\" />";
		document.write(_tags);
		__loadedFiles[__loadedFiles.length] = _tags;
	};
	
};//prototpye end
//jskitLoad.totalFils = 10;
//jskitLoad.loadTimer = window.setInterval("jskitLoad.__checkStatus()",100);
//#BEGIN  ==================================================================
// !!! the jskit Base
$import.js("core/JskitBase.js");
$import.js("core/JskitUtil.js");
$import.js("core/JskitXml.js");
$import.js("core/JskitEvents.js");
$import.js("core/JskitCalendar.js");
$import.js("core/JskitData.js");
$import.js("core/JskitDataSet.js");
$import.js("core/JskitLog.js");
$import.js("core/JskitDynamic.js")
$import.css("core/JskitBaseStyle.css");
//#END =====================================================================
