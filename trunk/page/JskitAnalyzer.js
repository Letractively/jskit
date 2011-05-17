/*****************************************************
 *
 * JskitAnalyzer
 * #author    : AnyRock
 * #email     : jiang.edwon@gmail.com
 * #homepage  : http://www.mending.cn
 * #copyright : Copyright(c)jskit.org,All right reserved
 *
 * #Necessary : base/*;
 *				page/JskitDynamic.js
 *
 ******************************************************/
function JskitAnalyzer(rHd){
	var __hd = (typeof(rHd)=="string")?rHd:"jskitAnalyzer";
	var __Form = function(){
		this.input = null;
		this.output = null;
	};
	//expend tracker panel
	//exec script
	//print result
	var __key = null;
	var __canvas = null;
	var __panel = null;
	var __code = "";
	var __form = null;
	
	var __exec = function(){
		eval(__code);	
	};
	var __createPanel = function(){
		__canvas = document.createElement("div");
		__canvas.setAttribute("id",__key+"_canvas");
		var _s = '';
		_s += '<table border="0" cellspacing="0" cellpadding="0">';
		_s += '<tr><td height="10" style="font-weight:bold;font-family:verdana;font-size:11px;">&nbsp;Jskit Analyzer@Jskit.org</td><td align="right"><input type="button" value="X" onclick="'+__hd+'.close()" style="height:18px;width:18px;font-size:9px;font-family:verdana;font-weight:bold;" /></td></tr>';
		_s += '<tr>';
		_s += '<td colspan="2"><textarea id="'+__key+'_input" rows="5" cols="40" style="background-color:#ffffd0"></textarea></td>';
		_s += '</tr>';
		_s += '<tr>';
		_s += '<td align="center" height="30px" colspan="2">';
		_s += '<input type="button" onclick="'+__hd+'.run()" value="Run" />';
		_s += '&nbsp;&nbsp;&nbsp;<input type="button" onclick="'+__hd+'.getBodySize()" value="BodySize" />';
		_s += '</td>';
		_s += '</tr>';
		_s += '<tr>';
		_s += '<td colspan="2"><textarea id="'+__key+'_output" rows="5" cols="40" style="background-color:#ffffd0"></textarea></td>';
		_s += '</tr>';
		_s += '</table>';
		__canvas.innerHTML = _s;
		__canvas.setAttribute("id",__key+"_canvas");
		__canvas.style.border = "2px outset #ffffff";
		__canvas.style.backgroundColor = "#d4d0c8";
		__canvas.style.position = "absolute";
		__canvas.style.top = "10px";
		__canvas.style.left = "10px";
		__canvas.style.padding = "5px";
		//__canvas.style.position = "absolute";
		
		$("body").appendChild(__canvas);
	};
	this.getCanvasId = function(){
		return __key+"_canvas";
	};
	this.run = function(){
		var _scripts = __form.input.value;
		var _bk = "";
		try{
			eval("_bk = "+_scripts+";");
		}catch(e){
			_bk = e;	
		}
		if(typeof(_bk)!="undefined"){
			__form.output.value = _bk;
		}else{
			__form.output.value = "[VOID]";
		}
	};
	this.getBodySize = function(){
		__form.output.value = $("body").innerHTML.length;
	};
	this.close = function(){
		__canvas.style.display = "none";
	};
	this.open = function(){
		__canvas.style.display = "block";
	};
	this.deploy = function(){
		__createPanel();
		__form = new __Form();		
		__form.input = $("#"+__key+"_input");
		__form.output = $("#"+__key+"_output");
	};
	{
		__key = jskitUtil.guid();
	}
}
