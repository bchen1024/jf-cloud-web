<template>
    <JFGrid :gridOptions='grid' ref="gridAuditLog"/>
</template>
<script>
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        defaultColumn:false,
                        columns:[
                            {key:'logTime',title:vm.$t('auditLog.time'),width:150,condition:true},
                            {key:'logAccount',title:vm.$t('auditLog.account'),width:150,condition:true},
                            {key:'logIp',title:vm.$t('common.ip'),width:120},
                            {key:'logHost',title:vm.$t('common.host'),width:120},
                            {key:'logStartTime',title:vm.$t('common.startTime'),width:150},
                            {key:'logEndTime',title:vm.$t('common.endTime'),width:150},
                            {key:'logCost',title:vm.$t('common.cost'),width:120},
                            {key:'logUrl',title:vm.$t('auditLog.url'),width:250}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-monitor/monitor/auditLog/page'
                    }
                }
            }
        }
    };
</script>