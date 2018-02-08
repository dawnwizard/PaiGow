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
        NodObj:{
            default:null,
            type:cc.Node,
        },
        NodTip:{
            default:null,
            type:cc.Node,
        },
    },

    _initData: function (){

    },
    // use this for initialization
    onLoad: function () {
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")
        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setDobj: function (obj_data){
        this.NodObj.removeAllChildren()
        if(obj_data){
            switch(obj_data[0]){
                case 1:
                    var voj_card = this.MgrVobj.getVobj("VojCard")
                    this.NodObj.addChild(voj_card)
                    var card_ctl = voj_card.getComponent("VojCard")
                    card_ctl.setCardData(obj_data[1])
                    card_ctl.setCover(false)
                    this.NodTip.active = false
                    break;
                default:
                    break;
            }
        }else{
            this.NodTip.active = false
        }
    },
    syncDpos: function (touch_loc){
        this.node.setPosition(touch_loc)
    },
});
