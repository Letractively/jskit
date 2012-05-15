var JskitDocument = function(rHd){
	this.hd = (typeof(rHd)!="string")?"jskitDocument":rHd;

    this.showBaseInfo = function (rData) {

    };
    this.showValues = function (rData) {

    };
    this.__pageLayoutBefore = function () {
        var str = "<table cellspacing='0' cellpadding='0' class=\"top\">";
        if (window.location.href == top.window.location.href) {
            str += "	<tr><td colspan='2' class=\"header\">";
            str += "	<table align='center' width='100%'>";
            str += "		<tr>";
            str += "			<td width='200px' align='center'><font class='logo' >Jskit.org</font></td>";
            str += "			<td align='center' rowspan='2' style='padding-top:0px;height:20px'>";
            str += "				<div style='color:#cccccc;text-align:right;padding-right:20px'>";
            str += "					<a class='jskit_header_link' href='index.html'>About</a>";
            str += "					| <a class='jskit_header_link' href='index.html'>Contact</a>";
            str += "					| <a class='jskit_header_link' href='download.html'>Download</a>";
            str += "					| <a class='jskit_header_link' href='javascript:jskitLog.open()'>Logger</a>";
            str += "				</div>";
            str += "				<div style='color:#ffffff;font-size:30px;'>让有限功能的JavaScript，完成无限多的工作！</div>";
            str += "			</td>";
            str += "		</tr>";
            str += "		<tr>";
            str += "			<td align='center' height='20' style='color:#ffff00;font-size:10px;' valign='top'>V" + jskitBase.version + "</td>";
            str += "		</tr>";
            str += "	</table>";
            str += "	</td></tr>";
        }
        str += "  	<tr>";
        str += "		<td class=\"left\" id=\"page_menu\">";
        str += "		<div style='width:200px;overflow:auto'>";
        str += "		<img style='height:0px;width:200px' border='0' />";
        str += "		" + tree.out("html") + "</td>";
        str += "		<td class=\"right\" id=\"page_container\">";
        str += "		<!--////////////////////////////////////////////-->";
        return str;
    };
    this.__pageLayoutEnd = function () {
        var str = "		<!--////////////////////////////////////////////-->";
        str += "		</div>";
        str += "		</td>";
        str += "	</tr>";
        if (window.location.href == window.location.href) {
            str += "	<tr><td colspan='2' class=\"footer\">" + jskitBase.copyright + "</td></tr>";
        }
        str += "</table>";
        return str;
    };
    this.__pageLayout = function () {
        var _obj = document.createElement("div");
        _obj.innerHTML = this.__pageLayoutBefore() + this.__pageLayoutEnd();
        return _obj;
    };
    this.showIndex = function () {
        var _nl = tree.getNodeList();
        var _arr = new Array();
        for (var i = 0; i < _nl.length; i++) {
            _arr.push(_nl[i].getAttribute("url"));
        }
        _arr = _arr.sort();
        var _str = '<table>';
        for (var i = 0; i < _arr.length; i++) {
            if (_arr[i] && _arr[i].length > 0 && _arr[i].indexOf("/Jskit") != -1) {
                var _text = _arr[i].replace(".html", ".js");
                _text = _text.substring(_text.indexOf("/") + 1);
                _str += '<tr><td height="24"><a href="../' + _arr[i] + '">' + _text + '</td></tr>';
            }
        }
        _str += '</table>';
        document.write(_str);
    };
    this.pageOnLoad = function () {
        var str = this.__pageLayoutBefore() + this.__pageLayoutEnd();
        str = str.replace(/</gi, "&lt;");
        str = str.replace(/>/gi, "&gt;");
        document.write(str);
        return;
        var _body = $("body");
        var _text = _body.innerHTML;
        var _list = _body.childNodes;
        var _nodes = new Array();
        for (var i = 0; i < _list.length; i = i + 1) {
            _nodes.push(_list[i]);
        }
        eval("_body.appendChild(" + this.hd + ".__pageLayout());");
        var _container = $("#page_container");
        if (_nodes != null && _nodes.length > 0) {
            for (var i = 0; i < _nodes.length; i = i + 1) {
                if (!_nodes[i].tagName && typeof (_nodes[i]) == "object") {
                    var _obj = document.createElement("span");
                    _obj.innerHTML = _nodes[i].toString();
                    _container.appendChild(_obj);
                } else {
                    _container.appendChild(_nodes[i]);
                }
            }
        } else {
            var _obj = document.createElement("span");
            _obj.innerHTML = _text;
            _container.appendChild(_obj);
        }
        if (document.title) {
            document.title += "[Jskit V" + jskitBase.version + "]";
        }
    };
};

var jskitDocument = new JskitDocument("jskitDocument");