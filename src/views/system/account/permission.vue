
<template>
    <Layout :style="{height:'100%'}">
        <Sider width="280" :style="{background: '#fff',border:'1px solid #d9d9d9',padding:'8px'}">
            <Tree :data="treeData" show-checkbox @on-select-change="onSelectChange"></Tree>
        </Sider>
        <Content :style="{background: '#fff',padding:'8px'}">
            <Alert show-icon>{{$t('permission.tip')}}</Alert>
            <JFForm :formOp="formOp" ref="formPermission"/>
        </Content>
    </Layout>
</template>
<script>
    import {permission} from '@/api';
    export default {
        data(){
            let vm=this;
            return {
               treeData:[],
               formOp:{
                    ref:'formPermission',
                    primaryKey:'permissionId',
                    defaultValues:{permissionSource:'custom'},
                    labelWidth:150,
                    items:[
                        {key:'permissionCode',title:vm.$t('permission.code')},
                        {key:'permissionDescCN',title:vm.$t('permission.cn')},
                        {key:'permissionDescEN',title:vm.$t('permission.en')},
                        {key:'permissionType',title:vm.$t('permission.type'),type:'select',options:[
                            {value:'resources',text:vm.$t('permission.resources')},
                            {value:'method',text:vm.$t('permission.method')}
                        ]},
                        {key:'parentCode',title:vm.$t('permission.parent')},
                        {key:'permissionSource',title:vm.$t('permission.source'),type:'select',options:[
                            {value:'annotation',text:vm.$t('permission.annotation')},
                            {value:'custom',text:vm.$t('permission.custom')}
                        ]}
                    ],
                    rules:{
                        permissionCode:{required: true,message:vm.$t('rules.required')},
                        permissionDescCN:{required: true,message:vm.$t('rules.required')},
                        permissionDescEN:{required: true,message:vm.$t('rules.required')},
                        permissionType:{required: true,message:vm.$t('rules.required')},
                        permissionSource:{required: true,message:vm.$t('rules.required')}
                    },
                    defaultToolbars:false,
                    toolbars:[
                        {title:vm.$t('common.add'),icon:'ios-add'},
                        {title:vm.$t('common.save'),icon:'ios-checkmark'},
                        {title:vm.$t('common.delete'),icon:'ios-trash-outline',type:'error'}
                    ]
                }
            };
        },
        created(){
            var vm=this;
            vm.loadPermissionTree();
        },
        methods: {
            loadPermissionTree(){
                var vm=this;
                permission.listTree({removeApp:true}).then(result=>{
                    vm.treeData=result;
                });
            },
            onSelectChange(nodes){
                var vm=this;
                if(nodes && nodes.length>0){
                    vm.formOp.data=nodes[0].attribute;
                }
            }
        }
    };
</script>