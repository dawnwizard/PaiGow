const C_POS = [cc.p(-80, 140), cc.p(80, 140), cc.p(-80, -140), cc.p(80, -140)]
const C_MTX = [[0, 1], [2, 3], []]
const PT_TXT = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

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
        SldMoney:{
            default:null,
            type:cc.Slider,
        },
        LblMoney:{
            default:null,
            type:cc.Label,
        },
        lblAllMny:{
            default:null,
            type:cc.Label,
        },

        ViewType:2,
    },

    _initData: function(){
        this._card_dtas = []
        this._money = 100
        this._all_mny = 0
    },
    _initView: function (){
        this._card_ctls = []
        for(var i = 0; i < 4; i ++){
            var voj_card = this.MgrVobj.getVobj("VojCard")
            voj_card.setPosition(C_POS[i])
            this.BoxCard.addChild(voj_card)
            var card_ctl = voj_card.getComponent("VojCard")
            card_ctl.setDrgFlag(true)
            card_ctl.setCover(false)
            this._card_ctls[i] = card_ctl
        }
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this._initData()
        this._initView()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    showSelf: function (data){
        this.node.active = true

        this._card_dtas = data || []
        this._all_mny = 10000
        this.syncShows()
    },
    closeSelf: function (){
        this.node.active = false
    },

    swopCard: function (pos1, pos2){
        var idx1 = this._getIdxByPos(pos1)
        var idx2 = this._getIdxByPos(this.BoxCard.convertToNodeSpace(pos2))

        cc.log("idx1:", idx1, "idx2:", idx2)
        if(idx1 >= 0 && idx2 >= 0){
            var tmp_data = this._card_dtas[idx1]

            this._card_dtas[idx1] = this._card_dtas[idx2]
            this._card_ctls[idx1].setVisible(Boolean(this._card_dtas[idx1]))
            this._card_ctls[idx1].setCardData(this._card_dtas[idx1])

            this._card_dtas[idx2] = tmp_data
            this._card_ctls[idx2].setVisible(Boolean(this._card_dtas[idx2]))
            this._card_ctls[idx2].setCardData(this._card_dtas[idx2])
            this.syncPoint()
        }
    },
    syncShows: function (){
        var card_dtas = this._card_dtas
        for(var i = 0; i < 4; i ++){
            var card_ctl = this._card_ctls[i]
            card_ctl.setVisible(Boolean(card_dtas[i]))
            card_ctl.setCardData(card_dtas[i])
        }
        this.syncMoney()
        this.syncPoint()
    },
    syncPoint: function (){
        this.LblPt1.string = this.getPtTxt(this._card_ctls[0].getCPoint(), this._card_ctls[1].getCPoint())
        this.LblPt2.string = this.getPtTxt(this._card_ctls[2].getCPoint(), this._card_ctls[3].getCPoint())
    },
    getPtTxt: function (pt1, pt2){
        var text = "0点"
        cc.log("pt1", pt1, "pt2", pt2, pt1 == pt2)
        if(pt1 == pt2){
            text = "对" + PT_TXT[pt1]
        }else{
            text = ((pt1 || 0) + (pt2 || 0)) % 10 + "点"
        }
        return text
    },
    syncMoney: function (){
        this.SldMoney.progress = this._money / this._all_mny
        this.LblMoney.string = this._money
        this.lblAllMny.string = this._all_mny
    },

    onTouch: function (){
        var vc_table = this.MgrView.getViewCtl("PvTable")
        vc_table.setMCDatas(this._card_dtas)
        vc_table.setMMoney(this._money)

        this.MgrView.closeView("PvBet")
    },
    onSlider: function (){
        this._money = Math.round(this.SldMoney.progress * this._all_mny / 100) * 100
        this._money = Math.max(this._money, 100)
        this.syncMoney()
    },

    _getIdxByPos: function (nod_pos){
        cc.log("nod_pos:", nod_pos.x, nod_pos.y)
        var row = 2
        var col = 2
        if(Math.abs(nod_pos.y - 140) <= 100){
            row = 0
        }
        if(Math.abs(nod_pos.y + 140) <= 100){
            row = 1
        }
        if(Math.abs(nod_pos.x + 60) <= 60){
            col = 0
        }
        if(Math.abs(nod_pos.x - 60) <= 60){
            col = 1
        }
        /*if(nod_pos.y >= 40 && nod_pos.y <= 240){
            row = 0
        }else if(nod_pos.y >= -240 && nod_pos.y <= -40){
            row = 1
        }

        if(nod_pos.x >= -140 && nod_pos.x <= -20){
            col = 0
        }else if(nod_pos.x >= 20 && nod_pos.x <= 140){
            col = 1
        }*/

        cc.log("row:", row, "col", col)
        return C_MTX[row][col]
    },
});
