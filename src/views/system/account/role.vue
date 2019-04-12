<template>
    <Tabs :value="curTab">
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridRole"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import {role} from '@/api';
    export default {
        data(){
            var vm=this;
            return {
                curTab:'list',
                grid:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',btns:[
                                {type:'Icon',permission:'jf-cloud-platform$role$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.gridRole.openFormModal(params.row);
                                    }
                                }
                            ]},
                            {key:'roleCode',title:vm.$t('role.code'),width:120,condition:true},
                            {key:'roleName',title:vm.$t('role.name'),width:150,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:120,align:'center',format:'status'},
                            {key:'roleOwner',title:vm.$t('common.owner'),width:120,format:'user'},
                            {key:'roleDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        request:role.findPage
                    },
                    delete:{
                        request:role.batchDelete
                    },
                    toolbars:[
                        {refs:'addRole',title:vm.$t('common.add'),permission:'jf-cloud-platform$role$create',icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteRole',title:vm.$t('common.delete'),permission:'jf-cloud-platform$role$delete',icon:'ios-trash-outline',type:'error',selection:true,defaultHander:'gridDelete'},
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$role$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$role$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$role$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$role$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$role$import | jf-cloud-platform$role$export'},
                        ]}
                    ],
                    form:{
                        ref:'formRole',
                        primaryKey:'roleId',
                        defaultValue:{applyStatus:'N'},
                        saveOp:{
                            createRequest:role.create,
                            updateRequest:role.update
                        },
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
                            roleCode:{required: true,message:vm.$t('rules.required')},
                            roleName:{required: true,message:vm.$t('rules.required')},
                            applyStatus:{required: true,message:vm.$t('rules.required')},
                            roleOwner:{required: true,message:vm.$t('rules.required')}
                        }
                    }
                }
            }
        }
    };
</script>