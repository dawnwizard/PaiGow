cc.Class({
    extends: require("CtlBase"),

    // use this for initialization
    afterLoad: function (){
        this.ModTable = cc.find("MgrModel").getComponent("ModTable")
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    tryCastCrt: function (card_ctl){
        var card_data = card_ctl.getData()
        this.MgrSocket.tryEmit('castCrt', {c_data:card_data})
    },
    tryUseCard: function (card_ctl, aim_ctl){
        var card_data = card_ctl.getData()
        var aim_data = aim_ctl && aim_ctl.getData()
        this.MgrSocket.tryEmit('useCard', {c_data:card_data, a_data:aim_data})
        //this.MgrSocket.tryEmit('useCard', {c_data:card_data})
    },
    tryAttack: function (ma_ctl, mb_ctl){
        this.MgrSocket.tryEmit('mstAttack'
            , {ma_data:{master_id:ma_ctl.getMasterId(), mst_index:ma_ctl.getMstIndex()}
            , mb_data:{master_id:mb_ctl.getMasterId(), mst_index:mb_ctl.getMstIndex()}
            })
        //this.ModTable.sprDamage({msts:{aidxs:[1], bidxs:[]}, dmg_data:{d_type:1, d_value:5}})
    },
    tryAtkPlr: function (mst_ctl, plr_id){
        this.MgrSocket.tryEmit('atkPlr'
            , {mst_data:{master_id:mst_ctl.getMasterId(), mst_index:mst_ctl.getMstIndex()}
            , plr_id:plr_id
            })
    },
    tryEndTurn: function (){
        this.MgrSocket.tryEmit('endTurn')
    },

    _addListener: function (){
        this.MgrSocket.addListener('CtlTable', 'tblReady')
        this.MgrSocket.addListener('CtlTable', 'drawCards')
        this.MgrSocket.addListener('CtlTable', 'newTurn')
        this.MgrSocket.addListener('CtlTable', 'castCrt')
        this.MgrSocket.addListener('CtlTable', 'syncCrt')
        this.MgrSocket.addListener('CtlTable', 'useCard')
        this.MgrSocket.addListener('CtlTable', 'syncHand')
        this.MgrSocket.addListener('CtlTable', 'addMst')
        this.MgrSocket.addListener('CtlTable', 'syncMsts')
        this.MgrSocket.addListener('CtlTable', 'mstDeath')
        this.MgrSocket.addListener('CtlTable', 'hurtDmg')
        //this.MgrSocket.addListener('CtrDemo', 'demo')
    },
    onResult: function (e_name, result) {
        switch(e_name){
            case 'tblReady':
                if(result.ecode == 0){
                    this.ModTable.openTable(result.data)
                }else{
                    
                }
                break;
            case 'drawCards':
                if(result.ecode == 0){
                    this.ModTable.drawCards(result.data)
                }else{
                    
                }
                break;
            case 'newTurn':
                if(result.ecode == 0){
                    this.ModTable.newTurn(result.data)
                }else{
                    
                }
                break;
            case 'castCrt':
                if(result.ecode == 0){
                    this.ModTable.castCryst(result.data)
                }else{
                    
                }
                break;
            case 'syncCrt':
                if(result.ecode == 0){
                    this.ModTable.syncCryst(result.data)
                }else{
                    
                }
                break;
            case 'addMst':
                if(result.ecode == 0){
                    this.ModTable.addMonster(result.data)
                }else{
                    
                }
                break;
            case 'syncMsts':
                if(result.ecode == 0){
                    this.ModTable.syncMonster(result.data)
                }else{
                    
                }
                break;
            case 'mstDeath':
                if(result.ecode == 0){
                    this.ModTable.monsterDeath(result.data)
                }else{
                    
                }
                break;
            case 'syncHand':
                if(result.ecode == 0){
                    this.ModTable.syncHands(result.data)
                }else{
                    
                }
                break;
            case 'hurtDmg':
                if(result.ecode == 0){
                    this.ModTable.hurtDamage(result.data)
                }else{
                    
                }
                break;
        }
    },
});
