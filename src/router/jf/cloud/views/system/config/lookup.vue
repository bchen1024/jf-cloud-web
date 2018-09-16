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
                            {key:'codeNo',title:vm.$t('code.no'),width:150,condition:true},
                            {key:'codeName',title:vm.$t('code.name'),width:150,condition:true},
                            {key:'codeType',title:vm.$t('code.type'),width:120},
                            {key:'codeParent',title:vm.$t('code.parent'),width:150},
                            {key:'codeDesc',title:vm.$t('common.desc')},
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
                            codeNo:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            codeName:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            codeType:{required: true,message:vm.$t('rules.required'), trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addLookup',title:vm.$t('common.add'),icon:'ios-add',add:true},
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