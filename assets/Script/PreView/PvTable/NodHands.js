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
        LayHandA:{
            default:null,
            type:cc.Node,
        },
        LayHandB:{
            default:null,
            type:cc.Node,
        },
        BtnShowH:{
            default:null,
            type:cc.Button,
        },
        BtnHideH:{
            default:null,
            type:cc.Button,
        },
    },
    _initData: function (){
        this._hcb_ctls = null
        this._hca_ctls = null
    },
    // use this for initialization
    onLoad: function () {
        this.MgrSocket = cc.find("MgrSocket").getComponent("MgrSocket")
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")
        this.MgrPrefeb = cc.find("MgrPrefeb").getComponent("MgrPrefeb")

        this._initData()
        this.onShowH()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    cleanHands: function (){
        this.cleanHandA()
        this.cleanHandB()
    },
    cleanHandA: function (){
        this.LayHandA.removeAllChildren()
        this._hca_ctls = []
    },
    cleanHandB: function (){
        this.LayHandB.removeAllChildren()
        this._hcb_ctls = []
    },
    drawCards: function (user_id, card_ids){
        for(var i = 0; i < card_ids.length; i ++){
            if(this.MgrSocket.isMySelf(user_id)){
                this.drawCardA(card_ids[i])
                this._resetSpacingA()
            }else{
                this.drawCardB(card_ids[i])
                this._resetSpacingB()
            }
        }
    },
    drawCardA: function (card_id){
        var card = this.MgrPrefeb.getPrefeb("PreCardT")
        this.LayHandA.addChild(card)
        var card_ctl = card.getComponent("PreCardT")
        card_ctl.setCardId(card_id)
        card_ctl.setDragAble(true)
        this._hca_ctls[this._hca_ctls.length] = card_ctl
    },
    drawCardB: function (card_id){
        var card = this.MgrPrefeb.getPrefeb("PreCardT")
        this.LayHandB.addChild(card)
        var card_ctl = card.getComponent("PreCardT")
        card_ctl.setCardId(card_id)
        this._hcb_ctls[this._hcb_ctls.length] = card_ctl
    },
    
    syncHands: function (){
        var player_a = this.ModTable.getPlayerA()
        for(var i = 0; i < this._hca_ctls.length; i ++){
            if(player_a.plr_hands[i] != this._hca_ctls[i].getCardId()){
                this._hca_ctls[i].removeSelf()
                this._hca_ctls.splice(i, 1)
                i --
            }
        }
        this._resetSpacingA()

        var player_b = this.ModTable.getPlayerB()
        for(var i = 0; i < this._hcb_ctls.length; i ++){
            if(!player_b.plr_hands[i]){
                this._hcb_ctls[i].removeSelf()
                this._hcb_ctls.splice(i, 1)
                i --
            }
        }
        this._resetSpacingB()
    },
    resetDHand: function (){

    },
    onShowH: function (){
        this.LayHandA.runAction(cc.scaleTo(0.2, 0.4))
        this.BtnShowH.node.active = false
        this.BtnHideH.node.active = true
    },
    onHideH: function (){
        this.LayHandA.runAction(cc.scaleTo(0.2, 0.25))
        this.BtnShowH.node.active = true
        this.BtnHideH.node.active = false
    },

    _resetSpacingA: function (){
        var space_x = Math.min(10, (this.LayHandA.width - (370  
            * this._hca_ctls.length)) / (this._hca_ctls.length - 1))
        this.LayHandA.getComponent(cc.Layout).spacingX = space_x
    },
    _resetSpacingB: function (){
        var space_x = Math.min(10, (this.LayHandB.width - (370  
            * this._hcb_ctls.length)) / (this._hcb_ctls.length - 1))
        this.LayHandB.getComponent(cc.Layout).spacingX = space_x
    },
});
