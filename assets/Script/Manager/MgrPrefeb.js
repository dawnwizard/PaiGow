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
        PrePres:{
            default:[],
            type:cc.Prefab,
        },
    },

    _initData: function (){

    },
    // use this for initialization
    onLoad: function () {
        this.PRE_IDX = {
            "PreCryst":0,
            "PreCard":1,
            "PreMst":2,
            "PreDobj":3,
            "PreCardB":4,
            "PreCardD":5,
            "PreCardT":6,
            "PreDeck":7,
        }

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    getPrefeb: function (pre_name){
        var obj_index = this.PRE_IDX[pre_name]
        return cc.instantiate(this.PrePres[obj_index])
    },
});
