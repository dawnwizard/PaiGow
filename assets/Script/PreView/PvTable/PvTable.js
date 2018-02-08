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
        NodTable:{
            default:null,
            type:cc.Node,
        },
        NodBanker:{
            default:null,
            type:cc.Node,
        },
        NodPlayer:{
            default:null,
            type:cc.Node,
        },

        ViewType:0,
    },

    _initData: function (){
        this._slf_idx = null
    },
    _initView: function (){
        this._plr_ctls = []
        var voj_bkr = this.MgrVobj.getVobj("VojBanker")
        this.NodBanker.addChild(voj_bkr)
        var bkr_ctl = voj_bkr.getComponent("VojBanker")
        this._bkr_ctl = bkr_ctl
        this._plr_ctls[0] = bkr_ctl

        var C_POS = [null, cc.p(-400, 0), cc.p(0, 0), cc.p(400, 0)]
        for(var i = 1; i < 4; i ++){
            var voj_plr = this.MgrVobj.getVobj("VojPlayer")
            voj_plr.setPosition(C_POS[i])
            this.NodPlayer.addChild(voj_plr)
            var plr_ctl = voj_plr.getComponent("VojPlayer")
            this._plr_ctls[i] = plr_ctl
        }
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this._initData()
        this._initView()
        //this.NodTable.rotation = 180
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    showSelf: function (data){
        this.node.active = true
        this._slf_idx = 2

        this.syncShows()
    },
    closeSelf: function (){
        this.node.active = false
    },
    syncShows: function (){
        for(var i = 0; i < 4; i ++){
            var plr_ctl = this._plr_ctls[i]
            plr_ctl.initPlr()
            plr_ctl.setSlfFlag(this._slf_idx == i)
        }

        var deck = [
            1, 5, 3, 12, 
            6, 2, 4, 6, 
            9, 8, 3, 12, 
            9, 2, 1, 7
        ]
        this.sendCards(0, deck)
    },
    sendCards: function (idx, deck){
        cc.log("sendCards:", idx)
        if(idx < deck.length){
            this._plr_ctls[idx % 4].addCard(Math.floor(idx / 4), {point:deck[idx]})

            var self = this
            setTimeout(function(){
                self.sendCards(idx + 1, deck)
            }, 200)
        }
    },

    setMCDatas: function (c_dtas){
        var slf_ctl = this.getSlfCtl()
        slf_ctl.setCDatas(c_dtas)
    },
    setMMoney: function (value){
        var slf_ctl = this.getSlfCtl()
        slf_ctl.setMoney(value)
    },
    getSlfCtl: function (){
        return this._plr_ctls[this._slf_idx]
    },

    onEndTurn: function (){
        this.CtlTable.tryEndTurn()
    },
});
