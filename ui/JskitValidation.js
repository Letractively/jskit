/*******************************************
 * Jskit (Form) Validation
 *
 * #Author       : AnyRock
 * #Email        : jiang.edwon@gmail.com
 * #QQ			 : 499199
 * #Homepage     : http://www.mending.cn
 * #LastModified : 2012-10-16
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
    	this.VOID = "void";
        this.QUERY = "query";
        this.REQUIRED = "required";
        this.REGEX = "regex";
        this.EQUAL = "equal";
        this.LENGTH = "length";
        this.COMPARE = "compare";
        this.INTEGER = "integer";
        this.FLOAT = "float";
        this.EMAIL = "email";
		this.CHECK = "check";
        this.MONEY = "money";
        this.DATETIME = "datetime";
        this.AJAX = "ajax";
        this.HTML = "html";
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
        this.oriMsg = null;//original message
        this.out = null;
        this.maxLength = 0;
        this.html = false;
        this.assignedDisplayer = null;//
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
        this.MONEY = "^[1-9][0-9]{0,}(\\.)?([0-9]{0,2})$";
    };
    var __errorLogs = new Array();
    //#End
    
    //#Begin Public attributes
    var __alertFunc = null;
    this.setAlertFunction = function(v){
    	__alertFunc = v;
    };
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
    
    var __succeedCssClass = "";
    this.setSucceedCssClass = function(v){
    	__succeedCssClass = v;
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
	var __succeedMsg = null;
	this.setSucceedMsg = function(v){
		__succeedMsg = v;
	};
	//触发单个表单项进行验证的方法，如onblur,onfocus等
	var __fireAction = null;
	this.setFireAction = function(v){
		__fireAction = (v!="")?v:null;
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
    	__refreshObjValidate(__vo.obj,__vo.id,false);
        var _err = __getMsgObj(__vo.id);
        if (__isMsgOpen(_err)) {
            _err.innerHTML = __getMsgHtml();
            return;
        }
        if (__display == "object" && __displayer !== null) {
            __displayer.innerHTML = __vo.msg;
        }else{ 
        	if(__vo.assignedDisplayer!=null){
        		__vo.assignedDisplayer.innerHTML = __vo.msg;
        		__vo.assignedDisplayer.className = __errorCssClass;
        		//__vo.obj.focus();
        	}else if (__display == "before" || __display == "up") {
                __appendMsgObject();
                __setFocusAfterCheck();
            }else if (__display == "after" || __display == "down") {
				__appendMsgObject();
				__setFocusAfterCheck();
            }else if (__display == "page") {
                window.navigate(__errorForward);
            }else {//alert
				if (__alertTimes == 0) {
					if($t.isFunction(__alertFunc)){
						__alertFunc(__vo.obj,__vo.msg);
					}else{
						alert(__vo.msg);
					}
					__alertTimes++;
					__setFocusAfterCheck();
				}
			}
		}
        _err = null;
    };
    var __cleanMessage = function(){
    	var bk = __refreshObjValidate(__vo.obj,__vo.id,true);
    	if(!bk){bk=null;return;}//there are some validate not passed;
    	if(__vo.assignedDisplayer!=null){
        	var _msg = (typeof(__succeedMsg)=="string" && __succeedMsg.length>0)?__succeedMsg:__vo.oriMsg;
    		__vo.assignedDisplayer.innerHTML = _msg;
    		__vo.assignedDisplayer.className = __succeedCssClass;
    	}else if (__display == "object" && __displayer !== null) {
            __displayer.innerHTML = "";
    		__vo.assignedDisplayer.className = __succeedCssClass;
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
    var __v_length = function(){
        if (__vo.pattern>0 && __vo.value().getByteLength()>__vo.pattern) {
            __displayMessage();
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
	var __v_regex_money = function(){
        if(__vo.value().trim()=="")return 0;
        __vo.pattern = __PATTERN.MONEY;
        var _reg = new RegExp(__vo.pattern);
        _reg.global = true;
        _reg.ignoreCase = true;
        var ret = _reg.test(__vo.value());
        if (ret !== true) {
            __displayMessage();
            return 1;
        }else{
        	var val = __vo.value();
			if(val.indexOf(".")==-1){
				__vo.setValue(val+".00");
			}else if(val.indexOf(".")==val.length-1){
				__vo.setValue(val+"00");
			}
			val = null;
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
    var __doValidate = function(){
    	//检查对象是否在运行期取消验证
    	if(__vo.obj!=null){
    		var _v = __vo.obj.getAttribute("validate");
    		if(_v!=null && _v.length>0){_v = _v.toLowerCase();}
    		if(_v==="false" || _v===false || _v==="no"){return true;}
    	}
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
            case __VALIDATOR.LENGTH:
                return __v_length();
            case __VALIDATOR.INTEGER:
                return __v_regex(__PATTERN.INTEGER);
            case __VALIDATOR.FLOAT:
                return __v_regex(__PATTERN.FLOAT);
            case __VALIDATOR.EMAIL:
                return __v_regex(__PATTERN.EMAIL);
            case __VALIDATOR.CHECK:
                return __v_check();
            case __VALIDATOR.MONEY:
                return __v_regex_money();
            case __VALIDATOR.DATETIME:
                return __v_datetime();
            case __VALIDATOR.AJAX:
            	var _sign = __vo.obj.getAttribute("ajaxSucceed");
                if(_sign==true || _sign=="true"){
                	return 0;
                }else{
                	__ajaxValidate(__vo.id);
                	return 1;
                }
            default:
                return 0;
        }
    };
    var __refreshObjValidate = function(rObj,rTaskId,rResult){
    	var _t = rObj.getAttribute("_vdtask_");
    	if(rResult){
    		_t = _t.replace(rTaskId+":1",rTaskId+":0");
    	}else{
        	_t = _t.replace(rTaskId+":0",rTaskId+":1");
    	}
    	rObj.setAttribute("_vdtask_",_t);
    	return (_t.indexOf(":1")==-1);
    };
    //Begin:: Ajax validation------------------
    var __ajax = [];
	var __displayAjaxMessage = function(rVo){
    	if(rVo.assignedDisplayer!=null){
    		rVo.assignedDisplayer.innerHTML = rVo.msg;
    		rVo.assignedDisplayer.className = __errorCssClass;
    	}else{
    		alert(rVo.msg);
    	}
	};
	var __displayAjaxWaitingMessage = function(rVo){
    	if(rVo.assignedDisplayer!=null){
    		rVo.assignedDisplayer.innerHTML = rVo.expression;
    		rVo.assignedDisplayer.className = "";
    	}
	};
    var __cleanAjaxMessage = function(rVo){
    	if(rVo.assignedDisplayer!=null){
        	var _msg = (typeof(__succeedMsg)=="string" && __succeedMsg.length>0)?__succeedMsg:rVo.oriMsg;
    		rVo.assignedDisplayer.innerHTML = _msg;
    		rVo.assignedDisplayer.className = __succeedCssClass;
    	}
    };
    var __ajaxValidate = function(taskId){
    	var _vo = __getTaskById(taskId);
    	if(_vo==null){
        	_vo.obj.setAttribute("ajaxSucceed",true);
        	return true;
    	}
    	if(_vo.obj.value.trim()==""){
    		return true;
    	}
    	_vo.obj.setAttribute("ajaxSucceed",false);
    	var _url = _vo.pattern;
    	if(typeof(_url)=="string"){
    		_url = _url.replace(/\{0\}/gi,_vo.obj.value);
    	}
        __ajax[taskId] = new JskitXmlHttpAction(_url,__hd+".ajaxCallback","text",taskId);
        __displayAjaxWaitingMessage(_vo);
        _url = null;
        _vo = null;
        return true;
    };
    this.ajaxValidate = function(taskId){
    	__ajaxValidate(taskId);
    };
    this.ajaxCallback = function(json,taskId){
    	__ajax[taskId] = null;
    	var _vo = __getTaskById(taskId);
    	if(_vo==null){return 0;}
    	json = (typeof(json)=="string")?json.toLowerCase():"";
        if (json==="true" || json=="yes" || json=="0" || json=="") {
        	_vo.obj.setAttribute("ajaxSucceed",true);
        	__cleanAjaxMessage(_vo);
            return 0;   	
        }
    	_vo.obj.setAttribute("ajaxSucceed",false);
    	__displayAjaxMessage(_vo);
        return 1;
    };
    //End:: Ajax validation------------------

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
    var __getTaskById = function(id){
    	for (var i= 0;i<__tasks.length;i++) {
    		if(id==__tasks[i].id){return __tasks[i];}
    	}
    	return null;
    };
    var __registValidatorAttr = function(rObj,rKey,rValue){
    	var v = rObj.getAttribute(rKey);
    	if(v!=""){
    		v += ","+rValue;
    	}else{
    		v = rValue;
    	}
    	rObj.setAttribute(rKey,v);
    	v = null;
    };
    var __pushTask = function(rValidator, rObjXPath, rMsg, rPattern, rObj2XPath, rExpression,rOut,rMaxLength,rHtml){
		if(typeof(rObjXPath)!="string" || rObjXPath.trim()=="")return;
        var _vo = new __ValidationObject();
        _vo.id = jskitUtil.guid();
        _vo.validator = rValidator;
        _vo.objXPath = rObjXPath;
        _vo.obj = __getObj(rObjXPath,rValidator);
		if(_vo.obj==null){
			//__error("invalid xpath("+rObjXPath+") with  validator:"+rValidator);
			return;
		}
        _vo.out = rOut;
        _vo.maxLength = (typeof(rMaxLength)=="string")?rMaxLength.toInt(0):0;
        if(_vo.maxLength>0){
        	_vo.obj.setAttribute("maxlength",_vo.maxLength);
        }
        _vo.html = (rHtml===true || rHtml==="1" || rHtml===1 || rHtml==="yes" || rHtml==="true");
		__registValidatorAttr(_vo.obj,"_vdtask_",_vo.id+":1");
		__registValidatorAttr(_vo.obj,"_validator_",_vo.validator+":1");
		if(_vo.validator==__VALIDATOR.AJAX){
	        jskitEvents.add(_vo.obj, "onblur", __hd + ".ajaxValidate(\""+_vo.id+"\")");
		}else if(__fireAction!=null && _vo.obj!=null){
	        jskitEvents.add(_vo.obj, __fireAction, __hd + ".check(\""+_vo.id+"\")");
		}else if(__realTime){
	        jskitEvents.add(_vo.obj, "onblur", __hd + ".check(\""+_vo.id+"\")");
		}
        
		if(__VALIDATOR.COMPARE==rValidator || __VALIDATOR.EQUAL==rValidator){
			_vo.comparerXPath = rObj2XPath;
			_vo.comparer = __getObj(rObj2XPath,rValidator);
		}
        
        _vo.msg = rMsg;
        if($$("#"+_vo.out)!=null){
            _vo.assignedDisplayer = $$("#"+_vo.out);
        }else if($$("#"+_vo.obj.getAttribute("id")+"_validate_")!=null){
            _vo.assignedDisplayer = $$("#"+_vo.obj.getAttribute("id")+"_validate_");
        }else{
        	_vo.assignedDisplayer = null;
        }

    	_vo.oriMsg = (_vo.assignedDisplayer!=null)?_vo.assignedDisplayer.innerHTML:"";
    	if(_vo.validator===__VALIDATOR.LENGTH){
            _vo.pattern = rPattern.toInt(0);
    	}else{
            _vo.pattern = rPattern;
    	}
        _vo.expression = rExpression;
        
        __tasks.push(_vo);
        _vo = null;
    };
    var __addTaskFromArray = function(){
        var _l = null;
        for (var i = __settingData.length-1; i >=0; i--) {
            _l = __settingData[i];
            __pushTask(_l[0], _l[1], _l[2], _l[3], _l[4], _l[5],_l[6],_l[7],_l[8]);
        }
        _l = null;
    };
    /* some problems here */
    var __addTaskFromXml = function(){
        var _nl = __settingData.selectNodes("//JskitValidation/field");
        var _xpath = null;
        var _validator = null;
        var _campare = null;
        var _pattern = null;
        var _message = null;
        var _expression = null;
        var _out = null;
        var _maxLength = null;
        var _html = null;
        for (var i = 0; i < _nl.length; i++) {
            _xpath = jskitXml.childNodeText(_nl[i], "xpath");
            _validator = jskitXml.childNodeText(_nl[i], "validator");
            _campare = jskitXml.childNodeText(_nl[i], "campare");
            _message = jskitXml.childNodeText(_nl[i], "message");
            _pattern = jskitXml.childNodeText(_nl[i], "pattern");
            _expression = jskitXml.childNodeText(_nl[i], "expression");
            _out = jskitXml.childNodeText(_nl[i], "out");
            _maxLength = jskitXml.childNodeText(_nl[i], "maxlength");
            _html = jskitXml.childNodeText(_nl[i], "html");
            __pushTask(_validator, _xpath, _message, _pattern, _campare, _expression,_out,_maxLength,_html);
        }
        _nl = _xpath = _validator = _campare = _pattern = _message = _expression = _out = _maxLength = _html = null;
    };

    var __check = function(taskIndex){
		__vo = __tasks[taskIndex];
		if(__vo.htmlInput!==true){
			__vo.setValue(__vo.value().clearOffHTML());
		}
		return parseInt(__doValidate());
    };
    var __checkAll = function(e){
        var bk = 0;
        __alertTimes = 0;
		try{
			for (var i=__tasks.length-1;i>=0; i--) {
				if(bk>0 && __display=="alert"){
					return false;
				}
				bk += __check(i);
				__vo = null;
			}
		}catch(ex){
			alert("CheckALL:"+e.message);
		}
		return true;
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
    this.check = function(id){
        __vo = null;
        __alertTimes = 0;
        for (var i = 0;i<__tasks.length; i++) {
        	if (__tasks[i].obj.id == id) {
                return (__check(i)===0);
            }
        }
        return true;
    };
    this.checkAll = function(){
        return __checkAll();
    };
   
	this.onFormSubmit = function(sender,e){
		var bk = this.checkAll();
		return bk;
	};
    this.loadXml = function(rXmlPath){
        var _xmDoc = jskitXml.load(rXmlPath);
        __settingData = _xmDoc;
        __settingType = "xml";
        _xmDoc = null;
    };
    this.load = function(rArr){
    	this.setFireAction(rArr.form.fire);
        __settingData = rArr.fields;
        __settingType = "array";
    };
    this.getErrorLogs = function(){
        return __errorLogs;
    };
	this.onLoad = function(data,formId){
		if(typeof(data)!="object" || data.length<1){return true;}
		this.load(data);
		this.deploy();
		var frm = $$("#"+formId);
		if(frm==null){
		    frm = $$("form")[0];
		}
		if(frm!=null){
			//for submit button
			jskitEvents.add(frm,"onsubmit",__hd+".checkAll");
			//for simple button invoke form submit
			frm.oldSubmit = frm.submit;
			frm.submit = function(){
				var _bk = __checkAll();
				if(_bk===true){frm.oldSubmit();}
				else{return false;}
			};
		}else{
		    //alert("JskitValidation:onLoad:Form Element not found!");
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
    this.IsMoney = function(rValue){
        return __regexTest(rValue, __PATTERN.MONEY);
    };
	//abandoned!------------------------------------
    //#End
};