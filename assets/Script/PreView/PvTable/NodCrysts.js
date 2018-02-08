cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        LayCrsA:{
            default:null,
            type:cc.Node,
        },
        LayCrsB:{
            default:null,
            type:cc.Node,
        },

        PreCryst:{
            default:null,
            type:cc.Prefab,
        },
    },
    _initData: function (){
        this._cra_ctls = null
        this._crb_ctls = null
    },
    // use this for initialization
    onLoad: function () {
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    cleanCrysts: function (){
        this.LayCrsA.removeAllChildren()
        this.LayCrsB.removeAllChildren()

        this._cra_ctls = []
        this._crb_ctls = []
    },
    castCryst: function (plr_flag){
        if(plr_flag){
            var cryst = cc.instantiate(this.PreCryst)
            this.LayCrsA.addChild(cryst)
            var crt_ctl = cryst.getComponent("PreCryst")
            this._cra_ctls[this._cra_ctls.length] = crt_ctl
        }else{
            var cryst = cc.instantiate(this.PreCryst)
            this.LayCrsB.addChild(cryst)
            var crt_ctl = cryst.getComponent("PreCryst")
            this._crb_ctls[this._crb_ctls.length] = crt_ctl
        }
        //this.syncCryst()
    },
    syncCryst: function (){
        var player_a = this.ModTable.getPlayerA()
        for(var i = 0; i < this._cra_ctls.length; i ++){
            var c_color = Math.floor(player_a.plr_crts[i] / 10)
            var c_full = player_a.plr_crts[i] % 10
            this._cra_ctls[i].setCrtColor(c_color)
            this._cra_ctls[i].setFull(c_full)
        }

        var player_b = this.ModTable.getPlayerB()
        for(var i = 0; i < this._crb_ctls.length; i ++){
            var c_color = Math.floor(player_b.plr_crts[i] / 10)
            var c_full = player_b.plr_crts[i] % 10
            this._crb_ctls[i].setCrtColor(c_color)
            this._crb_ctls[i].setFull(c_full)
        }
    },
});
