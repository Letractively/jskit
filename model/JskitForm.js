/*****************************************************
*
* Jskit Form
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
function JskitForm(rHd){
	var __hd = (typeof(rHd)=="undefined")?"jskitForm":rHd;
	
	//#Begin Structure
	var __TYPE = new function(){
		this.TEXT = "text";
		this.RADIO = "radio";
		this.SELECT = "select";
		this.CHECKBOX = "checkbox";
		this.PASSWORD = "password";
		this.HIDDEN = "hidden";
	};
	//#End
	//#Begin Fields Object
	var __CHECKBOX = function(rXPath){
		var __obj = $(rXPath);
		this.isNaN = function(){
			return (__obj==null);
		};
		this.setValue = function(v){
			var _v = (typeof(v)=="array")?v:v.split(',');
			for(var i=0;i<__obj.length;i++){
				for(var j=0;j<_v.length;j++){
					if(_v[j]==__obj[i].value){
						__obj[i].checked = true;
						j==_v.length;
					}
				}
			}
			_v = null;
		};
		this.getValue = function(){
			var _v = new Array();
			for(var i=0;i<__obj.length;i++){
				if(__obj[i].checked)
					_v.push(__obj[i].value);
			}
			return _v.join(',');
		};
	};//end checkbox object
	var __RADIO = function(rXPath){
		var __obj = $(rXPath);
		this.isNaN = function(){
			return (__obj==null);
		};
		this.setValue = function(v){
			for(var i=0;i<__obj.length;i++){
				if(v==__obj[i].value)
					__obj[i].checked = true;
			}
		};
		this.getValue = function(){
			for(var i=0;i<__obj.length;i++){
				if(__obj[i].checked)
					return __obj[i].value;
			}
			return "";
		};
	};//end radio button object
	var __SELECT = function(rXPath){
		var __obj = $(rXPath);
		this.isNaN = function(){
			return (__obj==null);
		};
		this.selectByValue = function(rValue){
			var _ol = __obj.options;
			for(var i=0;i<_ol.length;i=i+1){
				if(_ol[i].value == rValue){
					_ol[i].selected = true;
				}
			}
			_ol = null;
		};
		this.selectByIndex = function(rIndex){
			if(rIndex<__obj.options.length){
				__obj.options(rIndex).selected = true;
			}
		};
		this.selectByText = function(rText){
			for(var i=0;i<__obj.options.length;i=i+1){
				if(__obj.options[i].text == rText){
					__obj.options[i].selected = true;
				}
			}
			return true;
		};
		this.getValue = function(){
			return __obj.value;
		};
		this.getValueByIndex = function(rIndex){
			if(rIndex>=__obj.options.length){
				return "";
			}
			return __obj.options(rIndex).value;
		};
		this.setValueByIndex = function(rValue,rIndex){
			if(rIndex<__obj.options.length){
				__obj.options(rIndex).value = rValue;
			}
		};
		this.getValueByText = function(rText){
			for(var i=0;i<__obj.options.length;i=i+1){
				if(__obj.options[i].text == rText){
					return __obj.options[i].value;
				}
			}
			return "";
		};
		this.setValueByText = function(rValue,rText){
			for(var i=0;i<__obj.options.length;i=i+1){
				if(__obj.options[i].text == rText){
					__obj.options[i].value = rValue;
				}
			}
			return true;
		};
		this.add = function(rValue,rText,rIndex){
			var _op = document.createElement("option");
			_op.value = rValue;
			_op.text = rText;
			__obj.add(_op,rIndex);
		};
		this.push = function(rOption,rIndex){
			__obj.add(rOption,rIndex);
		};
		this.remove = function(rArg){
			if(typeof(rArg)=="string"){//remove by value
				for(var i=0;i<__obj.options.length;i=i+1){
					if(__obj.options[i].value == rArg){
						__obj.remove(i);
					}
				}
			}else if(typeof(rArg)=="number" && rArg<__obj.options.length){// remove by index
				__obj.remove(rArg);
			}
		};
		this.removeAll = function(){
			for(var i=0;i<__obj.options.length;i=i+1){
				__obj.remove(i);
			}
		};
		{//constructor
			if(__obj!=null && __obj.length>1 && __obj[0].tagName!="OPTION")
				__obj = __obj[0];
		}
	};//end dropdownlist object
	//#End
	
	//#Begin private properties
	//#End
	
	//#Begin Public properties
	//#End

	//#Begin Private Methods
	var __buildDataField = function(){
		__dataField = $("#"+__form.getAttribute("key"));
		if(__dataField==null){
			__dataField = document.createElement("input");
			__dataField.setAttribute("type","hidden");
			__form.appendChild(__dataField);
		}
	};
	var __getCheckboxValue = function(rXPath){
		var _nl = new __CHECKBOX(rXPath);
		var _v = (_nl.isNaN())?"":_nl.getValue();
		_nl = null;
		return _v;
	};
	var __setCheckboxValue = function(rXPath,rValue){
		var _nl = new __CHECKBOX(rXPath);
		if(!_nl.isNaN())_nl.setValue(rValue);
		_nl = null;
	};
	var __getRadioValue = function(rXPath){
		var _nl = new __RADIO(rXPath);
		var _v = (_nl.isNaN())?"":_nl.getValue();
		_nl = null;
		return _v;
	};
	var __setRadioValue = function(rXPath,rValue){
		var _nl = new __RADIO(rXPath);
		if(!_nl.isNaN())_nl.setValue(rValue);
		_nl = null;
	};
	var __setTextValue = function(rXPath,rValue){
		var _o = $(rXPath);
		if(_o!=null)_o.value = rValue;
	};
	var __setSelectValue = function(rXPath,rValue){
		var _nl = new __SELECT(rXPath);
		if(!_nl.isNaN())_nl.selectByValue(rValue);
		_nl = null;
	};
	var __getSelectValue = function(rXPath){
		var _nl = new __SELECT(rXPath);
		var _v = (_nl.isNaN())?"":_nl.getValue();
		_nl = null;
		return _v;
	};	
	var __getFiledValue = function(rSrcType,rXPath){
		switch(rSrcType){
			case __TYPE.TEXT:
				return $(rXPath).value;
			case __TYPE.RADIO:
				return __getRadioValue(rXPath);
			case __TYPE.CHECKBOX:
				return __getCheckboxValue(rXPath);
			case __TYPE.SELECT:
				return $(rXPath).value;
			case __TYPE.HIDDEN:
				return $(rXPath).value;
			case __TYPE.PASSWORD:
				return $(rXPath).value;
			default:
				return "";
		}
	};
	var __setFiledValue = function(rSrcType,rXPath,rValue){
		switch(rSrcType){
			case __TYPE.TEXT:
				__setTextValue(rXPath,rValue);
				break;
			case __TYPE.RADIO:
				__setRadioValue(rXPath,rValue);
				break;
			case __TYPE.CHECKBOX:
				__setCheckboxValue(rXPath,rValue);
				break;
			case __TYPE.SELECT:
				__setSelectValue(rXPath,rValue);
				break;
			case __TYPE.HIDDEN:
				__setTextValue(rXPath,rValue);
				break;
			case __TYPE.PASSWORD:
				__setTextValue(rXPath,rValue);
				break;
			default:
				break;
		}
	};
	var __buildData = function(rXmlDoc){
		var _fs = rXmlDoc.selectSingleNode("//fields");
		var _nl = rXmlDoc.selectNodes("//fields/field");
		var _xpath,_type;
		for(var i=0;i<_nl.length;i++){
			_xpath = _nl[i].getAttribute("xpath");
			_type = _nl[i].getAttribute("type");
			_nl[i].text = __getFiledValue(_type,_xpath);
		}
		_nl = _xpath = _type = null;
		return _fs.xml;
	};
	var __parseType = function(rElement){
		if(rElement==null)return "";
		var _tag = rElement.tagName.toLowerCase();
		if(_tag=="input"){
			var _t = rElement.getAttribute("type");
			if(_t=="" || _t=="text"){
				return __TYPE.TEXT;
			}else if(_t=="radio"){
				return __TYPE.RADIO;
			}else if(_t=="checkbox"){
				return __TYPE.CHECKBOX;
			}else if(_t=="password"){
				return __TYPE.PASSWORD;
			}else if(_t=="hidden"){
				return __TYPE.HIDDEN;
			}
		}else if(_tag=="select"){
			return __TYPE.SELECT;
		}else if(_tag=="textarea"){
			return __TYPE.TEXT;
		}
		return "";
	};
	//#End

	//#Begin Public Methods
	this.getCheckboxValue = function(rXPath){
		return __getCheckboxValue(rXPath);
	};
	this.getRadioValue = function(rXPath){
		return __getRadioValue(rXPath);
	};
	this.loadForm = function(rXmlDoc){
		var _nl = rXmlDoc.selectNodes("//fields/field");
		var _xpath,_value,_type;
		for(var i=0;i<_nl.length;i++){
			_xpath = _nl[i].getAttribute("xpath");
			_type = _nl[i].getAttribute("type");
			_value = _nl[i].text;
			__setFiledValue(_type,_xpath,_value);
		}
		_xpath = _type = _value = _nl = null;
	};
	this.buildForm = function(rForm,rXmlDoc){
		var _fs = rXmlDoc.selectSingleNode("//fields");
		var _hid = $("#"+_fs.getAttribute("id"));
		if(__parseType(_hid)!=__TYPE.HIDDEN ){
			_hid = document.createElement("input");
			_hid.setAttribute("type","hidden");
			_hid.setAttribute("id",_fs.getAttribute("id"));
			rForm.appendChild(_hid);
		}
		_hid.value = __buildData(rXmlDoc);
		_fs = _hid = null;
		return true;
	};
	this.getFormData = function(rXmlDoc){
		return __buildData(rXmlDoc);
	};	
	//#End

	//#Begin Extend public methods
	this.SELECT = function(xPath){
		return new __SELECT(xPath);
	}
	this.CHECKBOX = function(xPath){
		return new __CHECKBOX(xPath);
	}
	this.RADIO = function(xPath){
		return new __RADIO(xPath);
	}
	//#End
}

