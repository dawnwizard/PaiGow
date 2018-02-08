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
    },

    // use this for initialization
    onLoad: function () {
        this.MgrPrefeb = cc.find("MgrPrefeb").getComponent("MgrPrefeb")

        this.setCards([10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001])
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setCards: function (card_ids){
        this.node.removeAllChildren()
        this._card_ctls = []
        for(var i = 0; i < card_ids.length; i ++){
            var card = this.MgrPrefeb.getPrefeb("PreCard")
            this.node.addChild(card)
            var card_ctl = card.getComponent("PreCard")
            card_ctl.setCardId(card_ids[i])
            this._card_ctls[this._card_ctls.length] = card_ctl
        }
    },
});
