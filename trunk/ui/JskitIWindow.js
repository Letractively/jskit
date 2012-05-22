/****************************************************************************
 *
 * JskitIWindow
 * @author    : AnyRock
 * @email     : jiang.edwon@gmail.com
 * @homepage  : http://www.mending.cn
 * @copyright : Copyright(c)jskit.org,All right reserved
 * @require   : core/*
 *
 ****************************************************************************/
function JskitIWindow(rTitle, rContent, rParams){
	var __ATTR_DEF = new Array();
	__ATTR_DEF["width"] = "300";
	__ATTR_DEF["height"] = "300";
	__ATTR_DEF["left"] = "100";
	__ATTR_DEF["top"] = "100";
	__ATTR_DEF["scrolling"] = "true";
	__ATTR_DEF["center"] = "false";
	__ATTR_DEF["class"] = null;
	__ATTR_DEF["titleclass"] = null;
	__ATTR_DEF["bodyclass"] = null;
	__ATTR_DEF["resizeable"] = "true";
	
	var __minWidth = 200;
	var __minHeight = 200;
	var __toolbarHeight = 22;
	
	var __id = jskitUtil.guid();
	var __win = null;
	var __title = null;
	var __toolbar = null;
	var __btns = null;
	var __btnMin = null;
	var __btnMax = null;
	var __btnClose = null;
	var __body = null;
	var __footer = null;
	var __attr = new Array();
	
	var __fullTemp = new Array();
	//#Begin private methods
	var __deploy = function(){
		__win = document.createElement("div");
		__win.setAttribute("id", __id);
		
		__toolbar.appendChild(__title);
		__toolbar.appendChild(__btns);
		__win.appendChild(__toolbar);
		
		__win.appendChild(__body);
		__win.appendChild(__footer);
		__setAttr();
		
		if ($$("body") != null) {
			$$("body").appendChild(__win);
			if (typeof(jskitDynamic) != "undefined") {
				jskitDynamic.add("#" + __id);
			}
		}
	};
	var __getStyleValue = function(rStyleName, rType){
		var _v = null;
		if (typeof(__attr[rStyleName]) == "string" && __attr[rStyleName].length > 0) {
			_v = __attr[rStyleName];
		}else{ 
			if (typeof(__ATTR_DEF[rStyleName]) == "string" && __ATTR_DEF[rStyleName].length > 0) {
				_v = __ATTR_DEF[rStyleName];
			}
			else {
				_v = "";
			}
		}
		if (rType == "number") {
			_v = (isNaN(parseFloat(_v))) ? 0 : parseFloat(_v);
		}
		return _v;
	};
	var __parseAttr = function(rParams){
		var _attr = new Array();
		if (typeof(rParams) == "string") {
			var _arr = rParams.split(",");
			var _item, _k, _v;
			for (var i = 0; i < _arr.length; i++) {
				var _item = _arr[i].split("=");
				if (_item.length == 2) {
					_k = _item[0].trim().toLowerCase();
					_v = _item[1].trim().toLowerCase();
					_attr[_k] = _v;
				}
			}
			_v = _k = _item = _arr = null;
		}
		return _attr;
	};
	var __resizeTitle = function(){
		__title.style.width = __win.style.width.toFloat()-70;
	};
	var __readRectStyle = function(rAttr){
		if (typeof(__attr[rAttr]) != "undefined") {
			__attr[rAttr] = parseFloat(__attr[rAttr]);
			if(rAttr=="width" || rAttr=="height"){
				__attr[rAttr] = (__attr[rAttr]<100)?100:__attr[rAttr];
			}
			eval("__win.style." + rAttr + " = __attr[rAttr]");
		}else{ 
			if (typeof(__ATTR_DEF[rAttr]) != "undefined") {
				eval("__win.style." + rAttr + " = __ATTR_DEF[rAttr]");
				__attr[rAttr] = __ATTR_DEF[rAttr];
			}
		}
	};
	var __setAttr = function(){
		//---- @ window style -------------	
		//attr : class
		if (typeof(__attr["class"]) == "string") {
			__win.className = __attr["class"];
		}else {
			if (typeof(__ATTR_DEF["class"]) == "string") {
				__win.className = __ATTR_DEF["class"];
			}
			else {
				__win.style.border = "1px solid #555555";
				__win.style.backgroudColor = "#336699";
				__win.style.color = "#000000";
				__win.style.padding = "0px";
			}
		}
		//attr : width
		__readRectStyle("width");
		//attr : height
		__readRectStyle("height");
		//attr : left
		__readRectStyle("left");
		//attr : top
		__readRectStyle("top");
		//set title width
		__resizeTitle();
		//attr : center
		if (__attr["center"] == "true" || __attr["center"] == "yes") {
			__win.style.left = ($$("body").clientWidth - __win.offsetWidth) / 2;
			__win.style.top = ($$("body").clientHeight - __win.offsetWidth) / 2;
		}
		__win.style.position = "absolute";
		__win.style.overflow = "hidden";
		//---- @ title style -------------	
		//attr : titleClass
		if (typeof(__attr["titleclass"]) == "string") {
			__toolbar.className = __attr["titleclass"];
		} else {
			if (typeof(__ATTR_DEF["titleclass"]) == "string") {
				__toolbar.className = __ATTR_DEF["titleclass"];
			}
			else {
				__toolbar.style.border = "1px outset #6699cc";
				__toolbar.style.backgroundColor = "#336699";
				__toolbar.style.color = "#ffff00";
				__toolbar.style.padding = "0px 2px 0px 2px";
			}
		}
		__toolbar.style.height = __toolbarHeight;
		__toolbar.style.width = parseFloat(__attr["width"]) - 6;
		//---- @ body style -------------	
		//attr : bodyClass
		if (typeof(__attr["bodyclass"]) == "string") {
			__body.className = __attr["bodyclass"];
		} else { 
			if (typeof(__ATTR_DEF["bodyclass"]) == "string") {
				__body.className = __ATTR_DEF["bodyclass"];
			} else {
				__body.style.border = "1px solid #336699";
				__body.style.backgroundColor = "#eeeeee";
				__body.style.color = "#000000";
				__body.style.padding = "2px 2px 2px 2px";
			}
		}
		//attr : scrolling
		if (__attr["scrolling"] == "false" || __attr["scrolling"] == "no") {
			__body.style.overflow = "hidden";
		} else {
			if (__ATTR_DEF["scrolling"] == "false" || __ATTR_DEF["scrolling"] == "no") {
				__body.style.overflow = "hidden";
			}
			else {
				__body.style.overflow = "scroll";
			}
		}
		__body.style.height = __win.style.height.toInt() - 30;
	};
	var __close = function(){
		try {
			if (__win != null) {
				$$(__win).finalize();
				__win = null;
			}
			__title = null;
			__toolbar = null;
			__body = null;
			__footer = null;
			__btns = null;
			__btnMin = null;
			__btnMax = null;
			__btnClose = null;
		} 
		catch (e) {
			alert("JskitIWindow:__close:" + e.message);
		}
	};
	var __refresh = function(){
		__setAttr();
	};
	var __fullScreen = function(){
		if (__fullTemp.length < 1) {
			__correctPosition();
			__fullTemp[0] = __attr["left"];
			__fullTemp[1] = __attr["top"];
			__fullTemp[2] = __attr["width"];
			__fullTemp[3] = __attr["height"];
			__attr["left"] = 0;
			__attr["top"] = 0;
			__attr["width"] = $$("body").clientWidth - 2;
			__attr["height"] = $$("body").clientHeight - 2;
		}
		else {
			__attr["left"] = __fullTemp[0];
			__attr["top"] = __fullTemp[1];
			__attr["width"] = __fullTemp[2];
			__attr["height"] = __fullTemp[3];
			__fullTemp = new Array();
		}
		__refresh();
	};
	var __correctPosition = function(){
		__attr["left"] = __win.style.left;
		__attr["top"] = __win.style.top;
		__attr["width"] = __win.style.width;
		__attr["height"] = __win.style.height;
	};
	var __minimize = function(){
		if (__win != null) 
			__win.style.display = "none";
	};
	//#End
	
	//#Begin public methods
	this.setTitle = function(rTitle){
		__title.innerHTML = rTitle;
	};
	this.setContent = function(rContent){
		__body.innerHTML = rContent;
	};
	this.setStyle = function(rParams){
		var _arr = __parseAttr(rParams);
		
		__ATTR_DEF["width"] = (typeof(_arr["width"]) == "string") ? _arr["width"] : __ATTR_DEF["width"];
		__ATTR_DEF["height"] = (typeof(_arr["height"]) == "string") ? _arr["height"] : __ATTR_DEF["height"];
		__ATTR_DEF["left"] = (typeof(_arr["left"]) == "string") ? _arr["left"] : __ATTR_DEF["left"];
		__ATTR_DEF["top"] = (typeof(_arr["top"]) == "string") ? _arr["top"] : __ATTR_DEF["top"];
		__ATTR_DEF["scrolling"] = (typeof(_arr["scrolling"]) == "string") ? _arr["scrolling"] : __ATTR_DEF["scrolling"];
		__ATTR_DEF["center"] = (typeof(_arr["center"]) == "string") ? _arr["center"] : __ATTR_DEF["center"];
		__ATTR_DEF["class"] = (typeof(_arr["class"]) == "string") ? _arr["class"] : __ATTR_DEF["class"];
		__ATTR_DEF["titleclass"] = (typeof(_arr["titleclass"]) == "string") ? _arr["titleclass"] : __ATTR_DEF["titleclass"];
		__ATTR_DEF["bodyclass"] = (typeof(_arr["bodyclass"]) == "string") ? _arr["bodyclass"] : __ATTR_DEF["bodyclass"];
		
		_arr = null;
	};
	this.refresh = function(){
		__refresh();
	};
	this.open = function(){
		if (__win == null) {
			__deploy();
		}else {
			__win.style.display = "inline-block";
		}
	};
	this.minimize = function(){
		if (__win != null) 
			__win.style.display = "none";
	};
	this.close = function(){
		__close();
	};
	this.getId = function(){
		return __id;
	};
	this.getContent = function(){
		return __body.innerHTML;
	};
	this.setZIndex = function(rValue){
		__win.style.zIndex = (typeof(rValue) == "number") ? rValue : 0;
	};
	this.resizeTo = function(rWidth, rHeight){
		if (typeof(rWidth) == "number" && rWidth > __minWidth) {
			__attr["width"] = rWidth;
		}
		if (typeof(rHeight) == "number" && rHeight > __minHeight) 
			__attr["height"] = rHeight;
		this.refresh();
	};
	this.fullScreen = function(){
		__fullScreen();
	};
	//#End
	//constructor
	{
		__toolbar = document.createElement("div");
		__title = document.createElement("div");
		__title.style.cssFloat = "left";
		__title.style.overflow = "hidden";
		__title.style.backgroundColor = "transparent";
		__title.innerHTML = (typeof(rTitle) == "string") ? rTitle : "Jskit Window";
		
		__btns = document.createElement("div");
		__btns.style.cssFloat = "right";
		__btns.style.paddingTop = "2px";
		__btns.style.paddingLeft = "1px";
		//__btns.style.backgroundColor = "#0000ff";
		__btns.style.backgroundColor = "transparent";
		
		__btnMin = document.createElement("button");
		__btnMin.style.fontWeight = "bold";
		__btnMin.style.fontSize = "10px";
		__btnMin.style.fontFamily = "verdana";
		__btnMin.style.width = "18px";
		__btnMin.style.height = "18px";
		__btnMin.style.overflow = "hidden";
		__btnMin.innerHTML = "__";
		__btnMin.onfocus = function(){
			this.blur();
		};
		__btnMin.onclick = function(){
			__minimize();
		};
		__btnMax = document.createElement("button");
		__btnMax.style.fontWeight = "bold";
		__btnMax.style.fontSize = "10px";
		__btnMax.style.fontFamily = "verdana";
		__btnMax.style.width = "18px";
		__btnMax.style.height = "18px";
		__btnMax.style.overflow = "hidden";
		__btnMax.innerHTML = 'O';
		__btnMax.onfocus = function(){
			this.blur();
		};
		__btnMax.onclick = function(){
			__fullScreen();
		};
		__btnClose = document.createElement("button");
		__btnClose.style.fontWeight = "bold";
		__btnClose.style.fontSize = "10px";
		__btnClose.style.fontFamily = "verdana";
		__btnClose.style.width = "18px";
		__btnClose.style.height = "18px";
		__btnClose.style.overflow = "hidden";
		__btnClose.innerHTML = "X";
		__btnClose.onfocus = function(){
			this.blur();
		};
		__btnClose.onclick = function(){
			__close();
		};
		__btns.appendChild(__btnMin);
		__btns.appendChild(__btnMax);
		__btns.appendChild(__btnClose);
		
		__body = document.createElement("div");
		__body.innerHTML = (typeof(rContent) == "string") ? rContent : "";
		
		__footer = document.createElement("div");
		
		__attr = __parseAttr(rParams);
	};
};
