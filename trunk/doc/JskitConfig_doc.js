/*****************************************************
 *
 * JsKit configuation
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ******************************************************/
/*#BEGIN( Global definition )*/
if(typeof(jskitLog)=="object"){
	jskitEvents.ready("onresize", "jskitLog.pageOnResize");
	jskitEvents.ready("onscroll", "jskitLog.pageOnScroll");
}
/*#END*/

/*#BEGIN( JskitLog@"base/JskitLog.js" )*/
jskitLog.setLevel(4); //default is "false"
/*#END*/

/*#BEGIN( JskitDynamic@"base/JskitDynamic.js" )*/
//set which tagName of the object can be moved
/*#END*/

/*#BEGIN( jskitSpirit@"page/jskitSpirit.js" ) */
/*#END*/

/*#BEGIN( JskitValidation@"page/JskitValidation.js" )*/
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
if (typeof(JskitSpirit) != "undefined") {
    var jskitSpirit = new JskitSpirit();
    jskitEvents.ready("onMouseMove", "jskitSpirit.onMouseMove");
    jskitEvents.ready("onKeyDown", "jskitSpirit.beginCountSpan");
    jskitEvents.ready("onKeyUp", "jskitSpirit.endCountSpan");
}
/*#END*/

/////////////////////////// PLUGIN ///////////////////////////////////////
/*#BEGIN ( plugins )*/
/*
 * scriptEditor
 */
//jskitLoad.loadScript("plugin/scripts/JskitScriptEditor.js");

/*
 * xmenu: site column editor
 */
//jskitLoad.loadScript("plugin/xmenu/JskitXMenu.js");

/*
 * syntax:
 * we use SyntaxHighlighter as jskitSyntax plugin, get move infomations about SyntaxHighlighter:
 * http://www.dreamprojections.com/SyntaxHighlighter/
 */
//jskitLoad.loadScript("plugin/syntax/JskitSyntax.js");
//jskitSyntax.configuation.codeName = "JskitSyntax_code";//default is "JskitSyntax_code"

/*#END*/
/////////////////////////////////////////////////////////////////////////
//#Begin show menu tree ///////////////////////////////////////////////////
var tree = new JskitTree("tree");
tree.setPath(jskitUtil.url.getPath("doc/"));
tree.setTarget("frame_main");
var n0 = tree.newNode();

var np;
np = tree.newNode(n0, true, "Read First!", "");
	tree.newNode(np, true, "About", "about.html");
	tree.newNode(np, true, "Download", "download.html");
	tree.newNode(np, true, "JS extend", "tutorial/JskitObject.html");
	tree.newNode(np, true, "How to start", "tutorial/start.html");
	tree.newNode(np, true, "Global definition", "tutorial/global.html");

var n3 = tree.newNode(n0, false, "Tutorial", "");
    var n34 = tree.newNode(n3, false, "base/", "");
        var n341 = tree.newNode(n34, true, "JskitBase.js", "tutorial/JskitBase.html");
        var n344 = tree.newNode(n34, true, "JskitCalendar.js", "tutorial/JskitCalendar.html");
        var n345 = tree.newNode(n34, true, "JskitDataSet.js", "tutorial/JskitDataSet.html");
        var n353 = tree.newNode(n34, true, "JskitDynamic.js", "tutorial/JskitDynamic.html");
        var n346 = tree.newNode(n34, true, "JskitEvents.js", "tutorial/JskitEvents.html");
        var n347 = tree.newNode(n34, true, "JskitLog.js", "tutorial/JskitLog.html");
        var n342 = tree.newNode(n34, true, "JskitUtil.js", "tutorial/JskitUtil.html");
        var n343 = tree.newNode(n34, true, "JskitXml.js", "tutorial/JskitXml.html");
    var n35 = tree.newNode(n3, false, "page/", "");
        var n351 = tree.newNode(n35, true, "JskitAnimation.js", "tutorial/JskitAnimation.html");
        var n352 = tree.newNode(n35, true, "JskitContextMenu.js", "tutorial/JskitContextMenu.html");
        var n35b = tree.newNode(n35, true, "JskitEffects.js", "tutorial/JskitEffects.html");
        var n359 = tree.newNode(n35, true, "JskitIWindow.js", "tutorial/JskitIWindow.html");
        var n35a = tree.newNode(n35, true, "JskitMenu.js", "tutorial/JskitMenu.html");
        var n355 = tree.newNode(n35, true, "JskitPager.js", "tutorial/JskitPager.html");
        var n357 = tree.newNode(n35, true, "JskitToolbar.js", "tutorial/JskitToolbar.html");
        var n358 = tree.newNode(n35, true, "JskitTree.js", "tutorial/JskitTree.html");
        var n359 = tree.newNode(n35, true, "JskitTable.js", "tutorial/JskitTable.html");
    var n3a = tree.newNode(n3, false, "model/", "");
        var n3a1 = tree.newNode(n3a, true, "JskitForm.js", "tutorial/JskitForm.html");
        var n3a2 = tree.newNode(n3a, true, "JskitList.js", "tutorial/JskitList.html");
        var n3a3 = tree.newNode(n3a, true, "JskitValidation.js", "tutorial/JskitValidation.html");
        var n3a4 = tree.newNode(n3a, true, "JskitDateSelector.js", "tutorial/JskitDateSelector.html");
		var n3a5 = tree.newNode(n3a, true, "Controls/", "");
			var n3a51 = tree.newNode(n3a5, true, "JskitRichDropDownList.js", "tutorial/JskitRichDropDownList.html");
    var n37 = tree.newNode(n3, false, "server/", "");
        var n371 = tree.newNode(n37, true, "JskitMd5.js", "tutorial/JskitTaskTimer.html");
        var n372 = tree.newNode(n37, true, "JskitTaskTimer.js", "tutorial/JskitTaskTimer.html");
        var n373 = tree.newNode(n37, true, "JskitXmlHttp.js", "tutorial/JskitXmlHttp.html");
        var n374 = tree.newNode(n37, true, "JskitTask.js", "tutorial/JskitTask.html");
    var n3b = tree.newNode(n3, false, "tools/", "");
        tree.newNode(n3b, true, "JskitSpirit.js", "tutorial/JskitSpirit.html");
    var n3z = tree.newNode(n3, false, "File Index", "tutorial/fileIndex.html");
    var n32 = tree.newNode(n3, true, "JskitLoad.js", "tutorial/JskitLoad.html");
    var n33 = tree.newNode(n3, true, "JskitConfig.js", "tutorial/JskitConfig.html");

np = tree.newNode(n0, false, "Demo", "");
    tree.newNode(np, true, "对象拖动和改变大小", "demo/demo_dynamic.html");
	tree.newNode(np, true, "对象的动态移动", "demo/demo_animation.html");
	tree.newNode(np, true, "表单验证", "demo/demo_JskitValidation.html");
	tree.newNode(np, true, "翻页器", "demo/demo_JskitPager.html");
    tree.newNode(np, true, "日期输入控件", "demo/date_selector.html");
	tree.newNode(np, true, "显示日历", "demo/demo_calendar.html");
	tree.newNode(np, true, "显示多级菜单和目录树", "demo/demo_menu.html");
    tree.newNode(np, true, "倒计时器", "demo/timer.html");
    tree.newNode(np, true, "顺序执行任务", "demo/task.html");
    tree.newNode(np, true, "页面效果", "demo/effects.html");
    tree.newNode(np, true, "显示一个相册", "demo/demo_JskitAlbum.html");
    tree.newNode(np, true, "级联菜单", "demo/demo_richselect.html");

np = tree.newNode(n0, false, "Tools", "");
    tree.newNode(np, true, "日志(调试)工具", "tools/jskitLog.html");
    tree.newNode(np, true, "设定弹开窗口", "tools/winopen.html");
    tree.newNode(np, true, "字符串编码", "tools/escape.html");
    tree.newNode(np, true, "测试正则表达式", "tools/regex.html");
    tree.newNode(np, true, "MD5加密", "tools/md5.html");
    tree.newNode(np, true, "标准化命名", "tools/NameSDDT.html");
    tree.newNode(np, true, "颜色板", "tools/ColorPanel.html");
    tree.newNode(np, true, "Get-Set生成器", "tools/getSetBuilder.html");
    tree.newNode(np, true, "XPath测试", "tools/xpath_test.html");
np = tree.newNode(n0, false, "Lab", "");
    tree.newNode(np, true, "Web Cell", "lab/webcell.html");
	tree.newNode(np, true, "数组排序", "lab/array_sort.html");
    tree.newNode(np, true, "双色球选号器", "lab/lottery.html");


np = tree.newNode(n0, false, "PlugIn", "");
	tree.newNode(np, true, "Lunar Calendar", "plugin/lunarCalendar.html");
	tree.newNode(np, true, "Syntax", "plugin/syntax.html");

np = tree.newNode(n0, false, "Editor", "");
	tree.newNode(np, true, "构造多级菜单", "editor/JskitMenuMaker.html");


np = tree.newNode(n0, true, "Reference", "");
    tree.newNode(np, true, "ANSI Characters", "reference/ANSICharacters.html");
	tree.newNode(np, true, "browsers", "reference/browsers.html");
    tree.newNode(np, true, "ServerVariables", "reference/ServerVariables.html");
	tree.newNode(np, true, "ContentType", "reference/contentType.html");
	tree.newNode(np, true, "IE&amp;Firefox", "reference/ievsff.html");
	tree.newNode(np, true, "Meta Reference", "reference/ref_meta.html");
	tree.newNode(np, true, "Regex expression", "reference/regex.html");
	tree.newNode(np, true, "Resource", "reference/resource.html");
    tree.newNode(np, true, "Typeof", "reference/typeof.html");

np = null;
//#End show menu tree ///////////////////////////////////////////////////
