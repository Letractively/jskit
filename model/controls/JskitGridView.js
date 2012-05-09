/*****************************************************
*
* JskitGridView
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
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
    /*#BEGIN Properties */
    var __totalSize = 1;
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

    var __checkColumnVisiable = false;
    this.setCheckVisiable = function (v) {
        __checkColumnVisiable = (v !== false && v !== 0 && v !== "no");
    };

    var __indexColumnVisiable = false;
    this.setIndexColumnVisiable = function (v) {
        __indexColumnVisiable = (v !== false && v !== 0 && v !== "no");
    };

    var __data = null;
    this.setData = function (v) {
        __data = v;
    };
    this.getData = function (v) {
        return __data;
    };

    var __columns = null;
    //columns data example: [{title:"",feild:"",visiable:true,editable:true,template:"",width:}];
    this.setColumns = function (v) {
        __columns = v;
    };

    var __autoUpdate = false;
    this.setAutoUpdate = function (v) {
        __autoUpdate = (v !== false && v !== 0 && v !== "no");
    };

    var __editable = false;
    this.setEditable = function (v) {
        __editable = (v !== false && v !== 0 && v !== "no");
    };

    var __indexColumnWidth = 20;
    this.setIndexColumnWidth = function (v) {
        __indexColumnWidth = (!isNaN(parseInt(v)) && v > 0) ? v : 20;
    };

    var __checkColumnWidth = 20;
    this.setCheckColumnWidth = function (v) {
        __checkColumnWidth = (!isNaN(parseInt(v)) && v > 0) ? v : 20;
    };

    var __width = 0;
    this.setWidth = function (v) {
        __width = (!isNaN(parseInt(v)) && v > 0) ? v : 0;
    };

    var __pkColumnIndex = null;
    var __pkColumnFeild = null;
    var __queryParams = null;
    var __queryUrl = null;

    var __headCss = "";
    var __footCss = "";
    var __bodyCss = "";
    var __tableCss = "";
    var __pagerCss = "";
    var __loadingCss = "";
    var __canvas = null;
    var __canvasId = null;


    /*#END Properties */

    /*BEGIN Private methods */
    var __countPages = function () {
        return Math.ceil(__totalSize / __pageSize);
    };
    var __attrFilter = function (v) {
        return v.replace(/\"/gi, "");
    };
    var __buildHead = function () {
        var _str = new Array();
        var _c = null;
        //_str.push('<table cellspacing="0" cellpadding="0" border="0">');
        //_str.push('<tr>');
        if (__checkColumnVisiable === true) {
            _str.push('<div style="float:left;width:' + __checkColumnWidth + 'px;overflow:hidden;">&nbsp;</div>');
        }
        if (__indexColumnVisiable == true) {
            _str.push('<div style="float:left;width:' + __indexColumnWidth + 'px;overflow:hidden;">&nbsp;</div>');
        }

        for (var i = 0; i < __columns.length; i++) {
            _c = __columns[i];
            if (_c.visiable !== false) {
                if (!isNaN(parseFloat(_c.width))) {
                    _str.push('<div style="float:left;width:' + parseFloat(_c.width) + 'px;overflow:hidden;" title="' + __attrFilter(_c.title) + '">');
                } else {
                    _str.push('<div>');
                }
                _str.push(_c.title);
                _str.push('</div>');
            }
        }
        //_str.push('</tr>');
        //_str.push('</table>');
        return _str.join('');
    };
    var __buildPager = function () {
        var _pageCount = __countPages();
        var _str = new Array();
        _str.push('<div>Total:' + __totalSize + '</div>');
        for (var i = 1; i <= _pageCount; i++) {
            if (__pageIndex == i) {
                _str.push('<a href="javascript:' + __hd + '.pageChanging(' + i + ')"><div>' + i + '</div></a>');
            } else {
                _str.push('<div>' + i + '</div>');
            }
        }
        return _str.join('');
    };
    var __dataCanvas = null;
    var __pagerCanvas = null;
    var __buildTable = function () {
        var _str = new Array();
        _str.push('<div style="float:none;clear:both;width:' + __width + 'px;overflow:hidden;"  class="' + __attrFilter(__headCss) + '">' + __buildHead() + '</div>');
        var _c = null;
        var _r = null;
        _str.push('<div  style="float:none;clear:both;width:' + __width + 'px" class="' + __attrFilter(__bodyCss) + '" id="' + __hd + '_data_canvas">');
        _str.push('</div>');
        if (__pagerVisiable === true) {
            _str.push('<div class="' + __pagerCss + '" style="float:none;clear:both;width:' + __width + 'px;overflow:hidden;" id="' + __hd + '_pager_canvas">');
            _str.push('</div>');
        }
        _str.push('<div style="clear:both;float:none;"></div>');
        return _str.join('');
    };
    var __parseColumnIndex = function (rColumnName) {
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].feild == rColumnName) { return i; }
        }
        return null;
    };
    var __getDataByColumnName = function (name, rowIndex) {
        var _ci = __parseColumnIndex(name);
        if (_ci != null) {
            return __data[rowIndex][_ci];
        } else {
            return null;
        }
    };
    var __parseColumnTemplate = function (template, rowIndex) {
        var _pattarn = /\{([^\}]*)\}/gi;
        var _arr = t.match(_pattarn);
        if (_arr == null) { return t; }
        var _feild = null;
        for (var i = 0; i < _arr.length; i++) {
            template = template.replace(_arr[i], __getDataByColumnName(_arr[i].replace("{", "").replace("}", "")));
        }
        return template;
    };
    var __dataBind = function () {
        if (__dataCanvas == null) {
            __dataCanvas = $("#" + __hd + "_data_canvas");
            if (__dataCanvas == null) {
                alert("JskitGridView Error: \nData Body not found, maybe create object failed!");
                return;
            }
        }
        var _str = new Array();
        //_str.push('<table cellspacing="0" cellpadding="0" border="0">');
        for (var i = 1; i < __data.length; i++) {
            _r = __data[i];
            _str.push('<div style="clear:both;float:none" id="' + __attrFilter(__getDataByColumnName(__pkColumnFeild, i)) + '">');
            if (__checkColumnVisiable === true) {
                _str.push('<div style="float:left;width:' + __checkColumnWidth + 'px;overflow:hidden;"><input type="checkbox" onclick="' + __hd + '.onSelect(this,event)" /></div>');
            }
            if (__indexColumnVisiable === true) {
                _str.push('<div style="float:left;width:' + __indexColumnWidth + 'px;overflow:hidden;">' + ((__pageIndex - 1) * __pageSize + i) + '</div>');
            }
            for (var j = 0; j < __columns.length; j++) {
                _c = __columns[j];
                if (_c.visiable !== false) {
                    if (_c.template !== "" && _c.template != null) {
                        _str.push('<div style="float:left;width:' + _c.width + 'px;overflow:hidden">' + __parseColumnTemplate(_c.template, i) + '</div>');
                    } else {
                        _str.push('<div style="float:left;width:' + _c.width + 'px;overflow:hidden">' + _r[j] + '</div>');
                    }
                }
            }
            _str.push('</div>');
        }
        __dataCanvas.innerHTML = _str.join('');
        _str = null;
        __flushPager();
    };
    var __flushPager = function () {
        if (__pagerCanvas == null) {
            __pagerCanvas = $("#" + __hd + "_pager_canvas");
            if (__pagerCanvas == null) {
                alert("JskitGridView Error: \nPager box not found, maybe create object failed!");
                return;
            }
        }
        __pagerCanvas.innerHTML = __buildPager();
    };
    var __getQueryUrl = function () {
        if (__queryUrl != null) {
            if (__queryParams != "" && __queryParams != null) {
                var _param = "page=" + __pageIndex + "&pagesize=" + __pageSize + "&" + __queryParams;
                var _url = __queryUrl;
                _url += (_url.indexOf("?") == -1) ? ("?" + _param) : ("&" + _param);
                return _url;
            } else {
                return __queryUrl;
            }
        }
        return null;
    };
    var __loadingBox = null;
    var __showLoading = function () {
        if (__loadingBox == null) {
            __loadingBox = document.createElement("div");
            __loadingBox.style.position = "absolute";
            __loadingBox.className = __loadingCss;
            __loadingBox.style.left = (__canvas.getX() + __canvas.offsetWidth / 2 - __loadingBox.offsetWidth / 2) + "px";
            __loadingBox.style.top = (__canvas.getY() + __canvas.offsetHeight / 2 - __loadingBox.offsetHeight / 2) + "px";
            __loadingBox.innerHTML = "Loading...";
        }
        __loadingBox.style.display = "";
    };
    var __closeLoading = function () {
        if (__loadingBox != null) {
            __loadingBox.style.display = "none";
        }
    };
    var __action = function (type) {
        var _url = null;
        if (type == "load") {
            _url = __getQueryUrl();
            if (_url != null) {
                __showLoading();
                __ajax = JskitXmlHttpAction(_url, __hd + ".__loadCallback", "text");
            } else {
                __dataBind();
            }
        } else if (type == "delete") {
            _url = __getQueryUrl();
            if (_url != null) {
                __showLoading();
                __ajax = JskitXmlHttpAction(_url, __hd + ".__loadCallback", "text");
            } else {
                __dataBind();
            }
        } else if (type == "update") {
        }
    };
    /*END Private methods */

    /*BEGIN Action methods */
    this.deleteRow = function () {

    };
    this.pageChanging = function (newPageIndex) {
        __pageIndex = newPageIndex;
        __action("load");
    };
    /*END Action methods */


    /*BEGIN Public methods */
    var __ajax = null;
    this.load = function () {
        __action("load");
    };
    this.refresh = function () {
        this.load();
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
    this.onPageLoad = function () {
        __canvas = $("#" + __canvasId);
        if (__canvas == null) {
            alert("JskitGridView Error: Cavans not found!");
            return;
        }
        __canvas.innerHTML = __buildTable();
        this.load();
    };
    this.init = function () {
        var json = arguments[0];
        __canvasId = json.canvas;
        this.setPageSize(json.page_size);
        this.setPageIndex(json.page_index);
        __data = json.data;
        __columns = json.columns;
        __headCss = json.css_head;
        __bodyCss = json.css_body;
        __pagerCss = json.css_pager;
        __tableCss = json.css_table;
        this.setPagerVisiable(json.pager_visiable);
        this.setAutoUpdate(json.auto_update);
        this.setEditable(json.editable);
        __queryParams = json.query_params;
        __queryUrl = json.query_url;
        __pkColumnFeild = json.pk;
        this.setIndexColumnWidth(json.index_column_width);
        this.setIndexColumnVisiable(json.index_column_visiable);
        this.setCheckColumnWidth(json.check_column_width);
        this.setCheckVisiable(json.check_column_visiable);
        this.setWidth(json.width);
        jskitEvents.ready("onload", __hd + ".onPageLoad");
    };
    /*END Public methods */


};