cc.Class({
    extends: require("CtlBase"),

    // use this for initialization
    afterLoad: function (){
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")
        this.ModHall = cc.find("MgrModel").getComponent("ModHall")
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    tryMatch: function (){
        this.onMatch()
    },
    onMatch: function (){
        this.ModHall.onMatch()

        var self = this
        setTimeout(function(){
            self.onMchSuc()
        }, 1000)
    },
    onMchSuc: function (){
        this.ModHall.onMchSuc()
        
        var self = this
        setTimeout(function(){
            self.onJoinTbl()
        }, 1000)
    },

    tryCMatch: function (){
        this.onCMatch()
    },
    onCMatch: function (){
        this.ModHall.onCMatch()
    },

    tryJoin: function (){
        this.onJoinTbl()
    },
    onJoinTbl: function (){
        this.ModHall.onJoinTbl()
    },
});
