var JskitBulter = function(){
    //#Begin message
    var __MsgFunction = function(){
        var __msgPanel = null;
        var __msgPanelId = jskitUtil.guid();
        var __MSG = function(){
            this.Title = "";
            this.Content = "";
            this.RefUrl = "";
            this.Redirect = "";
            this.Mode = "";
            this.CallBack = "";
        };
        var __msg = null;
        var __initPanel = function(){
            if(__msgPanel==null){
                __msgPanel = document.createElement("div");
                __msgPanel.setAttribute("id",__msgPanelId);
				__msgPanel.className = "bulter_panel";
                __msgPanel.style.position = "absolute";
                $("body").appendChild(__msgPanel);
            }
        };
		var __centrePanel = function(){
			__msgPanel.style.left = ($("body").clientWidth-__msgPanel.offsetWidth)/2;
			__msgPanel.style.top = "200px";
		};
        this.show = function(){
            if(typeof(BULTER_MSG)!="object"){return true;}
            __msg = BULTER_MSG;
            //push a center div
            __initPanel();
            __msgPanel.style.display = "block";
            //build div content
            var _str = '<div class="bulter_body">';
            _str += '<div class="bulter_title">'+__msg.Title+'</div>';
            _str += '<div class="bulter_content">';
            _str += __msg.Content;
            _str += '</div>';
            _str += '<div class="bulter_bar"><button onclick="jskitBulter.msg.close()">'+unescape("%u786E%u5B9A")+'</button></div>';
            _str += '<div style="height:10px;"></div>';
			_str += '</div>';
            __msgPanel.innerHTML = _str;
			__centrePanel();
        };
        this.close = function(){
            if(__msgPanel!=null){
                __msgPanel.style.display = "none";
            }
            if(!jskitUtil.str.isNullOrEmpty(__msg.Redirect)){
                window.location.href = __msg.Redirect;
            }
        };
    };
    //#End message
    //#Begin action
    var __ActionFunction = function(){
        var __actorMap = new Array();
        var __ACTOR = function(){
            this.handler = "";
            this.type = "";
            this.sourceId = "";
            this.redirect = "";
            this.getUrl = function(){
                var _url = this.handler + "?t="+this.type;
                if(typeof(this.sourceId)=="string" && this.sourceId!="" && this.sourceId!="undefined"){
                    var _o = $("#"+this.sourceId);
                    if(_o!=null){
                        _url += "&s="+_o.value;
                    }
                }
                return _url;
            };
        };
        this.sendActionWithConfirm = function(sender,e){
            if(window.confirm("Sure to Delete?")){
                this.sendAction(sender,e);
            }
        };
        this.sendAction = function(sender,e){
            var _actor = new __ACTOR();
            _actor.handler = sender.getAttribute("_act_handler");
            _actor.type = sender.getAttribute("_act_type");
            _actor.sourceId = sender.getAttribute("_act_source");
            _actor.redirect = sender.getAttribute("_act_redirect");
            var _key = jskitUtil.guid();
            __actorMap[_key] = _actor;
 	        var _handleMap = new Array();
	        _handleMap[0] = _handleMap[1] = _handleMap[2] = _handleMap[3] = 'void(0)';
	        _handleMap[4] = 'jskitBulter.action.callBack("'+_key+'");';
            var _ajax = JskitXmlHttpProcess(_actor.getUrl(),"string",_handleMap);
	        ajax = null;
	        _handleMap = null;
        };
        this.callBack = function(context,key){
            var _actor = __actorMap[key];
            jskitBulter.msg.load("Infomation",context,"",_actor.redirect,"","");
            jskitBulter.msg.show();
            _actor = __actorMap[key] = null;
        };
    };
    //#End action
    this.OnLoad = function(){
        this.msg.show();
        /* JskitValidation */
        if(typeof(JskitValidation)=="function" && typeof(JSKITVALIDATION)=='object'){
            jskitValidation = new JskitValidation("jskitValidation");
            jskitValidation.onLoad(JSKITVALIDATION);
        }
        /* JskitDateSelector */
        if(typeof(JskitDateSelector)=="function"){
            jskitDateSelector = new JskitDateSelector("jskitDateSelector");
            jskitDateSelector.setCanvasCssClass("jds_canvasCssClass");   
            jskitDateSelector.setCalendarTitleCssClass("jds_titleCssClass");   
            jskitDateSelector.setTableCssClass("jds_tableCssClass");   
            jskitDateSelector.setTHeadCssClass("jds_theadCssClass");   
            jskitDateSelector.setTBodyCssClass("jds_tbodyCssClass");   
            jskitDateSelector.setDateName("Su", "Mo", "Tu","We","Th","Fr","St");   
            jskitDateSelector.setWeekendCssClass("jds_weekend");   
        }
        if(typeof(PageOnLoad)=="function"){PageOnLoad();}
    };
{//Constructor 
    this.msg = new __MsgFunction();
    this.action = new __ActionFunction();
}
};
var jskitBulter = new JskitBulter();
var jskitValidation = null;
var jskitDateSelector = null;
