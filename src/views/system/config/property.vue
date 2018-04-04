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
                            {type:'selection',width:60,align:'center',fixed:'left'},
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
                        url:'jfcloud/jf-cloud-config/config/property/page'
                    },
                    form:{
                        ref:'formProperty',inline:true,width:800,
                        createUrl:'jfcloud/jf-cloud-config/config/property/create',
                        updateUrl:'jfcloud/jf-cloud-config/config/property/update',
                        items:[
                            {key:'propertyKey',title:vm.$t('property.key')},
                            {key:'propertyValue',title:vm.$t('property.value')},
                            {key:'propertyType',title:vm.$t('property.type')},
                            {key:'attr1',title:vm.$t('common.attr1')},
                            {key:'attr2',title:vm.$t('common.attr1')},
                            {key:'attr3',title:vm.$t('common.attr1')},
                            {key:'propertyDesc',title:vm.$t('common.desc'),type:'textarea'}
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