
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
        NodCard:{
            default:null,
            type:cc.Node,
        },
        LblName:{
            default:null,
            type:cc.Label,
        },
        ImgColor:{
            default:null,
            type:cc.Node,
        },
    },

    _initData: function (){
        this._card_cfg = null
        this._card_id = null
        this._card_num = 0
        this._etype = null
        this._nodx = 0
    },
    _initCard: function (){
        var self = this
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self._onTouch(event)
        }, self.node);
    },
    _onTouch: function (event){
        switch(event.type){
            case "touchstart":
                this._nodx = 0
                break;
            case "touchmove":
                var touch_loc = event.getTouches()[0].getLocation()
                if((touch_loc.x > this.BAND_X && this._nodx < this.BAND_X) || this._nodx == 0){
                    cc.log("touchmove:2", this.getCardId())
                    this.MgrView.setDobj([2, this.getCardId()])
                    //this.fadeSelf()
                }else if(touch_loc.x < this.BAND_X && this._nodx > this.BAND_X){
                    cc.log("touchmove:1")
                    this.MgrView.setDobj()
                }
                this._nodx = touch_loc.x
                this.MgrView.syncDpos(touch_loc)
                break;
            case "touchend":
                    cc.log("touchend")
                this.endDrag()
                break;
            case "touchcancel":
                    cc.log("touchcancel")
                this.endDrag()
                break;
        }
        this._etype = event.type
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        //this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this.ImgColor.getComponent(cc.Sprite).spriteFrame 
            = this.ImgColor.getComponent(cc.Sprite).spriteFrame.clone()
        this.BAND_X = 1000

        this._initData()
        this._initCard()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setCardId: function (card_id){
        var card_cfg = McfgCard.getCardCfg(card_id)
        if(card_cfg){
            this._card_cfg = card_cfg
            this.syncShows()
        }else{
            cc.log("not such a card:", card_id)
        }
        //this._card_id = card_id
        //this._card_ctl.setCardId(card_id)
    },
    getCardId: function (){
        return this._card_cfg.c_id
        //return this._card_ctl.getCardId()
    },
    syncShows: function (){
        this.LblName.string = this._card_cfg.c_name + "X" + this._card_num
        var spr_txr = cc.url.raw("/resources/Cryst/cryst_" + this._card_cfg.c_color + ".png")
        this.ImgColor.getComponent(cc.Sprite).spriteFrame.setTexture(spr_txr)
    },
    addNum: function (value){
        this._card_num += value
        this.syncShows()
    },
    getNum: function (){
        return this._card_num
    },
    setDragAble: function (value){
        this._drag_able = value
    },
    endDrag: function (){
        this.MgrView.setDobj()
        if(this._nodx < this.BAND_X){
            var pv_build = this.MgrView.getView("PvBuild")
            pv_build.delDcard(this.getCardId())
            this.resetSelf()
        }else{
            this.resetSelf()
        }
    },

    fadeSelf: function (is_destroy){
        this.node.runAction(cc.fadeTo(0.2, 0))

        if(is_destroy){
            var self = this
            setTimeout(function () {
                self.removeSelf()
            }, 600)
        }
    },
    resetSelf: function (){
        this.node.runAction(cc.fadeTo(0.4, 255))
    },

    removeSelf: function (){
        this.node.destroy()
    },
    setForm: function (form){
        
    },


});
