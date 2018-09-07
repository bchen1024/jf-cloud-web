<template>
    <JFGrid :gridOptions='grid' ref="gridGroup"/>
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
                                                vm.$refs.gridGroup.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'groupCode',title:vm.$t('group.code'),width:120,ellipsis:true,condition:true},
                            {key:'groupName',title:vm.$t('group.name'),width:150,ellipsis:true,condition:true},
                            {key:'applyStatus',title:vm.$t('common.applyStatus'),width:100},
                            {key:'groupOwner',title:vm.$t('common.owner'),width:120,ellipsis:true},
                            {key:'groupDesc',title:vm.$t('common.desc'),ellipsis:true}
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-platform/platform/security/group/page'
                    },
                    delete:{
                        url:'jfcloud/jf-cloud-platform/platform/security/group/batch/delete'
                    },
                    form:{
                        ref:'groupForm',
                        createUrl:'jfcloud/jf-cloud-platform/platform/security/group/create',
                        updateUrl:'jfcloud/jf-cloud-platform/platform/security/group/update',
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
                            groupCode:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            groupName:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            applyStatus:{required: true, message: 'The name cannot be empty', trigger: 'blur'},
                            groupOwner:{required: true, message: 'The name cannot be empty', trigger: 'blur'}
                        },
                        defaultValue:{applyStatus:'N'}
                    },
                    toolbars:[
                        {refs:'addGroup',title:vm.$t('common.add'),icon:'plus',add:true},
                        {refs:'deleteGroup',title:vm.$t('common.delete'),icon:'ios-trash-outline',type:'error',selection:true,delete:true}
                    ]
                }
            }
        }
    };
</script>