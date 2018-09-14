<template>
    <Layout :style="{height:'100%'}">
        <Menu v-show="showMenu" mode="horizontal" theme="primary" 
            :active-name="$store.state.menuStore.currentMainMenu"
            class="layout-horizontal-menu"
            @on-select="menuSelect">
            <!--Logo 应用名称-->
            <div class="layout-logo">
                {{$t('common.appName')}}
                <Icon v-if="$store.state.menuStore.siderMenus.length>0" @click.native="openOrCloseSider" 
                    type="ios-menu" size="28" style="cursor: pointer;float:right;margin-top:6px;" :title="siderWidth==0?$t('common.open'):$t('common.close')"></Icon>
            </div>
            <!--主菜单-->
            <div class="layout-nav">
                <MenuItem v-for="mainMenu in $store.state.menuStore.mainMenus" 
                    :name="mainMenu.name" :key="mainMenu.name">
                    {{$t(mainMenu.title)}}
                </MenuItem>
            </div>
            <!--导航操作菜单-->
            <div class="layout-menu">
                <Dropdown class='layout-menu-dropdown'>
                    <a href="javascript:void(0)">
                        {{$store.state.currentStore.currentApp && $store.state.currentStore.currentApp.appName}}
                        <template v-if="$store.state.currentStore.currentApp && $store.state.currentStore.currentApp.appName">
                            <Icon type="arrow-down-b"></Icon>
                        </template>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="app in $store.state.currentStore.appList" :key="app.appId">
                            {{app.appName}}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown @on-click="$JFI18n.switchLanguage" class='layout-menu-dropdown'>
                        <a href="javascript:void(0)">
                            {{$t('common.'+$lang)}} 
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name='zh_CN'>{{$t('common.zh_CN')}}</DropdownItem>
                            <DropdownItem name='en_US'>{{$t('common.en_US')}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                <template v-if="$store.state.currentStore">
                    <Dropdown @on-click="personClick" class='layout-menu-dropdown'>
                        <a href="javascript:void(0)">
                            <Avatar icon="ios-person"/>
                            {{$store.state.currentStore.currentUser.userName+'('+$store.state.currentStore.currentUser.userAccount+')'}} 
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name='person'>{{$t('common.person')}}</DropdownItem>
                            <DropdownItem name='logout'>{{$t('common.logout')}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown> 
                </template>
            </div>
        </Menu>
         <Row>
            <Col span="20">
                <!--导航面包屑-->
                <Breadcrumb class="layout-breadcrumb">
                    <template>{{$t('common.curPath')}}</template>
                    <BreadcrumbItem>
                        {{$t('menu.home')}}
                    </BreadcrumbItem>
                    <BreadcrumbItem  v-for="breadcrumb in $store.state.menuStore.currentBreadcrumbs" :key="breadcrumb.name">
                        <template v-if="breadcrumb.path">
                            <router-link :to="{name:breadcrumb.name}">{{$t(breadcrumb.title)}}</router-link>
                        </template>
                        <template v-else>
                            {{$t(breadcrumb.title)}}
                        </template>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Col>
            <Col span="4">
                <div style="float:right;margin-top: 5px;margin-right:10px;">
                    <Icon @click.native="maxOrNoraml" 
                        type="ios-expand" size="24"
                        :title="showMenu?$t('common.max'):$t('common.noraml')"
                        style="cursor: pointer;"></Icon>
                </div>
            </Col>
        </Row>
        
        <Layout class="layout-center">                        
            <Sider :width="$store.state.menuStore.siderMenus.length==0?0:siderWidth"  :style="{background: '#fff',overflow:'auto'}">
                <Menu width="auto" :style="{height:'100%'}" accordion
                    :active-name="$store.state.menuStore.currentSiderMenu"
                    :open-names="[$store.state.menuStore.openMenuName]"
                    @on-select="menuSelect">
                    <Submenu v-for="subMenu in $store.state.menuStore.siderMenus" :name="subMenu.name" :key="subMenu.name">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            {{$t(subMenu.title)}}
                        </template>
                        <template v-if="subMenu.children && subMenu.children.length>0">
                            <MenuItem v-for="menu in subMenu.children" :name="menu.name" :key="menu.name">
                                {{$t(menu.title)}}
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
            menuSelect(name){
                this.$router.push({name:name});
            },
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
                vm.$store.state.currentStore.currentUser=userInfo;
                //vm.$JFServices.userAppService.findUserApp({userId:userInfo.userId},vm);
                this.$store.commit('loadMainMenus');
            }else{
                this.$router.replace({name:'login',query:{redirectName:vm.$route.name}});
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
        width: 210px;
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