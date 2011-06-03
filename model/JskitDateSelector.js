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
    var __calendarTitleCssClass = "font-size:11px;font-weight:bold;color:#336699;";
    var __caller = null;
    var __format = null;
    var __yearSelector = null;

	var __CssWeekend = "";
	var __CssToday= "";
	
	var __datetime = null;

	var __drawCalendar = function(){
		if(__mode=="m"){
			__drawMonthCalendar();
		}else if(__mode=="d" || __mode=="dt"){
			__drawDateCalendar();
		}
	};
	var __getMonthCellText = function(rowIdx,colIdx){
		var m = rowIdx*4+colIdx;
		if(m<10){
			return "0"+m+unescape("%u6708");
		}else{
			return m+unescape("%u6708");
		}
	};
	var __drawMonthCalendar = function(){
        var _str = new Array();
        _str.push('<table ' + __canvasCssClass + '>');
        _str.push('	<tr>');
        _str.push('		<td>');
        _str.push('			<a href="javascript:' + __hd + '.__goPrevYear()">&#9668;&#9668;</a>');
        _str.push('		</td>');
        _str.push('		<td align="center">');
        _str.push('			<div id="info" ' + __calendarTitleCssClass + '>');
        _str.push('			<input type="text" style="width:50px" maxlength="5" onkeyup="' + __hd + '.selectYear(this,event)" value="'+__jc.getYear()+'" />');
		_str.push('			</div>');
		_str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.__goNextYear()">&#9658;&#9658;</a>');
        _str.push('		</td>');
        _str.push('		<td align="right">');
        _str.push('			<a href="javascript:' + __hd + '.selectNow()" title="Now">&#9728;&nbsp;</a>');
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
        __canvas.innerHTML = _str.join('');
		__refreshCalendar();
	};
	//date select content
	var __refreshCalendar = function(){
        __jt.clear();
		if(__mode=="m"){
			for(var i=0;i<3;i++){
				__jt.insert(__getMonthCellText(i,1), __getMonthCellText(i,2),__getMonthCellText(i,3),__getMonthCellText(i,4));
			}
			$("#"+__canvasId+"_body").innerHTML = __jt.getTableHtml(false,__jc.getMonth());
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
				__jt.insert(__getCell(_w[0]), __getCell(_w[1]), __getCell(_w[2]), __getCell(_w[3]), __getCell(_w[4]), __getCell(_w[5]), __getCell(_w[6]));
			}
			_today = null;
			if(_currRowIdx>=0 && _currColIdx>=0 && __CssToday!=null){
				__jt.setCellCssClass(_currRowIdx,_currColIdx,__CssToday);
			}

			$("#"+__canvasId+"_body").innerHTML = __jt.getTable();
		}
	};
    var __drawDateCalendar = function() {
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
        _str.push('			<input type="text" style="width:50px" maxlength="5" onkeyup="' + __hd + '.selectYear(this,event)" value="'+__jc.getYear()+'" />');
        _str.push('-');
        _str.push('<select class="' + __calendarTitleCssClass + '" onchange="' + __hd + '.selectMonth(this,event)" >');
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
        _str.push('			<a href="javascript:' + __hd + '.selectNow()" title="Now">&#9728;&nbsp;</a>');
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
			_str.push('			<div id="jds_time_box">');
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
			_str.push('			</div>');
			_str.push('		</td>');
			_str.push('	</tr>');
		}
        _str.push('</table>');
        __canvas.innerHTML = _str.join('');
		__refreshCalendar();
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
        __canvas.style.display = "block";
    };
	var __getValue = function(cell){
		if(cell!=null){
			if(__mode=="d"){
				return __getDate(cell);
			}else if(__mode=="dt"){
				return __getDateTime(cell);
			}else if(__mode=="m"){
				return __getYearMonth(cell);
			}
		}else{
			var _date = new Date();
			if(__mode=="d"){
				return _date.getYear()+"-"+(_date.getMonth()+1)+"-"+_date.getDate();
			}else if(__mode=="dt"){
				return _date.getYear()+"-"+(_date.getMonth()+1)+"-"+_date.getDate()+ " " + _date.getHours()+":"+_date.getMinutes()+":"+_date.getSeconds();
			}else if(__mode=="m"){
				return _date.getYear()+"-"+(_date.getMonth()+1);
			}
		}
	};
	var __getYearMonth = function(cell){
        try {
            var _row = cell.getAttribute("row").toInt(0);
            var _col = cell.getAttribute("col").toInt(0);
            var _year = __jc.getYear();
			var _month = (_row)*4+_col+1;
			var _str = _year+"-"+_month;
			return _str;
        } catch(e) {
            alert("[JskitDateSelector]:" + e.message);
            return "";
        }
	};
	var __getDateTime = function(cell){
        try {
            var _val = __getDate(cell);
			if(_val==null || _val==""){return "";}
			var _hour = $("#"+__hd+"_t_h").value;
			var _min = $("#"+__hd+"_t_m").value;
			var _sec = $("#"+__hd+"_t_s").value;
			_val += " "+_hour+":"+_min+":"+_sec;
			return _val;
        } catch(e) {
            alert("[JskitDateSelector]:" + e.message);
            return "";
        }
	};
    var __getDate = function(cell) {
        try {
            var _row = cell.getAttribute("row").toInt(0);
            var _col = cell.getAttribute("col").toInt(0);
            var _day = __dayListInCalendar[_row][_col];
            var _year = __jc.getYear();
            var _month = __jc.getMonth();
            if (_day == ""){return "";}
            if (__format == null) {
                return _year + "-" + _month + "-" + _day;
            } else {
                var _str = __format;
                _str = _str.replace(/yyyy/gi, _year);
                _str = _str.replace(/yy/gi, _year);
                _str = _str.replace(/mm/gi, _month);
                _str = _str.replace(/m/gi, _month);
                _str = _str.replace(/dd/gi, _day);
                _str = _str.replace(/d/gi, _day);
                return _str;
            }
        } catch(e) {
            alert("[JskitDateSelector]:" + e.message);
            return "";
        }
    };
    var __close = function() {
        if (__canvas == null)return;
        __canvas.style.display = "none";
    };
    this.__goNext = function() {
        __jc.nextMonth();
        __drawCalendar();
    };
    this.__goNextYear = function() {
        __jc.nextYear();
        __drawCalendar();
    };
    this.__goPrev = function() {
        __jc.prevMonth();
        __drawCalendar();
    };
    this.__goPrevYear = function() {
        __jc.prevYear();
        __drawCalendar();
    };
    this.__close = function(){
        __close();
    };
	this.setMode = function(v){
		if(v.toLowerCase()=="d" || v=="0" || v==0){
			__mode = "d";
		    __jt.setColumns(__dateName[0],__dateName[1],__dateName[2],__dateName[3],__dateName[4],__dateName[5],__dateName[6]);
		}else if(v.toLowerCase()=="dt" || v=="3" || v==3){
			__mode = "dt";
		    __jt.setColumns(__dateName[0],__dateName[1],__dateName[2],__dateName[3],__dateName[4],__dateName[5],__dateName[6]);
		}else if(v=="m" || v=="M" || v=="1" || v==1){
			__mode = "m";
			__format = "yyyy-mm";
		    __jt.setColumns("1", "2", "3", "4");
		}else{
			__mode = null;
		}
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
    this.getJskitCalerdar = function() {
        return __jc;
    };
    this.__onClick = function(cell) {
		var _date = __getValue(cell);
		if (__caller.tagName.toLowerCase() == "input"){
			__caller.value = _date;
		}else if(__caller.tagName!="undefined"){
			__caller.innerHTML = _date;
		}else{
			alert(_date);
		}
		_date = null;
        __close();
    };
	this.selectNow = function(){
		var _date = __getValue(null);
		if (__caller.tagName.toLowerCase() == "input"){
			__caller.value = _date;
		}else if(__caller.tagName!="undefined"){
			__caller.innerHTML = _date;
		}else{
			alert(_date);
		}
		_date = null;
        __close();
	};
    this.selectMonth = function(sender, e) {
        __jc.setMonth(sender.value);
		__refreshCalendar();
    };
    this.selectYear = function(sender, e) {
        __jc.setYear(sender.value);
        __refreshCalendar();
    };
    this.appendCanvas = function() {
        __appendCanvas();
    };
    this.open = function(sender, e, format, year, month) {
		if(typeof(sender)=="object"){
			__caller = sender;
		}else if(typeof(sender)=="string"){
			__caller = $("#"+sender);
		}else{
			__caller = null;
		}
        if (typeof(format) == "string" && format.length > 0)
            __format = format;
        if (sender.value != "") {
            __datetime = jskitUtil.date.parse(sender.value);
            if (__datetime!=null && !isNaN(__datetime) && /Date/.test(__datetime.constructor)) {
                __jc.setYear(__datetime.getFullYear());
                __jc.setMonth(__datetime.getMonth() + 1);
            }else{
				__datetime = new Date();
			}
        } else {
            if (typeof(year) == "number" && year >= 1) {
                __jc.setYear(year);
            }else{
				var d = new Date();
				__jc.setYear(d.getYear());
				d = null;
			}
            if (typeof(month) == "number" && month <= 12 && month >= 1) {
                __jc.setMonth(month);
            }else{
				var d = new Date();
				__jc.setMonth(d.getMonth()+1);
				d = null;
			}
        }
        __dateSelect();
    };
    this.close = function(e) {
        __close();
    };
	this.onBodyClick = function(e){
		if(e.srcElement!=__caller && !jskitUtil.dom.hasForefather(e.srcElement,__canvasId) ){
			this.close();
		}
	};
	{
		jskitEvents.ready("onclick",__hd+".onBodyClick");
	}
};
