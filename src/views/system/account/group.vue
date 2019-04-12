<template>
    <Tabs :value="curTab">
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridGroup"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import {group} from '@/api';
    export default {
        data(){
            var vm=this;
            return {
                curTab:'list',
                grid:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',btns:[
                                {type:'Icon',permission:'jf-cloud-platform$group$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.gridGroup.openFormModal(params.row);
                                    }
                                }
                            ]},
                            {key:'groupCode',title:vm.$t('group.code'),width:120,condition:true},
                            {key:'groupName',title:vm.$t('group.name'),width:150,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:120,align:'center',format:'status'},
                            {key:'groupOwner',title:vm.$t('common.owner'),width:120,format:'user'},
                            {key:'groupDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        request:group.findPage
                    },
                    delete:{
                        request:group.batchDelete
                    },
                    toolbars:[
                        {refs:'addGroup',title:vm.$t('common.add'),permission:'jf-cloud-platform$group$create',icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteGroup',title:vm.$t('common.delete'),icon:'ios-trash-outline',type:'error',
                         permission:'jf-cloud-platform$group$delete',selection:true,defaultHander:'gridDelete'},
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$group$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$group$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$group$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$group$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$group$import | jf-cloud-platform$group$export'},
                        ]}
                    ],
                    form:{
                        ref:'formGroup',
                        primaryKey:'groupId',
                        defaultValue:{applyStatus:'N'},
                        saveOp:{
                            createRequest:group.create,
                            updateRequest:group.update
                        },
                        items:[
                            {key:'groupCode',title:vm.$t('group.code')},
                            {key:'groupName',title:vm.$t('group.name')},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),type:'radio',options:[
                                {value:'Y',text:vm.$t('common.canApply')},
                                {value:'N',text:vm.$t('common.notApply')}
                            ]},
                            {key:'groupOwner',title:vm.$t('common.owner')},
                            {key:'groupDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            groupCode:{required: true,message:vm.$t('rules.required')},
                            groupName:{required: true,message:vm.$t('rules.required')},
                            applyStatus:{required: true,message:vm.$t('rules.required')},
                            groupOwner:{required: true,message:vm.$t('rules.required')}
                        }
                    }
                }
            }
        }
    };
</script>