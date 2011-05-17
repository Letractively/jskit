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
jskitLoad.loadCss("Styles/SyntaxHighlighter.css"	,"/JskitSyntax.js");
jskitLoad.loadScript("Scripts/shCore.js"			,"/JskitSyntax.js");
jskitLoad.loadScript("Scripts/shBrushJScript.js"	,"/JskitSyntax.js");
jskitLoad.loadScript("Scripts/shBrushXml.js"		,"/JskitSyntax.js");
jskitLoad.loadScript("Scripts/shBrushCss.js"		,"/JskitSyntax.js");
jskitLoad.loadScript("Scripts/shBrushVb.js"		,"/JskitSyntax.js");

var JskitSyntax = function(){
	var __codeName = "JskitSyntax_code";
	this.display = function(){
		try{
			//dp.SyntaxHighlighter.ClipboardSwf = '/flash/clipboard.swf'; 
			dp.SyntaxHighlighter.HighlightAll(__codeName);
		}catch(e){}
	};
};