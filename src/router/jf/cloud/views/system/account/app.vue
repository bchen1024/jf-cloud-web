<template>
    <JFGrid :gridOptions='grid' ref="gridApp"/>
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
                                                vm.$refs.gridApp.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'appCode',title:vm.$t('app.code'),width:150,condition:true},
                            {key:'appName',title:vm.$t('app.name'),width:150,condition:true},
                            {key:'appOwner',title:vm.$t('common.owner'),width:150,render:(h,params)=>{
                                return vm.$JFUtil.formatUser(h,params.row.appOwner,vm.$refs.gridApp.userMap);
                            }},
                            {key:'appDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/security/app/page',
                        queryParams:{removeCode:true}
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-platform/platform/security/app/batch/delete'
                    },
                    form:{
                        ref:'formApp',
                        createUrl:'jfcloud/jf-cloud-platform/platform/security/app/create',
                        updateUrl:'jfcloud/jf-cloud-platform/platform/security/app/update',
                        items:[
                            {key:'appCode',title:vm.$t('app.code')},
                            {key:'appName',title:vm.$t('app.name')},
                            {key:'appOwner',title:vm.$t('common.owner')},
                            {key:'appDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            appCode:{required: true,message:vm.$t('rules.required')},
                            appName:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            appOwner:{required: true,message:vm.$t('rules.required'), trigger: 'blur'}
                        },
                        defaultValue:{removeCode:true}
                    },
                    toolbars:[
                        {refs:'addApp',title:vm.$t('common.add'),icon:'ios-add',add:true},
                        {refs:'deleteApp',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,delete:true
                        }
                    ]
                }
            }
        }
    };
</script>