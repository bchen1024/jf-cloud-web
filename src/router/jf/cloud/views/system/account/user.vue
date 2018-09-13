<template>
    <JFGrid :gridOptions='grid' ref="gridUser"/>
</template>
<script>
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        columns:[
                            {key:'userAccount',title:vm.$t('user.account'),width:120,condition:true},
                            {key:'userName',title:vm.$t('user.name'),condition:true},
                            {key:'userTel',title:vm.$t('common.tel'),width:120,condition:true},
                            {key:'userEmail',title:vm.$t('common.email'),width:200},
                            {key:'employeeNo',title:vm.$t('user.employeeNo'),width:120},
                            {key:'userType',title:vm.$t('user.type'),width:120},
                            {key:'userTimeout',title:vm.$t('user.timeout'),width:150}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/security/user/page'                    
                    }
                }
            }
        }
    };
</script>