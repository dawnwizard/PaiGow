
const McfgCard = require("McfgCard")
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
        EdtName:{
            default:null,
            type:cc.EditBox,
        },
        LayLibry:{
            default:null,
            type:cc.Node,
        },
        LayDeck:{
            default:null,
            type:cc.Node,
        },
        NodBtns:{
            default:null,
            type:cc.Node,
        },

        ViewType:1,
    },

    _initData: function (){
        this._dc_ctls = null

        this._deck_ctls = null
        this._deck_idx = null

        this._color_idx = 0
        this._cost_idx = 0
        this._page_idx = 0
    },
    _initView: function (){
        this._initColorTab()
        this._initCostTab()
        this._initCardLib()
    },
    _initColorTab: function (){
        var tog_group = this.MgrVobj.getPreVobj("TogGroup")
        tog_group.setPosition(cc.p(-400, 320))
        this.node.addChild(tog_group)
        var tgroup_ctl = tog_group.getComponent("TogGroup")
        var self = this
        var tg_func = function (tog_idx){
            self.slcColor(tog_idx)
        }
        tgroup_ctl.setTGroupData(tg_func, ["", "", "", ""], )
        this._color_tab = tgroup_ctl
    },
    _initCostTab: function (){
        var tog_group = this.MgrVobj.getPreVobj("TogGroup")
        tog_group.setPosition(cc.p(0, 320))
        this.node.addChild(tog_group)
        var tgroup_ctl = tog_group.getComponent("TogGroup")
        var self = this
        var tg_func = function (tog_idx){
            self.slcCost(tog_idx)
        }
        tgroup_ctl.setTGroupData(tg_func, ["", "", "", "", "", "", "", "", ""], )
        this._cost_tab = tgroup_ctl
    },
    _initCardLib: function (){
        this._lc_ctls = []
        for(var i = 0; i < this.PAGE_NUM; i ++){
            var card = this.MgrVobj.getPreVobj("PreCardB")
            this.LayLibry.addChild(card)
            var card_ctl = card.getComponent("PreCardB")
            card_ctl.setCardVsb(false)
            this._lc_ctls[i] = card_ctl
        }
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")
        this.CtlBuild = cc.find("MgrCtrl").getComponent("CtlBuild")

        this.PAGE_NUM = 8

        this._initData()
        this._initView()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    showSelf: function (data){
        cc.log("showSelf:build")
        this._initData()
        this.node.active = true

        this._color_tab.resetSlc()
        this._cost_tab.resetSlc()
        this.syncShows()
    },
    closeSelf: function (){
        cc.log("closeSelf:build")
        this.node.active = false
    },
    syncShows: function (){
        this.syncDList()
        this.syncLibry()
    },
    syncLibry: function (){
        var page_libry = this._getLibry()
        for(var i = 0; i < this.PAGE_NUM; i ++){
            var card_ctl = this._lc_ctls[i]
            var card_id = page_libry[this.PAGE_NUM * this._page_idx + i]
            card_ctl.setCardId(card_id)
            card_ctl.setCardVsb(Boolean(card_id))
        }
    },

/*************************************DeckList*****************************************/
    syncDList: function (){
        var self = this
        var touch_func = function (d_idx){
            self.setDeck(d_idx)
        }

        var all_decks = this.ModLog.getAllDecks()
        this.NodBtns.active = false
        this.LayDeck.removeAllChildren()
        this._deck_ctls = []
        for(var i = 0; i <= all_decks.length; i ++){
            var deck = this.MgrVobj.getPreVobj("PreDeck")
            this.LayDeck.addChild(deck)
            var deck_ctl = deck.getComponent("PreDeck")
            deck_ctl.setDeckData(all_decks[i])
            deck_ctl.setTouchFunc(touch_func, i)
            this._deck_ctls[i] = deck_ctl
        }
    },
/*************************************DeckCards*****************************************/
    setDeck: function (d_idx){
        this._deck_idx = d_idx
        this.syncDeck()
    },
    syncDeck: function (){
        this.NodBtns.active = true
        var deck_ctl = this._deck_ctls[this._deck_idx]
        this.EdtName.string = deck_ctl.getDeckName()
        this.LayDeck.removeAllChildren()
        this._dc_ctls = []
        var deck_arr = deck_ctl.getDeckArr()
        for(var i = 0; i < deck_arr.length; i ++){
            this.addDcard(parseInt(deck_arr[i]), true)
        }
    },
    addDcard: function (card_id, sync_flag){
        if(this._dc_ctls){
            if(!this._dc_ctls[card_id]){
                var card = this.MgrVobj.getPreVobj("PreCardD")
                this.LayDeck.addChild(card)
                var card_ctl = card.getComponent("PreCardD")
                card_ctl.setCardId(card_id)
                this._dc_ctls[card_id] = card_ctl
            }

            if(this._dc_ctls[card_id].getNum() < 3){
                this._dc_ctls[card_id].addNum(1)
                if(!sync_flag){
                    this._deck_ctls[this._deck_idx].addDcard(card_id)
                    this.syncDeck()
                }
            }
        }
    },
    delDcard: function (card_id){
        cc.log("delDcard")
        var card_ctl = this._dc_ctls[card_id]
        if(card_ctl){
            card_ctl.addNum(-1)
            this._deck_ctls[this._deck_idx].delDcard(card_id)
            if(card_ctl.getNum() == 0){
                card_ctl.removeSelf()
                this._dc_ctls[card_id] = undefined
            }
        }
    },

/**********************************Library*************************************/
    onBtnLeft: function (){
        this._page_idx = Math.max(0, this._page_idx - 1)
        this.syncLibry()
    },
    onBtnRight: function (){
        var lib_lth = this._getLibry().length
        this._page_idx = Math.min(this._page_idx + 1, Math.floor(lib_lth / this.PAGE_NUM))
        this.syncLibry()
    },

/**********************************Deck*************************************/
    onOrder: function (){
        /*this._deck_ctls[this._deck_idx].orderCard()
        this.syncDeck()*/
    },
    onRename: function (){
        this._deck_ctls[this._deck_idx].setDeckName(this.EdtName.string)
    },
    onSave: function (){
        var deck_data = this._deck_ctls[this._deck_idx].getDeckData()
        this.CtlBuild.trySavDeck(deck_data)
    },
    onDelete: function (){
        var deck_id = this._deck_ctls[this._deck_idx].getDeckId()
        if(deck_id){
            this.CtlBuild.tryDelDeck(deck_id)
        }else{
            this.syncDList()
        }
    },
    onBack: function (){
        this.MgrView.showView("PvMatch")
    },
    slcColor: function (index){
        this._color_idx = parseInt(index)
        this.syncLibry()
    },
    slcCost: function (index){
        this._cost_idx = parseInt(index)
        this.syncLibry()
    },

    _getLibry: function (){
        return McfgCard.getCards(this._color_idx, this._cost_idx)
    },
});
