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
        ImgBg:{
            default:null,
            type:cc.Node,
        },
        LblAtk:{
            default:null,
            type:cc.Label,
        },
        LblHp:{
            default:null,
            type:cc.Label,
        },
    },
    _initData: function (){
        this._mst_data = null
        this._etype = null
        this._nodx = 0
        this._nody = 0
    },
    _initMst: function (){
        var self = this
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self._onTouch(event)
        }, self.node);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self._onTouch(event)
        }, self.node);
    },
    _onTouch: function (event){
        switch(event.type){
            case "touchstart":
                this._nodx = 0
                this._nody = 0
                break;
            case "touchmove":
                var touch_loc = event.getTouches()[0].getLocation()
                if(this._nodx == 0 && this.checkAtk()){
                    this.MgrView.setDobj([5])
                }
                this.MgrView.syncDpos(touch_loc)
                this._nodx = touch_loc.x
                this._nody = touch_loc.y
                break;
            case "touchend":
                if(this._etype == "touchstart"){
                    this.MgrView.showDetail(this)
                }else{
                    this.endDrag()
                }
                break;
            case "touchcancel":
                this.endDrag()
                break;
        }
        this._etype = event.type
    },
    // use this for initialization
    onLoad: function () {
        this.MgrView = cc.find("MgrView").getComponent("MgrView")
        this.CtlTable = cc.find("MgrCtrl").getComponent("CtlTable")
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")
        this.MgrSocket = cc.find("MgrSocket").getComponent("MgrSocket")

        this._initData()
        this._initMst()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    setMstData: function (mst_data){
        this._mst_data = mst_data
        this.syncShows()
    },
    getData: function (){
        return this._mst_data
    },
    getMstIndex: function (){
        return this._mst_data.m_index
    },
    getMasterId: function (){
        return this._mst_data.master_id
    },
    getCardId: function (){
        return this._mst_data.c_id
    },
    syncShows: function (){
        var mst_data = this._mst_data
        this.LblAtk.string = mst_data.mst_atk || ""
        this.LblHp.string = mst_data.mst_hp || ""
        if(mst_data.mst_state == 0){
            this.LblAtk.node.runAction(cc.fadeTo(0.6, 255))
        }else{
            this.LblAtk.node.runAction(cc.fadeTo(0.6, 60))
        }
    },

    isPlayer: function (){
        return false
    },
    checkSlc: function (slc_type){
        return true
    },
    checkAtk: function (){
        var owner_flag = this.MgrSocket.isMySelf(this.getMasterId())
        var turn_flag = this.ModTable.isMyTurn()
        var stat_flag = this._mst_data.mst_state == 0
        return owner_flag && turn_flag && stat_flag
    },
    setSlcted: function (){
        this.ImgBg.active = false
    },

    endDrag: function (){
        this.MgrView.setDobj()

        var aim_ctl = this.MgrView.getPosObj(cc.p(this._nodx, this._nody))
        if(aim_ctl){
            if(aim_ctl.isPlayer()){
                this.CtlTable.tryAtkPlr(this, aim_ctl.getPlrId())
            }else if(aim_ctl.getMasterId() != this.getMasterId()){
                this.CtlTable.tryAttack(this, aim_ctl)
            }
        }
    },

    /*endSeek: function (touch_loc){
        var aim_ctl = this.MgrView.getPosObj(touch_loc)
        if(aim_ctl){
            if(aim_ctl.isPlayer()){
                this.CtlTable.tryAtkPlr(this, aim_ctl.getPlrId())
            }else if(aim_ctl.getMasterId() != this.getMasterId()){
                this.CtlTable.tryAttack(this, aim_ctl)
            }
        }

        if(aim_ctl == "player"){
            this.CtlTable.tryAtkPlr(this)
        }else if(aim_ctl && aim_ctl.getMasterId() != this.getMasterId()){
            this.CtlTable.tryAttack(this, aim_ctl)
        }
        this.MgrView.closeDetail()
    },*/

    sufDamage: function (dmg_data){
        this._mst_data.mst_hp -= dmg_data.dmg_v
        this.syncShows()
    },
    selfDeath: function (){
        this.node.runAction(cc.fadeTo(0.6, 60))
        var self = this
        setTimeout(function () {
            self.removeSelf()
        }, 600)
    },
    removeSelf: function (){
        this.node.destroy()
    },
});
