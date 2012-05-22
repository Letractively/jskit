/*****************************************************
 *
 * JskitTree
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : core/*;
 *
 ******************************************************/
var JskitTree = function(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitTree";

    //#Begin Private properties
    var __path = "/";

    var __prefixText = "·";
    var __openPrefix = "6";
    var __closePrefix = "4";
	var __target = "_self";

    var __root = document.createElement("div");
    __root.setAttribute("id", jskitUtil.guid());

    var __selectedNode = null;
    //#End

    //#Begin Private methods
    var __findNodeByUrl = function() {
        var _localUrl = window.location.href.toLowerCase();
        var _nodes = __root.getElementsByTagName("div");
        for (var i = 0; i < _nodes.length; i++) {
            var _url = _nodes[i].getAttribute("url");
            if (typeof(_url) == "string" && _url.length > 0 && _localUrl.indexOf("/" + _url.toLowerCase()) != -1) {
                var _node = _nodes[i];
                __select(_node);
                var _level = _node.getAttribute("level").toString();
                while (typeof(_level) == "string" && _level != "0") {
                    _level = _node.getAttribute("level").toString();
                    var _brothers = _node.parentNode.childNodes;
                    for (var i = 1; i < _brothers.length; i++) {
                        _brothers[i].style.display = "block";
                    }
                    _node = _node.parentNode;
                }
                _level = _node = null;
                return;
            }
        }
        _nodes = _localUrl = null;
    };
    var __select = function(rNode) {
        if (typeof(rNode) != "object") {
            return;
        }
        if (__selectedNode == null || __selectedNode.id != rNode.id) {
            if (rNode.childNodes[0].className.indexOf("_active") == -1) {
                rNode.childNodes[0].className += "_active";
            }
            if (__selectedNode != null) {
                __selectedNode.childNodes[0].className = __selectedNode.childNodes[0].className.replace("_active", "");
            }
            __selectedNode = rNode;
        }
    };
    //#End

    //#Begin Public methods
    this.setPrefixText = function(v) {
        __prefixText = (typeof(v) == "string") ? v : "·";
    };
    this.setOpenPrefix = function(v) {
        __openPrefix = (typeof(v) == "string") ? v : "6";
    };
    this.setClosePrefix = function(v) {
        __closePrefix = (typeof(v) == "string") ? v : "4";
    };
    this.setPath = function(v) {
        __path = (typeof(v) == "string") ? v : "/";
        if (__path.substr(__path.length - 1) != "/")__path += "/";
    };
	this.setTarget = function(v){
		__target = v;
	};
    this.getNodeList = function() {
        return __root.getElementsByTagName("div");
    };
    this.nodeClick = function(rNodeId) {
        var _node = $$("#" + rNodeId);
        var _level = _node.getAttribute("level");
        var _childNodes = _node.childNodes;
        var isLeaf = (_childNodes.length < 2);
        var _display;
        if (_node.getAttribute("open") == "true") {
            _display = "none";
            _node.setAttribute("open", "false");
        } else {
            _display = "block";
            _node.setAttribute("open", "true");
        }
        for (var i = 1; i < _childNodes.length; i++) {
            _childNodes[i].style.display = _display;
        }
        __select(_node);
        _childNodes = _level = _node = null;
    };
    this.baseUrl = function() {
        var _url = window.location.href;
        _url = _url.substring(0, _url.indexOf("/doc/"));
        return _url + "/doc/";
    };
    this.newNode = function(rParent, rOpen, rText, rUrl, rTarget, rCssClass) {
        var _node = document.createElement("div");
        _node.id = jskitUtil.guid();
        _node.className = rCssClass;
        _node.setAttribute("root", __root.getAttribute("id"));
        _node.setAttribute("url", rUrl);
		
		if(typeof(rTarget)=="string"){
	        _node.setAttribute("target", rTarget);
		}else{
		    _node.setAttribute("target", __target);
		}
        if (rParent != null && typeof(rParent) == "object") {
            var _level = parseInt(rParent.getAttribute("level")) + 1;
            var _display = (rParent.getAttribute("open") == "true") ? "block" : "none";
            var _open = (typeof(rOpen) == "boolean") ? rOpen : true;
            _node.setAttribute("open", _open.toString());
            _node.style.display = _display;
            _node.setAttribute("level", _level);
            rParent.appendChild(_node);
            var _base = this.baseUrl();
            if(rParent.childNodes[0].getAttribute("type")=="textNode"){
                rParent.childNodes[0].childNodes[0].src = _base+"images/folder.gif";
            }
            //rParent.childNodes[0].childNodes[0].src = _base+"images/folder.gif";
            var _str = '<div type="textNode" class="l' + _level + '_JskitTreeNodeText" onclick="' + __hd + '.nodeClick(\'' + _node.id + '\');">';
			_str += '<img src="' + _base + 'images/file.gif" border="0" align="absmiddle" />';
			if(_node.getAttribute("url")=="" || _node.getAttribute("url")=="#"){
				_str += rText;
			}else{
				_str += '<a href="'+__path + _node.getAttribute("url")+'" target="'+_node.getAttribute("target")+'">' + rText + '</a>';
			}
			_str += '</div>';
			_node.innerHTML = _str;
        } else {
            _node.setAttribute("level", 0);
            _node.setAttribute("open", "true");
            _node.style.display = "block";
            __root.appendChild(_node);
        }
        return _node;
    };
    this.getContent = function () {
        __findNodeByUrl();
        if (typeof (__root) == "object") {
            return __root.innerHTML;
        }
        return "";
    };
    this.out = function (rTarget) {
        __findNodeByUrl();
        if (arguments.length === 0) {
            document.write(this.getContent());
        } else {
            if ($t.isString(rTarget) && $$("#" + rTarget) !== null) {
                $$("#" + rTarget).innerHTML = this.getContent();
            } else if ($t.isHTMLElement(rTarget)) {
                rTarget.innerHTML = this.getContent();
            }
        }
    };
    //#End
};