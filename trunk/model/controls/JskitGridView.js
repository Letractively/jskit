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

    var __width = 0;
    this.setWidth = function (v) {
        __width = (!isNaN(parseInt(v)) && v > 0) ? v : 0;
    };

    var __pkColumnIndex = null;
    var __pkColumnFeild = null;
    var __queryParams = null;
    var __queryUrl = null;
    var __deleteUrl = null;
    var __updateUrl = null;

    var __tableCss = "";
    var __headCss = "";
    var __footCss = "";
    var __bodyCss = "";
    var __tableCss = "";
    var __pagerCss = "";
    var __loadingCss = "";
    var __canvas = null;
    var __canvasId = null;

    /*#END Properties */

    /*BEGIN Const def */
    var __ENUM = {
        COL_TYPE: { DATA: "data", CHECK: "check", INDEX: "index", EDIT: "edit" },
        ACTION: { D: "d", U: "u", R: "r" }
    };
    var __TXT = {
        CONFIRM: { DEL: "Sure to delete?" },
        PAGE: { F: "|&lt;", P: "&lt;&lt;", N: "&gt;&gt;", L: "&gt;|" }
    };
    /*#END Const def */


    /*BEGIN Private methods */
    var __countPages = function () {
        return Math.ceil(__totalSize / __pageSize);
    };
    var __attrFilter = function (v) {
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
                    _str.push('<td width="' + _c.width + 'px" title="' + __attrFilter(_c.title) + '">');
                } else {
                    _str.push('<td title="' + __attrFilter(_c.title) + '">');
                }
                if (_c.type === __ENUM.COL_TYPE.DATA) {
                    _str.push(_c.title);
                } else if (_c.type === __ENUM.COL_TYPE.CHECK) {
                    _str.push('<input type="checkbox" onclick="' + __hd + '.checkAll(this,event)" />');
                } else {
                    _str.push("&nbsp;");
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
            _str.push('<div>Total:' + __totalSize + '</div>');
            if (__pageIndex == 1) {
                _str.push('<div>' + __TXT.PAGE.F + '</div>');
                _str.push('<div>' + __TXT.PAGE.P + '</div>');
            } else {
                _str.push('<a href="javascript:' + __hd + '.pageChanging(1)"><div>' + __TXT.PAGE.F + '</div></a>');
                _str.push('<a href="javascript:' + __hd + '.pageChanging(' + (i - 1) + ')"><div>' + __TXT.PAGE.P + '</div></a>');
            }
            for (var i = 1; i <= _pageCount; i++) {
                if (__pageIndex != i) {
                    _str.push('<a href="javascript:' + __hd + '.pageChanging(' + i + ')"><div>' + i + '</div></a>');
                } else {
                    _str.push('<div>' + i + '</div>');
                }
            }
            if (__pageIndex == _pageCount) {
                _str.push('<div>' + __TXT.PAGE.N + '</div>');
                _str.push('<div>' + __TXT.PAGE.L + '</div>');
            } else {
                _str.push('<a href="javascript:' + __hd + '.pageChanging(' + _pageCount + ')"><div>' + __TXT.PAGE.N + '</div></a>');
                _str.push('<a href="javascript:' + __hd + '.pageChanging(' + (i + 1) + ')"><div>' + __TXT.PAGE.L + '</div></a>');
            }
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
        _str.push('<tr><td colspan="' + _cols + '"  id="' + __hd + '_pager_canvas"></td></tr>');
        return _str.join('');
    };
    var __dataCanvas = null;
    var __pagerCanvas = null;
    var __buildTable = function () {
        /* TABLE STYLE */
        var _str = new Array();
        if (!isNaN(parseFloat(__width)) && __width > 0) {
            _str.push('<div style="clear:both;float:none;width:' + __width + 'px;overflow:hidden;">');
            _str.push('<table cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">');
            _str.push('<thead class="' + __attrFilter(__headCss) + '">' + __buildHeadContent() + '</thead>');
            _str.push('<tbody class="' + __attrFilter(__bodyCss) + '" id="' + __hd + '_data_canvas"></tbody>');
            _str.push('<tfoot class="' + __attrFilter(__footCss) + '">' + __buildFootContent() + '</tfoot>');
            _str.push('</table>');
            _str.push('</div>');
        } else {
            _str.push('<div style="clear:both;float:none;">');
            _str.push('<table cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">');
            _str.push('<thead class="' + __attrFilter(__headCss) + '">' + __buildHeadContent() + '</thead>');
            _str.push('<tbody class="' + __attrFilter(__bodyCss) + '" id="' + __hd + '_data_canvas"></tbody>');
            _str.push('<tfoot class="' + __attrFilter(__footCss) + '">' + __buildFootContent() + '</tfoot>');
            _str.push('</table>');
            _str.push('</div>');
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
        var _i = 0;
        for (var i = 0; i < __columns.length; i++) {
            if (__columns[i].feild == rColumnName) { return _i; }
            if (__columns[i].type == __ENUM.COL_TYPE.DATA) { _i++; }
        }
        return null;
    };
    var __getDataByColumnName = function (name, rowIndex) {
        try {
            var _ci = __parseColumnIndex(name);
            if (_ci != null) {
                return __data[rowIndex][_ci];
            } else {
                return null;
            }
        } catch (e) {
            //alert("JskitGridView Exception: \n Parse data by column name failed!");
            return null;
        }
    };
    var __parseColumnTemplate = function (template, rowIndex) {
        template = template.replace(/\{a:delete\}/gi, "javascript:" + __hd + ".deleteRow(" + rowIndex + ")");
        template = template.replace(/\{a:edit\}/gi, "javascript:" + __hd + ".editRow(" + rowIndex + ")");
        template = template.replace(/\{e:delete\}/gi, __hd + ".deleteRow(" + rowIndex + ")");
        template = template.replace(/\{e:edit\}/gi, __hd + ".editRow(" + rowIndex + ")");
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
        if (__dataCanvas == null) {
            __dataCanvas = $("#" + __hd + "_data_canvas");
            if (__dataCanvas == null) {
                alert("JskitGridView Error: \nData Body not found, maybe create object failed!");
                return;
            }
        }
        var _str = new Array();
        var _dataColIndex = null;
        for (var i = 1; i < __data.length; i++) {
            _r = __data[i];
            _str.push('<tr id="' + __attrFilter(__getDataByColumnName(__pkColumnFeild, i)) + '">');
            _dataColIndex = 0;
            for (var j = 0; j < __columns.length; j++) {
                _c = __columns[j];
                if (_c.visiable !== false) {
                    _str.push('<td>');
                    if (_c.type == __ENUM.COL_TYPE.DATA) {
                        if (_c.template !== "" && _c.template != null) {
                            _str.push('' + __parseColumnTemplate(_c.template, i) + '');
                        } else {
                            _str.push('' + _r[_dataColIndex] + '');
                        }
                    } else if (_c.type == __ENUM.COL_TYPE.CHECK) {//check
                        _str.push('<div style="padding:0px;maring:0px;width:' + _c.width + 'px;overflow:hidden"><input name="' + __hd + '_checkbox" type="checkbox" idx="' + i + '" onclick="' + __hd + '.selectRow(this,event)" /></div>');
                    } else if (_c.type == __ENUM.COL_TYPE.INDEX) {//index
                        _str.push('<div style="padding:0px;maring:0px;width:' + _c.width + 'px;overflow:hidden">' + ((__pageIndex - 1) * __pageSize + i) + '</div>');
                    } else if (_c.type == __ENUM.COL_TYPE.EDIT) {//edit
                        if (_c.template !== "" && _c.template != null) {
                            _str.push('' + __parseColumnTemplate(_c.template, i) + '');
                        } else {
                            _str.push('<a href="javascript:' + __hd + '.deleteRow(' + i + ')">Delete</a>');
                            _str.push('|');
                            _str.push('<a href="javascript:' + __hd + '.editRow(' + i + ')">Edit</a>');
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
            if (_url != null) {
                __showLoading();
                __ajax = JskitXmlHttpAction(_url, __hd + ".__loadCallback", "text");
            } else {
                __dataBind();
            }
        } else if (type == __ENUM.ACTION.D) {
            _url = __getActionUrl(type, rowIndex);
            if (_url != null) {
                __showLoading("Process...");
                __ajax = JskitXmlHttpAction(_url, __hd + ".__actionCallback", "text");
            } else {
                __dataBind();
            }
        } else if (type == __ENUM.ACTION.U) {
            _url = __getActionUrl(type, rowIndex);
            if (_url != null) {
                __showLoading("Process...");
                __ajax = JskitXmlHttpAction(_url, __hd + ".__actionCallback", "text");
            } else {
                __dataBind();
            }
        }
    };
    /*END Private methods */

    /*BEGIN Action methods */
    this.checkAll = function (sender, e) {
        var _cl = $('@' + __hd + '_checkbox');
        if (_cl != null) {
            for (var i = 0; i < _cl.length; i++) {
                _cl[i].checked = sender.checked;
            }
        }
    };
    this.deleteRow = function (rowIndex) {
        if (confirm(__TXT.CONFIRM.DEL)) {
            //alert("Delete row[pk:" + __getDataByColumnName(__pkColumnFeild, rowIndex) + "]");
            __action(__ENUM.ACTION.D, rowIndex);
        }
    };
    this.editRow = function (rowIndex) {
        alert("Edit row[pk:" + __getDataByColumnName(__pkColumnFeild, rowIndex) + "]");
    };
    this.selectRow = function (sender, e) {
        var idx = sender.getAttribute("idx");
        if (sender.checked) {
            alert("row[" + idx + "] selected!");
        } else {
            alert("row[" + idx + "] unselected!");
        }
    };
    this.pageChanging = function (newPageIndex) {
        __pageIndex = newPageIndex;
        __action(__ENUM.ACTION.R);
    };
    this.deleteRowSelected = function () {

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
        __tableCss = json.css_table;
        __loadingCss = json.css_loading;
        __footCss = json.css_foot;
        __headCss = json.css_head;
        __bodyCss = json.css_body;
        __pagerCss = json.css_pager;
        __tableCss = json.css_table;
        this.setPagerVisiable(json.pager_visiable);
        this.setAutoUpdate(json.auto_update);
        this.setEditable(json.editable);
        __queryParams = json.query_params;
        __queryUrl = json.query_url;
        __deleteUrl = json.delete_url;
        __updateUrl = json.update_url;
        __pkColumnFeild = json.pk;
        this.setWidth(json.width);
        jskitEvents.ready("onload", __hd + ".onPageLoad");
    };
    /*END Public methods */


};