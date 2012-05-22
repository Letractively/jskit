/*****************************************************
 *
 * Jskit Area Selector
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #QQ		  : 499199
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 * #Requied   : core/*
 * #Created   : 2010-8-31
 *
 ******************************************************/
var JskitAreaSelector = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitAreaSelector";
	var __mode = "select";//pop
	var __textObj = null;
	var __valueObj = null;
	var __data = null;
	var __startLevel = 1;

	//BEGIN pop mode
	var __panel = null;
	var __container = null;
	var __header = null;
	var __BuildPanelCode = function(){
		var _str = '';
		var _data = __data;
		if(__startLevel==2){
			_str += __ShowProvince(0)
		}else{
			var _str = '<table cellspacing="0" cellpadding="0"><tr>';
			for(var i=0;i<__data.length;i++){
				_str += '<td class="JskitAreaSelector_item" onclick="'+__hd+'.showProvince('+i+')">'+(__data[i].Name)+'</td>';
				if((i+1)%5==0){
					_str += '</tr><tr>';
				}
			}
			_str += '</table>';
		}
		return _str;
	};

	var __ShowPopPanel = function(){
		var str = '<div id="'+__hd+'_header" class="JskitAreaSelector_header">';
			str += '<div style="float:left">'+unescape("%u9009%u62E9%u533A%u57DF")+'</div>';
			str += '<div class="JskitAreaSelector_btn" onclick="'+__hd+'.closePanel()">['+unescape("%u5173%u95ED")+']</div>';
			str += '<div class="JskitAreaSelector_btn" onclick="'+__hd+'.clear()">['+unescape("%u7F6E%u7A7A")+']</div>';
			str += '<div class="JskitAreaSelector_btn" onclick="'+__hd+'.reset()">['+unescape("%u91CD%u7F6E")+']</div>';
			str += '</div>';
		str += '<div id="'+__hd+'_container" class="JskitAreaSelector_container">'+__BuildPanelCode()+'</div>';
		__panel = jskitUtil.doc.pop(__panel,__textObj,str,"position=down");
		__panel.className = "JskitAreaSelector_panel";
		__container = $$("#"+__hd+"_container");
	};

	this.reset = function(){
		__ShowPopPanel();
	};
	this.clear = function(){
		this.selectAreaCallback("","");
	};
	var __ClosePanel = function(){
		if(__panel!=null){
			__panel.style.display = "none";
		}
	};
	var __ShowProvince = function(countryIdx){
		var _data = (countryIdx>=0)?__data[countryIdx].Sub:new Array();
		var _str = new Array();
		_str.push('<table cellspacing="0" cellpadding="0"><tr>');
		for(var i=1;i<_data.length;i++){
			_str.push('<td class="JskitAreaSelector_item" onclick="'+__hd+'.showCity('+countryIdx+','+i+')" onmouseover="'+__hd+'.active(this,event)" onmouseout="'+__hd+'.unactive(this,event)" >'+(_data[i].Name)+'</td>');
			if(i%5==0){
				_str.push( '</tr><tr>');
			}
		}
		if(_data.length%5!=0){_str.push('</tr>')}
		_str.push('</table>');
		return _str.join('');
		_data = _str = null;
	};
	this.showProvince = function(countryIdx){
		__container.innerHTML = __ShowProvince(countryIdx);
	};
	this.showCity = function(countryIdx,provinceIdx){
		var _data = __data[countryIdx].Sub[provinceIdx].Sub;
		var _str = new Array();
		_str.push('<table cellspacing="0" cellpadding="0"><tr>');
		for(var i=0;i<_data.length;i++){
			_str.push('<td class="JskitAreaSelector_item" onclick="'+__hd+'.selectAreaCallback('+countryIdx+','+provinceIdx+','+i+')" onmouseover="'+__hd+'.active(this,event)" onmouseout="'+__hd+'.unactive(this,event)" >'+(_data[i].Name)+'</td>');
			if((i+1)%5==0){
				_str.push('</tr><tr>');
			}
		}
		if(_data.length%5!=0){_str.push('</tr>')}
		_str.push('</table>');
		__container.innerHTML = _str.join('');
		_str = _data = null;
	};
	this.getNameByKey = function(rKey){
		if(typeof(rKey)!="string" || rKey=="")return "";
		var pl = null;
		var cl = null;
		for(var i=0;i<__data.length;i++){
			pl = __data[i].Sub;
			for(var j=0;j<pl.length;j++){
				cl = pl[j].Sub;
				for(var k=0;k<cl.length;k++){
					if(cl[k].Key==rKey){
						if(__startLevel==1){
							return __data[i].Name + "," + pl[j].Name + "," + cl[k].Name;
						}else{
							return pl[j].Name + "," + cl[k].Name;
						}
					}
				}
				cl = null;
			}
			pl = null;
		}
		return "";
	};
	this.setTextField = function(v){
		__textObj = (typeof(v)=="object")?v:null;
	};
	this.setValueField = function(v){
		__valueObj = (typeof(v)=="object")?v:null;
	};
	this.setData = function(v){
		__data = v;
	};
	this.setStartLevel = function(v){
		if(v==1 || v==2){
			__startLevel = parseInt(v);
		}
	};
	this.active = function(sender,e){
		sender.className = "JskitAreaSelector_item_c";
	};
	this.unactive = function(sender,e){
		sender.className = "JskitAreaSelector_item";
	};
	this.selectAreaCallback = function(countryIdx,provinceIdx,cityIdx){
		var _txt = null;
		var _key = null;
		if(__startLevel==1){
			_txt =  __data[countryIdx].Name + ","+__data[countryIdx].Sub[provinceIdx].Name + "," + __data[countryIdx].Sub[provinceIdx].Sub[cityIdx].Name;
		}else{
			_txt = __data[countryIdx].Sub[provinceIdx].Name + "," + __data[countryIdx].Sub[provinceIdx].Sub[cityIdx].Name;
		}
		_key =  __data[countryIdx].Sub[provinceIdx].Sub[cityIdx].Key;
		if(__textObj!=null){
			if(typeof(__textObj.value)=="string"){
				__textObj.value = _txt;
			}else{
				__textObj.innerHTML = _txt;
			}
		}
		if(__valueObj!=null){
			if(typeof(__valueObj.value)=="string"){
				__valueObj.value = _key;
			}else{
				__valueObj.innerHTML = _key;
			}
		}
		__ClosePanel();
	};
	this.open = function(rTextFieldId,rValueFieldId,hasCountry){
		__textObj = $$("#"+rTextFieldId);
		__valueObj = $$("#"+rValueFieldId);
		if(typeof(hasCountry)=="boolean"){
			__startLevel = (hasCountry)?1:2;
		}else{
			__startLevel = 2;
		}
		__ShowPopPanel();
	};
	this.closePanel = function(){
		__ClosePanel();
	};
	//END pop mode

};