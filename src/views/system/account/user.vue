<template>
    <Tabs :value="curTab">
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridUser"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import {user} from '@/api';
    export default {
        data(){
            var vm=this;
            return {
                curTab:'list',
                grid:{
                    table:{
                        showAuditUpdate:false,
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',render: (h, params) => {
                                return h('div', [
                                    h('Icon', {
                                        props: {type: 'ios-create'},
                                        attrs:{title:vm.$t('common.edit')},
                                        on:{
                                            click:()=>{
                                                vm.$refs.gridUser.openFormModal(params.row);
                                            }
                                        }
                                    })
                                ]);
                            }},
                            {key:'userAccount',title:vm.$t('user.account'),width:120,condition:true},
                            {key:'userName',title:vm.$t('user.name'),condition:true},
                            {key:'userTel',title:vm.$t('common.tel'),width:120},
                            {key:'userEmail',title:vm.$t('common.email'),format:'mail'},
                            {key:'employeeNo',title:vm.$t('user.employeeNo'),width:120,condition:true},
                            {key:'userType',title:vm.$t('user.type'),width:100},
                            {key:'userStatus',title:vm.$t('user.status'),width:100,align:'center'},
                            //{key:'pwdError',title:vm.$t('user.pwdError'),width:120},
                            {key:'lockTime',title:vm.$t('user.lockTime'),width:155},
                            {key:'pwdUpdateTime',title:vm.$t('user.pwdUpdateTime'),width:155}
                        ]
                    },
                    search:{
                        request:user.findPage                
                    },
                    toolbars:[
                        {refs:'addUser',title:vm.$t('common.add'),icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteUser',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,defaultHander:'gridDelete'
                        }
                    ],
                    form:{
                        ref:'formUser',
                        primaryKey:'userId',
                        defaultValue:{userType:'1'},
                        items:[
                            {key:'userName',title:vm.$t('user.name')},
                            {key:'userTel',title:vm.$t('common.tel')},
                            {key:'userEmail',title:vm.$t('common.email')},
                            {key:'userType',title:vm.$t('user.type'),type:'select',options:[
                                {value:'1',text:vm.$t('user.typeEmployee')}
                            ]}
                        ],
                        saveOp:{
                            createRequest:user.create
                        },
                        rules:{
                            userAccount:{required: true,message:vm.$t('rules.required')},
                            userName:{required: true,message:vm.$t('rules.required')},
                            userType:{required: true,message:vm.$t('rules.required')}
                        }
                    }
                }
            }
        }
    };
</script>