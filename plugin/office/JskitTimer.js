/*****************************************************
*
* JskitTimer 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
function JskitTimer(rHd){
	this.hd = (typeof(rHd)!="string")?"jskitTree":rHd;
	this.configuation = new this.__configuation();
	this.__day = -1;
	this.__hour = -1;
	this.__minute = -1;
	this.__second1 = -1;
	this.__second2 = -1;

	this.__jskitTimer = null;
}
JskitTimer.prototype.__configuation = function(){
	this.language = "zh_cn";
	this.dateTime = "";
	this.displayerId = "";
	this.timeInterVal = 1;
	this.imgPath = "";
	this.textStyle = "";
	this.numberStyle = "";
	this.mode = "forward";

};
JskitTimer.prototype.__text = {
	"zh_cn" : new Array(
			decodeURI("%E6%97%A5"),
			decodeURI("%E6%97%B6"),
			decodeURI("%E5%88%86"),
			decodeURI("%E7%A7%92"),
			decodeURI("%E6%AF%AB%E7%A7%92")
		),
	"en" : new Array(
			"Day","Hou","Min","Sec","Ms"
		),
	"en_long" : new Array(
			"Days","Hours","Minutes","Seconds","Mseconds"
		)
};
JskitTimer.prototype.__action = function(){
	eval("var _hd = "+this.hd);
	var _now = new Date();
	var _span;
	if(_hd.configuation.mode=="forward"){
		_span = jskitUtil.date.timeSpan(_now,_hd.configuation.dateTime);
	}else{
		_span = jskitUtil.date.timeSpan(_hd.configuation.dateTime,_now);
	}
	if(_span==null){
		window.clearInterval(_hd.__timer);
	}else{
		if($("#__jskitTimerDisplayerBox")==null){
			var _textStyle = " style='"+_hd.configuation.textStyle+"' ";
			var _text = _hd.__text[_hd.configuation.language];
			var str = "";
			str += "<table cellspacing='0' cellpadding='0' id='__jskitTimerDisplayerBox'><tr>"
				+"<td id='__jskitTimerDisplayer_day'></td>"
				+"<td "+_textStyle+">"+_text[0]+"</td>"
				+"<td id='__jskitTimerDisplayer_hour'></td>"
				+"<td "+_textStyle+">"+_text[1]+"</td>"
				+"<td id='__jskitTimerDisplayer_minute'></td>"
				+"<td "+_textStyle+">"+_text[2]+"</td>"
				+"<td id='__jskitTimerDisplayer_second1'></td>"
				+"<td id='__jskitTimerDisplayer_second2'></td>"
				+"<td "+_textStyle+">"+_text[3]+"</td>"
				+"<td id='__jskitTimerDisplayer_milliSecond'></td>"
			str += "</tr></table>"
			if($("#"+_hd.configuation.displayerId)!=null){
				$("#"+_hd.configuation.displayerId).innerHTML = str;
			}
		}
		if(_hd.__day!=_span["totalDay"]){
			$("#__jskitTimerDisplayer_day").innerHTML = _hd.__buildNumHtml(_span["totalDay"],false);
			_hd.__day=_span["totalDay"];
		}
		if(_hd.__hour!=_span["hour"]){
			$("#__jskitTimerDisplayer_hour").innerHTML = _hd.__buildNumHtml(_span["hour"],false);
			_hd.__hour=_span["hour"];
		}
		if(_hd.__minute!=_span["minute"]){
			$("#__jskitTimerDisplayer_minute").innerHTML = _hd.__buildNumHtml(_span["minute"],false);
			_hd.__minute=_span["minute"];
		}
		var _second1 = (_span["second"]>=10)?((_span["second"]+"").charAt(0)):0;
		if(_hd.__second1!=_second1 ){
			$("#__jskitTimerDisplayer_second1").innerHTML = _hd.__buildNumHtml(_second1,true);
			_hd.__second1=_second1;
		}
		var _second2 = (_span["second"]>=10)?((_span["second"]+"").charAt(1)):_span["second"];
		if(_hd.__second2!=_second2 ){
			$("#__jskitTimerDisplayer_second2").innerHTML = _hd.__buildNumHtml(_second2,true);
			_hd.__second2=_second2;
		}
		var _ms = parseInt(_span["milliSecond"]/_hd.configuation.timeInterVal);
		if(_ms>0){
			$("#__jskitTimerDisplayer_milliSecond").innerHTML = _hd.__buildNumText(_ms); 
		}
	}
};
JskitTimer.prototype.__buildNumText = function(rValue){
	var _html = "";
	var _num = rValue;
	if(_num<10){
		_num += "00";
	}else if(_num<100){
		_num += "0";
	}else{
		_num = _num.toString();
	}
	return "<font style='"+this.configuation.numberStyle+"'>"+_num+"</font>";
}
JskitTimer.prototype.__buildNumHtml = function(rValue,rSingle){
	var _html = "";
	var _num = (typeof(rValue)=="string")?parseInt(rValue):rValue;
	if(rSingle){//just for second
		_num = (_num<0 || _num>9)?"0":_num.toString();
	}else{
		if(_num<=0){
			_num = "00";
		}else{
			_num = (_num<10 && _num>0)?"0"+_num:_num.toString();
		}
	}
	for(var i=0;i<_num.length;i++){
		if(this.configuation.imgPath!=""){
			_html += "<img name='jskitTimerItem"+i+"' "
				+ " src='"+this.configuation.imgPath+"num_green_0"+_num.charAt(i)+".gif' "
				+ " width=12 height=19>";
		}else{
			_html += "<font style='"+this.configuation.numberStyle+"'>"+_num.charAt(i)+"</font>";
		}
	}
	return _html;
};
JskitTimer.prototype.__loadImages = function(){
	var _box = document.createElement("div");
	_box.id = "jskitTimer_images_box";
	_box.style.display = "none";
	$("body").appendChild(_box);
	for(var i=0;i<10;i++){
		var _img = document.createElement("img");
		_img.name = "jskitTimerItem"+i+"' ";
		_img.src = "images/num_orange_0"+i+".gif' ";
		_img.style.width = "12px";
		_img.style.height = "19px";
		_box.appendChild(_img);
	}
};
JskitTimer.prototype.begin = function(){
	eval(this.hd+".__loadImages();");
	eval(this.hd+".__action();");
	eval("var _interval = "+this.hd+".configuation.timeInterVal;");
	this.__timer = window.setInterval(this.hd+".__action()",_interval);
};
JskitTimer.prototype.changeDateTime = function(rValue){
	this.configuation.dateTime = rValue;
};
var jskitTimer = new JskitTimer("jskitTimer");
jskitEvents.ready("onload","jskitTimer.begin");