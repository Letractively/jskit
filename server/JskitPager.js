/*****************************************************
*
* JskitAjax 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
function JskitPager(rHd){
	this.hd = (typeof(rHd)!="string")?"jskitPager":rHd;
}
JskitPager.prototype = {
	Bid : function(rId,rPrice,rCount){
		this.id = 	 (typeof(rId)=="string")?rId:"";
		this.price = (typeof(rPrice)=="number")?rPrice:0.00;
		this.count = (typeof(rCount)=="number")?rCount:0;
	},
	totalBids 	: 0,	//总记录数
	stepHeight 	: 22,	//每条记录的高度
	fullHeight 	: 440,	//像素,表示显示区域的高度
	position 	: 0,	//像素,滚动条的top位置
	pageSize	: 1,	//每次装载的记录数
	txtPageBegin	: "|<",
	txtPagePrevious	: "<",
	txtPageNext		: ">",
	txtPageEnd		: ">|",
	
	__bids : new Array(),
	__pageIndex		: 1,
	__maxPageIndex	: 1,
	__checkTimer	: null,
	__status		: "",

	__displayer : document.createElement("div"),
	__container : document.createElement("iframe"),
	__monitor	: document.createElement("div"),
	__pageTurner: document.createElement("div"),
	
	__buildDisplayer : function(){
		var _html = "";
		this.__displayer.id = "JskitPager_displayer";
		this.__displayer.style.height = this.fullHeight;
		this.__displayer.style.overflow = "scroll";
		this.__displayer.style.width = "100%";
		this.__displayer.style.border = "1px solid #0000ff";

		this.__container.id = "JskitPager_container";
		this.__container.style.height = "100%";
		this.__container.style.width = "100%";
		this.__container.src = "about:blank";
		this.__displayer.appendChild(this.__container);
		
		document.body.appendChild(this.__displayer);
	},
	__getLoadingElement : function(rIndex){
		var _bid = document.createElement("div");
		_bid.style.height = this.stepHeight;
		_bid.id = '_aa_bid_'+rIndex;
		_bid.style.overFlow = "hidden";
		_bid.style.backgroundColor = (rIndex%2)?"#f6f6f6":"#ffffff";
		var _html = "";
		_html += '<table cellspacing="0" cellpadding="0">';
		_html += '<tr><td class="price">Loading...</td></tr>';
		_html += '</table>';
		_bid.innerHTML = _html;
		return _bid;
	},
	__getBidElement : function(rIndex,rBid){
		var _bid = document.createElement("div");
		_bid.style.height = this.stepHeight;
		_bid.id = '_aa_bid_'+rIndex;
		_bid.style.overFlow = "hidden";
		_bid.style.backgroundColor = (rIndex%2)?"#f6f6f6":"#ffffff";
		var _html = "";
		_html += '<table cellspacing="0" cellpadding="0" width="100%">';
		_html += '<tr><td class="price">'+rBid.price+'</td><td class="count">'+rBid.count+'</td></tr>';
		_html += '</table>';
		_bid.innerHTML = _html;
		return _bid;
	},
	__buildMonitor : function(){
		this.__monitor.id = "JskitPager_monitor";
		var _html = '<table>';
		_html += '<tr>';
		_html += '<td>Total Pages:</td><td id="_aa_mo_total">'+this.__maxPageIndex+'</td>';
		_html += '<td>|</td>';
		_html += '<td>Page size:</td><td id="_aa_mo_total">'+this.pageSize+'</td>';
		_html += '<td>|</td>';
		_html += '<td>Position:</td><td id="_aa_mo_pos">'+this.__pageIndex+'</td>';
		_html += '<td>|</td>';
		_html += '<td id="_aa_mo_status"></td>';
		_html += '</tr>';
		_html += '</table>';
		this.__monitor.innerHTML = _html;
		document.body.appendChild(this.__monitor);
	},
	__refreshMonitor : function(){
		//$$("#_aa_mo_total").innerHTML = this.__maxPageIndex;
		$$("#_aa_mo_pos").innerHTML = this.__pageIndex;
		$$("#_aa_mo_status").innerHTML = this.__status;
	},
	__buildPageTurner : function(){
		var _html = '<table>';
		_html += '<tr>';
		_html += '<td><input type="button" value="'+this.txtPageBegin+'" onclick="'+this.hd+'.__pageBegin()" /></td>';
		_html += '<td><input type="button" value="'+this.txtPagePrevious+'" onclick="'+this.hd+'.__pageProvious()" /></td>';
		_html += '<td><input type="button" value="'+this.txtPageNext+'" onclick="'+this.hd+'.__pageNext()" /></td>';
		_html += '<td><input type="button" value="'+this.txtPageEnd+'" onclick="'+this.hd+'.__pageEnd()" /></td>';
		_html += '</tr>';
		_html += '</table>';
		this.__pageTurner.innerHTML = _html;
		document.body.appendChild(this.__pageTurner);
	},
	__pageBegin : function(){
		this.__pageIndex = 1;
		this.__refresh();
	},
	__pageProvious : function(){
		this.__pageIndex--;
		if(this.__pageIndex<1)
			this.__pageIndex = 1;
		this.__refresh();
	},
	__pageNext : function(){
		this.__pageIndex++;
		if(this.__pageIndex>this.__maxPageIndex)
			this.__pageIndex = this.__maxPageIndex;
		this.__refresh();
	},
	__pageEnd : function(){
		this.__pageIndex = this.__maxPageIndex;
		this.__refresh();
	},
	__refresh : function(){
		this.__clearTimer();
		var url = "bidsList.html?pageSize="+this.__pageSize+"&pageIndex="+this.__pageIndex;
		this.__container.src = url;
		this.__refreshMonitor();
		this.__checkTimer = window.setInterval(this.hd+".__checkRequestStatus()",10);
	},
	__clearTimer : function(){
		window.clearInterval(this.__checkTimer);
		this.__checkTimer = null;
	},
	__onStateChange : function(){
		this.__status = "";
		this.__refreshMonitor();
	},
	__checkRequestStatus : function(){
		var _win = $$("#JskitPager_container");
		var body = (document.all)?_win.document.body:_win.contentDocument.body;
		if(body){
			this.__clearTimer();
			this.__onStateChange();
			this.__status = "OK";
			this.__refreshMonitor();
		}else{
			var _dt = new Date();
			var _len = (_dt.getSeconds()%6);
			this.__status = "Loading.";
			for(var i=0;i<_len;i++){
				this.__status += "."; 
			}
			this.__refreshMonitor();
		}
	},
	start : function(){
		this.__maxPageIndex = Math.ceil(this.totalBids/this.pageSize);
		this.__buildDisplayer();
		this.__buildMonitor();
		this.__buildPageTurner();
		this.__refresh();
	}
};

var jskitPager = new JskitPager("jskitPager");
jskitPager.totalBids = 1000;
jskitPager.pageSize = 50;
jskitPager.txtPageBegin	= "首页";
jskitPager.txtPagePrevious	= "前一页";
jskitPager.txtPageNext		= "后一页";
jskitPager.txtPageEnd		= "末页";
