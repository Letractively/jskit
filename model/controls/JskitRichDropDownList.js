/***************************************************************
* Javascript JskitRichDropDownList
* Author   : Jiang Xingbo
* Date     : 2011-3-13
* Required : 
*            Base/*.*
*            JskitXmlHttp.js
***************************************************************/
var JskitRichDropDownList = function(rHd){
    var __hd = (typeof(rHd)=="string")?rHd:"jskitRichDropDownList";
    
    var __init = false;
    var __inputHold = false;
    
    var __panel = null;
    var __panelID = null;
    var __dropBtn = null;
    var __dropBtnID = null;
    //data format : [[key,value,sub[...]],[key,value,sub[...]]...]
	var __data = null;
    var __ajax = null;
    var __url = null;
	var __requestUrl = null;
	var __isTree = false;
    
    var __debug = false;
	

    var __textFeild = null;
    var __valueFeild = null;
    var __parmFeild = null;
	var __parmName = null;
    var __onSelectAction = null;
    var __emptySelectText = null;
    

	var __folderSelectable = true;

    var __getData = function(){
		__panel.innerHTML = "";
		if(__url!=null){
			__requestUrl = __url;
			if(__parmName!=null){
				if(__url.indexOf("?")!=-1){
					__requestUrl += "&"+__parmName+"=";
				}else{
					__requestUrl += "?"+__parmName+"=";
				}
				if(__parmFeild!=null){
					__requestUrl += __parmFeild.value;
				}
			}
			__requestUrl = (__requestUrl.indexOf("?")!=-1)?(__requestUrl+"&rm="):(__requestUrl+"?rm=");
			__requestUrl += jskitUtil.guid();
			__ajax = new JskitXmlHttpAction(__requestUrl,__hd+".refreshData","text"); 
			__panel.className = "JskitRichDropDownList_panel_loading";
		}else{//static model
			__refreshStaticData();
		}
    };
    var __refreshData = function(rText){
        __panel.className = "JskitRichDropDownList_panel";
        try{
            eval("__data = "+rText+";");
        }catch(e){
			__panel.focus();
			var _info = '<div key="" idx="" class="JskitRichDropDownList_item" >';
			if(__debug){
				_info += '<a href="'+__requestUrl+'" target="_blank">'+unescape("%u8FD4%u56DE%u6570%u636E%u7684%u683C%u5F0F%u9519%u8BEF")+'</a>';
			}else{
				_info += unescape("%u8FD4%u56DE%u6570%u636E%u7684%u683C%u5F0F%u9519%u8BEF");
			}
			_info += '</div>';
			__panel.innerHTML = _info;
            return;
        }
        __panel.innerHTML = __buildPanelCode();
    };
	var __refreshStaticData = function(){
        __panel.innerHTML = __buildPanelCode();
	};
    
	var __parseText2Value = function(rText){
		if(__selected){
			return;
		}
		if(__textFeild.value==""){
			__valueFeild.value = "";
		}else if(__data!=null && __data.length){
			var _data=null;
			var _val=null;
			for(var i=0;i<__data.length;i++){
				_data = __data[i][1].toLowerCase();
				_val = __textFeild.value.toLowerCase();

				if(_data==_val || jskitUtil.lang.makeChsFirstlyPy(_data)==_val){
					__finalSelected( __data[i][1],__data[i][0]); 
					_data = _val = null;
					return;
				}
			}
			_data = _val = null;
		}
		__valueFeild.value = "";
		if(__closing){__textFeild.value="";}
	};
    //
	var __buildTreeCode = function(rData){
        var _input = __textFeild.value.toLowerCase();
        var _str = new Array();
		var _txt = null;
		var _val = null;
		var _sub = null;
		for(var i=0;i<rData.length;i++){
			_txt = rData[i][1];
			if(typeof(_txt)=="string" && _txt.indexOf(",")!=-1){
				var _txtArr = _txt.split(',');
				_txt = _txtArr[0]+"(";
				for(var j=1;j<_txtArr.length;j++){
					if(j>1){_txt+=",";}
					_txt +=_txtArr[j];
				}
				_txt += ")";
			}
			_val = rData[i][0];
			if(rData[i].length>2){
				_sub = rData[i][2];
			}
				_str.push('<div class="JskitRichDropDownList_tree_group" >');
				if(_sub!=null && _sub.length>0){
					if(__folderSelectable &&( !__inputHold || (_input=="" || __itemFilterByInput(_input,_txt)) ) ){
						_str.push('<div key="'+_val+'" idx="'+i+'" class="JskitRichDropDownList_item"  ');
						_str.push(' onmouseout="'+__hd+'.onItemMouseOut(this,event);" ');
						_str.push(' onmouseover="'+__hd+'.onItemMouseOver(this,event);" ');
						_str.push(' onclick="'+__hd+'.onSelect(this,event);" ');
						_str.push(' >'+_txt+'</div>');
					}else{
						_str.push('<div key="" idx="'+i+'" class="JskitRichDropDownList_tree_txt" >'+_txt+'</div>');
					}
					_str.push('<div class="JskitRichDropDownList_tree_sub">');
					_str.push(__buildTreeCode(_sub));
					_str.push('</div>');
				}else{
					if(!__inputHold || (_input=="" || __itemFilterByInput(_input,_txt)) ){
						_str.push('<div key="'+_val+'" idx="'+i+'" class="JskitRichDropDownList_item" ');
						_str.push(' onmouseout="'+__hd+'.onItemMouseOut(this,event);" ');
						_str.push(' onmouseover="'+__hd+'.onItemMouseOver(this,event);" ');
						_str.push(' onclick="'+__hd+'.onSelect(this,event);" ');
						_str.push(' >');
						_str.push(_txt);
						_str.push('</div>');
					}
				}
			_str.push('</div>');
		}   
		_txt = _val = _sub = null;
        return _str.join('');
	};
	var __buildItemCode = function(){
        var _input = __textFeild.value.toLowerCase();
        var _str = new Array();
		var _txt = null;
		var _val = null;
		var _sub = null;
		for(var i=0;i<__data.length;i++){
			if(typeof(__data[i])!="object" || __data[i].length<1){continue;};
			_txt = __data[i][1];
			if(typeof(_txt)=="string" && _txt.indexOf(",")!=-1){
				var _txtArr = _txt.split(',');
				_txt = _txtArr[0]+"(";
				for(var j=1;j<_txtArr.length;j++){
					if(j>1){_txt+=",";}
					_txt +=_txtArr[j];
				}
				_txt += ")";
			}
			_val = __data[i][0];
			if(!__inputHold || (_input=="" || __itemFilterByInput(_input,_txt)) ){
				_str.push('<div key="'+_val+'" idx="'+i+'" class="JskitRichDropDownList_item" ');
				_str.push(' onmouseout="'+__hd+'.onItemMouseOut(this,event);" ');
				_str.push(' onmouseover="'+__hd+'.onItemMouseOver(this,event);" ');
				_str.push(' onclick="'+__hd+'.onSelect(this,event);" ');
				_str.push(' >');
				_str.push(_txt);
				_str.push('</div>');
			}
		}   
		_txt = _val = _sub = null;
        return _str.join('');
	};

	var __itemFilterByInput = function(rInput,rItemVal){
		var _py = jskitUtil.lang.makeChsFirstlyPy(rItemVal);
		var _val = rItemVal.toLowerCase();
		return (_val.indexOf(rInput)==0 || _py.indexOf(rInput)==0);
	};

    var __buildPanelCode = function(){
        var _str = new Array();
        if(__data==null){
            _str.push(unescape("%u65E0%u6CD5%u88C5%u8F7D%u6570%u636E"));  
            if(__debug){
				_str.push('<a href="'+__requestUrl+'" target="_blank">Check Request...</a>');  
			}
	        return _str.join('');
        }else if(__data.length==0){
            _str.push(unescape("%u6CA1%u6709%u6570%u636E"));
			if(__debug){
				_str.push('<a href="'+__requestUrl+'" target="_blank">Check Request...</a>');  
			}
	        return _str.join('');
        }else{
			if(__debug){
				_str.push('<div class="JskitRichDropDownList_tree_group" >');
				_str.push('<div key="" class="JskitRichDropDownList_item">');
				_str.push('<a href="'+__requestUrl+'" target="_blank">Check Request...</a>');  
				_str.push('</div>');
				_str.push('</div>');
			}
			if(__emptySelectText!=null){
				_str.push('<div class="JskitRichDropDownList_tree_group" >');
				_str.push('<div key="" class="JskitRichDropDownList_item" ');
				_str.push(' onmouseout="'+__hd+'.onItemMouseOut(this,event);" ');
				_str.push(' onmouseover="'+__hd+'.onItemMouseOver(this,event);" ');
				_str.push(' onclick="'+__hd+'.onSelect(this,event);" ');
				_str.push(' >');
				_str.push(__emptySelectText);
				_str.push('</div>');
				_str.push('</div>');
			}
			if(__isTree){
				_str.push(__buildTreeCode(__data));
			}else{
				_str.push(__buildItemCode());
			}
		}
		__inputHold = true;
        return _str.join('');
    };
    var __open = function(){
        if(__data==null || __valueFeild.value===""){
			__getData();
        }else{
            __panel.innerHTML = __buildPanelCode();
        }
        __panel.style.left = __textFeild.getX();
        __panel.style.top = __textFeild.getY()+__textFeild.offsetHeight;
        __panel.style.display = "";
    };
    var __isOpen = function(){
        return (__panel.style.display==="");
    };
	var __closing = false;
    var __close = function(){
		__closing = true;
        __inputHold = false;
        __panel.style.display = "none";
		__closing = false;
		__selected = false;
    };
	var __finalSelected = function(rText,rVal){
		//check old val
		var rOldVal = __valueFeild.value;
		if(rOldVal!==rVal){
			__textFeild.value = rText;
			__valueFeild.value =  rVal; 
		}
	};
    this.refreshData = function(rText){
        if(!__init){alert("init failed");return;}
        if(typeof(rText)!="string"){rText="";}
        __refreshData(rText.trim());
    };
	var __selected = false;
    this.onSelect = function(sender,e){
        if(!__init){alert("init failed");return;}
		__finalSelected(sender.innerHTML,sender.getAttribute("key")); 
		__selected = true;
        if(__onSelectAction!=null){
            var _hd = __onSelectAction+'("'+__valueFeild.value+'")';
            eval(_hd);
        }
        __close();
    };
    this.onItemMouseOver = function(sender,e){
        sender.className = "JskitRichDropDownList_item_active";
    };
    this.onItemMouseOut = function(sender,e){
        sender.className = "JskitRichDropDownList_item";
    };
    this.onKeyDown = function(e){
        if(!__init){alert("init failed");return;}
        if(__data!=null){
            __panel.innerHTML = __buildPanelCode();
        }
    };
    this.onKeyUp = function(e){
        if(!__init){alert("init failed");return;}
        if(__data!=null){
            __panel.innerHTML = __buildPanelCode();
        }
		__parseText2Value();
	};
    this.getKey = function(idx){
        return __data[idx][0];
    };
    this.getValue = function(idx){
        return __data[idx][1];
    };
    this.getEO = function(idx){
        return __data[idx][2];
    };
    this.expand = function(sender,e){
        if(!__init){alert("init failed");return;}
        if(__isOpen()){
            __close();
        }else{
            __open();
        }
    };
    this.open = function(e){
        __open();
    };
	this.onTextBlur = function(e){
		__parseText2Value();
	};
    this.close = function(){
        if(!__init){alert("init failed");return;}
        __close();
    };
    this.setUrl = function(v){
        __url = v;
    };
	this.setDebugMode = function(v){
		__debug = (v===true || v===1 || v==="yes");
	};
	this.setEmptySelectText = function(v){
		__emptySelectText = v;
		if(__emptySelectText==""){__emptySelectText="nbsp;";}
	};
    this.setSelectAction = function(v){
        if(typeof(v)=="string"){
            __onSelectAction = v.replace(/\([^\)]*\)/,"");
        }
    };
    this.onBodyClick = function(e){
		var _sender = e.srcElement;
        if(_sender.id!==__dropBtnID && _sender.id!==__textFeild.id){
			__close();
        }
	};
	this.onParmFeildChange = function(e){
	    __textFeild.value = "";
	    __valueFeild.value = "";
	    __data = null;
	    __inputHold = false;
	};
	var __appendControls = function(){
		var _btnWidth = 18;
	    __dropBtnID = jskitUtil.guid();
	    __dropBtn = document.createElement("input");
		__dropBtn.setAttribute("id", __dropBtnID);
	    __dropBtn.setAttribute("type","button");
	    __dropBtn.className = "JskitRichDropDownList_btn";
	    $("body").appendChild(__dropBtn);
	    __dropBtn.setAttribute("value",unescape("%u25BC"));
		/*
		__dropBtn.style.width = _btnWidth+"px";
		__dropBtn.style.display = "none";
		__dropBtn.style.position = "absolute";
		__dropBtn.style.height = (__textFeild.offsetHeight-2)+"px";
		__dropBtn.style.top = ($(__textFeild).getY()+1)+"px";
		__dropBtn.style.left = ($(__textFeild).getX()+__textFeild.offsetWidth-_btnWidth-1)+"px";
		alert($(__textFeild).getX());
		__dropBtn.style.display = "block";
		*/
	    jskitUtil.dom.insertAfter(__dropBtn,__textFeild);
	    jskitEvents.add(__dropBtn,"onclick",__hd+".expand");
        
        __panelID = jskitUtil.guid();
        __panel = document.createElement("div");
        __panel.setAttribute("id",__panelID);
        __panel.style.position = "absolute";
        __panel.style.display = "none";
        __panel.style.width = (__textFeild.offsetWidth+__dropBtn.offsetWidth)+"px";
        __panel.className = "JskitRichDropDownList_panel";
        __panel.innerHTML = unescape("%u6570%u636E%u88C5%u8F7D%u4E2D")+"...";
	    jskitUtil.dom.insertAfter(__panel,__textFeild);
	};
    var __deploy = function(rTextFeildID,rValueFeildID,rUrl,rParmName,rParmFeildID,rData){
        __textFeild = $("#"+rTextFeildID);
        if(__textFeild==null){
            alert("TextFeild("+rTextFeildID+") init error");
            return;
        }
        jskitEvents.add(__textFeild,"onfocus",__hd+".open"); 

		if(__isTree){
			//__textFeild.readOnly = true;
	        jskitEvents.add(__textFeild,"onkeyup",__hd+".onKeyUp");   
	        jskitEvents.add(__textFeild,"onblur",__hd+".onTextBlur");   
		}else{
	        jskitEvents.add(__textFeild,"onkeyup",__hd+".onKeyUp");   
	        jskitEvents.add(__textFeild,"onblur",__hd+".onTextBlur");   
		}
        __valueFeild = $("#"+rValueFeildID);
        if(__valueFeild==null){
            alert("ValueFeild("+rValueFeildID+") init error");
            return;
        }
		if(typeof(rParmName)=="string"){
			__parmName = rParmName;
		}
        if(typeof(rParmFeildID)=="string"){
            __parmFeild = $("#"+rParmFeildID);
			if(__parmFeild!=null){
				jskitEvents.add(__parmFeild,"onpropertychange",__hd+".onParmFeildChange"); 
			}
		}
        __appendControls();
        jskitEvents.ready("onclick",__hd+".onBodyClick");   
        __url = rUrl;
		if(rData!=null && typeof(rData)=="object"){__data = rData;}
        __init = true;
    };
	this.deployStatic = function(rTextFeildID,rValueFeildID,rData){
		__isTree = false;
		__deploy(rTextFeildID,rValueFeildID,null,null,null,rData);
	};
	this.deploy = function(rTextFeildID,rValueFeildID,rUrl,rParmName,rParmFeildID){
		__isTree = false;
		__deploy(rTextFeildID,rValueFeildID,rUrl,rParmName,rParmFeildID,null);
	};
	this.deployTree = function(rTextFeildID,rValueFeildID,rUrl,rParmName,rParmFeildID){
		__isTree = true;
		__deploy(rTextFeildID,rValueFeildID,rUrl,rParmName,rParmFeildID,null);
	};
};