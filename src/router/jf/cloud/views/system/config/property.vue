<template>
    <JFGrid :gridOptions='grid' ref="gridProperty"/>
</template>
<script>
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        columns:[
                            {type:'selection',width:60,align:'center',fixed:'left'},
                            {key:'operate',title:vm.$t('common.operate'),width:120,fixed:'left',align:'center',render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {type: 'primary',size: 'small',icon:'edit'},
                                        on:{
                                            click:()=>{
                                                vm.$refs.gridProperty.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'propertyKey',title:vm.$t('property.key'),width:150,ellipsis:true,condition:true,fixed:'left'},
                            {key:'propertyValue',title:vm.$t('property.value'),width:150,ellipsis:true,condition:true},
                            {key:'propertyType',title:vm.$t('property.type'),width:120,ellipsis:true},
                            {key:'attr1',title:vm.$t('common.attr1'),width:120,ellipsis:true},
                            {key:'attr2',title:vm.$t('common.attr2'),width:120,ellipsis:true},
                            {key:'attr3',title:vm.$t('common.attr3'),width:120,ellipsis:true},
                            {key:'propertyDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/config/property/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-config/config/property/batch/delete'
                    },
                    form:{
                        ref:'formProperty',
                        createUrl:'jfcloud/jf-cloud-config/config/property/create',
                        updateUrl:'jfcloud/jf-cloud-config/config/property/update',
                        items:[
                            {key:'propertyKey',title:vm.$t('property.key')},
                            {key:'propertyValue',title:vm.$t('property.value')},
                            {key:'propertyType',title:vm.$t('property.type')},
                            {key:'attr1',title:vm.$t('common.attr1')},
                            {key:'attr2',title:vm.$t('common.attr2')},
                            {key:'attr3',title:vm.$t('common.attr3')},
                            {key:'propertyDesc',title:vm.$t('common.desc'),type:'textarea'},

                        ],
                        rules:{
                            propertyKey:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            propertyValue:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            propertyType:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addProperty',title:vm.$t('common.add'),icon:'plus',add:true},
                        {refs:'deleteProperty',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,delete:true
                        }
                    ]
                }
            }
        }
    };
</script>