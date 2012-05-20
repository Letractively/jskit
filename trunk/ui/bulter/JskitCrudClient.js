var JskitCrudClient = function(){
	var __Crud = null;
    
	var __TxtCreate = unescape("%u65B0%u5EFA");//create in Chs
	var __TxtRead = unescape("%u67E5%u770B");//read in Chs
	var __TxtUpdate = unescape("%u7F16%u8F91");//update in Chs
	var __TxtDelete = unescape("%u5220%u9664");//delete in Chs
	var __TxtNoDataInList = unescape("%u6CA1%u6709%u76F8%u5173%u7684%u6570%u636E");
	var __TxtColon = unescape("%uFF1A");
	var __TxtCancel = unescape("%u53D6%u6D88");
	var __TxtOK = unescape("%u786E%u5B9A");
	var __TxtSubmit = unescape("%u63D0%u4EA4");
	var __TxtReturn = unescape("%u8FD4%u56DE");
	var __TxtFirst = unescape("%u9996%u9875");
	var __TxtPrev = unescape("%u4E0A%u4E00%u9875");
	var __TxtNext = unescape("%u4E0B%u4E00%u9875");
	var __TxtLast = unescape("%u672B%u9875");
	var __TxtSearch = unescape("%u641C%u7D22");
	var __TxtYes = unescape("%u662F");
	var __TxtNo = unescape("%u5426");
	var __TxtSelectEmpty = unescape("%u8BF7%u9009%u62E9...");
	
	var __getFirstSelectedKey = function(){
		var objs = document.getElementsByName("_CRUD_GridView_CheckBox");
		if(objs!=null && objs.length>0){
			for(var i=0;i<objs.length;i++){
				if(objs[i].checked==true){
					return objs[i].value;
				}
			}
		}
		return "";
	};
	var __isTrueVal = function(val){
	    if(typeof(val)=="boolean"){
	        return val;
	    }else if(typeof(val)=="string"){
           return (val.toLowerCase()=="true" || val=="1" || val.toLowerCase()=="yes");
	    }else if(typeof(val)=="number"){
	        return (val==1);
	    }
	    return false;
	}
	var __UpdateOrRead = function(rActionParam){
		var key = __getFirstSelectedKey();
		if(key!=""){
			window.location.href = __buildUrl(rActionParam,key);
		}else{
			alert(unescape("%u8BF7%u5148%u9009%u62E9%u8981%u64CD%u4F5C%u7684%u8BB0%u5F55"));
		}
	};
	var __GenerateFieldCode = function(p){
        var _code = new Array();
        var name = __Crud.Model.Type + "_" + p.Name;
        var maxLength = (typeof(p.Length)=="number" && p.Length>0)?('maxlength="'+p.Length+'"'):('');
        if(p.HtmlCode!=null && p.HtmlCode.length>0){
            _code.push(p.HtmlCode);
        }else{
            switch(p.DataType){
                case "password":
                    _code.push('<input name="'+name+'" id="'+name+'" type="password" '+maxLength+' />');
                    break;
                case "date":
                case "datetime":
                    _code.push('<input name="'+name+'" id="'+name+'" readonly="readonly" value="'+p.Value+'" type="text" onclick="jskitDateSelector.open(this,event,null,1984,8)" />');
                    break;
                case "hidden":
                    _code.push('<input name="'+name+'" id="'+name+'" type="hidden" value="'+p.Value+'" />');
                    break;
                case "mtext":
                    _code.push('<textarea name="'+name+'" id="'+name+'" >'+p.Value+'</textarea>');
                    break;
                case "select":
                    _code.push(__GenerateSelectDataCode(name,p));
                    break;
                case "boolean":
                    if(__isTrueVal(p.Value)){
                        _code.push(__TxtYes + '<input type="radio" checked="checked" value="true" name="'+name+'" />');
                        _code.push(__TxtNo + '<input type="radio" value="false" name="'+name+'" />');
                    }else{
                        _code.push(__TxtYes + '<input type="radio" value="true" name="'+name+'" />');
                        _code.push(__TxtNo + '<input type="radio" checked="checked" value="false" name="'+name+'" />');
                    }
                    break;
                default:
                    _code.push('<input name="'+name+'" id="'+name+'" type="text" value="'+p.Value+'" '+maxLength+' />');
            }
        }
        return _code.join('');
	};
	var __GenerateSelectDataCode = function(itemName,property){
	    var data = __Crud.DataSource[property.Name];
	    if(data==null || typeof(data.length)=="undefined")return"";
	    var _code = new Array();
	    _code.push('<select name="'+itemName+'" id="'+itemName+'">');
	    if(!property.NotNull){
	        _code.push('<option value="">'+__TxtSelectEmpty+'</option>');
	    }
	    for(var i=0;i<data.length;i++){
	        _code.push('<option value="'+data[i][0]+'"');
	        if(property.Value == data[i][0]){_code.push(' selected="selected" ');}
	        _code.push('>'+data[i][1]+'</option>');
	    }
	    _code.push('</select>');
	    return _code.join('');
	};
	var __GenerateSearchFieldCode = function(ser){
        var _code = new Array();
        var name = __Crud.Model.Type + "_" + ser.Name;
        if(ser.Type=="select"){
            _code.push('<select name="'+name+'" id="'+name+'" value='+ser.Value+'></select>');
        }else if(ser.Type=="boolean"){
            if(__isTrueVal(ser.Value)){
                _code.push(__TxtYes + '<input type="radio" checked="checked" value="true" name="'+name+'" />');
                _code.push(__TxtNo + '<input type="radio" value="false" name="'+name+'" />');
            }else{
                _code.push(__TxtYes + '<input type="radio" value="true" name="'+name+'" />');
                _code.push(__TxtNo + '<input type="radio" checked="checked" value="false" name="'+name+'" />');
            }
        }else{
            _code.push('<input name="'+name+'" id="'+name+'" size="10" type="text" value="'+ser.Value+'" />');
        }
        return _code.join('');
	};
	var __GenerateCreateForm = function(){
	    var _code = new Array();
	    _code.push('<table cellspacing="0" cellpadding="0" class="crud_create">');
	    var p = null;
	    var name = null;
	    for(var i=0;i<__Crud.Form.length;i++){
	        p = __Crud.Form[i];
	        if(!p.InForm){continue;}
	        _code.push('<tr>');
	        if(p.NotNull){
	            _code.push('<td class="crud_create_label">'+p.Label+__TxtColon+'<font class="crud_notnull_flag">*</font></td>');
	        }else{
	            _code.push('<td class="crud_create_label">'+p.Label+__TxtColon+'</td>');
	        }
	        _code.push('<td class="crud_create_field">');
	        _code.push(__GenerateFieldCode(p));
	        _code.push('</td>');
	        _code.push('</tr>');
	    }
	    _code.push('<tr><td colspan="2" align="right">');
	    _code.push('<input class="crud_create_button" type="submit" value="'+__TxtSubmit+'" />');
	    _code.push('<input class="crud_create_button" type="reset" />');
	    _code.push('<input class="crud_create_button" type="button" value="'+__TxtCancel+'" onclick="jskitCrudClient.onFromCancel();" />');
	    _code.push('</td></tr>');
	    _code.push('</table>');
	    return _code.join('');	    
	};
	var __GenerateUpdateForm = function(){
	    var _code = new Array();
	    _code.push('<table cellspacing="0" cellpadding="0" class="crud_update">');
	    var p = null;
	    var name = null;
	    for(var i=0;i<__Crud.Form.length;i++){
	        p = __Crud.Form[i];
	        if(!p.InForm){continue;}
	        _code.push('<tr>');
	        if(p.NotNull){
	            _code.push('<td class="crud_update_label">'+p.Label+__TxtColon+'<font class="crud_notnull_flag">*</font></td>');
	        }else{
	            _code.push('<td class="crud_update_label">'+p.Label+__TxtColon+'</td>');
	        }
	        _code.push('<td class="crud_update_field">');
	        if(p.Editable){
	            _code.push(__GenerateFieldCode(p));
	        }else{
	            _code.push(p.Value);
	        }
	        _code.push('</td>');
	        _code.push('</tr>');
	    }
	    _code.push('<tr><td colspan="2" align="right">');
	    _code.push('<input class="crud_update_button" type="submit" value="'+__TxtSubmit+'" />');
	    _code.push('<input class="crud_update_button" type="reset" />');
	    _code.push('<input class="crud_update_button" type="button" value="'+__TxtCancel+'" onclick="jskitCrudClient.onFromCancel();" />');
	    _code.push('</td></tr>');
	    _code.push('</table>');
	    return _code.join('');	    
	};
	var __GenerateReadForm = function(){
	    var _code = new Array();
	    _code.push('<table cellspacing="0" cellpadding="0" class="crud_read">');
	    var p = null;
	    var name = null;
	    for(var i=0;i<__Crud.Form.length;i++){
	        p = __Crud.Form[i];
	        if(!p.InList){continue;}
	        _code.push('<tr>');
            _code.push('<td class="crud_read_label">'+p.Label+__TxtColon+'</td>');
	        _code.push('<td class="crud_read_field">');
	        _code.push(p.Value);
	        _code.push('</td>');
	        _code.push('</tr>');
	    }
	    _code.push('<tr><td colspan="2" align="right">');
	    _code.push('<input class="crud_read_button" type="button" value="'+__TxtReturn+'" onclick="window.history.back(-1);" />');
	    _code.push('</td></tr>');
	    _code.push('</table>');
	    return _code.join('');	    
	};
	var __GenerateGridView = function(){
		if(typeof(CRUD.List)!="object")return;
		var _code = new Array();
	    _code.push(__GenerateSearchCode());
		/*#Begin action links----------------*/
		_code.push('<table cellspacing="0" cellpadding="0" class="crud_action_bar"><tr>');
		if(__Crud.Model.Create){
			_code.push('<td><a class="crud_action_link" href="javascript:jskitCrudClient.create();">'+__TxtCreate+'</a></td>');
		}
		if(__Crud.Model.Read){
			_code.push('<td><a class="crud_action_link" href="javascript:jskitCrudClient.read();">'+__TxtRead+'</a></td>');
		}
		if(__Crud.Model.Update){
			_code.push('<td><a class="crud_action_link" href="javascript:jskitCrudClient.update();">'+__TxtUpdate+'</a></td>');
		}
		if(__Crud.Model.Delete){
			_code.push('<td><a class="crud_action_link" href="javascript:jskitCrudClient.del()">'+__TxtDelete+'</a></td>');
		}
		_code.push('</tr></table>');
		/*#End--------------------------------*/
		_code.push('<table cellspacing="0" cellpadding="0" class="crud_list">');
		_code.push('<thead class="crud_list_head"><tr>');
		_code.push('<td onclick="jskitCrudClient.onListRefresh()" align="center">*</td>');
		for(var i=0;i<__Crud.Header.length;i++){
			_code.push('<td>'+__Crud.Header[i].split(',')[1]+'</td>');
		}
		_code.push("</tr></thead>");
		_code.push('<tbody class="crud_list_body">');
		if(__Crud.List.length<1){
			_code.push('<tr><td colspan="'+(__Crud.Header.length+1)+'">'+__TxtNoDataInList+'</td></tr>');
		}else{
			var _count = __Crud.List.length;
			var _val = null;
			for(var i=0;i<_count;i++){
				_code.push('<tr>');
				var cells = __Crud.List[i];
				_code.push('<td><input type="checkbox" value="'+cells[0]+'" onclick="jskitCrudClient.onRowSelect(this,event)" name="_CRUD_GridView_CheckBox" /></td>');
				for(var j=1;j<cells.length;j++){
				    val = cells[j];
				    if(__Crud.Header[j-1].split(',')[2]=="boolean"){
				        val = (__isTrueVal(val))?__TxtYes:__TxtNo;
				    }
					_code.push('<td>'+val+'</td>');
				}
				_code.push('</tr>');
			}
		}
		_code.push("</tbody>");
		_code.push('<tfoot class="crud_list_foot"><tr><td colspan="'+(__Crud.Header.length+1)+'">'+__GeneratePagerCode()+'</td></tr></tfoot>');
		_code.push("</table>");
		return _code.join('');
	};
	var __GeneratePagerCode = function(){
	    var _code = new Array();
	    var _totalPage = Math.ceil(__Crud.TotalSize/__Crud.PageSize);
	    if(__Crud.Page>_totalPage)__Crud.Page=_totalPage;
	    _code.push('<table cellspacing="0" cellpadding="0" border="0"><tr>');
	    if(__Crud.Page<=1){
    	    _code.push('<td><font class="crud_pager_disabled">'+__TxtFirst+'</font></td>');
    	}else{
    	    _code.push('<td><a href="javascript:jskitCrudClient.onPagerAction(0)" class="crud_pager_link">'+__TxtFirst+'</a></td>');
    	}
	    if(__Crud.Page>1){
    	    _code.push('<td><a href="javascript:jskitCrudClient.onPagerAction(1)" class="crud_pager_link">'+__TxtPrev+'</a></td>');
    	}else{
    	    _code.push('<td><font  class="crud_pager_disabled">'+__TxtPrev+'</font></td>');
    	}
	    _code.push('<td>'+__Crud.Page+'/'+_totalPage+'</td>');
	    if(_totalPage>__Crud.Page){
    	    _code.push('<td><a href="javascript:jskitCrudClient.onPagerAction(2)" class="crud_pager_link">'+__TxtNext+'</a></td>');
    	}else{
    	    _code.push('<td><font  class="crud_pager_disabled">'+__TxtNext+'</font></td>');
    	}
	    if(_totalPage==__Crud.Page){
    	    _code.push('<td><font  class="crud_pager_disabled">'+__TxtLast+'</font></td>');
    	}else{
    	    _code.push('<td><a href="javascript:jskitCrudClient.onPagerAction(3)" class="crud_pager_link">'+__TxtLast+'</a></td>');
    	}
	    _code.push('</tr></table>');
	    return _code.join('');
	};
	var __GenerateSearchCode = function(){
	    if(__Crud.Search.length<1)return "";
	    var _code = new Array();
	    _code.push('<table cellspacing="0" cellpadding="0" class="crud_search"><tr>');
	    var ser = null;
	    var name = null;
	    for(var i=0;i<__Crud.Search.length;i++){
	        ser = __Crud.Search[i];
	        _code.push('<td class="crud_search_label">'+ser.Label+__TxtColon+'</td>');
	        _code.push('<td class="crud_search_field">');
	        _code.push(__GenerateSearchFieldCode(ser));
	        _code.push('</td>');
	    }
	    _code.push('<td>');
	    _code.push('<input class="crud_search_button" type="submit" value="'+__TxtSearch+'" />');
	    _code.push('</td>');
	    _code.push('</tr></table>');
	    return _code.join('');	    
	};
	var __GenerateHtmlCode = function(){
		var _code = new Array();
		_code.push('<input type="hidden" id="_CRUD_Model_ID" name="_CRUD_Model_ID" value="'+__Crud.Model.ID+'" />');
		_code.push('<input type="hidden" id="_CRUD_Model_TYPE" name="_CRUD_Model_TYPE" value="'+__Crud.Model.Type+'" />');
		_code.push('<input type="hidden" id="_CRUD_ACTION" name="_CRUD_ACTION" value="'+__Crud.Action+'" />');
		if(__Crud.Action=="0"){
    		_code.push(__GenerateGridView());
		}else if(__Crud.Action=="1"){
	    	_code.push(__GenerateCreateForm());
		}else if(__Crud.Action=="2"){
			_code.push(__GenerateReadForm());
		}else if(__Crud.Action=="3"){
		    _code.push(__GenerateUpdateForm());
		}
		return _code.join('');
	};
	var __buildUrl = function(crud,mode,page){
	    var query = "crud="+crud;
	    if(typeof(mode)!="undefined"){
	        query += "&model="+mode;
	    }
	    if(typeof(page)!="undefined"){
	        query += "&page="+page;
	    }
	    if(__Crud.Url.indexOf("?")!=-1){
	        return __Crud.Url + "&" + query;
	    }else{
	        return __Crud.Url + "?" + query;
	    }
	};
	this.onRowSelect = function(sender,e){
	    var tr = sender.parentNode.parentNode;
	    tr.style.backgroundColor = (sender.checked)?"#ffff55":"#ffffff";
	};
	this.onFromCancel = function(){
	    window.location.href = __Crud.Url;
	};
	this.onListRefresh = function(){
	    window.location.href = __Crud.Url;
	};
	this.onPagerAction = function(type){
	    var url = null;
	    if(type==0){
    	    url = __buildUrl(__Crud.Action,null,1);
	    }else if(type==1){
	        url = __buildUrl(__Crud.Action,null,__Crud.Page-1);
	    }else if(type==2){
	        url = __buildUrl(__Crud.Action,null,__Crud.Page+1);
	    }else if(type==3){
	        var _totalPage = Math.ceil(__Crud.TotalSize/__Crud.PageSize);
	        url = __buildUrl(__Crud.Action,null,_totalPage);
	    }
	    window.location.href = url;
	};
	this.create = function(){
		window.location.href = __buildUrl("1");
		//return true;
	};
	this.update = function(){
		__UpdateOrRead(3);
		//return true;
	};
	this.read = function(){
		__UpdateOrRead(2);
		//return true;
	};
	this.del = function(){
		var objs = document.getElementsByName("_CRUD_GridView_CheckBox");
		var hasSelected = false;
		if(objs!=null && objs.length>0){
			for(var i=0;i<objs.length;i++){
				if(objs[i].checked==true){
					hasSelected = true;
					break;
				}
			}
			if(hasSelected){
				if(confirm(unescape("%u786E%u5B9A%u8981%u5220%u9664?"))){
				    $$("#_CRUD_ACTION").value = 4;
				    $$("form")[0].submit();
				}
				
			}else{
				alert(unescape("%u8BF7%u5148%u9009%u62E9%u8981%u64CD%u4F5C%u7684%u8BB0%u5F55"));
			}
		}else{
			alert(unescape("%u8BF7%u5148%u9009%u62E9%u8981%u64CD%u4F5C%u7684%u8BB0%u5F55"));
			//alert("Checkbox ItemTemplate named [_CRUD_GridView_CheckBox] is not found!");
		}
		//return false;
	};
	this.redirect = function(url){
		var key = __getFirstSelectedKey();
		if(key==""){
			alert(unescape("%u8BF7%u5148%u9009%u62E9%u8981%u64CD%u4F5C%u7684%u8BB0%u5F55"));
		}else{
			window.location.href = url+key;
		}
	};
	this.deploy = function(){
		if(typeof(CRUD)!="object"){
			//alert("CRUD data code not found!");
			return;
		}else{
			__Crud = CRUD;
			document.write(__GenerateHtmlCode());
		}
	};
};
var jskitCrudClient = new JskitCrudClient();