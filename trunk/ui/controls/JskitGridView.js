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
    };
    var __lang = [];
    /*#BEGIN Properties */
    var __totalSize = 1;
    this.setTotalSize = function (v) {
        __totalSize = (!isNaN(parseInt(v)) && v > 0) ? v : 20;
    };
    var __pageSize = 20;
    this.setPageSize = function (v) {
        __pageSize = (!isNaN(parseInt(v)) && v > 0) ? v : 20;
    };
    var __pageIndex = 1;
    this.setPageIndex = function (v) {
        __pageIndex = (!isNaN(parseInt(v)) && v > 0) ? v : 1;
    };
    var __pagerVisiable = true;
    this.setPagerVisiable = function (v) {
        __pagerVisiable = (v !== false && v !== 0 && v !== "no");
    };

    var __data = null;
    var __oriData = null;
    this.setData = function (v) {
        __oriData = __data = v;
        __pkColumnIndex = __parseColumnIndex(__pkColumnFeild);
    };
    this.getData = function (v) {
        return __data;
    };

    var __columns = null;
    //columns data example: [{title:"",feild:"",checkname:"",visiable:true,editable:true,template:"",width:}];
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
    var __pkColumnFeild = null;
    var __queryParams = null;
    var __queryUrl = null;
    var __deleteUrl = null;
    var __updateUrl = null;

    var __dataCanvas = null;
    var __dataCanvasId = jskitUtil.guid();
    var __pagerCanvas = null;
    var __pagerCanvasId = jskitUtil.guid();
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
    /*#END Properties */

    /*BEGIN Const def */
    var __ENUM = {
        COL_TYPE: { DATA: "data", CHECK: "check", INDEX: "index", EDIT: "edit" },
        ACTION: { D: "d", U: "u", R: "r" }
    };

    var __TXT = {
        CONFIRM: { DEL: "Sure to Delete?" },
        PAGE: { F: "First", P: "Prev", N: "Next", L: "Last" }
    };    /*#END Const def */


    /*BEGIN Private methods */
    var __countPages = function () {
        return Math.ceil(__totalSize / __pageSize);
    };
    var __attrFilter = function (v) {
        if (typeof (v) === "number") { return v + ""; }
        if (typeof (v) === "string") {
            return v.replace(/\"/gi, "");
        } else {
            return "";
        }
    };
    var __buildHeadContent = function () {
       var _str = new Array();
        var _c = null;
        _str.push('<tr>');
        for (var i = 0; i < __columns.length; i++) {
            _c = __columns[i];
            if (_c.visiable !== false) {
                if (!isNaN(parseFloat(_c.width)) && _c.width > 0) {
                    _str.push('<th title="' + __attrFilter(_c.title) + '"  style="width:' + _c.width + 'px">');
                    _str.push('<div style="width:' + _c.width + 'px" >');
                } else {
                    _str.push('<th title="' + __attrFilter(_c.title) + '">');
                    _str.push('<div >');
                }
                if (_c.type === __ENUM.COL_TYPE.CHECK) {
                    _str.push('<input type="checkbox" id="' + __topCbId + '" onclick="' + __hd + '.checkAll()" />');
                } else {
                    _str.push(_c.title);
                }
                _str.push('</div></th>');
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
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + (i - 1) + ')"><div>' + __TXT.PAGE.P + '</div></a>');
            }
            for (var i = 1; i <= _pageCount; i++) {
                if (__pageIndex != i) {
                    _str.push('<a href="javascript:' + __hd + '.onPageChange(' + i + ')"><div>' + i + '/'+_pageCount+'</div></a>');
                } else {
                    _str.push('<div>' + i + '/'+_pageCount+'</div>');
                }
            }
            if (__pageIndex == _pageCount) {
                _str.push('<div>' + __TXT.PAGE.N + '</div>');
                _str.push('<div>' + __TXT.PAGE.L + '</div>');
            } else {
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + _pageCount + ')"><div>' + __TXT.PAGE.N + '</div></a>');
                _str.push('<a href="javascript:' + __hd + '.onPageChange(' + (i + 1) + ')"><div>' + __TXT.PAGE.L + '</div></a>');
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
        _str.push('<tr><td colspan="' + _cols + '" ></td></tr>');
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
        if (!isNaN(parseFloat(__width)) && __width > 0) {
            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;width:' + __width + 'px;overflow-x:auto;">');
        } else {
            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;">');
        }
        _str.push('<table cellspacing="' + __lineWidth + '" cellpadding="0" border="0" class="' + __tableCss + '">');
        _str.push('<thead class="' + __attrFilter(__headCss) + '">' + __buildHeadContent() + '</thead>');
        _str.push('<tbody class="' + __attrFilter(__bodyCss) + '" id="' + __dataCanvasId + '"></tbody>');
        if(__footerVisiable===true){
        	_str.push('<tfoot class="' + __attrFilter(__footCss) + '">' + __buildFootContent() + '</tfoot>');
        }
        _str.push('</table>');
        _str.push('</div>');
        if(__pagerVisiable===true){
	        if (!isNaN(parseFloat(__width)) && __width > 0) {
	            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;width:' + __width + 'px;overflow:hidden;"><div class="'+__attrFilter(__pagerCss)+'"  id="' + __pagerCanvasId + '"></div></div>');
	        } else {
	            _str.push('<div style="padding:0px;margin:0px;clear:both;float:none;"><div class="'+__attrFilter(__pagerCss)+'"  id="' + __pagerCanvasId + '"></div></div>');
	        }
        }
        /* DIV STYLE
        _str.push('<div style="float:none;clear:both;width:' + __width + 'px;overflow:hidden;"  class="' + __attrFilter(__headCss) + '">' + __buildHeadContent() + '</div>');
        var _c = null;
        var _r = null;
        _str.push('<div  style="float:none;clear:both;width:' + __width + 'px" class="' + __attrFilter(__bodyCss) + '" id="' + __hd + '_data_canvas">');
        _str.push('</div>');
        if (__pagerVisiable === true) {
        _str.push('<div class="' + __pagerCss + '" style="float:none;clear:both;width:' + __width + 'px;overflow:hidden;" id="' + __hd + '_pager_canvas">');
        _str.push('</div>');
        }
        _str.push('<div style="clear:both;float:none;"></div>');
        */
        return _str.join('');
    };
    var __parseColumnIndex = function (rColumnName) {
        if (__data == null || __data.length < 0) { return -1; }
        for (var i = 0; i < __data[0].length; i++) {
            if (__data[0][i] == rColumnName) {
                return i;
            }
        }
        return -1;
    };
    var __getDataByColumnName = function (name, rowIndex) {
        try {
            var _ci = __parseColumnIndex(name);
            if (_ci >= 0) {
                return __data[rowIndex][_ci];
            } else {
                return "";
                //return name+","+_ci+","+rowIndex;
            }
        } catch (e) {
            //alert("JskitGridView Exception: \n Parse data by column name failed!");
            return "";
        }
    };
    var __findFieldValueByPk = function (pkValue, columnName) {
        var _tgIdx = __parseColumnIndex(columnName);
        for (var i = 1; i < __data.length; i++) {
            if (__data[i][__pkColumnIndex] == pkValue) {
                return __data[i][_tgIdx];
            }
        }
        return "";
    };
    var __getGridDataByFk = function (fkName, fkValue) {
        if (__oriData == null || __oriData.length < 0) { return []; }
        var _ci = __parseColumnIndex(fkName);
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
        var _pattarn = /\{([^\}]*)\}/gi;
        var _arr = template.match(_pattarn);
        if (_arr == null) { return template; }
        var _feild = null;
        var _val = null;
        for (var i = 0; i < _arr.length; i++) {
            _val = __getDataByColumnName(_arr[i].replace("{", "").replace("}", ""), rowIndex);
            if (_val != null) {
                template = template.replace(_arr[i], _val);
            } else {
                template = template.replace(_arr[i], "null");
            }
        }
        return template;
    };
    var __dataBind = function () {
    	__dataCanvas = $$("#" + __dataCanvasId);
    	if (__dataCanvas == null) {
            alert("JskitGridView Error: \nData Body not found, maybe create object failed!");
            return;
        }
        var _str = new Array();
        var _dataColIndex = null;
        var _pkValue = "";
        for (var i = 1; i < __data.length; i++) {
            _r = __data[i];
            _pkValue = __attrFilter(__getDataByColumnName(__pkColumnFeild, i));
            _str.push('<tr id="' + __getRowId(_pkValue) + '" pk="' + _pkValue + '" ondblclick="' + __hd + '.onRowDblClick(this,' + i + ',' + _pkValue + ')">');
            _dataColIndex = 0;
            for (var j = 0; j < __columns.length; j++) {
                _c = __columns[j];
                if (_c.visiable !== false) {
                    _str.push('<td>');
                    if (_c.type == __ENUM.COL_TYPE.DATA) {
                        if (_c.template !== "" && _c.template != null) {
                            _str.push('' + __parseColumnTemplate(_c.template, i) + '');
                        } else {
                            _str.push('' + __getDataByColumnName(_c.feild, i) + '');
                        }
                    } else if (_c.type == __ENUM.COL_TYPE.CHECK) {//check
                        _str.push('<div style="padding:0px;maring:0px;width:' + _c.width + 'px;overflow:hidden"><input name="' + _c.name + '" value="' + _pkValue + '" gname="' + __cbGroupName + '" type="checkbox" idx="' + i + '" onclick="' + __hd + '.onRowCheck(this,' + i + ',' + _pkValue + ')" /></div>');
                    } else if (_c.type == __ENUM.COL_TYPE.INDEX) {//index
                        _str.push('<div style="padding:0px;maring:0px;width:' + _c.width + 'px;overflow:hidden">' + ((__pageIndex - 1) * __pageSize + i) + '</div>');
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
        __dataCanvas.innerHTML = _str.join('');
        _str = null;
        if (__pagerVisiable === true) {
            __flushPager();
        }
    };
    var __flushPager = function () {
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
        var _pkValue = __getDataByColumnName(__pkColumnFeild, rowIndex);
        var _url = "";
        if (type === __ENUM.ACTION.D) {
            _url = __deleteUrl;
        } else if (type === __ENUM.ACTION.U) {
            _url = __updateUrl;
        } else {
            return null;
        }
        _url += (_url.indexOf("?") == -1) ? ("?" + jskitUtil.guid()) : ("&" + jskitUtil.guid());
        _url += "&" + __pkColumnFeild + "=" + _pkValue;
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
    var __action = function (type, rowIndex) {
        var _url = null;
        if (type == __ENUM.ACTION.R) {
            _url = __getQueryUrl();
            if (_url != null && _url != "") {
                __showLoading();
                __ajax = JskitXmlHttpAction(_url, __hd + ".__loadCallback", "text");
            } else {
                __dataBind();
            }
        } else if ((type == __ENUM.ACTION.D) || (type == __ENUM.ACTION.U)) {
            _url = __getActionUrl(type, rowIndex);
            if (_url != null && _url != "") {
                __showLoading("Processing...");
                __ajax = JskitXmlHttpAction(_url, __hd + ".__actionCallback", "text");
            } else {
                __dataBind();
            }
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
        __action(__ENUM.ACTION.R);
        return false;
    };
    this.onRowDelete = function () {
        return false;
    };
    this.onRowDblClick = function (sender, rowIndex, pkValue) {
        return false;
    };
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
                    arr[feild] = __data[0][i];
                    arr[visiable] = true;
                    arr[editable] = true;
                    arr[template] = "";
                    arr[width] = "";
                    __columns.push(arr);
                }
            }
        }
        if (__pkColumnFeild != null) {
            __pkColumnIndex = __parseColumnIndex(__pkColumnFeild);
            if (__pkColumnIndex == null) {
                alert("JskitGridView Error:\n PK(" + __pkColumnFeild + ") is invalid column feild");
                return;
            }
        }
        __dataBind();
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
    this.findValue = function (pkValue, columnName) {
        return __findFieldValueByPk(pkValue, columnName);
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
        __canvas.innerHTML = __buildTable();
        this.load();
    };
    this.init = function () {
        var json = arguments[0];
        __canvasId = (typeof (json.canvasId) === "string") ? json.canvasId : null;
        __oriData = __data = json.data;
        __columns = json.columns;
        this.setFooterVisiable(json.footVisiable);
        this.setTableCss(json.cssTable);
        this.setLoadingCss(json.cssLoading);
        this.setFootCss(json.cssFoot);
        this.setHeadCss(json.cssHead);
        this.setBodyCss(json.cssBody);
        this.setPagerVisiable(json.pagerVisiable);
        this.setPageSize(json.pageSize);
        this.setPageIndex(json.pageIndex);
        this.setPagerCss(json.cssPager);
        this.setAutoUpdate(json.autoUpdate);
        this.setEditable(json.editable);
        this.setTotalSize(json.total);
        __queryParams = json.queryParams;
        __queryUrl = __initStrValue(json.queryUrl, null);
        __deleteUrl = __initStrValue(json.deleteUrl, null);
        __updateUrl = __initStrValue(json.updateUrl, null);
        __pkColumnFeild = json.pk;
        __pkColumnIndex = __parseColumnIndex(__pkColumnFeild);
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
        var __parseColumnIndex = function (data, rColumnName) {
            if (data == null || data.length < 0) { return -1; }
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i] == rColumnName) {
                    return i;
                }
            }
            return -1;
        };
        this.findValueList = function (data, colName, colValue, dstColName) {
            var _tgIdx = __parseColumnIndex(data, dstColName);
            var _srcIdx = __parseColumnIndex(data, colName);
            var _arr = [];
            for (var i = 1; i < data.length; i++) {
                if (data[i][_srcIdx] == colValue) {
                    _arr.push(data[i][_tgIdx]);
                }
            }
            return _arr;
        };
        this.findValue = function (data, pkName, pkValue, columnName) {
            var _tgIdx = __parseColumnIndex(data, columnName);
            var _srcIdx = __parseColumnIndex(data, pkName);
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