
var TCode = require('TCode')

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    _initData: function (){
        this._my_uid = 0
    },
    _initMsg: function (){

        var self = this
        function onmessage(obj){
            self.onMsg(obj)
        }
        onfire.on("onmessage", onmessage);
    },
    _heatBeat: function (){
        var self = this
        self.sendMsg("beat")
        setInterval(function(){
            self.sendMsg("beat")
            /*var netControl = require('NetControl')
            var connect = netControl.connect()
            connect.send("heat_beat")*/
            /*if(self._connect){
                self._connect.send("beat")
            }else{
                self._reConnect()
            }*/
        }, 5000)
    },
    _reConnect: function (){
        var netControl = require('NetControl')
        this._connect = netControl.connect()
    },
    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node)

        this._initData()
        this._initMsg()
    },

    start: function () {
        this._heatBeat()
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    sendMsg: function (t_msg){
        var netControl = require('NetControl')
        var connect = netControl.connect()
        var s_msg = this._my_uid.toString() + "$|"
        s_msg = s_msg + TCode.enCode(t_msg)
        cc.log("s_msg:", s_msg)
        connect.send(s_msg)
    },
    onMsg: function (obj){
        cc.log("onMsg:",obj.type, obj.data)
    },


















    _tryBeat: function (){
        if(this._socket && this._idt_data.user_id){
            var beat_flag = this._socket.emit('beat', this._idt_data.user_id)
        }
    },
    tryConnect: function (){
        /*cc.log("connct:", connct)
        connct.send("test");*/



        /*var socket = io.connect("http://localhost:3000")
        socket.on("connected", function (msg){
            return msg
        })
        this._socket = socket*/
    },
    onMessage:function(obj){
        console.log("It's HelloWorld onMessage----->", obj);
    },

    setUserId: function (user_id){
        this._idt_data.user_id = user_id
    },
    getUserId: function (){
        return this._idt_data.user_id
    },
    setTableId: function (table_id){
        this._idt_data.table_id = table_id
    },
    cleanIdtData: function (){
        this._idt_data = {}
    },
    getIdtData: function (){
        return this._idt_data
    },
    isMySelf: function (user_id){
        return this._idt_data.user_id == user_id
    },


/*****************************************************************************/
    addListener: function (c_name, e_name) {
        /*var ctrl = cc.find("MgrCtrl").getComponent(c_name)
        this._socket.on(e_name, function (result){
            var result = JSON.parse(result)
            cc.log("onResult:", e_name, result.ecode)
            ctrl.onResult(e_name, result)
        })*/
    },

    tryEmit: function (e_name, data, idt_data){
        /*var data = data || {}
        data.idt_data = idt_data || this.getIdtData()
        this._socket.emit(e_name, JSON.stringify(data))*/
    },
});
