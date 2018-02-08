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
        //this._drag_able = false
    },
    _initCard: function (){
        var card = this.MgrVobj.getPreVobj("PreCard")
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
                break;
            case "touchmove":
                var pv_build = this.MgrView.getViewCtl("PvBuild")
                if(pv_build){
                    var touch_loc = event.getTouches()[0].getLocation()
                    if(touch_loc.x > this.BAND_X && this._nodx < this.BAND_X){
                        this.MgrView.setDobj([2, this.getCardId()])
                    }else if((touch_loc.x < this.BAND_X && this._nodx > this.BAND_X) || this._nodx == 0){
                        this.MgrView.setDobj([1, this.getCardId()])
                    }
                    this._nodx = touch_loc.x
                    this.MgrView.syncDpos(touch_loc)
                }
                break;
            case "touchend":
                if(this._etype == "touchstart"){
                    this.MgrView.showDetail(this)
                }else{
                    this.endDrag()
                }
                break;
            case "touchcancel":
                this.endDrag()
                break;
        }
        this._etype = event.type
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this.BAND_X = 1000

        this._initData()
        this._initCard()
    },

    start: function (){

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
    setDragAble: function (value){
        this._drag_able = value
    },
    setCardVsb: function (value){
        this.node.active = value
    },

    endDrag: function (){
        this.MgrView.setDobj()
        if(this._nodx > this.BAND_X){
            var vc_build = this.MgrView.getViewCtl("PvBuild")
            vc_build.addDcard(this.getCardId())
        }
    },


});
