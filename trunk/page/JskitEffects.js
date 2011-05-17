/*****************************************************
 *
 * JskitEffects
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *
 ******************************************************/
var JskitEffects = new function() {
    /**************************************
     //飘动的广告banner
     ***************************************/
    this.Flyer = function(rHd) {
        var __hd = (typeof(rHd) != "string") ? "jskitEffectsFlyer" : rHd;
        var __setting = null;
        var __object = null;
        var __speed = 990;
        var __height = 0;
        var __width = 0;
        var __x = 0;
        var __y = 0;
        var __xstep = 2;
        var __ystep = 2;
        var __timer = null;
        var __panelWidth = null;
        var __panelHeight = null;
        var __ox = 0;
        var __oy = 0;
        var __validStatus = false;
        var __inited = false;
        var __init = function() {
            __inited = true;
            __validStatus = false;
            if (__setting.length >= 1 && $("body") != null) {
                try {
                    //object/xpath,speed,left,top
                    __object = (typeof(__setting[0]) == "string") ? $("#"+__setting[0]) : __setting[0];

					if(typeof(__object)!="object"){
						alert("flyer is not a valid html object");
						return;
					}
                    if (!isNaN(parseInt(__setting[1])))
                        __speed = parseInt(__setting[1]);

                    __width = $(__object).effectStyle("width", "number");
                    __height = $(__object).effectStyle("height", "number");

                    __x = $(__object).getX();
                    __y = $(__object).getY();
                    if (!isNaN(parseFloat(__setting[2]))){
                        __xstep = parseFloat(__setting[2]);
					}
                    if (!isNaN(parseFloat(__setting[3]))){
                        __ystep = parseFloat(__setting[3]);
					}
                    __getPanelSize();
                    __object.style.position = "absolute";
					__object.style.left = __ox+"px";
					__object.style.top = __oy+"px";

                    jskitEvents.add(__object, "onmouseover", __hd + ".pause");
                    jskitEvents.add(__object, "onmouseout", __hd + ".start");
                    jskitEvents.ready("onresize", __hd + ".onResize");
                    jskitEvents.ready("onscroll", __hd + ".onResize");

                    if ((__width + __xstep) >= __panelWidth) {
						alert("flyer size is wider than panel:\nwidth:"+__width+"\nxstep:"+__xstep+"\npanelWidth:"+__panelWidth);
						return;
					}
					if((__height + __ystep) >= __panelHeight){
						alert("flyer size is height than panel:\nheight:"+__height+"\n__ystep:"+__ystep+"\npanelHeight:"+__panelHeight);
						return;
					}
                    __validStatus = true;
                }
                catch (e) {
                    alert("[JskitEffects::Flyer::init]:" + e.message);
                }
            }
        };
        var __getPanelSize = function() {
            if(document.documentElement.clientWidth==0){//IE
				__ox = $("body").scrollLeft;
				__oy = $("body").scrollTop;
				__panelWidth = $("body").clientWidth+__ox;
				__panelHeight = $("body").clientHeight+__oy;
			}else{
				__ox = document.documentElement.scrollLeft
				__oy = document.documentElement.scrollTop;
				__panelWidth = document.documentElement.clientWidth+__ox;
				__panelHeight = document.documentElement.clientHeight+__oy;
			}
        };
        var __fly = function() {
            if (!__validStatus) {
                __pause();
                return;
            }
            __x += __xstep;
            __y += __ystep;

            if (__x <= __ox) {//左移
                __x = __ox;
                __xstep = (-1) * __xstep;
            }
            if (__y <= __oy) {
                __y = __oy;
                __ystep = (-1) * __ystep;
            }

            if ((__x + __width) >= __panelWidth) {
                __x = __panelWidth - __width;
                __xstep = (-1) * __xstep;
            }
            if ((__y + __height) >= __panelHeight) {
                __y = __panelHeight - __height;
                __ystep = (-1) * __ystep;
            }
            __object.style.left = __x+"px";
            __object.style.top = __y+"px";
        };
        var __clear = function() {
            __object = null;
            __height = null;
            __width = null;
            __x = null;
            __y = null;
            __speed = null;
            __timer = null;
            __panelWidth = null;
            __panelHeight = null;
            __ox = null;
            __oy = null;
            __validStatus = false;
            __inited = false;
        };
        var __pause = function() {
            if (__timer) {
                window.clearInterval(__timer);
                __timer = null;
            }
        };
        var __start = function() {
            if (!__inited)
                __init();
            if (!__validStatus) {
                alert("jskitEffects.flyer status invalid.\n\nPlease use set() to set objects and attributes first")
                return;
            }
            __timer = window.setInterval(__hd + ".move()", (1000 - __speed));
        };
        var __move = function() {
            if (__validStatus){ __fly();}
			else{}
        };
        this.setSpeed = function(v) {
            if (!isNaN(parseInt(v)))
                __speed = parseInt(v);
        };
        this.setXStep = function(v) {
            if (!isNaN(parseInt(v)))
                __xstep = parseInt(v);
        };
        this.setYStep = function(v) {
            if (!isNaN(parseInt(v)))
                __ystep = parseInt(v);
        };
        this.start = function(){
            __start();
        };
        this.stop = function() {
            __pause();
            __validStatus = false;
            if (__object != null)
                __object.style.display = "none";
            __clear();
        };
        this.pause = function() {
            __pause();
        };
        this.move = function() {
            __move();
        };
        this.set = function() {
            __setting = arguments;
        };
        this.onResize = function() {
            __getPanelSize();
            __pause();
            __start();
        };
    };

    this.FixureAd = function(rHd){
        var __hd = (typeof(rHd) != "string") ? "jskitEffectsFixure" : rHd;
    };   

};