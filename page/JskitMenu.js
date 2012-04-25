/*****************************************************
 *
 * JskitMenu
 * #author    : AnyRock
 * #update    : 2009-1-12
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *
 ******************************************************/
function JskitMenu(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitMenu";

    var __TAG = "div";
    var __TYPE_NODE = "jmnode";
    var __INTERNAL = "jminternal";
    var __ATTR_DIRECTION = "direction";
    var __ATTR_LOCATION = "location";
    //var __ATTR_DYNAMIC = "dynamic";

    var __dynamic = false;
    var __dynamicList = new Array();
	var	__cssPanelFirst = "jskitmenu_panel_f";
	var	__cssPanelDynamic = "jskitmenu_panel_d";

    var __data = null;
    var __root = null;
    var __selectedNode = null;
    var __selectedItem = null;
    var __activeIcon = null;
    var __documentLoaded = false;

	var __menuBox = null;
    var __LOCATION = function() {
        this.UP = 1;
        this.RIGHT = 2;
        this.DOWN = 3;
        this.LEFT = 4;
    };
    var __DIRECTION = function() {
        this.HOR = 1;
        this.VER = 2;
    };

    //public attributes
    var __panelCssClass = "";
    this.setPanelCssClass = function(v) {
        __panelCssClass = (typeof(v) == "string") ? v : "";
    };
    var __isShowArrow = true;
    this.setIsShowArrow = function(v) {
        __isShowArrow = (typeof(v) == "boolean") ? v : true;
    };
    //9650 up 9658 right  9660 down 9668 left
    var __arrowHtml = new Array();
    __arrowHtml[1] = "&#9650;";//up
    __arrowHtml[2] = "&#9658;";//right
    __arrowHtml[3] = "&#9660;";//down
    __arrowHtml[4] = "&#9668;";//left
    var __showArrow = false;

    var __showIconBar = false;
    var __iconCssClass = "";
    var __iconCssClassOver = "";
    var __iconCssClassActive = "";

    this.setUpArrowHtml = function(v) {
        if (typeof(v) == "string")
            __arrowHtml[1] = v;
    };
    this.setRightArrowHtml = function(v) {
        if (typeof(v) == "string")
            __arrowHtml[2] = v;
    };
    this.setDownArrowHtml = function(v) {
        if (typeof(v) == "string")
            __arrowHtml[3] = v;
    };
    this.setLeftArrowHtml = function(v) {
        if (typeof(v) == "string")
            __arrowHtml[4] = v;
    };

    //#Begin Private methods
    var __Node = function(rCaption, rUrl, rTarget, rCss, rDirection, rLocation,rIcon) {
        var _d = __data.createElement(__TAG);
        _d.setAttribute("type", __TYPE_NODE);
        _d.setAttribute("id", jskitUtil.guid());
        _d.setAttribute("target", jskitUtil.select(rTarget, "_self", "_blank", "_top", "_parent"));
        _d.setAttribute("url", rUrl);
        _d.setAttribute("css", rCss);
        _d.setAttribute(__ATTR_DIRECTION, jskitUtil.select(rDirection, 1, 2));
        _d.setAttribute(__ATTR_LOCATION, jskitUtil.select(rLocation, 1, 2, 3, 4));
        _d.setAttribute("icon",rIcon)
        rCaption = rCaption.replace(/</gi, "&lt;");
        rCaption = rCaption.replace(/>/gi, "&gt;");
        var _caption = __data.createCDATASection(rCaption);
        _d.appendChild(_caption);
        _caption = null;

        return _d;
    };
    var __InternalNode = function(rCss){
        var _d = __data.createElement(__TAG);
        _d.setAttribute("id",jskitUtil.guid());
        _d.setAttribute("type",__INTERNAL);
        _d.setAttribute("css",rCss);
        return _d;
    };
    var __isNode = function(rNode) {
        return (rNode != null && rNode.tagName == __TAG &&
                rNode.getAttriute("type") == __TYPE_NODE);
    };
    var __getLevel = function(rId) {
        var _level = 0;
        var _node = __data.selectSingleNode("//div[@id='" + rId + "']");
        if (_node == null)return 0;
        while (_node.tagName != "root") {
            _level++;
            _node = _node.parentNode;
        }
        _node = null;
        return _level;
    };
    var __initRootNode = function() {
        __data = jskitXml.loadXml('<?xml version="1.0" encoding="utf-8"?><root></root>');
        __root = __data.documentElement;
        __root.setAttribute("id", jskitUtil.guid());

        var _caption = __data.createCDATASection("");
        __root.appendChild(_caption);

        __root.setAttribute(__ATTR_DIRECTION, 1);
        __root.setAttribute(__ATTR_LOCATION, 3);

        _caption = null;
    };
    var __getIconBarContent = function(){
        var _nodes = __root.selectNodes("//div");
        var _direction = parseInt(__root.getAttribute(__ATTR_DIRECTION));
        var _float = (_direction==1)?"left":"none";
        var _icon = "";
        var _iconId = "";
        var _action = "";
        var _target = "";
        var _str = '<div><div style="font-size:1px;width:5px;float:'+_float+'" ></div>';
        for(var i=0;i<_nodes.length;i++){
            _icon = _nodes[i].getAttribute("icon");
            if(_icon!=null && _icon!=""){
                _iconId = _nodes[i].getAttribute("id")+"_icon";
                _action = _nodes[i].getAttribute("url");
                _str += '<div id="'+_iconId+'" onMouseOver="'+__hd+'.onIconMouseOver(this,event)" onMouseOut="'+__hd+'.onIconMouseOut(this,event)" ';
                _str += ' style="float:'+_float+'" class="'+__iconCssClass+'" ';
                if(typeof(_action)!="string")_action="";
                if(_action==""){
                    _str += '>';
                    _str += '<img src="'+_icon+'" width="16" height="16" border="0" />';
                }else if(_action.toLowerCase().indexOf("javascript:")==0){
                    _action = _action.replace(/javascript:/gi,"");
                    _str += ' onclick="'+__hd+'.onIconClick(this,event);'+_action+';">';
                    _str += '<img src="'+_icon+'" width="16" height="16" border="0" />';
                }else{
                    _str += '>';
                    _target = _nodes[i].getAttribute("target");
                    _str += '<a href="'+_action+'" target="'+_target+'"><img id="'+_iconId+'" onlick="'+__hd+'.onIconClick(this,event);'+_action+';" src="'+_icon+'" width="16" height="16" border="0" /></a>';
                }
                _str += '</div>';
            }
        }
        _str += '</div>';
        return _str;
    };
    var __getItemsContent = function(rDirection) {
        rDirection = jskitUtil.select(rDirection, 1, 2);
        if (__selectedNode == null) {
            __selectedNode = __root;
        }
        var _float = (rDirection == 2) ? "bottom" : "left";
        var _action = "";
        var _html = new Array();
        var _nodes = __selectedNode.childNodes;

        var _title,_id,_css,_url,_target,_type;
        var _hasChild,_location;
        for (var i = 0; i < _nodes.length; i++) {
			_type = _nodes[i].getAttribute("type");
            _id = _nodes[i].getAttribute("id");
			if(_id==""){
				_id = jskitUtil.guid();
				_nodes[i].setAttribute("id",_id);
			}
			_title = _nodes[i].getAttribute("name");
			_url = _nodes[i].getAttribute("url");
			_target = _nodes[i].getAttribute("target");
            _css = _nodes[i].getAttribute("css");
            if(_type==__INTERNAL){//ge duan
                _html.push('<div class="' + _css + '" '
                        + ' style="float:' + _float + ';" '
                        + ' type="' + _type + '" '
                        + ' id="' + _id + '" '
                        + '>&nbsp;</div>');
            }else{
                if (__dynamic) {//mouse move
                    if (_url != null && _url.trim() != "") {
                        _action = ' onclick="' + __hd + '.gotoUrl(this,event)" ';
                    } else {
                        _action = '';
                    }
                }
                else {//expand by click
                    _action = ' onclick="return ' + __hd + '.select(event,this);"' +
                              ' onmouseover="' +
                              __hd +
                              '.onMouseOver(this);" ' +
                              ' onmouseout="' +
                              __hd +
                              '.onMouseOut(this);" ';
                }
                //show arrow or not
                if (__isShowArrow) {
                    _hasChild = (_nodes[i].childNodes != null && _nodes[i].childNodes.length > 1);
                    if (_hasChild && __showArrow) {
                        _location = _nodes[i].getAttribute(__ATTR_LOCATION);
                        _title += __arrowHtml[_location];
                    }
                }
                /*
                 //check current Url
                 if(window.location.href.indexOf(_url)!=-1)
                 _css += "_selected";
                 */
				 var tag = (_url != null && _url.trim() != "")?"div":"div";
				 var item = '<'+tag+' class="' + _css + '" '
                        + ' style="float:' + _float + ';" '
                        + ' type="' + _type + '" '
                        + ' id="' + _id + '" '
                        + _action + '><a href="'+_url+'" target="'+_target+'" style="display:none"></a>' + _title + '</'+tag+'>';
				_html.push(item);
            }
        }
        _css = _id = _title = _url = _target = _type = null;
        _hasChild = _location = null;
        _action = _nodes = _float = null;
        return _html.join('');
    };
    var __isOpenDynamicBox = function() {
        return (__dynamicBox != null && __dynamicBox.style.display != "none");
    };
    var __haveChild = function() {
        return (__selectedNode != null && __selectedNode.childNodes.length > 0);
    };
    var __dBoxId = function(rId) {
        return rId + "_dbox";
    };
    var __openDynamicBox = function(rLocation, rContent) {
        var _id = __dBoxId(__selectedNode.getAttribute("id"));
        if (__isInDynamicList(_id)) {
            return;
        }
        else {
            __dynamicList.push(_id);
        }

        var _dynamicBox = null;
        if ($("#" + _id) != null) {
            _dynamicBox = $("#" + _id);
        } else {
            _dynamicBox = document.createElement(__TAG);
            $("body").appendChild(_dynamicBox);
            _dynamicBox.setAttribute("id", _id);
			_dynamicBox.style.position = "absolute";
        }
		_dynamicBox.style.display = "none";
		_dynamicBox.innerHTML = rContent;
		_dynamicBox.className = __cssPanelDynamic;

        rLocation = jskitUtil.select(rLocation, 3, 1, 2, 4);
        var _x = null;
        var _y = null;
        switch (rLocation) {
            case 1://up
                _x = $(__selectedItem).getX();
                _y = $(__selectedItem).getY() - _dynamicBox.offsetHeight+3;
                break;
            case 2://right
                _x = $(__selectedItem).getX() + __selectedItem.offsetWidth-2;
                _y = $(__selectedItem).getY();
                break;
            case 3://down
                _x = $(__selectedItem).getX();
                _y = $(__selectedItem).getY() + __selectedItem.offsetHeight-3;
                break;
            case 4://left
                _x = $(__selectedItem).getX() - _dynamicBox.offsetWidth+2;
                _y = $(__selectedItem).getY();
                break;
        }

        _dynamicBox.style.left = _x+"px";
        _dynamicBox.style.top = _y+"px";
		_dynamicBox.style.display = "block";
		_x = _y = null;
    };
    var __isOutOfMenu = function(rObj) {//Abandon!!!
        while (rObj != null && rObj.parentNode != null && rObj.tagName != "BODY") {
            if (rObj.getAttribute("id") == __root.getAttribute("id")) {
                return false;
            }
            else {
                window.status = "id:" + rObj.getAttribute("id");
            }
            rObj = rObj.parentNode;
        }
        return true;
    };
    var __isInDynamicList = function(rKey) {
        for (var i = 0; i < __dynamicList.length; i++) {
            if (__dynamicList[i] == rKey)
                return true;
        }
        return false;
    };
    var __isInDynamicMenu = function(rObj) {
        while (rObj != null && rObj.parentNode != null && rObj.tagName != "BODY") {
            if (__isInDynamicList(rObj.getAttribute("id")) || __isInDynamicList(__dBoxId(rObj.getAttribute("id")))) {
                return true;
            }
            rObj = rObj.parentNode;
        }
        return false;
    };
    var __isInSamePath = function(rId1, rId2) {
        if (typeof(rId1) != "string" || typeof(rId2) != "string")return false;
        rId1 = rId1.replace(/_dbox/gi, "");
        rId2 = rId2.replace(/_dbox/gi, "");
        var _node = __data.selectSingleNode("//div[@id='" + rId1 + "']");
        if (_node == null)return false;
        while (_node.parentNode && _node.tagName != "root") {
            if (rId2 == _node.getAttribute("id")) {
                return true;
            }
            _node = _node.parentNode;
        }
        _node = __data.selectSingleNode("//div[@id='" + rId2 + "']");
        if (_node == null)return false;
        while (_node.parentNode && _node.tagName != "root") {
            if (rId1 == _node.getAttribute("id")) {
                return true;
            }
            _node = _node.parentNode;
        }
        _node = null;
        return false;
    };
    var __closeDynamicBox = function(rId) {
        var _box = null, _key = null,_list = __dynamicList.join(',');
        for (var i = 0; i < __dynamicList.length; i++) {
            _key = __dynamicList[i];
            _box = $("#" + _key);
            if (_box != null && !__isInSamePath(_key, rId)) {
                _box.finalize();
                _list = _list.replace(_key, "");
            }
        }
        _list = _list.replace(/,,/gi, ",");
        __dynamicList = _list.split(',');
        _box = _key = _list = null;
        //jskitLog.debug(__hd+".__closeDynamicBox("+rId+") done");
    };
    //#End
    var __getMenuNodeById = function(rId) {
		if(__root==null){return null;}
        else{return __root.selectSingleNode("//" + __TAG + "[@id='" + rId + "']")};
    };
    var __getNodeList = function() {
		if(__root==null){return null;}
		else{return __root.selectNodes("//" + __TAG + "[@type='" + __TYPE_NODE + "']")};
    };
    var __getMenuNodeByItem = function(rItem) {
        if (rItem == null || rItem.getAttribute == null)return null;
        var _id = rItem.getAttribute("id");
        return __getMenuNodeById(_id);
    };

    var __setHoverStyle = function(rId) {
        var _node = __getMenuNodeById(rId);
        var _tmpItem = null;
        var _tmpNode = _node;
        while (_tmpNode != null && _tmpNode.tagName.toLowerCase() != "root") {
            _tmpItem = $("#" + _tmpNode.getAttribute("id"));
			if(_tmpItem!=null){
	            _tmpItem.className = _tmpNode.getAttribute("css") + "_over";
		        _tmpNode = _tmpNode.parentNode;
			}else{
				_tmpNode = null;
			}
        }
    };
    var __resetHoverStyle = function(rItem) {
        if (__selectedNode == null || __selectedNode.parentNode == null || __selectedItem == null || __selectedItem.parentNode == null) {
            return;
        }
        if (rItem != null && rItem.parentNode != null) {//one item selected
            var _nl_items = rItem.parentNode.childNodes;
            var _node = null;
            for (var i = 0; i < _nl_items.length; i++) {
                _node = __getMenuNodeByItem(_nl_items[i]);
                if (_node != null)
                    _nl_items[i].className = _node.getAttribute("css");
            }
            _node = _nl_items = null;
            //clear the styles of children
            if (rItem.getAttribute("id") != __selectedNode.parentNode.getAttribute("id")) {
                __selectedItem.className = __selectedNode.getAttribute("css");
            }
        } else {//clear all items before
            var _tmpItem = null;
            var _tmpNode = __selectedNode;
            while (_tmpNode != null && _tmpNode.tagName.toLowerCase() != "root") {
                _tmpItem = $("#" + _tmpNode.getAttribute("id"));
				if(_tmpItem==null){break;}
				_tmpItem.className = _tmpNode.getAttribute("css");
				_tmpNode = _tmpNode.parentNode;
            }
        }
        rItem = null;
    };
    var __isCurrentItem = function(rItem) {
        if (__selectedItem != null && rItem != null) {
            //jskitLog.debug(__hd+".isCurrentItem:"+(__selectedItem.getAttribute("id")==rItem.getAttribute("id")));
            return (__selectedItem.getAttribute("id") == rItem.getAttribute("id"));
        }
        return false;
    };

	var __convertJsonItem2Xml = function(rDoc,rParent,rItem){
		for(var i=0;i<rJson.length;i++){
			_item = rJson[i];
			_node = rDoc.createElement("div");
			_node.setAttribute("type",_item.jmnode);
			_node.setAttribute("id",_item.id);
			_node.setAttribute("target",_item.target);
			_node.setAttribute("css",_item.css);
			_node.setAttribute("url",_item.url);
			_node.setAttribute("name",_item.name);
			_node.setAttribute("direction",_item.direction);
			_node.setAttribute("location",_item.location);
			rParent.appendChild(_node);
			if(_item.children.length>0){
				rDoc = __convertJsonItem2Xml(rDoc,_node,_item.children);
			}
		}
		return rDoc;
	};
	var __convertJson2Xml = function(rJson){
		//<div type=\"jmnode\" id=\"jm1\" target=\"_self\" css=\"jskitmenu_item_f\" url=\"\" name=\"操作\" direction=\"2\" location=\"3\">
		var _item = null;
		var _doc = jskitXml.loadXml("<?xml version=\"1.0\" encoding=\"utf-8\"?><root id=\"root\"></root>");
		var _root = _doc.documentElement;
		var _node = null;
		if(rJson.length>0){
			_doc = __convertJsonItem2Xml(_doc,_root,rJson);
		}
	};
    //#Begin Public methods
    //----------------------------------------------------
    //valid in dynamic menu
    this.onMouseMove = function(e) {
        if (!__dynamic) {
            return false;
        }
        var _item = e.srcElement;
        if (!_item.getAttribute){
            //jskitLog.debug(__hd+".onMouseMove:tag:no [getAttribute] method,return");
            return false;
        }else if(navigator.userAgent.indexOf("MSIE 6.0")!=-1 && _item.tagName=="IMG"){
            //for stupid IE
            //there is a error when mouse move a div which is above on a img element
            // e.srcElement not currectly return the div element but the img element ,
            //jskitLog.debug(__hd+".onMouseMove:tag:"+_item.tagName+",id="+_item.getAttribute("id"));
            return false;
        }else{
        }
        var _id = _item.getAttribute("id");
        if (typeof(_id) == "string" && _id.indexOf("_dbox") != -1){
            //jskitLog.debug(__hd+".onMouseMove:tag:id include _dbox,return");
            return false;
        }
        var _node = __getMenuNodeById(_id);
        if (_node != null) {//mouse on menu
            //jskitLog.debug(__hd+".onMouseMove:mouse on menu");
            //is current item or not
            if (!__isCurrentItem(_item)) {
                __resetHoverStyle(_item);
                __setHoverStyle(_id);
                if (__isInDynamicMenu(_item)) {//have same super parents
                    //jskitLog.debug(__hd+".onMouseMove: have same super parents");
                    __closeDynamicBox(_id);
                } else {
                    __closeDynamicBox();
                }
                __selectedNode = _node;
                __selectedItem = _item;
                __expand(_item);
            } else
                return false;
        } else {//mouse not on menu
            //jskitLog.debug(__hd+".onMouseMove:mouse not on menu");
            __lastMouseX = __lastMouseY = null;
            __resetHoverStyle();
            __selectedNode = null;
            __selectedItem = null;
            __closeDynamicBox();
        }
        return true;
    };
	this.closeDynamicBox = function(){
		__closeDynamicBox();
	}
    //----------------------------------------------------
    //just valid in static menu
    this.onMouseOver = function(rSrcItem) {
        if (__dynamic) {return false;}
        var _nodeId = rSrcItem.getAttribute("id");
        var _node = __data.selectSingleNode("//div[@id='" + _nodeId + "']");
        rSrcItem.className = _node.getAttribute("css") + "_over";
        _node = _nodeId = null;
    };
    //just valid in static menu
    this.onMouseOut = function(rSrcItem) {
        if (__dynamic) {return false;}
        var _nodeId = rSrcItem.getAttribute("id");
        var _node = __data.selectSingleNode("//div[@id='" + _nodeId + "']");
        rSrcItem.className = _node.getAttribute("css");
        _node = _nodeId = null;
    };
    //----------------------------------------------------
    this.select = function(e, rObj) {
        jskitEvents.cancelBubble(e);
        var _id = rObj.getAttribute("id");
        __selectedItem = rObj;
        __selectedNode = __data.selectSingleNode("//div[@id='" + _id + "']");
        if (__selectedNode != null && __selectedNode.getAttribute("type") != __TYPE_NODE) {
			__selectedNode = null;
        } else {
            //jskitLog.debug("__selectedItem:"+__selectedItem.getAttribute("id"));
            //jskitLog.debug("__selectedNode:"+__selectedNode.getAttribute("id"));
            var _url = __selectedNode.getAttribute("url");
            if (jskitUtil.str.isNullOrEmpty(_url)){
                __expand(rObj);
            }else{
                __gotoUrl(__selectedNode);
			}
        }
        return false;
    };
    var __gotoUrl = function(rNode) {
		var _id = rNode.getAttribute("id");
		var div = $("#"+_id);
		div.childNodes[0].click();
    };
    var __correctIconBarPosition = function(){
        var _bar = $("#"+__hd+"_iconbar");
        if(_bar==null)return;
        var _direction = parseInt(__root.getAttribute(__ATTR_DIRECTION));
        var _nodes = __root.childNodes;
        if(_nodes.length>1 && _nodes[0]!=null){
            var _id = _nodes[1].getAttribute("id");
            var _div = $("#"+_id);
            if(_div==null)return;
            _bar.style.position = "absolute";
            if(_direction==1){//h
                _bar.style.left = _div.getX();
                _bar.style.top = _div.getY()+_div.offsetHeight;
            }else{
                _bar.style.left = _div.getX()+_div.offsetWidth;
                _bar.style.top = _div.getY();
            }
        }
        _bar = _div = _nodes = _direction = null;
    };
    var __getMenuHtmlCode = function() {
        var _id = __root.getAttribute("id");
        var _direction = parseInt(__root.getAttribute(__ATTR_DIRECTION));
        var _menuStr = '<div id="' + _id + '" class="'+__cssPanelFirst+'">' + __getItemsContent(_direction) + "</div>";
        if(__showIconBar){
            _menuStr += '<div id="'+__hd+'_iconbar">'+__getIconBarContent()+'</div>';
        }
        return _menuStr;
    };
    var __expand = function(rSrcItem) {
        if (__selectedNode == null) {
            __selectedNode = __root;
        }
        var _id = __selectedNode.getAttribute("id");
        var _direction = parseInt(__selectedNode.getAttribute(__ATTR_DIRECTION));
        var _location = parseInt(__selectedNode.getAttribute(__ATTR_LOCATION));
        var _key = __selectedNode.getAttribute("id");
        var _url = __selectedNode.getAttribute("url");
        if (arguments.length == 0) {//first level
            __out(__getMenuHtmlCode());
            __correctIconBarPosition();
        } else {
            __selectedItem = rSrcItem;
            if (!__haveChild()) {
                return true;
            }
            if (__dynamic) {
                if (__selectedItem != null){
                    __openDynamicBox(_location, __getItemsContent(_direction));
                }else{
                    alert("rSrcItem is null");
				}
            }
            else {
                //if selected item is opened,remove it
                var _next = __selectedItem.nextSibling;
                if (_next != null && _next.getAttribute("type") == "dbox") {
                    __selectedItem.parentNode.removeChild(__selectedItem.nextSibling);
                    //jskitLog.debug("remove");
                }
                else {
                    //jskitLog.debug("insert after");
                    if(__documentLoaded){
                        var _div = document.createElement("div");
                        _div.setAttribute("id", _id);
                        _div.setAttribute("type", "dbox");
                        _div.innerHTML = __getItemsContent(_direction);
                        jskitUtil.dom.insertAfter(_div, __selectedItem);
                        _div = null;
                    }
                }
            }
        }
        _direction = _location = _key = _url = _id = null;
        return true;
    };
    /***********************************************************************
     * output three
     ************************************************************************/
    var __attrs = null;
    var __treeFolderCssClass = "";
    var __treeLeafCssClass = "";
    var __treePrefixCssClass = "";
    var __treeFolderSignCode = "&#9679;";
    var __treeLeafSignCode = "&#9675;";
    var __TreeNodeAttr = function() {
        this.hasChild = false;
        this.isFirst = false;
        this.isLast = false;
        this.hasBrother = false;
        this.open = false;
    };
    var __getPrefixCode = function(item, rAttr) {
        var _str = "";
        if (!rAttr.hasBrother || rAttr.isLast) {
            _str = "&#9492;";//"";
        } else if (rAttr.isFirst) {
            _str = "&#9500;";//"";
        } else {
            _str = "&#9500;";//"";
        }
        if (rAttr.hasChild) {//目录
            _str += __treeFolderSignCode;//"&#9688;";
        } else {
            _str += __treeLeafSignCode;
        }
        var count = 0;
        var _item = item.parentNode;
        while (count < 10 && _item.getAttribute("id") != __root.getAttribute("id")) {
            if (!__attrs[_item.getAttribute("id")].isLast)
                _str = "&#9474;" + _str;
            else
                _str = "&nbsp;" + _str;
            _item = _item.parentNode;
            count++;
        }
        return '<font class="' + __treePrefixCssClass + '">' + _str + '</font>';//+"&#9472;";
    };
    var __getTreeHtmlCode = function() {
        __attrs = new Array();
        var _nodes = __getNodeList();
        var _node = null;
        var _items = new Array();
        var _item = null;
        var _attr = null;
        var _treeRoot = document.createElement("div");
        _treeRoot.setAttribute("id", __root.getAttribute("id"));
        _items[__root.getAttribute("id")] = _treeRoot;
        for (var i = 0; i < _nodes.length; i++) {
            _node = _nodes[i];
            _attr = new __TreeNodeAttr();
            _attr.hasChild = (_node.childNodes && _node.childNodes.length > 1);
            _attr.isFirst = (_node.previousSibling == null);
            _attr.isLast = (_node.nextSibling == null);
            _attr.hasBrother = (!_attr.isFirst || !_attr.isLast);
            __attrs[_node.getAttribute("id")] = _attr;
            _item = document.createElement("div");
            _item.setAttribute("id", _node.getAttribute("id"));
            _item.setAttribute("url", _node.getAttribute("url"));
            _item.setAttribute("target", _node.getAttribute("target"));
            _item.setAttribute("type", __TYPE_NODE);
            _item.className = (_attr.hasChild) ? __treeFolderCssClass : __treeLeafCssClass;
            _items[_node.getAttribute("id")] = _item;
            _items[_node.parentNode.getAttribute("id")].appendChild(_item);
            _item.innerHTML = __getPrefixCode(_item, _attr) + _node.childNodes[0].text;
        }
        var _content = _treeRoot.innerHTML;
        _content = _content.replace(/<div/gi, "<div onclick=\"" + __hd + ".treeOnClick(this,event)\" ");
        //_content = _content.replace(/</gi,"&lt;");
        //_content = _content.replace(/>/gi,"&gt;");
        _node = _item = _attr = _treeRoot = null;
        return _content;
    };
    var __expandTree = function() {
        __dynamic = false;
       __out(__getTreeHtmlCode());
    };
    this.treeOnClick = function(sender, e) {
        jskitEvents.cancelBubble(e);
        jskitBase.bindGlobalEvent(e);
        var _item = e.srcElement;
        if (_item.childNodes && _item.childNodes.length > 1) {
            var _open = (_item.getAttribute("open") && _item.getAttribute("open") != "false");
            var _child = null;
            var _display = (_open) ? "none" : "block";
            _item.setAttribute("open", !_open);
            for (var i = 0; i < _item.childNodes.length; i++) {
                _child = _item.childNodes[i];
                if (typeof(_child.style) == "object" && _child.getAttribute("type") == __TYPE_NODE)
                    _child.style.display = _display;
            }
        }
    };
    this.setTreePrefixCssClass = function(v) {
        __treePrefixCssClass = v;
    };
    this.setTreeFolderCssClass = function(v) {
        __treeFolderCssClass = v;
    };
    this.setTreeLeafCssClass = function(v) {
        __treeLeafCssClass = v;
    };
    this.setTreeFolderSignCode = function(v) {
        __treeFolderSignCode = v;
    };
    this.setTreeLeafSignCode = function(v) {
        __treeLeafSignCode = v;
    };
    //
    //    //--- abandon begin ------------------------------------
    //    this.getNode = function() {
    //        var _node = null;
    //        if (typeof(arguments[0]) == "string") {
    //            _node = __data.selectSingleNode("//div[@id='" + arguments[0] + "']");
    //        }
    //        else if (typeof(arguments[0]) == "object") {
    //            _node = arguments[0];
    //        }
    //        if (_node != null && _node.getAttribute("type") != __TYPE_NODE) {
    //            _node = null;
    //        }
    //        return _node;
    //    };
    //    this.setValue = function(rKey, rValue) {
    //        if (__selectedNode == null)
    //            return;
    //        __selectedNode.setAttribute(rKey, rValue);
    //    };
    //    this.getValue = function(rKey) {
    //        if (__selectedNode == null)
    //            return null;
    //        return __selectedNode.getAttribute(rKey);
    //    };
    //    this.getCaption = function() {
    //        if (__selectedNode == null)
    //            return null;
    //        return __selectedNode.childNodes[0].nodeValue;
    //    };
    //    this.setCaption = function(v) {
    //        if (__selectedNode == null)
    //            return;
    //        __selectedNode.childNodes[0].nodeValue = v;
    //    };
    //    this.getChildren = function() {
    //        if (__selectedNode == null)
    //            return null;
    //        return __selectedNode.childNodes[1].childNodes;
    //    };
    //    //--- abandon end ------------------------------------

    ///#  BEGIN For icon bar
    var __onIconClick = function(sender){
        if(__activeIcon==null){
            __activeIcon = sender;
            __setIconStyleActive(__activeIcon);
        }else{
            __setIconStyleNormal(__activeIcon);
            if(__activeIcon.getAttribute("id")==sender.getAttribute("id")){
                __activeIcon = null;
            }else{
                __activeIcon = sender;
                __setIconStyleActive(__activeIcon);
            }
        }
    };
    var __onIconMouseOver = function(sender){
        if(__activeIcon!=null && __activeIcon.getAttribute("id")==sender.getAttribute("id"))return;
        __setIconStyleOver(sender);
        return true;
    };
    var __onIconMouseOut = function(sender){
        if(__activeIcon!=null && __activeIcon.getAttribute("id")==sender.getAttribute("id"))return;
        __setIconStyleNormal(sender);
        return true;
    };
    this.onIconClick = function(sender){
        __onIconClick(sender);
    };
    this.onIconMouseOver = function(sender){
        __onIconMouseOver(sender);
    };
    this.onIconMouseOut = function(sender){
        __onIconMouseOut(sender);
    };
    var __setIconStyleOver = function(rObj){
        if(rObj==null)return;
        rObj.className = __iconCssClassOver;
    };
    var __setIconStyleActive = function(rObj){
        if(rObj==null)return;
        rObj.className = __iconCssClassActive;
    };
    var __setIconStyleNormal = function(rObj){
        if(rObj==null)return;
        rObj.className = __iconCssClass;
    };
	var __out = function(rContent){
		if(__menuBox!=null){
			__menuBox.innerHTML = rContent;
		}else{
			alert("JskitMenu:__out:Exception:Menu Box not found!");
		}
	};
    ///# END
    
    this.gotoUrl = function(sender,e) {
		for(var i=0;i<sender.childNodes.length;i++){
			if(sender.childNodes[i].tagName=="A"){
		        sender.childNodes[i].click();
				return;
			}
		}
    };
    this.setRootDirection = function(v) {
		if(__root==null){return;}
        v = jskitUtil.select(v, 1, 2);
        __root.setAttribute(__ATTR_DIRECTION, v);
    };
    this.setDynamic = function(v) {
		if(__root==null){return;}
        __dynamic = jskitUtil.select(v, false, true);
        __root.setAttribute("dynamic", __dynamic.toString());
    };
    this.setIconBarVisble = function(v){
        __showIconBar = (typeof(v)=="boolean")?v:false;
    };
    this.setIconCssClass = function(v){
        __iconCssClass = (typeof(v)=="string")?v:"";
    };
    this.setIconCssClassOver = function(v){
        __iconCssClassOver = (typeof(v)=="string")?v:"";
    };
    this.setIconCssClassActive = function(v){
        __iconCssClassActive = (typeof(v)=="string")?v:"";
    };
    this.setCssPanelFirst = function(v){
		__cssPanelFirst = v;
	};
    this.setCssPanelDynamic = function(v){
		__cssPanelDynamic = v;
	};

    this.move = function(rParent) {
		if(__root==null){return;}
        if (__selectedNode == null)
            return;
        rParent.appendChild(__selectedNode);
    };
    this.remove = function() {
		if(__root==null){return;}
        if (__selectedNode == null){return;}
        __selectedNode.parentNode.removeChild(__selectedNode);
        __selectedNode = null;
    };
    this.getRoot = function() {
        return __root;
    };
    this.getNodeById = function(id) {
		if(__root==null){return;}
        return __root.selectSingleNode("//"+__TAG+"[@id='" + id + "']");
    };
    this.getMenuHtmlCode = function() {
		if(__root==null){return;}
        return __getMenuHtmlCode();
    };
    this.nodeList = function() {
		if(__root==null){return;}
        return __root.selectNodes("//"+__TAG+"[@type='" + __TYPE_NODE + "']");
    };
    this.isNode = function(rNode) {
		if(__root==null){return;}
        return __isNode(rNode);
    };
    this.add = function(rParent, rCaption, rUrl, rTarget, rCss, rDirection, rLocation,rIcon) {
		if(__root==null){return;}
        var _node = __Node(rCaption, rUrl, rTarget, rCss, rDirection, rLocation,rIcon);
        return this.push(rParent, _node);
    };
    this.addInternal = function(rParent,rCssClass){
		if(__root==null){return;}
        var _node = __InternalNode(rCssClass);
        return this.push(rParent, _node);
    };
    this.update = function(rId, rParent, rCaption, rUrl, rTarget, rCss, rDirection, rLocation) {
		if(__root==null){return;}
        var _node = this.getNodeById(rId);
        if (_node != null) {
            _node.childNodes[0].nodeValue = rCaption;
            _node.setAttribute("url", rUrl);
            _node.setAttribute("target", jskitUtil.select(rTarget, "_self", "_blank", "_top", "_parent"));
            _node.setAttribute("url", rUrl);
            _node.setAttribute("css", rCss);
            _node.setAttribute(__ATTR_DIRECTION, jskitUtil.select(rDirection, 1, 2));
            _node.setAttribute(__ATTR_LOCATION, jskitUtil.select(rLocation, 1, 2, 3, 4));
            if (rParent != null && !rParent.getAttribute("id") == _node.parentNode.getAttribute("id"))
                rParent.appendChild(_node);
        }
        _node = null;
    };
    this.push = function(rParent, rNode) {
		if(__root==null){return;}
        if (rParent != null) {
            rParent.appendChild(rNode);
        }
        else {
            __root.appendChild(rNode);
        }
        return rNode;
    };
    this.copyData = function(rData) {
		if(__root==null){return;}
        while (__root.hasChildNodes()) {
            __root.removeChild(__root.childNodes[0]);
        }
        __root = rData;
        var _nl = __getNodeList();
        var _node;
        for (var i = 0; i < _nl.length; i++) {
            _node = _nl[i]
            _node.setAttribute("id", jskitUtil.guid());
        }
        _node = null;
    };
    this.clone = function(rHd) {
		if(__root==null){return;}
        eval("var " + rHd + " = new JskitMenu(\"" + rHd + "\");");
        eval(rHd + ".setLeftArrowHtml(__arrowHtml[3]);");
        eval(rHd + ".setDownArrowHtml(__arrowHtml[2]);");
        eval(rHd + ".setRightArrowHtml(__arrowHtml[1]);");
        eval(rHd + ".setUpArrowHtml(__arrowHtml[0]);");
        eval(rHd + ".setDynamic(__dynamic);");
        eval(rHd + ".setPanelCssClass(__panelCssClass);");
        eval(rHd + ".setRootDirection(__root.getAttribute(__ATTR_DIRECTION));");
        eval(rHd + ".copyData(__root.cloneNode(true));");
        return eval(rHd);
    };

    this.expand = function(rSrcItem) {
		if(__root==null){return;}
        if (typeof(rSrcItem) == "object")
            return __expand(rSrcItem);
        else
            return __expand();
    };
    this.expandTree = function(rStartNode) {
		if(__root==null){return;}
        if (typeof(rStartNode) == "object")
            return __expandTree(rStartNode);
        else
            return __expandTree();
    };
    this.load = function(rXmlUrl) {
		try{
			__data = jskitXml.load(rXmlUrl);
			__root = __data.documentElement;
			__dynamic = (__root.getAttribute("dynamic") == "true");
		}catch(e){
			alert("JskitMenu:load:Exception:"+e.message);
		}
    };
    this.loadXml = function(rXmlContent) {
		try{
			__data = jskitXml.loadXml(rXmlContent);
			__root = __data.documentElement;
			__dynamic = (__root.getAttribute("dynamic") == "true");
		}catch(e){
			alert("JskitMenu:load:Exception:"+e.message);
		}
    };
	
	
	var __convertJson2Xml = function(rItem){
		var _str = new Array();
		for(var i=0;i<rItem.length;i++){
			_item = rItem[i];
			_str.push('<'+__TAG);
			_str.push(' type=\"'+_item.type+'\" ');
			_str.push(' id=\"'+_item.id+'\" ');
			_str.push(' target=\"'+_item.target+'\" ');
			_str.push(' css=\"'+_item.css+'\" ');
			_str.push(' url=\"'+_item.url+'\" ');
			_str.push(' name=\"'+_item.name+'\" ');
			_str.push(' direction=\"'+_item.direction+'\" ');
			_str.push(' location=\"'+_item.location+'\" ');
			if(_item.children.length>0){
				_str.push(' >');
				_str.push(__convertJson2Xml(_item.children));
				_str.push('</div>');
			}else{
				_str.push(' />');
			}
		}
		return _str.join('');
	};
	this.loadJson = function(rJson,rDynamic){
		try{
			if(rJson.length>0){
				var _xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><root id=\"root\">"+ __convertJson2Xml(rJson)+"</root>";
				__data = jskitXml.loadXml(_xml);
				__root = __data.documentElement;
				_xml = null;
			}else{
				__data = null;
				__root = null;
			}
			__dynamic = (typeof(rDynamic)== "boolean" && rDynamic);
		}catch(e){
			alert("JskitMenu:load:Exception:"+e.message);
		}
	};
    this.onDocumentLoad = function(){
        __documentLoaded = true;
    };
	this.setMenuBox = function(v){
		__menuBox = $("#"+v);
	};
    //#End
{
    __initRootNode();
    this.Location = new __LOCATION();
    this.Direction = new __DIRECTION();
    jskitEvents.ready("onmousemove", __hd + ".onMouseMove");
    jskitEvents.ready("onload",__hd+".onDocumentLoad");
}
}