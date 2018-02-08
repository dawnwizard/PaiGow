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
        LayBtlA:{
            default:null,
            type:cc.Node,
        },
        LayBtlB:{
            default:null,
            type:cc.Node,
        },
        NodPlrA:{
            default:null,
            type:cc.Node,
        },
        NodPlrB:{
            default:null,
            type:cc.Node,
        },

        PreMst:{
            default:null,
            type:cc.Prefab,
        },
    },

    _initData: function (){
        this._msta_ctls = []
        this._mstb_ctls = []
    },
    // use this for initialization
    onLoad: function () {
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")
        this.MgrSocket = cc.find("MgrSocket").getComponent("MgrSocket")

        this.PlrACtl = this.NodPlrA.getComponent("PrePlr")
        this.PlrBCtl = this.NodPlrB.getComponent("PrePlr")

        this._initData()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    initPlayer: function (){
        var plra_data = this.ModTable.getPlayerA()
        var plrb_data = this.ModTable.getPlayerB()
        this.PlrACtl.setPlrData(plra_data)
        this.PlrBCtl.setPlrData(plrb_data)
    },
    cleanBattle: function (){
        this.LayBtlA.removeAllChildren()
        this.LayBtlB.removeAllChildren()
        this._msta_ctls = []
        this._mstb_ctls = []
    },
    
    addMonster: function (user_id, mst_data){
        var monster = cc.instantiate(this.PreMst)
        if(this.MgrSocket.isMySelf(user_id)){
            this.LayBtlA.addChild(monster)
            var mst_ctl = monster.getComponent("PreMst")
            mst_ctl.setMstData(mst_data)
            this._msta_ctls[mst_data.m_index] = mst_ctl
        }else{
            this.LayBtlB.addChild(monster)
            var mst_ctl = monster.getComponent("PreMst")
            mst_ctl.setMstData(mst_data)
            this._mstb_ctls[mst_data.m_index] = mst_ctl
        }
    },
    syncMonster: function (data){
        var msts_data = data.msts_data
        for(var i = 0; i < msts_data.length; i ++){
            var mst_data = msts_data[i]
            if(this.MgrSocket.isMySelf(mst_data.master_id)){
                var mst_ctl = this._msta_ctls[mst_data.m_index]
                mst_ctl.setMstData(mst_data)
            }else{
                var mst_ctl = this._mstb_ctls[mst_data.m_index]
                mst_ctl.setMstData(mst_data)
            }
        }
    },
    monsterDeath: function (data){
        var mst_data = data.mst_data
        var m_index = mst_data.m_index
        cc.log("mst_data.master_id", mst_data.master_id)
        if(this.MgrSocket.isMySelf(mst_data.master_id)){
            this._msta_ctls[m_index].selfDeath()
            this._msta_ctls.splice(m_index, 1)
        }else{
            this._mstb_ctls[m_index].selfDeath()
            this._mstb_ctls.splice(m_index, 1)
        }
    },
    getPosObj: function (touch_loc){
        var btl_pos = this.node.convertToNodeSpaceAR(touch_loc)
        if(Math.abs(btl_pos.x) < 40){
            if(btl_pos.y > 220){
                return this.PlrBCtl
            }
            if(btl_pos.y < -180){
                return this.PlrACtl
            }
        }

        if(btl_pos.y >= 0){
            var lay_pos = this.LayBtlB.convertToNodeSpaceAR(touch_loc)
            if(Math.abs(lay_pos.y) < this.LayBtlB.height / 2){
                return this._mstb_ctls[Math.floor(lay_pos.x / 120)]
            }else{
                return null
            }
        }else{
            var lay_pos = this.LayBtlA.convertToNodeSpaceAR(touch_loc)
            if(Math.abs(lay_pos.y) < this.LayBtlA.height / 2){
                return this._msta_ctls[Math.floor(lay_pos.x / 120)]
            }else{
                return null
            }
        }
        //return touch_loc.y >= 600
    },
    /*sprDamage: function (data){
        var midx_a = data.msts.aidxs
        var midx_b = data.msts.bidxs
        var dmg_data = data.dmg_data
        for(var i = 0; i < midx_a.length; i ++){
            var mst_ctl = this._msta_ctls[midx_a[i]]
            if(mst_ctl){
                mst_ctl.sufDamage(dmg_data)
            }
        }
        for(var i = 0; i < midx_b.length; i ++){
            var mst_ctl = this._mstb_ctls[midx_b[i]]
            if(mst_ctl){
                mst_ctl.sufDamage(dmg_data)
            }
        }
    },*/
    hurtDamage: function (data){
        cc.log("hurtDamage")
        if(data.plrs_id){
            for(var i = 0; i < data.plrs_id.length; i ++){
                cc.log("data.plrs_id[i]", i, data.plrs_id[i])
                if(this.MgrSocket.isMySelf(data.plrs_id[i])){
                    this.PlrACtl.sufDamage(data.dmg_data)
                }else{
                    this.PlrBCtl.sufDamage(data.dmg_data)
                }
            }
        }

        if(data.msts_data){//可能有离场，刷新顺序
            var mst_ctls = []
            for(var i = 0; i < data.msts_data.length; i ++){
                var mst_data = data.msts_data[i]
                if(this.MgrSocket.isMySelf(mst_data.master_id)){
                    mst_ctls[i] = this._msta_ctls[mst_data.mst_index]
                }else{
                    mst_ctls[i] = this._mstb_ctls[mst_data.mst_index]
                }
            }
            cc.log("mst_ctls", mst_ctls.length)
            for(var i = 0; i < mst_ctls.length; i ++){
                mst_ctls[i].sufDamage(data.dmg_data)
            }
        }
    },
});
