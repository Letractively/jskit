/*****************************************************
*
* JsKit loader
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
function JskitLoad(){
	this.loadedFiles = new Array();
	this.defaultKey  = "/JskitLoad.js";
	this.totalFils   = 0;
	this.loadTimer   = null;
	var __checkStatus = function(){
		var _info = "["+jskitLoad.loadedFiles.length+"/"+jskitLoad.totalFils+"]";
		if(jskitLoad.loadedFiles.length>=jskitLoad.totalFils){
			_info += "Finished!";
			window.clearInterval(jskitLoad.loadTimer);
		}else{
			_info += jskitLoad.loadedFiles[jskitLoad.loadedFiles.length-1]+"ok";
		}
		window.status = _info;
	};
	this.check = function(){
		var _str = "";
		for(var i=0;i<this.loadedFiles.length;i++){
			_str += "\n"+this.loadedFiles[i];
		}
		alert(_str);
	};
	this.path = function(rKey) {
		if(typeof(rKey)!="string"){rKey = this.defaultKey;}
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
	this.loadScript = function(rUrl,rKey) {
		for (var i=0; i<this.loadedFiles.length;i=i+1) {
			if (this.loadedFiles[i] == rUrl){return;}
		}
		var _base = this.path(rKey);
		var _tags = "<script language=\"javascript\" type=\"text/javascript\" src=\""+ _base+rUrl + "\"></script>";
		document.write(_tags);
		this.loadedFiles[this.loadedFiles.length] = _tags;
	};
	this.loadCss = function(rUrl,rKey) {
		for (var i=0; i<this.loadedFiles.length; i=i+1) {
			if (this.loadedFiles[i] == rUrl){return;}
		}
		var _base = this.path(rKey);
		var _tags = "<link href=\"" + _base+rUrl + "\" rel=\"stylesheet\" type=\"text/css\" />";
		document.write(_tags);
		this.loadedFiles[this.loadedFiles.length] = _tags;
	};
	
}//prototpye end
var jskitLoad = new JskitLoad();
//jskitLoad.totalFils = 10;
//jskitLoad.loadTimer = window.setInterval("jskitLoad.__checkStatus()",100);
//#BEGIN  ==================================================================
// !!! the jskit Base
jskitLoad.loadScript("base/JskitBase.js");
jskitLoad.loadScript("base/JskitUtil.js");
jskitLoad.loadScript("base/JskitXml.js");
jskitLoad.loadScript("base/JskitEvents.js");
jskitLoad.loadScript("base/JskitCalendar.js");
jskitLoad.loadScript("base/JskitData.js");
jskitLoad.loadScript("base/JskitDataSet.js");
jskitLoad.loadScript("base/JskitLog.js");
jskitLoad.loadScript("base/JskitDynamic.js")
jskitLoad.loadCss("base/style.css");
//#END =====================================================================
