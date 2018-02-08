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

    },
    // use this for initialization
    onLoad: function () {

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setTForm: function (t_form){
        //this.ImgIcon.getComponent(cc.Sprite).spriteFrame = this.MgrFram.getTipFram(t_form)
        switch(t_form){
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
        }
    },
});
