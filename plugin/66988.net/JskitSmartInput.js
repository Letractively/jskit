/*****************************************************
*
* JskitSmartInput 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
function JskitSmartInput(){
	this.configuation = new this.__configuation();
	this.message = new jskitUtil.Message();
	this.__inputValue = "";
}
				

JskitSmartInput.prototype.__configuation = function(){
	this.numLength = 7;
	this.tail = 2;
	this.inputId = "";
	this.displayerId = "";
	this.itemClass = "";
	this.itemStyle = "";
	this.imagePath = "";
};

//------------------------------------------------
JskitSmartInput.prototype.__SIntFormat = function(rNum){
	if(parseInt(eval(rNum))==0){
		return "";
	}
	var _result = "";
	var _count = 0;
	for(var i=rNum.length-1; i>=0; i--) {
		if(_count%3==0 && _count!=0){
			_result = "," + _result;
		}
		_result = rNum.charAt(i) + _result;
		_count++;
	}
	return _result;
};
JskitSmartInput.prototype.__parseInt = function(rValue){
	rValue = rValue.replace(/[\D]/gi,"");
	rValue = rValue.replace(/^0*/,"");
	if(rValue=="")rValue="0";
	return rValue;
};
JskitSmartInput.prototype.__isMax = function(rValue){
	var _count = this.__parseInt(rValue);
	var _max = 1;
	for(var i=0;i<this.configuation.numLength;i++){
		_max = _max*10;
	}
	_max = _max-1;
	return ( _count>=_max);
};
JskitSmartInput.prototype.__format = function(rStr){
	if(jskitSmartInput.__isMax(rStr)){
		return this.__inputValue;
	}
	rStr = this.__parseInt(rStr);
	if(rStr==0){
		return "";
	}else if(rStr.length==1){
		return "0.0"+rStr;
	}else if(rStr.length==2){
		return "0."+rStr;
	}else{
		var _head = rStr.substr(0,rStr.length-this.configuation.tail);
		var _tail = rStr.substr(rStr.length-this.configuation.tail);
		_head = this.__SIntFormat(_head);
		return _head + "." + _tail;
	}
};
JskitSmartInput.prototype.__checkInput = function(){
	if (event.keyCode < 45 
		|| event.keyCode > 57 
		|| ((event.keyCode > 32 && event.keyCode < 48) 
		|| (event.keyCode > 57 && event.keyCode < 65) 
		|| (event.keyCode > 90 && event.keyCode < 97))){
		event.returnValue = false;
	}
};
JskitSmartInput.prototype.__change = function(){
	var _input = event.srcElement;
	var _value = _input.value = jskitSmartInput.__format(_input.value);
	if(jskitSmartInput.__inputValue==_value){
		return;
	}else{
		jskitSmartInput.__inputValue = _value;
		jskitSmartInput.__display(_value);
	}
};
JskitSmartInput.prototype.__display = function(rValue){
	rValue = this.__parseInt(rValue)+"";
	var _zeroLength = this.configuation.numLength-rValue.length;
	for(var i=0;i<_zeroLength;i++){
		rValue = "0"+rValue;
	}
	for(var i=rValue.length-1;i>=0;i--){
		var _char = rValue.charAt(i);
		var _item = $("#JskitSmartInput_img_"+(rValue.length-i-1));
		if(_item!=null){
			_item.src = this.configuation.imagePath+"num_0"+_char+".gif";
			_item.title = _char;
		}
	}
};

JskitSmartInput.prototype.deploy = function(){
	var _displayer = $("#"+jskitSmartInput.configuation.displayerId);
	if(_displayer!=null){
		var _html = "<table cellspacing='0' cellpadding='0'><tr>";
		for(var i=jskitSmartInput.configuation.numLength-1;i>=0;i--){
			_html += "<td class='"+jskitSmartInput.configuation.itemClass+"' ";
			_html += " style='"+jskitSmartInput.configuation.itemStyle+"' id='JskitSmartInput_"+i+"'>";
			_html += "<img id=\"JskitSmartInput_img_"+i+"\" height=\"40\" src=\""+jskitSmartInput.configuation.imagePath+"num_00.gif\" width=\"31\" border=0 title='0' />"; 
			_html += "</td>";
			if(i==jskitSmartInput.configuation.tail){
				_html += "<td id='JskitSmartInput_interval' style='font-size:40px;font-weight:bold' valign='bottom'>.</td>";
			}
		}
		_html += "<td id='JskitSmartInput_interval' style='font-size:36px;font-weight:bold' valign='middle'>元</td>";
		_html += "</tr></table>";
		_displayer.innerHTML = _html;
	}
	var _input = $("#"+jskitSmartInput.configuation.inputId);
	if(_input!=null){
		//_input.maxLength = 9; 
		_input.style.textAlign = "right";
		jskitEvents.add(_input,"onkeyup","jskitSmartInput.__change");
		jskitEvents.add(_input,"onkeypress","jskitSmartInput.__checkInput");
	}
};
//------------------------------------------------

var jskitSmartInput = new JskitSmartInput();
jskitEvents.ready("onload","jskitSmartInput.deploy");
 