/*****************************************************
*
* JskitDInput
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
var JskitDInput = function(){
	var __val = "";
	var __requestUrl = "";
	var __textbox = null;
	var __valueHolder = null;
	var __listContainer = null;

	//#BEGIN setting
	this.setRequestUrl = function(url){
		__requestUrl = url;
	};
	this.setTextbox = function(obj){
		__textbox = obj;
	};
	this.setValueHolder = function(obj){
		__valueHolder = obj;
	};
	//#END

	this.input = function(sender){
		__inputObj = $(sender);
	};
	this.inputCallback = function(doc){
		//refresh list
	};
};