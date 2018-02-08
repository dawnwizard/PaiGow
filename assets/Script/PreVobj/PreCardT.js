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
    },

    _initData: function (){
        this._card_ctl = null
        this._etype = null
        this._nodx = 0
        this._nody = 0
        this._drag_able = false
    },
    _initCard: function (){
        var card = this.MgrPrefeb.getPrefeb("PreCard")
        this.NodCard.addChild(card)
        var card_ctl = card.getComponent("PreCard")
        this._card_ctl = card_ctl

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
                this._nody = 0
                break;
            case "touchmove":
                if(this._drag_able){
                    var touch_loc = event.getTouches()[0].getLocation()
                    if(touch_loc.x > this.BAND_X && this._nodx < this.BAND_X){
                        this.MgrView.setDobj([4, this.getCcolor()])
                    }else if((touch_loc.x < this.BAND_X && this._nodx > this.BAND_X) 
                            || this._nodx == 0){
                        if(touch_loc.y > this.BAND_Y){
                            this.MgrView.setDobj([3, this.getCardId()])
                        }else{
                            this.MgrView.setDobj([1, this.getCardId()])
                        }
                    }
                    this._nodx = touch_loc.x
                    this._nody = touch_loc.y
                    this.MgrView.syncDpos(touch_loc)
                }
                break;
            case "touchend":
                if(this._etype == "touchstart"){
                    this.MgrView.showDetail(this)
                }else if(this._drag_able){
                    this.endDrag()
                }
                break;
            case "touchcancel":
                if(this._drag_able){
                    this.endDrag()
                }
                break;
        }
        this._etype = event.type
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrPrefeb = cc.find("MgrPrefeb").getComponent("MgrPrefeb")
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")
        this.CtlTable = cc.find("MgrCtrl").getComponent("CtlTable")

        this.BAND_X = 1100
        this.BAND_Y = 300

        this._initData()
        this._initCard()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setCardId: function (card_id){
        this._card_ctl.setCardId(card_id)
    },
    getCardId: function (){
        return this._card_ctl.getCardId()
    },
    getData: function (){
        return this._card_ctl.getData()
    },
    getSlcType: function (){
        return this._card_ctl.getSlcType()
    },

    getCcolor: function (){
        return this._card_ctl.getCcolor()
    },
    setDragAble: function (value){
        this._drag_able = value
    },

    endDrag: function (){
        this.MgrView.setDobj()
        if(this._nodx > this.BAND_X && this.ModTable.checkAddCrtAble()){
            this.CtlTable.tryCastCrt(this)
        }else if(this._nody > this.BAND_Y){
            if(this.ModTable.checkUseAble(this.getData())){
                var aim_ctl = this.MgrView.getPosObj(cc.p(this._nodx, this._nody))
                var slc_type = this.getSlcType()
                if(slc_type){
                    if(aim_ctl && aim_ctl.checkSlc(slc_type)){
                        this.CtlTable.tryUseCard(this, aim_ctl)
                    }
                }else{
                    this.CtlTable.tryUseCard(this)
                }
            }
        }
    },
    removeSelf: function (){
        this.node.destroy()
    },
});
