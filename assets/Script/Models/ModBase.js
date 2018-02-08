
module.exports = cc.Class({
    extends: cc.Component,

    _initData: function (){
        
    },
    // use this for initialization
    onLoad: function () {
        this.MgrSocket = cc.find("MgrSocket").getComponent("MgrSocket")
        this.MgrView = cc.find("MgrView").getComponent("MgrView")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
