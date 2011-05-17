/*****************************************************
*
* JsKit configuation
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
******************************************************/
/*#BEGIN( JskitLog@"base/JskitLog.js" )*/
jskitEvents.ready("onresize","jskitLog.pageOnResize");
jskitEvents.ready("onscroll","jskitLog.pageOnScroll");
/*#END*/

/*#BEGIN( jskitContextMenu@"page/jskitSpirit.js" )*/
var jskitContextMenu = new JskitContextMenu();
jskitEvents.ready("oncontextmenu","jskitContextMenu.open");
jskitEvents.ready("onclick","jskitContextMenu.close");
/*#END*/

/*#BEGIN( JskitToolbar )*/
if (typeof(JskitToolbar) != "undefined") {
	var jskitToolbar = new JskitToolbar();
}
/*#END*/

/*#BEGIN( JskitSyntax )*/
if (typeof(JskitSyntax) != "undefined") {
	var jskitSyntax = new JskitSyntax();
	jskitEvents.ready("onload", "jskitSyntax.display");
}
/*#END*/

/*#BEGIN( others )*/
if(typeof(JskitSpirit)!="undefined"){
	var jskitSpirit = new JskitSpirit();
	jskitEvents.ready("onMouseMove","jskitSpirit.onMouseMove");
	jskitEvents.ready("onKeyDown","jskitSpirit.beginCountSpan");
	jskitEvents.ready("onKeyUp","jskitSpirit.endCountSpan");
}
/*#END*/