/*****************************************************
*
* JsKit Util
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
* #Require	 : /base/JskitBase.js
******************************************************/
function JskitUtil(){
	//#Begin public Methods
	this.switchEnterPress = function(rKeyCode){
		if(event.keyCode==13){
			 event.keyCode=rKeyCode;
		}
	};
	this.guid = function(){
		var _guid = "";
		for(var i=1;i<=32;i++){
			_guid += Math.floor(Math.random() * 16.0).toString(16);
			if((i==8)||(i==12)||(i==16)||(i==20)){_guid += "_";}
		}
		return _guid;
	};
	this.getFunctionName = function(rFunction){
		var s = rFunction.toString();
		s = s.replace(/;/gi,"");
		s = s.substr(0,s.indexOf("("));
		s = s.replace(/\(([^\)]{0,})\)/gi,"");
		s = s.replace(/function/gi,"");
		s = this.string.trim(s);
		return s;
	};
	this.rgbToHex = function(rColor){
		var re = new RegExp("(\\d*),(\\d*),(\\d*)");
		var rg = re.exec(rColor);
		var _color = new Array();
		if(rg!=null){
			var r = RegExp.$1;
			var g = RegExp.$2;
			var b = RegExp.$3;
			_color[0] = (r.toInt()<16)?"0"+r.toInt().toString(16):r.toInt().toString(16);
			_color[1] = (g.toInt()<16)?"0"+g.toInt().toString(16):g.toInt().toString(16);
			_color[2] = (b.toInt()<16)?"0"+b.toInt().toString(16):b.toInt().toString(16);
			return "#"+_color[0]+_color[1]+_color[2];
		}else{
			return rColor;
		}
	};
	//only for IE
	this.sleep = function(rMs){
		var _script = 'window.setTimeout(function(){window.close();},' + rMs + ');';
		if(window.showModalDialog){
			window.showModalDialog('javascript:document.writeln ("<script>' + _script + '</script>")');
		}
	};
	this.getTime = function(){
		var d = new Date();
		return d.getTime();
	};
	this.select = function(){
		if(arguments!=null && arguments.length>1){
			for(var i=1;i<arguments.length;i++){
				if(arguments[0]==arguments[i])
					return arguments[i];
			}
			return arguments[1];
		}
		return null;
	};
	this.Message = function(){
	    this.source = arguments[0];
	    this.text = function(){
	        var _key = arguments[0];
	        if(this.source && this.source[_key]){
	            var _value = this.source[_key];
	            for(var i=1;i<arguments.length;i++){
	                _value = _value.replace("$"+i,arguments[i]);
	            }
	            return _value;
	        }else{
	            return _key;
	        }
	    };
	};
	//#End
	
	//#Begin Private Methods
    var __Str = function(){
        this.isNullOrEmpty = function(rStr){
            return (typeof(rStr)!="string" || rStr=="undefined" || rStr=="");
        };
    };
    /*******************************
    * Url Function
    *******************************/
	var __Url = function(){
		this.__map = new Array();
		this.__getParameters = function(){
			if(this.__map.length>0)return;
			var _p = window.location.search;
			if(_p.indexOf("?")==0)_p=_p.substring(1,_p.length);
			var _kv = _p.split("&");
			for(var i=0;i<_kv.length;i++){
				var _pos = _kv[i].indexOf("=");
				var _key=_value="";
				if(_pos==-1){
					_key = _kv[i];
					_value = "";
				}else{
					_key = _kv[i].substring(0,_pos);
					_value = _kv[i].substring(_pos+1,_kv[i].length);
				}
				this.__map[_key] = _value;
			}
		},
		this.getPath = function(rTarget){
			this.__getParameters();
			var _url = window.location.href.toLowerCase();
			if(typeof(rTarget)=="string" && rTarget.length>0 && _url.indexOf(rTarget.toLowerCase())!=-1){
				return _url.substring(0,_url.indexOf(rTarget.toLowerCase()))+rTarget;
			}else{
				_url = _url.replace(window.location.search,"");
				return _url.substring(0,_url.lastIndexOf("/"));
			}
		};
		this.get = function(rKey){
			this.__getParameters();
			return this.__map[rKey];
		}
		this.host = function(rUrl){
			if(rUrl.indexOf("://")==-1){
				return "";
			}else{
				rUrl = rUrl.substr(rUrl.indexOf("://")+3);
				rUrl = rUrl.substr(0,rUrl.indexOf("/"));
				return rUrl;
			}
		}
	};
    /*******************************
    * Browser Function
    *******************************/
	var __Browser = function(){
	    this.userAgent = navigator.userAgent;
	
	    this.isMSIE = (navigator.appName == "Microsoft Internet Explorer");
	    this.isMSIE5 = this.isMSIE && (this.userAgent.indexOf('MSIE 5') != -1);
	    this.isMaxthon = (this.userAgent.toLowerCase().indexOf("maxthon")!=-1);
	    this.isIE = (this.isMSIE || this.isMSIE5 || this.isMaxthon );
	    
	    this.isGecko = this.userAgent.indexOf('Gecko') != -1;
	    this.isGecko18 = this.userAgent.indexOf('Gecko') != -1 && this.userAgent.indexOf('rv:1.8') != -1;
	    
	    this.isSafari = this.userAgent.indexOf('Safari') != -1;
	    
	    this.isOpera = this.userAgent.indexOf('Opera') != -1;
	
	    this.isMac = this.userAgent.indexOf('Mac') != -1;
	    
	    this.isNS7 = this.userAgent.indexOf('Netscape/7') != -1;
	    this.isNS71 = this.userAgent.indexOf('Netscape/7.1') != -1;
		this.info = function(){
			var _info = new Array();
			_info.push(new Array("appCodeName"		,window.navigator.appCodeName));
			_info.push(new Array("appName"			,window.navigator.appName));
			_info.push(new Array("appVersion"		,window.navigator.appVersion));
			_info.push(new Array("cookieEnabled"	,window.navigator.cookieEnabled));
			_info.push(new Array("javaEnabled"		,window.navigator.javaEnabled()));
			_info.push(new Array("platform"			,window.navigator.platform));
			_info.push(new Array("userAgent"		,window.navigator.userAgent));
			_info.push(new Array("mimeTypes"		,window.navigator.mimeTypes));
			if(typeof(window.navigator.systemLanguage)!="undefined"){
				_info.push(new Array("language"			,window.navigator.systemLanguage));
			}else{
				_info.push(new Array("language"	,window.navigator.language));
			}
			return _info;
		};
	};
    /*******************************
    * Date Function
    *******************************/
	var __DateUtil = function(){
		this.numFormat = function(rNum){
			return (rNum<10)?"0"+rNum:rNum;
		};
		this.getDateStr = function(date){
	        if(date!==null && typeof(date)==="object" && date.getDate ){
	            return (date.getFullYear()
						+"-"+this.numFormat(date.getMonth()+1)
						+"-"+this.numFormat(date.getDate())
					);
	        }else{
	            return "";
	        }
	    };
	    this.getDateTimeStr = function(date){
	        if(date!==null && typeof(date)==="object" && date.getDate ){
	            return (date.getFullYear()
						+"-"+this.numFormat(date.getMonth()+1)
						+"-"+this.numFormat(date.getDate())
						+" "+this.numFormat(date.getHours())
						+":"+this.numFormat(date.getMinutes())
						+":"+this.numFormat(date.getSeconds())
				);
	        }else{
	            return "";
	        }
	    };
	    this.getTimeStr = function(date){
	        if(date!==null && typeof(date)==="object" && date.getDate ){
	            return (date.getHours()
						+":"+this.numFormat(date.getMinutes())
						+":"+this.numFormat(date.getSeconds())
					);
	        }else{
	            return "";
	        }
	    };
	    this.timeFix = function(rDate,rFix){
	    	var _dt = this.parse(rDate);
	    	if(_dt!=null){
	   		 	_dt.setTime(_dt.getTime()+rFix);
	    	}else{
	    		_dt = null;
	    	}
	    	return _dt;
	    };
	    this.parse = function(rDt){
	        try{
	            var d = new Date();
	            if(/Date/.test(rDt.constructor)){
	                d = rDt;
	            }else if(typeof(rDt)=="string" && rDt.indexOf(":")!=-1 && rDt.indexOf("-")!=-1){ //date time
	                var arrD = rDt.split(" ")[0].split("-");
	                var arrT = rDt.split(" ")[1].split(":");
	                d.setFullYear(parseInt(arrD[0]),(parseInt(arrD[1])-1),parseInt(arrD[2]));
	                d.setHours(arrT[0],arrT[1],arrT[2]);            
	            }else if(typeof(rDt)=="string" && rDt.indexOf("-")!=-1){ //date
	                var arrd = rDt.split("-");
                    if(arrd.length==3){ //yyyy-mm-dd
						d.setFullYear(arrd[0],(arrd[1]-1),arrd[2]);
					}else{ //yyyy-mm
						d.setFullYear(arrd[0],(arrd[1]-1));
					}
	            }else if(typeof(rDt)=="string" && rDt.indexOf(":")!=-1){ //time
	                var arrt = rDt.split(":");
	                d.setHours(parseInt(arrt[0]),parseInt(arrt[1]),parseInt(arrt[2]));
	            }else{
					d = null;
	            }
	            return d;
	        }catch(e){
	            return null;
	        }
	    };
	    this.timeSpan = function (rDate1, rDate2) {
	    	var _debug = "";
	        var date1 = this.parse(rDate1);
	        var date2 = this.parse(rDate2);
	        if (date1===null || date2===null) {
	            return null;
	        } else {
	            var _y1 = date1.getFullYear();
				var _y2 = date2.getFullYear();
	            var _M1 = date1.getMonth()+1;
	            var _M2 = date2.getMonth()+1;
				var _d1 = date1.getDate();
				var _d2 = date2.getDate();
	            var _h1 = date1.getHours();
	            var _h2 = date2.getHours();
	            var _m1 = date1.getMinutes();
	            var _m2 = date2.getMinutes();
	            var _s1 = date1.getSeconds();
	            var _s2 = date2.getSeconds();
	            var _ms1 = date1.getMilliseconds();
	            var _ms2 = date2.getMilliseconds();
	
				var ts = date2.getTime() - date1.getTime();
	            var _span = new Array();
	            
	 			var _totalYear   = _span["totalYear"]   = _span["year"] = _y2 - _y1;
	
				var _totalMilliSecond = _span["totalMilliSecond"] = ts;
	            var _millisecond = _span["milliSecond"]      = (_totalSecond>0)?_ms1:0;//(_ms1>_ms2)?(_ms2-_ms1+1000):(_ms2-_ms1);
				
				var _sx = (_ms1-_ms2>0)?1:0;
				var _totalSecond = _span["totalSecond"] = parseInt(ts / 1000);
	            var _second      = _span["second"]      = (_totalSecond>0)?((_s1>=_s2)?(_s2-_s1+60-_sx):(_s2-_s1-_sx)):0;
	            if(_second>=60){_second = _span["second"] = 0;}
	            
				var _mx = (_s1-_s2>0)?1:0;
	            var _totalMinute = _span["totalMinute"] = parseInt(ts / (1000 * 60));
				var _minute      = _span["minute"]      = (_totalMinute>0)?((_m1>=_m2)?(_m2-_m1+60-_mx):(_m2-_m1-_mx)):0;
	            if(_minute>=60){_minute = _span["minute"] = 0;}
	            
				var _hx = (_m1+_mx-_m2>0)?1:0;
	            var _totalHour   = _span["totalHour"]   = parseInt(ts / (1000 * 60 * 60));
	            var _hour        = _span["hour"]        = (_h1>=_h2)?(_h2-_h1+24-_hx):(_h2-_h1-_hx);
	            if(_hour>=24){_hour = _span["hour"] = 0;}
	            
	
				var _dx = (_h1+_hx-_h2>0)?1:0;
				var _totalDay    = _span["totalDay"]    = parseInt(ts / (1000 * 60 * 60 * 24));
	            var _day         = _span["day"]         = (_totalDay>0)?((_d1>=_d2)?0:(_d2-_d1-_dx)):0;	
	
	            var _totalMonth  = _span["totalMonth"]  = (_y2 -_y1) * 12 + _M2 - _M1;
	            var _month       = _span["month"]       = (_totalMonth>0)?((_M1>=_M2)?0:(_M2-_M1)):0;
	
				var _totalWeek   = _span["totalWeek"]   = parseInt(ts / (1000 * 60 * 60 * 24) / 7);
	            
	            _span["debug"] = _debug;
	            
				return _span;
	        }
	    };
	};
    /*******************************
    * Html Document Function
    *******************************/
	var __DocumentUtil = function(){
	    this.htmlView = function(rCode,rCharset){
	        var _codeWin = window.open("","JskitCodeViewer","menubar=no,toolbar=no,scrollbars=yes,resizable=yes,left=20,top=20");
	        if(_codeWin){
	            if(rCharset==null)rCharset="uft-8";
	            var _code =rCode+"";
				//_code = _code.encodeHtml();
	            var _html = "";
	            _html += '<html xmlns="http://www.w3.org/1999/xhtml">';
	            _html += '<head>';
	            _html += '<title>Jskit Code Viewer</title>';
	            _html += '<meta http-equiv="Content-Type" content="text/html; charset='+rCharset+'">';
	            _html += '</head>';
	            if(_code.indexOf("</BODY>")!=-1 || _code.indexOf("</body>")!=-1){
	                _html += _code;
	            }else{
	                _html += "<body>"+_code+"</body>";
	            }
	            _html += '</html>';
	            
	            _codeWin.document.write(_html);
	            _codeWin.document.close();
	            _codeWin.focus();
	        }else{
	            alert("open html viewer failed!");
	        }
	    };
	    this.view = function(rTitle,rCharset,rHead,rBody,rWinPrams){
			if(typeof(rWinPrams)!="string"){rWinPrams="menubar=no,toolbar=no,scrollbars=yes,resizable=yes,left=20,top=20";}
	        var _codeWin = window.open("","JskitCodeViewer",rWinPrams);
	        if(_codeWin){
	            if(rCharset==null)rCharset="uft-8";
	            var _code =rBody+"";
				//_code = _code.encodeHtml();
	            var _html = "";
	            _html += '<html xmlns="http://www.w3.org/1999/xhtml">';
	            _html += '<head>';
	            _html += '<meta http-equiv="Content-Type" content="text/html; charset='+rCharset+'">';
	            _html += '<title>'+rTitle+'</title>';
				_html += rHead;
	            _html += '</head>';
	            if(_code.indexOf("</BODY>")!=-1 || _code.indexOf("</body>")!=-1){
	                _html += _code;
	            }else{
	                _html += "<body>"+_code+"</body>";
	            }
	            _html += '</html>';
	            
	            _codeWin.document.write(_html);
	            _codeWin.document.close();
	            _codeWin.focus();
	        }else{
	            alert("open html viewer failed!");
	        }
	    };
	    this.importCssFile = function(rCssFileUrl) {
	        if (rCssFileUrl === ""){return;}
	        if (typeof(document.createStyleSheet) == "undefined") {
	            var elm = doc.createElement("link");
	            elm.rel = "stylesheet";
	            elm.href = rCssFileUrl;
	            if ( (headArr=$("head"))!==null && headArr.length>0 ){
	                headArr[0].appendChild(elm);
	            }
	        }else{
	            document.createStyleSheet(rCssFileUrl);
	        }
	    };
	    // #ABANDON: get absolute Left(x) position
	    this.getX = function( ob ){
	        try{
				var curOb = ob;
				var ableft = curOb.offsetLeft;
				while( curOb !== null && curOb.offsetParent !== null && curOb.offsetParent.tagName !== "BODY" ){
					ableft += curOb.offsetParent.offsetLeft;
					curOb = curOb.offsetParent;
				}
		        return ableft;
			}catch(e){
				return NaN;
			}
	    };
	    // #ABANDON: get absolute TOP(y) position
	    this.getY = function( ob ){
			try{
				var curOb = ob;
				var abtop = curOb.offsetTop;
				while( curOb !== null && curOb.offsetParent !== null && curOb.offsetParent.tagName !== "BODY" ){
					abtop += curOb.offsetParent.offsetTop;
					curOb = curOb.offsetParent;
				}
				return abtop;
			}catch(e){
				return NaN;
			}
	    };    
		this.centreDiv = function(rWidth,rHeight,rClassName){
			rWidth = (typeof(rWidth)=="number")?rWidth:100;
			rHeight = (typeof(rHeight)=="number")?rHeight:100;
			var div = document.createElement("div");
			if($("body")!=null){
				$("body").appendChild(div);
				div.style.position = "absolute";
				div.style.width = rWidth;
				div.style.height = rHeight;
				if(typeof(rClassName)=="string")
					div.className = rClassName;
				div.style.left = (document.documentElement.clientWidth-rWidth)/2;
				div.style.top = (document.documentElement.clientWidth-rHeight)/2;
			}
			return div;
		};
		this.newDiv = function(rWidth,rHeight,rLeft,rTop){
			var div = document.createElement("div");
			if($("body")!=null){
				$("body").appendChild(div);
				div.setAttribute("id",this.guid());
				if((typeof(rWidth)=="number"))
					div.style.width = rWidth;
				if(typeof(rHeight)=="number")
					div.style.height = rHeight;
				if(typeof(rLeft)=="number")
					div.style.left = rLeft;
				if(typeof(rTop)=="number")
					div.style.top = rTop;
			}
			return div;
		};
		this.fullDiv = function(){
			var div = document.createElement("div");
			if($("body")!=null){
				$("body").appendChild(div);
				div.setAttribute("id",this.guid());
				div.style.width = $("body").clientWidth;
				div.style.height = $("body").clientHeight;
			}
			return div;
		};
		this.pop = function(rPanel,rSrcObj,rHtmlContent,rParms){
			var panel = rPanel;
			if(panel==null){
				panel = document.createElement("div");
				panel.style.position = "absolute";
			}
			var parms = new Array();
			if(typeof(rParms)=="string"){
				try{
					var _parms = rParms.split(',');
					var _tmp = null;
					for(var i=0;i<_parms.length;i++){
						_tmp = _parms[i].split('=');
						parms[_tmp[0].toLowerCase()] = _tmp[1];
					}
					_parms = null;
				}catch(e){}
			}
			var _width = -1;
			var _height = -1;
			if(typeof(parms["width"])!="undefined"){
				_width = parseFloat(parms["width"]);
			}
			if(typeof(parms["height"])!="undefined"){
				_height = parseFloat(parms["height"]);
			}
			var _left = 100;
			var _top = 100;
			var _fix = 1;
			if(rSrcObj!=null && typeof(rSrcObj)=="object" && typeof(parms["position"])!="undefined"){
				var _left = this.getX(rSrcObj);
				var _top = this.getY(rSrcObj);
				if(parms["position"]=="1" || parms["position"]=="up"){
					_top = _top - rSrcObj.offsetHeight+_fix;																	
				}else if(parms["position"]=="2" || parms["position"]=="right"){
					_left = _left + rSrcObj.offsetWidth-_fix;																	
				}else if(parms["position"]=="3" || parms["position"]=="down"){
					_top = _top + rSrcObj.offsetHeight-_fix;																	
				}else if(parms["position"]=="4" || parms["position"]=="left"){
					_left = _left - rSrcObj.offsetWidth+_fix;																	
				}
			}else{
				if(typeof(parms["left"])!="undefined"){
					_left = parseFloat(parms["left"]);
				}
				if(typeof(parms["top"])!="undefined"){
					_top = parseFloat(parms["top"]);
				}
			}
			var _overflow = "auto";
			if(typeof(parms["scrolling"])!="undefined"){
				_overflow = (parms["scrolling"]=="yes" || parms["scrolling"]=="1")?"scroll":"hidden";
			}
			if(_width>0){
				panel.style.width = _width+"px";
			}
			if(_height>0){
				panel.style.height = _height+"px";
			}
			panel.style.left = _left+"px";
			panel.style.top = _top+"px";
			panel.style.overflow = _overflow;
			panel.style.display = "block";
			panel.innerHTML = '<iframe style="position:absolute;left:0px;top:0px;display:none;z-index:-1000;width:'+_width+';height:'+_height+'"></iframe>'+rHtmlContent;
			_width = _height = _height = _top = _overflow = parms = null;
			if($("body")!=null){
				$("body").appendChild(panel);
			}
			return panel;
		};
		//resize image when loaded
		this.resizeImageOnLoad = function(img,ifChangeParent){
			if(img==null || img.tagName!="IMG"){return true;}
			try{
				var parent = img.parentNode;
				var iw = img.offsetWidth;
				var ih = img.offsetHeight;
				var pw = parent.offsetWidth;
				var ph = parent.offsetHeight;
				var ow = iw;
				var oh = ih;
				if(iw>pw || ih>ph){
					if(iw/ih > pw/ph){
						iw = pw-2;
						ih = (iw/ow)*ih;
						ph = ih;
					}else{
						ih = ph-2;
						iw = (ih/oh)*iw;
						pw = iw;
					}
					img.style.width = iw+"px";
					img.style.height = ih+"px";
					if(ifChangeParent){
						parent.style.width = pw+"px";
						parent.style.height = ph+"px";
					}
				}
				iw = ih = ph = pw = img = parent = null;
			}catch(e){}
			return true;
		};
	};
	/*#End ==================================================*/
	/*#Begin Dom package ====================================*/
	var __Html = function(){
		this.table = function(rR,rC,rCellContent){
			var t = document.createElement("table");
			var tb = document.createElement("tbody");
			for(var i=0;i<rR;i++){
				var r = document.createElement("tr");
				for(var j=0;j<rC;j++){
					var c = document.createElement("td");
					r.appendChild(c);
					if(typeof(rCellContent)=="string"){
						c.innerHTML = rCellContent;
					}
				}
				tb.appendChild(r);
			}
			t.appendChild(tb);
			return t;
		};
	};
	/*#End ==================================================*/
	/*#Begin Dom package ====================================*/
    /*******************************
    * Html DOM Function
    *******************************/
	var __HtmlDom = function(){
	    this.getValue = function(rElementId){
	        var _obj = this.getEelementById(rElementId);
	        return (_obj!==null)?_obj.value:"";
	    };
	    this.setValue = function(rElementId,rValue){
	        var _obj = this.getEelementById(rElementId);
	        if(_obj!==null){_obj.value=rValue;}
	    };
	    this.removeObjectById = function(rId){
	        var _obj = $("#"+rId);
	        if(_obj!=null && _obj.parentNode!=null){
	            _obj.parentNode.removeChild(_obj);
	        }
	    };
	    this.insertAfter = function(rObj1,rObj2){
			if(typeof(rObj1)=="object" && typeof(rObj2)=="object"){
				var _parent = rObj2.parentNode;
				if(rObj2.nextSibling!=null){
					var _next = rObj2.nextSibling;
					_parent.insertBefore(rObj1,_next);
				}else{
					_parent.appendChild(rObj1);
				}
			} 
	    };
	    this.insertNode = function(rParent,rObj1,rIndex){
	        try{
	            if(rIndex>=rParent.childNodes.length-1){
	                rParent.appendChild(rObj1);
	            }else{
	                var _child = rParent.childNodes[rIndex+1];
	                rParent.insertBefore(rObj1,rObj2);
	            }
	        }catch(e){}
	    };
		this.hasForefather = function(rObj,rFfId){
			if(rObj==null){return false;}
			var curOb = rObj;
			while( curOb !== null && curOb.tagName !== "BODY" ){
				if(curOb.getAttribute("id")==rFfId ){
					return true;
				}
				curOb = curOb.parentNode;
			}
			return false;
		};
	};
	//#End
	this.date = new __DateUtil();
    this.dom = new __HtmlDom();
    this.doc = new __DocumentUtil();
    this.browser = new __Browser();
    this.url = new __Url();
    this.html = new __Html();
    this.str = new __Str();
}
//#Begin Ext-Protect Methods!
/* MD5 Message-Digest Algorithm - JavaScript */
JskitUtil.prototype.md5 = function(sMessage) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32-iShiftBits));
    }
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else return (lResult ^ lX8 ^ lY8);
    }
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(sMessage) {
        var lWordCount;
        var lMessageLength = sMessage.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    }
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    }
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    // Steps 1 and 2. Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);
    // Step 3. Initialise
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    // Step 4. Process the message in 16-word blocks
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
    }
    // Step 5. Output the 128 bit digest
    return (WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d)).toUpperCase();
}
//#End
var jskitUtil = new JskitUtil();