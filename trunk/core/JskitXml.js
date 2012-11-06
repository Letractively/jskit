/*****************************************************
 *
 * JskitXml
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #refrence  : http://developer.mozilla.org/en/docs/Using_XPath
 *
 ******************************************************/
/* Node types reference. *****************************
 1 ELEMENT_NODE
 2 ATTRIBUTE_NODE
 3 TEXT_NODE
 4 CDATA_SECTION_NODE
 5 ENTITY_REFERENCE_NODE
 6 ENTITY_NODE
 7 PROCESSING_INSTRUCTION_NODE
 8 COMMENT_NODE
 9 DOCUMENT_NODE
 10 DOCUMENT_TYPE_NODE
 11 DOCUMENT_FRAGMENT_NODE
 12 NOTATION_NODE
 ********************************************************/
var jskitXml = new function() {
    var __hd = "jskitXml";
    this.load = function (rSrc) {
        var _dom = null;
        if (document.implementation && document.implementation.createDocument) {
            var req = new XMLHttpRequest();
            req.open("GET", rSrc, false);
            req.send(null);
            _dom = req.responseXML;
        } else {
            if (window.ActiveXObject) {
                var _dom = new ActiveXObject("Microsoft.XMLDOM");
            }
            else {
                alert('Your browser can\'t handle this script');
            }
        }
        _dom.async = false;
        _dom.load(rSrc);
        return _dom;
    };
    this.loadXml = function (rSrc) {
        var _dom = null;
        if (window.ActiveXObject) {//code for IE
            _dom = new ActiveXObject("Microsoft.XMLDOM");
            _dom.async = "false";
            _dom.loadXML(rSrc);
        }
        else {// code for Mozilla, Firefox, Opera, etc.
            var parser = new DOMParser();
            _dom = parser.parseFromString(rSrc, "text/xml");
            dump(_dom.documentElement.nodeName == "parsererror" ? "error while parsing" : _dom.documentElement.nodeName);
        }
        return _dom;
    };
    this.childNodeText = function (parent, childTagName, defaultValue) {
        var _n = parent.selectSingleNode(childTagName);
        if (typeof (defaultValue) != "string") { defaultValue = ""; }
        if (_n != null) {
            return _n.text;
        } else {
            return defaultValue;
        }
    };
    //BEGIN! convert xml to json
    var __parseXmlNode2Json = function (node) {
        var str = new Array();
        var nl = null;
        try {
            nl = node.childNodes;
        } catch (e) { return ""; }
        if (node.nodeType != 1) {
            return ('"":"' + node.text + '"');
        } else if (nl.length > 1) {
            for (var i = 0; i < nl.length; i++) {
                str.push(__parseXmlNode2Json(nl[i]));
            }
            return '"' + node.nodeName + '":{' + str.join(',') + '}';
        } else if (nl.length == 1) {
            if (nl[0].nodeType == 1) {
                str.push('"' + nl[0].nodeName + '":"' + nl[0].text + '"');
            } else {
                str.push('"' + node.nodeName + '":"' + node.text + '"');
            }
            return str.join(',');
        } else if (nl.length == 0) {
            str.push('"' + node.nodeName + '":""');
            return str.join(',');
        }
    };
    this.root2Json = function (root, hasRoot) {
        eval("var _jsonWithRoot = {" + __parseXmlNode2Json(root) + "};");
        if (hasRoot) {
            return _jsonWithRoot;
        } else {
            eval("var _jsonNoRoot = _jsonWithRoot." + root.nodeName + ";");
            return _jsonNoRoot;
        }
    };
    this.doc2Json = function (doc, hasRoot) {
        var root = doc.documentElement;
        return this.root2Json(root, hasRoot);
    };
    //END!
};