<template>
    <JFGrid :gridOptions='grid' ref="gridLookup"/>
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
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {type: 'primary',size: 'small',icon:'edit'},
                                        on:{
                                            click:()=>{
                                                vm.$refs.gridLookup.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'codeNo',title:vm.$t('code.no'),width:150,tooltip:true,condition:true},
                            {key:'codeName',title:vm.$t('code.name'),width:150,tooltip:true,condition:true},
                            {key:'codeType',title:vm.$t('code.type'),width:120,tooltip:true},
                            {key:'codeParent',title:vm.$t('code.parent'),width:150,tooltip:true},
                            {key:'codeDesc',title:vm.$t('common.desc'),tooltip:true},
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/config/lookup/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-platform/platform/config/lookup/batch/delete'
                    },
                    form:{
                        ref:'formLookup',
                        createUrl:'jfcloud/jf-cloud-platform/platform/config/lookup/create',
                        updateUrl:'jfcloud/jf-cloud-platform/platform/config/lookup/update',
                        items:[
                            {key:'codeNo',title:vm.$t('code.no')},
                            {key:'codeName',title:vm.$t('code.name')},
                            {key:'codeType',title:vm.$t('code.type')},
                            {key:'codeParent',title:vm.$t('code.parent')},
                            {key:'codeDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            codeNo:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            codeName:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            codeType:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addLookup',title:vm.$t('common.add'),icon:'plus',add:true},
                        {refs:'deleteLookup',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,delete:true
                        }
                    ]
                }
            }
        }
    };
</script>