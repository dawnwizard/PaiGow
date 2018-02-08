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
        ImgIcon:{
            default:null,
            type:cc.Node,
        },
    },

    _initData: function (){
        //this._crt_color = null
        this._is_full = null
    },
    // use this for initialization
    onLoad: function () {

        this.ImgIcon.getComponent(cc.Sprite).spriteFrame 
            = this.ImgIcon.getComponent(cc.Sprite).spriteFrame.clone()

        this._initData()
        //this.node.opacity = 0
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setCrtColor: function (crt_color){
        //this._crt_color = crt_color
        var spr_texture = cc.url.raw("/resources/Cryst/cryst_" + crt_color + ".png")
        this.ImgIcon.getComponent(cc.Sprite).spriteFrame.setTexture(spr_texture)
        //this.ImgIcon.getComponent(cc.Sprite).spriteFrame = this.MgrFram.getCrtFram(crt_color)
    },

    setFull: function (b_value){
        this._is_full = b_value
        if(b_value){
            this.node.runAction(cc.fadeTo(0.6, 255))
        }else{
            this.node.runAction(cc.fadeTo(0.6, 60))
        }
    },
    /*setDry: function (){
        this.node.runAction(cc.fadeTo(0.6, 60))
    },*/
});
