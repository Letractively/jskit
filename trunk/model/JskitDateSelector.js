/*****************************************************
 *
 * Jskit Date Selector
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 * #Requied   : base/*
 *            : page/JskitTable.js
 *
 ******************************************************/
var JskitDateSelector = function(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitDateSelector";
    var __jc = new JskitCalendar();
    var __jt = new JskitTable();
    __jt.setAction("onclick", __hd + ".__onClick");
    var __dateName = ["Su", "Mo", "Tu","We","Th","Fr","St"];
    var __dayListInCalendar = null;
    var __mode = "d";//d:date,m:month,t:time,dt,date+time

	var __canvas = null;
    var __canvasId = jskitUtil.guid();
    var __canvasCssClass = "border:1px solid #aaaaaa;background-color:#eeeeee;";
    var __calendarTitleCssClass = "";
	var __calendarTimeBoxCssClass = "";
    var __caller = null;
    var __format = "yyyy-MM-dd";
    var __yearSelector = null;

	var __CssWeekend = "";
	var __CssToday= "";
	
	var __datetime = null;
	var __autoCallback = true;
	var __selectedHandler = null;
		var __getMonthCellText = function(rowIdx,colIdx){
		var m = rowIdx*4+colIdx;
		if(m<10){
			return "0"+m+unescape("%u6708");
		}else{
			return m+unescape("%u6708");
		}
	};
	var __getMonthCalendarCode = function(){
        var _str = new Array();
        _str.push('<table ' + __canvasCssClass + '>');
        _str.push('	<tr>');
        _str.push('		<td>');
        _str.push('			<a href="javascript:' + __hd + '.__goPrevYear()">&#9668;&#9668;</a>');
        _str.push('		</td>');
        _str.push('		<td align="center">');
        _str.push('			<div id="info" ' + __calendarTitleCssClass + '>');
        _str.push('			<input type="text" size="4" maxlength="4" onkeyup="' + __hd + '.selectYear(this,event)" value="'+__jc.getYear()+'" />');
		_str.push('			</div>');
		_str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.__goNextYear()">&#9658;&#9658;</a>');
        _str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.selectNow()" title="'+unescape("%u9009%u62E9%u5F53%u524D%u6708%u4EFD")+'" style="font-family:arial;font-size:14px;font-weight:normal;">&#9788;&nbsp;</a>');
        _str.push('		</td>');
		_str.push('	</tr>');
        _str.push('	<tr>');
        _str.push('		<td colspan="4">');
        _str.push('			<div id="'+__canvasId+'_body">');
        //_str.push(__jt.getTableHtml(false,__jc.getMonth()));
        _str.push('			</div>');
        _str.push('		</td>');
        _str.push('	</tr>');
		_str.push('</table>');
		return _str.join('');
	};

	//date select content
    var __getDateCalendarCode = function() {
        var _str = new Array();
        _str.push('<table ' + __canvasCssClass + '>');
        _str.push('	<tr>');
        _str.push('		<td>');
        _str.push('			<a href="javascript:' + __hd + '.__goPrevYear()">&#9668;&#9668;</a>');
		_str.push('		</td><td>');
        _str.push('			&nbsp;<a href="javascript:' + __hd + '.__goPrev()">&#9668;</a>');
        _str.push('		</td>');
        _str.push('		<td align="center">');
        _str.push('			<div id="info" ' + __calendarTitleCssClass + '>');
        _str.push('			<input type="text" size="4" maxlength="4" onkeyup="' + __hd + '.selectYear(this,event)" value="'+__jc.getYear()+'" />');
        _str.push('-');
        _str.push('<select onchange="' + __hd + '.selectMonth(this,event)" >');
        for (var i = 1; i <= 12; i++) {
            if (i != __jc.getMonth()) {
                _str.push('<option value="' + i + '">' + i + '</option>');
            } else {
                _str.push('<option value="' + i + '" selected="selected">' + i + '</option>');
            }
        }
        _str.push('</select>');
        _str.push('			</div>');
        _str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.__goNext()">&#9658;</a>');
		_str.push('		</td><td>');
        _str.push('			&nbsp;<a href="javascript:' + __hd + '.__goNextYear()">&#9658;&#9658;</a>');
        _str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.selectNow()" title="'+unescape("%u9009%u62E9%u5F53%u524D%u65E5%u671F%u65F6%u95F4")+'" style="font-family:arial;font-size:14px;font-weight:normal;">&#9788;&nbsp;</a>');
        //_str.push('			<a href="javascript:' + __hd + '.__close()">[X]</a>');
        _str.push('		</td>');
        _str.push('	</tr>');
        _str.push('	<tr>');
        _str.push('		<td colspan="6">');
        _str.push('			<div id="'+__canvasId+'_body">');
        _str.push('			</div>');
        _str.push('		</td>');
        _str.push('	</tr>');
		if(__mode=="dt"){
			var _h = 0;
			var _m = 0;
			var _s = 0;
			if(__datetime!=null && !isNaN(__datetime) && /Date/.test(__datetime.constructor)){
				_h = __datetime.getHours();
				_m = __datetime.getMinutes();
				_s = __datetime.getSeconds();
			}else{
				var _now = new Date();
				_h = _now.getHours();
				_m = _now.getMinutes();
				_s = _now.getSeconds();
				_now = null;
			}
			_str.push('	<tr>');
			_str.push('		<td colspan="6">');
			_str.push('			<div id="jds_time_box" class="'+__calendarTimeBoxCssClass+'">');
			_str.push('<select id="'+__hd+'_t_h">');
			for(var i=0;i<24;i++){
				if(i==_h){
					_str.push('<option value="'+i+'" selected="selected">'+i+'</option>');
				}else{
					_str.push('<option value="'+i+'">'+i+'</option>');
				}
			}
			_str.push('</select>');
			_str.push(':');
			_str.push('<select id="'+__hd+'_t_m">');
			for(var i=0;i<60;i++){
				if(_m==i){
					_str.push('<option value="'+i+'" selected="selected">'+i+'</option>');
				}else{
					_str.push('<option value="'+i+'">'+i+'</option>');
				}
			}
			_str.push('</select>');
			_str.push(':');
			_str.push('<select id="'+__hd+'_t_s">');
			for(var i=0;i<60;i++){
				if(_s==i){
					_str.push('<option value="'+i+'" selected="selected">'+i+'</option>');
				}else{
					_str.push('<option value="'+i+'">'+i+'</option>');
				}
			}
			_str.push('</select>');
			_str.push('&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:'+__hd+'.seletctDateTime(this,event);" >['+unescape("%u786E%u5B9A")+']</a>');
			_str.push('			</div>');
			_str.push('		</td>');
			_str.push('	</tr>');
		}
        _str.push('</table>');
		return _str.join('');
	};
	var __cellIdFix = jskitUtil.guid();
	var __jtCellData = function(rVal){
		if(rVal=='' || rVal==null){
			return '';
		}else{
			return '<div id="'+__jcCellId(rVal)+'">'+rVal+'</div><div id="'+__jcCellId(rVal)+'ext">'+__defaultMark+'</div>';
		}
	};
	var __jcCellId =  function(rDay){
		return __cellIdFix+"d"+rDay;
	};
	
	this.markIn = function(rDay,rContent){
		var _cell = $("#"+__jcCellId(rDay)+"ext");
		if(_cell!=null){
			_cell.innerHTML = rContent;
		}
	};
	var __defaultMark = "";
	this.setDefaultMark = function(rContent){
		__defaultMark = rContent;
	};

	var __getCalendarBody = function(){
		if(__mode=="m"){
			for(var i=0;i<3;i++){
				__jt.insert(__getMonthCellText(i,1), __getMonthCellText(i,2),__getMonthCellText(i,3),__getMonthCellText(i,4));
			}
			return __jt.getTableHtml(false,__jc.getMonth());
		}else{
			__jt.setColumnCssClass(__dateName[0], __CssWeekend);
			__jt.setColumnCssClass(__dateName[6], __CssWeekend);
			__dayListInCalendar = __jc.getCalendarList();
			var _currRowIdx = -1;
			var _currColIdx = -1;
			var _today = (__datetime!=null)?__datetime.getDate():__jc.getDay();
			for (var i = 0; i < __dayListInCalendar.length; i++) {
				var _w = __dayListInCalendar[i];
				if(_currRowIdx<0 && _currColIdx<0){
					for(var j=0;j<7;j++){
						if(_w[j]== _today){
							_currRowIdx = i;
							_currColIdx = j;
							break;
						}
					}
				}
				__jt.insert(__jtCellData(__getCell(_w[0]))
					, __jtCellData(__getCell(_w[1]))
					, __jtCellData(__getCell(_w[2]))
					, __jtCellData(__getCell(_w[3]))
					, __jtCellData(__getCell(_w[4]))
					, __jtCellData(__getCell(_w[5]))
					, __jtCellData(__getCell(_w[6]))
					);
			}
			_today = null;
			if(_currRowIdx>=0 && _currColIdx>=0 && __CssToday!=null){
				__jt.setCellCssClass(_currRowIdx,_currColIdx,__CssToday);
			}
			return __jt.getTable();
		}
	};
	var __refreshCalendar = function(){
        __jt.clear();
		$("#"+__canvasId+"_body").innerHTML = __getCalendarBody();
	};
	var __getCalendarCode = function(){
		if(__mode=="m"){
			return __getMonthCalendarCode();
		}else if(__mode=="d" || __mode=="dt"){
			return __getDateCalendarCode();
		}
		return "";
	};
	var __drawCalendar = function(){
		__canvas.innerHTML = __getCalendarCode();
		__refreshCalendar();
	};
	this.getCalendarBodyHTML = function(){
        __jt.clear();
		return __getCalendarBody();
	};
    var __getCell = function(day) {
        return day;
    };
    var __appendCanvas = function() {
        __canvas = $("#" + __canvasId);
        if (__canvas == null) {
            __canvas = document.createElement("div");
            $("body").appendChild(__canvas);
            __canvas.setAttribute("id", __canvasId);
            __canvas.style.display = "none";
            __canvas.style.clear = "left";
            __canvas.style.position = "absolute";
			__canvas.className = "jds_canvas_top";
        }
    };
    var __dateSelect = function() {
        if (__canvas == null){
			__appendCanvas();
		}
        __canvas.style.clear = "left";
        __canvas.style.position = "absolute";
        __drawCalendar();
        __canvas.style.left = $(__caller).getX()+"px";
        __canvas.style.top = ($(__caller).getY() + __caller.offsetHeight)+"px";
        __canvas.style.display = "";
		__canvas.style.zIndex = 1000;
    };
	var __numberFix = function(rNum){
        return (rNum < 10) ? "0" + rNum : rNum + "";
    };
	var __getValue = function(){
		return __datetime.toString(__format);
	};
    var __close = function() {
		__selectedCell = null;
        if (__canvas == null){return;}
        __canvas.style.display = "none";
    };
    this.__goNext = function() {
        __jc.nextMonth();
		__datetime.setMonth(__jc.getMonth()-1);
        __drawCalendar();
    };
    this.__goNextYear = function() {
        __jc.nextYear();
		__datetime.setYear(__jc.getYear());
        __drawCalendar();
    };
    this.__goPrev = function() {
        __jc.prevMonth();
		__datetime.setMonth(__jc.getMonth()-1);
        __drawCalendar();
    };
    this.__goPrevYear = function() {
        __jc.prevYear();
		__datetime.setYear(__jc.getYear());
        __drawCalendar();
    };
    this.__close = function(){
        __close();
    };
	this.setMode = function(v){
		if(v.toLowerCase()=="d" || v=="0" || v==0){
			__mode = "d";
			__format = "yyyy-MM-dd";
		    __jt.setColumns(__dateName[0],__dateName[1],__dateName[2],__dateName[3],__dateName[4],__dateName[5],__dateName[6]);
		}else if(v.toLowerCase()=="dt" || v=="3" || v==3){
			__mode = "dt";
			__format = "yyyy-MM-dd hh:mm:ss";
		    __jt.setColumns(__dateName[0],__dateName[1],__dateName[2],__dateName[3],__dateName[4],__dateName[5],__dateName[6]);
		}else if(v.toLowerCase()=="m" || v=="1" || v==1){
			__mode = "m";
			__format = "yyyy-MM";
		    __jt.setColumns("1", "2", "3", "4");
		}else{
			__mode = null;
		}
	};
	this.getMode = function(){
		return __mode;
	};

    this.setTableCssClass = function(v) {
        __jt.setTableCssClass(v);
    };
    this.setCanvasCssClass = function(v) {
        if(typeof(v)=="string" && v.length>0){
            __canvasCssClass = 'class="'+v+'" ';
        }
    };
    this.setCalendarTitleCssClass = function(v) {
        if(typeof(v)=="string" && v.length>0){
            __calendarTitleCssClass = 'class="'+v+'" ';
        }
    };
    this.setTHeadCssClass = function(v) {
        __jt.setTHeadCssClass(v);
    };
    this.setTBodyCssClass = function(v) {
        __jt.setTBodyCssClass(v);
    };
	this.setTodayCssClass = function(v){
		__CssToday = v;
	};
	this.setTimeBoxCssClass = function(v){
		__calendarTimeBoxCssClass = v;
	};
    this.setWeekendCssClass = function(v) {
		__CssWeekend = v;
    };
    this.setFormat = function(v) {
        if (typeof(v) == "string")
            __format = v;
    };
    this.setDateName = function(v0, v1, v2, v3, v4, v5, v6) {
		if(__mode=="d" || __mode=="dt"){
			__dateName = new Array();
			__dateName.push(v0);
			__dateName.push(v1);
			__dateName.push(v2);
			__dateName.push(v3);
			__dateName.push(v4);
			__dateName.push(v5);
			__dateName.push(v6);
			__jt.setColumns(v0, v1, v2, v3, v4, v5, v6);
		}else if(_mode=="m"){
			__jt.setColumns("","","","");
		}
    };
	this.setDate = function(v){
		__jc.setDate(v);
		__datetime = v;
        //alert("jskitDateSelector:"+__datetime.toString("yyyy-MM-dd"));
	};
    this.getJskitCalerdar = function() {
        return __jc;
    };

    var __onSelected = function(){
		var val = __getValue();
		if(__autoCallback && __caller!=null){
			if (__caller.tagName.toLowerCase() == "input"){
				if(__caller.getAttribute("type")==null || __caller.getAttribute("type").toLowerCase()=="text"
					|| __caller.getAttribute("type").toLowerCase()=="hidden"){
					__caller.value = val;
				}else{
					/*do nothing*/
				}
			}else if(__caller.tagName!="button"){
				/*do nothing*/
			}else if(__caller.tagName!="undefined"){
				__caller.innerHTML = val;
				__caller.setAttribute("value",val);
			}else{
				/*do nothing*/
			}
		}
		if(__selectedHandler!=null){
			try{eval(__selectedHandler+"('"+val+"')");}
			catch(e){
				alert("JskitDateSelector:Invoke selectedHandler Exception:"+e.message);
			}
		}
        __close();
	};
	this.__onClick = function(cell) {
		var _row = cell.getAttribute("row").toInt(0);
		var _col = cell.getAttribute("col").toInt(0);
		if(__mode=="dt"){
			var _day = __dayListInCalendar[_row][_col];
			__jc.setDay(_day);
			__datetime.setDate(_day);
			_day = null;
			__refreshCalendar();
		}else if(__mode=="m"){
			var _month = _row*4+_col+1;
			__jc.setMonth(_month);
			__datetime.setMonth(_month-1);
			_month = null;
			__onSelected();
		}else{
			var _day = __dayListInCalendar[_row][_col];
			__jc.setDay(_day);
			__datetime.setDate(_day);
			_day = null;
			__onSelected();
		}
    };
	
	this.selectNow = function(){
		__datetime = new Date();
		__onSelected();
	};
    this.selectMonth = function(sender, e) {
        __jc.setMonth(sender.value);
		__datetime.setMonth(__jc.getMonth()-1);
		__refreshCalendar();
    };
    this.selectYear = function(sender, e) {
		if(isNaN(parseInt(sender.value))){
			sender.value = __datetime.getFullYear();
		}else{
			__jc.setYear(parseInt(sender.value));
			__datetime.setYear(parseInt(sender.value));
			if(__mode!="m"){
				__refreshCalendar();
			}
		}
    };
	this.seletctDateTime  = function(sender,e){
		__datetime.setHours($("#"+__hd+"_t_h").value);
		__datetime.setMinutes($("#"+__hd+"_t_m").value);
		__datetime.setSeconds($("#"+__hd+"_t_s").value);
		__onSelected();
	};
	this.setSelectedHandler = function(v){
		__selectedHandler = v;
	};
	this.setAutoCallback = function(v){
		__autoCallback = (v==="yes" || v===1 || v===true);
	};
    this.appendCanvas = function() {
        __appendCanvas();
    };
	this.openMode = function(sender,e,mode,format,year,month){
		this.setMode(mode);
		this.open(sender,e,format,year,month);
	};
    this.open = function(sender, e, format, year, month) {
		__caller = sender;
		if(sender!=null){
			if(typeof(sender)=="object"){
				__caller = sender;
			}else if(typeof(sender)=="string"){
				__caller = $("#"+sender);
			}
		}
        if (typeof(format) == "string" && format.length > 0){__format = format;}
        if (__autoCallback && __caller.getAttribute("value") != "") {
            __datetime = jskitUtil.date.parse(sender.getAttribute("value"));
            if (__datetime!=null && !isNaN(__datetime) && /Date/.test(__datetime.constructor)) {
                __jc.setYear(__datetime.getFullYear());
                __jc.setMonth(__datetime.getMonth() + 1);
			}else{
				__datetime = new Date();
			}
        } else if(__datetime==null){
			__datetime = new Date();
            if (typeof(year) == "number" && year >= 1) {
                __jc.setYear(year);
				__datetime.setYear(year);
            }else{
				__jc.setYear(__datetime.getFullYear());
			}
            if (typeof(month) == "number" && month <= 12 && month >= 1) {
                __jc.setMonth(month);
				__datetime.setMonth(month-1);
            }else{
				__jc.setMonth(__datetime.getMonth()+1);
			}
        }
        __dateSelect();
    };
    this.close = function(e) {
        __close();
    };
	this.onBodyClick = function(e){
		var fireObj = (e.srcElement!=null)?e.srcElement:e.target;
		if(fireObj!=__caller && !jskitUtil.dom.hasForefather(fireObj,__canvasId) ){
			this.close();
		}
	};
	{
		__jt.setTableCssClass("jds_tableCssClass");
		__jt.setTHeadCssClass("jds_theadCssClass");
		__jt.setTBodyCssClass("jds_tbodyCssClass");
		__jt.setColumns(unescape("%u65E5"), unescape("%u4E00"), unescape("%u4E8C"),unescape("%u4E09"),unescape("%u56DB"),unescape("%u4E94"),unescape("%u516D"));
		__calendarTitleCssClass = "jds_titleCssClass";
		__calendarTimeBoxCssClass = "jds_timeBoxCssClass";
		__canvasCssClass = "jds_canvasCssClass";
		__CssWeekend = "jds_weekend";
		__CssToday = "jds_today";
		__dateName = [unescape("%u65E5"), unescape("%u4E00"), unescape("%u4E8C"),unescape("%u4E09"),unescape("%u56DB"),unescape("%u4E94"),unescape("%u516D")];
		jskitEvents.ready("onclick",__hd+".onBodyClick");
	}
};
