
var JskitSmartAd_VRoll = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitSmartAd_VRoll";

	var __data = null;
	var __Speed = 10; 
	var __Space = 10; 
	var __CellWidth = 235;
	var __Fill = 0; 
	var __MoveLock = false;
	var __MoveTimeObj;
	var __Comp = 0;
	var __AutoPlayTimer = null;

	var __InterVal = 3000;
	
	
	var __BuildImgList = function(){
		var _str = new Array();
		for(var i=0;i<__data.length;i++){
			_str.push('<div class="'+__CellCss+'" style="width:'+__CellWidth+'px">');
			_str.push('<a href="'+__data[i].url+'" target="'+__data[i].target+'"><img class="'+__ImgCss+'" src="'+__data[i].imgSrc+'" /></a>');
			_str.push('<a href="'+__data[i].url+'" target="'+__data[i].target+'">'+__data[i].text+'</a>');
			_str.push('</div>');
		}
		//check cell count is enough
		__ItemContainer.innerHTML = _str.join('');
		__ItemContainer2.innerHTML = _str.join('');
		__ItemContainer.parentNode.style.width = __ItemContainer.offsetWidth*2;
	};
	var __AutoPlay = function(){ //auto scroll
		__BuildImgList();
		window.clearInterval(__AutoPlayTimer);
		__AutoPlayTimer = window.setInterval(__hd+'.StartDown();'+__hd+'.StopDown();',__InterVal); 
	};
	var __StartUp = function(){ //scroll up begining
		if(__MoveLock) return;
		window.clearInterval(__AutoPlayTimer);
		__MoveLock = true;
		__MoveTimeObj = window.setInterval(__hd+'.DoUp();',__Speed);
	};
	var __StopUp = function(){ //scroll up stop
		clearInterval(__MoveTimeObj);
		if(__Convas.scrollLeft % __CellWidth - __Fill != 0){
			__Comp = __Fill - (__Convas.scrollLeft % __CellWidth);
			__CompScr();
		}else{
			__MoveLock = false;
		}
		__AutoPlay();
	};
	var __DoUp = function(){ //scroll up
		if(__Convas.scrollLeft <= 0){
			__Convas.scrollLeft = __Convas.scrollLeft + __ItemContainer.offsetWidth;
		}
		__Convas.scrollLeft -= __Space ;
	};
	var __StartDown = function(){ //scroll down beginning
		window.clearInterval(__MoveTimeObj);
		if(__MoveLock) return;
		window.clearInterval(__AutoPlayTimer);
		__MoveLock = true;
		__DoDown();
		__MoveTimeObj = window.setInterval(__hd+'.DoDown()',__Speed);
	};
	var __StopDown = function(){ //scroll down stop
		//window.status = __Convas.scrollLeft+":"+__ItemContainer.scrollWidth;
		clearInterval(__MoveTimeObj);
		if(__Convas.scrollLeft % __CellWidth - __Fill != 0 ){
			__Comp = __CellWidth - __Convas.scrollLeft % __CellWidth + __Fill;
			__CompScr();
		}else{
			__MoveLock = false;
		}
		__AutoPlay();
	};
	var __DoDown = function(){ //scroll down
		if(__Convas.scrollLeft >= __ItemContainer.scrollWidth){
			__Convas.scrollLeft =__Convas.scrollLeft - __ItemContainer.scrollWidth;
		}
		__Convas.scrollLeft += __Space ;
	};
	var __CompScr = function(){
		var num;
		if(__Comp == 0){__MoveLock = false;return;}
		if(__Comp < 0){ //up
			if(__Comp < -__Space){
				__Comp += __Space;
				num = __Space;
			}else{
			   num = -__Comp;
			   __Comp = 0;
			}
			__Convas.scrollLeft -= num;
			window.setTimeout(__hd+'.CompSrc()',__Speed);
		}else{ //down
			if(__Comp > __Space){
			   __Comp -= __Space;
			   num = __Space;
			}else{
			   num = __Comp;
			   __Comp = 0;
			}
			__Convas.scrollLeft += num;
			window.setTimeout(__hd+'.CompSrc()',__Speed);
		}
	};
	this.CompSrc = function(){
		__CompScr();
	};
	this.DoDown = function(){
		__DoDown();
	};
	this.DoUp = function(){
		__DoUp;
	};
	this.StartDown = function(){
		__StartDown();
	};
	this.StopDown = function(){
		__StopDown();
	};
	this.StartUp = function(){
		__StartUp();
	};
	this.StopUp = function(){
		__StopUp();
	};
	var __palyer = null;
	var __CellCss = "";
	var __ImgCss = "";
	var __Convas = null;
	var __ConvasID = null;
	var __ItemContainer = null;
	var __ItemContainerID = null;
	var __ItemContainer2 = null;
	var __ItemContainer2ID = null;
	var __buildConvas = function(){
		__ConvasID = __hd + "_VRoll_Convas";
		__ItemContainerID = __hd + "_VRoll_ItemContainer";
		__ItemContainer2ID = __hd + "_VRoll_ItemContainer2";
		var _str = '<div id="'+__ConvasID+'">';
		_str += '<div style="width:10000000px">';
		_str += '<div id="'+__ItemContainerID+'" style="float:left"></div>';
		_str += '<div id="'+__ItemContainer2ID+'" style="float:left"></div>';
		_str += '</div>';
		_str += '</div>';
		__player.style.width = __CellWidth*4 + "px";
		__player.style.overflow = "hidden";
		__player.style.margin = "0 auto";
		__player.innerHTML = _str;
		__ItemContainer = $("#"+__ItemContainerID);
		__ItemContainer2 = $("#"+__ItemContainer2ID);
		__Convas = $('#'+__ConvasID);
		//width:360px;overflow:hidden;margin:0 auto;padding-top:20px;
		__Convas.style.width = __CellWidth*4 + "px";
		__Convas.style.overflow = "hidden";
		__Convas.style.margin = "0 auto";
		__Convas.scrollLeft = __Fill;
		__Convas.onmouseover = function(){clearInterval(__AutoPlayTimer);}
		__Convas.onmouseout = function(){__AutoPlay();}
	};
	this.play = function(v){
		__data = v.data;
		__Speed = parseFloat(v.spead); 
		__Space = parseFloat(v.space); 
		__InterVal = parseFloat(v.interval)*1000;
		__CellWidth = parseFloat(v.cellWidth);
		__CellCss = v.cellCss;
		__ImgCss = v.imgCss;
		__player = $("#"+v.player);
		__buildConvas();
		__AutoPlay();
	};
};