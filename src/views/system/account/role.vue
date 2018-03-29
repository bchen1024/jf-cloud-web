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
                            {key:'roleCode',title:vm.$t('role.code'),width:120,ellipsis:true,condition:true},
                            {key:'roleName',title:vm.$t('role.name'),width:150,ellipsis:true,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:100},
                            {key:'roleOwner',title:vm.$t('common.owner'),width:120,ellipsis:true},
                            {key:'roleDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ],
                        data:[
                            {roleCode:'admin',roleName:'系统管理员',applyStatus:'N',roleOwner:100001,roleDesc:'系统管理员，拥有系统所有权限'},
                            {roleCode:'config',roleName:'参数配置员',applyStatus:'Y',roleOwner:100001,roleDesc:'系统参数配置员，拥有配置支撑系统正常运行的系统参数'}
                        ]
                    },
                    toolbars:[
                        {refs:'addRole',title:vm.$t('common.add'),icon:'plus'},
                        {refs:'deleteRole',title:vm.$t('common.delete'),icon:'ios-trash-outline',type:'error',selection:true},
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true},
                            {title:vm.$t('common.exportByCondition')},
                            {title:vm.$t('common.import')},
                            {title:vm.$t('common.importIgnoreExists')},
                            {title:vm.$t('common.downloadImportTemplate')},
                        ]},
                    ]
                }
            }
        }
    };
</script>