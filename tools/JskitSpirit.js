/*****************************************************
*
* Jskit Spirt( Elements monitor )
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
function JskitSpirit(){
	this.configuation = new this.__configuation();
	this.viewerID = jskitUtil.guid();
}
JskitSpirit.prototype = {
	element   : null,
	viewer    : null,
	viewerID  : "JskitSpirit_viewer",
	container : null,
	docInfo   : null,
	mposx     : 0,
	mpoxy     : 0,
	beginX    : 0,
	beginY    : 0,

	__configuation : function(){
		this.open = false;
	},
	__DETAILS : new Array(
		new Array("tagName","tagName")
		,new Array("id","id")
		,new Array("name","name")
		,new Array("offsetHeight","offsetHeight")
		,new Array("offsetWidth","offsetWidth")
	),
	__showElementDetails : function(){
		var str = "";
		str += "<table  class='JskitSpirit_list_table' width='100%' border='0' cellspacing='1' cellpadding='1'>"

		if(this.element!=null){
			this.element = $$(this.element);
			if(this.element==null){return "Target object is null";}
			str += this.__getDetailsItem("tagName",     "<b>&lt;"+this.element.tagName+"&gt</b>"        );
			str += this.__getDetailsItem("id",			this.element.id									);
			str += this.__getDetailsItem("name",		this.element.name								);
			str += this.__getDetailsItem("color",		this.element.effectStyle("color")				);
			str += this.__getDetailsItem("bgColor",		this.element.effectStyle("background-color")	);

			str += this.__getDetailsItem("position",	this.element.effectStyle("position")			);
			str += this.__getDetailsItem("left",		this.element.getX()								);
			str += this.__getDetailsItem("top",			this.element.getY()								);
			str += this.__getDetailsItem("z-index",		this.element.effectStyle("z-index")				);

			str += this.__getDetailsItem("offsetWidth",	this.element.offsetWidth						);
			str += this.__getDetailsItem("offsetHeight",this.element.offsetHeight						);
			str += this.__getDetailsItem("width",		this.element.effectStyle("width")				);
			str += this.__getDetailsItem("height",		this.element.effectStyle("height")				);
			str += this.__getDetailsItem("HTML code","<textarea readonly onfocus='this.select()' style='font-size:9px;font-family:verdana;height:80px;width:175px;background-color:#ffffe0;'>"+this.element.outerHTML+"</textarea>");
		}
		str += "</table>";
		this.container = $$("#"+this.viewerID+"_container");
		this.container.innerHTML = str;
		this.container.style.width = 280-2;
		this.container.style.height = 360-63;
		this.container.style.backgroundColor = "#f6f6f6";
		this.container.style.border = "inset 1px #ffffff";
		this.container.style.overflow = "scroll";
	},
	__showEmptyDetails : function(){
		var str = "";
		str += "<table  class='JskitSpirit_list_table' width='100%' border='0' cellspacing='1' cellpadding='1'>"

		if(this.element!=null){
			str += this.__getDetailsItem("tagName","<b>&lt;"+this.element.tagName+"&gt</b>");
			str += this.__getDetailsItem("id",this.element.id);
			str += this.__getDetailsItem("name",this.element.name);
		}
		str += "</table>";
		this.container = $$("#"+this.viewerID+"_container");
		this.container.innerHTML = str;
	},
	__getDetailsItem : function(rKey,rValue){
		var str = "<tr><td class='JskitSpirit_list_title' >"+rKey+":</td><td  class='JskitSpirit_list_content'>";
		if(typeof(rValue)!="string")rValue="";
		if(rKey.toLowerCase().indexOf("color")!=-1){
			str += "<span style='width:14px;font-size:8px;border:inset 2px #ffffff;background-color:"+rValue+"'>&nbsp;</span>&nbsp;"+rValue;
		}else{
			str += rValue;
		}
		str += "</td></tr>";
		return str;
	},
	__openViewer : function(){
		var _width = 280;
		var _height = 360;
		if($$("#"+this.viewerID)===null){
			this.viewer = document.createElement("div");
			this.viewer.id = this.viewerID;
			this.viewer.style.position = "absolute";
			this.viewer.style.left = $$("body").clientWidth-_width-10 + $$("body").scrollLeft;
			this.viewer.style.top = 10 + $$("body").scrollTop;
			this.viewer.style.zIndex = jskitBase.topIndex-10;
			this.viewer.style.width = _width;
			this.viewer.style.height = _height;
			this.viewer.style.border = "outset 2px #ffffff";
			this.viewer.style.backgroundColor = "#555555";
			this.viewer.style.overFlow = "hidden";
			this.viewer.style.paddingTop = "12px";

			jskitBase.append(this.viewer); 

			this.docInfo = document.createElement("div");
			this.docInfo.id = this.viewerID+"_docinfo";
			this.docInfo.style.width = _width;
			this.docInfo.style.overFlow = "hidden";
			this.viewer.appendChild(this.docInfo);
			this.__buildDocInfo();

			this.container = document.createElement("div");
			this.container.id = this.viewerID+"_container";
			this.viewer.appendChild(this.container);
		}else{
			var _obj = $$("#"+this.viewerID);
			_obj.style.display = "block";
			_obj.style.left = $$("body").clientWidth-_width-10 + $$("body").scrollLeft;
			_obj.style.top = 10 + $$("body").scrollTop;
		}
	},

	__buildDocInfo : function(rElement){
		this.docInfo = $$("#"+this.viewerID+"_docinfo");
		this.mposx = jskitSpirit.mposx;
		this.mposy = jskitSpirit.mposy;
		this.beginX = jskitSpirit.beginX;
		this.beginY = jskitSpirit.beginY;
		
		var _spanW = (this.beginX==0)?0:(this.mposx-this.beginX);
		var _spanH = (this.beginY==0)?0:(this.mposy-this.beginY);

		if(this.docInfo!=null){
			var _str = "<table  class='JskitSpirit_list_top_table' width='100%' border='0' cellpadding='0' cellspacing='0'>";
			_str += "<tr>";
			_str += "<td colspan='3' class='JskitSpirit_toolbar_title' height='18'>";
			_str += "&nbsp;&nbsp;-- JskitSpirit --</td>";
			_str += "<td align='right' class='JskitSpirit_toolbar_title'>";
			_str += "<button class='JskitSpirit_toolbar_btn' onclick='jskitSpirit.close();'>X</button>&nbsp;&nbsp;";
			_str += "</td>";
			_str += "</tr>";
			_str += "<tr>";
			_str += "<td class='JskitSpirit_list_top_title' >Mouse X:</td>";
			_str += "<td class='JskitSpirit_list_top_content'>"+this.mposx+"</td>";
			_str += "<td class='JskitSpirit_list_top_title' >Distance X(Ctrl):</td>";
			_str += "<td class='JskitSpirit_list_top_content'>"+_spanW+"</td>";
			_str += "</tr>";
			_str += "<tr>";
			_str += "<td class='JskitSpirit_list_top_title' >Mouse Y:</td>";
			_str += "<td class='JskitSpirit_list_top_content'>"+this.mposy+"</td>";
			_str += "<td class='JskitSpirit_list_top_title' >Distance Y(Ctrl):</td>";
			_str += "<td class='JskitSpirit_list_top_content'>"+_spanH+"</td>";
			_str += "</tr>";
			_str += "</table>";
			this.docInfo.innerHTML = _str;
		}
	},

	catchElement : function(rElement){
		jskitLog.debug("register element","JskitSpirit");
		this.element = rElement;
		this.mposx = event.clientX+$$("body").scrollLeft;
		this.mposy = event.clientY+$$("body").scrollTop;
		this.__openViewer();
		this.__showElementDetails();
	},

	close : function(){
		jskitSpirit.element = null;
		jskitSpirit.viewer = null;
		jskitSpirit.container = null;
		jskitSpirit.docInfo = null;
		jskitSpirit.mposx = 0;
		jskitSpirit.mposy = 0;
		jskitSpirit.beginX = 0;
		jskitSpirit.beginY = 0;
		$$("#"+this.viewerID).style.display = "none";
	},
	isValidElement : function(rElement){
		if(typeof(rElement.tagName)!="undefined"){
			if(rElement.tagName.toLowerCase()=="body"
				|| rElement.id.toLowerCase().indexOf("jskit")==0
			){
				return false;	
			}else{
				return true;
			}
		}else{
			return false;	
		}
	},
	view : function(rElement){
		jskitLog.debug("open spirit viewer","JskitSpirit");
		if(rElement==null){
			jskitLog.error("no object selected","JskitSpirit");
			return;
		}else{
			jskitSpirit.catchElement(rElement);
			jskitDynamic.add("#"+jskitSpirit.viewerID);
		}
	},

	drag : function(){
		if(this.viewer==null){
			this.__openViewer();
		}
		jskitDynamic.add("#"+this.viewerID);
	},

	onMouseMove : function(){
		if($$("#"+jskitSpirit.viewerID)!=null){
			jskitSpirit.mposx = event.clientX+$$("body").scrollLeft;
			jskitSpirit.mposy = event.clientY+$$("body").scrollTop;
			jskitSpirit.__buildDocInfo();

			if(this.beginX==0 && this.beginY==0){return;}
			if(jskitSpirit.element.id == event.srcElement.id){return;}

			jskitSpirit.element = event.srcElement;
			if(jskitSpirit.isValidElement(event.srcElement)){
				jskitSpirit.__showElementDetails();
			}else{
				jskitSpirit.__showEmptyDetails();
			}
		}
	},
	beginCountSpan : function(){
		if($$("#"+jskitSpirit.viewerID)!=null && event.keyCode==17 && jskitSpirit.beginX==0 && jskitSpirit.beginY==0 ){
			jskitSpirit.beginX = event.clientX+$$("body").scrollLeft;
			jskitSpirit.beginY = event.clientY+$$("body").scrollTop;
		}
	},
	endCountSpan : function(){
		if($$("#"+jskitSpirit.viewerID)!=null && event.keyCode==17){
			jskitSpirit.beginX = 0;
			jskitSpirit.beginY = 0;
			jskitSpirit.__buildDocInfo();
		}
	}
}