/*****************************************************
*
* JsKit loader
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
var $import = new function () {
    var __loadedFiles = new Array();
    var __defaultKey = "/jskit\.core([0-9|a-z|A-Z|\.]*)\.js";
    this.setPattern = function (v) {
        __defaultKey = v;
    };
    var __totalFils = 0;
    var __loadTimer = null;
    var __checkStatus = function () {
        var _info = "[" + __loadedFiles.length + "/" + __totalFils + "]";
        if (__loadedFiles.length >= __totalFils) {
            _info += "Finished!";
            window.clearInterval(__loadTimer);
        } else {
            _info += __loadedFiles[__loadedFiles.length - 1] + "ok";
        }
        window.status = _info;
    };
    this.check = function () {
        var _str = "";
        for (var i = 0; i < __loadedFiles.length; i++) {
            _str += "\n" + __loadedFiles[i];
        }
        alert(_str);
    };
    this.path = function (rUrl, rPattern) {
        var _pattern = null;
        if ($t.isUndefined(rPattern) || arguments.length === 0) {
            _pattern = new RegExp(__defaultKey, "gi");
        } else if ($t.isRegex(rPattern)) {
            _pattern = rPattern;
        } else if ($t.isString(rPattern)) {
            _pattern = new RegExp(rPattern, "gi");
        } else {
            return "?not-fond-" + rPattern;
        }
        var _path = "";
        var elements = $$("script");
        var len = elements.length;
        //get base url from the 'src' attribute of the script tags
        for (var i = 0; i < len; i = i + 1) {
            if (!$t.isUndefined(elements[i].src) && _pattern.test(elements[i].src)) {
                var src = elements[i].src;
                _path = src.substring(0, src.lastIndexOf('/') + 1);
                src = null;
                break;
            }
        }
        var len = elements = null;
        //get current broswer fullpath without parms
        var _fullPath = document.location.href;
        if (_fullPath.indexOf('?') !== -1) {
            _fullPath = _fullPath.substring(0, _fullPath.indexOf('?'));
        }
        _fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
        //special url with '://' or '/'
        if (_path.indexOf('://') == -1 && _path.indexOf('/') != 0) {
            var _tail = _path;
            while (_tail.indexOf("../") != -1) {
                _fullPath = _fullPath.substring(0, _fullPath.lastIndexOf('/'));
                _tail = _tail.substring(_tail.indexOf("../") + 3);
            }
            _tail = _tail.replace("./", "");
            _path = _fullPath + "/" + _tail;
        }

        //remove last "/"
        if (_path.lastIndexOf("/") == _path.length - 1) {
            _path = _path.substring(0, _path.length - 1);
        }
        while (rUrl.indexOf("../") != -1) {
            _path = _path.substring(0, _path.lastIndexOf('/'));
            rUrl = rUrl.substring(rUrl.indexOf("../") + 3);
        }
        return _path + "/" + rUrl;
    };
    this.js = function (rUrl, rPattern) {
        if (!$t.isString(rUrl) || rUrl.length < 1) { return false; }
        for (var i = 0; i < __loadedFiles.length; i = i + 1) {
            if (__loadedFiles[i] == rUrl) {
                alert("already loaded");
                return;
            }
        }
        if ($t.isString(rPattern) && rPattern.indexOf("/") !== 0) { rUrl = "/" + rUrl; }
        var _base = this.path(rUrl, rPattern);
        //#dom
        /*
        var _head = $$("head")[0];
        var _script = document.createElement("script");
        _script.setAttribute("type", "text/javascript");
        _script.setAttribute("src", _base + rUrl);
        _head.appendChild(_script);
        _head = _script = null;
        */
        //#document write
        var _tags = "<script language=\"javascript\" type=\"text/javascript\" src=\"" + _base + "\"></script>";
        document.write(_tags);
        __loadedFiles[__loadedFiles.length] = _tags;
    };
    this.css = function (rUrl, rPattern) {
        for (var i = 0; i < __loadedFiles.length; i = i + 1) {
            if (__loadedFiles[i] == rUrl) { return; }
        }
        var _base = this.path(rUrl, rPattern);
        var _tags = "<link href=\"" + _base + "\" rel=\"stylesheet\" type=\"text/css\" />";
        document.write(_tags);
        __loadedFiles[__loadedFiles.length] = _tags;
    };

};