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
                            {type:'selection',width:60,align:'center'},
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
                            {key:'appCode',title:vm.$t('app.code'),width:150,ellipsis:true,condition:true},
                            {key:'appName',title:vm.$t('app.name'),width:150,ellipsis:true,condition:true},
                            {key:'appOwner',title:vm.$t('common.owner'),width:120,ellipsis:true},
                            {key:'appDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-config/config/app/page',
                        queryParams:{removeCode:true}
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-config/config/app/batch/delete'
                    },
                    form:{
                        ref:'formApp',
                        createUrl:'jfcloud/jf-cloud-config/config/app/create',
                        updateUrl:'jfcloud/jf-cloud-config/config/app/update',
                        items:[
                            {key:'appCode',title:vm.$t('app.code')},
                            {key:'appName',title:vm.$t('app.name')},
                            {key:'appOwner',title:vm.$t('common.owner')},
                            {key:'appDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            appCode:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            appName:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            appOwner:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addApp',title:vm.$t('common.add'),icon:'plus',add:true},
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