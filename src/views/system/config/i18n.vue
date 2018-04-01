<template>
    <JFGrid :gridOptions='grid'/>
</template>
<script>
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        columns:[
                            {type:'selection',width:60,align:'center'},
                            {key:'i18nKey',title:vm.$t('i18n.key'),width:250,ellipsis:true,condition:true},
                            {key:'i18nCN',title:vm.$t('i18n.cn'),ellipsis:true,condition:true},
                            {key:'i18nEN',title:vm.$t('i18n.en'),ellipsis:true,condition:true},
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-config/config/i18n/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-config/config/i18n/batch/delete'
                    },
                    toolbars:[
                        {refs:'deleteI18n',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,delete:true
                        }
                    ]
                }
            }
        }
    };
</script>