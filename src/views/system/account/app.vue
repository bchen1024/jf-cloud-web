<template>
    <Tabs v-model="curTab">
        <TabPane :label="$t('common.list')" name="list">
            <JFGrid :gridOptions='grid' ref="gridApp"/>
        </TabPane>
        <TabPane v-if="userListTab" :label="$t('app.userList')" name="userList">
            <JFForm :formOp="userListFormOp" :ref="userListFormOp.ref"/>
            <JFGrid :gridOptions='userListGrid' ref="userListGrid"/>
        </TabPane>
    </Tabs>
</template>
<script>
    import config from '@/config/config';
    import {app} from '@/api';
    import request from '@/libs/request';
    import bus from '@/libs/bus.js';
    export default {
        data(){
            var vm=this;
            return {
                curTab:'list',
                userListTab:false,
                grid:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,btns:[
                                {type:'Icon',permission:'jf-cloud-platform$app$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.gridApp.openFormModal(params.row);
                                    }
                                },
                                {type:'Icon',props:{type: 'ios-people'},attrs:{title:vm.$t('app.userList')},click:(params)=>{
                                    vm.userListTab=true;
                                    vm.curTab='userList';
                                    vm.userListFormOp.defalutValue=params.row;
                                    bus.$emit(vm.userListFormOp.ref+'InitForm',params.row);
                                }},
                                {type:'Icon',props:{type: 'ios-play'},attrs:{title:vm.$t('app.checkStatus')},
                                    click:(params)=>{
                                        request({
                                            url:config.serviceUrl+'jfcloud/'+params.row.appCode+params.row.appContextPath+'/common/checkAppStatus',
                                            method:'get'
                                        }).then(result=>{
                                            if(result=='Y'){
                                                vm.$Message.success(vm.$t('common.testSuccess'));
                                            }else{
                                                vm.$Message.error({
                                                    content:vm.$t('common.testFail'),
                                                    duration:6
                                                });
                                            }
                                        }).catch(error => {
                                            vm.$Message.error({
                                                content:vm.$t('common.testFail'),
                                                duration:6
                                            });
                                        });
                                    }
                                },
                                {type:'Icon',props:{type: 'md-sync'},attrs:{title:vm.$t('permission.sync')},click:()=>{
                                        
                                }},
                                {type:'Icon',props:{type: 'md-document',color:'#89bf04'},attrs:{title:vm.$t('common.swagger')},filter:(params)=>{
                                    return params.row.appCode!='jf-cloud-zuul';
                                },click:(params)=>{
                                    window.open(config.serviceUrl+'jfcloud/'+params.row.appCode+params.row.appContextPath+'/swagger-ui.html');
                                }}
                            ]},
                            {key:'appCode',title:vm.$t('app.code'),width:150,condition:true},
                            {key:'appName',title:vm.$t('app.name'),width:150,condition:true},
                            {key:'appContextPath',title:vm.$t('app.contextPath'),width:150},
                            {key:'appOwner',title:vm.$t('common.owner'),width:150,format:'user'},
                            {key:'appDesc',title:vm.$t('common.desc')}
                        ]
                    },
                    search:{
                        request:app.findPage
                    },
                    delete:{
                        request:app.batchDelete
                    },
                    toolbars:[
                        {refs:'addApp',title:vm.$t('common.add'),permission:'jf-cloud-platform$app$create',icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteApp',title:vm.$t('common.delete'),permission:'jf-cloud-platform$app$delete',
                            icon:'ios-trash-outline',type:'error',
                            selection:true,defaultHander:'gridDelete'
                        },
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$app$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$app$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$app$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$app$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$app$import | jf-cloud-platform$app$export'},
                        ]}
                    ],
                    form:{
                        ref:'formApp',
                        primaryKey:'appId',
                        saveOp:{
                            createRequest:app.create,
                            updateRequest:app.update
                        },
                        items:[
                            {key:'appCode',title:vm.$t('app.code')},
                            {key:'appName',title:vm.$t('app.name')},
                            {key:'appContextPath',title:vm.$t('app.contextPath')},
                            {key:'appOwner',title:vm.$t('common.owner')},
                            {key:'appDesc',title:vm.$t('common.desc'),type:'textarea'}
                        ],
                        rules:{
                            appCode:{required: true,message:vm.$t('rules.required')},
                            appName:{required: true,message:vm.$t('rules.required')},
                            appContextPath:{required: true,message:vm.$t('rules.required')},
                            appOwner:{required: true,message:vm.$t('rules.required')}
                        }
                    }
                },
                userListGrid:{
                    table:{
                        columns:[
                            {key:'userAccount',title:vm.$t('user.account'),width:120,condition:true},
                            {key:'userName',title:vm.$t('user.name'),width:150,condition:true},
                            {key:'employeeNo',title:vm.$t('user.employeeNo'),width:150,condition:true},
                            {key:'userType',title:vm.$t('user.type'),width:120},
                            {key:'userStatus',title:vm.$t('user.status'),width:120,format:'status',align:'center'}
                        ]
                    },
                    delete:{
                        request:app.batchDelete
                    },
                    toolbars:[
                        {refs:'addApp',title:vm.$t('common.add'),icon:'ios-add'},
                        {refs:'deleteApp',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',
                            selection:true,defaultHander:'gridDelete'
                        }
                    ]
                },
                userListFormOp:{
                    ref:'userListForm',
                    items:[
                        {key:'appCode',title:vm.$t('app.code')}
                    ]
                }
            }
        }
    };
</script>