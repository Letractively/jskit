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
    var __startIndex = 0;
    this.setStartIndex = function(v){
    	__startIndex = (v===1)?1:0;
    };
    var __pageNo = null;
    this.setPageNo = function(v){
        __pageNo = (isNaN(parseInt(v)) || parseInt(v)<__startIndex)?__startIndex:parseInt(v);
        __pageNo = (__startIndex==0)?__pageNo+1:__pageNo;
    };
    this.getPageNo = function(){
        return __pageNo;
    };

    var __totalSize = 0;
    this.setTotalSize = function(v){
    	__totalSize = (isNaN(parseInt(v)) || parseInt(v)<0)?0:parseInt(v);
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

	var __style = "number";//fpnl|number|full
    this.setStyle = function(v){
        __style = v;
    };
    
    var __template = "";

    var __action = function(){};
    this.setOnPageChange = function(v){
    	if((typeof(v)=="function")){
    		__action = v;
    	}
    };
    
    var __onPageSizeChange = function(){};
    this.setOnPageSizeChange = function(v){
    	if((typeof(v)=="function")){
        	__onPageSizeChange = v;
    	}
    };

    var __fpnlText = new Array("First", "Prev", "Next", "Last");
    this.setFpnlText = function(v){
        __fpnlText = v;
    };
    
    var __url = "";
    //#Begin Private properties
    var __totalPages = 1;
    var __errors = new Array();
    //#End
    
    //#Begin Private methods
    
    var __buildFirst = function(){
    	if(__totalPages == 1 || __pageNo == 1){
            return '<div>' + __fpnlText[0] + '</div>';
    	}else{
            return '<a href="javascript:' + __hd + '.gotoPage(1)"><div>' + __fpnlText[0] + '</div></a>';
    	}
    };
    var __buildPrev = function(){
    	if(__totalPages == 1 || __pageNo == 1){
            return '<div>' + __fpnlText[1] + '</div>';
    	}else{
            return '<a href="javascript:' + __hd + '.gotoPage(' + (__pageNo-1) + ')"><div>' + __fpnlText[1] + '</div></a>';
    	}
    };
    var __buildNext = function(){
    	if(__totalPages == 1 || __pageNo > __totalPages - 1){
            return '<div>' + __fpnlText[2] + '</div>';
    	}else{
            return '<a href="javascript:' + __hd + '.gotoPage(' + (__pageNo+1) + ')"><div>' + __fpnlText[2] + '</div></a>';
    	}
    };
    var __buildLast = function(){
    	if(__totalPages == 1 || __pageNo>=__totalPages){
            return '<div>' + __fpnlText[3] + '</div>';
    	}else{
            return '<a href="javascript:' + __hd + '.gotoPage(' + __totalPages + ')"><div>' + __fpnlText[3] + '</div></a>';
    	}
    };
    var __buildPageSizeSelector = function(){
    	var _l = [10,20,50,100];
    	var _str = '<select onchange="'+__hd+'.changePageSize(this)">';
    	for(var i=0;i<_l.length;i++){
    		if(_l[i]==__pageSize){
        		_str += '<option value="'+_l[i]+'" selected="selected">'+_l[i]+'</option>';
    		}else{
        		_str += '<option value="'+_l[i]+'">'+_l[i]+'</option>';
    		}
    	}
    	_str += '</select>';
    	return _str;
    };
    var __buildNumLink = function (rPage, rText, rSelected) {
        if (typeof (rText) != "string"){
            rText = rPage;
		}
        if (rSelected===true) {
            return '<em>' + rText + '</em>';
        } else {
            return '<a href="javascript:' + __hd + '.gotoPage(' + rPage + ')"><em>' + rText + '</em></a>';
        }
    };
    var __buildNumbSuspension = function () {
        return '<div>...</div>';
    };
    var __buildNumberContent = function (rPage) {
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
                _str += __buildNumLink(i, null, (i == __pageNo));
            }
        } else if (__pageNo < _ret) {
            for (var i = 1; i <= _ret; i++) {
                _str += __buildNumLink(i, null, (i == __pageNo));
            }
            _str += __buildNumbSuspension();
            _str += __buildNumLink(__totalPages, null, false);
        } else if (__pageNo >= _ret) {
            _str += __buildNumLink(1, null, false);
            _str += __buildNumbSuspension();
            var _start = Math.floor(__pageNo / _ret) * _ret - 1;
            var _end = _start + _ret + 1;
            if (_end > __totalPages) _end = __totalPages;
            for (var i = _start; i <= _end; i++) {
                _str += __buildNumLink(i, null, (i == __pageNo));
            }
            if (_end < __totalPages) {
                _str += __buildNumbSuspension();
                _str += __buildNumLink(__totalPages, null, false);
            }
        }
       return _str;
    };
    var __buildContent = function(){
        var _str = '';
		_str = __template;
		_str = _str.replace(new RegExp("\\{number\\}","gi"), __buildNumberContent());
		_str = _str.replace(new RegExp("\\{pageNo\\}","gi"), __pageNo);
		_str = _str.replace(new RegExp("\\{pageSize\\}","gi"), __pageSize);
		_str = _str.replace(new RegExp("\\{pageSizeSelect\\}","gi"), __buildPageSizeSelector());
		_str = _str.replace(new RegExp("\\{total\\}","gi"), __totalSize);
		_str = _str.replace(new RegExp("\\{pageCount\\}","gi"), __totalPages);
		_str = _str.replace(new RegExp("\\{first\\}","gi"), __buildFirst());
		_str = _str.replace(new RegExp("\\{prev\\}","gi"), __buildPrev());
		_str = _str.replace(new RegExp("\\{next\\}","gi"), __buildNext());
		_str = _str.replace(new RegExp("\\{last\\}","gi"), __buildLast());
        return _str;
    };
    
    var __gotoPage = function(rPage){
    	var _page = (__startIndex==0)?rPage-1:rPage;
        if(typeof(__action)=="function"){
        	__action(_page,__pageSize);
        }else if(typeof(__url)=="string"){
        	var _url = __url.replace(/\{page\}/gi, _page);
        	_url = _url.replace(/\{pageSize\}/gi, __pageSize);
            window.location.href = _url;
        }
    };
    var __changePageSize = function(size){
        if(typeof(__onPageSizeChange)=="function"){
        	__onPageSizeChange(__pageNo,size);
        	__pageSize = size;
        }else if(typeof(__url)=="string"){
        	var _url = __url.replace(/\{page\}/gi, __pageNo);
        	_url = _url.replace(/\{pageSize\}/gi, size);
            __pageSize = size;
            window.location.href = _url;
        }
    };
    //#End
    
    //#Begin Public methods
	this.gotoPage = function(rPageNumber){
		__gotoPage(rPageNumber);
	};
	this.changePageSize = function(sender){
		__changePageSize(parseInt(sender.value));
	};
	this.getTotalPages = function(){
		return __totalPages;
	};
    this.outContent = function(rPageNo,rPageSize){
    	if(typeof(rPageNo)!="undefined"){
    		this.setPageNo(rPageNo);
    	}
    	if(typeof(setPageSize)!="undefined"){
    		this.setPageSize(rPageSize);
    	}
    	return __buildContent();
    	
    };
    this.bind = function(dstObjId,setting){
    	var _obj = $$("#"+dstObjId);
    	if(_obj!=null){
    		if(typeof(setting)=="object"){
    			this.init(setting);
    		}
    		_obj.innerHTML = __buildContent();
    	}
    	_obj = null;
    };
    this.init = function(json){
    	__url = json.url;
    	__template = json.template;
    	this.setStartIndex(json.startIndex);
        this.setPageNo(json.pageNo);
        this.setPageSize(json.pageSize);
        this.setOnPageChange(json.onPageChange);
        this.setOnPageSizeChange(json.onPageSizeChange);
        this.setTotalSize(json.total);
        this.setFpnlText(json.fpnlText);
        __totalPages = Math.ceil(__totalSize / __pageSize);
        if(__totalPages<1){__totalPages=1;}
    };
    //#End
};
