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

        ViewType:3,
    },

    _initData: function (){
        this._card_ctl = null
    },
    // use this for initialization
    onLoad: function () {
        this.MgrPrefeb = cc.find("MgrPrefeb").getComponent("MgrPrefeb")
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    showSelf: function (data){
        this._initData()
        this.node.active = true

        this._card_ctl = data
        this.syncShows()
    },
    closeSelf: function (){
        this.node.active = false
    },
    syncShows: function (){
        this.NodCard.removeAllChildren()
        var card_id = this._card_ctl.getCardId()
        var card = this.MgrVobj.getPreVobj("PreCard")
        this.NodCard.addChild(card)
        card.setScale(1.4, 1.4)
        var card_ctl = card.getComponent("PreCard")
        card_ctl.setCardId(card_id)
    },

    onTouch: function (){
        this.MgrView.closeDetail()
    },
});
