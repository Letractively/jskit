/*****************************************************
*
* JskitAnimation
* #author    : AnyRock
* #update	 : 2009-1-7
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
* #Necessary : core/*;
*
******************************************************/
function JskitAnimation(rHd){
	var __hd = (typeof(rHd)!="string")?"jskitAnimation":rHd;

	//#Begin private
	var __obj = null;//移动的对象
	var __ox = null;//对象原始x坐标
	var __oy = null;//对象原始y坐标
	var __tx = null;//目标x坐标
	var __ty = null;//目标y坐标
	var __pathIndex = 0;//
	var __y = null;//对象运行期用于计算偏差的y坐标
	var __timer = null;//计时器
	var __mode = 0;//模式
	var __ow = null;
	var __oh = null;
	var __tw = null;
	var __th = null;
	//#End private
	
	//#Begin public
	var __onFinish = null;
	this.setOnFinish = function(v){
		__onFinish = (typeof(v)=="string")?v:null;
	};
	var __path = new Array();//移动路径
	this.setPath = function(v){
		__path = (typeof(v)=="object" && typeof(v.pop)=="function")?v:(new Array());
	};
	var __speed = 50;//模式0时,10到100的整数,模式1时,1到1000的整数
	this.setSpeed = function(v){
		__speed = (isNaN(parseInt(v)))?50:parseInt(v);
	};
	//#End public

	var __finish = function(){
		if(__mode==1 && __pathIndex < __path.length){// 
			__next();
		}else{
			if(__mode==3 && __obj!=null){
				__obj.style.width = __tw+"px";
				__obj.style.height = __th+"px";
			}
			__y = null;
			__obj = null;
			__ox = null;
			__oy = null;
			__tx = null;
			__ty = null;
			__pathIndex = 0;
			__path = new Array();
			window.clearInterval(__timer);
			try{if(__onFinish!=null)eval(__onFinish);}
			catch(e){alert(e.message+":"+__onFinish);}
		}
	};
	var __next = function(){
		__ox = __tx;
		__oy = __ty;
		__tx = __path[__pathIndex][0];
		__ty = __path[__pathIndex][1];
		__pathIndex++;
	};
	var __getStep = function(len,offset){
		//jskitLog.debug(__hd+".__getStep:rLen="+len);
		//jskitLog.debug(__hd+".__getStep:rOffset="+offset);
		var step = null;
		if(__mode==1){
			step = __speed;
		}else{
			step = Math.sin((Math.PI*(offset+len))/(2*len));
			step = Math.ceil((Math.abs(len)/5)*step);
		}
		//jskitLog.debug(__hd+".__getStep:return step="+step);
		return step;
	};
	
	this.__moveTo = function(){
		if(__obj==null)return;
		var x = parseFloat(__obj.effectStyle("left"));
		var y = parseFloat(__obj.effectStyle("top"));
		var len = null;
        var offset = null;
        var step = null;
		if(__tx!=__ox){
			len = __tx-__ox;
			offset = x-__ox;
			
			step = __getStep(len,offset);
			if(isNaN(step)){__finish();return;}			

			if(step>Math.abs(len-offset)){step=Math.abs(len-offset);}
			if(len<0){step=(-1)*step;}
	
			x = x + step;
			__obj.style.left = x+"px";
			var step_y = (step)*(__ty-__oy)/len;
			__y += step_y;
			if(Math.abs(__y+step_y-y)>1){
				y = __y+step_y; 
				__obj.style.top = y+"px";
			}		
			offset = x-__ox;
			if(x==__tx || Math.abs(offset)>=Math.abs(len)){
				__obj.style.top = __ty+"px";
				__finish();
				return;
			}
			//处理大小尺寸的变化
			if(__mode==3 && !(__tw==__ow && __th==__oh)){
				var w = parseFloat($$(__obj).effectStyle("width"));
				var h = parseFloat($$(__obj).effectStyle("height"));
				var wlen = __tw-__ow;
				var hlen = __th-__oh;
				var offw = w-__ow;
				var offh = h-__oh;
				var sw = (wlen==0)?0:__getStep(wlen,offw);
				if(wlen<0)sw=(-1)*sw;
				var sh = (hlen==0)?0:__getStep(hlen,offh);
				if(hlen<0)sh=(-1)*sh;
				__obj.style.width = (w + sw)+"px";
				__obj.style.height = (h + sh)+"px";
			}
		}else if(__ty!=__oy){
			len = __ty-__oy;
			offset = y-__oy;
			
			step = __getStep(len,offset);
			if(isNaN(step)){__finish();return;}			

			if(step>Math.abs(len-offset)){step=Math.abs(len-offset);}
			if(len<0){step=(-1)*step;}
	
			y = y+step;
			__obj.style.top = y+"px";
			offset = y-__oy;
			if(y==__ty || Math.abs(offset)>=Math.abs(len)){
				__finish();
			}
		}else{
			__finish();
		}
	};
	this.move = function(rObj,rPath,rSpeed,rOnFinish){
		if(typeof(rObj)!="object" || rObj==null){
            alert("JskitAnimation:moveTo:rObj is invalid, action stopped!");
            return false;
        }
		__obj = rObj;
		__mode = 1;
		__path = rPath;
		__next();
		if(typeof(__path)!="object" || __pathIndex==__path.length)return;
		__obj.style.position = "absolute";
		__ox = __tx;
		__obj.style.left = __ox+"px";
		__oy = __y = __ty;
		__obj.style.top = __oy+"px";
		__speed = (isNaN(parseInt(rSpeed)) || rSpeed<1)?10:rSpeed;
		__onFinish = rOnFinish;
		
		__timer = window.setInterval(__hd+".__moveTo()",10);		
		return true;
	};
	this.moveTo = function(rObj,rx,ry,rSpeed,rOnFinish){
		__mode = 0;
		__finish();
        if(typeof(rObj)!="object" || rObj==null){
            alert("JskitAnimation:moveTo:rObj is invalid, action stopped!");
            return false;
        }
		__obj = $$(rObj);
		__ox = __obj.getX();
		__oy = __obj.getY();
		__obj.style.position = "absolute";
		__obj.style.left = __ox+"px";
		__y = __oy;
		__obj.style.top = __y+"px";
		__tx = (typeof(rx)=="number")?rx:0;
		__ty = (typeof(ry)=="number")?ry:0;
		if(isNaN(parseInt(rSpeed)) || rSpeed>100 || rSpeed<10)rSpeed=50;
		__speed = 100-rSpeed;
		__onFinish = rOnFinish;
		if(__tx!=__ox || __ty!=__oy){
			__timer = window.setInterval(__hd+".__moveTo()",__speed);
        }
		return true;
	};
	this.transform = function(rObj,rx,ry,rWidth,rHeight,rSpeed,rOnFinish){
		__mode = 3;
		__finish();
		if(typeof(rObj)!="object" || rObj==null)return false;
		__obj = $$(rObj);
		__ox = __obj.getX();
		__oy = __obj.getY();
		__obj.style.position = "absolute";
		__obj.style.left = __ox+"px";
		__y = __oy;
		__obj.style.top = __y+"px";
		__tx = (typeof(rx)=="number")?rx:0;
		__ty = (typeof(ry)=="number")?ry:0;
		__ow = __obj.offsetWidth;
		__oh = __obj.offsetHeight;
		__tw = (typeof(rWidth)=="number")?rWidth:__ow;
		__th = (typeof(rHeight)=="number")?rHeight:__ow;
		if(isNaN(parseInt(rSpeed)) || rSpeed>100 || rSpeed<10)rSpeed=50;
		__speed = 100-rSpeed;
		__onFinish = rOnFinish;
		
		if(__tx!=__ox || __ty!=__oy){
			__timer = window.setInterval(__hd+".__moveTo()",__speed);		
		}
		return true;
	};
};