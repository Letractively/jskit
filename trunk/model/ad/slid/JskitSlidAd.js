/*----------------------------------------------
*
* JsKit SlidAd
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
* #Update	 : 2012-04-25 
*
* #Example	 :
var jskitSlidAd = new JskitSlidAd();
jskitSlidAd.init({
	data : [
		{url:"Pinpai_Gushi.html"	,pic:"slidad/images/1.jpg"	,title:"品牌故事"},
		{url:"Hanfang_Gushu.html"	,pic:"slidad/images/3.jpg"	,title:"汉方古术"},
		{url:"Zhuanye_Tuandui.html"	,pic:"slidad/images/2.jpg"	,title:"专业团队"},
		{url:"Miyao_Jiexi.html"		,pic:"slidad/images/4.jpg"	,title:"秘药解析"}
	],
	width:955,//img width
	height:394,//img height
	target:"_self",//link target
	canvas:"slidad_canvas",//html object id
	imgBoxCss:"img_box",//html object css class
	numBoxCss:"num_box",//html object css class
	step:3 //slid spead,second
});
jskitSlidAd.start();
-----------------------------------------------*/
var JskitSlidAd = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitSlidAd";
	var __data = null;
	var __timer = null;
	var __step = null;
	var __canvas = null;
	var __imgBox = null;
	var __numBox = null;
	var __height = null;
	var __width = null;
	var __target = "_self";
	var __index = 0;
	var __show = function(){
		var _str = '<a href="'+__data[__index].url+'" target="'+__target+'">';
		_str += '<img id="'+__hd+'_img_'+__index+'" src="'+__data[__index].pic+'" atl="'+__data[__index].title+'" style="position:absolute;left:0px;width:'+__width+'px;height:'+__height+'px" />';
		var _nextIdex = (__index>=__data.length-1)?0:(__index+1);
		_str += '<img id="'+__hd+'_img_'+_nextIdex+'" src="'+__data[_nextIdex].pic+'" atl="'+__data[_nextIdex].title+'" style="display:none;position:absolute;left:-'+__width+'px;width:'+__width+'px;height:'+__height+'px" />';
		_str += '</a>';
		__imgBox.innerHTML = _str;
		_str = null;
		__numBox.innerHTML = __buildNums();
		__next();
	};
	var __buildNums = function(){
		var _len = __data.length;
		var _str = new Array();
		for(var i=_len-1;i>=0;i--){
			if(i==__index){
				_str.push('<div class="current">'+(i+1)+'</div>');
			}else{
				_str.push('<div class="num" onclick="'+__hd+'.start('+i+');">'+(i+1)+'</div>');
			}
		}
		return _str.join('');
	};
	var __activeImg = null;
	var __moveTimer = null;
	var __moveX = 0;
	var __moveStep = 0;
	this.move = function(){__move();};
	this.startMove = function(){
		__activeImg = document.getElementById(__hd+'_img_'+__index);
		if(__activeImg==null){return;}
		__activeImg.style.display = "";
		__moveX = -1*__width;
		__move();
	};
	var __move = function(){
		if(__activeImg==null){
			__stopMove();
			return;
		}
		if(__moveX>-1){
			__activeImg.style.left = "0px";
			__stopMove();
			return;
		}else{
			__moveStep = (0-__moveX)*0.08;
			__moveX += __moveStep;
		}
		__activeImg.style.left = __moveX+"px";
		__moveTimer = window.setTimeout(__hd+".move()",10);
	};
	var __stopMove = function(){
		__moveX = 0;
		__moveStep = 0;
		__activeImg = null;
		if(__moveTimer!=null){
			window.clearInterval(__moveTimer);
		}
		__show();
	};
	var __next = function(){
		__index++;
		if(__index>=__data.length){
			__index = 0;
		}
		//move funciton
		__timer = window.setTimeout(__hd+".startMove()",__step);
		//__timer = window.setTimeout(__hd+".show()",__step);
	};
	this.show = function(){
		__show();
	};
	this.start = function(rIndex){
		if(__timer!=null){
			window.clearInterval(__timer);
		}
		if(__moveTimer!=null){
			window.clearInterval(__moveTimer);
		}
		__index = (isNaN(parseInt(rIndex)))?0:parseInt(rIndex);
		__show();
	};
	this.init = function(jsonParms){
		__height = parseFloat(jsonParms.height);
		__width = parseFloat(jsonParms.width);
		__step = parseFloat(jsonParms.step)*1000;
		__target = jsonParms.target;
		__data = jsonParms.data;
		__canvas = document.getElementById(jsonParms.canvas);
		__canvas.style.position = "relative";
		__canvas.innerHTML = '<div style="position:relative;width:'+__width+'px;height:'+__height+'px;overflow:hidden;" id="'+__hd+'_imgBox" class="'+jsonParms.imgBoxCss+'"></div><div  id="'+__hd+'_numBox" class="'+jsonParms.numBoxCss+'"></div>';
		__imgBox = document.getElementById(__hd+"_imgBox");
		__numBox = document.getElementById(__hd+"_numBox");
	};
};