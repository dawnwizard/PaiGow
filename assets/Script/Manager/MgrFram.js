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
        NodFCryst:{
            default:null,
            type:cc.Node,
        },
        NodFPicture:{
            default:null,
            type:cc.Node,
        },
        NodFDobj:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node)

        this.FCrtCtl = this.NodFCryst.getComponent("FCryst")
        this.FPicCtl = this.NodFPicture.getComponent("FPicture")
        this.FDobjCtl = this.NodFDobj.getComponent("FDragObj")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    getCrtFram: function (index){
        return this.FCrtCtl.getCrtFram(index)
    },
    getPicFram: function (index) {
        return this.FPicCtl.getPicFram(index)
    },
    getDobjFram: function (index){
        return this.FDobjCtl.getDobjFram(index)
    },
});
