/*****************************************************
 *
 * JskitPager
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *
 ******************************************************/
function JskitPager(rHd){
    __hd = rHd;
    if (typeof(rHd) != "string" && typeof(JSKIT_ERROR) == "array") {
        JSKIT_ERRORS.push("JskitPager:hd lost")
    }
    //public properties
    var __pageNo = 1;
    this.setPageNo = function(v){
        __pageNo = v;
    }
    this.getPageNo = function(){
        return __pageNo;
    }

    var __totalSize = 0;
    this.setTotalSize = function(v){
        __totalSize = v;
    }
    this.getTotalSize = function(){
        return __totalSize;
    }

    var __pageSize = 1;
    this.setPageSize = function(v){
        __pageSize = v;
    }
    this.getPageSize = function(){
        return __pageSize;
    }

	var __style = "number";//fpnl|number
    this.setStyle = function(v){
        __style = v;
    }

    var __action = "#";
    this.setAction = function(v){
        __action = v;
    }

    var __cssNormal = "";
    this.setCssNormal = function(v){
        __cssNormal = v;
    }

    var __cssSelected = "";
    this.setCssSelected = function(v){
        __cssSelected = v;
    }

    var __cssDisabled = "";
    this.setCssDisabled = function(v){
        __cssDisabled = v;
    }
    var __fpnlText = new Array("First", "Prev", "Next", "Last");
    this.setFpnlText = function(v){
        __fpnlText = v;
    }
    var __cssFpnlText = new Array("First", "Prev", "Next", "Last");
    this.setCssFpnlText = function(v){
        __cssFpnlText = v;
    }
    
    //#Begin Private properties
    var __inputId = jskitUtil.guid();
    var __totalPages = 1;
    var __errors = new Array();
    //#End
    
    //#Begin Private methods
    var __gotoPage = function(rPage){
        if (typeof(__action) != "string") {
            alert("JskitPager: bad page action value,it must be a string!");
            return;
        }
        var _h = __action.substr(0, __action.indexOf(":"));
        _h = _h.toLowerCase();
        if (_h == "javascript") {
            eval(__action.replace(/\$1/gi, rPage));
        }
        else {
            window.location.href = __action.replace(/\$1/gi, rPage);
        }
    };
    var __pageInput = function(){
        return '<input type="text" id="' + __inputId + '" onkeypress="' + __hd + '.__gotoPage(this.value);" />';
    };
    var __pageAction = function(rPage, rText, rSelected){
        if (typeof(rText) != "string") 
            rText = rPage;
        if (rSelected) 
            return '<a href="javascript:' + __hd + '.gotoPage(' + rPage + ')" class="' + __cssSelected + '">' + rText + '</a>';
        else 
            return '<a href="javascript:' + __hd + '.gotoPage(' + rPage + ')" class="' + __cssNormal + '">' + rText + '</a>';
    };
    var __pageDisabled = function(rText){
        return '<a href="javascript:" class="' + __cssDisabled + '">' + rText + '</a>';
    };
	var __pageFpnlText = function(rText){
        return '<span class="' + __cssFpnlText + '">' + rText + '</span>';
	};
    var __fpnlContent = function(rPage){
        __init();
        var _str = '';
        if (typeof(rPage) == "number" || !isNaN(parseInt(rPage))) 
            __pageNo = parseInt(rPage);
        if (__pageNo > __totalPages) 
            __pageNo = __totalPages;
        if (__totalPages == 1) {
            _str += __pageDisabled(__fpnlText[0]);
            _str += __pageDisabled(__fpnlText[1]);
			_str += __pageFpnlText(__pageNo + "/" + __totalPages);
            _str += __pageDisabled(__fpnlText[2]);
            _str += __pageDisabled(__fpnlText[3]);
        }
        else 
            if (__pageNo == 1) {
                _str += __pageDisabled(__fpnlText[0]);
                _str += __pageDisabled(__fpnlText[1]);
				_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                _str += __pageAction(__pageNo + 1, __fpnlText[2], false);
                _str += __pageAction(__totalPages, __fpnlText[3], false);
            }
            else 
                if (__pageNo > 1 && __pageNo <= __totalPages - 1) {
                    _str += __pageAction(1, __fpnlText[0], false);
                    _str += __pageAction(__pageNo - 1, __fpnlText[1], false);
					_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                    _str += __pageAction(__pageNo + 1, __fpnlText[2], false);
                    _str += __pageAction(__totalPages, __fpnlText[3], false);
                }
                else 
                    if (__pageNo == __totalPages) {
                        _str += __pageAction(1, __fpnlText[0], false);
                        _str += __pageAction(__pageNo - 1, __fpnlText[1], false);
						_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                        _str += __pageDisabled(__fpnlText[2]);
                        _str += __pageDisabled(__fpnlText[3]);
                    }
        return _str;
    };
    var __numberContent = function(rPage){
        __init();
        var _str = '';
        var _ret = 5;
        if (typeof(rPage) == "number" || !isNaN(parseInt(rPage))) 
            __pageNo = parseInt(rPage);
        if (__pageNo > __totalPages) 
            __pageNo = __totalPages;
        if (__totalPages <= (_ret + 1)) {
            for (var i = 1; i <= __totalPages; i++) {
                _str += __pageAction(i, null, (i == __pageNo));
            }
        }
        else 
            if (__pageNo < _ret) {
                for (var i = 1; i <= _ret; i++) {
                    _str += __pageAction(i, null, (i == __pageNo));
                }
                _str += '...';
                _str += __pageAction(__totalPages, null, false);
            }
            else 
                if (__pageNo >= _ret) {
                    _str += __pageAction(1, null, false);
                    _str += '...';
					var _start = Math.floor(__pageNo/_ret)*_ret-1;
					var _end = _start+_ret+1;
					if(_end>__totalPages)_end=__totalPages;
                    for (var i = _start; i <= _end; i++) {
                        _str += __pageAction(i, null, (i == __pageNo));
                    }
					if(_end<__totalPages){
	                    _str += '...';
	                    _str += __pageAction(__totalPages, null, false);
					}
                }
         return _str;
    };
    var __init = function(){
        if (typeof(__pageNo) != "number") 
            __errors.push("bad value type of pageNo");
        if (typeof(__totalSize) != "number") 
            __errors.push("bad value type of totalSize");
        if (typeof(__pageSize) != "number") 
            __errors.push("bad value type of pageSize");
        __totalPages = Math.ceil(__totalSize / __pageSize);
        if (__fpnlText.length != 4) {
            __errors.push("fpnlText must be a 4-length Array Object");
        }
    };
    //#End
    
    //#Begin Public methods
	this.gotoPage = function(rPageNumber){
		__gotoPage(rPageNumber);
	};
	this.getTotalPages = function(){
		return __totalPages;
	};
    this.display = function(rPage){
        document.write(this.outContent(rPage));
    };
    this.outContent = function(rPage){
        if (__errors.length > 0) {
            var _err = 'error:';
            for (var i = 0; i < __errors.length; i++) 
                _err += __errors[i];
            return _err;
        }
        if (__style == "number") {
            return __numberContent(rPage);
        }
        else {
            return __fpnlContent(rPage);
        }
    };
    //#End
}
