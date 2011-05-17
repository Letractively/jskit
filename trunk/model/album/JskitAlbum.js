/****************************************************************************
 *
 * JskitAlbum
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ****************************************************************************/
var JskitAlbum = function(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitAlbum";
    var __snapBorder = "4px solid #dddddd";
    var __snapSelectedBorder = "4px solid #ff5500";
    var __groups = new Array();
    //使用JskitTable
     var __jt = null;
  
    var __title = "Jskit相册V0.1";
    var __container = null;

    var __snapPath = "";
    var __picsPath = "";

    var __canvas = null;
    var __canvasId = jskitUtil.guid();
    var __canvasCssClass = "";

    //pics list in group
    var __canvasList = null;
    var __canvasListId = jskitUtil.guid();
    var __listCssClass = "";
    var __groupTitleCssClass = "";

    //album title bar
    var __canvasTitle = null;
    var __canvasTitleId = jskitUtil.guid();
    var __titleCssClass = "";

    //big pic
    var __canvasDetails = null;
    var __canvasDetailsId = jskitUtil.guid();
    var __detailsCssClass = "";

    //album footer
    var __canvasFooter = null;
    var __canvasFooterId = jskitUtil.guid();
    var __footerCssClass = "";

    var __listPageSize = 1;

    var __PIC = function() {
        this.pk = "";
        this.title = "";
        this.width = -1;
        this.height = -1;
        this.src = "";
        this.datetime = "";
        this.groupIdex = -1;
        this.weight = -1;
    };
    var __GROUP = function() {
        this.title = "";
        this.pics = new Array();
        this.lock = 0;//0 public ,1 secret
        this.password = "";
        this.coverIdx = 0;
    };

    var __listCols = 3;
    var __selectedItem = null;
    var __showPic = function(sender, e, rGIdx, rIdx) {
        var _pics = __groups[rGIdx].pics;
        if (typeof(_pics.length) != "number" || _pics.length < 1) {
            return;
        }
        var _pic = _pics[rIdx];
        __resetSnapSelected(_pic);
        var _title = _pic.title + '(' + (rIdx + 1) + '/' + _pics.length + ')';
        var _str = _title + '<br/>';
        _str += '<img border="0" onload="'+__hd+'.fixPic(this,event)" src="' + __picsPath + _pic.src + '" />';
        _str += '<br/>' + _title;
        __canvasDetails.innerHTML = _str;
        _str = null;
    };
    var __resetSnapSelected = function(rPic) {
        var _img = $("#snap_" + rPic.pk);
        if (__selectedItem != null) {
            __selectedItem.style.border = __snapBorder;
        }
        __selectedItem = _img;
        __selectedItem.style.border = __snapSelectedBorder;
    };
    var __initCanvas = function() {
        if ($("body") == null) {
            alert("JskitAlbum : error : body not ready");
            return;
        }
        if (__canvas == null) {
            __canvas = document.createElement("div");
            if (__container != null) {
                __container.appendChild(__canvas);
            } else {
                $("body").appendChild(__canvas);
            }
        }
        __canvas.setAttribute("id", __canvasId);
        __canvas.className = __canvasCssClass;

        __canvasTitle = document.createElement("div");
        __canvas.appendChild(__canvasTitle);
        __canvasTitle.setAttribute("id", __canvasTitleId);
        __canvasTitle.className = __titleCssClass;

        __canvasList = document.createElement("div");
        __canvas.appendChild(__canvasList);
        __canvasList.setAttribute("id", __canvasListId);
        __canvasList.className = __listCssClass;
        __canvasList.style.width = __canvasList.offsetWidth;

        __canvasDetails = document.createElement("div");
        __canvas.appendChild(__canvasDetails);
        __canvasDetails.setAttribute("id", __canvasDetailsId);
        __canvasDetails.className = __detailsCssClass;
        __canvasDetails.style.width = __canvasDetails.offsetWidth;


        __canvasFooter = document.createElement("div");
        __canvas.appendChild(__canvasFooter);
        __canvasFooter.setAttribute("id", __canvasFooterId);
        __canvasFooter.className = __footerCssClass;
        __canvasFooter.innerHTML = "Jskit Album V0.1(c)mending.cn 2009,By AnyRock";

    };

    var __addPic = function(rGroupIndex, rPic) {
        if (typeof(__groups) != "object")return;
        if (__groups.length < 1)return;
        __groups[rGroupIndex].pics.push(rPic);
    };
    var __display = function() {
        __drawIndex();
        //__showSnapListHtml();
    };
    var __drawIndex = function() {
        if (typeof(__jt) != "object" || __jt.constructor != JskitTable) {
            alert("JskitAlbum : error : JskitTable not found!");
            return;
        }
        __jt.setEmptyColumns(6);
        __jt.clear();
        var _pics;
        var _src;
        var _title;
        for (var i = 0; i < __groups.length; i++) {
            _pics = __groups[i].pics;
            if (_pics.length > 0) {
                _src = __snapPath + __groups[i].pics[0].src;
                _title = __groups[i].title;
                __jt.appendContent('<img src="' + _src + '" width="60" height="60" border="0" onload="'+__hd+'.fixPic(this,event)" onclick="' + __hd + '.showGroup(this,event,' + i + ')" /><br/>' + _title + '<br/>(' + _pics.length + ')');
            } else {
                __jt.appendContent('<img src="images/empty.jpg" width="60" height="60" border="0" /><br/>' + _title);
            }
        }
        _pics = _src = _title = null;
        __canvasDetails.innerHTML = __jt.getTableHtml(false);
        __canvasList.style.display = "none";
        __canvasTitle.innerHTML = __title + " 请选择相册点击进入";
    };
    var __clear = function(){
        __groups = null;
        __groups = new Array();
    };
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    this.addPic = function(rGroupIndex, rTitle, rSrc) {
        if (typeof(rTitle) == "string" && typeof(rSrc) == "string") {
            var _pic = new __PIC();
            _pic.title = rTitle;
            _pic.src = rSrc;
            _pic.pk = jskitUtil.guid();
            __addPic(rGroupIndex, _pic);
        } else {
            alert("JskitAlbum : addPic : invalid param");
        }
    };
    this.setSnapPath = function(v) {
        if (typeof(v) == "string") {
            if (v.lastIndexOf("/") != (v.length - 1)) {
                v += "/";
            }
            __snapPath = v;
        }
    };
    this.setPicsPath = function(v) {
        if (typeof(v) == "string") {
            if (v.lastIndexOf("/") != (v.length - 1)) {
                v += "/";
            }
            __picsPath = v;
        }
    };
    this.getConvas = function(){
        return __canvas;
    };
    this.setContainer = function(v) {
        __container = (typeof(v) == "object" && v.tagName) ? v : null;
    };
    this.setCanvasCssClass = function(rClassName) {
        __canvasCssClass = rClassName;
        if (__canvas != null) {
            __canvas.className = __canvasCssClass;
        }
    };
    this.setTitleCssClass = function(rClassName) {
        __titleCssClass = rClassName;
        if (__canvasTitle != null) {
            __canvasTitle.className = __titleCssClass;
        }
    };
    this.setListCssClass = function(rClassName) {
        __listCssClass = rClassName;
        if (__canvasList != null) {
            __canvasList.className = __listCssClass;
        }
    };
    this.setDetailsCssClass = function(rClassName) {
        __detailsCssClass = rClassName;
        if (__canvasDetails != null) {
            __canvasDetails.className = __detailsCssClass;
        }
    };
    this.setGroupTitleCssClass = function(v) {
        __groupTitleCssClass = (typeof(v) == "string") ? v : "";
    };
    this.setFooterCssClass = function(v) {
        __footerCssClass = (typeof(v) == "string") ? v : "";
        if (__canvasFooter != null) {
            __canvasFooter.className = __footerCssClass;
        }
    };
    /*
     * 装在数组格式的数据
     * 参数顺序：title,src,width,height,weight,datetime
     */
    this.setCanvas = function(rObj) {
        if (rObj != null && rObj.tagName != "undefined" && typeof(rObj) == "object") {
            __canvas = rObj;
        } else {
            alert("JskitAlbum : setCanvas : invalid param");
        }
    };
    this.setListCols = function(rCols) {
        if (typeof(rCols) == "number") {
            rCols = parseInt(rCols);
            __listCols = rCols;
        } else {
            alert("JskitAlbum : setListCols : invalid param");
        }
    };
    this.showPic = function(sender, e, rGIdx, rIdx) {
        __showPic(sender, e, rGIdx, rIdx);
    };
    this.showGroup = function(sender, e, rIdx) {
        var _str = new Array();
        var _pics = __groups[rIdx].pics;
        var _pic;
        var _pageSize =
        _str.push('<table align="center">');
        _str.push('<tr>');
        for (var i = 0; i < _pics.length; i++) {
            _pic = _pics[i];
            _str.push('<td>');
            _str.push('<img src="' + __snapPath + _pic.src + '" id="snap_' + _pic.pk + '" style="border:'+__snapBorder+'" width="60" height="60" onclick="' + __hd + '.showPic(this,event,' + rIdx + ',' + i + ')" border="0" alt="' + _pic.title + '" />');
            _str.push('</td>');
        }
        _str.push('</tr>');
        _str.push('</table>');
        __canvasDetails.innerHTML = "";

        __canvasList.innerHTML = _str.join('');
        __canvasList.style.display = "block";

        __canvasTitle.style.display = "block";
        __canvasTitle.innerHTML = '<a href="javascript:' + __hd + '.drawIndex()">INDEX(封面)</a>\\' + __groups[rIdx].title;

        __showPic(null, null, rIdx, 0);
        _str = _pics = _pic = null;
    };
    this.load = function(rArr, rTitle) {
        if (rArr != null && typeof(rArr) == "object" && typeof(rArr.length) == "number") {
            if (typeof(rTitle) != "string") {
                rTitle = "";
            }
            var _group = new __GROUP();
            _group.title = rTitle;
            for (var i = 0; i < rArr.length; i++) {
                var _pic = new __PIC();
                _pic.pk = jskitUtil.guid();
                _pic.title = rArr[i][0];
                _pic.src = rArr[i][1];
                _group.pics.push(_pic);
            }
            __groups.push(_group);
        } else {
            alert("JskitAlbum : load : invalid pic array");
        }
    };
    this.fixPic = function(sender,e) {
        var pw = sender.offsetWidth;
        var ph = sender.offsetHeight;
        var cw;
        cw = sender.parentNode.offsetWidth - 40;
        var ch = sender.parentNode.offsetHeight - 40;
        var w = 0,h = 0;
        window.status = "pw=" + pw + ";ph=" + ph + ";cw=" + cw + ";ch=" + ch + ";";
        if ((pw / ph) > (cw / ch)) {//h
            w = sender.style.width = (pw > cw) ? cw : pw;
        } else {
            h = sender.style.heght = (ph > ch) ? ch : ph;
        }
        window.status += "w=" + w + ";h=" + h;
        pw = ph = cw = ch = w = h = null;
    };
    this.loadJskitTable = function(rJt) {
        if (typeof(rJt) != "object" || rJt.constructor != JskitTable) {
            alert("JskitAlbum : load : invalid JskitTable!");
            return;
        }
        __jt = rJt;
    };
    this.deploy = function(){
        __initCanvas();
        __display();
    };
    this.clear = function(){
        __clear();
    };
    this.display = function() {
        __drawIndex();
    };
    this.drawIndex = function(){
        __drawIndex();
    };
};