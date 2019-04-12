<template>
    <Tabs>
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridProperty"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import {property} from '@/api';
    export default {
        data(){
            var vm=this;
            return {
                grid:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,fixed:'left',align:'center',btns:[
                                {type:'Icon',permission:'jf-cloud-platform$property$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.gridProperty.openFormModal(params.row);
                                    }
                                }
                            ]},
                            {key:'propertyKey',title:vm.$t('property.key'),width:150,condition:true,fixed:'left'},
                            {key:'propertyValue',title:vm.$t('property.value'),width:150,condition:true},
                            {key:'propertyType',title:vm.$t('property.type'),width:120},
                            {key:'attr1',title:vm.$t('common.attr1'),width:120},
                            {key:'attr2',title:vm.$t('common.attr2'),width:120},
                            {key:'attr3',title:vm.$t('common.attr3'),width:120},
                            {key:'propertyDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        request:property.findPage
                    },
                    delete:{
                        request:property.batchDelete
                    },
                    toolbars:[
                        {refs:'addProperty',title:vm.$t('common.add'),icon:'ios-add',permission:'jf-cloud-platform$property$create',defaultHander:'openFormModal'},
                        {refs:'deleteProperty',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',permission:'jf-cloud-platform$property$delete',
                            selection:true,defaultHander:'gridDelete'
                        },
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$property$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$property$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$property$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$property$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$property$import | jf-cloud-platform$property$export'},
                        ]}
                    ],
                    form:{
                        ref:'formProperty',
                        primaryKey:'propertyId',
                        saveOp:{
                            createRequest:property.create,
                            updateRequest:property.update
                        },
                        items:[
                            {key:'propertyKey',title:vm.$t('property.key')},
                            {key:'propertyValue',title:vm.$t('property.value')},
                            {key:'propertyType',title:vm.$t('property.type')},
                            {key:'attr1',title:vm.$t('common.attr1')},
                            {key:'attr2',title:vm.$t('common.attr2')},
                            {key:'attr3',title:vm.$t('common.attr3')},
                            {key:'propertyDesc',title:vm.$t('common.desc'),type:'textarea'},
                        ],
                        rules:{
                            propertyKey:{required: true,message:vm.$t('rules.required')},
                            propertyValue:{required: true,message:vm.$t('rules.required')},
                            propertyType:{required: true,message:vm.$t('rules.required')}
                        }
                    }
                }
            }
        }
    };
</script>