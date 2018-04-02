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
                            {key:'codeNo',title:vm.$t('code.no'),width:150,ellipsis:true,condition:true},
                            {key:'codeName',title:vm.$t('code.name'),width:150,ellipsis:true,condition:true},
                            {key:'codeType',title:vm.$t('code.type'),width:120,ellipsis:true},
                            {key:'codeParent',title:vm.$t('code.parent'),width:150,ellipsis:true},
                            {key:'codeDesc',title:vm.$t('common.desc'),ellipsis:true},
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-config/config/lookup/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-config/config/lookup/batch/delete'
                    },
                    toolbars:[
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