<template>
    <Tabs value="default">
        <TabPane label="默认国际化" name="default"><JFGrid :gridOptions='defaultI18nGrid' ref="gridDefaultI18n"/></TabPane>
        <TabPane label="服务国际化" name="name2"><JFGrid :gridOptions='grid' ref="gridI18n"/></TabPane>
    </Tabs>
    
</template>
<script>
    export default {
        data(){
            var vm=this;
            return {
                defaultI18nGrid:{
                    table:{
                        showPager:false,setting:false,
                        columns:[
                            {key:'i18nKey',title:vm.$t('i18n.key'),width:250,ellipsis:true},
                            {key:'i18nCN',title:vm.$t('i18n.cn'),ellipsis:true},
                            {key:'i18nEN',title:vm.$t('i18n.en'),ellipsis:true},
                        ],
                        data:vm.$JFI18n.parseI18n()
                    }
                },
                grid:{
                    table:{
                        columns:[
                            {type:'selection',width:60,align:'center'},
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {type: 'primary',size: 'small',icon:'edit'},
                                        on:{
                                            click:()=>{
                                                vm.$refs.gridI18n.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
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