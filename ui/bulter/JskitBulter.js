var JskitBulter = function(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitBulter";
    //#Begin message
    var __MsgFunction = function(){
		//	mode:TIP(1),DEBUG(2),INFO(3),WARN(4),ERROR(5),EXCEPTION(4),CONFIRM(6);
        var __msgPanel = null;
        var __msgPanelId = jskitUtil.guid();
		var __displayMode = 0;//0:float,1:fixed
        var __MSG = function(){
            this.Title = "";
            this.Content = "";
            this.RefUrl = "";
            this.Redirect = "";
            this.Mode = "";
            this.CallBack = "";
        };
        var __msg = null;
        var __autoHideSecond = 0;
        var __initPanel = function(){
            if(__msgPanel==null){
				__msgPanel = document.createElement("div");
                __msgPanel.setAttribute("id",__msgPanelId);
				__msgPanel.className = "bulter_panel";
                $$("body").appendChild(__msgPanel);
            }
        };
        this.clear = function(){
        	if(__msgPanel!=null){
            	__msgPanel.style.display = "none";
        	}
        	if(__timer!=null){
            	window.clearTimeout(__timer);
        	}
        };
        var __timer = null;
		var __display = function(){
            //build div content
			if(__displayMode===1){
				__msgPanel.innerHTML = __msg.Content;
				__msgPanel.style.display = "";
			}else{
				var _str = '<div class="bulter_body">';
				_str += '<div class="bulter_title">'+__msg.Title+'</div>';
				_str += '<div class="bulter_content">';
				_str += __msg.Content;
				_str += '</div>';
				_str += '<div class="bulter_bar"><button onclick="jskitBulter.msg.close()">'+unescape("%u786E%u5B9A")+'</button></div>';
				_str += '<div style="height:10px;"></div>';
				_str += '</div>';
				__msgPanel.innerHTML = _str;
				__msgPanel.style.display = "";
				jskitUtil.doc.centre(__msgPanel);
			}
			if(__autoHideSecond>0){
				__timer = window.setTimeout(__hd+".msg.clear()",__autoHideSecond*1000);
			}
		};
        this.show = function(rData,rPanel,rAutoHideSecond){
			if(!$t.isObject(rData)){
				return false;
			}
			__msg = rData;
			__autoHideSecond = (isNaN(parseInt(rAutoHideSecond)))?0:parseInt(rAutoHideSecond);
            //push a center div
			if($t.isHTMLElement(rPanel)){
				__msgPanel = rPanel;
				__msgPanelId = rPanel.id;
				__displayMode = 1;
			}else{
				__initPanel();
				__displayMode = 0;
			}
            __display();
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
                    var _o = $$("#"+this.sourceId);
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
	this.redirect = function(rUrl){
		var _base = $$("base")[0];
		var _url = null;
		if(_base!=null){
			_url = _base.getAttribute("href")+rUrl;
		}else{
			_url = rUrl;
		}
		window.location.href = _url;
	};
    //#End action
    this.OnLoad = function(){
		alert("JskitBulter unsetted!");
    };
	this.init = function(){
		alert("JskitBulter init is unset!");
	};
{//Constructor 
    this.msg = new __MsgFunction();
    this.action = new __ActionFunction();
}
};
