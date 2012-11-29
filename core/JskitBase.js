/****************************************************************************
 *
 * JsKit Base
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ****************************************************************************/
var jskitBase = new function(){
    var __hd = "jskitBase";
    
    this.author = "Jiang Xingbo";
    this.version = "1.0.1.20120713(B)";
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
        var _root = $$("#JskitInsetContainer");
        if (_root != null) {
            _root.parentNode.removeChild(_root);
        }
    };
    var __clearRootHtml = function(rCode){
        var _code = rCode.replace(/<JskitInsetContainer_root id=JskitInsetContainer>(.|\r|\n)*<\/JskitInsetContainer_root>/gmi, "");
        return _code;
    };
    this.base = function (src) {
        //xxxxxx/base/JskitBase.js
        if (typeof (JskitLoad) != "undefined") {
            return jskitLoad.path();
        }
        else {
            var key = "base/JskitBase.js";
            var _path = "";
            var elements = document.getElementsByTagName("script");
            var len = elements.length;
            for (var i = 0; i < len; i = i + 1) {
                if (typeof (elements[i].src) != "undefined" && elements[i].src.toLowerCase().indexOf(key.toLowerCase()) != -1) {
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
    };
    this.using = function (src) {
        var _base = this.base(rKey);
        var _className = this.__getClassName(src);
        if (typeof (_className) != "undefined")
            return;

        var _tags = "<script language=\"javascript\" type=\"text/javascript\" src=\"" + _base + src + "\"></script>";
        document.write(_tags);
        this.loadedFiles[this.loadedFiles.length] = _tags;
    };
    this.bindGlobalEvent = function (e) {
        //this method is useless
        return;
        if (!$jvm["event"]) {
            event = e;
            event.srcElement = e.target;
        }
        return true;
    };
    this.append = function (rObj) {
        var _root = null;
        if ($$("#JskitInsertContainer") != null) {
            _root = $$("#JskitInsertContainer");
        }
        else if ($$("body") != null) {
            var _root = document.createElement("JskitInsetContainer_root");
            _root.id = "JskitInsertContainer";
            $$("body").appendChild(_root);
        }
        else {
        }
        if (_root != null) _root.appendChild(rObj);
    };
    //#End
};

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
var $$ = function(){
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
            else if (_xpath.indexOf("#") == 0) {//$$("#divID")
                __obj = __root.getElementById(_xpath.replace("#", ""));
            }
            else if (_xpath.indexOf("@") == 0) {//$$("@fieldName"),just effect on form items
                __obj = __root.getElementsByName(_xpath.replace("@", ""));
            }
            else {
                __obj = __root.getElementsByTagName(_xpath);
            }
        }
        else {//eg.$$("div[@aa='bb']"),$$("div[@aa%'bb']")
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
							if (_expList[j][1] == "=") {
								_express = _express && (_attr == _expList[j][2]);
							}else if (_expList[j][1] == "%"){ 
								_express = _express && (_attr.indexOf(_expList[j][2]) != -1);
							}else{ 
								_express = false;
								break;
                            }
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
            return $$(rXPath, this);
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
            if (typeof(rType) != "undefined" && rType == "number") {
                return parseFloat(_value);
            }else{ 
                return _value;
            }
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
            var curOb = $$("#"+rOffSpringId);
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
};
/*
 * Global definition
 */
var $ERRORS = [];
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
var $t = new function () {
    this.isUndefined = function (v) {
        return (typeof (v) === "undefined");
    };
    this.isNullOrUndefined = function(v){
    	return (v===null || typeof(v)==="undefined");
    };
    this.isArray = function (v) {
        return (!this.isNullOrUndefined(v) && /Array/.test(v.constructor));
    };
    this.isDate = function (v) {
        return (!this.isNullOrUndefined(v) && /Date/.test(v.constructor));
    };
    this.isFunction = function (v) {
        return (!this.isNullOrUndefined(v) && /function/.test(v.constructor));
    };
    this.isObject = function (v) {
        return (!this.isNullOrUndefined(v) && /Object/.test(v.constructor));
    };
    this.isString = function (v) {
        return (!this.isNullOrUndefined(v) && /String/.test(v.constructor));
    };
    this.isBoolean = function (v) {
        return (!this.isNullOrUndefined(v) && /Boolean/.test(v.constructor));
    };
    this.isNumber = function (v) {
        return (!this.isNullOrUndefined(v) && /Number/.test(v.constructor));
    };
    this.isHTMLElement = function (v) {
        return (!this.isNullOrUndefined(v) && typeof(v.tagName) === "string");
    };
    this.isRegex = function (v) {
        return (!this.isUndefined(v) && /RegExp/.test(v.constructor));
    };
};
var $HTMLTAG = "!DOCTYPE|a|abbr|acronym|address|applet|area|b|base|basefont|bdo|big|blockquote|body|br|button|caption|center|cite|code|col|colgroup|dd|del|dir|div|dfn|dl|dt|em|fieldset|font|form|frame|frameset|h1|head|hr|html|i|iframe|img|input|ins|isindex|kbd|label|legend|li|link|map|menu|meta|noframes|noscript|object|ol|optgroup|option|p|param|pre|q|s|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|ul|var|article|aside|audio|bdi|canvas|command|datalist|details|embed|fieldset|figcaption|figure|footer|header|hgroup|keygen|mark|meter|nav|output|progress|rp|rt|ruby|section|source|summary|time|track|video|xmp";

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
	rLength = (typeof(rLength)=="number")?rLength:2;
	if(isNaN(parseFloat(this))){
		return rDefault;
	}
	var __fillZero = function(s,num){
		for(var i=0;i<num;i++){
			s += "0";
		}
		return s;
	};
	var s = this;
	if(this.indexOf(".")==-1){
		s += ".";
		return __fillZero(s,rLength);
	}else{
		var tail = s.substr(s.indexOf(".")+1);
		if(tail.length<=rLength){
			return __fillZero(s,rLength-tail.length);
		}else{
			tail = Math.round(tail.substr(0,rLength)+"."+tail.substr(rLength))+"";
			return __fillZero(s.substr(0,s.indexOf(".")+1),rLength-tail.length)+tail;
		}
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
String.prototype.isMatch = function(rPattern,rOptions){
    var regx = new RegExp(rPattern,rOptions);
    return regx.test(this);
};
String.prototype.replaceAll = function (rPattern, rNewStr,rOptions) {
    var _str = this;
    try {
        eval("_str.replace(/" + rPattern + "/" + rOptions + ",'" + rNewStr+ "');");
        return _str;
    } catch (e) { return this; }
};
String.prototype.clearOffHTML = function () {
    if(this.length>0){
		var v = this;
		var p = ["<\\s*\\!\\s*--[^>]*>","<\\s*\\!\\s*--","--\\s*>","<([^:]*:)?\\s*("+$HTMLTAG+")\\s*([^>]*>)?","</\\s*([^:]*:)?\\s*("+$HTMLTAG+")[^>]*>","<\\s*/","javascript\\s*:","vbscript\\s*:"];
		var reg = null;
		for(var i=0;i<p.length;i++){
			reg = new RegExp(p[i],"gi");
			v = v.replace(reg,"");
		}
		p = reg = null;
		return v;
	}else{return this;}
};

/*#END ====================================================================*/
/*#BEGIN ( Jskit Date definition ) =====================================*/
Date.prototype.toString = function(rFormat){
	if(rFormat==null || rFormat==''){return "";}
	var _str = rFormat;
	_str = _str.replace(/yyyy/g,this.getFullYear());
	_str = _str.replace(/yy/g,(this.getFullYear()+"").substr(2,2));
	if(this.getMonth()+1 < 10){
		_str = _str.replace(/MM/g,"0"+(this.getMonth()+1));
	}else{
		_str = _str.replace(/MM/g,(this.getMonth()+1));
	}
	if(this.getMinutes()<10){
		_str = _str.replace(/mm/g,"0"+this.getMinutes());
	}else{
		_str = _str.replace(/mm/g,this.getMinutes());
	}
	if(this.getDate() < 10){
		_str = _str.replace(/dd/g,"0"+this.getDate());
	}else{
		_str = _str.replace(/dd/g,this.getDate());
	}
	if(this.getHours()< 10){
		_str = _str.replace(/hh/g,"0"+this.getHours());
	}else{
		_str = _str.replace(/hh/g,this.getHours());
	}
	if(this.getSeconds() < 10){
		_str = _str.replace(/ss/g,"0"+this.getSeconds());
	}else{
		_str = _str.replace(/ss/g,this.getSeconds());
	}
	_str = _str.replace(/M/g,this.getMonth()+1);
	_str = _str.replace(/m/g,this.getMinutes());
	_str = _str.replace(/d/g,this.getDate());
	_str = _str.replace(/h/g,this.getHours());
	_str = _str.replace(/s/g,this.getSeconds());
	return _str;
};
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
};
/*#END ====================================================================*/
$UA = (function(WIN, UA) {
	//正则列表
	reg = {
		browser: "(msie|safari|firefox|chrome|opera)",
		shell: "(maxthon|theworld|360se|360ee|se|theworld|greenbrowser|qqbrowser)",
		os: "(windows nt|macintosh|solaris|linux)"
	},
	//ua匹配方法
	uaMatch = function(str) {
		var reg = new RegExp(str + "\\b[ \\/]?([\\w\\.]*)", "i"),
			result = UA.match(reg);
		return result ? result.slice(1) : ["", ""];
	},
	//特殊浏览器检测
	is360 = (function() {
		var result = false;
		try{
			if(external && external.twGetRunPath){
				var s = external.twGetRunPath;
				if(s && s.toLowerCase().indexOf("360se")>-1) {
					result = true;
				}
			}
		}catch(e) {
			alert(e.message);
			result = false;
		}
		return result;
	})(),
	//特殊检测maxthon返回版本号
	maxthonVer = function() {
		try {
			if (/(\d+\.\d)/.test(external.max_version)) {
				return parseFloat(RegExp['\x241']);
			}
		} catch (e) {}
	}(),
	browser = uaMatch(reg.browser),
	shell = uaMatch(reg.shell),
	os = uaMatch(reg.os);
	//修正部分IE外壳浏览器
	if (browser[0].toLowerCase() === "msie") {
		if(is360){
			shell = ["360se",""];
		} 
		else if(maxthonVer) {
			shell = ["maxthon", maxthonVer];
		}
	} 
	else if(browser[0].toLowerCase() === "safari") {
		//特殊处理sf的version
		browser[1] = uaMatch("version") + "." + browser[1];
	}
	var bi = {};
	bi.name = browser[0].toLowerCase();
	bi.ver = browser[1];
	return {
		bi : bi,
		browser: browser,
		shell: shell,
		os: os.join(",")
	};
})(window, navigator.userAgent);

//#Begin Extend Firefox methods as IE
//#[innerText]
if($UA.bi.name!="msie"){
	if (typeof(HTMLElement) == "function") {
	    HTMLElement.prototype.__defineGetter__("innerText", function(){
	        var anyString = "";
	        var childS = this.childNodes;
	        for (var i = 0; i < childS.length; i++) {
	            if (childS[i].nodeType == 1){ 
	                anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
	            }else if (childS[i].nodeType == 3) {anyString += childS[i].nodeValue;}
	        }
	        return anyString;
	    });
	    HTMLElement.prototype.__defineSetter__("innerText", function(sText){
	        this.textContent = sText;
	    });
	};
	if(window.addEventListener){
	    Event.prototype.__defineGetter__("srcElement", function () {
	        return this.target;
	    });
	};
    XMLDocument.prototype.__proto__.__defineGetter__("xml", function () {
        try {
            return new XMLSerializer().serializeToString(this);
        }
        catch (ex) {
            var d = document.createElement("div");
            d.appendChild(this.cloneNode(true));
            return d.innerHTML;
        }
    });
    Element.prototype.__proto__.__defineGetter__("xml", function () {
        try {
            return new XMLSerializer().serializeToString(this);
        }
        catch (ex) {
            var d = document.createElement("div");
            d.appendChild(this.cloneNode(true));
            return d.innerHTML;
        }
    });
    XMLDocument.prototype.__proto__.__defineGetter__("text", function () {
        return this.firstChild.textContent;
    });
    Element.prototype.__proto__.__defineGetter__("text", function () {
        return this.textContent;
    });
    XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) {
        var x = this.selectNodes(xpath);
        if (!x || x.length < 1) {
            return null;
        }
        return x[0];
    };
    XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) {
        var xpe = new XPathEvaluator();
        var nsResolver = xpe.createNSResolver((this.ownerDocument == null) ? this.documentElement : this.ownerDocument.documentElement);
        var result = xpe.evaluate(xpath, this, null, 0, null);
        var found = [];
        var res;
        while (res = result.iterateNext()) {
            found.push(res);
        }
        return found;
    };
}
//#End
