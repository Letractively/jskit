/*****************************************************
 *
 * JskitCookie
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *
 ******************************************************/
function JskitCookie(){
	this.set = function(name, value, expiredays){
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + expiredays);
	    document.cookie = name + "=" + escape(value) +
	    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	};
	this.get = function(name){
	    if (document.cookie.length > 0) {
	        var _start = document.cookie.indexOf(name + "=");
	        if (_start != -1) {
	            _start = _start + name.length + 1;
	            var _end = document.cookie.indexOf(";", _start);
	            if (_end == -1) 
	                _end = document.cookie.length;
	            return unescape(document.cookie.substring(_start, _end));
	        }
	    }
	    return "";
	};
};

