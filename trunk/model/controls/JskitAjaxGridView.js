/***************************************************************
* Javascript JskitRichDropDownList
* Author   : Jiang Xingbo
* Date     : 2011-3-13
* Required : 
*            Base/*.*
*            JskitXmlHttp.js
***************************************************************/
var JskitAjaxGridView = function(rHd){
    var __hd = (typeof(rHd)=="string")?rHd:"jskitAjaxGridView";
    var __ajax = null;
    var __target = null;
    var __mode = "page";//page:body innerhtml, json: javascript,xml: xmldocument
    var __url = null;
    this.setMode = function(v){
        __mode = v;
    };
    this.load = function(url,targetId){
        __url = url;
        __target = $("#"+targetId);
        if(__target==null){
            alert("JskitAjaxGridView:Error:未找到输出的对象");
            return;
        }
        __target.className = "JskitAjaxGridView_Container_Loading";
        __ajax = new JskitXmlHttpAction(__url,__hd+".load_Callback","text");
    
    };
    this.load_Callback = function(text){
        __ajax = null;
        __target.className = "JskitAjaxGridView_Container";
        var _pattern = "<table[^>]*>[^\1]*(</table>)";
        var _reg = new RegExp(_pattern,"gi");
        var _bk = _reg.exec(text);
        if(_bk!=null){
            __target.innerHTML = _bk[0];
        }else{
            __target.innerHTML = '<div class="JskitAjaxGridView_Container_empty">'+unescape("%u6CA1%u6709%u7BB1%u6570%u636E")+'</div>';
        }
    };
};