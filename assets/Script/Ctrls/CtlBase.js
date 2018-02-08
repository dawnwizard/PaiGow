cc.Class({
    extends: cc.Component,

    _addListener: function (){

    },
    // use this for initialization
    onLoad: function (){
        this.MgrSocket = cc.find("MgrSocket").getComponent("MgrSocket")
        this.MgrView = cc.find("MgrView").getComponent("MgrView")

        this.afterLoad()
    },
    afterLoad: function (){

    },
    start: function (){
        this._addListener()
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
