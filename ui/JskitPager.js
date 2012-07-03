/*****************************************************
 *
 * JskitPager
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : core/*;
 *
 ******************************************************/
var JskitPager =function(rHd){
    var __hd = (typeof(rHd) == "string")?rHd:"jskitPager";

    //public properties
    var __pageNo = 1;
    this.setPageNo = function(v){
        __pageNo = (isNaN(parseInt(v)) || parseInt(v)<1)?1:parseInt(v);
    };
    this.getPageNo = function(){
        return __pageNo;
    };

    var __totalSize = 0;
    this.setTotalSize = function(v){
    	__totalSize = (isNaN(parseInt(v)) || parseInt(v)<1)?1:parseInt(v);
    };
    this.getTotalSize = function(){
        return __totalSize;
    };

    var __pageSize = 1;
    this.setPageSize = function(v){
    	__pageSize = (isNaN(parseInt(v)) || parseInt(v)<1)?1:parseInt(v);
    };
    this.getPageSize = function(){
        return __pageSize;
    };

	var __style = "number";//fpnl|number
    this.setStyle = function(v){
        __style = v;
    };

    var __action = "#";
    this.setAction = function(v){
        __action = ($t.isFunction(v))?v:void(0);
    };

    var __fpnlText = new Array("First", "Prev", "Next", "Last");
    this.setFpnlText = function(v){
        __fpnlText = v;
    };
    
    var __url = "";
    //#Begin Private properties
    var __inputId = jskitUtil.guid();
    var __totalPages = 1;
    var __errors = new Array();
    //#End
    
    //#Begin Private methods
    var __gotoPage = function(rPage){
        if($t.isFunction(__action)){
        	__action(rPage);
        }
    	__url = __url.replace(/\{pageNo\}/gi, rPage-1);
    	__url = __url.replace(/\{pageSize\}/gi, __pageSize);
        window.location.href = __url;
    };
    var __pageInput = function(){
        return '<input type="text" id="' + __inputId + '" onkeypress="' + __hd + '.__gotoPage(this.value);" />';
    };
    var __pageAction = function (rPage, rText, rSelected) {
        if (typeof (rText) != "string"){
            rText = rPage;
		}
        if (rSelected===true) {
            return '<a href="javascript:' + __hd + '.gotoPage(' + rPage + ')" class="cur"><div>' + rText + '</div></a>';
        } else {
            return '<a href="javascript:' + __hd + '.gotoPage(' + rPage + ')" class="nor"><div>' + rText + '</div></a>';
        }
    };
    var __pageDisabled = function(rText){
        return '<a href="javascript:" class="dis"><div>' + rText + '</div></a>';
    };
	var __pageFpnlText = function(rText){
        return '<span>' + rText + '</span>';
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
        } else if (__pageNo == 1) {
                _str += __pageDisabled(__fpnlText[0]);
                _str += __pageDisabled(__fpnlText[1]);
				_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                _str += __pageAction(__pageNo + 1, __fpnlText[2], false);
                _str += __pageAction(__totalPages, __fpnlText[3], false);
        } else if (__pageNo > 1 && __pageNo <= __totalPages - 1) {
                    _str += __pageAction(1, __fpnlText[0], false);
                    _str += __pageAction(__pageNo - 1, __fpnlText[1], false);
					_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                    _str += __pageAction(__pageNo + 1, __fpnlText[2], false);
                    _str += __pageAction(__totalPages, __fpnlText[3], false);
        } else if (__pageNo == __totalPages) {
                        _str += __pageAction(1, __fpnlText[0], false);
                        _str += __pageAction(__pageNo - 1, __fpnlText[1], false);
						_str += __pageFpnlText(__pageNo + "/" + __totalPages);
                        _str += __pageDisabled(__fpnlText[2]);
                        _str += __pageDisabled(__fpnlText[3]);
        }
        return _str;
    };
    var __numberContent = function (rPage) {
        __init();
        var _str = '';
        var _ret = 5;
        if (typeof (rPage) == "number" || !isNaN(parseInt(rPage))){
            __pageNo = parseInt(rPage);
		}
        if (__pageNo > __totalPages){
            __pageNo = __totalPages;
		}
        if (__totalPages <= (_ret + 1)) {
            for (var i = 1; i <= __totalPages; i++) {
                _str += __pageAction(i, null, (i == __pageNo));
            }
        } else if (__pageNo < _ret) {
            for (var i = 1; i <= _ret; i++) {
                _str += __pageAction(i, null, (i == __pageNo));
            }
            _str += '...';
            _str += __pageAction(__totalPages, null, false);
        } else if (__pageNo >= _ret) {
            _str += __pageAction(1, null, false);
            _str += '...';
            var _start = Math.floor(__pageNo / _ret) * _ret - 1;
            var _end = _start + _ret + 1;
            if (_end > __totalPages) _end = __totalPages;
            for (var i = _start; i <= _end; i++) {
                _str += __pageAction(i, null, (i == __pageNo));
            }
            if (_end < __totalPages) {
                _str += '...';
                _str += __pageAction(__totalPages, null, false);
            }
        }
       return _str;
    };
    var __baseContent = function(){
    	return '共'+__totalSize+'条/每页'+__pageSize+'条';
    };
    var __buildContent = function(rPage){
        var _str = '<div class="JskitPager"><table cellspacing="0" cellpadding="0">';
        _str += '<tr>';
        _str += '<td class="base">'+__baseContent()+'</td>';
        _str += '<td>';    
        if (__style == "number") {
            _str += __numberContent(rPage);
        } else {
        	_str += __fpnlContent(rPage);
        }
        _str += '</td>';
        _str += '</tr>';
        _str += '</table></div>';
        return _str;
    };
    
    var __init = function () {
        if (typeof (__pageNo) != "number") {
            __errors.push("bad value type of pageNo");
        }
        if (typeof (__totalSize) != "number") {
            __errors.push("bad value type of totalSize");
        }
        if (typeof (__pageSize) != "number") {
            __errors.push("bad value type of pageSize");
        }
        __totalPages = Math.ceil(__totalSize / __pageSize);
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
    this.outContent = function (rPage) {
        if (__errors.length > 0) {
            var _err = 'error:';
            for (var i = 0; i < __errors.length; i++) {
                _err += __errors[i];
            }
            return _err;
        }
        return __buildContent(rPage);
    };
    this.bind = function(dstObjId){
    	var _obj = $$("#"+dstObjId);
    	if(_obj!=null){
    		_obj.innerHTML = this.outContent(__pageNo);
    	}
    	_obj = null;
    };
    //#End
    this.init = function(json){
    	__url = json.url;
        this.setPageNo(json.pageNo);
        this.setPageSize(json.pageSize);
        this.setAction(json.action);
        this.setTotalSize(json.total);
        this.setStyle(json.style);
        this.setFpnlText(json.fpnlText);
    };
};
