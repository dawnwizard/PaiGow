
cc.Class({
    extends: require("CtlBase"),

    // use this for initialization
    afterLoad: function (){
        this.ModBuild = cc.find("MgrModel").getComponent("ModBuild")
    },

    trySavDeck: function (d_data){
        this.MgrSocket.tryEmit('savDeck', {deck_data:d_data})
    },
    tryDelDeck: function (deck_id){
        this.MgrSocket.tryEmit('delDeck', {deck_id:deck_id})
    },

    _addListener: function (){
        this.MgrSocket.addListener('CtlBuild', 'setDeck')
        this.MgrSocket.addListener('CtlBuild', 'deckSuc')
    },
    onResult: function (e_name, result){
        switch(e_name){
            /*case 'setDeck':
                if(result.ecode == 0){
                    this.ModBuild.setDeck(result.data)
                    this.syncDList()
                }
                break;
            case 'deckSuc':
                if(result.ecode == 0){
                    this.syncDList()
                    //this.ModBuild.setDeck(result.data)
                }
                break;
            default:
                break;*/
        }
    },

    syncDList: function (){
        var pv_build = this.MgrView.getView(this.MgrView.VIEW_BUILD)
        if(pv_build){
            pv_build.syncDList()
        }
    }
});
