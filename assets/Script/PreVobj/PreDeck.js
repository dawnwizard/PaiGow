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
        LblName:{
            default:null,
            type:cc.Label,
        },
    },

    _initData: function (){
        this._touch_func = null
        this._deck_data = null
        this._param = null
    },
    // use this for initialization
    onLoad: function () {
        this.ModLog = cc.find("MgrModel").getComponent("ModLog")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setDeckData: function (data, d_idx){
        var user_id = this.ModLog.getUserId()
        this._deck_data = data || 
            {
                user_id:user_id,
                deck_name:"新建卡组",
                deck_arr:[],
            }

        //this._param = d_idx
        this.syncShows()
    },
    setDeckName: function (d_name){
        this._deck_data.deck_name = d_name
    },
    addDcard: function (card_id){
        this._deck_data.deck_arr.push(card_id.toString())
        this._deck_data.deck_arr.sort(function (a, b){
            return a - b
        })
    },
    delDcard: function (card_id){
        for(var i = 0; i < this._deck_data.deck_arr.length; i ++){
            if(this._deck_data.deck_arr[i] == card_id){
                this._deck_data.deck_arr.splice(i, 1)
                break;
            }
        }
    },
    /*orderCard: function (){
        this._deck_data.deck_arr.sort(function (a, b){
            return a - b
        })
    },*/
    syncShows: function (){
        this.LblName.string = this._deck_data.deck_name
    },
    setTouchFunc: function (touch_func, d_idx){
        this._touch_func = touch_func
        this._param = d_idx
    },
    getDeckData: function (){
        return this._deck_data
    },
    getDeckName: function (){
        return this._deck_data.deck_name
    },
    getDeckId: function (){
        return this._deck_data.deck_id
    },
    getDeckArr: function (){
        return this._deck_data.deck_arr
    },
    onTouch: function (){
        if(this._touch_func){
            this._touch_func(this._param)
        }else{
            cc.log("onTouch")
        }
    },
});
