/****************************************************************************
 *
 * JsKit Base
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ****************************************************************************/
function JskitBase(rHd){
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitBase";
    
    this.author = "Jiang Xingbo";
    this.version = "0.9.20120125(B)";
    this.homepage = "http://www.jskit.org";
    this.email = "jskit.org@gmail.com";
    this.copyright = "CopyRight(c)jskit.org, All right reserved";
    this.charset = "utf-8";
    
    // runtime global ----
    this.topIndex = 99999;
    //#Begin private methods
    var __getClassName = function(src){
        return src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
    };
    var __removeJskitInsetContainer = function(){
        var _root = $("#JskitInsetContainer");
        if (_root != null) {
            _root.parentNode.removeChild(_root);
        }
    };
    var __clearRootHtml = function(rCode){
        var _code = rCode.replace(/<JskitInsetContainer_root id=JskitInsetContainer>(.|\r|\n)*<\/JskitInsetContainer_root>/gmi, "");
        return _code;
    };
    //#End
}

/*#BEGIN ( for different Jsvms ) ==========================================*/
var $jvm = new Array();
$jvm["event"] = (window.event == null) ? (typeof(window.event) != "undefined") : (typeof(window.event.repeat) != "undefined");
$jvm["document.all"] = (typeof(document.all) != "undefined");
$jvm["ActiveXObject"] = (typeof(window.ActiveXObject) != "undefined");
/*#END ====================================================================*/

/*#BEGIN ( for global variables ) =========================================*/
if (!$jvm["event"]) {
    eval("var event = new Object;");
}
/*#END ====================================================================*/

/*#BEGIN ( Get Object Method  ) ===========================================*/
function $(){//HTMLElement
    var __obj = null;
    var __root = null;
    if (arguments.length == 1) {
        __root = document;
    }
    else {
        if (arguments==null || arguments[1] == null || typeof(arguments[1]) != "object" || !arguments[1].tagName) {
            __obj = null;
        }
        __root = arguments[1];
    }
	if (arguments==null){
		__obj = null;
	}else if (typeof(arguments[0]) == "object" && typeof(arguments[0].tagName) != "undefined") {
        __obj = arguments[0];
    }
    else if (typeof(arguments[0]) != "string") {//if is not string,return it redirect
        __obj = null;
    }
    else {
        var _xpath = arguments[0];
        if (_xpath.indexOf("[") == -1) {
            if (_xpath.toLowerCase() == "body") {//<body>
                __obj = document.getElementsByTagName("body")[0];
            }
            else if (_xpath.indexOf("#") == 0) {//$("#divID")
                __obj = __root.getElementById(_xpath.replace("#", ""));
            }
            else if (_xpath.indexOf("@") == 0) {//$("@fieldName"),just effect on form items
                __obj = __root.getElementsByName(_xpath.replace("@", ""));
            }
            else {
                __obj = __root.getElementsByTagName(_xpath);
            }
        }
        else {//eg.$("div[@aa='bb']"),$("div[@aa%'bb']")
            var _re = new RegExp("^([\\w]+)\\s*\\[\\s*([^\\]]+)\\s*\\]$", "ig");
            var _g = _re.exec(_xpath);
            if (_g != null) {
                var _list = __root.getElementsByTagName(RegExp.$1);
                //get express list
                var _exps = RegExp.$2.split(',');
                var _expList = new Array();
                for (var i = 0; i < _exps.length; i++) {
                    _re = new RegExp("^\\s*@([\\w-\\.]+)\\s*([=|%])\\s*'([^']*)'\\s*$", "ig");
                    _g = _re.exec(_exps[i]);
                    if (_g != null) {
                        var _attr = RegExp.$1;
                        var _symbol = RegExp.$2;
                        var _val = RegExp.$3;
                        _expList.push(new Array(_attr, _symbol, _val));
					}else{//div[@aa]
						_re = new RegExp("^\s*@(.+)\s*$", "ig");
						_g = _re.exec(_exps[i]);
						if (_g != null) {
							var _attr = RegExp.$1;
							var _symbol = "";
							var _val = "";
							_expList.push(new Array(_attr, _symbol, _val));
						}
					}
                }
                _exps = _val = _symbol = _attr = null;
                //get obj list
                __obj = new Array();
                var _item = null;
                var _express = null;
                var _attr = null;
				for (var i = 0; i < _list.length; i++) {
                    _item = _list[i];
                    _express = true;
                    for (var j = 0; j < _expList.length; j++) {
						_attr = _item.getAttribute(_expList[j][0]);
                        if(_expList[j][1]==null || _expList[j][1]==""){
							_express = _express && (typeof(_attr)!="undefined");
						}else if(typeof(_attr)!="undefined"){
							if (_expList[j][1] == "=") 
								_express = _express && (_attr == _expList[j][2]);
							else if (_expList[j][1] == "%") 
								_express = _express && (_attr.indexOf(_expList[j][2]) != -1);
							else 
								_express = false;
								break;
						}else{
							_express = false;
							break;
						}
                    }
                    if (_express){__obj.push(_item);}
                }
                _expList = _express = _item = _list = _attr = null;
            }else{
				__obj = null;
			}
            _g = _re = null;
        }
		_xpath = __root = null;
    }
    // #begin extends element methods ---------------------------------------
    if (__obj != null && !__obj.length) {
        __obj.jskited = true;
        // get element's runtime style,
        // use currentStyle in IE ,and use defaultView.getComputedStyle in Firefox
        __obj.select = function(rXPath){
            return $(rXPath, this);
        };
        __obj.effectStyle = function(rStyle, rType){
            var _value;
            if (typeof(this.currentStyle) != "undefined") {//for IE
                var _style = rStyle.toLowerCase();
                var re = new RegExp("-([a-zA-Z]){1}");
                var g = re.exec(_style);
                if (g != null) {
                    _style = _style.replace(g[0], g[1].toUpperCase());
                }
                try {
                    _value = this.currentStyle[_style];
                } 
                catch (e) {
                    _value = "";
                }
            }
            else if (typeof(document.defaultView) != "undefined") {//for firefox
                _value = document.defaultView.getComputedStyle(this, null).getPropertyValue(rStyle);
                
            }
            else {//unknown
                _value = "null";
            }
            if (typeof(rType) != "undefined" && rType == "number") 
                return parseFloat(_value);
            else 
                return _value;
        };
        __obj.finalize = function(){
            if (this.parentNode != null) {
                this.parentNode.removeChild(__obj);
            }
        };
        __obj.clearChildren = function(){
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
        };
        __obj.getX = function(){
            try {
                var _curOb = this;
                var _ableft = _curOb.offsetLeft;
                while (_curOb !== null && _curOb.offsetParent !== null && _curOb.offsetParent.tagName !== "BODY") {
                    _ableft += _curOb.offsetParent.offsetLeft;
                    _curOb = _curOb.offsetParent;
                }
				//fix scroll
				_curOb = this;
                var _fixleft = 0;
                while (_curOb !== null && _curOb.parentNode !== null && _curOb.parentNode.tagName !== "BODY") {
					if(_curOb.parentNode.scrollLeft){
						_fixleft += _curOb.parentNode.scrollLeft;
					}
                    _curOb = _curOb.parentNode;
                }
                return _ableft-_fixleft;
            } 
            catch (e) {
                return NaN;
            }
        };
        __obj.getY = function(){
            try {
                var _curOb = this;
                var _abtop = _curOb.offsetTop;
                while (_curOb !== null && _curOb.offsetParent !== null && _curOb.offsetParent.tagName !== "BODY") {
                    _abtop += _curOb.offsetParent.offsetTop;
                    _curOb = _curOb.offsetParent;
                }
				//fix scroll
				_curOb = this;
                var _fixtop = 0;
                while (_curOb !== null && _curOb.parentNode !== null && _curOb.parentNode.tagName !== "BODY") {
					if(_curOb.parentNode.scrollTop){
						_fixtop += _curOb.parentNode.scrollTop;
					}
                    _curOb = _curOb.parentNode;
                }
                return _abtop-_fixtop;
            } 
            catch (e) {
                return NaN;
            }
        };
        __obj.getForefather = function(tagName){
            if (typeof(tagName) != "string") {
                return null;
            }
            var curOb = this;
            while (curOb !== null && curOb.parentNode !== null && curOb.parentNode.tagName.toLowerCase() !== tagName.toLowerCase()) {
                curOb = curOb.parentNode;
            }
            return curOb;
        };
        __obj.isOffSpringIn = function(rForefatherId){
            var curOb = this;
            curOb = curOb.parentNode;
            while (curOb.tagName && curOb.tagName.toLowerCase()!="body"){
                if(curOb.id==rForefatherId){return true;} 
                curOb = curOb.parentNode;
            }
            return false;
        };
        __obj.isOffSpringOrSelf = function(rForefatherId){
            return (this.isOffSpringIn(rForefatherId) || this.id==rForefatherId);
        };
        __obj.isForefatherOf = function(rOffSpringId){
            var curOb = $("#"+rOffSpringId);
            if(curOb==null)return false;
            curOb = curOb.parentNode;
            while (curOb.tagName && curOb.tagName.toLowerCase()!="body"){
                if(curOb.id==this.id){return true;}
                curOb = curOb.parentNode;
            }
            return false;
        };
        __obj.isForefatherOrSelf = function(rForefatherId){
            return (this.isForefatherOf(rForefatherId) || this.id==rForefatherId);
        };
    }
    // #end -----------------------------------------------------------------
    return __obj;
}
var $out = function(rContent){
	document.write(rContent);
};
var $outln = function(rContent){
	document.write('<div style="display:block">'+rContent+'</div>');
};
var $eval = function(rScript){
	if(window.execScript){window.execScript(rScript);}
	else{window.eval(rScript);}
};
/*#END ====================================================================*/
/*#BEGIN ( expand System Object methods ) =================================*/
//Object.prototype.clone = function(){
//	function _tmpPrototype(){};
//	_tmpPrototype.prototype = this;
//	var obj = new _tmpPrototype();
//	for(var o in obj){
//		if(typeof(obj[o])=="object")
//            obj[o] = obj[o].clone();
//	}
//	return obj;
//};
/*#END ====================================================================*/
/*#BEGIN ( expand System String methods ) =================================*/
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.encodeHtml = function(){
    var rStr = this.replace(/</gi, "&lt;");
    rStr = rStr.replace(/>/gi, "&gt;");
    return rStr;
};
String.prototype.decodeHtml = function(){
    var rStr = this.replace(/&lt;/gi, "<");
    rStr = rStr.replace(/&gt;/gi, ">");
    return rStr;
};
String.prototype.toInt = function(rDefault){
    var rStr = this.replace(/^0*/, "");
    if (isNaN(parseInt(rStr)) && typeof(rDefault) == "number") {
        return rDefault;
    }
    else {
        return parseInt(rStr);
    }
};
String.prototype.toFloat = function(rDefault){
    var rStr = this.replace(/^0*/, "");
    if (isNaN(parseFloat(rStr)) && typeof(rDefault) == "number") {
        return rDefault;
    }
    else {
        return parseFloat(rStr);
    }
};
String.prototype.toFormatFloat = function(rDefault,rLength){
    var rStr = this.replace(/^0*/, "");
	rLength = (typeof(rLength)=="number")?rLength:2;
	if(this.indexOf(".")==-1){
		return this.toInt(rDefault);
	}else{
		var tail = this.substr(this.indexOf("."));
		return (this.substr(0,this.indexOf("."))+ tail.cut(rLength+1)).toFloat(rDefault);
	}
};

String.prototype.cut = function(rLen, rTail){
    var _len = 0;
    var _str = "";
    for (var i = 0; i < this.length; i++) {
        _len = (this.charCodeAt(i) > 255) ? (_len + 2) : _len++;
        if (i >= rLen || _len > rLen) break;
        _str += this.charAt(i);
    }
    if (i < this.length && typeof(rTail) == "string") _str += rTail;
    return _str;
};
String.prototype.getByteLength = function(){
    return this.replace(/[^\x00-\xff]/g, "**").length;
};
String.prototype.select = function(){
    if (arguments != null && arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (this == arguments[i])                 
                return arguments[i];
        }
        return arguments[0];
    }
    return "";
};
String.prototype.has = function(rPattern,rOptions){
    var regx = new RegExp(rPattern,rOptions);
    return regx.test(this);
};
String.prototype.replaceAll = function (rPattern, rNewStr, rOptions) {
    var _str = this;
    try {
        var _act = "_str=_str.replace(/" + rPattern + "/" + rOptions + ",\"" + rNewStr.replace(/"/gi, "\\\"") + "\");"
        eval(_act);
        _act = null;
        return _str;
    } catch (e) { return this; }
};
/*#END ====================================================================*/
/*#BEGIN ( Jskit Date definition ) =====================================*/
Date.prototype.toJskitString = function(){
    this.dateNumberFoart = function(rNum){
        return (rNum < 10) ? "0" + rNum : rNum + "";
    };
    return this.getFullYear() +
    "-" +
    this.dateNumberFoart(this.getMonth() + 1) +
    "-" +
    this.dateNumberFoart(this.getDate()) +
    " " +
    this.dateNumberFoart(this.getHours()) +
    ":" +
    this.dateNumberFoart(this.getMinutes()) +
    ":" +
    this.dateNumberFoart(this.getSeconds())
}
/*#END ====================================================================*/

/*#BEGIN ( Jskit base methods ) ===========================================*/
// bind consistent methods on global event in firefox
JskitBase.prototype = {
    base: function(src){
        //xxxxxx/base/JskitBase.js
        if (typeof(JskitLoad) != "undefined") {
            return jskitLoad.path();
        }
        else {
            var key = "base/JskitBase.js";
            var _path = "";
            var elements = document.getElementsByTagName("script");
            var len = elements.length;
            for (var i = 0; i < len; i = i + 1) {
                if (typeof(elements[i].src) != "undefined" && elements[i].src.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                    var src = elements[i].src;
                    _path = src.substring(0, src.lastIndexOf('/') + 1);
                    break;
                }
            }
            var _fullPath = document.location.href;
            if (_fullPath.indexOf('?') !== -1) {
                _fullPath = _fullPath.substring(0, _fullPath.indexOf('?'));
            }
            _fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
            if (_path.indexOf('://') == -1 && _path.charAt(0) != '/') {
                var _tail = _path;
                while (_tail.indexOf("../") != -1) {
                    _fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
                    _tail = _tail.replace("../", "");
                }
                _tail = _tail.replace("./", "");
                _path = _fullPath + "/" + _tail;
            }
            return _path;
        }
    },
    using: function(src){
        var _base = this.base(rKey);
        var _className = this.__getClassName(src);
        if (typeof(_className) != "undefined")             
            return;
        
        var _tags = "<script language=\"javascript\" type=\"text/javascript\" src=\"" + _base + src + "\"></script>";
        document.write(_tags);
        this.loadedFiles[this.loadedFiles.length] = _tags;
    },
    bindGlobalEvent: function(e){
        //this method is useless
		return;
		if (!$jvm["event"]) {
	        event = e;
            event.srcElement = e.target;
        }
        return true;
    },
    append: function(rObj){
        var _root = null;
        if ($("#JskitInsertContainer") != null) {
            _root = $("#JskitInsertContainer");
        }
        else if ($("body") != null) {
            var _root = document.createElement("JskitInsetContainer_root");
            _root.id = "JskitInsertContainer";
            $("body").appendChild(_root);
        }
        else {
        }
        if (_root != null) _root.appendChild(rObj);
    }
}// prototype end
/*#END ====================================================================*/
/*
 * Global definition
 */
var JSKIT_ERRORS = new Array();
var jskitBase = new JskitBase("jskitBase");

//#Begin Extend Firefox methods as IE
//#[innerText]
if (typeof(HTMLElement) == "function") {
    HTMLElement.prototype.__defineGetter__("innerText", function(){
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1) 
                anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
            else if (childS[i].nodeType == 3) anyString += childS[i].nodeValue;
        }
        return anyString;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function(sText){
        this.textContent = sText;
    });
}
//#End
