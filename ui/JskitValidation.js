/*******************************************
 * Jskit (Form) Validation
 *
 * #Author       : AnyRock
 * #Email        : jiang.edwon@gmail.com
 * #QQ			 : 499199
 * #Homepage     : http://www.mending.cn
 * #LastModified : 2006-12-08
 *
 * #Require		 : /base/JskitBase.js
 * 				 : /base/JskitUtil.js
 * 				 : /base/JskitXml.js
 * 				 : /base/jskitEvents.js
 ********************************************/
function JskitValidation(rHd){
    var __hd = (typeof(rHd) != "string") ? "jskitValidation" : rHd;
    
    //#Begin Structure
    var __VALIDATOR = new function(){
        this.QUERY = "query";
        this.REQUIRED = "required";
        this.REGEX = "regex";
        this.EQUAL = "equal";
        this.COMPARE = "compare";
        this.INTEGER = "integer";
        this.FLOAT = "float";
        this.EMAIL = "email";
		this.CHECK = "check";
        this.MONEY = "money";
        this.DATETIME = "datetime";
    };
    var __ValidationObject = function(){
        this.validator = null;
        this.id = null;
        this.objXPath = null;
        this.obj = null;
        this.comparerXPath = null;
        this.comparer = null;
        this.expression = null;//compare expression
        this.pattern = null;
        this.msg = null;
		this.value = function(){
			if(this.obj && this.obj.value){
				return this.obj.value;
			}else{
				return "";
			}
		};
		this.count = function(){
			if(this.obj==null)return 0;
			if(this.obj.length){
				return this.obj.length;
			}else{
				return 1;
			}
		};
		this.setValue = function(v){
			if(this.obj){
				this.obj.value = v;
			}
		};
    };
    var __PATTERN = new function(){
        this.INTEGER = "^-?\\d+$";
        this.FLOAT = "^(-?\\d+)(\\.\\d+)?$";
        this.EMAIL = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
        this.CHINESE = "^[\\u4e00-\\u9fa5]+$";
        this.UTF16 = "^[^\\x00-\\xff]+$";
        this.SPACELINE = "\\n\\s*\\r";
        this.HTML = "<(\\S*?)[^>]*>.*?</\\1>|<.*? />";
        this.TRIM = "^\\s*|\\s*$";
        this.MONEY = "^[1-9][0-9]{0,}\\.[0-9]{2}$";
    };
    var __errorLogs = new Array();
    //#End
    
    //#Begin Public attributes
    //error message output type:alert|alert_once|before|after|up|down|object
    var __display = "alert";
    this.setDisplay = function(v){
        __display = v;
    };
    //output viewer object
    var __displayer = null;
    this.setDisplayer = function(v){
        __displayer = v;
    };
    //errinfo css class
    var __errorCssClass = "";
    this.setErrorCssClass = function(v){
        __errorCssClass = v;
    };
    //errinfo style string
    var __errorStyleString = "";
    this.setErrorStyleString = function(v){
        __errorStyleString = v;
    };
    //when error catched,page forward
    var __errorForward = "";
    this.setErrorForward = function(v){
        __errorForward = v;
    };
	var __realTime = false;
	this.setRealTime = function(v){
		__realTime = (v==true);
	};
    var __showError = true;
    this.setShowError = function(v){
        __showError = (v==true);
    };
	var __MaxLengthCheck = true;
	this.setMaxLengthCheck = function(v){
		__MaxLengthCheck = (v==true);
	};

    var __settingData = null;
    var __settingType = null;
    //#End
    
    //#Begin Private attributes
    var __vo = null;
    var __alertTimes = 0;
    var __tasks = new Array();
    //#End
    
    //#Begin Private methods
    var __error = function(msg){
        __errorLogs.push(msg);
    };
    var __regexTest = function(rValue, rPattern){
        var _reg = new RegExp(rPattern);
        _reg.global = true;
        _reg.ignoreCase = true;
        return _reg.test(rValue);
    };
    var __getMsgHtml = function(){
        if (__display == "up") {
            return __vo.msg + "<br />";
        }else{ 
            if (__display == "down") {
                return "<br />" + __vo.msg;
            }
            else {
                return __vo.msg;
            }
		}
    };
    var __appendMsgObject = function(){
        var _obj = __getMsgObj(__vo.id);
        _obj.style.display = "inline";
        _obj.innerHTML = __getMsgHtml();
		var _item = (__vo.count()>1)?__vo.obj[0]:__vo.obj;
		var _parent = _item.parentNode;
        if (__display == "before" || __display == "up") {
            _parent.insertBefore(_obj, _item);
        }else {
            if (__display == "after" || __display == "down") {
                if (!__vo.count() && _item.nextSibling != null) {
                    _parent.insertBefore(_obj, _item.nextSibling);
                }
                else {
                    _parent.appendChild(_obj);
                }
            }
		}   
        _obj = _item = null;
    };
    var __getMsgObj = function(vId){
        var _obj = $$("#v_err_" + vId);
        if (_obj === null) {
            _obj = document.createElement("span");
            _obj.id = "v_err_" + vId;
            _obj.className = __errorCssClass;
            _obj.style.cssText = __errorStyleString;
        }
        return _obj;
    };
    var __isMsgOpen = function(rObj){
        return (rObj.style.display != "none" && rObj.style.display != "");
    };
	var __setFocusAfterCheck = function(){
		if(__realTime)return;
		try{
			if(__vo.count()>1){
				__vo.obj[0].focus();
			}else if(__vo.count()==1){
				__vo.obj.focus();
			}
		}catch(e){}
	};
    var __displayMessage = function(){
        var _err = __getMsgObj(__vo.id);
        if (__isMsgOpen(_err)) {
            _err.innerHTML = __getMsgHtml();
            return;
        }
        if (__display == "object" && __displayer !== null) {
            __displayer.innerHTML = __vo.msg;
        }else{ 
            if (__display == "before" || __display == "up") {
                __appendMsgObject();
                __setFocusAfterCheck();
            }else if (__display == "after" || __display == "down") {
				__appendMsgObject();
				__setFocusAfterCheck();
            }else if (__display == "page") {
                window.navigate(__errorForward);
            }else {//alert
				if (__alertTimes == 0) {
					alert(__vo.msg);
					__alertTimes++;
				}
				__setFocusAfterCheck();
			}
		}
        _err = null;
    };
    var __cleanMessage = function(){
        if (__display == "object" && __displayer !== null) {
            __displayer.innerHTML = "";
        } else {
            var _err = __getMsgObj(__vo.id);
            _err.innerHTML = "";
            _err.style.display = "none";
            _err = null;
        }
    };
    var __v_query = function(){
        var _func = __vo.pattern;
        if (_func.match(/\\([\w-]+\\)"/) == null) {
            _func = _func.replace("(", "(__vo.obj");
        } else {
            _func = _func.replace("(", "(__vo.obj,");
        }
        eval("__vo.msg = " + _func + ";");
        if (typeof(__vo.msg) == "string" && __vo.msg.length > 0) {
            __displayMessage();
            return 1;
        }
        __cleanMessage();
        return 0;
    };
    var __v_check = function(){
		var _checked = false;
		try{
			for(var i=0;i<__vo.count();i++){
				if(__vo.obj[i].checked){
		            _checked = true;
					break;
				}
			}
		}catch(e){
		}
		if(!_checked){
			__displayMessage();
			_checked = null;
            return 1;
		}
        __cleanMessage();
        return 0;
    };
    var __v_required = function(){
        if (__vo.value().trim() === "") {
            __displayMessage();
            return 1;
        }
        __cleanMessage();
        return 0;
    };
    var __v_regex = function(rPattern){
        if(__vo.value().trim()=="")return 0;
        if (typeof(rPattern) == "string") 
            __vo.pattern = rPattern;
        var _reg = new RegExp(__vo.pattern);
        _reg.global = true;
        _reg.ignoreCase = true;
        var ret = _reg.test(__vo.value());
        if (ret !== true) {
            __displayMessage();
            return 1;
        }
        __cleanMessage();
        return 0;
    };
    var __v_compare = function(rExpression){
        if (typeof(rExpression) == "string") 
            __vo.expression = rExpression;
        try{
            var _result = eval("__vo.value()" + __vo.expression + "__vo.comparer.value");
        }catch(e){
            alert(e.message);
            return 1;
        }
        if (!_result) {
            __displayMessage();
            return 1;
        }
        __cleanMessage();
        return 0;
    };
	var __v_datetime = function(){
		//no good method now
        return 0;
	};
	var __MaxLengthErrorMessage = unescape("?%u8F93%u5165%u7684%u5185%u5BB9%u8D85%u8FC7%u4E86%u6700%u5927%u7684%u957F%u5EA6%u8981%u6C42%uFF0C%u8BF7%u8F93%u5165%u5C0F%u4E8E?%u4E2A%u5B57%u7B26%u7684%u5185%u5BB9\n%uFF08%u6BCF%u4E2A%u6C49%u5B57%u76F8%u5F53%u4E8E%u4E24%u4E2A%u5B57%u7B26%uFF09");
	var __validateMaxLength = function(){
		//check all input element whitin MaxLength attribute
		var _nl = $$("input[@maxlength]");
		if(_nl!=null && _nl.length){
			var len = null;
			var max = null;
			var item = null;
			var title = null;
			for(var i=0;i<_nl.length;i++){
				item = _nl[i];
				max = parseInt(item.getAttribute("maxlength"));
				if(max==2147483647){continue;}
				title = item.getAttribute("title");
				title = (typeof(title)!="string")?title="":"["+title+"]";
				if(!isNaN(max)){
					len = item.value.getByteLength();
					if(len>max){
						alert(__MaxLengthErrorMessage.replace(/\?/,title).replace(/\?/,"["+max+"]"));
						item.focus();
						return 1;
					}
				}
			}
			_nl = item = max = len = null;
		}
		return 0;
	};
    var __doValidate = function(){
        switch (__vo.validator) {
            case __VALIDATOR.QUERY:
                return __v_query();
            case __VALIDATOR.REQUIRED:
                return __v_required();
            case __VALIDATOR.EQUAL:
                return __v_compare("==");
            case __VALIDATOR.COMPARE:
                return __v_compare();
            case __VALIDATOR.REGEX:
                return __v_regex();
            case __VALIDATOR.INTEGER:
                return __v_regex(__PATTERN.INTEGER);
            case __VALIDATOR.FLOAT:
                return __v_regex(__PATTERN.FLOAT);
            case __VALIDATOR.EMAIL:
                return __v_regex(__PATTERN.EMAIL);
            case __VALIDATOR.CHECK:
                return __v_check();
            case __VALIDATOR.MONEY:
                return __v_regex(__PATTERN.MONEY);
            case __VALIDATOR.DATETIME:
                return __v_datetime();
            default:
                return __v_required();
        }
    };
    var __getObj = function(rXPath,rValidator){
		if(rXPath==""){return null;}
        var _o = $$(rXPath);
        if(_o!=null){
            if(typeof(_o.length)=="number" && _o.length>0 && rValidator!=__VALIDATOR.CHECK){
                return _o[0];
            }else{
                return _o;
            }
        }else{
            return null;
        }
    };
    var __pushTask = function(rValidator, rObjXPath, rMsg, rPattern, rObj2XPath, rExpression){
		if(typeof(rObjXPath)!="string" || rObjXPath.trim()=="")return;
        var _vo = new __ValidationObject();
        if (typeof(JskitUtil) != "undefined") {
            _vo.id = jskitUtil.guid();
            _ju = null;
        }
        else {
            _vo = null;
            return;
        }
        _vo.validator = rValidator;
        _vo.objXPath = rObjXPath;
        _vo.obj = __getObj(rObjXPath,rValidator);
		if(_vo.obj==null){
			//__error("invalid xpath("+rObjXPath+") with  validator:"+rValidator);
			return;
		}

		if(__realTime && typeof(_vo.obj.length)=="undefined"){
	        _vo.obj.setAttribute("validator", _vo.id);
            jskitEvents.add(_vo.obj, "onblur", __hd + ".check");
		}
        
		if(__VALIDATOR.COMPARE==rValidator || __VALIDATOR.EQUAL==rValidator){
			_vo.comparerXPath = rObj2XPath;
			_vo.comparer = __getObj(rObj2XPath,rValidator);
		}
        
        _vo.msg = rMsg;
        _vo.pattern = rPattern;
        _vo.expression = rExpression;
        
        __tasks.push(_vo);
        _vo = null;
    };
    var __addTaskFromArray = function(){
        var _l = null;
        //for firefox
//        for (var i = 0; i < __settingData.length; i++) {
//            _l = __settingData[i];
//            __pushTask(_l[0], _l[1], _l[2], _l[3], _l[4], _l[5]);
//        }
        //for IE
        for (var i = __settingData.length-1; i >=0; i--) {
            _l = __settingData[i];
            __pushTask(_l[0], _l[1], _l[2], _l[3], _l[4], _l[5]);
        }
        _l = null;
    };
    var __addTaskFromXml = function(){
        var _nl = __settingData.selectNodes("//JskitValidation/field");
        var _xpath = null;
        var _validator = null;
        var _campare = null;
        var _pattern = null;
        var _message = null;
        for (var i = 0; i < _nl.length; i++) {
            _xpath = jskitXml.childNodeText(_nl[i], "xpath");
            _validator = jskitXml.childNodeText(_nl[i], "validator");
            _campare = jskitXml.childNodeText(_nl[i], "campare");
            _message = jskitXml.childNodeText(_nl[i], "message");
            _pattern = jskitXml.childNodeText(_nl[i], "pattern");
            _expression = jskitXml.childNodeText(_nl[i], "expression");
            __pushTask(_validator, _xpath, _message, _pattern, _campare, _expression);
        }
        _nl = _xpath = _validator = _campare = _pattern = _message = _expression = null;
    };

    //#End(Private Methods)
    
    //#Begin public Methods
    this.cleanMessageAll = function(){
        if (__display == "object" && __displayer !== null) {
            __displayer.innerHTML = "";
        }
        else {
            for (var i = 0; i < __tasks.length; i = i + 1) {
                var _err = __getMsgObj(__tasks[i].id);
                _err.innerHTML = "";
                _err.style.display = "none";
            }
        }
    };
    this.check = function(){
        __vo = null;
        var id = event.srcElement.getAttribute("validator");
        for (var i = 0; i < __tasks.length; i = i + 1) {
            if (__tasks[i].id == id) {
                __vo = __tasks[i];
                return __doValidate();
            }
        }
        return true;
    };
    this.checkAll = function(){
        var bk = 0;
        __alertTimes = 0;
		try{
			if(__MaxLengthCheck){
				bk += __validateMaxLength();
			}
			for (var i = __tasks.length-1; i >=0; i = i - 1) {
				if(bk>0 && __display=="alert"){
					return false;
				}
				__vo = __tasks[i];
				bk += parseInt(__doValidate());
				__vo = null;
			}
			return (bk == 0);
		}catch(e){
			alert(e.message);
			return false;
		}
    };
	this.onFormSubmit = function(sender,e){
		return this.checkAll();
	};
    this.loadXml = function(rXmlPath){
        var _xmDoc = jskitXml.load(rXmlPath);
        __settingData = _xmDoc;
        __settingType = "xml";
        _xmDoc = null;
    };
    this.load = function(rArr){
        __settingData = rArr;
        __settingType = "array";
    };
    this.getErrorLogs = function(){
        return __errorLogs;
    };
	this.onLoad = function(data,formId){
		if(typeof(data)!="object"){return true;}
		this.load(data);
		this.deploy();
		var frm = $$("#"+formId);
		if(frm==null){
		    frm = $$("form")[0];
		}
		if(frm!=null){
		    jskitEvents.add(frm,"onsubmit",__hd+".onFormSubmit(this,event)");
		}else{
		    alert("JskitValidation:onLoad:Form Element not found!");
		    return true;
		}
	};
    this.deploy = function(){
        if (__settingType == "array") {
            __addTaskFromArray();
        } else {
            if (__settingType == "xml") {
                __addTaskFromXml();
            }
		}
        if(__errorLogs.length>0 && __showError){
            alert("JskitValidation errors on deploy:\n"+__errorLogs.join('\n'));
        }
    };
    //#End
    
    //#Beging extend public methods
	this.isMatch = function(rValue,rPattern,rG,rI){
        var _reg = new RegExp(rPattern);
        _reg.global = (typeof(rG)=="boolean")?rG:true;
        _reg.ignoreCase = (typeof(rI)=="boolean")?rG:true;
        return _reg.test(rValue);
    };
	this.isEmail = function(rValue){
        return __regexTest(rValue, __PATTERN.EMAIL);
    };
    this.isChinese = function(rValue){
        return __regexTest(rValue, __PATTERN.CHINESE);
    };
    this.isInteger = function(rValue){
        return __regexTest(rValue, __PATTERN.INTEGER);
    };
    this.isFloat = function(rValue){
        return __regexTest(rValue, __PATTERN.FLOAT);
    };
	//abandoned!------------------------------------
	this.IsEmail = function(rValue){
        return __regexTest(rValue, __PATTERN.EMAIL);
    };
    this.IsChinese = function(rValue){
        return __regexTest(rValue, __PATTERN.CHINESE);
    };
    this.IsInteger = function(rValue){
        return __regexTest(rValue, __PATTERN.INTEGER);
    };
    this.IsFloat = function(rValue){
        return __regexTest(rValue, __PATTERN.FLOAT);
    };
	//abandoned!------------------------------------
    //#End
};