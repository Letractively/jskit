/*****************************************************
*
* JsKit Dynamic
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
* #Require	 : /base/JskitBase.js
* 			 : /base/JskitUtil.js
* 			 : /base/jskitEvents.js
******************************************************/
function JskitDynamic(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitDynamic";
	//#Begin Structor
	var __ActiveStyle = function(){
		this.border = "";
		this.cursor = "";
	};
	//#End
	var __LimitRect = function(){
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.boxX = 0;
        this.boxY = 0;
    };
    var __lrect = null;
	//#Begin Private properties
	var __activeStyle = null;
	var __activeID = null;
	var __active = null;

	var __srcObject = null;

	var __actType = "";
	
	var __realtime = false;

	var __elementCount = 0;
	var __elements = new Array();

	var __relativeX = 0;
	var __relativeY = 0;
	var __keyName = "jskit_dynamic";
	var __moveReady = false;
	var __deployReady = false;

	var __unmovableTags = "body,head,html,script,style,form,meta,frame,textarea,input,frameset,link";
	var __movableTags = "div,font,span,table,a,img";
	var __blockTags = "textarea,input,select,button,a";
	var __bubble = true;
	
	var __offsetX = null;
	var __offsetY = null;
	var __startX = null;
	var __startY = null;
	var __oEventX = null;
	var __oEventY = null;
	var __movePrecision = 2;
	var __status = "play";

    var __onMoveDone = "return false;"

	//#End

	//#Begin Private method
	var __isRegistedElement = function(rObj){
		if(rObj==null){
			return false;}
		var _id = rObj.getAttribute("id");
		if(_id==__activeID){
			return false;
		}
		var _key = rObj.getAttribute(__keyName);
		return (__elements[_key]==true);
	};
	var __createCover = function(){
		if(__srcObject==null){return null;}
		if($("#"+__activeID)!=null){
			$("#"+__activeID).finalize(true);
		}
		__active = document.createElement("div");
		__active.id = __activeID;
		__active.onselectstart  = function(){return false;};
		__active.ondragstart  = function(){return false;};
		__active.style.position = "absolute";
		__active.style.zIndex = 99999;
		if (__realtime) {
			__active.style.border = "0px";
			__active.style.cursor = "auto";
			__active.style.backgroundColor = "transparent";
		}
		else {
			__active.style.border = "1px dotted #000000";
			__active.style.cursor = "move";
			if (typeof(__active.style.filter) != "undefined") {
				__active.style.backgroundColor = "#f6f6f6";
				__active.style.filter = "alpha(opacity=50)";
			}
		}
		__active.style.display = "none";
        __active = $(__active);
		jskitUtil.dom.insertAfter(__active,__srcObject);
	};
	var __isCover = function(obj){
		return (obj!=null && obj.getAttribute("id")==__activeID);
	};
	var __setCoverPosition = function(e){
		if(__actType=="resize"){
			var w = h = -1;
			if(e.clientX>__srcObject.getX())
				w = __active.style.width = e.clientX-__srcObject.getX();
			if(e.clientY>__srcObject.getY())
				h = __active.style.height = e.clientY-__srcObject.getY();
			__setSrcPosition();
			__active.innerHTML = '<span style="font-size:11px;font-family:verdana;padding:2px 2px 2px 2px;background-color:#000000;color:#ffff00">W:'+w+',H:'+h+'</span>';		
			w = h = null;
		}else{
			var x = __active.style.left = __relativeX+e.clientX;
			var y = __active.style.top = __relativeY+e.clientY;
			__active.innerHTML = '<span style="font-size:11px;font-family:verdana;padding:2px 2px 2px 2px;background-color:#000000;color:#ffff00">X:'+x+',Y:'+y+'</span>';
            x = y = null;
			__getOffset();
		}
	};
	var __checkPos = function(obj,x,y){
 		var _pos = new Array(false,false,false,false);
		if(obj==null)return;
        obj = $(obj);
        var size = 5;
        var objx = obj.getX();
        var objy = obj.getY();
        var objw = obj.offsetWidth;
        var objh = obj.offsetHeight;
		if(x>=objx
			&& x<=objx+objw
			&& objy+objh-y<=size
			&& objy+objh-y>=0){
				_pos[2] = true;
			}
        if(objx+objw-x>=0 && objx<=x){
            _pos[0] = true;
            if(objx+objw-x<=size && y<=objy+objh){
                _pos[1] = true;
            }
        }
        if(objy+objh-y>=0 && objy<=y){
            _pos[3] = true;
            if(objy+objh-y<=size && x<=objx+objw){
                _pos[2] = true;
            }
        }
		return _pos;
	};
	var __deployCover = function(e){
		if(__active==null){
			__createCover();
        }
		if(__active.style.display!="block"){
			__active.style.width  = __srcObject.offsetWidth;
			__active.style.height = __srcObject.offsetHeight;
			var _x = __active.style.left = __srcObject.effectStyle("left","number");
			var _y = __active.style.top = __srcObject.effectStyle("top","number");
			__relativeX = _x-e.clientX;
			__relativeY = _y-e.clientY;
			__active.style.display = "block";
            __active.style.overflow = "hidden";
		}
	};
	var __convertObjSharp = function(){
        __srcObject.style.width = __srcObject.offsetWidth;
        __srcObject.style.height = __srcObject.offsetHeight;
        __srcObject.style.position = "absolute";
		if(__lrect==null){//no limited
            __srcObject.style.left = __srcObject.getX();
            __srcObject.style.top = __srcObject.getY();
            $("body").appendChild(__srcObject);
        }else{//limited
            __srcObject.style.left = __srcObject.getX()-$(__srcObject.parentNode).getX();
            __srcObject.style.top = __srcObject.getY()-$(__srcObject.parentNode).getY();
        }
	};
	var __isBlockElement = function(rObj){
		if(rObj==null || typeof(rObj.tagName)=="undefined"){
			return false;
		}
		var _tagName = ","+rObj.tagName.toLowerCase()+",";
		var _tags = ","+__blockTags.toLowerCase()+",";
		return (_tags.indexOf(_tagName)!=-1);
	};
	var __checkFurther = function(rObj){
		var _tmp = rObj;
		if(__isBlockElement(rObj))return;
		if(__bubble){
			while( _tmp !== null && _tmp.tagName !== "BODY" ){
				if (__isRegistedElement(_tmp)) {
					__srcObject = $(_tmp);
					break;
				}
				_tmp = _tmp.offsetParent;
			}
		}else{
			if(__isRegistedElement(_tmp))
				__srcObject = $(_tmp);
		}
		_tmp = null;
	};
	var __isUnMovable = function(rObj){
		if(rObj!=null && rObj.tagName!=null){
			return (rObj.getAttribute("unmovable")=="yes");
		}
		return false;
	};
	var __setSrcPosition = function(){
		if(__srcObject==null || __active==null){return;}
		if(__actType=="move"){
			__srcObject.style.left = __active.style.left;
			__srcObject.style.top = __active.style.top;
		}else if(__actType=="resize"){
			__srcObject.style.width = __active.style.width;
			__srcObject.style.height = __active.style.height;
		}else{}
	};
	var __getOffset = function(){
		__offsetX = parseInt(__active.style.left)-__startX;
		__offsetY = parseInt(__active.style.top)-__startY;
	}
	var __stop = function(e){
		if(__active!=null){
			__active.style.display = "none";
		}
		__srcObject = null;
		__activeStyle = new __ActiveStyle();
		__relativeX = __relativeY = null;
		__startX = __startY = null;
		__oEventX = __oEventY = null;
		__moveReady = false;
        __offsetX = __offsetY = null;
        if(__status=="playing")__status="play";
	};
    var __checkMoveRect = function(e){
        if(__lrect==null){
            return true;
        }else{
            var _ex = e.clientX;
            var _ey = e.clientY;
            if(_ex>=__lrect.boxX && _ex<=(__lrect.maxX+__lrect.boxX) && _ey>=__lrect.boxY && _ey<=(__lrect.maxY+__lrect.boxY)) {
                var _x = __active.effectStyle("left","number");
                var _y = __active.effectStyle("top","number");
                var _w = __active.effectStyle("width","number");
                var _h = __active.effectStyle("height","number");
                var _x2 = _x + _w;
                var _y2 = _y + _h;
                //window.status = _x+","+_y+","+_x2+","+_y2+","+__lrect.minX+","+__lrect.minY+","+__lrect.maxX+","+__lrect.maxY;
                return (_x>=__lrect.minX && _x2<=__lrect.maxX && _y>=__lrect.minY && _y2<=__lrect.maxY);
            }
            return false;
        }
    };
    var __correctObjInRect = function(){
        if(__lrect==null){
            return;
        }else{
            var _x = __active.effectStyle("left","number");
            var _y = __active.effectStyle("top","number");
            var _w = __active.effectStyle("width","number");
            var _h = __active.effectStyle("height","number");
            var _x2 = _x + _w;
            var _y2 = _y + _h;
            if(_x<__lrect.minX)__active.style.left = __lrect.minX;
            if(_x2>__lrect.maxX)__active.style.left = __lrect.maxX-_w;
            if(_y<__lrect.minY)__active.style.top = __lrect.minY;
            if(_y2>__lrect.maxY)__active.style.top = __lrect.maxY-_h;
        }
    };
    //#End
	
	//#Begin in-Public methods
	var __setPosition = function(e){
		__setCoverPosition(e);
		if(__realtime)
			__setSrcPosition();
	};
	var __catchSrcObject = function(e){
		__checkFurther(e.srcElement);
		if (__srcObject==null) {
			__stop(e);
			return;
		}else{
			__convertObjSharp();
			__startX = parseInt(__srcObject.style.left);
			__startY = parseInt(__srcObject.style.top);
			__oEventX = e.clientX;
			__oEventY = e.clientY;
		}
	};
	var __startMoving = function(e){
        //if move to small, look as not move
		if(Math.abs(e.clientX-__oEventX)<__movePrecision
			&& Math.abs(e.clientY-__oEventY)<__movePrecision){
			__moveReady = false;
            __status = "play";
			return;
		}
		if(__srcObject==null){
			__stop(e);
		}else{
			__deployCover(e);
            __status = "playing";
			__moveReady = true;
		}
	};
 	var __setMouseStyle = function(e){
         var _obj = e.srcElement;
		if(__status=="play"){
            if(__isRegistedElement(_obj) || __isCover(_obj)){
                var _pos = __checkPos(_obj,e.clientX,e.clientY);
                if(_pos[2] && _pos[1]){
                    _obj.style.cursor = "se-resize";
                }else if(_pos[0] && _pos[3]){
                    _obj.style.cursor = "move";
                }else{
                    //_obj.style.cursor = "default";
                }
                _pos = null;
            }else{
                _obj.style.cursor = "default";
            }
        }else if(__status=="playing"){
             if(__actType=="resize"){
                 _obj.style.cursor = "se-resize";
             }else{
                 _obj.style.cursor = "move";
             }
        }
        _obj = null;
 	};
    var __setActType = function(e){
        var _pos = __checkPos(e.srcElement,e.clientX,e.clientY);
        if(_pos[2] && _pos[1]){
            __actType = "resize";
        }else{
            __actType = "move";
        }
        _pos = null;

    };
	//-- mouse action --
	this.__onMouseDown = function(e){
		if(__status=="pause")return true;
		if(__isUnMovable(event.srcElement))return true;
		__offsetX = __offsetY = null;
		__stop(e);
		__catchSrcObject(e);
        __setActType(e);
        return true;
	};
	this.__onMouseMove = function(e){
		if(__status=="pause"){
            return true;
        }
        __setMouseStyle(e);
		if(__moveReady){
			if(__checkMoveRect(e)){
                __setPosition(e);
             }
		}else{
            __startMoving(e);
        }
        return true;
	};
	this.__onMouseUp = function(e){
		if (__moveReady) {
			__correctObjInRect();
            __setSrcPosition();
            try{
                var _action = __onMoveDone;
                if(_action.indexOf("(")){
                    _action = _action.replace(/\(/gi,"(event");
                }else{
                    _action += "(event)";
                }
                eval(_action);
            }
            catch(ex){}
		}
        __stop(e);
        return true;
 	};

	//--
	//#End
	
	//#Begin Public methods
	this.getOffsetX = function(){
		return __offsetX;
	};
	this.getOffsetY = function(){
		return __offsetY;
	};
	this.setMovableTags = function(v){
		if(typeof(v)=="string")
			__movableTags = v;
	};
	this.getMovableTags = function(){
		return __movableTags;
	};
	this.getUnmovableTags = function(){
		return __unmovableTags;
	};
	this.getBlockTags = function(){
		return __blockTags;
	};
	this.setUnmovableTags = function(v){
		if(typeof(v)=="string")
			__unmovableTags = v;
	};
	this.setBlockTags = function(v){
		if(typeof(v)=="string")
			__blockTags = v;
	};
	this.setRealTime = function(v){
		__realtime = (typeof(v)=="boolean")?v:false;
	};
	this.getRealTime = function(){
		return __realtime;
	};
	this.setBubble = function(v){
		__bubble = (typeof(v)=="boolean")?v:true;
	};
	this.setOnMoveDone = function(v){
		__onMoveDone = v;
	};
    this.setMovePrecision = function(v){
        __movePrecision = (isNaN(parseInt(v)))?2:v;
    };
	this.setLimitRect = function(v){
        if(v==null){
            __lrect = null;
        }else if(typeof(v)=="object"){
            __lrect = new __LimitRect();
            __lrect.boxX = v.getX();
            __lrect.boxY = v.getY();
            __lrect.maxX = v.offsetWidth;
            __lrect.maxY = v.offsetHeight;
            _x = _y = null;
        }else if(typeof(v)=="string"){
            var _obj = $(v);
            if(_obj==null){
                __lrect = null;
                alert("JskitDynamic:setLimitRect:invalid rect");
            }else{
                __lrect = new __LimitRect();
                __lrect.boxX = _obj.getX();
                __lrect.boxY = _obj.getY();
                __lrect.maxX = _obj.offsetWidth;
                __lrect.maxY = _obj.offsetHeight;
                _x = _y = null;
            }
        }else{
            __lrect = null;
        }
    };
	this.remove = function(xpath){
		var _obj = $(xpath);
		if(_obj==null)return;
		var _key = _obj.getAttribute(__keyName);
		if(__elements[_key]==true){
			__elements[_key]==null;
			__elementCount--;
		}
	};
	this.isValidElement = function(rObj){
		if(rObj==null || typeof(rObj.tagName)=="undefined"){
			return false;
		}
		if (rObj.clientWidth < rObj.scrollWidth) {
			//return false;
		}
		if(__isUnMovable(rObj)){return false;}
		var _id = rObj.id;
		var _tagName = ","+rObj.tagName.toLowerCase()+",";
		var _mtags = ","+__movableTags.toLowerCase()+",";
		var _umtags = ","+__unmovableTags.toLowerCase()+",";
		if (_umtags.length > 0 && _umtags.indexOf(_tagName) != -1) {
			return false;
		}
		if(_mtags.length>0 && _mtags.indexOf(_tagName)==-1){
			return false;
		}
		return true;
	};
	this.add = function(rXPath){
		if (!__deployReady) {
			this.deploy();
		}
		var _obj = $(rXPath);
		if(_obj!==null && this.isValidElement(_obj)){
			_obj.onselect = function(){return false;};
			var _key = jskitUtil.guid();
			_obj.setAttribute(__keyName,_key);
			__elements[_key] = true;
			_key = null;
			if(!__isRegistedElement(_obj))
				__elementCount++;
		}
		_obj = null;
	};
	this.pause = function(){
		__status = "pause";
	};
	this.play = function(){
		__status = "play";
	};
	
	//#End
	this.deploy = function(){//constructor
		__activeID = jskitUtil.guid();
		__createCover();
		jskitEvents.add(document,"onmousedown",__hd+".__onMouseDown");
		jskitEvents.add(document,"onmousemove",__hd+".__onMouseMove");
		jskitEvents.add(document,"onmouseup",__hd+".__onMouseUp");
		__deployReady = true;
	};
}
var jskitDynamic = new JskitDynamic();
