<template>
    <Tabs>
        <TabPane :label="$t('i18n.server')" name="serverI18n">
            <JFGrid :gridOptions='serverI18nGridOptions' ref="serverI18nGrid"/>
        </TabPane>
        <TabPane :label="$t('i18n.local')" name="localI18n">
            <JFGrid :gridOptions='localI18nGridOptions' ref="localI18nGrid"/>
        </TabPane>
    </Tabs>
    
</template>
<script>
    import {i18n} from '@/api';
    export default {
        data(){
            var vm=this;
            var start=new Date().getTime();
            var datas=vm.loadLocalI18nList();
            var end=new Date().getTime();
            console.info(end-start);
            return {
                localI18nGridOptions:{
                    table:{
                        showPager:false,showAuditUpdate:false,showSelection:false,
                        columns:[
                            {key:'i18nKey',title:vm.$t('i18n.key'),width:250,render:(h,params)=>{
                                if(params.row.i18nCN && params.row.i18nEN){
                                    return h('div',{},params.row.i18nKey);
                                }else{
                                    return h('div',{style:{color:'red'}},params.row.i18nKey);
                                }
                            }},
                            {key:'i18nCN',title:vm.$t('i18n.cn')},
                            {key:'i18nEN',title:vm.$t('i18n.en')}
                        ],
                        data:datas
                    }
                },
                serverI18nGridOptions:{
                    table:{
                        columns:[
                            {key:'operate',title:vm.$t('common.operate'),width:120,align:'center',btns:[
                                {type:'Icon',permission:'jf-cloud-platform$i18n$update',props:{type: 'ios-create'},attrs:{title:vm.$t('common.edit')},
                                    click:(params)=>{
                                        vm.$refs.serverI18nGrid.openFormModal(params.row);
                                    }
                                }
                            ]},
                            {key:'i18nKey',title:vm.$t('i18n.key'),width:250,condition:true},
                            {key:'i18nCN',title:vm.$t('i18n.cn'),condition:true},
                            {key:'i18nEN',title:vm.$t('i18n.en'),condition:true},
                        ]
                    },
                    search:{
                        request:i18n.findPage
                    },
                    delete:{
                        request:i18n.batchDelete
                    },
                    form:{
                        ref:'formI18n',
                        primaryKey:'i18nId',
                        saveOp:{
                            createRequest:i18n.create,
                            updateRequest:i18n.update
                        },
                        items:[
                            {key:'i18nKey',title:vm.$t('i18n.key')},
                            {key:'i18nCN',title:vm.$t('i18n.cn'),type:'textarea'},
                            {key:'i18nEN',title:vm.$t('i18n.en'),type:'textarea'}
                        ],
                        rules:{
                            i18nKey:{required: true,message:vm.$t('rules.required')},
                            i18nCN:{required: true,message:vm.$t('rules.required')},
                            i18nEN:{required: true,message:vm.$t('rules.required')}
                        }
                    },
                    toolbars:[
                        {refs:'addI18n',title:vm.$t('common.add'),permission:'jf-cloud-platform$i18n$create',icon:'ios-add',defaultHander:'openFormModal'},
                        {refs:'deleteI18n',title:vm.$t('common.delete'),
                            icon:'ios-trash-outline',type:'error',permission:'jf-cloud-platform$i18n$delete',
                            selection:true,defaultHander:'gridDelete'
                        },
                        {title:vm.$t('common.importOrExport'),items:[
                            {title:vm.$t('common.exportSelectedItems'),selection:true,permission:'jf-cloud-platform$i18n$export'},
                            {title:vm.$t('common.exportByCondition'),permission:'jf-cloud-platform$i18n$export'},
                            {title:vm.$t('common.import'),permission:'jf-cloud-platform$i18n$import'},
                            {title:vm.$t('common.importIgnoreExists'),permission:'jf-cloud-platform$i18n$import'},
                            {title:vm.$t('common.downloadImportTemplate'),permission:'jf-cloud-platform$i18n$import | jf-cloud-platform$i18n$export'},
                        ]}
                    ]
                }
            }
        },
        methods:{
            parseI18nData(obj,key,keyStr,i18n){
                if(typeof obj==='object'  || key==null){
                    for(var k in obj){
                        this.parseI18nData(obj[k],k,keyStr+k+'.',i18n);
                    }
                }else{
                    i18n[keyStr.substr(0,keyStr.length-1)]=obj;
                }
            },
            loadLocalI18nList(){
                var vm=this;
                var i18nList=[];
                var cnMap={};
                this.parseI18nData(vm.$i18n.messages['zh-CN'],null,'',cnMap);

                var enMap={};
                this.parseI18nData(vm.$i18n.messages['en-US'],null,'',enMap);

                for(var key in cnMap){
                    var i18n={
                        i18nKey:key,
                        i18nCN:cnMap[key]
                    };
                    if(enMap[key]){
                        i18n['i18nEN']=enMap[key];
                        delete enMap[key];
                    }
                    i18nList.push(i18n);
                }

                for(var k in enMap){
                    var i18nEN={
                        i18nKey:k,
                        i18nEN:enMap[k]
                    };
                    if(cnMap[k]){
                        i18nEN['i18nCN']=cnMap[k];
                        delete cnMap[k];
                    }
                    i18nList.push(i18nEN);
                }
                i18nList.sort(function(v1,v2){
                    return v1.i18nKey.localeCompare(v2.i18nKey);
                });
                return i18nList;
            }
        }
    };
</script>