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
                    form:{
                        ref:'formI18n',
                        createUrl:'jfcloud/jf-cloud-config/config/i18n/create',
                        updateUrl:'jfcloud/jf-cloud-config/config/i18n/update',
                        items:[
                            {key:'i18nKey',title:vm.$t('i18n.key')},
                            {key:'i18nCN',title:vm.$t('i18n.cn'),type:'textarea'},
                            {key:'i18nEN',title:vm.$t('i18n.en'),type:'textarea'}
                        ],
                        rules:{
                            i18nKey:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            i18nCN:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            i18nEN:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addI18n',title:vm.$t('common.add'),icon:'plus',add:true},
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