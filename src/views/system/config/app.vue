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
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',render: (h, params) => {
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'edit',
                                            size:14,
                                            color:'#5cadff'
                                        },
                                        attrs:{
                                            title:vm.$t('common.edit')
                                        },
                                        style:{
                                            cursor: 'pointer'
                                        }
                                    })
                                ]);
                            }},
                            {key:'appCode',title:vm.$t('app.code'),width:150,ellipsis:true,condition:true},
                            {key:'appName',title:vm.$t('app.name'),width:150,ellipsis:true,condition:true},
                            {key:'appOwner',title:vm.$t('common.owner'),width:120,ellipsis:true},
                            {key:'appDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-app/app/mgt/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-app/app/mgt/batch/delete'
                    },
                    toolbars:[
                        {refs:'addApp',title:vm.$t('common.add'),icon:'plus'},
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