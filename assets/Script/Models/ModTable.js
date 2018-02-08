cc.Class({
    extends: require("ModBase"),

    // use this for initialization
    _initData: function (){
        this._tbl_data = null
        this._cst_falg = null

        this._tbl_data = {
            tplr_datas:[
                {
                    user_id:0,
                    plr_crts:[],
                },
                {
                    user_id:1,
                    plr_crts:[]
                },
            ]
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    openTable: function (data){
        this._tbl_data = data
        this.MgrView.showView("PvTable")
        this.MgrSocket.setTableId(data.table_id)

        var pv_table = this.MgrView.getViewCtl("PvTable")
    },
    getTblData: function (){
        return this._tbl_data
    },
    getPlayerA: function (){
        var tplr_datas = this._tbl_data.tplr_datas
        for(var i = 0; i < tplr_datas.length; i ++){
            if(this.MgrSocket.isMySelf(tplr_datas[i].user_id)){
                return tplr_datas[i]
            }
        }
    },
    getPlayerB: function (){
        var tplr_datas = this._tbl_data.tplr_datas
        for(var i = 0; i < tplr_datas.length; i ++){
            if(!this.MgrSocket.isMySelf(tplr_datas[i].user_id)){
                return tplr_datas[i]
            }
        }
    },
    getPlrById: function (user_id){
        var tplr_datas = this._tbl_data.tplr_datas
        for(var i = 0; i < tplr_datas.length; i ++){
            if(tplr_datas[i].user_id == user_id){
                return tplr_datas[i]
            }
        }
    },

    drawCards: function (data){
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.drawCards(data.user_id, data.card_ids)
    },
    syncHands: function (data){
        for(var i = 0; i < data.length; i ++){
            this._tbl_data.tplr_datas[i].plr_hands = data[i].plr_hands
        }
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.syncHands()
    },

    newTurn: function (data){
        this._tbl_data.turn_index = data.turn_index
        this._cst_falg = true
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.setTurnFlag(this.isMyTurn())
    },
    isMyTurn: function (){
        var tplr_datas = this._tbl_data.tplr_datas
        var turn_index = this._tbl_data.turn_index % 2
        for(var i = 0; i < tplr_datas.length; i ++){
            if(tplr_datas[i].plr_tidx == turn_index){
                return this.MgrSocket.isMySelf(tplr_datas[i].user_id)
            }
        }
        return false
    },

    castCryst: function (data){
        this._cst_falg = false

        var self_flg = this.MgrSocket.isMySelf(data.user_id)
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.castCryst(self_flg)
    },
    syncCryst: function (data){
        for(var i = 0; i < data.length; i ++){
            this._tbl_data.tplr_datas[i].cast_flag = data[i].cast_flag
            this._tbl_data.tplr_datas[i].plr_crts = data[i].plr_crts
        }
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.syncCryst()
    },

    addMonster: function (data){
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.addMonster(data.user_id, data.mst_data)
    },
    syncMonster: function (data){
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.syncMonster(data)
    },
    monsterDeath: function (data){
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.monsterDeath(data)
    },
    
    hurtDamage: function (data){
        var pv_table = this.MgrView.getViewCtl("PvTable")
        pv_table.hurtDamage(data)
    },


    checkAddCrtAble: function (){
        return this.getPlayerA().cast_flag
        //return this._cst_falg && this.isMyTurn()
    },
    checkUseAble: function (c_data){
        var turn_flag = this.isMyTurn()
        if(!turn_flag){
            return false
        }
        var pay_flag = this.getPayAble(c_data.c_cost)
        if(!pay_flag){
            return false
        }
        return true
    },
    getPayAble: function (c_cost){
        if(!c_cost){
            return false
        }
        
        var crt_plr = this.getPlayerA().plr_crts
        var count = 0
        var j = 0
        for(var i = 0; i < c_cost.length; i ++){
            for(var k = j; k < crt_plr.length; k ++){
                j = k + 1
                if((crt_plr[k] % 10) == 1 && Math.floor(crt_plr[k] / 10) == c_cost[i]){
                    count ++
                    break;
                }
            }
        }
        return count == c_cost.length
    },
    
});
