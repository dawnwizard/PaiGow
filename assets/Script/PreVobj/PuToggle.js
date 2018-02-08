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
        LblTitle:{
            default:null,
            type:cc.Label,
        },
    },

    _initData: function (){
        this._group_ctl = null
        this._tog_idx = null
    },
    // use this for initialization
    onLoad: function () {
        this._initData()

        this.uncheck()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    check: function (){
        this.node.getComponent(cc.Toggle).check()
        this.node.getComponent(cc.Toggle).interactable = false
    },
    uncheck: function (){
        this.node.getComponent(cc.Toggle).uncheck()
        this.node.getComponent(cc.Toggle).interactable = true
    },

    setTogData: function (tog_func){
    },
    setGTogData: function (group_ctl, tog_idx){
        cc.log("group_ctl:", group_ctl)
        this._group_ctl = group_ctl
        this._tog_idx = tog_idx
    },
    setTogTitle: function (title_text){
        this.LblTitle.string = title_text || ""
    },
    onSlcted: function (){
        if(this._group_ctl){
            this._group_ctl.slctTog(this._tog_idx)
        }else if(true){

        }
    },
});
