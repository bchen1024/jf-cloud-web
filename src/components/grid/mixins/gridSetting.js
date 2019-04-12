import request from '@/libs/request';
export default {
    data(){
        let vm=this;
        return {
            settingColumns:[
                {key:'key',title:vm.$t('common.field')},
                {key:'title',title:vm.$t('common.title')},
                {key:'hidden',title:vm.$t('common.show'),width:100,align:'center'},
                {key:'fixed',title:vm.$t('common.fixed'),width:100,align:'center'},
                {key:'width',title:vm.$t('common.width'),width:100}
            ],
            showSetting:false
        };
    },
    computed:{
        settingData(){
            let vm=this,columns=vm.columns,settingData=[];
            if(columns && columns.length>0){
                columns.forEach(col=>{
                    settingData.push(col);
                });
            }
            return settingData;
        }
    },
    methods:{
        /**
         * 显示隐藏表格设置窗口
         */
        toggleSettingModal(){
            this.showSetting=!this.showSetting;
        }
    }
};