/*****************************************************
*
* JskitToolbar 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
var JskitToolbar = function(rHd){
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitToolbar";
	var __message = new jskitUtil.Message();
	this.setMessage = function(v){
		__message = v;
	};
	var __active = null;
	var __exists = function(rFuncType){
		return (rFuncType==="object");
	};

	var __getItem = function(rText,rKey,rEnabled){
		var str = "";
		if(rEnabled){
			if(rKey==0){
				str += "<tr><td class='JskitToolbar_title' nowrap>"+rText+"</td>";
			}else if(rKey==-1){
				str += "<tr><td class='JskitToolbar_interVal' nowrap><img border='0' style='height:1px;width:1px;' /></td>";
			}else{
				str += "<tr><td class='JskitToolbar_item'  nowrap onmouseover=\"this.className='JskitToolbar_item_over'\" "
					+ " onmouseout=\"this.className='JskitToolbar_item'\" "
					+ " onclick=\""+__hd+".execute("+rKey+");\" "
					+ ">"+rText+"</td>";
			}
		}else{
			str += "<tr><td class='JskitToolbar_item_disabled' >"+rText+"</td>";
		}
		return str;
	};
	var __getActiveObjectTagName = function(){
		if(__active!=null && __active.tagName){
			return __active.tagName;
		}else{
			return "";
		}
	};

	this.getContent = function(){
		try{
			__active = event.srcElement;
		}catch(e){
			jskitLog.error("get content exception: "+e.message,"JskitToolbar");
			return "";
		}
		var tagName = __getActiveObjectTagName();
		var str = "";
		str += "<table width='100%' class='JskitToolbar_list' cellspacing='0'>";
		str += __getItem("Jskit "+jskitBase.version								,0		,true										);
		
		str += __getItem(__message.text("Element Viewer Spirit")+":("+tagName+")"		,100	,jskitSpirit.isValidElement(__active)	);
		str += __getItem(__message.text("Refresh")								,999	,true										);
		str += __getItem("--------------"											,-1		,true										);
		str += __getItem(__message.text("Move Element")+":("+tagName+")"		,500	,jskitDynamic.isValidElement(__active)	);
		str += __getItem("--------------"											,-1		,true										);
		str += __getItem(__message.text("JavaScript Editor")					,800	,__exists(typeof(jskitScriptEditor))	);
		str += __getItem(__message.text("XMenu Editor")							,820	,__exists(typeof(jskitXMenu))			);
		str += __getItem(__message.text("Check BODY in memory")					,890	,true										);
		str += __getItem("--------------"											,-1		,true										);
		str += __getItem(__message.text("Open Logger")							,920	,true										);
		str += __getItem(__message.text("Turn to System Menu")					,900	,true										);
		str += __getItem(__message.text("Help")									,910	,true										);

		str += "</table>";
		return str;
	};

	this.execute = function(rAct){
		if(rAct==100){
			if( !__exists(typeof(jskitSpirit)) ){
				alert(__message.text("page/JskitSpirit.js not found, you can't use this function!"));
				return;
			}
			jskitSpirit.view(__active);
		}else if(rAct==800){
			if( !__exists(typeof(jskitScriptEditor)) ){
				alert(__message.text("plugin/scripts/JskitScriptEditor.js not found, you can't ues this function!"));
				return;
			}
			jskitScriptEditor.open();
		}else if(rAct==500){
			var _obj = jskitContextMenu.firedObj;
			if(_obj.id==""){
				_obj.id = jskitUtil.guid();
			}
			if($$(_obj).effectStyle("position")!="absolute"){
				_obj.style.width = _obj.offsetWidth;
				_obj.style.height = _obj.offsetHeight;
			}
			jskitDynamic.add("#"+_obj.id);
		}else if(rAct==890){
			var _code = $$("body").outerHTML;
			_code = jskitBase.__clearRootHtml(_code);
			jskitUtil.doc.htmlView(_code);
		}else if(rAct==880){
			window.open("view-source:"+window.location.href); 
			//window.open("viewsource:"+url);
		}else if(rAct==820){
			if( !__exists(typeof(jskitXMenu)) ){
				alert(__message.text("plugin/xmenu/JskitXMenu.js not found, you can't use this function!"));
				return;
			}
			jskitXMenu.open();
		}else if(rAct==900){
			jskitContextMenu.configuation.open = false;
		}else if(rAct==910){
			window.open(jskitLoad.path()+"doc/index.html");
		}else if(rAct==920){
			jskitLog.open();
		}else if(rAct==999){
			window.location.reload();
		}else{
			jskitLog.error("undefined action key: "+rAct,"JskitToolbar");
		}
		return true;
	};

};