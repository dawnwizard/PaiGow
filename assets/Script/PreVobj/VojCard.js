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
        LblName:{
            default:null,
            type:cc.Label,
        },
        NodBack:{
            default:null,
            type:cc.Node,
        },
    },

    _initData: function (){
        this._data = {}
        this._drg_flg = false
        this._drg_pos = null
    },
    _initDrag: function (){
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
        if(this._drg_flg){
            switch(event.type){
                case "touchstart":
                    this._drg_pos = null
                    break;
                case "touchmove":
                    if(!this._drg_pos){
                        this.MgrView.setDobj([1, this.getCardData()])
                        this._drg_pos = true
                    }else{
                        var tch_loc = event.getTouches()[0].getLocation()
                        this._drg_pos = tch_loc
                        this.MgrView.syncDpos(tch_loc)
                    }
                    break;
                case "touchend":
                    this.MgrView.setDobj()
                    break;
                case "touchcancel":
                    this.MgrView.setDobj()

                    var vc_bet = this.MgrView.getViewCtl("PvBet")
                    vc_bet.swopCard(this.node.getPosition(), this._drg_pos)
                    break;
            }
        }
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")

        this._initData()
        this._initDrag()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setCardData: function (c_data){
        this._data = c_data || {}
        this.syncShows()
    },
    getCardData: function (){
        return this._data
    },
    getCPoint: function (){
        return this._data.point || 0
    },
    setDrgFlag: function (drg_flg){
        this._drg_flg = drg_flg
    },
    getDrgFlag: function(){
        return this._drg_flg
    },
    setVisible: function (value){
        this.node.active = value
    },
    setCover: function (value){
        this.NodBack.active = value
    },


    syncShows: function (){
        this.LblName.string = PT_TXT[this._data.point]
    },
});
