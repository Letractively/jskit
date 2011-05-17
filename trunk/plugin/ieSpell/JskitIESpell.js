/*****************************************************
*
* JsKit ie spell 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
function JskitIESpell(){
	this.configuation = new this.__configuation();
	this.message = new jskitUtil.Message();
}

JskitIESpell.prototype.__configuation = function(){
};

//------------------------------------------------
JskitIESpell.prototyoe.check = function(rElement){
	if(!jskitUtil.browser.isIE){
		alert("your browser is not MSIE, can't use ieSpell");
		return;
	}
	try {
		var ieSpell = new ActiveXObject("ieSpell.ieSpellExtension");
		ieSpell.CheckDocumentNode(rElement);
	} catch (e) {
		if (e.number == -2146827859) {
			if (confirm("ieSpell not detected. Click OK to go to download page."))
				window.open('http://www.iespell.com/download.php', 'ieSpellDownload', '');
		} else
			alert("Error Loading ieSpell:["+e.number+"]" + e.message );
	}
}
//------------------------------------------------

var jskitIESpell = new JskitIESpell();
