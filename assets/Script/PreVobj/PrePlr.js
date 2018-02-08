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
        LblHp:{
            default:null,
            type:cc.Label,
        },
    },

    _initData: function (){
        this._plr_data = null
    },
    // use this for initialization
    onLoad: function () {
        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setPlrData: function (plr_data){
        this._plr_data = plr_data

        this.syncShows()
    },
    getData: function (){
        return this._plr_data
    },
    syncShows: function (){
        this.LblHp.string = this._plr_data.plr_nhp + "/" + this._plr_data.plr_fhp
    },
    getPlrId: function (){
        return this._plr_data.user_id
    },
    isPlayer: function (){
        return true
    },
    checkSlc: function (){
        return true
    },

    sufDamage: function (dmg_data){
        this._plr_data.plr_nhp -= dmg_data.dmg_v
        this.syncShows()
    },
});
