<template>
    <div class="layout">
        <Layout :style="{height:'100%'}">
            <Menu mode="horizontal" theme="primary" 
                :active-name="$store.state.currentMainMenu">
                <!--Logo 应用名称-->
                <div class="layout-logo">
                    {{$t('common.appName')}}
                </div>
                <!--主菜单-->
                <div class="layout-nav">
                    <MenuItem v-for="mainMenu in $store.state.mainMenus" 
                        :name="mainMenu.name" :key="mainMenu.name">
                        <router-link :to="{name:mainMenu.name}" tag="li">{{mainMenu.title}}</router-link>
                    </MenuItem>
                </div>
                <!--导航操作菜单-->
                <div class="layout-menu">
                    <Submenu name='appSubMenu'>
                        <template slot="title">
                            APP：jf-cloud
                        </template>
                        <MenuItem name='jf-cloud'>
                            jf-cloud
                        </MenuItem>
                        <MenuItem name='jf-cloud-hr'>
                            jf-cloud-hr
                        </MenuItem>
                    </Submenu>
                    <Submenu name='personSubMenu'>
                        <template slot="title">
                            <Avatar icon="person"/>
                            陈斌
                        </template>
                        <MenuItem name='person'>
                            <router-link :to="{name:'person'}" tag="li">{{$t('common.person')}}</router-link>
                        </MenuItem>
                        <MenuItem name='logout'>
                            {{$t('common.logout')}}
                        </MenuItem>
                    </Submenu>                    
                </div>
            </Menu>
            <!--导航面包屑-->
            <Breadcrumb class="layout-breadcrumb">
                <BreadcrumbItem>
                    {{$t('common.home')}}
                </BreadcrumbItem>
                <BreadcrumbItem  v-for="breadcrumb in $store.state.currentBreadcrumbs" :key="breadcrumb.name">
                    <template v-if="breadcrumb.path">
                        <router-link :to="{name:breadcrumb.name}">{{breadcrumb.title}}</router-link>
                    </template>
                    <template v-else>
                        {{breadcrumb.title}}
                    </template>
                </BreadcrumbItem>
            </Breadcrumb>
            <Layout :style="{padding: '0 12px 12px'}">                        
                <Sider :width="$store.state.siderMenus.length==0?0:200"  :style="{background: '#fff',overflow:'auto'}">
                    <Menu width="auto" :style="{height:'100%'}"
                        :active-name="$store.state.currentSiderMenu"
                        :open-names="[$store.state.openMenuName]">
                        <Submenu v-for="subMenu in $store.state.siderMenus" :name="subMenu.name" :key="subMenu.name">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{subMenu.title}}
                            </template>
                            <template v-if="subMenu.children && subMenu.children.length>0">
                                <MenuItem v-for="menu in subMenu.children" :name="menu.name" :key="menu.name">
                                    <router-link :to="{name:menu.name}" tag="li">{{menu.title}}</router-link>
                                </MenuItem>
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Content :style="{padding:'12px',background:'#fff',overflow:'auto'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import util from  '../libs/util.js';
    import menus from  '../config/menus/index.js';
    export default {
        data(){
            return {
                
            }
        },
        methods: {
        },
        created () {
            this.$store.commit('loadMainMenus');
        }
    };
</script>
<style scoped>
    .layout{
        position: relative;
        overflow-y: auto;  
        height: 100vh;
    }
    .layout-logo{
        width: 199px;
        height: 40px;
        line-height: 40px;
        color:#fff;
        font-size: 24px;
        text-align: center;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 10px;
    }
    .layout-nav{
        margin: 0 auto;
    }
    .layout-menu{
        color:#fff;
        float: right;
    }
    .layout-menu a{
        color:#fff;
    }
    .layout-breadcrumb{
        padding:12px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .ivu-avatar>i{
        margin-right: 0px !important;
    }
</style>