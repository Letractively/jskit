<%@ codepage=65001%>
<%
If Request.QueryString("act")="country" then
	response.write("[[""china"",""China""],[""japan"",""Japan""]]")
Else 
	If Request.QueryString("parm")="china" then
		response.write("[[""1"",""Beijing""],[""2"",""Shanghai""],[""3"",""Chongqing""],[""4"",""Tianjin""],[""5"",""Dalian""]]")
	Else 
		response.write("[[""1"",""Tokyo""],[""2"",""SHINJUKU""],[""3"",""GINZA""]]")
	End if
End if
%>