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

        ViewType:2,
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
    showSelf: function (data){
        this._initData()
        this.node.active = true

        this.syncShows()
    },
    closeSelf: function (){
        this.node.active = false
    },
    syncShows: function (){
        
    },
});
