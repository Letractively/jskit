/*****************************************************
*
* JskitSyntax
* syntax tool come from :http://www.dreamprojections.com/SyntaxHighlighter
*
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
$import.css("Styles/SyntaxHighlighter.css"	,"/JskitSyntax.js");
$import.js("Scripts/shCore.js"			,"/JskitSyntax.js");
$import.js("Scripts/shBrushJScript.js"	,"/JskitSyntax.js");
$import.js("Scripts/shBrushXml.js"		,"/JskitSyntax.js");
$import.js("Scripts/shBrushCss.js"		,"/JskitSyntax.js");
$import.js("Scripts/shBrushVb.js"		,"/JskitSyntax.js");

var JskitSyntax = function(){
	var __codeName = "JskitSyntax_code";
	this.display = function(){
		try{
			//dp.SyntaxHighlighter.ClipboardSwf = '/flash/clipboard.swf'; 
			dp.SyntaxHighlighter.HighlightAll(__codeName);
		}catch(e){}
	};
};