cc.Class({
    extends: require("ModBase"),

    // use this for initialization
    _initData: function (){
        this._user_id = null
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setDeck: function (data){
        this._user_id = data.user_id
        this.MgrView.showView(this.MgrView.VIEW_BUILD)
    },
});
