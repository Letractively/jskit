function JskitTask(rHd) {
    var __hd = (typeof(rHd) == "string") ? rHd : "jskitTask";
    var __attr = new Array();
    //method 属性
    __attr["method"] = "get";
    //当前状态属性
    var __status = null;
    //执行动作的对象:iframe
    var __actorId = jskitUtil.guid();
    var __actor = null;
    var __panel = null;
    var __actionBeginTime = null;
    //允许最大延迟时间，单位：秒
    var __timeout = 5000;
    //显示信息的对象
    var __log = new Array();
    var __logOuter = null;
    //计时器
    var __timer = null;
    //任务列表
    var __taskList = new Array();
    //任务列表游标
    var __index = 0;
    //定义状态类型
    var __STATUS = new function() {
        this.READY = 0;
        this.SENDING = 1;
        this.CALLBACK = 2;
        this.DONE = 3;
        this.ERROR = 4;
    };
    //定义任务对象
    var __Task = function() {
        this.name = "";
        this.action = "";
        this.method = "";
        this.type = "";
        this.callback = "";
        this.result = "";
    };
    var __TYPE = new function() {
        this.FUNC = "func";
        this.URL = "url";
    };
    var __appendPanel = function(){
        if(__panel==null){
            __panel = document.createElement("div");
            __panel.style.position = "absolute";
            __panel.style.backgroundColor = "#eeeeee";
            __panel.style.border = "2px outset #ffffff";
            __panel.style.padding = "5px 5px 5px 5px";
            __panel.innerHTML = '<div>'
                    + '<input type="button" onclick="'+__hd+'.reset()" value="Reset" />'
                    + '<input type="button" onclick="'+__hd+'.start()" value="Start" />'
                    + '<input type="button" onclick="'+__hd+'.pause()" value="Pause" />'
                    + '<input type="button" onclick="'+__hd+'.stop()" value="Stop" />'
                    + '</div>';

            __logOuter = document.createElement("div");
            __panel.appendChild(__logOuter);
            $$("body").appendChild(__panel);
        }
        __printLog();
    };
    //显示信息
    var __logger = function(rMsg){
        var _d = new Date();
        var _msg = _d.toJskitString() + " " +rMsg;
        __log.push(_msg);
        __outputLog(_msg);
    };
    var __printLog = function(){
        if(__logOuter!=null){
           __logOuter.innerHTML = __log.join('<br>');
        }
    };
    var __outputLog = function(rMsg){
        if(__logOuter!=null){
            __logOuter.innerHTML += rMsg + "<br>";
		}
    };
    var __buildActor = function() {
        __actor = $$("#" + __actorId);
        if (__actor == null) {
            __actor = document.createElement("iframe");
            __actor.setAttribute("src", "");
            __actor.setAttribute("id", __actorId);
            __actor.style.width = "0px";
            __actor.style.height = "0px";
            $$("body").appendChild(__actor);
        }
    };
    //添加一个任务
    var __addTask = function(rTask) {
        __taskList.push(rTask);
    };
    //执行任务的动作
    var __doAction = function() {
        __actionBeginTime = new Date().getTime();
        var _task = __taskList[__index];
        __logger("Processing : " + _task.name);
        if (_task.type == __TYPE.FUNC) {//function
            __setStatus(__STATUS.SENDING);
            eval(_task.action);
        } else if (_task.type == __TYPE.URL) {//url
            if (__actor == null){
                __buildActor();
			}
            if (__actor == null) {
                __logger("actor is null");
                __stop();
            } else {
                __setStatus(__STATUS.SENDING);
                __actor.src = _task.action;
            }
        } else {//unknown
            __logger("do action:unknown task type");
            __next();
        }
    };
    //检查动作执行状况
    var __checkAction = function() {
        var _time = new Date().getTime();
        var _span = (_time - __actionBeginTime) ;
        if (_span > __timeout) {
            __logger("Timeout");
            __next();
            return false;
        } else {
            //检查目标页面是否装载完成
        }
    };
    //执行回调
    var __doCallBack = function() {
        __logger("do callback");
        var _task = __taskList[__index];
        eval(_task.callback + "(" + _task.result + ")");
        __setStatus(__STATUS.DONE);
    };
    //下一条任务
    var __next = function() {
        __logger("next");
        __index++;
        __setStatus(__STATUS.READY);
    };
    //处理任务列表
    var __doProcess = function() {
        if (__index >= __taskList.length) {
            __logger("finish");
            __stop();
            return;
        }
        if (__status == __STATUS.READY) {
            __doAction();
        } else if (__status == __STATUS.SENDING) {
            __checkAction();
        } else if (__status == __STATUS.CALLBACK) {
            __doCallBack();
        } else if (__status == __STATUS.DONE) {
            __next();
        } else if (__status == __STATUS.ERROR) {
            __logger("status:error");
            __stop();
        } else if (__status == null) {
            __logger("status is null");
            __stop();
        } else {
            __logger("unknown status:" + __status);
            __stop();
        }
    };
    var __setStatus = function(status){
        __status = status;
        __logger("status:"+status);
    };
    var __stop = function() {
        __status = null;
        if (__timer != null) {
            window.clearInterval(__timer);
            __timer = null;
        }
        __index = 0;
        __logger("Stop");
    };
    var __pause = function(){
        if (__timer != null) {
            window.clearInterval(__timer);
            __timer = null;
        }
        __logger("Pause");
    };
    var __start = function() {
        __logger("Start");
        __setStatus(__STATUS.READY);
        __timer = window.setInterval(__hd + ".doProcess()", 10);
    };
    var __reset = function() {
        __logger("Reset");
        __stop();
        __status = null;
        __clearLog();

    };
    var __clearLog = function(){
        __log = new Array();
        if(__logOuter!=null){
            __logOuter.innerHTML = "";
		}
    };

    //---------------------------------------
    this.setTimeout = function(v){
        __timeout = (typeof(v)=="number")?(v*1000):5000;
    };
    this.load = function(tasks) {
        var _task = null;
        for (var i = 0; i < tasks.length; i++) {
            _task = new __Task();
            _task.name = tasks[i]["name"];
            _task.action = tasks[i]["action"];
            _task.method = null;
            _task.type = tasks[i]["type"];
            _task.callback = tasks[i]["callback"];
            __addTask(_task);
        }
        __reset();
    };
    this.addUrlTask = function(rName, rUrl, rCallback) {
        var _task = new __Task();
        _task.name = rName;
        _task.action = rUrl;
        _task.method = null;
        _task.type = __TYPE.URL;
        _task.callback = rCallback;
        __addTask(_task);
    };
    this.addFuncTask = function(rName, rFunc, rCallback) {
        var _task = new __Task();
        _task.name = rName;
        _task.action = rFunc;
        _task.method = null;
        _task.type = __TYPE.FUNC;
        _task.callback = rCallback;
        __addTask(_task);
    };
    this.done = function(){
        __logger("Done");
        __next();
    };
    this.getLogArray = function() {
        return __log;
    };
    this.setActor = function(obj) {
        __actor = obj;
        __actorId = obj.getAttribute("id");
    };
    this.showPanel = function(rParent){
        __appendPanel();
        if(rParent!=null && typeof(rParent.appendChild)!="undefined"){
            rParent.appendChild(__panel);
        }
    };
    this.setLogOuter = function(obj) {
        __logOuter = (typeof(obj)=="object")?obj:null;
    };
    this.doProcess = function() {
        __doProcess();
    };
    this.start = function() {
        __start();
    };
    this.stop = function(){
        __stop();
    };
    this.pause = function(){
        __pause();
    };
    this.reset = function(){
        __reset();
    };
};