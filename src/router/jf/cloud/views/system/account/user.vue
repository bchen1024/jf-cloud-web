<template>
    <JFGrid :gridOptions='grid' ref="gridUser"/>
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
                                                vm.$refs.gridUser.openFormModal(params.row);
                                            }
                                        }
                                    },this.$t('common.edit'))
                                ]);
                            }},
                            {key:'userAccount',title:vm.$t('user.account'),width:120,ellipsis:true,condition:true},
                            {key:'userName',title:vm.$t('user.name'),ellipsis:true,condition:true},
                            {key:'userTel',title:vm.$t('common.tel'),width:120,ellipsis:true,condition:true},
                            {key:'userEmail',title:vm.$t('common.email'),width:200,ellipsis:true},
                            {key:'employeeNo',title:vm.$t('user.employeeNo'),width:120,ellipsis:true},
                            {key:'userType',title:vm.$t('user.type'),width:120,ellipsis:true},
                            {key:'userTimeout',title:vm.$t('user.timeout'),width:120,ellipsis:true}
                            
                        ]
                    },
                    search:{
                        url:'jfcloud/jf-cloud-security/security/user/page'
                    }
                }
            }
        }
    };
</script>