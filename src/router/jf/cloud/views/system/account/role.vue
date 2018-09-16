<template>
    <JFGrid :gridOptions='grid' ref="gridRole"/>
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
                                                vm.$refs.gridRole.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'roleCode',title:vm.$t('role.code'),width:120,condition:true},
                            {key:'roleName',title:vm.$t('role.name'),width:150,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:100,align:'center',render:(h,params)=>{
                                return vm.$JFUtil.renderStatus(h,params.row.applyStatus);
                            }},
                            {key:'roleOwner',title:vm.$t('common.owner'),width:120,render:(h,params)=>{
                                return vm.$JFUtil.formatUser(h,params.row.roleOwner,vm.$refs.gridRole.userMap);
                            }},
                            {key:'roleDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/security/role/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-platform/platform/security/role/batch/delete'
                    },
                    form:{
                        ref:'roleForm',
                        createUrl:'jfcloud/jf-cloud-platform/platform/security/role/create',
                        updateUrl:'jfcloud/jf-cloud-platform/platform/security/role/update',
                        items:[
                            {key:'roleCode',title:vm.$t('role.code')},
                            {key:'roleName',title:vm.$t('role.name')},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),type:'radio',options:[
                                {value:'Y',text:vm.$t('common.canApply')},
                                {value:'N',text:vm.$t('common.notApply')}
                            ]},
                            {key:'roleOwner',title:vm.$t('common.owner')},
                            {key:'roleDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            roleCode:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            roleName:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            applyStatus:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            roleOwner:{required: true,message:vm.$t('rules.required'), trigger: 'blur'}
                        },
                        defaultValue:{applyStatus:'N'}
                    },
                    toolbars:[
                        {refs:'addRole',title:vm.$t('common.add'),icon:'ios-add',add:true},
                        {refs:'deleteRole',title:vm.$t('common.delete'),icon:'ios-trash-outline',type:'error',selection:true,delete:true},
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