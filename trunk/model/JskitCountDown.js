var JskitCountDown = function(rHd){
    var __hd = (typeof(rHd)=="string")?__hd:"jskitCountDown";
    var __ts = null;//time span
    var __srcDate = null;
    var __count = function(){
        if(typeof(__srcDate)=="object"){
            var _now = new Date();
            __ts = jskitUtil.date.timeSpan(__srcDate,_now);
        }else{
            __ts = null;
        }
    };
};