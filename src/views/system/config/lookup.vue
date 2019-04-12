<template>
    <Tabs>
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridLookup"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import {lookup} from '@/api';
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',btns:[
                                {type:'Icon',permission:'jf-cloud-platform$lookup$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.gridLookup.openFormModal(params.row);
                                    }
                                }
                            ]},
                            {key:'codeNo',title:vm.$t('code.no'),width:150,condition:true},
                            {key:'codeName',title:vm.$t('code.name'),width:150,condition:true},
                            {key:'codeType',title:vm.$t('code.type'),width:120},
                            {key:'codeParent',title:vm.$t('code.parent'),width:150},
                            {key:'codeDesc',title:vm.$t('common.desc')},
                        ]
                    },
                    search:{
                        request:lookup.findPage
                    },
                    delete:{
                        request:lookup.batchDelete
                    },
                    form:{
                        ref:'formLookup',
                        primaryKey:'codeId',
                        saveOp:{
                            createRequest:lookup.create,
                            updateRequest:lookup.update
                        },
                        items:[
                            {key:'codeNo',title:vm.$t('code.no')},
                            {key:'codeName',title:vm.$t('code.name')},
                            {key:'codeType',title:vm.$t('code.type')},
                            {key:'codeParent',title:vm.$t('code.parent')},
                            {key:'codeDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            codeNo:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            codeName:{required: true,message:vm.$t('rules.required'), trigger: 'blur'},
                            codeType:{required: true,message:vm.$t('rules.required'), trigger: 'blur'}
                        }
                    },
                    toolbars:[
                        {refs:'addLookup',title:vm.$t('common.add'),permission:'jf-cloud-platform$lookup$create',icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteLookup',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',permission:'jf-cloud-platform$lookup$delete',
                            selection:true,defaultHander:'gridDelete'
                        },
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$lookup$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$lookup$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$lookup$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$lookup$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$lookup$import | jf-cloud-platform$lookup$export'},
                        ]}
                    ]
                }
            }
        }
    };
</script>