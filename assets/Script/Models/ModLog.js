cc.Class({
    extends: require("ModBase"),

    // use this for initialization
    _initData: function (){
        this._user_data = {}
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onLogin: function (data){
        this._user_data = data
        this.MgrView.showView("PvHall")
    },










    syncData: function (data){
        this._user_data = data
    },
    syncDeck: function (data){
        this._user_data.all_decks = data
        var vc_build = this.MgrView.getViewCtl("PvBuild")
        if(vc_build){
            vc_build.syncDList()
        }

        if(!this._user_data.slc_deck){
            var pv_match = this.MgrView.getViewCtl("PvMatch")
            if(pv_match){
                var lgl_decks = this.getLglDecks()
                if(lgl_decks.length > 0){
                    pv_match.selecDeck(lgl_decks[0].deck_id)
                }
            }
        }
    },
    setSlcDeck: function (data){
        this._user_data.slc_deck = data
        var pv_match = this.MgrView.getViewCtl("PvMatch")
        if(pv_match){
            pv_match.setSlcDeck(data)
        }
    },
    doLogout: function (){
        this._initData()
        this.MgrSocket.cleanIdtData()

        this.MgrView.showView("PvLog")
    },
    getUserId: function (){
        return this._user_data.user_id
    },
    getAllDecks: function (){
        return this._user_data.all_decks
    },
    getLglDecks: function (){
        var lgl_decks = []
        var all_decks = this.getAllDecks()
        lgl_decks = all_decks
        return lgl_decks
    },
    getDckData: function (d_id){
        var all_decks = this._user_data.all_decks
        for(var i = 0; i < all_decks.length; i ++){
            cc.log("all_decks[i].deck_id:", all_decks[i].deck_id, d_id)
            if(all_decks[i].deck_id == d_id){
                return all_decks[i]
            }
        }
    },
});
