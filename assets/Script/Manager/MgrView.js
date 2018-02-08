//const VIEW_CTRLS = require("CfgView").CfgView
const MAP_LAY = 0
const BASE_LAY = 1
const FLOAT_LAY = 2
const DRAG_LAY = 3

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
        PreViews:{
            default:[],
            type:cc.Prefab,
        },
        PvDrag:{
            default:null,
            type:cc.Prefab,
        },
        PvMap:{
            default:null,
            type:cc.Prefab,
        },
    },
    _initData: function (){
        this._view_ctls = []
        this._base_idx = null
        this._float_idx = null
        /*this._left_index = null
        this._right_index = null*/
        this._vc_drag = null
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node)

        this.ViewIdx = {
            "PvLog"     :0,
            "PvHall"    :1,
            "PvTable"   :2,
            "PvBet"     :3,
        }

        this._initData()
    },

    start: function (){
        var pv_drag = cc.instantiate(this.PvDrag)
        var canvas = cc.director.getScene().getChildByName('Canvas')
        canvas.addChild(pv_drag)
        pv_drag.zIndex = 10
        this._vc_drag = pv_drag.getComponent("PvDrag")
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    showView: function (v_name, v_data){
        var v_idx = this.ViewIdx[v_name]
        cc.log("showView:", v_name, v_idx)
        if(this._view_ctls[v_idx]){
            this._view_ctls[v_idx].showSelf(v_data)
        }else{
            var view = cc.instantiate(this.PreViews[v_idx])
            if(view){
                var canvas = cc.director.getScene().getChildByName('Canvas')
                canvas.addChild(view)
                
                var view_ctrl = view.getComponent(v_name)
                view.zIndex = view_ctrl.ViewType
                view_ctrl.showSelf(v_data)
                this._view_ctls[v_idx] = view_ctrl
            }else{
                cc.log("not such a view: ", v_name)
                return false
            }
        }

        var lay_type = this._view_ctls[v_idx].ViewType
        if(lay_type == BASE_LAY && this._base_idx != v_idx){
            this.cleanFView()
            this.closeView(this._base_idx)
            this._base_idx = v_idx
        }
        if(lay_type == FLOAT_LAY && this._float_idx != v_idx){
            this.closeView(this._float_idx)
            this._float_idx = v_idx
        }
        return true
    },
    closeView: function (v_idx){
        cc.log("typeof v_idx:", typeof v_idx)
        if(typeof v_idx == 'string'){
            v_idx = this.ViewIdx[v_idx]
        }
        var view_ctl = this._view_ctls[v_idx]
        if(view_ctl){
            view_ctl.closeSelf()
        }
    },
    cleanFView: function (){
        this.closeView(this._float_idx)
        this._float_idx = null
    },
    getViewCtl: function (v_name){
        var v_idx = this.ViewIdx[v_name]
        return this._view_ctls[v_idx]
    },

/************************************************************************/
    setDobj: function (obj_data){
        this._vc_drag.setDobj(obj_data)
    },
    syncDpos: function (touch_loc){
        this._vc_drag.syncDpos(touch_loc)
    },
    getPosObj: function (touch_loc){

    },
/************************************************************************/
    showSysTip: function (data){
        this.showView("PvSysTip", data)
    },

/************************************************************************/
    loadMap: function (map_id){
        if(this.map_ctl){
            this.map_ctl.removeSelf()
            this.map_ctl = null
        }
        var canvas = cc.director.getScene().getChildByName('Canvas')
        var v_map = cc.instantiate(this.PvMap)
        canvas.addChild(v_map)
        this.map_ctl = v_map.getComponent("PvMap")
        this.map_ctl.setMapId(map_id)
    },
    getMapCtl: function (){
        return this.map_ctl
    },
});
