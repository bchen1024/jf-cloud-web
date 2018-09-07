<template>
    <Layout :style="{height:'100%'}">
        <Menu v-show="showMenu" mode="horizontal" theme="primary" 
            :active-name="$store.state.menuStore.currentMainMenu"
            class="layout-horizontal-menu">
            <!--Logo 应用名称-->
            <div class="layout-logo">
                {{$t('common.appName')}}
                <Icon v-if="$store.state.menuStore.siderMenus.length>0" @click.native="openOrCloseSider" 
                    type="navicon" size="28" style="cursor: pointer;float:right;margin-top:2px;" :title="siderWidth==0?$t('common.open'):$t('common.close')"></Icon>
            </div>
            <!--主菜单-->
            <div class="layout-nav">
                <MenuItem v-for="mainMenu in $store.state.menuStore.mainMenus" 
                    :name="mainMenu.name" :key="mainMenu.name">
                    <router-link :to="{name:mainMenu.name}" tag="li">{{$t(mainMenu.title)}}</router-link>
                </MenuItem>
            </div>
            <!--导航操作菜单-->
            <div class="layout-menu">
                <Dropdown class='layout-menu-dropdown'>
                    <a href="javascript:void(0)">
                        {{$store.state.currentApp && $store.state.currentApp.appName}}
                        <template v-if="$store.state.currentApp && $store.state.currentApp.appName">
                            <Icon type="arrow-down-b"></Icon>
                        </template>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="app in $store.state.appList" :key="app.appId">
                            {{app.appName}}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown @on-click="personClick" class='layout-menu-dropdown'>
                    <a href="javascript:void(0)">
                        <Avatar icon="person"/>
                        {{$store.state.currentUser && $store.state.currentUser.userName}}
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name='person'>{{$t('common.person')}}</DropdownItem>
                        <DropdownItem name='logout'>{{$t('common.logout')}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>      
            </div>
        </Menu>
        <!--导航面包屑-->
        <Breadcrumb class="layout-breadcrumb">
            <template>{{$t('common.curPath')}}</template>
            <BreadcrumbItem>
                {{$t('common.home')}}
            </BreadcrumbItem>
            <BreadcrumbItem  v-for="breadcrumb in $store.state.menuStore.currentBreadcrumbs" :key="breadcrumb.name">
                <template v-if="breadcrumb.path">
                    <router-link :to="{name:breadcrumb.name}">{{$t(breadcrumb.title)}}</router-link>
                </template>
                <template v-else>
                    {{$t(breadcrumb.title)}}
                </template>
            </BreadcrumbItem>
            <div style="float:right;margin-top: 5px;">
                <Icon @click.native="maxOrNoraml" 
                    :type="showMenu?'arrow-expand':'arrow-shrink'" size="28"
                    :title="showMenu?$t('common.max'):$t('common.noraml')"
                     style="cursor: pointer;"></Icon>
            </div>
        </Breadcrumb>
        <Layout class="layout-center">                        
            <Sider :width="$store.state.menuStore.siderMenus.length==0?0:siderWidth"  :style="{background: '#fff',overflow:'auto'}">
                <Menu width="auto" :style="{height:'100%'}" accordion
                    :active-name="$store.state.menuStore.currentSiderMenu"
                    :open-names="[$store.state.menuStore.openMenuName]">
                    <Submenu v-for="subMenu in $store.state.menuStore.siderMenus" :name="subMenu.name" :key="subMenu.name">
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
    export default {
        data(){
            return {
                siderWidth:200,
                showMenu:true
            }
        },
        methods: {
            //打开关闭左侧菜单
            openOrCloseSider(){
                if(this.siderWidth==0){
                    this.siderWidth=200;
                }else{
                    this.siderWidth=0;
                }
            },
            //显示隐藏主菜单
            maxOrNoraml(){
                this.showMenu=!this.showMenu;
            },
            personClick(name){
                if(name=='person'){
                    this.$router.push({name:name});
                }else if(name=='logout'){
                    this.$Modal.confirm({
                        title: this.$t('common.logout'),
                        content: this.$t('common.logoutConfirm'),
                        onOk: () => {
                            sessionStorage.removeItem("userStorage");
                            sessionStorage.removeItem("token");
                            this.$router.replace({name:'login'});
                        }
                    });
                }
            }
        },
        created () {
            var vm=this;
            var userStorage=sessionStorage.getItem('userStorage');
            if(userStorage){
                var userInfo=JSON.parse(userStorage);
                vm.$store.state.currentUser=userInfo;
                vm.$JFServices.userAppService.findUserApp({userId:userInfo.userId},vm);
                this.$store.commit('loadMainMenus');
            }else{
                this.$router.replace({name:'login',query:{redirectPath:vm.$route.path,redirectName:vm.$route.name}});
            }
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
        top: 4px;
    }
    .layout-nav{
        margin: 0 auto;
    }
    .layout-horizontal-menu{
        height:48px;
        line-height: 48px;
    }
    .layout-menu{
        float: right;
        margin-right: 24px;
    }
    .layout-menu a{
        color:#ffffff;
    }
    .layout-menu .ivu-dropdown{
        padding-right: 6px;
        padding-left: 6px;
    }
    .layout-breadcrumb{
        padding-left:12px;
        padding-right:12px;
        height:36px;
        line-height:36px;
    }
    .layout-center{
        padding: 0 12px 12px;
    }
    .layout-content{
        padding:12px;
        background: #ffffff;
        overflow:auto;
    }
    .layout-menu-dropdown:hover{
        background-color:#2b85e4;
    }
</style>