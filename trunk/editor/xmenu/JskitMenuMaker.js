/*****************************************************
 *
 * JskitMenuMaker
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *            : page/JskitMenu.js
 *
 ******************************************************/
function JskitMenuMaker(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitMenuMaker";
    var __jm = null;
    var __selectedItem = null;
    var __content = null;

    var __CFG_DYNAMIC = jskitUtil.guid();

    var __toolbar = null;
    var __panel = null;
    var __canvas = null;
    var __status = null;

    var __setItemStyle = function() {
        if (__selectedItem == null)return;
        __selectedItem.className = "jmm_menu_item_selected";
    };
    var __resetItemStyle = function() {
        if (__selectedItem == null)return;
        __selectedItem.className = "jmm_menu_item";
    };
    var __appendToolbar = function() {
        __toolbar = document.createElement("div");
        __toolbar.setAttribute("id", jskitUtil.guid());
        __toolbar.className = "jmm_toolbar";
        var _html = new Array();
        _html.push('<table cellspacing="0" cellpadding="0">');
        _html.push('<tr>');
        _html.push('<td>');
        _html.push('<button class="jmm_toolbar_btn_list" action="list" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_config" action="config" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_add" action="add" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td width="10">');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_edit_off" id="btn_edit" action="edit" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_move_off" id="btn_move" action="move" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_moveup_off" id="btn_moveUp" action="moveUp" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_movedown_off" id="btn_moveDown" action="moveDown" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_delete_off" id="btn_delete" action="delete" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td width="10">');
        _html.push('</td><td width="10">');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_xml" action="code" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_js" action="jscode" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('<button class="jmm_toolbar_btn_html" action="htmlcode" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td><td>');
        _html.push('</td><td width="10">');
        _html.push('</td><td width="10">');
        _html.push('<button class="jmm_toolbar_btn_view" action="view" onclick="' + __hd + '.action(this)"></button>');
        _html.push('</td>');
        _html.push('</tr>');
        _html.push('</table>');
        __toolbar.innerHTML = _html.join('');
        _html = null;
        __panel.appendChild(__toolbar);
    };
    var __appendStatusBar = function() {
        __status = document.createElement("div");
        __status.setAttribute("id", jskitUtil.guid());
        __status.className = "jmm_status";
        __status.innerHTML = "X-Menu&copy;2008 Jskit.org";
        __panel.appendChild(__status);
    };
    var __appendCavas = function() {
        __canvas = document.createElement("div");
        __canvas.setAttribute("id", jskitUtil.guid());
        __canvas.className = "jmm_cavas";
        __panel.appendChild(__canvas);
    };
    var __getSelectedId = function() {
        var _id = null;
        if (__selectedItem != null && __selectedItem.parentNode != null)
            _id = __selectedItem.parentNode.getAttribute("id");
        else
            _id = "";
        return _id;
    };
    var __getNodeDdl = function(rNodeId) {
        var _nl = __jm.nodeList();
        var _s = new Array();
        var _id,_caption,_level,_selected;
        var _mark = "......................";
        _s.push('<option value="">Root</option>');
        for (var i = 0; i < _nl.length; i++) {
            _id = _nl[i].getAttribute("id");
            _caption = _nl[i].childNodes[0].nodeValue;
            _level = _nl[i].getAttribute("level");
            _selected = (rNodeId == _id) ? "selected" : "";
            _s.push('<option value="' + _id + '" ' + _selected + '>' + _mark.substr(0, _level * 2) + _caption + '</option>');
        }
        _id = _caption = _level = _selected = null;
        return _s.join('');
    };
    var __getNumberValueDdl = function(rValue, rTag) {
        var _html = '';
        for (var i = 1; i < rTag.length; i++) {
            if (i == rValue)
                _html += '<option value="' + i + '" selected>' + rTag[i] + '</option>';
            else
                _html += '<option value="' + i + '">' + rTag[i] + '</option>';
        }
        return _html;
    };
    var __getTargetDdl = function(rValue) {
        var _html = '<option value="_self">_self</option><option value="_blank">_blank</option><option value="_top">_top</option><option value="_parent">_parent</option><option value="_opener">_opener</option>';
        _html = _html.replace(rValue + '"', rValue + '" selected');
        return _html;
    };
    var __getDynamicDdl = function(rValue) {
        var _html = '<option value="false">Static</option><option value="true">Dynamic</option>';
        _html = _html.replace(rValue + '"', rValue + '" selected');
        return _html;
    };
    var __getFormPanelContent = function(rType) {
        var _id = (rType == "add") ? "" : __getSelectedId();
        var _node = __item2Node(__selectedItem);
        var _parentId = (_node == null) ? "" : _node.parentNode.getAttribute("id");
        var _caption = (_node == null) ? "" : _node.childNodes[0].nodeValue;
        var _url = (_node == null) ? "" : _node.getAttribute("url");
        var _target = (_node == null) ? "" : _node.getAttribute("target");
        var _cssClass = (_node == null) ? "" : _node.getAttribute("class");
        var _direction = (_node == null) ? 1 : parseInt(_node.getAttribute("direction"));
        var _location = (_node == null) ? 3 : parseInt(_node.getAttribute("location"));

        var _html = new Array();
        _html.push('<table class="jmm_form_table">');
        _html.push('<tr><td><input type="hidden" id="_form_id" value="' + _id + '" /></td></tr>');
        _html.push('<tr><td colspan="2" valign="bottom" style="height:20px;font-weight:bold;color:#ff5500;">Node attributes:</td></tr>');
        _html.push('<tr><td align="right">Parent:</td><td><select id="_form_parent">' + __getNodeDdl(_parentId) + '</select></td></tr>');
        _html.push('<tr><td align="right">Caption:</td><td><input type="text" id="_form_caption" value="' + _caption + '" />*</td></tr>');
        _html.push('<tr><td align="right">Url:</td><td><input type="text" id="_form_url" value="' + _url + '" size="50" /></td></tr>');
        _html.push('<tr><td align="right">Target:</td><td><select id="_form_target">' + __getTargetDdl(_target) + '</select></td></tr>');
        _html.push('<tr><td align="right">CssClass:</td><td><input type="text" id="_form_cssClass"  value="' + _cssClass + '" /></td></tr>');
        _html.push('<tr><td colspan="2" valign="bottom" style="height:30px;font-weight:bold;color:#ff5500;">Sub node attributes:</td></tr>');
        _html.push('<tr><td align="right">Direction:</td><td><select id="_form_direction">' + __getNumberValueDdl(_direction, new Array("", "Horizonal", "Vertical")) + '</select></td></tr>');
        _html.push('<tr><td align="right">Location:</td><td><select id="_form_location">' + __getNumberValueDdl(_location, new Array("", "Up", "Right", "Down", "Left")) + '</select></td></tr>');
        _html.push('<tr><td colspan="2" valign="bottom" style="height:30px;"><button onclick="' + __hd + '.doUpdate()">Update</button>&nbsp;&nbsp;<button onclick="' + __hd + '.refreshCanvas()">Cancel</button></td></tr>');
        _html.push('</table>');

        _id = _node = _parentId = _caption = _url = _target = _cssClass = _direction = _location = null;
        return _html.join('');
    };
    var __appendAddPanel = function() {
        __canvas.innerHTML = __getFormPanelContent("add");
    };
    var __appendEditPanel = function() {
        __canvas.innerHTML = __getFormPanelContent("edit");
    };
    var __appendMovePanel = function() {
        var _html = new Array();
        _html.push('<table>');
        _html.push('<tr><td><input type="hidden" id="_form_id" value="' + __getSelectedId() + '" /></td></tr>');
        _html.push('<tr><td>Move to:</td><td><select id="_form_parent">' + __getNodeDdl() + '</select></td></tr>');
        _html.push('<tr><td colspan="2"><button onclick="' + __hd + '.doMove()">Move</button>&nbsp;&nbsp;<button onclick="' + __hd + '.refreshCanvas()">Cancel</button></td></tr>');
        _html.push('</table>');
        __canvas.innerHTML = _html.join('');
        _html = null;
    };
    var __appendConfigPanel = function() {
        var _root = __jm.getRoot();
        var _dynamic = jskitUtil.select(_root.getAttribute("dynamic"), "false", "true");
        var _html = new Array();
        _html.push('<table>');
        _html.push('<tr><td>Performance:</td><td><select id="' + __CFG_DYNAMIC + '" >' + __getDynamicDdl(_dynamic) + '</select></td></tr>');
        _html.push('<tr><td height="20"></td><tr>');
        _html.push('<tr><td colspan="2"><button onclick="' + __hd + '.doSaveConfig()">Save</button>&nbsp;&nbsp;<button onclick="' + __hd + '.refreshCanvas()">Cancel</button></td></tr>');
        _html.push('</table>');
        __canvas.innerHTML = _html.join('');
        _html = _root = _dynamic = null;
    };
    var __createPanel = function() {
        __panel = document.createElement("div");
        __panel.setAttribute("id", jskitUtil.guid());
        __panel.className = "jmm_panel";
        __appendToolbar();
        __appendCavas();
        __appendStatusBar();
        $$("body").appendChild(__panel);
        _html = null;
    };

    var __refreshList = function() {
        var _selectId = __getSelectedId();
        jskitLog.debug(__hd + ".__refreshList:_selectId=" + _selectId);
        __unSelect();
        __content = __jm.getRoot().xml;
        __content = __content.replace(/<root/gi, '<div class="jmm_menu"');
        __content = __content.replace(/<\/root>/gi, '</div>');
        __content = __content.replace(/<!\[CDATA\[\]\]>/gi, "");
        __content = __content.replace(/<!\[CDATA\[/g, '<span class="jmm_menu_item" onclick="' + __hd + '.select(this)" >');
        __content = __content.replace(/\]\]>/gi, "</span>");
        __canvas.innerHTML = __content;
        __reSelect(_selectId);
    };
    var __setLevel = function(rNode) {
        var _level = 0;
        var _node = rNode;
        while (_node.parentNode != null && _node.tagName != "root") {
            _node = _node.parentNode;
            _level++;
        }
        rNode.setAttribute("level", _level);
        _node = _level = null;
    };
    var __signLevel = function() {
        var _nl = __jm.nodeList();
        for (var i = 0; i < _nl.length; i++) {
            __setLevel(_nl[i]);
        }
    };
    var __item2Node = function(rItem) {
        if (rItem != null && rItem.parentNode != null) {
            var _id = rItem.parentNode.getAttribute("id");
            return __jm.getNodeById(_id);
        } else
            return null;
    };
    /*--------------------------------------*/
    var __btn_code = function() {
        __unSelect();
        var _code = __jm.getRoot().xml;
        _code = _code.replace(/</g, "&lt;");
        _code = _code.replace(/>/g, "&gt;");
        __canvas.innerHTML = _code;
    };
    var __btn_htmlcode = function() {
        __unSelect();
        var _code = __jm.getMenuHtmlCode();
        _code = _code.replace(/<span class[^>]*>/gi, "");
        _code = _code.replace(/<\/span[^>]*>/gi, "");
        _code = _code.replace(/</g, "&lt;");
        _code = _code.replace(/>/g, "&gt;");
        __canvas.innerHTML = _code;
    };
    var __btn_view = function() {
        __unSelect();
        var _code = __jm.getMenuHtmlCode();
        _code = _code.replace(/<span class[^>]*>/gi, '');
        _code = _code.replace(/<\/span[^>]*>/gi, '');
        __canvas.innerHTML = _code;
    };
    var __btn_jscode = function() {
        __unSelect();
        var _js = new Array();
        var _nl = __jm.nodeList();
        var _root = __jm.getRoot();
        var _rootId = _root.getAttribute("id");
        var _dynamic = _root.getAttribute("dynamic");
        _js.push("var myJskitMenu = new JskitMenu(\"myJskitMenu\");");
        var _id,_url,_target,_cssClass,_direction,_location,_nodeName,_parentId,_parentNodeName,_caption;
        var _parents = new Array();
        for (var i = 0; i < _nl.length; i++) {
            _id = _nl[i].getAttribute("id");
            _url = _nl[i].getAttribute("url");
            _target = _nl[i].getAttribute("target");
            _cssClass = _nl[i].getAttribute("css");
            _direction = _nl[i].getAttribute("direction");
            _location = _nl[i].getAttribute("location");
            _nodeName = "n" + i;
            _parentId = _nl[i].parentNode.getAttribute("id");
            _parents[_id] = _nodeName;
            _parentNodeName = _parents[_parentId];
            if(_parentNodeName=="undefined" || _parentNodeName==null){
                _parentNodeName = "null";
            };
            _caption = _nl[i].childNodes[0].nodeValue;
            if (_parentId == _rootId)_parentId = "null";
            _js.push('<br>var ' + _nodeName + ' = myJskitMenu.add(' +_parentNodeName + ',"' + _caption + '","' + _url + '","' + _target + '","' + _cssClass + '",' + _direction + ',' + _location + ');');
        }
        if (_dynamic == "true")
            _js.push("<br>myJskitMenu.setDynamic(" + _dynamic + ");");
        _id = _url = _target = _cssClass = _direction = _location = _nodeName = _parentId =_parentNodeName= _caption = null;
        _parents = null;
        __canvas.innerHTML = _js.join('');
        _js = null;
    };
    var __btn_list = function() {
        __refreshList();
    };
    var __btn_add = function() {
        //__unSelect();
        __appendAddPanel();
    };
    var __btn_edit = function() {
        if (__selectedItem == null)return;
        __appendEditPanel();
    };
    var __btn_delete = function() {
        if (__selectedItem == null)return;
        if(confirm("Sure to delete?")){
            __deleteNode();
        }
    };
    var __btn_move = function() {
        __appendMovePanel();
    };
    var __btn_moveUp = function() {
        var _node = __item2Node(__selectedItem);
        if (_node == null)return;
        if (_node.parentNode.childNodes.length > 2) {
            var _pnode = _node.previousSibling;
            if (_pnode == null || _pnode.nodeType != 1) {
                return;
            }
            _node.parentNode.insertBefore(_node, _pnode);
            _pnode = null;
        }
        _node = null;
        __refreshList();
    };
    var __btn_moveDown = function() {
        var _node = __item2Node(__selectedItem);
        if (_node == null)return;
        if (_node.parentNode.childNodes.length > 2) {
            var _nnode = _node.nextSibling;
            if (_nnode == null || _nnode.nodeType != 1) {
                return;
            }
            _node.parentNode.insertBefore(_nnode, _node);
            _nnode = null;
        }
        _node = null;
        __refreshList();
    };
    var __btn_config = function() {
        __unSelect();
        __appendConfigPanel();
    };
    var __deleteNode = function() {
        if (confirm("Sure to delete?")) {
            var _node = __item2Node(__selectedItem);
            if (_node != null) {
                _node.parentNode.removeChild(_node);
                __refreshList();
            }
            _node = null;
        }
    };
    var __convertText = function(v) {
        v = v.trim();
        v = v.replace(/&/gi, "&amp;");
        return v;
    };
    var __unSelect = function() {
        __selectedItem = null;
        var _keys = new Array("edit", "move", "moveUp", "moveDown", "delete");
        var _obj;
        for (var i = 0; i < _keys.length; i++) {
            eval("_obj = $$(\"#btn_" + _keys[i] + "\");");
            _obj.disabled = true;
            _obj.className = "jmm_toolbar_btn_" + _keys[i] + "_off";
        }
        _obj = _keys = null;
    };
    var __reSelect = function(rNodeId) {
        jskitLog.debug(__hd + ".__reSelect:_selectId=" + rNodeId);
        try {
            var _node = $$("#" + rNodeId).childNodes[0];
            __select(_node);
        } catch(e) {
            jskitLog.debug(__hd + ".__reSelect:e=" + e.message);
            //alert(e.message);
        }
    };
    this.unSelect = function() {
        __unSelect();
    };

    var __select = function(rObj) {
        if (rObj.tagName.toLowerCase() == "span") {
            if (__selectedItem != null) {
                __resetItemStyle();
            }
            __selectedItem = rObj;
            jskitLog.debug(__hd + ".__select:__selectedItem=" + rObj);
            __setItemStyle();
            var _keys = new Array("edit", "move", "moveUp", "moveDown", "delete");
            var _obj;
            for (var i = 0; i < _keys.length; i++) {
                eval("_obj = $$(\"#btn_" + _keys[i] + "\");");
                _obj.disabled = false;
                _obj.className = "jmm_toolbar_btn_" + _keys[i];
            }
        }
        rObj = null;
        return false;
    };
    this.select = function(rObj) {
        __select(rObj);
    };
    this.doUpdate = function() {
        var _id = $$("#_form_id").value;
        var _parentId = $$("#_form_parent").value;
        var _caption = $$("#_form_caption").value;
        _caption = __convertText(_caption);
        if (_caption == "") {
            alert("Please fill out caption field!");
            return false;
        }
        var _url = $$("#_form_url").value;
        _url = __convertText(_url);
        var _target = $$("#_form_target").value;
        var _cssClass = $$("#_form_cssClass").value;
        var _direction = $$("#_form_direction").value;
        var _location = $$("#_form_location").value;
        var _parent = __jm.getNodeById(_parentId);
        if (_parent == null) {
            _parent = __jm.getRoot();
        }
        if (typeof(_id) == "string" && _id != "undefined" && _id.length > 0) {
            __jm.update(_id, _parent, _caption, _url, _target, _cssClass, _direction, _location);
        }
        else {
            __jm.add(_parent, _caption, _url, _target, _cssClass, _direction, _location);
        }
        __refreshList();
        return true;
    };
    this.doMove = function() {
        var _id = $$("#_form_id").value;
        var _node = __jm.getNodeById(_id);
        var _parentId = $$("#_form_parent").value;
        var _parent = (_parentId == "") ? __jm.getRoot() : __jm.getNodeById(_parentId);

        if (_node != null) {
            try {
                _parent.appendChild(_node);
            } catch(e) {
                alert(e.message);
                return;
            }
        }
        _node = _parent = _parentId = null;
        __signLevel();
        __refreshList();
        return true;
    };
    this.doSaveConfig = function() {
        var _dynamic = $$("#" + __CFG_DYNAMIC).value;
        var _root = __jm.getRoot();
        if (_dynamic == "false")
            _root.setAttribute("dynamic", "false");
        else
            _root.setAttribute("dynamic", "true");
        _root = _dynamic = null;
        __refreshList();
    };
    /*--------------------------------------*/

    this.action = function(rObj) {
        var _act = rObj.getAttribute("action");
        eval("__btn_" + _act + "();");
    };
    this.refreshCanvas = function() {
        __refreshList();
    };
    this.load = function(v) {
        __jm = v;
        __signLevel();
    };
    this.open = function(rCanvas) {
        __createPanel();
        if (typeof(rCanvas) == "object")
            rCanvas.appendChild(__panel);
        else
            $$("body").appendChild(__panel);
        __refreshList();
    };
}
