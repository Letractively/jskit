/****************************************************************************
 *
 * JskitDateSelector
 * @author    : AnyRock
 * @email     : jiang.edwon@gmail.com
 * @homepage  : http://www.mending.cn
 * @copyright : Copyright(c)jskit.org,All right reserved
 * @reqired	  : base/*;
 *            : page/JskitTable.js
 ****************************************************************************/
function JskitDateSelector(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitDateSelector";
    var __jc = new JskitCalendar();
    var __jt = new JskitTable();
    var __dayListInCalendar = null;

    var __getContext = function(){
        __dayListInCalendar = __jc.getCalendarList();
        for (var i = 0; i < __dayListInCalendar.length; i++) {
            var _w = __dayListInCalendar[i];
            __jt.insert(__convertDayCell(_w[0]), __convertDayCell(_w[1]), __convertDayCell(_w[2]), __convertDayCell(_w[3]), __convertDayCell(_w[4]), __convertDayCell(_w[5]), __convertDayCell(_w[6]));
        }
		var _html = new Array();
		_html.push("<div>");
		_html.push('<table width="100%"><tr>');
		_html.push('<td>&lt;</td>');
		_html.push('<td><select></select></td>');
		_html.push('<td><select></select></td>');
		_html.push('<td>&gt;</td>');
		_html.push('</tr></table>');
		_html.push('</div>');
		_html.push(__jt.getTable());
        return _html.join('');
    };
    var __convertDayCell = function(day){
		return day;
        if (day == "")             
            return "";
        __jc.lunar.parse(__jc.getYear(), __jc.getMonth(), day);
        var _lf = __jc.lunar.getFestival();
        return day + "<br>" + _lf;
    };
    var __goNext = function(){
        __jc.nextMonth();
        __jt.clear();
        __drawCalendar();
    };
    var __goPrev = function(){
        __jc.prevMonth();
        __jt.clear();
        __drawCalendar();
    };
    var dateSelect = function(obj){
        var _lunar = "";
        var _year = __jc.getYear();
        var _month = __jc.getMonth();
        var _row = obj.getAttribute("row").toInt(0);
        var _col = obj.getAttribute("col").toInt(0);
        var _day = __dayListInCalendar[_row][_col];
        if (!isNaN(_day)) {
            __jc.lunar.parse(__jc.getYear(), __jc.getMonth(), _day);
            _lunar = __jc.lunar.date["GanzhiYear"] + "年" + __jc.lunar.date["MonthText"] + "月" + __jc.lunar.date["DayText"];
        }
        else {
            _lunar = "error";
        }
    };
	this.getContext = function(){
		return __getContext();
	};
	{//constructor
	    __jt.setTableCssClass("tableCssClass");
	    __jt.setTHeadCssClass("theadCssClass");
	    __jt.setTBodyCssClass("tbodyCssClass");
	    
	    __jt.setColumns("日", "一", "二", "三", "四", "五", "六");
	    __jt.setColumnCssClass("日", "weekend");
	    __jt.setColumnCssClass("六", "weekend");
	    
	    //__jt.setAction("onclick", "dateSelect");
	};
};
