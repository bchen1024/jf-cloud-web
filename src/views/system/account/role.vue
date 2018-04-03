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
                                    }),
                                    h('Icon', {
                                        props: {
                                            type: 'ios-person-outline',
                                            color:'#5cadff'
                                        },
                                        attrs:{
                                            title:vm.$t('common.user')
                                        },
                                        style:{
                                            cursor: 'pointer',
                                            'margin-left':'3px'
                                        }
                                    })
                                ]);
                            }},
                            {key:'roleCode',title:vm.$t('role.code'),width:120,ellipsis:true,condition:true},
                            {key:'roleName',title:vm.$t('role.name'),width:150,ellipsis:true,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:100},
                            {key:'roleOwner',title:vm.$t('common.owner'),width:120,ellipsis:true},
                            {key:'roleDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-security/security/role/page'
                    },
                    form:{
                        ref:'roleForm',
                        items:[
                            {key:'roleCode',title:vm.$t('role.code')},
                            {key:'roleName',title:vm.$t('role.name')},
                            {key:'applyStatus',title:vm.$t('common.applyStatus')},
                            {key:'roleOwner',title:vm.$t('common.owner')},
                            {key:'roleDesc',title:vm.$t('common.desc')}
                        ],
                        rules:{
                            roleCode:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addRole',title:vm.$t('common.add'),icon:'plus',add:true},
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