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
        LayTogs:{
            default:null,
            type:cc.Node,
        },
    },

    _initData: function (){
        this._tog_ctls = []
        this._tog_func = null
        this._slct_idx = null
    },
    // use this for initialization
    onLoad: function () {
        var manager = cc.find("Manager")
        this.MgrVobj = cc.find("MgrVobj").getComponent("MgrVobj")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setTGroupData: function (tog_func, tog_txts){
        this._tog_func = tog_func

        for(var i = 0; i < tog_txts.length; i ++){
            var pre_tog = this.MgrVobj.getPreVobj("PuToggle")
            this.LayTogs.addChild(pre_tog)
            var tog_ctl = pre_tog.getComponent("PuToggle")
            tog_ctl.setGTogData(this, i)
            tog_ctl.setTogTitle(tog_txts[i])
            this._tog_ctls[i] = tog_ctl
        }
        //this.slctTog(0)
    },

    resetSlc: function (){
        var last_tog = this._tog_ctls[this._slct_idx]
        if(last_tog){
            last_tog.uncheck()
        }
        this._slct_idx = null
        this.slctTog(0)
    },

    slctTog: function (tog_idx){
        if(tog_idx != this._slct_idx){
            var last_tog = this._tog_ctls[this._slct_idx]
            if(last_tog){
                last_tog.uncheck()
            }

            var slc_tog = this._tog_ctls[tog_idx]
            if(slc_tog){
                this._slct_idx = tog_idx
                if(this._tog_func){
                    this._tog_func(tog_idx)
                }
                slc_tog.check()
            }
        }
    },

});
