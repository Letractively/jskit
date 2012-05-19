/*****************************************************
*
* Jskit Log System
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
* #Require	 : /base/JskitBase.js
* 			 : /base/JskitUtil.js
******************************************************/
var JskitLog = function (rHd) {
    var __hd = (typeof (rHd) == "string") ? rHd : "jskitLog";
    var __Log = function () {
        this.datetime = "";
        this.type = "";
        this.funcName = "";
        this.message = "";
    };
    var DEBUG = "debug";
    var ERROR = "error";
    var WARN = "warn";
    var UNKNOWN = "unknown";
    var INFO = "info";
    var OFF = "off";

    var LEVEL = new Array();
    LEVEL[OFF] = 0;
    LEVEL[ERROR] = 1;
    LEVEL[WARN] = 2;
    LEVEL[INFO] = 3;
    LEVEL[DEBUG] = 4;

    var __viewerID = jskitUtil.guid();
    var __containerID = jskitUtil.guid();
    var __log = new __Log();
    var __viewer = null;
    var __logCount = 0;

    var __visible = false;
    var __level = LEVEL[DEBUG];
    var __logCssClass = "";
    var __logStyle = "";
    var __unMovable = "yes";

    this.setLevel = function (v) {
        var _v = parseInt(v);
        if (isNaN(_v) || _v < 0 || _v > 4) {
            __level = 0;
        } else {
            __level = _v;
        }
        _v = null;
    };
    this.setLogCssClass = function (v) {
        __logCssClass = v;
    };
    this.setLogStyle = function (v) {
        __logStyle = v;
    };
    this.setUnMovable = function (v) {
        __unMovable = (typeof (v) == "boolean" && v == false) ? "no" : "yes";
    };

    //#Begin Private methods
    var __outputLog = function () {
        if (__log.message == "") { return; }
        var _obj = document.createElement("div");
        _obj.style.padding = "5 5 5 5";
        if (__log.type === ERROR) {
            __logStyle += ";color:#ff0000;";
        } else if (__log.type === UNKNOWN) {
            __logStyle += ";color:#aaaaaa;";
        } else if (__log.type === INFO) {
            __logStyle += ";color:#aaaaaa;";
        } else {
            __logStyle += ";color:#00aa00;";
        }

        var _msg = "<font style='" + __logStyle + "' class='" + __logCssClass + "'>";
        _msg += __log.datetime + " | ";
        if (__log.type != "")
            _msg += __log.type + " | ";
        if (__log.funcName != "")
            _msg += __log.funcName + " | ";
        _msg += __log.message;
        _msg += "</font>";

        _obj.innerHTML = _msg;
        __appendLog(_obj);
    };

    var __appendLog = function (rObj) {
        var container = $$("#" + __containerID);
        if (container != null && rObj != null) {
            container.appendChild(rObj);
        }
    };

    var __createViewer = function () {
        __viewer = $$("#" + __viewerID);
        if (__viewer === null) {
            __viewer = document.createElement("div");
            //__viewer.setAttribute("class",__logCssClass);
            __viewer.id = __viewerID;
            __viewer.style.paddingTop = "5px";
            __viewer.style.backgroundColor = "#555555";
            __viewer.style.border = "outset 2px #ffffff";
            __viewer.style.color = "#000000";
            __viewer.style.position = "absolute";
            __viewer.style.height = "130";
            __viewer.style.width = "100%";
            __viewer.style.fontSize = "13px";
            __viewer.style.zIndex = jskitBase.topIndex - 10;
            __viewer.style.display = "none";
            __viewer.style.overflow = "hidden";
            __viewer.setAttribute("unmovable", __unMovable); //for jskitDynamic
            __viewer.ondblclick = function () { jskitLog.switchScreen(); };

            var bar = __getViewerBar();
            __viewer.appendChild(bar);

            var container = __getContianer();
            __viewer.appendChild(container);

            jskitBase.append(__viewer);
            __moveViewerPositon();
        }
    };
    var __getContianer = function () {
        var _container = document.createElement("div");
        _container.id = __containerID;
        _container.style.overflow = "auto";
        _container.style.height = "100";
        _container.style.width = "100%";
        _container.style.backgroundColor = "#ffffe0";
        _container.style.border = "inset 2px #ffffe0";
        _container.style.styleFloat = "right";
        _container.setAttribute("unmovable", "yes");
        _container.onclick = function () { return false; };
        return _container;
    };
    var __getViewerBar = function () {
        var bar = document.createElement("div");
        bar.style.color = "#ffffff";
        bar.style.fontSize = "11px";
        bar.style.height = 20;
        bar.style.fontFamily = "verdana";
        bar.style.styleFloat = "left";
        bar.setAttribute("unmovable", "yes");
        var barHtml = "<table cellspacing='0' cellpadding='0' border='0'><tr>";
        barHtml += "<td class='jskitLog_viewer_title'>JskitLog&nbsp;Level:</td>";
        barHtml += "<td align='left'>";
        barHtml += '<select onchange="' + __hd + '.switchLevel(this)" class="jskitLog_viewer_ddl"> ';
        barHtml += '<option value="0">OFF</option>';
        barHtml += '<option value="1">Error</option>';
        barHtml += '<option value="2">Warn</option>';
        barHtml += '<option value="3">Info</option>';
        barHtml += '<option value="4">Debug</option>';
        barHtml += "</select>";
        barHtml += "</td>";
        barHtml += "<td width='20px'></td>";
        barHtml += "<td align='left'>";
        barHtml = barHtml.replace('value="' + __level + '"', value = "'+__level+' selected ");
        barHtml += "<button class='jskitLog_viewer_btn' unmovable='yes' ";
        barHtml += " onclick=\"jskitLog.clear();\" onfocus='this.blur()'>Clear</button>";
        barHtml += "&nbsp;&nbsp;&nbsp;";
        barHtml += "<button class='jskitLog_viewer_btn' unmovable='yes' ";
        barHtml += " onclick=\"jskitLog.switchScreen(0);\" onfocus='this.blur()'><font style='border-bottom:1px solid #000000;font-size:5px;width:10px;'>&nbsp;&nbsp;</font></button>";
        barHtml += "&nbsp;";
        barHtml += "<button class='jskitLog_viewer_btn' unmovable='yes' ";
        barHtml += " onclick=\"jskitLog.switchScreen(1);\" onfocus='this.blur()'><font style='border-top:3px solid #000000;border-left:1px solid #000000;border-right:1px solid #000000;border-bottom:1px solid #000000;font-size:5px;width:10px;'>&nbsp;&nbsp;</font></button>";
        barHtml += "&nbsp;";
        barHtml += "<button class='jskitLog_viewer_btn' unmovable='yes' ";
        barHtml += " onclick=\"jskitLog.close();\" onfocus='this.blur()'><font style='font-size:11px;font-weight:bold;width:10px;'>X</font></button>";
        barHtml += "&nbsp;";
        barHtml += "</td></tr></table>";
        bar.innerHTML = barHtml;
        return bar;
    };
    var __moveViewerScrollbar = function () {
        var container = $$("#" + __containerID);
        if (container != null) {
            container.scrollTop = container.scrollHeight;
        }
    };
    var __add = function (rMsg, rType, rFuncName) {
        if (__level < LEVEL[OFF]) { return; }
        __logCount++;
        __log.datetime = jskitUtil.date.getDateTimeStr(new Date());
        __log.type = (rType != null && rType != "undefined") ? rType : "";
        __log.funcName = (rFuncName != null && rFuncName != "undefined") ? rFuncName : "";
        if (rMsg !== null) {
            rMsg = rMsg.replace(/</gi, "&lt;");
            rMsg = rMsg.replace(/>/gi, "&gt;");
            rMsg = rMsg.replace(/<code\s+id=([^>]+)\s*>([^<]+)<\/code>/gi, "<a style='color:#0000ff' href=\"javascript:jskitLog.codeView('$1')\">$2</a>");
            __log.message = rMsg;
        } else {
            __log.message = "";
        }
        __open();
    };
    var __open = function () {
        if ($$("body") !== null) {
            __createViewer();
            __outputLog();
            __moveViewerScrollbar();
        }
        if (__visible) {
            __viewer.style.display = "block";
        }
    };
    var __moveViewerPositon = function () {
        var h = $$("body").clientHeight;
        var posx = 0;
        var posy = h - 130 + $$("body").scrollTop;
        __viewer.style.left = posx;
        __viewer.style.top = posy;
        __viewer.style.width = $$("body").clientWidth;
        h = posx = posy = null;
    };
    //#End

    //#Begin Public methods
    this.switchLevel = function (rDdl) {
        __level = parseInt(rDdl.value);
    };
    this.close = function (e) {
        __visible = false;
        __viewer.style.display = "none";
        if (typeof (e) == "object")
            e.srcElement.blur();
    };
    this.switchScreen = function (rType) {
        var _type = (typeof (rType) == "number") ? rType : __viewer.style.pixelTop;
        if (_type == 0) {
            __moveViewerPositon();
            $$("#" + __containerID).style.height = 100;
            __viewer.style.height = 130;
        } else {
            __viewer.style.width = $$("body").clientWidth;
            __viewer.style.height = $$("body").clientHeight;
            __viewer.style.left = 0;
            __viewer.style.top = 0;
            $$("#" + __containerID).style.height = $$("body").clientHeight - 30;
        }
    };
    this.clear = function () {
        var _container = $$("#" + __containerID);
        _container.clearChildren();
    };

    this.debug = function (rMsg, rFuncName) {
        if (__level < LEVEL[DEBUG]) { return; }
        __add(rMsg, DEBUG, rFuncName);
    };
    this.error = function (rMsg, rFuncName) {
        if (__level < LEVEL[ERROR]) { return; }
        __add(rMsg, ERROR, rFuncName);
    };
    this.info = function (rMsg, rFuncName) {
        if (__level < LEVEL[INFO]) { return; }
        __add(rMsg, INFO, rFuncName);
    };
    this.warn = function (rMsg, rFuncName) {
        if (__level < LEVEL[WARN]) { return; }
        __add(rMsg, WARN, rFuncName);
    };
    this.codeView = function (rId) {
        try {
            var _obj = $$("#" + rId);
            if (_obj !== null) {
                window.alert("object code:\n" + _obj.outerHTML);
            }
        } catch (e) {
            window.alert(e.message);
        }
    };
    this.open = function () {
        __open();
        __viewer.style.display = "block";
        __visible = true;
    };
    this.moveViewerPositon = function () {
        __moveViewerPositon();
    };
    this.pageOnResize = function () {
        if (__viewer)
            __moveViewerPositon();
    };
    this.pageOnScroll = function () {
        if (__viewer)
            __moveViewerPositon();
    };
    //#End
};
var jskitLog = new JskitLog("jskitLog");