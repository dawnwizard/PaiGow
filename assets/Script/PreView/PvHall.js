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
        BtnMatch:{
            default:null,
            type:cc.Button,
        },
        BtnCancel:{
            default:null,
            type:cc.Button,
        },
        BtnJoin:{
            default:null,
            type:cc.Button,
        },

        EdtRid:{
            default:null,
            type:cc.EditBox,
        },
        EdtPwd:{
            default:null,
            type:cc.EditBox,
        },

        ViewType:1,
    },

    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")

        this.CtlHall = cc.find("MgrCtrl").getComponent("CtlHall")
        this.ModHall = cc.find("MgrModel").getComponent("ModHall")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onMatch: function (){
        this.CtlHall.tryMatch()
    },
    onCancel: function (){
        this.CtlHall.tryCMatch()
    },
    onJoin: function (){
        this.CtlHall.tryJoin()
    },

    setMatchSta: function (bool_v){
        this.BtnMatch.node.active = !bool_v
        this.BtnCancel.node.active = bool_v
        this.BtnCancel.interactable = true
        this.BtnJoin.node.active = !bool_v
    },
    bandMatch: function (){
        this.BtnMatch.node.active = false
        this.BtnCancel.interactable = false
        this.BtnJoin.node.active = false
    },

    showSelf: function (data){
        this.node.active = true

        this.setMatchSta(false)
    },
    closeSelf: function (){
        this.node.active = false
    },
});
