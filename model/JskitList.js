/*****************************************************
*
* Jskit List
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
function JskitList(){
	//#Begin Public Methods
	this.Repeater = function(){
		var __cols = 1;
		var __canvas = null;
		var __xmlDoc = null;
		var __listCssClass = "";
		
		var __listContent = function(){
			if(typeof(__xmlDoc)!="object")return "";
			var _nl = __xmlDoc.selectNodes("//blocks/item");
			if(_nl==null)return "";
			var _s = new Array();
			_s.push('<table cellspacing="0" cellpadding="0" class="'+__listCssClass+'">');
			_s.push('<tr>');
			for(var i=0;i<_nl.length;i++){
				_s.push('<td>'+_nl[i].text+'</td>');
				if(__cols==1 || (i!=0 && (i+1)%__cols==0) ){
					_s.push('</tr>');
					if((i+1)<_nl.length)_s.push('<tr>');
				}
			}
			if(i%__cols!=0){
				for(var j=0;j<__cols-i%__cols;j++){
					_s.push("<td>"+i+"</td>");
				}
				_s.push("</tr>");
			}
			_s.push("</table>");
			var _v = _s.join('');
			_s = rXmlDoc = _nl = null;
			return _v;
		};
		
		this.load = function(src){
			__xmlDoc = jskitXml.load(src);
		};
		this.loadXml = function(src){
			__xmlDoc = jskitXml.loadXml(src);
		};
		this.loadXmlDoc = function(v){
			__xmlDoc = v;
		};
		this.setListCssClass = function(v){
			__listCssClass = v;
		};
		this.setCols = function(rCols){
			__cols = (type(rCols)=="number" && rCols>0)?rCols:1;
		};
		this.setCanvas = function(rElement){
			__canvas = rElement;
		};
		this.listContent = function(){
			return __listContent();
		};
		this.display = function(){
			__canvas.innerHTML = __listContent();
		};
		this.close = function(){
			__xmlDoc = null;
			__cols = 1;
			__canvas = null;
		};
	};
	this.Table = function(){
		
	};
	//#End
}
