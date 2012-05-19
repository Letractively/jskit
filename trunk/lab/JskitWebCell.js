var JskitWebCell = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitWebCell";
	
	//#Begin Structures
	var __LOCATION = function(){
		this.lat = null;//纬度
		this.lon = null;//经度
	};
	var __POSITION = function(){
		this.x = null;//横坐标
		this.y = null;//纵坐标
	};
	var __PANELRANGE = function(){
		this.hBegin = null;
		this.vBegin = null;
		this.hEnd = null;
		this.vEnd = null;
	};
	//#End
	
	//#Begin Public properties
	var __minCellWidth = 10;
	var __minCellHeight = 10;
	var __maxCellWidth = 300;
	var __maxCellHeight = 300;
	
	//cell size
	var __cellWidth = 100;
	var __cellHeight = 100;

	//screen size
	var __screenWidth = null;
	var __screenHeight = null;
	
	//divide map into cells
	var __hCount = null;
	var __vCount = null;
	
	var __ol = new __LOCATION();
	__ol.lat = __ol.lon = 0;
	var __op = new __POSITION();
	var __pr = new __PANELRANGE();
	
	//world canvas
	var __canvas = null;
	var __canvasId = jskitUtil.guid();
		
	//border color
	var __borderColor = "#dddddd";
	
	//#Begin Private methods
	var __getOx = function(){
		return (parseFloat(__canvas.style.width)-__cellWidth)/2;
	};
	var __getOy = function(){
		return (parseFloat(__canvas.style.height)-__cellHeight)/2;
	};
	var __getHCount = function(){
		var _c = Math.ceil(__screenWidth/__cellWidth);
		return (_c%2==0)?(++_c):_c;
	};
	var __getVCount = function(){
		var _c = Math.ceil(__screenHeight/__cellHeight);
		return (_c%2==0)?(++_c):_c;
	};
	var __getPosition = function(rLat,rLon){
		var _p = new __POSITION();
		_p.x = __op.x + (rLat-__ol.lat)*__cellWidth; 
		_p.y = __op.y - (rLon-__ol.lon)*__cellHeight; 
		return _p;
	};
	var __getLocation = function(rX,rY){
		var _l = new this.LOCATION();
		var latBegin = __ol.lat - ((__hCount-1)/2);
		var lonBegin = __ol.lon + ((__vCount-1)/2);
		_l.lat = latBegin + parseInt((rX-parseFloat(__canvas.style.left))/__cellWidth);
		_l.lon = lonBegin + parseInt((parseFloat(__canvas.style.top)-rY)/__cellHeight);
		return _l;
	};
	var __setPanelRange = function(){
		__pr.hBegin = __ol.lat - ((__hCount-1)/2);
		__pr.hEnd = __ol.lat + ((__hCount-1)/2); 
		__pr.vBegin = __ol.lon + ((__vCount-1)/2);
		__pr.vEnd = __ol.lon - ((__vCount-1)/2); 
	};
	var __getCellsRange = function(){
		var r = new Array();
		r[r.length] = __ol.lat - ((__hCount-1)/2);
		r[r.length] = __ol.lon - ((__vCount-1)/2);
		r[r.length] = __ol.lat + ((__hCount-1)/2);
		r[r.length] = __ol.lon + ((__vCount-1)/2);
		return r;
	};
	var __getCellId = function(rLat,rLon){
		return "jwc_"+(rLat+"_"+rLon).replace(/-/gi,"_");
	};
	var __haveGuide = function(){
		return (__hCount*__vCount<200);
	};
	var __drawGuide = function(){
		if(!__haveGuide())return;
		var _count = 0;
		__initCanvasSize();
		var _p=null,_div=null;
		for(var i=__pr.hBegin;i<=__pr.hEnd;i++){
			for(var j=__pr.vBegin ;j>=__pr.vEnd;j--){
				_p = __getPosition(i,j);
				_div = __canvas.childNodes[_count];
				_div.style.position = "absolute";
				_div.setAttribute("id",__getCellId(i,j));
				if(_div==null)continue;
				_div.title = i+":"+j;
				_div.style.top = _p.y;
				_div.style.left = _p.x;
				_div.style.width = __cellWidth;
				_div.style.height = __cellHeight;
				_div.style.overflow = "hidden";
				_div.style.backgroundColor = "transparent";
				_div.style.borderTop = "1px solid "+__borderColor;
				_div.style.borderLeft = "1px solid "+__borderColor;
				_div.setAttribute("cell","wild");
				_div.setAttribute("lat",i);
				_div.setAttribute("lon",j);
				if(i==__ol.lat && j==__ol.lon){
					_div.innerHTML = i+','+j;
				}else{
					//_div.innerHTML = i+','+j;
					_div.innerHTML = "";
				}
				_div.style.backgroundImage = "none";
				if(i==__pr.hEnd){
					_div.style.borderRight = "1px solid #dddddd";
				}
				if(j==__pr.vEnd){
					_div.style.borderBottom = "1px solid #dddddd";
				}
				_count++;
				_p = _div = null;
			}
		}
		_count = null;
	};
	var __cellInCanvas = function(rLat,rLon){
		return (rLat>=__pr.hBegin && rLat<=__pr.hEnd && rLon<=__pr.vBegin && rLon>=__pr.vEnd);
	};
	var __initCellBox = function(){
		__canvas.innerHTML = "";
		var _s = new Array();
		for(var i=0;i<(__hCount*__vCount);i++){
			_s.push("<div></div>");
		}
		__canvas.innerHTML = _s.join('');
		_s = null;
	};
	var __initCanvasSize = function(){
		var w = __canvas.style.width = __hCount*__cellWidth;;
		var h = __canvas.style.height = __vCount*__cellHeight;
		var x = __canvas.style.left = 0-(w/2-__screenWidth/2);
		var y = __canvas.style.top = 0-(h/2-__screenHeight/2);
		__op.x = __getOx();
		__op.y = __getOy();
	};
	var __init = function(){
		__screenWidth = document.body.clientWidth;
		__screenHeight = document.body.clientHeight;
		__hCount = __getHCount();
		__vCount = __getVCount();
		if(__canvas==null){
			__canvas = document.createElement("div");
			__canvas.className = "panel";
			__canvas.setAttribute("id",__canvasId);
			$$("body").appendChild(__canvas);
			__canvas.style.position = "absolute";
			__canvas.onselectstart = function(){return false;};
		}
		__initCanvasSize();
		__setPanelRange();
	};
	var __start = function(){
		__init();
		if(__haveGuide()){
			__initCellBox();	
			__drawGuide();
		}
	};
	var __checkValues = function(){
		var _s = new Array();
		_s.push('hCount='+__hCount);
		_s.push('vCount='+__vCount);
		_s.push('cellWidth='+__cellWidth);
		_s.push('cellHeight='+__cellHeight);
		_s.push('ol.lat='+__ol.lat);
		_s.push('ol.lon='+__ol.lon);
		window.status = _s.join(';');
		_s = null;
	};
	//#End
	
	//#Begin Public methods
	this.getCanvas = function(){
		return __canvas;
	};
	this.getCell = function(rLat,rLon){
		return $$("#"+__getCellId(rLat,rLon));
	};
	this.getCellCount = function(){
		return (__hCount*__vCount);
	};
	this.setCell = function(rLat,rLon){
		var _lat = parseInt(rLat);
		var _lon = parseInt(rLon);
		if(isNaN(_lat) || isNaN(_lon)){return null;}
		if (!__cellInCanvas(_lat, _lon)) {
			return null;
		}
		var _c = this.getCell(_lat,_lon);
		if (_c == null) {
			_p = __getPosition(_lat,_lon);
			_c = document.createElement("div");
			_c.style.position = "absolute";
			_c.setAttribute("id",__getCellId(_lat,_lon));
			_c.title = _lat+":"+_lon;
			_c.style.top = _p.y;
			_c.style.left = _p.x;
			_c.style.width = __cellWidth;
			_c.style.height = __cellHeight;
			_c.style.overflow = "hidden";
			_c.style.backgroundColor = "transparent";
			_c.style.borderTop = "1px solid "+__borderColor;
			_c.style.borderLeft = "1px solid "+__borderColor;
			_c.setAttribute("cell","wild");
			_c.setAttribute("lat",_lat);
			_c.setAttribute("lon",_lon);
			_c.style.backgroundImage = "none";
			if(_lat==__ol.lat && _lon==__ol.lon){
				_c.innerHTML = "o";
			}else{
				_c.innerHTML = "";
			}
			__canvas.appendChild(_c);
			_p = null;
		}
		_lat = _lon = null;
		return _c;
	};
	this.setOlat = function(v){
		var _v = parseInt(v);
		if(!isNaN(_v))__ol.lat = _v;
		_v = null;
	};
	this.setOlon = function(v){
		var _v = parseInt(v);
		if(!isNaN(_v))__ol.lon = _v;
		_v = null;
	};
	this.setBorderColor = function(v){
		__borderColor = (typeof(v)=="string")?v:"";
	};
	this.move = function(rOffsetX,rOffsetY){
		var _x = parseInt(rOffsetX);
		var _y = parseInt(rOffsetY);
		if(isNaN(_x) || isNaN(_y))return false;
		if(Math.abs(_x)>__cellWidth || Math.abs(_y)>__cellHeight){
			var _lat = __ol.lat-Math.ceil(_x/__cellWidth);
			var _lon = __ol.lon+Math.ceil(_y/__cellHeight);
			this.refresh(_lat,_lon);
			_lat = _lon = null;
		}
		_x = _y = null;
	};
	this.moveTo = function(rLat,rLon,rFunc){
		if(typeof('JskitAnimation')=="undefined"){
			alert("JskitAnimation not found!");
			return;
		}
		rLat = (typeof(rLat)!="number")?0:rLat;
		rLon = (typeof(rLon)!="number")?0:rLon;
		
		if(rLat==__ol.lat && rLon==__ol.lon)return;
		var pp = __getPosition(rLat,rLon);
		var dstx = parseFloat($$(__canvas).getX())+__op.x-pp.x;
		var dsty = parseFloat($$(__canvas).getY())-pp.y+__op.y;
		
		window.jskitAnimation = new JskitAnimation("jskitAnimation");
		jskitAnimation.moveTo(__canvas,dstx,dsty,50,rFunc);
	};
	this.zoomInMax = function(){
		__cellWidth = __maxCellWidth;
		__cellHeight = __maxCellHeight;
		this.refresh();
	};
	this.zoomOutMax = function(){
		__cellWidth = __minCellWidth;
		__cellHeight = __minCellHeight;
		this.refresh();
	};
	this.zoomIn = function(e){
		if(__cellWidth>=__maxCellWidth){
			return;
		}
		__cellWidth += 100;
		if(__cellWidth>this.maxCellWidth){
			__cellWidth=this.maxCellWidth;
		}
		__cellHeight += 100;
		if(__cellHeight>this.maxCellHeight){
			__cellHeight=this.maxCellHeight;
		}
		this.refresh();
	};
	this.zoomOut = function(e){
		if(__cellWidth<=__minCellWidth){
			return;
		}
		__cellWidth = parseInt(__cellWidth*0.5);
		__cellHeight = parseInt(__cellHeight*0.5);
		this.refresh();
	};
	this.isCell = function(rObj){
		return (rObj!=null && rObj.tagName=="DIV"
			&& rObj.getAttribute("lat")!=null
			&& rObj.getAttribute("lon")!=null
			&& rObj.getAttribute("cell")!=null);
	};
	this.isCellChild = function(rObj){
		var _tmp = rObj;
		while( _tmp!==null && _tmp.tagName!=="BODY" && _tmp.id!==__canvasId ){
			if (this.isCell(_tmp)) {
				_tmp = null;
				return true;
				break;
			}
			_tmp = _tmp.offsetParent;
		}
		_tmp = null;
	};
	this.check = function(){
		__checkValues();
	};
	this.refresh = function(rLat,rLon){
		this.setOlat(rLat);
		this.setOlon(rLon);
		__canvas.innerHTML = "";
		__start();
	};
	this.start = function(rLat,rLon){
		this.setOlat(rLat);
		this.setOlon(rLon);
		$$("body").scroll = "no";
		__start();
	};
	//#End
};