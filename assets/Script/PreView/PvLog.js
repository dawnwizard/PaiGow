
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
        EdtUName:{
            default:null,
            type:cc.EditBox,
        },
        EdtPWord:{
            default:null,
            type:cc.EditBox,
        },
        LblLogTip:{
            default:null,
            type:cc.Label,
        },

        ViewType:1,
    },

    // use this for initialization
    onLoad: function () {
        this.CtlLog = cc.find("MgrCtrl").getComponent("CtlLog")
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onFLogin: function (){
        this.CtlLog.tryLogin("dwizard", "qweqwe")
    },
    onFLogin2: function (){
        this.CtlLog.tryLogin("qwe", "qwe")
    },
    onLogin: function () {
        var user_name = this.EdtUName.string
        var password = this.EdtPWord.string

        if(user_name == ""){
            this.LblLogTip.string = "用户名不能为空"
            return
        }
        if(password == ""){
            this.LblLogTip.string = "密码不能为空"
            return
        }

        this.CtlLog.tryLogin(user_name, password)
    },
    onRegist: function () {
        var user_name = this.EdtUName.string
        var password = this.EdtPWord.string
        
        if(user_name == ""){
            this.LblLogTip.string = "用户名不能为空"
            return
        }
        if(password == ""){
            this.LblLogTip.string = "密码不能为空"
            return
        }

        this.CtlLog.tryRegist(user_name, password)
    },
    showMsg: function (e_code){
        this.LblLogTip.string = e_code
    },

    showSelf: function (data){
        this.node.active = true
    },
    closeSelf: function (){
        this.node.active = false
    },
});
