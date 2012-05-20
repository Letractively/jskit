var jskitBulter = new JskitBulter();
var jskitValidation = null;
var jskitDateSelector = null;
jskitBulter.init = function(){
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
		jskitDateSelector.setWeekendCssClass("jds_weekend");   
		jskitDateSelector.setTodayCssClass("jds_today");
		jskitDateSelector.setDateName("日", "一", "二","三","四","五","六");
	}
	if(typeof(PageOnLoad)=="function"){PageOnLoad();}
};
jskitEvents.ready("onload","jskitBulter.init");