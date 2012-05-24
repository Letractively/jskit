/*****************************************************
 *
 * JsKit configuation
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 ******************************************************/
$import.js("../release/jskit.ui.js");
$import.js("../release/jskit.tools.js");
$import.css("../release/style/JskitBaseStyle.css");
$import.js("../plugin/syntax/JskitSyntax.js");
//#END =====================================================================
$import.js("../doc/JskitDocument.js");
$import.css("../release/style/jskitBaseStyle.css");
$import.css("../release/style/JskitBulter.css");
$import.css("../release/style/JskitMenu.css");
$import.css("../release/style/JskitDateSelector.css");
$import.css("../release/style/JskitAreaSelector.css");
$import.css("../release/style/JskitSlidAd.css");
$import.css("../release/style/JskitSmartAD_VRoll.css");
$import.css("../release/style/JskitControls.css");

var tree = null;
var jskitToolbar = null;
var jskitSyntax = null;
var jskitSpirit = null;
var myConfig = function(){
/*#BEGIN( Global definition )*/
if(typeof(jskitLog)=="object"){
	jskitEvents.ready("onresize", "jskitLog.pageOnResize");
	jskitEvents.ready("onscroll", "jskitLog.pageOnScroll");
}
/*#END*/

/*#BEGIN( JskitLog@"base/JskitLog.js" )*/
jskitLog.setLevel(4); //default is "false"
/*#END*/

/*#BEGIN( JskitToolbar )*/
if (typeof(JskitToolbar) != "undefined") {
    jskitToolbar = new JskitToolbar();
}
/*#END*/

/*#BEGIN( JskitSyntax )*/
if (typeof(JskitSyntax) != "undefined") {
    jskitSyntax = new JskitSyntax();
    jskitEvents.ready("onload", "jskitSyntax.display");
}
/*#END*/

/*#BEGIN( others )*/
if (typeof(JskitSpirit) != "undefined") {
    jskitSpirit = new JskitSpirit();
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
//$import.js("plugin/scripts/JskitScriptEditor.js");

/*
 * xmenu: site column editor
 */
//$import.js("plugin/xmenu/JskitXMenu.js");

/*
 * syntax:
 * we use SyntaxHighlighter as jskitSyntax plugin, get move infomations about SyntaxHighlighter:
 * http://www.dreamprojections.com/SyntaxHighlighter/
 */
//$import.js("plugin/syntax/JskitSyntax.js");
//jskitSyntax.configuation.codeName = "JskitSyntax_code";//default is "JskitSyntax_code"

/*#END*/
/////////////////////////////////////////////////////////////////////////
//#Begin show menu tree ///////////////////////////////////////////////////
tree = new JskitTree("tree");
tree.setPath(jskitUtil.url.getPath("doc/"));
tree.setTarget("frame_main");
var n0 = tree.newNode();

var np,n2,n3,n4;
np = tree.newNode(n0, true, "Read First!", "");
	tree.newNode(np, true, "开始使用", "tutorial/start.html");
	tree.newNode(np, true, "JS内部对象扩展", "tutorial/JskitObject.html");
	tree.newNode(np, true, "全局对象", "tutorial/global.html");

np = tree.newNode(n0, true, "Demo", "");
    n2 = tree.newNode(np, false, "动画", "");
        tree.newNode(n2, true, "对象拖动和改变大小", "demo/demo_dynamic.html");
	    tree.newNode(n2, true, "对象的动态移动", "demo/demo_animation.html");
	    tree.newNode(n2, true, "页面效果", "demo/effects.html");
	n2 = tree.newNode(np, false, "表单和控件", "");
    	tree.newNode(n2, true, "表单验证", "demo/demo_JskitValidation.html");
	    tree.newNode(n2, true, "翻页器", "demo/demo_JskitPager.html");
        tree.newNode(n2, true, "日期输入控件", "demo/date_selector.html");
        tree.newNode(n2, true, "高级下拉列表", "demo/demo_richselect.html");
        tree.newNode(n2, true, "菜单和树", "demo/demo_menu.html");
        tree.newNode(n2, true, "数据表视图", "demo/demo_gridview.html");
    n2 = tree.newNode(np, false, "集成效果", "");
        tree.newNode(n2, true, "倒计时器", "demo/timer.html");
        tree.newNode(n2, true, "顺序执行任务", "demo/task.html");
        tree.newNode(n2, true, "显示日历", "demo/demo_calendar.html");
        tree.newNode(n2, true, "显示一个相册", "demo/demo_JskitAlbum.html");
    n2 = tree.newNode(np, false, "广告组件", "");
        tree.newNode(n2, true, "轮显广告", "demo/demo_JskitSlidAd.html");
        tree.newNode(n2, true, "滚动图片组", "demo/demo_JskitSmartAD_VRoll.html");
    n2 = tree.newNode(np, false, "其他组件", "");

np = tree.newNode(n0, true, "Tools", "");
    tree.newNode(np, true, "日志(调试)工具", "tools/jskitLog.html");
    tree.newNode(np, true, "设定弹开窗口", "tools/winopen.html");
    tree.newNode(np, true, "字符串编码", "tools/escape.html");
    tree.newNode(np, true, "测试正则表达式", "tools/regex.html");
    tree.newNode(np, true, "MD5加密", "tools/md5.html");
    tree.newNode(np, true, "标准化命名", "tools/NameSDDT.html");
    tree.newNode(np, true, "颜色板", "tools/ColorPanel.html");
    tree.newNode(np, true, "Get-Set生成器", "tools/getSetBuilder.html");
    tree.newNode(np, true, "XPath测试", "tools/xpath_test.html");
    tree.newNode(np, true, "日期计算", "tools/date_counter.html");
np = tree.newNode(n0, false, "Reference", "");
	tree.newNode(np, true, "This is JS!", "reference/thisisjs.html");
	tree.newNode(np, true, "ANSI 字符表", "reference/ANSICharacters.html");
    tree.newNode(np, true, "ServerVariables", "reference/ServerVariables.html");
	tree.newNode(np, true, "ContentType", "reference/contentType.html");
	tree.newNode(np, true, "Meta参考", "reference/ref_meta.html");
	tree.newNode(np, true, "正则表达式", "reference/regex.html");
	tree.newNode(np, true, "网站资源", "reference/resource.html");
    tree.newNode(np, true, "KeyCode速查表", "reference/keyCode.html");
    tree.newNode(np, true, "Typeof", "reference/typeof.html");

np = tree.newNode(n0, false, "Tutorial", "");
    n2 = tree.newNode(np, false, "core/", "");
	    tree.newNode(n2, true, "JskitImport.js", "tutorial/JskitLoad.html");
        tree.newNode(n2, true, "JskitBase.js", "tutorial/JskitBase.html");
        tree.newNode(n2, true, "JskitCalendar.js", "tutorial/JskitCalendar.html");
        tree.newNode(n2, true, "JskitDataSet.js", "tutorial/JskitDataSet.html");
        tree.newNode(n2, true, "JskitDynamic.js", "tutorial/JskitDynamic.html");
        tree.newNode(n2, true, "JskitEvents.js", "tutorial/JskitEvents.html");
        tree.newNode(n2, true, "JskitLog.js", "tutorial/JskitLog.html");
        tree.newNode(n2, true, "JskitUtil.js", "tutorial/JskitUtil.html");
        tree.newNode(n2, true, "JskitXml.js", "tutorial/JskitXml.html");
        tree.newNode(n2, true, "JskitTaskTimer.js", "tutorial/JskitTaskTimer.html");
        tree.newNode(n2, true, "JskitXmlHttp.js", "tutorial/JskitXmlHttp.html");
        tree.newNode(n2, true, "JskitTask.js", "tutorial/JskitTask.html");
    n2 = tree.newNode(np, false, "ui/", "");
        tree.newNode(n2, true, "JskitAnimation.js", "tutorial/JskitAnimation.html");
        tree.newNode(n2, true, "JskitContextMenu.js", "tutorial/JskitContextMenu.html");
        tree.newNode(n2, true, "JskitEffects.js", "tutorial/JskitEffects.html");
        tree.newNode(n2, true, "JskitIWindow.js", "tutorial/JskitIWindow.html");
        tree.newNode(n2, true, "JskitMenu.js", "tutorial/JskitMenu.html");
        tree.newNode(n2, true, "JskitPager.js", "tutorial/JskitPager.html");
        tree.newNode(n2, true, "JskitToolbar.js", "tutorial/JskitToolbar.html");
        tree.newNode(n2, true, "JskitTree.js", "tutorial/JskitTree.html");
        tree.newNode(n2, true, "JskitTable.js", "tutorial/JskitTable.html");
        tree.newNode(n2, true, "JskitForm.js", "tutorial/JskitForm.html");
        tree.newNode(n2, true, "JskitValidation.js", "tutorial/JskitValidation.html");
		n3 = tree.newNode(n2, true, "selector", "");
			tree.newNode(n3, true, "JskitAreaSelector.js", "tutorial/JskitAreaSelector.html");
			tree.newNode(n3, true, "JskitDateSelector.js", "tutorial/JskitDateSelector.html");
		n3 = tree.newNode(n2, true, "controls/", "");
			tree.newNode(n3, true, "JskitRichDropDownList.js", "tutorial/JskitRichDropDownList.html");
			tree.newNode(n3, true, "JskitGridView.js", "tutorial/JskitGridView.html");
		n3 = tree.newNode(n2, true, "ad/", "");
			tree.newNode(n3, true, "JskitSlidAd.js", "tutorial/JskitSlidAd.html");
			tree.newNode(n3, true, "JskitSmartAD_VRoll.js", "tutorial/JskitSmartAD_VRoll.html");

    n2 = tree.newNode(np, false, "tools/", "");
        tree.newNode(n2, true, "JskitSpirit.js", "tutorial/JskitSpirit.html");
    tree.newNode(np, false, "File Index", "tutorial/fileIndex.html");
    tree.newNode(np, true, "JskitConfig.js", "tutorial/JskitConfig.html");

np = tree.newNode(n0, false, "Lab", "");
    tree.newNode(np, true, "Web Cell", "lab/webcell.html");
	tree.newNode(np, true, "数组排序", "lab/array_sort.html");
    tree.newNode(np, true, "双色球选号器", "lab/lottery.html");
np = tree.newNode(n0, false, "PlugIn", "");
	tree.newNode(np, true, "Lunar Calendar", "plugin/lunarCalendar.html");
	tree.newNode(np, true, "Syntax", "plugin/syntax.html");
tree.out($$("#jskit_doc_tree"));
np = null;

//#End show menu tree ///////////////////////////////////////////////////
};
jskitEvents.ready("onload","myConfig");
