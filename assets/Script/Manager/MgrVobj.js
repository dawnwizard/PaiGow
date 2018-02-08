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
        PreVobjs:{
            default:[],
            type:cc.Prefab,
        },
    },

    _initData: function (){

    },
    // use this for initialization
    onLoad: function () {
        this.ObjIndex = {
            "PuToggle"  :0,
            "TogGroup"  :1,
            "VojPlayer" :2,
            "VojBanker" :3,
            "VojCard"   :4,
            "VojDrag"   :5,
        }

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    getVobj: function (v_name){
        var obj_idx = this.ObjIndex[v_name]
        return cc.instantiate(this.PreVobjs[obj_idx])
    },
});
