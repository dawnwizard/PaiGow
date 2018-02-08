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
    },
    _initData: function (){
        this._slf_flg = false
        this._money = 100
        this._all_mny = 10000
    },
    _initView: function (){
        this._card_ctls = []
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this._initData()
        this._initView()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    initPlr: function (){
        this.setCDatas()
    },
    setSlfFlag: function (value){

    },
    getPtTxt: function (pt1, pt2){
        var text = "0点"
        cc.log("pt1", pt1, "pt2", pt2, pt1 == pt2)
        if(pt1 == pt2){
            text = "对" + PT_TXT[pt1]
        }else{
            text = ((pt1 || 0) + (pt2 || 0)) % 10 + "点"
        }
        return text
    },

    addCard: function (idx, c_data){
        var card_ctl = this._card_ctls[idx]
        if(card_ctl){
            card_ctl.setVisible(true)
            card_ctl.setCardData(c_data)
        }
        this.syncPoint()
    },
    setCDatas: function (c_dtas){
        var c_dtas = c_dtas || []
        for(var i = 0; i < 4; i ++){
            var card_ctl = this._card_ctls[i]
            card_ctl.setVisible(Boolean(c_dtas[i]))
            card_ctl.setCardData(c_dtas[i])
        }

        this.syncPoint()
    },
    getCDatas: function (){
        var c_dtas = []
        for(var i = 0; i < 4; i ++){
            c_dtas[i] = this._card_ctls[i].getCardData()
        }
        return c_dtas
    },

    setMoney: function (value){
        this._money = value
        this.showMoney()
        this.syncMoney()
    },
    setAMoney: function (value){
        this._all_mny = value
        this.syncMoney()
    },
    showMoney: function (){

    },
    syncMoney: function (){

    },
});
