<template>
    <Layout :style="{height:'100%'}">
        <Menu mode="horizontal" theme="primary" 
            :active-name="$store.state.currentMainMenu"
            style="height:48px;line-height:48px;">
            <!--Logo 应用名称-->
            <div class="layout-logo">
                {{$t('common.appName')}}
            </div>
            <!--主菜单-->
            <div class="layout-nav">
                <MenuItem v-for="mainMenu in $store.state.mainMenus" 
                    :name="mainMenu.name" :key="mainMenu.name">
                    <router-link :to="{name:mainMenu.name}" tag="li">{{$t(mainMenu.title)}}</router-link>
                </MenuItem>
            </div>
            <!--导航操作菜单-->
            <div class="layout-menu">
                <Dropdown>
                    <a href="javascript:void(0)">
                        jf-cloud
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>jf-cloud</DropdownItem>
                        <DropdownItem>jf-cloud-hr</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <a href="javascript:void(0)">
                        <Avatar icon="person"/>
                        陈斌
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem><router-link :to="{name:'person'}" tag="li">{{$t('common.person')}}</router-link></DropdownItem>
                        <DropdownItem>{{$t('common.logout')}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>      
            </div>
        </Menu>
        <!--导航面包屑-->
        <Breadcrumb class="layout-breadcrumb">
            <div v-if="$store.state.siderMenus.length>0" style="margin-top: 5px;margin-right:6px;float:left;">
                <Icon @click.native="openOrCloseSider" type="navicon" size="28" style="cursor: pointer;" :title="siderWidth==0?$t('common.open'):$t('common.close')"></Icon>
            </div>
            <template>{{$t('common.curPath')}}</template>
            <BreadcrumbItem>
                {{$t('common.home')}}
            </BreadcrumbItem>
            <BreadcrumbItem  v-for="breadcrumb in $store.state.currentBreadcrumbs" :key="breadcrumb.name">
                <template v-if="breadcrumb.path">
                    <router-link :to="{name:breadcrumb.name}">{{$t(breadcrumb.title)}}</router-link>
                </template>
                <template v-else>
                    {{$t(breadcrumb.title)}}
                </template>
            </BreadcrumbItem>
            <div style="float:right;margin-top: 5px;">
                <Icon type="arrow-expand" size="28" style="cursor: pointer;"></Icon>
            </div>
        </Breadcrumb>
        <Layout class="layout-center">                        
            <Sider :width="$store.state.siderMenus.length==0?0:siderWidth"  :style="{background: '#fff',overflow:'auto'}">
                <Menu width="auto" :style="{height:'100%'}"
                    :active-name="$store.state.currentSiderMenu"
                    :open-names="[$store.state.openMenuName]">
                    <Submenu v-for="subMenu in $store.state.siderMenus" :name="subMenu.name" :key="subMenu.name">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            {{$t(subMenu.title)}}
                        </template>
                        <template v-if="subMenu.children && subMenu.children.length>0">
                            <MenuItem v-for="menu in subMenu.children" :name="menu.name" :key="menu.name">
                                <router-link :to="{name:menu.name}" tag="li">{{$t(menu.title)}}</router-link>
                            </MenuItem>
                        </template>
                    </Submenu>
                </Menu>
            </Sider>
            <Content class="layout-content">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import util from  '../libs/util.js';
    import menus from  '../config/menus/index.js';
    export default {
        data(){
            return {
                siderWidth:200
            }
        },
        methods: {
            openOrCloseSider(){
                if(this.siderWidth==0){
                    this.siderWidth=200;
                }else{
                    this.siderWidth=0;
                }
            }
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
        height: 32px;
        line-height: 32px;
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
        float: right;
        margin-right: 24px;
    }
    .layout-menu a{
        color:#ffffff;
    }
    .layout-menu .ivu-dropdown{
        margin-right: 6px;
        margin-left: 6px;
    }
    .layout-breadcrumb{
        padding-left:12px;
        padding-right:12px;
        height:40px;
        line-height:40px;
    }
    .layout-center{
        padding: 0 12px 12px;
    }
    .layout-content{
        padding:12px;
        background: #ffffff;
        overflow:auto;
    }
</style>