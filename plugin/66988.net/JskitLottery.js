/*****************************************************
*
* JskitLottery 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
function JskitLottery(){
	this.configuation = new this.__configuation();
	this.message = new jskitUtil.Message();

	this.__list = new Array();
	this.__listExt = null;
}

JskitLottery.prototype.__configuation = function(){
	this.switchId = "";
	this.returnId = "";
	this.max = 0;
	this.full = 0;
	this.extMax = 0;
	this.cols = 10;
	this.split = ",";
};

//------------------------------------------------
JskitLottery.prototype.__init = function(){
	for(var i=0;i<this.configuation.max;i++){
		this.__list[i] = false;
	}
};
JskitLottery.prototype.__isFull = function(){
	var _count = 0;
	for(var i=0;i<this.__list.length;i++){
		if(this.__list[i]){
			_count++;
		}
		if(_count>=parseInt(this.configuation.full)){
			return true;
		}
	}
	return false;
};
JskitLottery.prototype.__isSelected = function(rNum){
	return (this.__list[rNum]);
};
JskitLottery.prototype.select = function(){
	var _obj = event.srcElement;
	var _num = _obj.id.replace("JskitLottery_","");
	if(this.__isSelected(_num)){
		this.__unSelect(_obj,_num);
	}else{
		if(this.__isFull())return;
		this.__select(_obj,_num);
	}
	this.__displayResult();
};
JskitLottery.prototype.selectExt = function(){
	var _obj = event.srcElement;
	var _num = parseInt(_obj.id.replace("JskitLottery_ext_",""));
	if(this.__listExt!=null && this.__listExt.id==_obj.id){
		return;
	}else{
		if(this.__listExt!=null){
			this.__listExt.className = "JskitLottery_num_ext";
		}
		this.__selectExt(_obj,_num+1);
	}
};
JskitLottery.prototype.__selectExt = function(rObj,rNum){
	this.__listExt = rObj;
	this.__listExt.className = "JskitLottery_num_off";
	this.__displayExt(rNum);
};
JskitLottery.prototype.__select = function(rObj,rNum){
	this.__list[rNum-1] = true;
	rObj.className = "JskitLottery_num_off";
};
JskitLottery.prototype.__unSelect = function(rObj,rNum){
	this.__list[rNum] = false;
	rObj.className = "JskitLottery_num";
};
JskitLottery.prototype.__displayResult = function(){
	var _str = "";
	for(var i=0;i<this.__list.length;i++){
		if(this.__list[i]){
			_str += "<font class=\"JskitLottery_result\">"+this.format(i+1)+"</font>";
		}
	}
	$("#JskitLottery_result").innerHTML = _str;
	this.__setBtnStatus();
};
JskitLottery.prototype.__displayExt = function(rNum){
	if(rNum>0){
		var _str = "<font class=\"JskitLottery_result_ext\">"+this.format(parseInt(rNum))+"</font>";
		$("#JskitLottery_result_ext").innerHTML = _str;
	}else{
		$("#JskitLottery_result_ext").innerHTML = "";
	}
	this.__setBtnStatus();
};
JskitLottery.prototype.__setBtnStatus = function(){
	if(this.__isFull() && this.__listExt!=null){
		$("#btn_ok").disabled = false;
	}else{
		$("#btn_ok").disabled = true;
	}
};
JskitLottery.prototype.isSelected = function(rList,rValue){
	for(var i=0;i<rList.length;i++){
		if(rList[rValue]==true)return true;
	}
	return false;
};
JskitLottery.prototype.radomNumbers = function(){
    var _numbers = new Array();
	for(var i=1;i<=this.configuation.max+1;i++){
		_numbers[i] = false;
	}
	var _count = 1;
	while(_count<=this.configuation.full){
		var num = parseInt(Math.random()*60);
		if(num>0 && num<this.configuation.max && !this.isSelected(_numbers,num)){
			_numbers[num] = true;
			_count++;
		}
	}
	var numExt = -1;
	if(this.configuation.extMax>=2){
		while(numExt<1 || numExt>this.configuation.extMax){
			numExt = parseInt(Math.random()*60);
		}
	}
	_numbers[this.configuation.max+1] = numExt;
	return _numbers;
};
JskitLottery.prototype.radom = function(){
	jskitLottery.reset();
	while(!jskitLottery.__isFull()){
        var num = parseInt(Math.random()*60);
        if(num>0 && num<jskitLottery.configuation.max){
			var _obj = $("#JskitLottery_"+(num-1));
			jskitLottery.__select(_obj,num);
		}
    }
	jskitLottery.__displayResult();
	var numExt = -1;
	if(jskitLottery.configuation.extMax>=2){
		while(numExt<1 || numExt>jskitLottery.configuation.extMax){
			numExt = parseInt(Math.random()*60);
		}
	}else if(jskitLottery.configuation.extMax==1){
		numExt = 1;
	}else{
		return;
	}
	var _obj = $("#JskitLottery_ext_"+(numExt-1));
	jskitLottery.__selectExt(_obj,numExt);
};
JskitLottery.prototype.reset = function(){
	$("#JskitLottery_panel").innerHTML = this.__numsContent();
	this.__init();
	this.__listExt = null;
	this.__displayResult();
	this.__displayExt();
};
JskitLottery.prototype.format = function(rNum){
	return rNum;
	if(rNum<10){
		rNum = "0"+rNum;
	}
	return rNum;
};
JskitLottery.prototype.open = function(){
	var _panel = null;
	if($("#JskitLottery_panel")!=null){
		var _p = $("#JskitLottery_panel");
		_p.parentNode.removeChild(_panel);
	}
	_panel = document.createElement("div");
	_panel.id = "JskitLottery_panel";
	_panel.className = "JskitLottery_panel";
	_panel.style.position = "absolute";
	_panel.style.left = event.clientX;
	_panel.style.top = event.clientY;
	_panel.style.zIndex = "999";
	_panel.style.border = "2px outset #ffffff";
	$("body").appendChild(_panel);

    _panel.innerHTML = jskitLottery.__numsContent();
};
JskitLottery.prototype.__numsContent = function(){
	var _str = "<table cellspacing='0'><tr><td>";
    for(var i=0;i<this.configuation.max;i++){
        _str += "<font id=\"JskitLottery_"+i+"\" class=\"JskitLottery_num\" onclick=\"jskitLottery.select()\">"+this.format(i+1)+"</font>";
        if(i!=0 && (i+1)%this.configuation.cols==0){
			_str += "<br />";
		}
    }
	_str += "</td></tr>";
	
	_str += "<tr><td style='border-bottom:1px solid #aaaaaa;'>"+this.__extNumsContent()+"</td></tr>";
	
	_str += "<tr><td align='center' style='border-top:1px solid #ffffff;border-bottom:1px solid #aaaaaa;'><table align='center' cellspacing='0' cellpadding='0'>";
	_str += "<tr><td height='30'>";
	_str += "<div id=\"JskitLottery_result\" class=\"JskitLottery_result_container\" ></div>";
	_str += "</td><td>";
	_str += "<div id=\"JskitLottery_result_ext\" class=\"JskitLottery_result_container_ext\" ></div>";
	_str += "</td></tr>";
	_str += "</td></tr></table>";

    _str += "<tr><td align='center' height='30' style='border-top:1px solid #ffffff;'>";
	_str += "<input type=\"button\" id=\"btn_ok\" value=\"OK\" onclick=\"jskitLottery.getResult()\" disabled />";
	_str += "&nbsp;&nbsp;";
	_str += "<input type=\"button\" value=\"Radom\" onclick=\"jskitLottery.radom()\" />";
	_str += "&nbsp;&nbsp;";
	_str += "<input type=\"button\" value=\"Reset\" onclick=\"jskitLottery.reset()\" />";
	_str += "&nbsp;&nbsp;";
	_str += "<input type=\"button\" value=\"Cancel\" onclick=\"jskitLottery.close()\" />";
	_str += "</td></tr>";
    _str += "</table>";
	return _str;
};
JskitLottery.prototype.__extNumsContent = function(){
	if(this.configuation.extMax<1){return "";}
	var _str = "";
    for(var i=0;i<this.configuation.extMax;i++){
        _str += "<font id=\"JskitLottery_ext_"+i+"\" class=\"JskitLottery_num_ext\" onclick=\"jskitLottery.selectExt()\">"+this.format(i+1)+"</font>";
        if(i!=0 && (i+1)%this.configuation.cols==0){
			_str += "<br />";
		}
    }
	return _str;
};
JskitLottery.prototype.getResult = function(){
	var _return = $("#"+jskitLottery.configuation.returnId);
	if(_return!=null){
		var _value = "";
		for(var i=0;i<jskitLottery.__list.length;i++){
			if(jskitLottery.__list[i]){
				_value += ","+(i+1);
			}
		}
		var _extNum = parseInt(this.__listExt.id.replace("JskitLottery_ext_",""))+1;
		_value += ","+_extNum;
		_return.value = _value.replace(",","");
	}
	jskitLottery.close();
};
JskitLottery.prototype.close = function(){
	jskitLottery.reset();
	var _panel = $("#JskitLottery_panel");
	_panel.parentNode.removeChild(_panel);
};
JskitLottery.prototype.__onload = function(){
	var _switch = $("#"+jskitLottery.configuation.switchId);
	if( _switch!=null ){
		jskitEvents.add(_switch,"onclick","jskitLottery.open");
	}
};
//------------------------------------------------

var jskitLottery = new JskitLottery();
$import.css("JskitLottery.css","/JskitLottery.js");
jskitEvents.ready("onload","jskitLottery.__onload");

 