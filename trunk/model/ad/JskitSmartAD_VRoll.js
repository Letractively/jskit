
var JskitSmartAd_VRoll = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitSmartAd_VRoll";

	var __data = null;
	var __Speed = 10; //�ٶ�(����)
	var __Space = 10; //ÿ���ƶ�(px)
	var __CellWidth = 235; //��ҳ���
	var __Fill = 0; //������λ
	var __MoveLock = false;
	var __MoveTimeObj;
	var __Comp = 0;
	var __AutoPlayTimer = null;

	var __InterVal = 3000;
	
	
	var __BuildImgList = function(){
		var _str = new Array();
		for(var i=0;i<__data.length;i++){
			_str.push('<div class="JSA_VRoll_Cell">');
			_str.push('<a href="'+__data[i].url+'" target="'+__data[i].target+'"><img class="JSA_VRoll_IMG" src="'+__data[i].imgSrc+'" /></a>');
			_str.push('<a href="'+__data[i].url+'" target="'+__data[i].target+'">'+__data[i].text+'</a>');
			_str.push('</div>');
		}
		//�����ӵ������ǲ��ǹ�
		__ItemContainer.innerHTML = _str.join('');
		__ItemContainer2.innerHTML = _str.join('');
		__ItemContainer.parentNode.style.width = __ItemContainer.offsetWidth*2;
	};
	var __AutoPlay = function(){ //�Զ�����
		__BuildImgList();
		clearInterval(__AutoPlayTimer);
		__AutoPlayTimer = setInterval(__hd+'.StartDown();'+__hd+'.StopDown();',__InterVal); //���ʱ��
	};
	var __StartUp = function(){ //�Ϸ���ʼ
		if(__MoveLock) return;
		clearInterval(__AutoPlayTimer);
		__MoveLock = true;
		__MoveTimeObj = setInterval(__hd+'.DoUp();',__Speed);
	};
	var __StopUp = function(){ //�Ϸ�ֹͣ
		clearInterval(__MoveTimeObj);
		if(__Convas.scrollLeft % __CellWidth - __Fill != 0){
			__Comp = __Fill - (__Convas.scrollLeft % __CellWidth);
			__CompScr();
		}else{
			__MoveLock = false;
		}
		__AutoPlay();
	};
	var __DoUp = function(){ //�Ϸ�����
		if(__Convas.scrollLeft <= 0){
			__Convas.scrollLeft = __Convas.scrollLeft + __ItemContainer.offsetWidth;
		}
		__Convas.scrollLeft -= __Space ;
	};
	var __StartDown = function(){ //�·�
		clearInterval(__MoveTimeObj);
		if(__MoveLock) return;
		clearInterval(__AutoPlayTimer);
		__MoveLock = true;
		__DoDown();
		__MoveTimeObj = setInterval(__hd+'.DoDown()',__Speed);
	};
	var __StopDown = function(){ //�·�ֹͣ
		window.status = __Convas.scrollLeft+":"+__ItemContainer.scrollWidth;
		clearInterval(__MoveTimeObj);
		if(__Convas.scrollLeft % __CellWidth - __Fill != 0 ){
			__Comp = __CellWidth - __Convas.scrollLeft % __CellWidth + __Fill;
			__CompScr();
		}else{
			__MoveLock = false;
		}
		__AutoPlay();
	};
	var __DoDown = function(){ //�·�����
		if(__Convas.scrollLeft >= __ItemContainer.scrollWidth){
			__Convas.scrollLeft =__Convas.scrollLeft - __ItemContainer.scrollWidth;
		}
		__Convas.scrollLeft += __Space ;
	};
	var __CompScr = function(){
		var num;
		if(__Comp == 0){__MoveLock = false;return;}
		if(__Comp < 0){ //�Ϸ�
			if(__Comp < -__Space){
				__Comp += __Space;
				num = __Space;
			}else{
			   num = -__Comp;
			   __Comp = 0;
			}
			__Convas.scrollLeft -= num;
			setTimeout(__hd+'.CompSrc()',__Speed);
		}else{ //�·�
			if(__Comp > __Space){
			   __Comp -= __Space;
			   num = __Space;
			}else{
			   num = __Comp;
			   __Comp = 0;
			}
			__Convas.scrollLeft += num;
			setTimeout(__hd+'.CompSrc()',__Speed);
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
	var __Convas = null;
	var __ConvasID = "JskitSmartAd_VRoll_Convas";
	var __ItemContainer = null;
	var __ItemContainerID = "JskitSmartAd_VRoll_ItemContainer";
	var __ItemContainer2 = null;
	var __ItemContainer2ID = "JskitSmartAd_VRoll_ItemContainer2";
	var __buildConvas = function(){
		var _str = '<div class="JSA_VRoll_RollBox">';
		_str += '<div class="JSA_VRoll_Convas" id="'+__ConvasID+'">';
		_str += '<div class="JSA_VRoll_ScrCont">';
		_str += '<div id="'+__ItemContainerID+'" class="JSA_VRoll_List"></div>';
		_str += '<div id="'+__ItemContainer2ID+'" class="JSA_VRoll_List"></div>';
		_str += '</div>';
		_str += '</div>';
		_str += '</div>';
		document.write(_str);
	};
	this.play = function(v){
		__data = v;
		__buildConvas();
		__ItemContainer = $("#"+__ItemContainerID);
		__ItemContainer2 = $("#"+__ItemContainer2ID);
		__Convas = $('#'+__ConvasID);
		__Convas.scrollLeft = __Fill;
		__Convas.onmouseover = function(){clearInterval(__AutoPlayTimer);}
		__Convas.onmouseout = function(){__AutoPlay();}
		__AutoPlay();
	};
};