/*****************************************************
*
* JskitAjax 
* #author    : AnyRock
* #email     : jiang.edwon@gmail.com
* #homepage  : http://www.mending.cn
* #copyright : Copyright(c)jskit.org,All right reserved 
*
******************************************************/
var JskitXmlHttpStateText = new Array(
	"The request is not initialized"
	,"The request has been set up" 
	,"The request has been sent"
	,"The request is in process" 
	,"The request is complete"
);
function JskitXmlHttp(){
	var __xmlHttp = null;
  	try{// Firefox, Opera 8.0+, Safari
 		__xmlHttp=new XMLHttpRequest();
	}catch (e){// Internet Explorer
  		try{
			__xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				__xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e){
				alert("Your browser does not support XMLHTTP!");
				return false;
			}
		}
	}
	return __xmlHttp;
}
function JskitXmlHttpAction(rUrl,rFuncs,rCallBackDataType,rParm){
	var _str = new Array();
	var _hd = "j"+jskitUtil.guid();
	_str.push("var " + _hd + " = new JskitXmlHttp();");
	_str.push(_hd + ".onreadystatechange = function(){");
	_str.push("  try{");
	_str.push("     if("+_hd+".readyState==4){");
	if(typeof(rCallBackDataType)=="string" && rCallBackDataType=="dom"){
		_str.push(rFuncs+"("+_hd+".responseXML.documentElement);");	
	}else if(typeof(rCallBackDataType)=="string" && rCallBackDataType=="xml"){
		_str.push(rFuncs+"("+_hd+".responseXML,\""+rParm+"\");");
	}else{
		_str.push(rFuncs+"("+_hd+".responseText,\""+rParm+"\");");		
	}
    _str.push("     }");
	_str.push("  }catch(e){"+_hd+" = null;}");
    _str.push("};");
    //_str.push("try { netscape.security.PrivilegeManager.enablePrivilege(\"UniversalBrowserRead\"); } catch (e) { alert(\"Permission UniversalBrowserRead denied.\"); } ")
    _str.push(_hd+".open(\"get\",rUrl,true);");
    _str.push(_hd+".setRequestHeader(\"Cache-Control\",\"no-cache\");");
    _str.push(_hd+".send(null);");
    //document.write(_str.join(""));
	eval(_str.join(""));
	_str = null;
	return _hd;
}
function JskitXmlHttpProcess(rUrl,rCallBackDataType,rHandleMap,rMethod){
	var _str = new Array();
	var _hd = "j"+jskitUtil.guid();	
	rMethod = (typeof(rMethod)=="string")?rMethod:"get";
	_str.push("var " + _hd + " = new JskitXmlHttp();");
	_str.push(_hd+".abort();");
	_str.push("try{");
	_str.push(_hd + ".onreadystatechange = function(){");
	_str.push(" if("+_hd+".readyState==4){");
	if(typeof(rCallBackDataType)=="string" && rCallBackDataType=="dom"){
		_str.push(rHandleMap[4].replace("(","("+_hd+".responseXML.documentElement,"));
	}else if(typeof(rCallBackDataType)=="string" && rCallBackDataType=="xml"){
		_str.push(rHandleMap[4].replace("(","("+_hd+".responseXML,"));
	}else{
		_str.push(rHandleMap[4].replace("(","("+_hd+".responseText,"));
	}
	_str.push("}else if("+_hd+".readyState==3){");//The request is in process
		_str.push(rHandleMap[3]);
	_str.push("}else if("+_hd+".readyState==2){");//The request has been sent   
		_str.push(rHandleMap[2]);
	_str.push("}else if("+_hd+".readyState==1){");//The request has been set up
		_str.push(rHandleMap[1]);
	_str.push("}else if("+_hd+".readyState==0){");//The request is not initialized
		_str.push(rHandleMap[0]);
	_str.push("}");//end if
	_str.push("};");//end onreadystatechange function

	rMethod = jskitUtil.select(rMethod,"get","post");
	_str.push(_hd+".open(\""+rMethod+"\",rUrl,true);");  
	_str.push(_hd+".send(null);");
	_str.push("}catch(e){");
	_str.push(_hd+" = null;");
	_str.push("}");
	var _strs = _str.join("");
	_strs = _strs.replace(/,\)/gi,")");

	eval(_strs);
	_strs = null;
	_str = null;
	return _hd;
}
function JskitAjax(rUrl,rMethod,rCallBackDataType,rHandleMap){
	var __ajax = null;
	var __method = "get";
	var __sync = true;
	var __form = new Array();
	this.push = function(key,value){
		
	};
	{
		__ajax = new JskitXmlHttp();
	}
}
