/*****************************************************
*
* Jskit DataGrid
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
* #Requied   : base/*
*            : page/JskitTable.js
*            
******************************************************/
function JskitDataGrid(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitDataGrid";
	var __canvas = null;
	var __panel = null;
	var __body = null;
	var __selectedRow = -1;
	var __table = null;
	var __columns = new Array();
	var __initPanel = function(){
		__panel.innerHTML = '<button onclick="'+__hd+'.add()">Add</button>'
		+ '<button onclick="'+__hd+'.remove()">Remove</button>';
	};
	var __initBody = function(){
		__table
	};
	this.init = function(){
		__canvas = document.createElement("div");
		__panel = document.createElement("div");
		__body = document.createElement("div");
		__canvas.appendChild(_panel);
		__canvas.appendChild(__body);
		__initPanel();
	};
	this.add = function(){
		
	};
	this.remove = function(){
		
	};
};
JskitDataGrid.prototype = new JskitTable();
