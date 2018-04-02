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
                    delete:{
                        url:'jfcloud/jf-cloud-config/config/property/batch/delete'
                    },
                    toolbars:[
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