window.onfire=require("onfire");           //处理事件的类库
var netConfig=require('NetConfig');
//var WebSocket=require('ws');

var NetControl={
    _sock:{},  //当前的webSocket的对象
    connect: function () {
        console.log("connect")
        if(this._sock.readyState!==1){
            //当前接口没有打开
            //重新连接
            console.log("try connect:", netConfig.host + ":" + netConfig.port)
            this._sock = new WebSocket(netConfig.host + ":" + netConfig.port); 
            this._sock.onopen = this._onOpen.bind(this);
            this._sock.onclose = this._onClose.bind(this);
            this._sock.onmessage = this._onMessage.bind(this);
            //console.log("this._sock.send:", )
        }
        //this.send(0)
        return this;
    },

    _onOpen:function(){
        onfire.fire("onopen");
    },
    _onClose:function(err){
        onfire.fire("onclose",err);
    },
    _onMessage:function(obj){
        onfire.fire("onmessage",obj);
    },

    send:function(msg){
        console.log("send:", msg)
        this._sock.send(msg);
    },

};

module.exports=NetControl;