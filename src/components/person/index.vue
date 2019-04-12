<template>
    <Dropdown v-if="$store.state.currentStore.currentUser" @on-click="personClick" class='jf-menu-person'>
        <a href="javascript:void(0)">
            <Avatar icon="ios-person"/>
            {{$store.state.currentStore.currentUser.userName+'('+$store.state.currentStore.currentUser.userAccount+')'}} 
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem name='person'>{{$t('common.person')}}</DropdownItem>
            <DropdownItem name='logout'>{{$t('common.logout')}}</DropdownItem>
        </DropdownMenu>
    </Dropdown> 
</template>

<script>
    import {getCurrentLanguage} from '@/libs/util';
    export default {
        name:'JFPerson',
        props:{
            
        },
        methods:{  
            personClick(name){
                if(name=='person'){
                    this.$router.push({name:name});
                }else if(name=='logout'){
                    this.$Modal.confirm({
                        title: this.$t('common.logout'),
                        content: this.$t('common.logoutConfirm'),
                        onOk: () => {
                            sessionStorage.removeItem("token");
                            this.$router.replace({name:'login'});
                        }
                    });
                }
            }
        }
    }
</script>
<style scoped>
    .jf-menu-person a{
        color:#ffffff;
    }
    .jf-menu-person:hover{
        background-color:#2b85e4;
    }
</style>