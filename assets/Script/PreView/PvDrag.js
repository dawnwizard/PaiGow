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

        ViewType:3,
    },

    _initData: function (){
        this._drag_ctl = null
    },
    _initView: function (){
        var d_obj = this.MgrVobj.getVobj("VojDrag")
        this.node.addChild(d_obj)
        var drag_ctl = d_obj.getComponent("VojDrag")
        this._drag_ctl = drag_ctl
    },
    // use this for initialization
    onLoad: function () {
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")
        this._initData()
        this._initView()
        //this.initTouchEvent()
    },

    start: function (){

    },
    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},
    setDobj: function (obj_data){
        this._drag_ctl.setDobj(obj_data)
    },
    syncDpos: function (touch_loc){
        this._drag_ctl.syncDpos(touch_loc)
    },

    showSelf: function (data){
        cc.log("showSelf, PVDrag")
        this.node.active = true
    },
    closeSelf: function (){
        cc.log("closeSelf, PVDrag")
        this.node.active = false
    },
});
