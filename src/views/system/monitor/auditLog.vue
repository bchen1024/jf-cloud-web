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
                        defaultColumn:false,showSelection:false,showAuditUpdate:false,
                        columns:[
                            {key:'logTime',title:vm.$t('auditLog.time'),width:155,format:'datetime'},
                            {key:'logAccount',title:vm.$t('auditLog.account'),width:150,condition:true},
                            {key:'logIp',title:vm.$t('common.ip'),width:120},
                            {key:'logHost',title:vm.$t('common.host'),width:150},
                            {key:'logStartTime',title:vm.$t('common.startTime'),width:180,format:'datetimems'},
                            {key:'logEndTime',title:vm.$t('common.endTime'),width:180,format:'datetimems'},
                            {key:'logCost',title:vm.$t('common.cost'),width:120},
                            {key:'logUrl',title:vm.$t('auditLog.url'),width:300},
                            {key:'logFullName',title:vm.$t('auditLog.fullName'),width:200},
                            {key:'logModul',title:vm.$t('auditLog.modul'),width:120},
                            {key:'logMethod',title:vm.$t('auditLog.method'),width:120},
                            {key:'logMessage',title:vm.$t('auditLog.message'),width:300},
                            {key:'logClient',title:vm.$t('auditLog.client'),width:120},
                            {key:'logType',title:vm.$t('auditLog.type'),width:120}
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