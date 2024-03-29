/*****************************************************
*
* JskitEvents
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
//extands Mozilla
var jskitEvents = new function () {
    var __hd = "jskitEvents";
    var __eventsCount = 0;
    var __hdmap = new Array();
    var __event = function (rObject, rEventName) {
        this.object = rObject;
        this.name = rEventName;
    };
    var __EVENTS = new Array(
        new __event(window, "onload")
        , new __event(document, "onmouseover")
        , new __event(document, "onclick")
        , new __event(window, "onscroll")
        , new __event(window, "onresize")
        , new __event(document, "onmousemove")
        , new __event(document, "onMouseDown")
        , new __event(document, "onMouseUp")
        , new __event(document, "ondblclick")
        , new __event(document, "oncontextmenu")
        , new __event(document, "onkeydown")
        , new __event(document, "onkeyup")
        , new __event(window, "onbeforeunload")
    );

    var __isValidEventName = function (rEventName) {
        for (var i = 0; i < __EVENTS.length; i++) {
            if (__EVENTS[i].name.toLowerCase() == rEventName.toLowerCase()) { return true; }
        }
        return false;
    };
    var __handler = function () {
        this.key = "";
        this.name = "";
        this.args = new Array();
    };
    var __isAdded = function (rKey) {
        return (typeof (__hdmap[rKey]) != "undefined" && __hdmap[rKey]);
    };
    var __getEventKey = function (rObj, rEventName, rHandler) {
        var _key = "";
        if (typeof (rObj.tagName) == "undefined") {
            //document,window
            _key = "_je_sys_" + rEventName + "_" + rHandler.replace(".", "_");
        } else {
            _key = "_je_" + rObj.id + "_" + rEventName + "_" + rHandler.replace(".", "_");
        }
        if (_key.indexOf("(") != -1) _key = _key.substr(0, _key.indexOf("("));
        return _key;
    };
    var __getReadyEventObj = function (rEventName, rHandler) {
        for (var i = 0; i < __EVENTS.length; i++) {
            if (__EVENTS[i].name.toLowerCase() == rEventName.toLowerCase()) { return __EVENTS[i].object; }
        }
        return null;
    };
    this.cancelBubble = function (e) {
        if ($jvm["event"]) {
            e.cancelBubble = true; ;
        } else {
            e.stopPropagation();
        }
    };
    this.add = function (rObj, rName, rHandler) {
        if (typeof (rObj) != "object" || rObj == null) {
            alert("[JskitEvents::add]:rObj is null or not a HtmlObject");
            return false;
        }
        var _bk = false;
        var _handler = rHandler;
		try{
			if(typeof(_handler)!="string"){
				_handler = "void(0)";
			}else if(_handler.indexOf("(")==-1){
				_handler += "(event)";
			}else if(_handler.indexOf("()")!=-1){
				_handler = _handler.replace("()","(event)");
			}else{
				_handler = _handler.replace("(","(event,");
			}
		}catch(e){
			_handler = "void(0)";
		}
        if ($jvm["event"]) {//for browsers which support window.event
            eval("_bk = rObj.attachEvent(\"" + rName + "\", function(){var bk=" + _handler + ";if(bk===false){event.returnValue=false;}return (bk!==false);})");
            if (_bk) {
                __hdmap[_eventKey] = true;
            }
        } else {//for others
            var _eventName = rName.replace(/on(.*)/i, '$1');
            eval("rObj.addEventListener(\"" + _eventName + "\", function(event){var bk=" + _handler + ";if(bk===false){event.preventDefault();}return (bk!==false);}, false);");
            _eventName = null;
            _bk = true;
        }
        __eventsCount++;

        return _bk;
    };
    this.remove = function (rObj, rName, rHandler) {
        var _eventKey = __getEventKey(rObj, rName, rHandler);
        if (typeof (rObj) == "object") {
            if ($jvm["event"]) {//for browsers which support window.event
                eval("rObj.detachEvent(\"" + rName + "\"," + rHandler + ");");
            } else {//for others
                var _eventName = rName.replace(/on(.*)/i, '$1');
                try { eval("rObj.removeEventListener(\"" + _eventName + "\",0, true);"); }
                catch (e) { }
            }
            __hdmap[_eventKey] = false;
        }
    };
    this.ready = function (rEventName, rHandler) {
        if (__isValidEventName(rEventName)) {
            rEventName = rEventName.toLowerCase();
            var _obj = __getReadyEventObj(rEventName);
            var _hd = new __handler();
            _hd.key = __getEventKey(_obj, rEventName, rHandler);
            if (__isAdded(_hd.key)) {
                return true;
            }
            _hd.name = rHandler;
            var _bk = this.add(_obj, rEventName, _hd.name);
            if (_bk) {
                __hdmap[_hd.key] = true;
            }
            return _bk;
        } else {
            alert("\"" + rEventName + "\" is an invalid event name");
            return false;
        }
    };
};