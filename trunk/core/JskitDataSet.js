/****************************************************************************
*
* JskitDataSet
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
****************************************************************************/
function JskitDataSet(rHd){
	var __xmlDoc = null;
	
	var __columns = new Array();
	var __data = new Array();
	
	var __isDistinct = function(key,value){
		for(var i=0;i<__data.length;i++){
			if(__data[i][key]==value)return false;
		}
		return true;
	};
	var __isEmpty = function(value){
		return (typeof(value)=="undefined" || value==null);
	};
	this.addColumn = function(rKey,rEmpty,rDistinct){
		if(typeof(rKey)!="string" && rKey.trim()=="")return false;
		rKey = rKey.trim();
		var _c = new __Column();
		_c.key = rKey;
		_c.empty = (typeof(rEmpty)=="boolean")?rEmpty:true;
		_c.distinct = (typeof(rDistinct)=="boolean")?rDistinct:false;
		if(_c.empty)_c.distinct==false;
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
		for(var i=0;i<__columns.length;i++){
			if((__columns[i].distinct==true && __isDistinct(__columns[i].key,arguments[i]))
				|| (__columns[i].empty==false && __isEmpty(arguments[i])) ){
					return false;
				}else{
					__d.push(arguments[0]);
				}
		}
		__data.push(_d);
		_d = null;
		return true;
	};
};

