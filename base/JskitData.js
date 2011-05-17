/*****************************************************
 *
 * JskitData
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : ;
 *
 ******************************************************/
var JskitData = new function(){
	//#Begin *DataSet definition* ------------------------------
	this.DataSet = function(rHd){
		var __hd = (typeof("rHd") == "string") ? rHd : "jskitData";
		var __xmlDoc = null;
		
		var __columns = new Array();
		var __data = new Array();
		
		var __isDistinct = function(key, value){
			for (var i = 0; i < __data.length; i++) {
				if (__data[i][key] == value) 
					return false;
			}
			return true;
		};
		var __isEmpty = function(value){
			return (typeof(value) == "undefined" || value == null);
		};
		this.addColumn = function(rKey, rEmpty, rDistinct){
			if (typeof(rKey) != "string" && rKey.trim() == "") 
				return false;
			rKey = rKey.trim();
			var _c = new __Column();
			_c.key = rKey;
			_c.empty = (typeof(rEmpty) == "boolean") ? rEmpty : true;
			_c.distinct = (typeof(rDistinct) == "boolean") ? rDistinct : false;
			if (_c.empty) 
				_c.distinct == false;
			__columns.push(_c);
			_c = null;
			return true;
		};
		this.setColumn = function(){
			__columns = new Array();
			for (var i = 0; i < arguments.length; i++) {
				this.addColumn(arguments[i]);
			}
		};
		this.row = function(index){
			return __data[index];
		};
		this.count = function(){
			return __data.length;
		};
		this.insert = function(){
			var _d = new Array();
			for (var i = 0; i < __columns.length; i++) {
				if ((__columns[i].distinct == true && __isDistinct(__columns[i].key, arguments[i])) ||
				(__columns[i].empty == false && __isEmpty(arguments[i]))) {
					return false;
				}
				else {
					__d.push(arguments[0]);
				}
			}
			__data.push(_d);
			_d = null;
			return true;
		};
	};
	//#End -------------------------------------------------------
	
	//#Begin *Map definition* ------------------------------
	this.Map = function(rHd){
		var __hd = (typeof(rHd) == "string") ? rHd : "jskitData";
		var __mapId = jskitUtil.guid();
		var __data = document.createElement("div");
		var __itemId = function(rKey){
			return __mapId+"_"+rKey;
		};
		var __item = function(rKey){
			return $("#"+__itemId(rKey));			
		};
		this.get = function(rKey){
			var _d = __item(rKey);
			if(_d!=null)
				return _d.innerHTML;
			else
				return null;
		};
		this.set = function(rKey,rValue){
			var _d = __item(rKey);
			if(_d==null){
				_d = document.createElement("div");
				_d.setAttribute("id",__itemId(rKey));
				_d.innerHTML = rValue;
				__data.appendChild(_d);
			}else{
				_d.innerHTML = rValue;
			}
			_d = null;
		};
		this.remove = function(rkey){
			var _d = __item(rKey);
			if (_d == null) {
				__data.removeChild(_d);
			}
		};
		this.count = function(){
			return __data.childNodes.length;
		};
	};
	//#End -------------------------------------------------------
	
	//#Begin *ArrayList definition* ------------------------------
	this.ArrayList = function(rHd){
		var __hd = (typeof(rHd) == "string") ? rHd : "jskitData";
		var __list = new Array();
		var __validIndex = function(rIdx){
			return ( (typeof(rIdx)=="number")
				&& (parseInt(rIdx)==rIdx)
				&& (rIdx<__list.length) );
		};
		this.push = function(rObj){
			__list.push(rObj);	
		};
		this.insert = function(rIdx,rObj){
			if(!__validIndex(rIdx))return false;
			var _list = new Array();
			for(var i=0;i<__list.length;i++){
				_list.push(__list[i]);
				if(i==rIdx){
					_list.push(rObj);
				}
			}
			__list = _list;
			_list = null;
		};
		this.remove = function(rIdx){
			if(!__validIndex(rIdx))return false;
			var _list = new Array();
			for(var i=0;i<__list.length;i++){
				if(i!=rIdx)
					_list.push(__list[i]);
			}
			__list = _list;
			_list = null;
		};
		this.get = function(rIdx){
			if(!__validIndex(rIdx))return null;
			return __list[rIdx];
		};
		this.set = function(rIdx,rObj){
			if(!__validIndex(rIdx))return;
				__list[rIdx]= rObj;
		};
		this.count = function(){
			return __list.length;
		};
		
	};
	//#End -------------------------------------------------------

	
	//#End -------------------------------------------------------
}