
cc.Class({
    extends: require("CtlBase"),

    // use this for initialization
    afterLoad: function (){
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")
    },


    tryLogin: function (user_name, pass_word){
        var temp_user = {user_name:user_name, pass_word:pass_word}
        this.onLogin()
    },
    onLogin: function (data){
        this.ModLog.onLogin(data)
    },


    tryRegist: function (user_name, pass_word){
        var temp_user = {user_name:user_name, pass_word:pass_word}
        this.MgrSocket.tryEmit('regist', {user:temp_user})
    },
    tryLogout: function (){
        this.MgrSocket.tryEmit('logout')
    },

});
