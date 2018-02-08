cc.Class({
    extends: require("OrgTPlr"),

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
        BoxCard:{
            default:null,
            type:cc.Node,
        },
        NodBet:{
            default:null,
            type:cc.Node,
        },

        LblPt1:{
            default:null,
            type:cc.Label,
        },
        LblPt2:{
            default:null,
            type:cc.Label,
        },
        LblMoney:{
            default:null,
            type:cc.Label,
        },
        LblAMoney:{
            default:null,
            type:cc.Label,
        },
    },

    /*_initData: function (){
        this._super()

    },*/
    _initView: function (){
        var C_POS = [cc.p(-68, 114), cc.p(68, 114), cc.p(-68, -114), cc.p(68, -114)]
        this._card_ctls = []
        for(var i = 0; i < 4; i ++){
            var voj_card = this.MgrVobj.getVobj("VojCard")
            voj_card.setPosition(C_POS[i])
            this.BoxCard.addChild(voj_card)
            var card_ctl = voj_card.getComponent("VojCard")
            card_ctl.setDrgFlag(false)
            card_ctl.setVisible(false)
            this._card_ctls[i] = card_ctl
        }

    },
    // use this for initialization
    onLoad: function () {
        this._super()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    initPlr: function (){
        this.setCDatas()
        this.LblMoney.node.active = this._slf_flg
    },
    setSlfFlag: function (value){
        this._slf_flg = value
        for(var i = 0; i < 4; i ++){
            this._card_ctls[i].setCover(!value)
        }
        this.NodBet.active = value
    },
    syncPoint: function (){
        this.LblPt1.string = this.getPtTxt(this._card_ctls[0].getCPoint(), this._card_ctls[1].getCPoint())
        this.LblPt2.string = this.getPtTxt(this._card_ctls[2].getCPoint(), this._card_ctls[3].getCPoint())
    },

    showMoney: function (){
        this.LblMoney.node.active = true
    },
    syncMoney: function (){
        this.LblMoney.string = this._money
        this.LblAMoney.string = this._all_mny
    },

    onTouch: function (){
        if(this._slf_flg){
            this.MgrView.showView("PvBet", this.getCDatas())
        }
    },
    onSure: function (){
        this.BtnSure.active = false
    },
});
