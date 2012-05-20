/****************************************************************************
*
* JskitTable
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved
*
****************************************************************************/
var JskitTable = function(rHd){
	var __hd = (typeof(rHd)!="string")?"jskitTable":rHd;
	var __columnsIndex = new Array();
	var __columns = new Array();
	var __isReady = false;
	var __table = null;
	var __thead = null;
	var __tbody = null;
    var __cursor = 0;
	
	var __haveIndexColumn	= false;
	var __btnText_delete = "Delete";

	var __action = new Array();
	var __actionHd = new Array();
		
	var __Column = function(rKey,rTitle,rVisible,rCssClass){
		this.key = (typeof(rKey)=="string")?rKey:"";
		this.title = (typeof(rTitle)=="string")?rTitle:"";
		this.visible = (typeof(rVisible)=="boolean")?rVisible:true;
		this.cssClass = (typeof(rCssClass)=="string")?rCssClass:"";
	};
	var __cssClass = new function(){
		this.table = "";
		this.head = "";
		this.body = "";
		this.button = "";
	};
	this.setIndexColumn = function(v){
		__haveIndexColumn = (typeof(v)=="boolean")?v:false;
	};
	this.setTableCssClass = function(v){
		__cssClass.table = v;
	};
	this.setTHeadCssClass = function(v){
		__cssClass.head = v;
	};
	this.setTBodyCssClass = function(v){
		__cssClass.body = v;
	};
	this.setButtonCssClass = function(v){
		__cssClass.button = v;
	};

	//#Begin Private methods
	var __initTable = function(){
		__table = document.createElement("table");
		__thead = document.createElement("thead");
		__tbody = document.createElement("tbody");
		__table.appendChild(__thead);
		__table.appendChild(__tbody);
		var	_tr = document.createElement("tr");
		if(__haveIndexColumn){
			var _td = document.createElement("td");
			_td.innerHTML = "&nbsp;";
			_tr.appendChild(_td);
		}
		__thead.appendChild(_tr);
		__isReady = true;
	};
	var __indexColumn = function(rIndex){
		var _td = document.createElement("td");
		_td.innerHTML = parseInt(rIndex)+1;
		return _td;
	};
	var __getCIdxByKey = function(v){
		var _i = __columnsIndex[v];
		return (_i>=__columns.length)?0:_i;
	};
	var __getColumn = function (v) {
	    if (typeof (v) == "number" && v < __columns.length) {
	        return __columns[v];
	    } else if (typeof (v) == "string") {
	        return __columns[__columnsIndex[v]];
	    } else {
	        return null;
	    }
	};
	var __getRow = function(rRIdx){
		var _count = __tbody.childNodes.length;
		var _ri=null,_ci=null;
		_ri = (typeof(rRIdx)!="number" || rRIdx>=_count)?0:rRIdx;
		_count = null;
		return __tbody.childNodes[_ri];
	};
	var __getCell = function(rRIdx,rCIdx){
		var _row = __getRow(rRIdx);
		if(_row!=null){
			_ci = (typeof(rCIdx)=="number" && rCIdx<__columns.length)?rCIdx:__getCIdxByKey(rCIdx);
			return _row.childNodes[_ci];
		}
		return null;
	};
	var __count = function(){
		return __tbody.childNodes.length;
	};
	var __getValue = function (rRIdx, rCIdx) {
	    var _cell = __getCell(rRIdx, rCIdx);
	    if (_cell != null) {
	        return _cell.innerHTML;
	    } else {
	        return "";
	    }
	};
	var __getCellCssClass = function (rRIdx, rCIdx) {
	    var _cell = __getCell(rRIdx, rCIdx);
	    if (_cell != null) {
	        return _cell.className;
	    } else {
	        return "";
	    }
	};
	var __setValue = function(rRowIndex,rCellIndex,rValue){
		var _cell = __getCell(rRowIndex,rCellIndex);
		if(_cell!=null){
		    //alert("JskitTable : setValue : _cell["+rRowIndex+","+rCellIndex+"] is null");
			_cell.innerHTML = rValue;
        }
	};
	var __convertValue = function(v){
		return (typeof(v)!="string")?"":v;
	};
	var __buildActionGroup = function () {
	    var _s = new Array();
	    for (var i = 0; i < __action.length; i++) {
	        if (__actionHd[__action[i]] != "") {
	            _s.push(' ' + __action[i] + '="' + __actionHd[__action[i]] + '(this)" ');
	        }
	    }
	    return _s.join('');
	};
    var __insertEmptyRow = function(){
        if(!__isReady){__initTable();}
        var _tr = document.createElement("tr");
        var _index = __tbody.rows.length;
        if(__haveIndexColumn){
            _tr.appendChild(__indexColumn(_index));
        }
        for(var i=0;i<__columns.length;i++){
            var _td = document.createElement("td");
            _td.innerHTML = "";
            _tr.appendChild(_td);
            _td = null;
        }
        __tbody.appendChild(_tr);
        _tr = _index = null;
    };
	//#End
	
	//#Begin Public methods
	this.count = function(){
		return __count();
	};
	this.getValue = function(rRIdx,rCIdx){
		return __getValue(rRIdx,rCIdx);
	};
	this.setValue = function(rRowIndex,rCellIndex,rValue){
		__setValue(rRowIndex,rCellIndex,rValue);
	};
	this.addColumn = function(rKey,rTitle,rVisible,rCssClass){
		if(!__isReady){__initTable();}
		if(__columnsIndex[rKey]>-1)return;
		var _td = document.createElement("td");
		_td.innerHTML = rTitle;
		__thead.rows[0].appendChild(_td);
		__columns.push(new __Column(rKey,rTitle,rVisible,rCssClass));
		__columnsIndex[rKey] = __columns.length-1;
		_td = null;
	};
    this.setEmptyColumns = function(rCount){
        __columns = new Array();
        __columnsIndex = new Array();
        for(var i=0;i<rCount;i++){
            this.addColumn(i,"",true,"");
        }
    };
	this.setColumns = function(){
		__columns = new Array();
		__columnsIndex = new Array();
		for(var i=0;i<arguments.length;i++){
			this.addColumn(arguments[i],arguments[i],true,"");
		}
	};
	this.insert = function(){
		if(!__isReady){__initTable();}
		var _tr = document.createElement("tr");
		var _index = __tbody.rows.length;
		if(__haveIndexColumn){
			_tr.appendChild(__indexColumn(_index));
		}
		for(var i=0;i<__columns.length;i++){
			var _td = document.createElement("td");
			_td.innerHTML = __convertValue(arguments[i]);
			_tr.appendChild(_td);
			_td = null;
		}
		__tbody.appendChild(_tr);
		_tr = _index = null;
	};
	this.getHeadContent = function(){
		var _s = new Array();
		_s.push('<thead class="'+__cssClass.head+'"><tr>');
		for(var i=0;i<__columns.length;i++){
			if(__columns[i].visible==false)continue;
			_s.push('<td>'+__columns[i].title+'</td>');
		}
		_s.push('</tr></thead>');
		return _s.join('');
	};
	this.getBodyContent = function(rIndex,rCount){
		var _s = new Array();
		var _count = __count();
		var _begin=0,_end=_count;
		if(typeof(rIndex)=="number" && typeof(rCount)=="number"){
			_begin = rIndex;
			if(_begin>=_count || _begin<0)_begin=0;
			_end = rCount+rIndex;
			if(_end>=_count || _end<0)_end=_count;
		}
		_s.push('<tbody class="'+__cssClass.body+'">');
		var _cellCssClass = null;
		for(var i=_begin;i<_end;i++){
			_s.push('<tr>');
			for(var j=0;j<__columns.length;j++){
				if(__columns[j].visible==false)continue;
				_cellCssClass = __getCellCssClass(i,j);
				if(_cellCssClass==null || _cellCssClass==""){
					_cellCssClass = __columns[j].cssClass;
				}
				_s.push('<td row="'+i+'" col="'+j+'" class="'+_cellCssClass+'" '+__buildActionGroup()+' >');
				_s.push(__getValue(i,j));
				_s.push('</td>');
			}
			_s.push('</tr>');
		}
		_s.push('</tbody>');
		return _s.join('');
	};

	this.setColumnVisible = function(c,v){
		var _c = __getColumn(c);
		_c.visible = (typeof(v)=="boolean")?v:false;
	};
	this.setColumnCssClass = function(c,v){
		var _c = __getColumn(c);
		_c.cssClass = (typeof(v)=="string")?v:"";
	};
	this.setColumnTitle = function(c,v){
		var _c = __getColumn(c);
		_c.title = (typeof(v)=="string")?v:_c.key;
	};
	this.setCellCssClass = function(rRow,rCol,rCssClass){
		var _cell = __getCell(rRow,rCol);
		if(_cell!=null && typeof(rCssClass)=="string" ){
			_cell.className = rCssClass;
		}
		_cell = __getCell(rRow,rCol);
	};
	this.setAction = function(act,func){
		for(var i=0;i<__action.length;i++){
			if(__action[i]==act){
				__actionHd[act]=func;
				return;
			}
		}
		__action.push(act);
		__actionHd[act]=func;
	};
	this.getTableHtml = function(rShowHead,rIndex,rCount){
        var _s = new Array();
        _s.push('<table cellspacing="0" cellpadding="0" class="'+__cssClass.table+'">');
        if(rShowHead){
            _s.push(this.getHeadContent());
		}
        _s.push(this.getBodyContent(rIndex,rCount));
        _s.push('</table>');
        return _s.join('');
    };
    this.getTable = function(rIndex,rCount){
		return this.getTableHtml(true,rIndex,rCount);
	};
	this.clear = function(){
		if(__tbody!=null){
			$$(__tbody).clearChildren();
			__cursor = 0;
		}
	};
    this.appendContent = function(rContent){
        var _row = parseInt(__cursor/__columns.length);
        var _col = parseInt(__cursor%__columns.length);
        if(_row>=__tbody.rows.length){
            __insertEmptyRow();
        }
        this.setValue(_row,_col,rContent);
        __cursor++;
        //alert(_row+":"+_col+":"+__columns.length);
        //alert("__tbody.rows.length="+__tbody.rows.length);
    };
	this.out = function(rIndex,rCount){
		if(!__isReady){__initTable();}
		var _content = this.getTable(rIndex,rCount);
		document.write(_content);
		_content = null;
	};
};