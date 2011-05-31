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
    var __url = "";
	var __isTree = false;
    
    
    var __textFeild = null;
    var __valueFeild = null;
    var __parmFeild = null;
    var __onSelectAction = null;
    var __emptySelectText = null;
    
    var __getData = function(){
        var _url = __url;
        if(__parmFeild!=null){
            if(__url.indexOf("?")!=-1){
                _url += "&parm="+__parmFeild.value;
            }else{
                _url += "?parm="+__parmFeild.value;
            }
        }
		_url = (_url.indexOf("?")!=-1)?(_url+"&rm="+jskitUtil.guid()):(_url+"?rm="+jskitUtil.guid());
        __ajax = new JskitXmlHttpAction(_url,__hd+".refreshData","text"); 
        __panel.className = "JskitRichDropDownList_panel_loading";
        _url = null;
    };
    var __refreshData = function(rText){
        __ajax = null;
        __panel.className = "JskitRichDropDownList_panel";
        try{
            eval("__data = "+rText+";");
        }catch(e){
            alert("JSException:"+e.message);
            return;
        }
        __panel.innerHTML = __buildPanelCode();
    };
    
	var __parseText2Value = function(rText){
		if(!__isTree){
			if(__textFeild.value==""){
				__valueFeild.value = "";
			}else{
				for(var i=0;i<__data.length;i++){
					if(__data[i][1]==__textFeild.value){
						__valueFeild.value = __data[i][0];
						return;
					}
				}
			}
			__valueFeild.value = "";
		}
	};
    //
	var __buildTreeCode = function(rData){
        var _str = new Array();
		var _txt = null;
		var _val = null;
		var _sub = null;
		for(var i=0;i<rData.length;i++){
			_txt = rData[i][1];
			_val = rData[i][0];
			if(rData[i].length>2){
				_sub = rData[i][2];
			}
			_str.push('<div class="JskitRichDropDownList_tree_group" >');
			if(_sub!=null && _sub.length>0){
				_str.push('<div key="" idx="'+i+'" class="JskitRichDropDownList_tree_txt" >'+_txt+'</div>');
				_str.push('<div class="JskitRichDropDownList_tree_sub">');
				_str.push(__buildTreeCode(_sub));
				_str.push('</div>');
			}else{
				_str.push('<div key="'+_val+'" idx="'+i+'" class="JskitRichDropDownList_item" ');
				_str.push(' onmouseout="'+__hd+'.onItemMouseOut(this,event);" ');
				_str.push(' onmouseover="'+__hd+'.onItemMouseOver(this,event);" ');
				_str.push(' onclick="'+__hd+'.onSelect(this,event);" ');
				_str.push(' >');
				_str.push(_txt);
				_str.push('</div>');
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
			_txt = __data[i][1];
			_val = __data[i][0];
			if(!__inputHold || (_input=="" || _txt.toLowerCase().indexOf(_input)==0) ){
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

    var __buildPanelCode = function(){
        var _str = new Array();
        if(__data==null){
            _str.push(unescape("%u65E0%u6CD5%u88C5%u8F7D%u6570%u636E"));  
            _str.push('<a href="'+__url+'" target="_blank">...</a>');  
	        return _str.join('');
        }else if(__data.length==0){
            _str.push(unescape("%u6CA1%u6709%u6570%u636E"));    
            _str.push('<a href="'+__url+'" target="_blank">...</a>');  
	        return _str.join('');
        }else{
			if(__isTree){
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
				_str.push(__buildTreeCode(__data));
			}else{
				_str.push(__buildItemCode());
			}
		}
		__inputHold = true;
        return _str.join('');
    };
    var __open = function(){
        __panel.style.left = __textFeild.getX();
        __panel.style.top = __textFeild.getY()+__textFeild.offsetHeight;
        __panel.style.display = "block";
        if(__data==null){
            __getData();
        }else{
            __panel.innerHTML = __buildPanelCode();
        }
    };
    var __isOpen = function(){
        return __panel.style.display == "block";
    };
    var __close = function(){
        __inputHold = false;
        __panel.style.display = "none";
    };
    this.refreshData = function(rText){
        if(!__init){alert("init failed");return;}
        if(typeof(rText)!="string"){rText="";}
        __refreshData(rText.trim());
    };
    this.onSelect = function(sender,e){
        if(!__init){alert("init failed");return;}
        __textFeild.value = sender.innerHTML;
        __valueFeild.value =  sender.getAttribute("key"); 
        var _idx = parseInt(sender.getAttribute("idx"));
        if(__onSelectAction!=null){
            var _hd = __onSelectAction+'('+_idx+')';
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
	this.setEmptySelectText = function(v){
		__emptySelectText = v;
	};
    this.setSelectAction = function(v){
        if(typeof(v)=="string"){
            __onSelectAction = v.replace(/\([^\)]*\)/,"");
        }
    };
    this.onBodyClick = function(e){
		var _sender = e.srcElement;
        if(_sender.id!=__dropBtnID && __isOpen()){
		    if(_sender.id!=__textFeild.id){
			    __close();
		    }
        }
	};
	this.onParmFeildChange = function(e){
	    __textFeild.value = "";
	    __valueFeild.value = "";
	    __data = null;
	    __inputHold = false;
	};
	var __appendControls = function(){
	    __dropBtnID = jskitUtil.guid();
	    __dropBtn = document.createElement("input");
	    __dropBtn.setAttribute("id", __dropBtnID);
	    __dropBtn.setAttribute("type","button");
	    __dropBtn.className = "JskitRichDropDownList_btn";
	    __dropBtn.setAttribute("value",unescape("%u25BC"));
	    jskitUtil.dom.insertAfter(__dropBtn,__textFeild);
	    jskitEvents.add(__dropBtn,"onclick",__hd+".expand");
        
        __panelID = jskitUtil.guid();
        __panel = document.createElement("div");
        __panel.setAttribute("id",__panelID);
        __panel.style.position = "absolute";
        __panel.style.display = "none";
        __panel.style.width = __textFeild.offsetWidth+__dropBtn.offsetWidth;
        __panel.className = "JskitRichDropDownList_panel";
        __panel.innerHTML = unescape("%u6570%u636E%u88C5%u8F7D%u4E2D")+"...";
	    jskitUtil.dom.insertAfter(__panel,__textFeild);
	};
    var __deploy = function(rTextFeildID,rValueFeildID,rUrl,rParmFeildID){
        __textFeild = $("#"+rTextFeildID);
        if(__textFeild==null){
            alert("TextFeild("+rTextFeildID+") init error");
            return;
        }
        jskitEvents.add(__textFeild,"onfocus",__hd+".open");   
		if(__isTree){
			__textFeild.readOnly = true;
		}else{
	        jskitEvents.add(__textFeild,"onkeyup",__hd+".onKeyUp");   
	        jskitEvents.add(__textFeild,"onblur",__hd+".onTextBlur");   
		}
        __valueFeild = $("#"+rValueFeildID);
        if(__valueFeild==null){
            alert("ValueFeild("+rValueFeildID+") init error");
            return;
        }
        if(typeof(rParmFeildID)=="string"){
            __parmFeild = $("#"+rParmFeildID);
            jskitEvents.add(__parmFeild,"onpropertychange",__hd+".onParmFeildChange");   
        }
        __appendControls();
        jskitEvents.ready("onclick",__hd+".onBodyClick");   
        __url = rUrl;
        __init = true;
    };
	this.deploy = function(rTextFeildID,rValueFeildID,rUrl,rParmFeildID){
		__isTree = false;
		__deploy(rTextFeildID,rValueFeildID,rUrl,rParmFeildID);
	};
	this.deployTree = function(rTextFeildID,rValueFeildID,rUrl){
		__isTree = true;
		__deploy(rTextFeildID,rValueFeildID,rUrl);
	};
};