/*****************************************************
*
* JskitGridView
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
* @outof jskit.ui.js!!!!
* @bese on jskit.core.1.1
******************************************************/
var JskitGridView = function (rHd) {
    var __hd = (typeof (rHd) == "string") ? rHd : "jskitGridView";
    var __table = null;
    var __COLUMN = function () {
        this.title = "";
        this.orderBy = "";
        this.orderRule = 0;
        this.lock = false;
        this.editable = false;
    };
    var __lang = [];
    /*#BEGIN Properties */
    var __totalSize = 0;
    this.setTotalSize = function (v) {
        __totalSize = (!isNaN(parseInt(v)) && v > 0) ? v : 0;
    };
    var __pageSize = 20;
    this.setPageSize = function (v) {
        __pageSize = (!isNaN(parseInt(v)) && v > 0) ? v : 20;
    };
    var __pageIndex = 1;
    this.setPageIndex = function (v) {
    	__pageIndex = (isNaN(parseInt(v)) || parseInt(v)<__pagerStartIndex)?__pagerStartIndex:parseInt(v);
        __pageIndex = (__pagerStartIndex==0)?__pageIndex+1:__pageIndex;
    };
    var __pagerVisiable = true;
    this.setPagerVisiable = function (v) {
        __pagerVisiable = (v === true && v ===1 && v === "yes");
    };
    
    var __pagerStartIndex = 0;
    this.setPagerStartIndex = function(v){
    	__pagerStartIndex = (v===0)?0:1;
    };
    
    var __pagerUrl = null;
    this.setPagerUrl = function(v){
    	__pagerUrl = v;
    };
    
    var __getIndex = function(rowIndex){
    	 return (__pagerStartIndex===0)?((__pageIndex - 2) * __pageSize + rowIndex):((__pageIndex - 1) * __pageSize + rowIndex);
    };
    
    var __data = null;
    var __oriData = null;
    this.setData = function (v) {
        __oriData = __data = v;
        __pkColumnIndex = __parseFieldIndex(__pkColumnField);
    };
    this.getData = function (v) {
        return __data;
    };

    var __columns = null;
    //columns data example: [{title:"",field:"",checkname:"",visiable:true,editable:true,template:"",width:}];
    this.setColumns = function (v) {
        __columns = v;
    };

    var __footerVisiable = true;
    this.setFooterVisiable = function (v) {
    	__footerVisiable = (v !== false && v !== 0 && v !== "no");
    };
    
    var __autoUpdate = false;
    this.setAutoUpdate = function (v) {
        __autoUpdate = (v !== false && v !== 0 && v !== "no");
    };

    var __editable = false;
    this.setEditable = function (v) {
        __editable = (v !== false && v !== 0 && v !== "no");
    };
    

    var __width = 0;
    this.setWidth = function (v) {
        __width = (!isNaN(parseInt(v)) && v > 0) ? v : 0;
    };
    var __lineWidth = 1;
    this.setLineWidth = function (v) {
        __lineWidth = (!isNaN(parseInt(v)) && v >= 0) ? v : 1;
    };
    var __lineWidth = 1;
    this.setLineWidth = function (v) {
        __lineWidth = (!isNaN(parseInt(v)) && v >= 0) ? v : 1;
    };
    
    var __pkColumnIndex = null;
    var __pkColumnField = null;
    var __queryParams = null;
    var __queryUrl = null;
    var __deleteUrl = null;
    var __updateUrl = null;

    var __dataCanvas = null;
    var __dataCanvasId = jskitUtil.guid();
    var __pagerCanvas = null;
    var __pagerCanvasId = jskitUtil.guid();
    var __pagerHandler = null;
    this.setPagerHandler = function(v){
    	__pagerHandler = (typeof(v)=="object")?v:null;
    };
    var __rowIdPrefix = jskitUtil.guid();
    var __cbIdPrefix = jskitUtil.guid();
    var __topCbId = jskitUtil.guid();
    var __cbGroupName = jskitUtil.guid();

    var __initStrValue = function (v, def) {
        return (typeof (v) != "undefined") ? v : def;
    };
    var __tableCss = "";
    this.setTableCss = function (v) {
        __tableCss = __initStrValue(v, "");
    };
    var __headCss = "";
    this.setHeadCss = function (v) {
        __headCss = __initStrValue(v, "");
    };
    var __footCss = "";
    this.setFootCss = function (v) {
        __footCss = __initStrValue(v, "");
    };
    var __bodyCss = "";
    this.setBodyCss = function (v) {
        __bodyCss = __initStrValue(v, "");
    };
    
    var __pagerCss = "";
    this.setPagerCss = function (v) {
        __pagerCss = __initStrValue(v, "");
    };
    var __loadingCss = "";
    this.setLoadingCss = function (v) {
        __loadingCss = __initStrValue(v, "");
    };
    var __canvas = null;
    var __canvasId = null;
    this.setCanvasId = function (v) {
        __canvasId = __initStrValue(v, "");
    };
    
    //counter column
    var __counter = function(){
    	this.sum = [];
    };
    this.setSumColumns = function(arr){
    	__counter.sum = ($t.isArray(arr))?arr:[];
    };
    this.setColumns = function(colList){
    	var cols = [];
    	if(typeof(colList)=="object"){
    		var v = null;
    		var _c = null;
    		for(var i=0;i<colList.length;i++){
    			v = colList[i];
    	    	_c = {"type":"data","title":"?","name":null,"cssClass":null, "field":"", "visiable":false,"format":null, "editable":false, "template":"","width":null};
        		if(typeof(v)=="object"){
	    	    	_c.type = (typeof(v.type)=="string")?v.type:"data";
	        		_c.title = (typeof(v.title)=="string")?v.title:"?";
	        		_c.field = (typeof(v.field)=="string")?v.field:"";
	        		_c.visiable = (typeof(v.visiable)=="undefined" || v.visiable!==false);
	        		_c.editable = (typeof(v.editable)!="undefined" && v.editable===true);
	        		_c.template = (typeof(v.template)=="string")?v.template:"";
	        		_c.width = (typeof(v.width)=="number")?v.width:null;
	        		_c.format = (typeof(v.format)=="string")?v.format:null;
	        		_c.cssClass = (typeof(v.cssClass)=="string")?v.cssClass:null;
	        		_c.name = (typeof(v.name)=="string")?v.name:null;
        		}
        		cols.push(_c);
    		}
    		_c = v = null;
    	}
    	return cols;
    };
    /*#END Properties */

    /*BEGIN Const def */
    var __ENUM = {
        COL_TYPE: { DATA: "data", CHECK: "check", INDEX: "index", EDIT: "edit" },
        ACTION: { D: "d", U: "u", R: "r",P:"p" }
    };

    var __TXT = {
        CONFIRM: { DEL: "Sure to Delete?" },
        PAGE: { F: "First", P: "Prev", N: "Next", L: "Last" }
    };    /*#END Const def */


    /*BEGIN Private methods */
    var __countPages = function () {
    	if(__totalSize==0){
    		return 1;
    	}else{
            return Math.ceil(__totalSize / __pageSize);
    	}
    };
    var __attrFilter = function (v) {
        if (typeof (v) === "number") { return v + ""; }
        if (typeof (v) === "string") {
            return v.replace(/\"/gi, "");
        } else {
            return "";
        }
    };
    var __buildColDefContent = function(){
        var _str = new Array();
        var _c = null;
        for (var i = 0; i < __columns.length; i++) {
            _c = __columns[i];
            if (_c.visiable !== false) {
                if (!isNaN(parseFloat(_c.width)) && _c.width > 0) {
                    _str.push('<colgroup width="' + _c.width + 'px"></colgroup>');
                } else {
                    _str.push('<colgroup></colgroup>');
                }
            }
        }
        return _str.join('');
    };
    var __buildHeadContent = function () {
       var _str = new Array();
        var _c = null;
        _str.push('<tr>');
        for (var i = 0; i < __columns.length; i++) {
            _c = __columns[i];
            if (_c.visiable !== false) {
                _str.push('<td title="' + __attrFilter(_c.title) + '" >');
                if (_c.type === __ENUM.COL_TYPE.CHECK) {
                    _str.push('<input type="checkbox" id="' + __topCbId + '" onclick="' + __hd + '.checkAll()" />');
                } else {
                    _str.push(_c.title);
                }
                _str.push('</td>');
            }
        }
        _str.push('</tr>');
        return _str.join('');
    };
    var __buildPagerContent = function () {
        if (__pagerVisiable === true) {
            var _pageCount = __countPages();
            var _str = new Array();
            _str.push('<div class="' + __pagerCss + '">');
            _str.push('<div>' + __lang.pager.total + __totalSize + '</div>');
            if (__pageIndex == 1) {
                _str.push('<div>' + __TXT.PAGE.F + '</div>');
                _str.push('<div>' + __TXT.PAGE.P + '</div>');
            } else {
                _str.push('<a href="javascript:' + __hd + '.onPageChange(1)"><div>' + __TXT.PAGE.F + '</div></a>');
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + (__pageIndex - 1) + ')"><div>' + __TXT.PAGE.P + '</div></a>');
            }
            _str.push('<div>' + __pageIndex + '/'+_pageCount+'</div>');
            if (__pageIndex == _pageCount) {
                _str.push('<div>' + __TXT.PAGE.N + '</div>');
                _str.push('<div>' + __TXT.PAGE.L + '</div>');
            } else {
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + (__pageIndex + 1) + ')"><div>' + __TXT.PAGE.N + '</div></a>');
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + _pageCount + ')"><div>' + __TXT.PAGE.L + '</div></a>');
            }
            _str.push('</div>');
            return _str.join('');
        } else {
            return "";
        }
    };
    var __buildFootContent = function () {
        var _cols = 0;
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].visiable !== false) { _cols++; }
        }
        var _str = new Array();
        _str.push('<tfoot class="' + __attrFilter(__footCss) + '">');
        _str.push(__buildCounterRow());
        _str.push("</tfoot>");
        return _str.join('');
    };

    var __getCbName = function () {
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].type == __ENUM.COL_TYPE.CHECK) {
                return __columns[i].name;
            }
        }
        return "";
    };
    var __getRowId = function (pkValue) {
        return "_row_" + __rowIdPrefix + "_" + pkValue;
    };
    var __getCbId = function (pkValue) {
        return "_cb_" + __cbIdPrefix + "_" + pkValue;
    };
    var __buildTable = function () {
        /* TABLE STYLE */
        var _str = new Array();
        _str.push('<table class="' + __tableCss + '">');
        _str.push(__buildColDefContent());
        _str.push('<thead class="' + __attrFilter(__headCss) + '">' + __buildHeadContent() + '</thead>');
        _str.push('<tbody class="' + __attrFilter(__bodyCss) + '" id="' + __dataCanvasId + '">'+__buildDataBody()+'</tbody>');
        if(__footerVisiable===true){
        	_str.push(__buildFootContent());
        }
        _str.push('</table>');
        if(__pagerVisiable===true){
	        if (!isNaN(parseFloat(__width)) && __width > 0) {
	            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;width:' + __width + 'px;overflow:hidden;"><div class="'+__attrFilter(__pagerCss)+'"  id="' + __pagerCanvasId + '"></div></div>');
	        } else {
	            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;"><div class="'+__attrFilter(__pagerCss)+'"  id="' + __pagerCanvasId + '"></div></div>');
	        }
        }
        return _str.join('');
    };
    var __parseFieldIndex = function (rFieldName) {
        if (__data == null || __data.length < 0) { return -1; }
        for (var i = 0; i < __data[0].length; i++) {
            if (__data[0][i] == rFieldName) {
                return i;
            }
        }
        return -1;
    };
    var __parseColumnIndex = function (rFieldName) {
    	for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].field == rFieldName) {
                return i;
            }
        }
        return -1;
    };
    var __parseColumnDef = function(rColumnName){
        if (__columns == null || __columns.length <= 0) { return null; }
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].field == rColumnName) {
                return __columns[i];
            }
        }
        return null;
    };
    var __getDataByColumnName = function (name, rowIndex) {
        try {
            var _ci = __parseFieldIndex(name);
            if (_ci >= 0) {
                var _val = __data[rowIndex][_ci];
                var _col = __parseColumnDef(name);
                if(_col!=null && typeof(_col.format)==="string" && typeof(_val)!="undefined"){
                	_val = jskitUtil.str.format(_val,_col.format);
                }
                _col = null;
            	return _val;
            } else {
                return "";
                //return name+","+_ci+","+rowIndex;
            }
        } catch (e) {
            //alert("JskitGridView Exception: \n Parse data by column name failed!");
            return "?";
        }
    };
    var __findFieldValueByPk = function (pkValue, columnName) {
        var _tgIdx = __parseFieldIndex(columnName);
        for (var i = 1; i < __data.length; i++) {
            if (__data[i][__pkColumnIndex] == pkValue) {
                return __data[i][_tgIdx];
            }
        }
        return "";
    };
    var __findCell = function(pkValue,fieldName){
        var _colIdx = __parseColumnIndex(fieldName);
        if(_colIdx>=0){
            var _rowId = __getRowId(pkValue);
            if($$("#"+_rowId)!=null){
                var _cellList = $$("#"+_rowId).childNodes;
                var n = null;
                for(var i=0;i<_cellList.length;i++){
                	n = _cellList[i];
                	if(n.tagName==="TD" && n.getAttribute && n.getAttribute("_gv_col_")===(_colIdx+"")){
                		return n;
                	}
                }
            }
        }
        return null;
    };
    var __getGridDataByFk = function (fkName, fkValue) {
        if (__oriData == null || __oriData.length < 0) { return []; }
        var _ci = __parseFieldIndex(fkName);
        var _arr = [];
        _arr.push(__oriData[0]);
        for (var i = 1; i < __oriData.length; i++) {
            if (__oriData[i][_ci] == fkValue) {
                _arr.push(__oriData[i]);
            }
        }
        return _arr;
    };
    var __resetDataByFk = function (fkName, fkValue) {
        __data = __getGridDataByFk(fkName, fkValue);
    };

    var __parseColumnTemplate = function (template, rowIndex) {
        template = template.replace(/\{a:delete\}/gi, "javascript:" + __hd + ".onRowDelete(" + rowIndex + ")");
        template = template.replace(/\{a:edit\}/gi, "javascript:" + __hd + ".onRowEdit(" + rowIndex + ")");
        template = template.replace(/\{e:delete\}/gi, __hd + ".deleteRow(" + rowIndex + ")");
        template = template.replace(/\{e:edit\}/gi, __hd + ".onRowEdit(" + rowIndex + ")");
        //check function
        var _p = /\{\s*func:([^,]*),\s*params:([^}]*)\}/gi;
        var _m = _p.exec(template);
        while(_m!=null){
        	var _func = null;
        	var _params = null;
        	var _vals = "";
        	for(var i=0;i<_m.length;i++){
        		_func = _m[1];
            	_vals = "";
        		if(_m[2]!=null && _m[2].trim()!=""){
            		_params = _m[2].split(',');
            		for(var j=0;j<_params.length;j++){
            			if(j>0){_vals+=",";}
            			_vals += "\""+__getDataByColumnName(_params[j], rowIndex)+"\"";
            		}
            		try{
                		eval("template = template.replace(\""+_m[0]+"\","+_func+"("+_vals+"));");
            		}catch(e){
                		eval("template = template.replace(\""+_m[0]+"\",\"["+e.message+"]\");");
            		}
        		}
        	}
        	_m = _p.exec(template);
        }
        //check normal field 
        var _pattarn = /\{([^\}]*)\}/gi;
        var _arr = template.match(_pattarn);
        if (_arr != null && _arr.length>0) {
            var _field = null;
            var _val = null;
            for (var i = 0; i < _arr.length; i++) {
                _val = __getDataByColumnName(_arr[i].replace("{", "").replace("}", ""), rowIndex);
                if (_val != null) {
                    template = template.replace(_arr[i], _val);
                } else {
                    template = template.replace(_arr[i], "null");
                }
            }
        }
        return template;
    };
    var __buildDataBody = function () {
    	if(!$t.isArray(__data)){
    		return "";
    	}
        var _str = new Array();
        var _dataColIndex = null;
        var _pkValue = "";
        var _cssClass = "";
        for (var i = 1; i < __data.length; i++) {
            _r = __data[i];
            _pkValue = __attrFilter(__getDataByColumnName(__pkColumnField, i));
            _str.push('<tr id="' + __getRowId(_pkValue) + '" pk="' + _pkValue + '" ondblclick="' + __hd + '.onRowDblClick(this,' + i + ',' + _pkValue + ')">');
            _dataColIndex = 0;
            for (var j = 0; j < __columns.length; j++) {
                _c = __columns[j];
                _cssClass = (typeof(_c.cssClass)=="string")?' class="'+_c.cssClass+'" ':'';
                if (_c.visiable !== false) {
                	if(_c.editable===true){
                        _str.push('<td '+_cssClass+' _gv_editable_="1" _gv_col_="'+j+'">');
                	}else{
                        _str.push('<td '+_cssClass+' _gv_col_="'+j+'">');
                	}
                    if (_c.type == __ENUM.COL_TYPE.DATA) {
                        if (_c.template !== "" && _c.template != null) {
                            _str.push('' + __parseColumnTemplate(_c.template, i) + '');
                        } else {
                            _str.push('' + __getDataByColumnName(_c.field, i) + '');
                        }
                    } else if (_c.type == __ENUM.COL_TYPE.CHECK) {//check
                        _str.push('<input name="' + _c.name + '" value="' + _pkValue + '" gname="' + __cbGroupName + '" type="checkbox" idx="' + i + '" onclick="' + __hd + '.onRowCheck(this,' + i + ',' + _pkValue + ')" />');
                    } else if (_c.type == __ENUM.COL_TYPE.INDEX) {//index
                        _str.push(__getIndex(i));
                    } else if (_c.type == __ENUM.COL_TYPE.EDIT) {//edit
                        if (_c.template !== "" && _c.template != null) {
                            _str.push('' + __parseColumnTemplate(_c.template, i) + '');
                        } else {
                            _str.push('<a href="javascript:' + __hd + '.onRowDelete(' + i + ')">' + __lang.btn.del + '</a>');
                            _str.push('|');
                            _str.push('<a href="javascript:' + __hd + '.onRowEdit(' + i + ')">' + __lang.btn.edit + '</a>');
                        }
                    } else {
                        _str.push("??");
                    }
                    _str.push('</td>');
                }
                if (_c.type == __ENUM.COL_TYPE.DATA) {
                    _dataColIndex++;
                }
            }
        }
        _str.push('</tr>');
        return _str.join('');
    };
    var __buildCounterRow = function(){
    	var _str = [];
    	var _c = null;
		_str.push('<tr>');
		var _sumPattern = __counter.sum.join(',')+',';
		var _avgPattern = __counter.sum.join(',')+',';
		for (var j = 0; j < __columns.length; j++) {
    		_c = __columns[j];
    		if(!_c.visiable){continue;}
    		if(_c.type==__ENUM.COL_TYPE.DATA ){
        		if(_sumPattern.indexOf(_c.field+",")!=-1){
        			_str.push('<td>'+__getSum(_c.field)+'</td>');
        		}else if(_avgPattern.indexOf(_c.field+",")!=-1){
            			_str.push('<td>'+__getAvg(_c.field)+'</td>');
        		}else{
        			_str.push('<td>&nbsp;</td>');
        		}
    		}else{
    			_str.push('<td>&nbsp;</td>');
    		}
		}
		_str.push('</tr>');
    	return _str.join('');
    };
    var __getSum = function(columnName){
    	var _c = null;
    	try{
	    	var _sum = 0;
	    	for (var i = 1; i < __data.length; i++) {
				_sum += parseFloat(__getDataByColumnName(columnName, i));
	    	}
	    	var _c = null;
	    	return _sum;
    	}catch(e){
    		return "?";
    	}
    };
    var __getAvg = function(columnName){
    	var _sum = __getSum(columnName);
    	if(_sum=="?"){return "?";}
    	else{return _sum/__data.length;}
    };
    var __flushPager = function () {
    	/*
    	if(__pagerHandler!=null){
            __pagerHandler.bind(__pagerCanvasId);
    	}
    	*/
        __pagerCanvas = $$("#" + __pagerCanvasId);
        if (__pagerCanvas == null) {
            alert("JskitGridView Error: \nPager box not found, maybe create object failed!");
            return;
        }
        __pagerCanvas.innerHTML = __buildPagerContent();
    };
    var __getQueryUrl = function () {
        if (__queryUrl != null) {
            var _url = __queryUrl;
            _url += (_url.indexOf("?") == -1) ? ("?" + jskitUtil.guid()) : ("&" + jskitUtil.guid());
            _url += "&page=" + __pageIndex + "&pagesize=" + __pageSize;
            if (__queryParams != "" && __queryParams != null) {
                return _url + "&" + __queryParams;
            } else {
                return _url;
            }
        }
        return null;
    };
    var __getActionUrl = function (type, rowIndex) {
        var _pkValue = __getDataByColumnName(__pkColumnField, rowIndex);
        var _url = "";
        if (type === __ENUM.ACTION.D) {
            _url = __deleteUrl;
        } else if (type === __ENUM.ACTION.U) {
            _url = __updateUrl;
        } else {
            return null;
        }
        _url += (_url.indexOf("?") == -1) ? ("?" + jskitUtil.guid()) : ("&" + jskitUtil.guid());
        _url += "&" + __pkColumnField + "=" + _pkValue;
        return _url;
    };
    var __loadingBox = null;
    var __showLoading = function (txt) {
        if (__loadingBox == null) {
            __loadingBox = document.createElement("div");
            __loadingBox.style.position = "absolute";
            __loadingBox.className = __loadingCss;
            __loadingBox.style.left = (__canvas.getX() + __canvas.offsetWidth / 2 - __loadingBox.offsetWidth / 2) + "px";
            __loadingBox.style.top = (__canvas.getY() + __canvas.offsetHeight / 2 - __loadingBox.offsetHeight / 2) + "px";
            __loadingBox.innerHTML = (typeof (txt) == "string") ? txt : "Loading...";
        }
        __loadingBox.style.display = "";
    };
    var __closeLoading = function () {
        if (__loadingBox != null) {
            __loadingBox.style.display = "none";
        }
    };
    var __fixPageIndex = function(idx){
    	return (__pagerStartIndex===0)?(idx-1):idx;
    };
    var __draw = function(){
    	__canvas.innerHTML = __buildTable();
        if (__pagerVisiable === true) {
            __flushPager();
        }
    };
    var __action = function (type, rowIndex) {
        var _url = null;
        if (type == __ENUM.ACTION.R) {
            _url = __getQueryUrl();
            if (_url != null && _url != "") {
                __showLoading();
                __ajax = JskitXmlHttpAction(_url, __hd + ".__loadCallback", "text");
            } else {
                __draw();
            }
        } else if ((type == __ENUM.ACTION.D) || (type == __ENUM.ACTION.U)) {
            _url = __getActionUrl(type, rowIndex);
            if (_url != null && _url != "") {
                __showLoading("Processing...");
                __ajax = JskitXmlHttpAction(_url, __hd + ".__actionCallback", "text");
            } else {
                __draw();
            }
        } else if(type==__ENUM.ACTION.P){
        	var _url = __pagerUrl;
        	_url = _url.replace(/\{page\}/gi,__fixPageIndex(__pageIndex));
        	_url = _url.replace(/\{pageSize\}/gi,__pageSize);
        	window.location.href = _url;
        }
    };
    /*END Private methods */

    /*BEGIN Action methods */
    this.checkAll = function (isChecked) {
        var _cl = $$('@' + __getCbName());
        if (_cl != null) {
            for (var i = 0; i < _cl.length; i++) {
                if (_cl[i].getAttribute("gname") == __cbGroupName) {
                    _cl[i].checked = (typeof (isChecked) === "boolean") ? isChecked : $$("#" + __topCbId).checked;
                }
            }
        }
    };
    this.onRowDelete = function (rowIndex) {
        return false;
    };
    this.onRowEdit = function (rowIndex) {
        return false;
    };
    this.onRowCheck = function (sender, rowIndex, pkValue) {
        return false;
    };
    this.onPageChange = function (newPageIndex) {
        __pageIndex = newPageIndex;
        __action(__ENUM.ACTION.P);
        return false;
    };
    this.onRowDelete = function () {
        return false;
    };
    this.onRowDblClick = function (sender, rowIndex, pkValue) {
        return false;
    };
    
    
    /* BEGIN: edit */
    var __EDIT_ACTOR = function(){
    	this.obj = null;
    	this.html = "";
    	this.key = null;
    	this.field = null;
    	this.title = null;
    	this.val = null;
    	this.format = null;
    	this.valHtml = function(v){
    		if(typeof(this.html)=="string"){
        		return this.html.replace("{__v__}",v);
    		}else{
    			return v;
    		}
    	};
    	this.custom = null;
    };
    var __editTd = null;
    var __editing = false;//0: none,1:editing
    var __editOnComplete = null;
    var __editOnEdit = null;
    var __editOnClose = null;
    var __editOnTipShow = null;
    var __editOnTipHide = null;
    var __customParameter = null;
    var __fixAction = function(f){
    	return (typeof(f)=="function")?f:(function(){});
    };
    var __fixValidCell = function(obj){
    	while(obj!=null && obj.getAttribute && obj.parentNode!=null && obj.tagName!="TR"){
    		if(obj.getAttribute("_gv_editable_")==="1"){
    			return obj;
    		}
    		obj = obj.parentNode;
    	}
    	return null;
    };
    var __editComplete = function(e){
    	__editOnTipHide(e);
		__editOnComplete(__editTd);
		__editTd = null;
    	__editing = false;
    };
    this.editInvoke = function(fName){
    	if(fName==="complete"){
    		__editOnComplete(__editTd);
    	}else if(fName==="edit"){
    		__editOnEdit(__editTd);
    	}else{
    		
    	}
    };
    this.onMouseMove4Edit = function(e){
    	if(__editing===true){return;}
    	var sender = __fixValidCell(e.srcElement);
    	if(sender==null){
    		__editOnTipHide(e);
    	}else{
    		__editOnTipShow(e,sender);
    	}
    };
    
    this.onClick4Edit = function(e){
    	var sender = e.srcElement;
    	if(__editing===true){
        	if(sender.tagName=='INPUT'){
        		return;
        	}else{
        		__editing = false;
        		__editOnClose(e);
        		return;
        	}
    	} 
    	sender = __fixValidCell(sender);
    	if(sender!=null){
    		__editOnTipShow(e,sender);
    		__editing = true;
    		__editTd = new __EDIT_ACTOR();
    		__editTd.custom = __customParameter;
    		__editTd.obj = sender;
    		__editTd.val = sender.innerText;
    		__editTd.key = sender.parentNode.getAttribute("pk");
    		var _col = __columns[sender.getAttribute("_gv_col_")];
    		__editTd.field = _col.field;
    		__editTd.title = _col.title;
    		__editTd.format = _col.format;
    		__editTd.html = sender.innerHTML;
    		__editTd.html = __editTd.html.replace(__editTd.val,"{__v__}");
			__editOnEdit(__editTd);
    	}
    };
    this.initFieldEdit = function(json){
    	__editOnComplete = __fixAction(json.onComplete);
    	__editOnEdit = __fixAction(json.onEdit);
    	__editOnClose = __fixAction(json.onClose);
    	__editOnTipShow = __fixAction(json.onTipShow);
    	__editOnTipHide = __fixAction(json.onTipHide);
    	__customParameter = json.custom;
		jskitEvents.add($$("body"),"onmousemove",__hd+".onMouseMove4Edit");
		jskitEvents.add($$("body"),"onclick",__hd+".onClick4Edit");
    };

    /*END edit */
    /*END Action methods */


    /*BEGIN Public methods */
    var __ajax = null;
    this.load = function () {
        __action(__ENUM.ACTION.R);
    };
    this.refresh = function () {
        this.load();
    };
    this.__actionCallback = function (json) {
        __ajax = null;
        __closeLoading();
        var _json = null;
        if (_json == "") {
            return;
        }
        try {
            eval("_json = " + json);
        } catch (e) {
            alert("JskitGridView Action Exception:" + e.message);
            return;
        }
        alert(_json.message);
    };
    this.__loadCallback = function (json) {
        __ajax = null;
        __closeLoading();

        var _json = null;
        try {
            eval("_json = " + json);
        } catch (e) {
            alert("JskitGridView Refresh Exception:" + e.message);
            return;
        }
        __data = _json.data;
        __totalSize = _json.total;
        __pageIndex = _json.page;
        if (__columns == null) {
            __columns = new Array();
            if (__data != null && __data.length > 0) {
                var arr = new Array();
                for (var i = 0; i < __data[0].length; i++) {
                    arr[title] = __data[0][i];
                    arr[field] = __data[0][i];
                    arr[visiable] = true;
                    arr[editable] = true;
                    arr[template] = "";
                    arr[width] = "";
                    __columns.push(arr);
                }
            }
        }
        if (__pkColumnField != null) {
            __pkColumnIndex = __parseFieldIndex(__pkColumnField);
            if (__pkColumnIndex == null) {
                alert("JskitGridView Error:\n PK(" + __pkColumnField + ") is invalid column field");
                return;
            }
        }
        __draw();
    };
    this.getRowElementByPk = function (rPkValue) {
        return $$("#" + __getRowId(rPkValue));
    };
    this.resetDataByFk = function (fkName, fkValue) {
        __resetDataByFk(fkName, fkValue);
    };
    this.getColumnSize = function () {
        var _i = 0;
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].visiable ||
    				(__columns[i].type != __ENUM.COL_TYPE.DATA)) { _i++; }
        }
        return _i;
    };
    this.findValue = function (pkValue, fieldName) {
        return __findFieldValueByPk(pkValue, fieldName);
    };
    this.findCell = function(pkValue,fieldName){
        return __findCell(pkValue,fieldName);
    };
    this.fixColumn = function(fieldName,attrName,attrVal){
    	for(var i=0;i<__columns.length;i++){
    		if(fieldName==__columns[i].field){
    			if(typeof(attrVal)=="string"){
        			eval("__columns[i]."+attrName+" = \""+attrVal+"\";");
    			}else{
        			eval("__columns[i]."+attrName+" = "+attrVal+";");
    			}
    		}
    	}
    };
    this.show = function (rCanvasId) {
        if (typeof (rCanvasId) === "string" && rCanvasId != "") {
            __canvas = $$("#" + rCanvasId);
        } else {
            __canvas = $$("#" + __canvasId);
        }
        if (__canvas == null) {
            alert("JskitGridView Error: Cavans not found!");
            return;
        }
        this.load();
    };
    this.init = function () {
        var json = arguments[0];
        __canvasId = (typeof (json.canvasId) === "string") ? json.canvasId : null;
        __oriData = __data = json.data;
        __columns = this.setColumns(json.columns);
        this.setFooterVisiable(json.footVisiable);
        this.setTableCss(json.cssTable);
        this.setLoadingCss(json.cssLoading);
        this.setFootCss(json.cssFoot);
        this.setHeadCss(json.cssHead);
        this.setBodyCss(json.cssBody);
        this.setTotalSize(json.total);
        //pager
        if($t.isObject(json.pager)){
            this.setPagerVisiable(json.pager.visiable);
            this.setPageSize(json.pager.size);
            this.setPageIndex(json.pager.number);
            this.setPagerCss(json.pager.css);
            this.setPagerStartIndex(json.pager.start);
            this.setPagerUrl(json.pager.url);
            this.setPagerHandler(json.pager.handler);
        }else{
            this.setPagerVisiable(false);
            this.setPageSize(0);
            this.setPageIndex(1);
            this.setPagerCss(null);
            this.setPagerUrl(null);
            this.setPagerHandler(null);
        }
        this.setSumColumns(json.sum);
        this.setAutoUpdate(json.autoUpdate);
        this.setEditable(json.editable);
        __queryParams = json.queryParams;
        __queryUrl = __initStrValue(json.queryUrl, null);
        __deleteUrl = __initStrValue(json.deleteUrl, null);
        __updateUrl = __initStrValue(json.updateUrl, null);
        __pkColumnField = json.pk;
        __pkColumnIndex = __parseFieldIndex(__pkColumnField);
        this.setLineWidth(json.lineWidth);
        __lang = json.properties;
        if (typeof (__lang) != "undefined") {
            __TXT = {
                CONFIRM: { DEL: __lang.confirm.del },
                PAGE: { F: __lang.pager.first, P: __lang.pager.prev, N: __lang.pager.next, L: __lang.pager.last }
            };
        }
        this.setWidth(json.width);
    };
    /*END Public methods */
    var __EXT = function () {
        var __parseFieldIndex = function (data, rColumnName) {
            if (data == null || data.length < 0) { return -1; }
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i] == rColumnName) {
                    return i;
                }
            }
            return -1;
        };
        this.findValueList = function (data, colName, colValue, dstColName) {
            var _tgIdx = __parseFieldIndex(data, dstColName);
            var _srcIdx = __parseFieldIndex(data, colName);
            var _arr = [];
            for (var i = 1; i < data.length; i++) {
                if (data[i][_srcIdx] == colValue) {
                    _arr.push(data[i][_tgIdx]);
                }
            }
            return _arr;
        };
        this.findValue = function (data, pkName, pkValue, columnName) {
            var _tgIdx = __parseFieldIndex(data, columnName);
            var _srcIdx = __parseFieldIndex(data, pkName);
            for (var i = 1; i < data.length; i++) {
                if (data[i][_srcIdx] == pkValue) {
                    return data[i][_tgIdx];
                }
            }
            return "";
        };
    };
    this.ext = new __EXT();

};