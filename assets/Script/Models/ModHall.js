cc.Class({
    extends: require("ModBase"),

    // use this for initialization
    _initData: function (){

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onMatch: function (data){
        var vc_hall = this.MgrView.getViewCtl("PvHall")
        vc_hall.setMatchSta(true)
    },
    onCMatch: function (data){
        var vc_hall = this.MgrView.getViewCtl("PvHall")
        vc_hall.setMatchSta(false)
    },
    onMchSuc: function (data){
        var vc_hall = this.MgrView.getViewCtl("PvHall")
        vc_hall.bandMatch()
    },
    onJoinTbl: function (){
        this.MgrView.showView("PvTable")
    },

    

    getSlcDeck: function (){
        return this._slc_deck
    },
});
