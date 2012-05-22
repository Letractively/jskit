var JskitCalendar = function(){
    var __LUNARDATA = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63);
    var __DAYS_OF_MONTH = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var __TIANGAN = new Array(decodeURI("%E7%94%B2"),decodeURI("%E4%B9%99"),decodeURI("%E4%B8%99"),decodeURI("%E4%B8%81"),decodeURI("%E6%88%8A"),decodeURI("%E5%B7%B1"),decodeURI("%E5%BA%9A"),decodeURI("%E8%BE%9B"),decodeURI("%E5%A3%AC"),decodeURI("%E7%99%B8"));
    var __DIZHI = new Array(decodeURI("%E5%AD%90"),decodeURI("%E4%B8%91"),decodeURI("%E5%AF%85"),decodeURI("%E5%8D%AF"),decodeURI("%E8%BE%B0"),decodeURI("%E5%B7%B3"),decodeURI("%E5%8D%88"),decodeURI("%E6%9C%AA"),decodeURI("%E7%94%B3"),decodeURI("%E9%85%89"),decodeURI("%E6%88%8C"),decodeURI("%E4%BA%A5"));
    var __SHENGXIAO = new Array(decodeURI("%E9%BC%A0"),decodeURI("%E7%89%9B"),decodeURI("%E8%99%8E"),decodeURI("%E5%85%94"),decodeURI("%E9%BE%99"),decodeURI("%E8%9B%87"),decodeURI("%E9%A9%AC"),decodeURI("%E7%BE%8A"),decodeURI("%E7%8C%B4"),decodeURI("%E9%B8%A1"),decodeURI("%E7%8B%97"),decodeURI("%E7%8C%AA"));
    var __SOLARTERM = new Array(decodeURI("%E5%B0%8F%E5%AF%92"),decodeURI("%E5%A4%A7%E5%AF%92"),decodeURI("%E7%AB%8B%E6%98%A5"),decodeURI("%E9%9B%A8%E6%B0%B4"),decodeURI("%E6%83%8A%E8%9B%B0"),decodeURI("%E6%98%A5%E5%88%86"),decodeURI("%E6%B8%85%E6%98%8E"),decodeURI("%E8%B0%B7%E9%9B%A8"),decodeURI("%E7%AB%8B%E5%A4%8F"),decodeURI("%E5%B0%8F%E6%BB%A1"),decodeURI("%E8%8A%92%E7%A7%8D"),decodeURI("%E5%A4%8F%E8%87%B3"),decodeURI("%E5%B0%8F%E6%9A%91"),decodeURI("%E5%A4%A7%E6%9A%91"),decodeURI("%E7%AB%8B%E7%A7%8B"),decodeURI("%E5%A4%84%E6%9A%91"),decodeURI("%E7%99%BD%E9%9C%B2"),decodeURI("%E7%A7%8B%E5%88%86"),decodeURI("%E5%AF%92%E9%9C%B2"),decodeURI("%E9%9C%9C%E9%99%8D"),decodeURI("%E7%AB%8B%E5%86%AC"),decodeURI("%E5%B0%8F%E9%9B%AA"),decodeURI("%E5%A4%A7%E9%9B%AA"),decodeURI("%E5%86%AC%E8%87%B3"));
    var __TERMCODE = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
    var __DAYTEXT_CN1 = new Array(decodeURI("%E6%97%A5"),decodeURI("%E4%B8%80"),decodeURI("%E4%BA%8C"),decodeURI("%E4%B8%89"),decodeURI("%E5%9B%9B"),decodeURI("%E4%BA%94"),decodeURI("%E5%85%AD"),decodeURI("%E4%B8%83"),decodeURI("%E5%85%AB"),decodeURI("%E4%B9%9D"),decodeURI("%E5%8D%81"));
    var __DAYTEXT_CN2 = new Array(decodeURI("%E5%88%9D"),decodeURI("%E5%8D%81"),decodeURI("%E5%BB%BF"),decodeURI("%E5%8D%85"));
    var __MONTH_CN = new Array(decodeURI("%E6%AD%A3"),decodeURI("%E4%BA%8C"),decodeURI("%E4%B8%89"),decodeURI("%E5%9B%9B"),decodeURI("%E4%BA%94"),decodeURI("%E5%85%AD"),decodeURI("%E4%B8%83"),decodeURI("%E5%85%AB"),decodeURI("%E4%B9%9D"),decodeURI("%E5%8D%81"),decodeURI("%E5%8D%81%E4%B8%80"),decodeURI("%E5%8D%81%E4%BA%8C"));
    var __MONTH_EN = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
	var __LUNAR_FESTIVAL=new Array();
	__LUNAR_FESTIVAL[10101]=decodeURI("%E6%98%A5%E8%8A%82");
	__LUNAR_FESTIVAL[10115]=decodeURI("%E5%85%83%E5%AE%B5%E8%8A%82");
	__LUNAR_FESTIVAL[10505]=decodeURI("%E7%AB%AF%E5%8D%88%E8%8A%82");
	__LUNAR_FESTIVAL[10624]=decodeURI("%E7%81%AB%E6%8A%8A%E8%8A%82");
	__LUNAR_FESTIVAL[10707]=decodeURI("%E4%B8%83%E5%A4%95%E6%83%85%E4%BA%BA%E8%8A%82");
	__LUNAR_FESTIVAL[10715]=decodeURI("%E4%B8%AD%E5%85%83%E8%8A%82");
	__LUNAR_FESTIVAL[10815]=decodeURI("%E4%B8%AD%E7%A7%8B%E8%8A%82");
	__LUNAR_FESTIVAL[10909]=decodeURI("%E9%87%8D%E9%98%B3%E8%8A%82");
	__LUNAR_FESTIVAL[11208]=decodeURI("%E8%85%8A%E5%85%AB%E8%8A%82");
	__LUNAR_FESTIVAL[11223]=decodeURI("%E5%B0%8F%E5%B9%B4");
	__LUNAR_FESTIVAL[11230]=decodeURI("%E9%99%A4%E5%A4%95");
	var __SOLAR_FESTIVAL=new Array();
	__SOLAR_FESTIVAL[10101]=decodeURI("%E5%85%83%E6%97%A6%E8%8A%82");
	__SOLAR_FESTIVAL[10202]=decodeURI("%E4%B8%96%E7%95%8C%E6%B9%BF%E5%9C%B0%E6%97%A5");
	__SOLAR_FESTIVAL[10210]=decodeURI("%E5%9B%BD%E9%99%85%E6%B0%94%E8%B1%A1%E8%8A%82");
	__SOLAR_FESTIVAL[10214]=decodeURI("%E6%83%85%E4%BA%BA%E8%8A%82");
	__SOLAR_FESTIVAL[10301]=decodeURI("AnyRock%E7%9A%84%E7%94%9F%E6%97%A5,%E5%9B%BD%E9%99%85%E6%B5%B7%E8%B1%B9%E6%97%A5");
	__SOLAR_FESTIVAL[10303]=decodeURI("%E5%85%A8%E5%9B%BD%E7%88%B1%E8%80%B3%E6%97%A5");
	__SOLAR_FESTIVAL[10305]=decodeURI("%E5%AD%A6%E9%9B%B7%E9%94%8B%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[10308]=decodeURI("%E5%A6%87%E5%A5%B3%E8%8A%82");
	__SOLAR_FESTIVAL[10312]=decodeURI("%E6%A4%8D%E6%A0%91%E8%8A%82,%E5%AD%99%E4%B8%AD%E5%B1%B1%E9%80%9D%E4%B8%96%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[10314]=decodeURI("%E5%9B%BD%E9%99%85%E8%AD%A6%E5%AF%9F%E6%97%A5");
	__SOLAR_FESTIVAL[10315]=decodeURI("%E6%B6%88%E8%B4%B9%E8%80%85%E6%9D%83%E7%9B%8A%E6%97%A5");
	__SOLAR_FESTIVAL[10317]=decodeURI("%E4%B8%AD%E5%9B%BD%E5%9B%BD%E5%8C%BB%E8%8A%82,%E5%9B%BD%E9%99%85%E8%88%AA%E6%B5%B7%E6%97%A5");
	__SOLAR_FESTIVAL[10321]=decodeURI("%E4%B8%96%E7%95%8C%E6%A3%AE%E6%9E%97%E6%97%A5,%E6%B6%88%E9%99%A4%E7%A7%8D%E6%97%8F%E6%AD%A7%E8%A7%86%E5%9B%BD%E9%99%85%E6%97%A5,%E4%B8%96%E7%95%8C%E5%84%BF%E6%AD%8C%E6%97%A5");
	__SOLAR_FESTIVAL[10322]=decodeURI("%E4%B8%96%E7%95%8C%E6%B0%B4%E6%97%A5");
	__SOLAR_FESTIVAL[10323]=decodeURI("%E4%B8%96%E7%95%8C%E6%B0%94%E8%B1%A1%E6%97%A5");
	__SOLAR_FESTIVAL[10324]=decodeURI("%E4%B8%96%E7%95%8C%E9%98%B2%E6%B2%BB%E7%BB%93%E6%A0%B8%E7%97%85%E6%97%A5");
	__SOLAR_FESTIVAL[10325]=decodeURI("%E5%85%A8%E5%9B%BD%E4%B8%AD%E5%B0%8F%E5%AD%A6%E7%94%9F%E5%AE%89%E5%85%A8%E6%95%99%E8%82%B2%E6%97%A5");
	__SOLAR_FESTIVAL[10330]=decodeURI("%E5%B7%B4%E5%8B%92%E6%96%AF%E5%9D%A6%E5%9B%BD%E5%9C%9F%E6%97%A5");
	__SOLAR_FESTIVAL[10401]=decodeURI("%E6%84%9A%E4%BA%BA%E8%8A%82");
	__SOLAR_FESTIVAL[10407]=decodeURI("%E4%B8%96%E7%95%8C%E5%8D%AB%E7%94%9F%E6%97%A5");
	__SOLAR_FESTIVAL[10422]=decodeURI("%E4%B8%96%E7%95%8C%E5%9C%B0%E7%90%83%E6%97%A5");
	__SOLAR_FESTIVAL[10423]=decodeURI("%E4%B8%96%E7%95%8C%E5%9B%BE%E4%B9%A6%E5%92%8C%E7%89%88%E6%9D%83%E6%97%A5");
	__SOLAR_FESTIVAL[10424]=decodeURI("%E4%BA%9A%E9%9D%9E%E6%96%B0%E9%97%BB%E5%B7%A5%E4%BD%9C%E8%80%85%E6%97%A5");
	__SOLAR_FESTIVAL[10501]=decodeURI("%E5%8A%B3%E5%8A%A8%E8%8A%82");
	__SOLAR_FESTIVAL[10502]=decodeURI("%E5%8A%B3%E5%8A%A8%E8%8A%82%E5%81%87%E6%97%A5");
	__SOLAR_FESTIVAL[10503]=decodeURI("%E5%8A%B3%E5%8A%A8%E8%8A%82%E5%81%87%E6%97%A5");
	__SOLAR_FESTIVAL[10504]=decodeURI("%E9%9D%92%E5%B9%B4%E8%8A%82");
	__SOLAR_FESTIVAL[10505]=decodeURI("%E7%A2%98%E7%BC%BA%E4%B9%8F%E7%97%85%E9%98%B2%E6%B2%BB%E6%97%A5");
	__SOLAR_FESTIVAL[10508]=decodeURI("%E4%B8%96%E7%95%8C%E7%BA%A2%E5%8D%81%E5%AD%97%E6%97%A5");
	__SOLAR_FESTIVAL[10512]=decodeURI("%E5%9B%BD%E9%99%85%E6%8A%A4%E5%A3%AB%E8%8A%82");
	__SOLAR_FESTIVAL[10515]=decodeURI("%E5%9B%BD%E9%99%85%E5%AE%B6%E5%BA%AD%E6%97%A5");
	__SOLAR_FESTIVAL[10517]=decodeURI("%E5%9B%BD%E9%99%85%E7%94%B5%E4%BF%A1%E6%97%A5");
	__SOLAR_FESTIVAL[10518]=decodeURI("%E5%9B%BD%E9%99%85%E5%8D%9A%E7%89%A9%E9%A6%86%E6%97%A5");
	__SOLAR_FESTIVAL[10520]=decodeURI("%E5%85%A8%E5%9B%BD%E5%AD%A6%E7%94%9F%E8%90%A5%E5%85%BB%E6%97%A5");
	__SOLAR_FESTIVAL[10523]=decodeURI("%E5%9B%BD%E9%99%85%E7%89%9B%E5%A5%B6%E6%97%A5");
	__SOLAR_FESTIVAL[10531]=decodeURI("%E4%B8%96%E7%95%8C%E6%97%A0%E7%83%9F%E6%97%A5");
	__SOLAR_FESTIVAL[10601]=decodeURI("%E5%9B%BD%E9%99%85%E5%84%BF%E7%AB%A5%E8%8A%82");
	__SOLAR_FESTIVAL[10605]=decodeURI("%E4%B8%96%E7%95%8C%E7%8E%AF%E5%A2%83%E4%BF%9D%E6%8A%A4%E6%97%A5");
	__SOLAR_FESTIVAL[10606]=decodeURI("%E5%85%A8%E5%9B%BD%E7%88%B1%E7%9C%BC%E6%97%A5");
	__SOLAR_FESTIVAL[10616]=decodeURI("Luke%E7%94%9F%E6%97%A5");
	__SOLAR_FESTIVAL[10617]=decodeURI("%E9%98%B2%E6%B2%BB%E8%8D%92%E6%BC%A0%E5%8C%96%E5%92%8C%E5%B9%B2%E6%97%B1%E6%97%A5");
	__SOLAR_FESTIVAL[10623]=decodeURI("%E5%9B%BD%E9%99%85%E5%A5%A5%E6%9E%97%E5%8C%B9%E5%85%8B%E6%97%A5");
	__SOLAR_FESTIVAL[10625]=decodeURI("%E5%85%A8%E5%9B%BD%E5%9C%9F%E5%9C%B0%E6%97%A5");
	__SOLAR_FESTIVAL[10626]=decodeURI("%E5%9B%BD%E9%99%85%E7%A6%81%E6%AF%92%E6%97%A5");
	__SOLAR_FESTIVAL[10701]=decodeURI("%E9%A6%99%E6%B8%AF%E5%9B%9E%E5%BD%92%E7%BA%AA%E5%BF%B5%E6%97%A5,%E4%B8%AD%E5%85%B1%E8%AF%9E%E8%BE%B0,%E4%B8%96%E7%95%8C%E5%BB%BA%E7%AD%91%E6%97%A5");
	__SOLAR_FESTIVAL[10702]=decodeURI("%E5%9B%BD%E9%99%85%E4%BD%93%E8%82%B2%E8%AE%B0%E8%80%85%E6%97%A5");
	__SOLAR_FESTIVAL[10707]=decodeURI("%E6%8A%97%E6%97%A5%E6%88%98%E4%BA%89%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[10711]=decodeURI("%E4%B8%96%E7%95%8C%E4%BA%BA%E5%8F%A3%E6%97%A5");
	__SOLAR_FESTIVAL[10730]=decodeURI("%E9%9D%9E%E6%B4%B2%E5%A6%87%E5%A5%B3%E6%97%A5");
	__SOLAR_FESTIVAL[10801]=decodeURI("%E5%BB%BA%E5%86%9B%E8%8A%82");
	__SOLAR_FESTIVAL[10808]=decodeURI("%E4%B8%AD%E5%9B%BD%E7%94%B7%E5%AD%90%E8%8A%82(%E7%88%B8%E7%88%B8%E8%8A%82)");
	__SOLAR_FESTIVAL[10815]=decodeURI("%E6%8A%97%E6%97%A5%E6%88%98%E4%BA%89%E8%83%9C%E5%88%A9%E7%BA%AA%E5%BF%B5");
	__SOLAR_FESTIVAL[10908]=decodeURI("%E5%9B%BD%E9%99%85%E6%89%AB%E7%9B%B2%E6%97%A5,%E5%9B%BD%E9%99%85%E6%96%B0%E9%97%BB%E5%B7%A5%E4%BD%9C%E8%80%85%E6%97%A5");
	__SOLAR_FESTIVAL[10909]=decodeURI("%E6%AF%9B%E6%B3%BD%E4%B8%9C%E9%80%9D%E4%B8%96%E7%BA%AA%E5%BF%B5");
	__SOLAR_FESTIVAL[10910]=decodeURI("%E4%B8%AD%E5%9B%BD%E6%95%99%E5%B8%88%E8%8A%82");
	__SOLAR_FESTIVAL[10914]=decodeURI("%E4%B8%96%E7%95%8C%E6%B8%85%E6%B4%81%E5%9C%B0%E7%90%83%E6%97%A5");
	__SOLAR_FESTIVAL[10916]=decodeURI("%E5%9B%BD%E9%99%85%E8%87%AD%E6%B0%A7%E5%B1%82%E4%BF%9D%E6%8A%A4%E6%97%A5");
	__SOLAR_FESTIVAL[10918]=decodeURI("%E4%B9%9D%C2%B7%E4%B8%80%E5%85%AB%E4%BA%8B%E5%8F%98%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[10920]=decodeURI("%E5%9B%BD%E9%99%85%E7%88%B1%E7%89%99%E6%97%A5");
	__SOLAR_FESTIVAL[10927]=decodeURI("%E4%B8%96%E7%95%8C%E6%97%85%E6%B8%B8%E6%97%A5");
	__SOLAR_FESTIVAL[10928]=decodeURI("%E5%AD%94%E5%AD%90%E8%AF%9E%E8%BE%B0");
	__SOLAR_FESTIVAL[11001]=decodeURI("%E5%9B%BD%E5%BA%86%E8%8A%82,%E4%B8%96%E7%95%8C%E9%9F%B3%E4%B9%90%E6%97%A5,%E5%9B%BD%E9%99%85%E8%80%81%E4%BA%BA%E8%8A%82");
	__SOLAR_FESTIVAL[11002]=decodeURI("%E5%9B%BD%E5%BA%86%E8%8A%82%E5%81%87%E6%97%A5,%E5%9B%BD%E9%99%85%E5%92%8C%E5%B9%B3%E4%B8%8E%E6%B0%91%E4%B8%BB%E8%87%AA%E7%94%B1%E6%96%97%E4%BA%89%E6%97%A5");
	__SOLAR_FESTIVAL[11003]=decodeURI("%E5%9B%BD%E5%BA%86%E8%8A%82%E5%81%87%E6%97%A5");
	__SOLAR_FESTIVAL[11004]=decodeURI("%E4%B8%96%E7%95%8C%E5%8A%A8%E7%89%A9%E6%97%A5");
	__SOLAR_FESTIVAL[11006]=decodeURI("%E8%80%81%E4%BA%BA%E8%8A%82");
	__SOLAR_FESTIVAL[11008]=decodeURI("%E5%85%A8%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E6%97%A5,%E4%B8%96%E7%95%8C%E8%A7%86%E8%A7%89%E6%97%A5");
	__SOLAR_FESTIVAL[11009]=decodeURI("%E4%B8%96%E7%95%8C%E9%82%AE%E6%94%BF%E6%97%A5,%E4%B8%87%E5%9B%BD%E9%82%AE%E8%81%94%E6%97%A5");
	__SOLAR_FESTIVAL[11010]=decodeURI("%E8%BE%9B%E4%BA%A5%E9%9D%A9%E5%91%BD%E7%BA%AA%E5%BF%B5%E6%97%A5,%E4%B8%96%E7%95%8C%E7%B2%BE%E7%A5%9E%E5%8D%AB%E7%94%9F%E6%97%A5");
	__SOLAR_FESTIVAL[11013]=decodeURI("%E4%B8%96%E7%95%8C%E4%BF%9D%E5%81%A5%E6%97%A5,%E5%9B%BD%E9%99%85%E6%95%99%E5%B8%88%E8%8A%82");
	__SOLAR_FESTIVAL[11014]=decodeURI("%E4%B8%96%E7%95%8C%E6%A0%87%E5%87%86%E6%97%A5");
	__SOLAR_FESTIVAL[11015]=decodeURI("%E5%9B%BD%E9%99%85%E7%9B%B2%E4%BA%BA%E8%8A%82(%E7%99%BD%E6%89%8B%E6%9D%96%E8%8A%82)");
	__SOLAR_FESTIVAL[11016]=decodeURI("%E4%B8%96%E7%95%8C%E7%B2%AE%E9%A3%9F%E6%97%A5");
	__SOLAR_FESTIVAL[11017]=decodeURI("%E4%B8%96%E7%95%8C%E6%B6%88%E9%99%A4%E8%B4%AB%E5%9B%B0%E6%97%A5");
	__SOLAR_FESTIVAL[11022]=decodeURI("%E4%B8%96%E7%95%8C%E4%BC%A0%E7%BB%9F%E5%8C%BB%E8%8D%AF%E6%97%A5");
	__SOLAR_FESTIVAL[11024]=decodeURI("%E8%81%94%E5%90%88%E5%9B%BD%E6%97%A5");
	__SOLAR_FESTIVAL[11031]=decodeURI("%E4%B8%96%E7%95%8C%E5%8B%A4%E4%BF%AD%E6%97%A5");
	__SOLAR_FESTIVAL[11107]=decodeURI("%E5%8D%81%E6%9C%88%E7%A4%BE%E4%BC%9A%E4%B8%BB%E4%B9%89%E9%9D%A9%E5%91%BD%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[11108]=decodeURI("%E4%B8%AD%E5%9B%BD%E8%AE%B0%E8%80%85%E6%97%A5");
	__SOLAR_FESTIVAL[11109]=decodeURI("%E5%85%A8%E5%9B%BD%E6%B6%88%E9%98%B2%E5%AE%89%E5%85%A8%E5%AE%A3%E4%BC%A0%E6%95%99%E8%82%B2%E6%97%A5");
	__SOLAR_FESTIVAL[11110]=decodeURI("%E4%B8%96%E7%95%8C%E9%9D%92%E5%B9%B4%E8%8A%82");
	__SOLAR_FESTIVAL[11111]=decodeURI("%E5%9B%BD%E9%99%85%E7%A7%91%E5%AD%A6%E4%B8%8E%E5%92%8C%E5%B9%B3%E5%91%A8(%E6%9C%AC%E6%97%A5%E6%89%80%E5%B1%9E%E7%9A%84%E4%B8%80%E5%91%A8)");
	__SOLAR_FESTIVAL[11112]=decodeURI("%E5%AD%99%E4%B8%AD%E5%B1%B1%E8%AF%9E%E8%BE%B0%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[11114]=decodeURI("%E4%B8%96%E7%95%8C%E7%B3%96%E5%B0%BF%E7%97%85%E6%97%A5");
	__SOLAR_FESTIVAL[11117]=decodeURI("%E5%9B%BD%E9%99%85%E5%A4%A7%E5%AD%A6%E7%94%9F%E8%8A%82,%E4%B8%96%E7%95%8C%E5%AD%A6%E7%94%9F%E8%8A%82");
	__SOLAR_FESTIVAL[11120]=decodeURI("%E5%BD%9D%E6%97%8F%E5%B9%B4");
	__SOLAR_FESTIVAL[11121]=decodeURI("%E5%BD%9D%E6%97%8F%E5%B9%B4,%E4%B8%96%E7%95%8C%E9%97%AE%E5%80%99%E6%97%A5,%E4%B8%96%E7%95%8C%E7%94%B5%E8%A7%86%E6%97%A5");
	__SOLAR_FESTIVAL[11122]=decodeURI("%E5%BD%9D%E6%97%8F%E5%B9%B4");
	__SOLAR_FESTIVAL[11129]=decodeURI("%E5%9B%BD%E9%99%85%E5%A3%B0%E6%8F%B4%E5%B7%B4%E5%8B%92%E6%96%AF%E5%9D%A6%E4%BA%BA%E6%B0%91%E5%9B%BD%E9%99%85%E6%97%A5");
	__SOLAR_FESTIVAL[11201]=decodeURI("%E4%B8%96%E7%95%8C%E8%89%BE%E6%BB%8B%E7%97%85%E6%97%A5");
	__SOLAR_FESTIVAL[11203]=decodeURI("%E4%B8%96%E7%95%8C%E6%AE%8B%E7%96%BE%E4%BA%BA%E6%97%A5");
	__SOLAR_FESTIVAL[11205]=decodeURI("%E5%9B%BD%E9%99%85%E7%BB%8F%E6%B5%8E%E5%92%8C%E7%A4%BE%E4%BC%9A%E5%8F%91%E5%B1%95%E5%BF%97%E6%84%BF%E4%BA%BA%E5%91%98%E6%97%A5");
	__SOLAR_FESTIVAL[11208]=decodeURI("%E5%9B%BD%E9%99%85%E5%84%BF%E7%AB%A5%E7%94%B5%E8%A7%86%E6%97%A5");
	__SOLAR_FESTIVAL[11209]=decodeURI("%E4%B8%96%E7%95%8C%E8%B6%B3%E7%90%83%E6%97%A5");
	__SOLAR_FESTIVAL[11212]=decodeURI("%E8%A5%BF%E5%AE%89%E4%BA%8B%E5%8F%98%E7%BA%AA%E5%BF%B5%E6%97%A5");
	__SOLAR_FESTIVAL[11213]=decodeURI("%E5%8D%97%E4%BA%AC%E5%A4%A7%E5%B1%A0%E6%9D%80%E5%9B%BD%E8%80%BB%E6%97%A5");
	__SOLAR_FESTIVAL[11220]=decodeURI("%E6%BE%B3%E9%97%A8%E5%9B%9E%E5%BD%92%E7%BA%AA%E5%BF%B5");
	__SOLAR_FESTIVAL[11221]=decodeURI("%E5%9B%BD%E9%99%85%E7%AF%AE%E7%90%83%E6%97%A5");
	__SOLAR_FESTIVAL[11224]=decodeURI("%E5%B9%B3%E5%AE%89%E5%A4%9C");
	__SOLAR_FESTIVAL[11225]=decodeURI("%E5%9C%A3%E8%AF%9E%E8%8A%82");
	__SOLAR_FESTIVAL[11226]=decodeURI("%E6%AF%9B%E6%B3%BD%E4%B8%9C%E8%AF%9E%E8%BE%B0%E7%BA%AA%E5%BF%B5");

    //#Begin Private properties
	var __year=null,__month=null,__day=null;
	//#End

	//#Begin Private methods
	this.DAYS_OF_MONTH = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	this.getDaysOfMonth = function(rYear,rMonth){
		return __daysInMonth(rYear,rMonth);
	};
	this.getFirstTimeOfMonth = function(rYear,rMonth){
		return rYear+"-"+rMonth+"-1 0:0:0";
	};
	this.getLastTimeOfMonth = function(rYear,rMonth){
		return rYear+"-"+rMonth+"-"+this.getDaysOfMonth(rYear,rMonth)+" 23:59:59";
	};
	var __daysInMonth = function(rYear,rMonth){
		rMonth--;
		if(rMonth==1){
			return(((rYear%4 == 0) && (rYear%100 != 0) || (rYear%400 == 0))? 29: 28);
		}else{
			return(__DAYS_OF_MONTH[rMonth]);
		}
	};
	//#End

	//#Begin Public methods
	this.getYear = function(){
		return __year;
	};
	this.setYear = function(v){
		__year = v;
	};
	this.getMonth = function(){
		return __month;
	};
	this.loadDate = function(v){
		return new Date(__year,__month,__day);
	};
	this.setDate = function(rDate){
		if(/Date/.test(rDate.constructor)){
			__year = rDate.getYear();
			__month = rDate.getMonth()+1;
			__day = rDate.getDate();
		}else{
			alert("JskitCalendar:setDate:Error:Invalid Params of rDate");
		}
	};
	this.setMonth = function(v){
		__month = v;
	};
	this.getDay = function(){
		return __day;
	};
	this.setDay = function(v){
		__day = v;
	};
	this.getCalendarList = function(){
		if(typeof(__year)=="undefined" || typeof(__month)=="undefined")return new Array();
		var _arr = new Array();
		var _days = __daysInMonth(__year,__month);
		var _d1 = new Date(__year,__month-1,1);
		var _d2 = new Date(__year,__month-1,_days);
		var _w1 = _d1.getDay();
		var _w2 = _d2.getDay();
		for(var i=0;i<_w1;i++)_arr.push("");
		for(var i=1;i<=_days;i++)_arr.push(i);
		for(var i=0;i<(7-_w2-1);i++)_arr.push("");
		var _out = new Array(),_tmp = new Array();
		for(var i=0;i<_arr.length;i++){
			_tmp.push(_arr[i]);
			if (i!=0 && (i+1) % 7 == 0) {
				_out.push(_tmp);
				_tmp = new Array();
			}
		}
		_days = _d1 = _d2 = _w1 = _w2 = _arr = _tmp = null;
		return _out;
	};
	this.nextYear = function(){
        __year++;
    };
    this.prevYear = function(){
        __year--;
    };
    this.nextMonth = function(){
		if(__month==12){
			__year++;
			__month = 1;
		}else{
			__month++;
		}
	};
	this.prevMonth = function(){
		if(__month==1){
			__year--;
			__month = 12;
		}else{
			__month--;
		}
	};
    //#End

	//#Begin Lunar object
	var __LUNAR = function () {
	    //#Begin Private propertyies
	    var __lunarData = __LUNARDATA;
	    var __isLeapMonth = null;
	    var __year = null, __month = null, __day = null;
	    var __solarYear = null, __solarMonth = null, __solarDay = null;
	    //#End

	    //#Begin Private propertyies
	    this.date = null;
	    //#End

	    //#Begin Private methods
	    var __dayOfFirstTerm = function () {
	        var _offDate = new Date((31556925974.7 * (__solarYear - 1900) + __TERMCODE[__solarMonth * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	        return (_offDate.getUTCDate());
	    };
	    var __daysInYear = function (y) {
	        var i, sum = 348;
	        for (i = 0x8000; i > 0x8; i >>= 1)
	            sum += (__lunarData[y - 1900] & i) ? 1 : 0;
	        return (sum + __daysInLeapMonth(y));
	    };
	    var __daysInLeapMonth = function (y) {
	        if (__leapMonthInYear(y)) {
	            return ((__lunarData[y - 1900] & 0x10000) ? 30 : 29);
	        } else {
	            return (0);
	        }
	    };
	    var __leapMonthInYear = function (y) {
	        return (__lunarData[y - 1900] & 0xf);
	    };
	    var __daysInMonth = function (y, m) {
	        return ((__lunarData[y - 1900] & (0x10000 >> m)) ? 30 : 29);
	    };
	    //#End
	    //#Begin Public methods
	    this.buildDate = function () {
	        this.date = new Array();
	        this.date["SYear"] = __solarYear;
	        this.date["SMonth"] = __solarMonth;
	        this.date["SDay"] = __solarDay;
	        this.date["Year"] = __year;
	        this.date["Month"] = __month;
	        this.date["MonthText"] = this.getMonthText();
	        this.date["Day"] = __day;
	        this.date["DayText"] = this.getDayText();
	        this.date["GanzhiYear"] = this.getGanZhiYear();
	        this.date["GanzhiMonth"] = this.getGanZhiMonth();
	        this.date["GanzhiDay"] = this.getGanZhiDay();
	        this.date["ShengXiao"] = this.getShengXiao();
	        this.date["SolarTerm"] = this.getSolarTerm();
	        this.date["Festival"] = this.getFestival();
	    };
	    this.getYear = function () {
	        return __year;
	    };
	    this.getMonth = function () {
	        return __month;
	    };
	    this.getDay = function () {
	        return __day;
	    };

	    this.getMonthText = function () {
	        return __MONTH_CN[__month - 1] + decodeURI("%E6%9C%88");
	    };
	    this.getDayText = function () {
	        var s;
	        switch (__day) {
	            case 10:
	                s = decodeURI('%E5%88%9D%E5%8D%81');
	                break;
	            case 20:
	                s = decodeURI('%E4%BA%8C%E5%8D%81');
	                break;
	            case 30:
	                s = decodeURI('%E4%B8%89%E5%8D%81');
	                break;
	            default:
	                s = __DAYTEXT_CN2[Math.floor(__day / 10)];
	                s += __DAYTEXT_CN1[__day % 10];
	        }
	        return (s);
	    };
	    this.getShengXiao = function () {
	        return __SHENGXIAO[(__year - 4) % 12];
	    };
	    this.monthTextCN = function () {
	        return (__isLeapMonth ? decodeURI('%E9%97%B0') : '') + __month + decodeURI('%E6%9C%88') + (__daysInMonth(__year, __month) == 29 ? decodeURI('%E5%B0%8F') : decodeURI(',%E5%A4%A7'));
	    };
	    this.getGanZhiYear = function () {
	        var _of = (__solarMonth < 2) ? (__year - 1900 + 35) : (__year - 1900 + 36);
	        return (__TIANGAN[_of % 10] + __DIZHI[_of % 12]);
	    };
	    this.getGanZhiMonth = function () {
	        var _firstDay = __dayOfFirstTerm();
	        var _of = (__solarYear - 1900) * 12 + __solarMonth + 12;
	        if (__solarDay >= _firstDay)
	            _of++;
	        return (__TIANGAN[_of % 10] + __DIZHI[_of % 12]);
	    };
	    this.getGanZhiDay = function () {
	        var _dayCyclical = Date.UTC(__solarYear, __solarMonth, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	        var _of = _dayCyclical + __solarDay - 1;
	        return (__TIANGAN[_of % 10] + __DIZHI[_of % 12]);
	    };
	    this.getSolarTerm = function () {
	        var _t1 = __dayOfFirstTerm(__solarYear, __solarMonth * 2);
	        var _t2 = __dayOfFirstTerm(__solarYear, __solarMonth * 2 + 1);
	        if (__solarDay == _t1)
	            return __SOLARTERM[__solarMonth * 2];
	        if (__solarDay == _t2)
	            return __SOLARTERM[__solarMonth * 2 + 1];
	        return "";
	    };
	    this.getFestival = function () {
	        var _lf = __LUNAR_FESTIVAL[(100 + __month) * 100 + __day];
	        if (_lf == null || _lf == "undefined")
	            _lf = "";
	        return _lf;
	    };
	    this.parseDate = function (rSolarDate) {
	        if (rSolarDate != null) {
	            this.parse(rSolarDate.getYear(), rSolarDate.getMonth() + 1, rSolarDate.getDate());
	        }
	    };
	    this.parse = function (rSolarYear, rSolarMonth, rSolarDay) {
	        rSolarMonth = (rSolarMonth < 0) ? 0 : (rSolarMonth - 1);
	        __solarYear = rSolarYear;
	        __solarMonth = rSolarMonth;
	        __solarDay = rSolarDay;
	        var i, leap = 0, temp = 0;
	        var offset = (Date.UTC(rSolarYear, rSolarMonth, rSolarDay) - Date.UTC(1900, 0, 31)) / 86400000;
	        for (i = 1900; i < 2050 && offset > 0; i++) {
	            temp = __daysInYear(i);
	            offset -= temp;
	            if (offset < 0) {
	                offset += temp;
	                break;
	            }
	        }
	        __year = i;
	        leap = __leapMonthInYear(i);
	        __isLeapMonth = false;
	        for (i = 1; i < 13 && offset > 0; i++) {
	            if (leap > 0 && i == (leap + 1) && !__isLeapMonth) {
	                --i;
	                __isLeapMonth = true;
	                temp = __daysInLeapMonth(__year);
	            }
	            else {
	                temp = __daysInMonth(__year, i);
	            }

	            if (__isLeapMonth && i == (leap + 1))
	                __isLeapMonth = false;

	            offset -= temp;
	        }
	        if (offset == 0 && leap > 0 && i == leap + 1)
	            if (__isLeapMonth) {
	                __isLeapMonth = false;
	            }
	            else {
	                __isLeapMonth = true;
	                --i;
	            }
	        if (offset < 0) {
	            offset += temp;
	            --i;
	        }
	        __month = i;
	        __day = offset + 1;
	        this.buildDate();
	        return __year + "-" + __month + "-" + __day;
	    };
	    //#End
	};  //#End __LUNAR definetion
    var __SOLAR = function(){
        var __year = null, __month = null, __day = null, __dayOfWeek = null;
        this.date = null;
		this.getFestival = function(){
            var _lf = __SOLAR_FESTIVAL[(100 + __month) * 100 + __day];
            if (_lf == null || _lf == "undefined")
                _lf = "";
            return _lf;
        };
        this.buildDate = function(){
            this.date = new Array();
            this.date["Year"] = __year;
            this.date["Month"] = __month;
            this.date["Day"] = __day;
            this.date["Week"] = __week;
            this.date["Festival"] = this.getFestival();
        };
        this.parse = function(rYear, rMonth, rDay){
            rMonth = (rMonth < 0) ? 0 : (rMonth - 1);
            var _date = new Date(rYear, rMonth, rDay);
            __year = rYear;
            __month = rMonth;
            __day = rDay;
            __week = _date.getDay();
            this.buildDate();
        };
    };
    var __CLOCK = function(){
        var __DateItem = function(){
            this.year = 0;
            this.month = 0;
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            this.msecond = 0;
        };
        var __di = null;
        var __parseDate = function(rDate){
            __di = new __DateItem();
            __di.year = rDate.getYear();
            __di.month = rDate.getMonth()+1;
            __di.day = rDate.getDate();
            __di.hour = rDate.getHours();
            __di.minute = rDate.getMinutes();
            __di.second = rDate.getSeconds();
            __di.msecond = rDate.getMilliseconds();
        };
        var __convert = function(v){
            v = (v<10)?("0"+v):v;
            return v;
        };
        var __parseClock = function(rFormat){
            if(jskitUtil.str.isNullOrEmpty(rFormat))
                rFormat = "yyyy-MM-dd hh:mm:ss";
            var _str = rFormat.replace(/yyyy/gi,__di.year);
            if(_str.has("yy","gi")){
                _str = _str.replace(/yy/gi,((""+__di.year).substr(2,2)));
            }
            if(_str.indexOf("MM")!=-1){
                _str = _str.replace(/MM/g,__convert(__di.month));
            }
            if(_str.has("dd","gi")){
                _str = _str.replace(/dd/gi,__convert(__di.day));
            }
            if(_str.has("hh","gi")){
                _str = _str.replace(/hh/gi,__convert(__di.hour));
            }
            if(_str.indexOf("mm")!=-1){
                _str =_str.replace(/mm/g, __convert(__di.minute));
            }
            if(_str.has("ss","gi")){
                _str = _str.replace(/ss/gi,__convert(__di.second));
            }
            _str = _str.replace(/M/g,__di.month);
            _str = _str.replace(/d/gi,__di.day);
            _str = _str.replace(/h/gi,__di.hour);
            _str = _str.replace(/m/g,__di.minute);
            _str = _str.replace(/s/gi,__di.second);
            _str = _str.replace(/ms/gi,__di.msecond);
            return _str;
        };
        this.toString = function(rFormat){
            __parseDate(new Date());
            return __parseClock(rFormat);
        };
    };
    {//constructor
        this.lunar = new __LUNAR();
        this.solar = new __SOLAR();
        this.clock = new __CLOCK();
		var _d = new Date();
		__year = _d.getYear();
		//Firefox
		if(__year<2000)__year+=1900;
		__month = _d.getMonth()+1;
		__day = _d.getDate();
		_d = null;
    }
};