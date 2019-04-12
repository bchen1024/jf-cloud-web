<template>
    <Layout :style="{height:'100%'}">
        <template v-if="$store.state.currentStore.hasUserError">
            错误
        </template>
        <template v-else>
            <Menu v-show="showMenu" mode="horizontal" theme="primary" 
                :active-name="$store.state.menuStore.currentMainMenuName"
                @on-select="menuSelect">
                <!--Logo 应用名称-->
                <div class="layout-logo">
                    <Icon v-if="$store.state.menuStore.siderMenus.length>0" @click.native="openOrCloseSider" 
                        type="ios-menu" size="28" :title="siderWidth==0?$t('common.open'):$t('common.close')"></Icon>
                    {{$t('common.appName')}}
                </div>
                <!--主菜单-->
                <MenuItem v-for="mainMenu in $store.state.menuStore.mainMenus" 
                    :name="mainMenu.name" :key="mainMenu.name">
                    <Icon v-if="mainMenu.icon" :type="mainMenu.icon"/>
                    {{$t(mainMenu.title)}}
                </MenuItem>
                <!--导航操作菜单-->
                <div class="layout-menu">
                    <Dropdown v-if="$store.state.currentStore.appList && $store.state.currentStore.appList.length>0" class='layout-menu-dropdown' @on-click="switchApp">
                        <a href="javascript:void(0)">
                            {{$store.state.currentStore.currentApp && $store.state.currentStore.currentApp.appCode}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="app in $store.state.currentStore.appList" :name="app.appCode" :key="app.appId" :selected="app.appCode==$store.state.currentStore.currentApp.appCode">
                                {{app.appCode}}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <!--当前语言信息-->
                    <JFLanguage/>
                    <!--当前用户信息-->
                    <JFPerson/>
                </div>
            </Menu>
            <Row>
                <Col span="20">
                    <!--导航面包屑-->
                    <Breadcrumb class="layout-breadcrumb">
                        <template>{{$t('common.curPath')}}</template>
                        <BreadcrumbItem>
                            <Icon type='ios-home-outline' size="20" style="margin-top:-6px"/>
                            {{$t('menu.home')}}
                        </BreadcrumbItem>
                        <BreadcrumbItem  v-for="breadcrumb in $store.state.menuStore.currentBreadcrumbs" :key="breadcrumb.name">
                            <Icon v-if="breadcrumb.icon" :type="breadcrumb.icon"/>
                            <template v-if="breadcrumb.isRouter">
                                <router-link :to="{name:breadcrumb.name}">{{$t(breadcrumb.title)}}</router-link>
                            </template>
                            <template v-else>
                                {{$t(breadcrumb.title)}}
                            </template>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
                <Col span="4">
                    <div style="float:right;margin-top: 8px;margin-right:10px;">
                        <Icon @click.native="maxOrNoraml" 
                            type="ios-expand" size="24"
                            :title="showMenu?$t('common.max'):$t('common.noraml')"
                            style="cursor: pointer;"></Icon>
                    </div>
                </Col>
            </Row>
            <Layout class="layout-center">                        
                <Sider :width="$store.state.menuStore.siderMenus.length==0?0:siderWidth"  :style="{background: '#fff',overflow:'auto'}">
                    <Menu width="auto" :style="{height:'100%'}"
                        :active-name="$store.state.menuStore.currentSiderMenuName"
                        :open-names="[$store.state.menuStore.openMenuName]"
                        @on-select="menuSelect">
                        <Submenu v-for="subMenu in $store.state.menuStore.siderMenus" :name="subMenu.name" :key="subMenu.name">
                            <template slot="title">
                                <Icon v-if="subMenu.icon" :type="subMenu.icon"/>
                                {{$t(subMenu.title)}}
                            </template>
                            <template v-if="subMenu.children && subMenu.children.length>0">
                                <MenuItem v-for="menu in subMenu.children" :name="menu.name" :key="menu.name">
                                    <Icon v-if="menu.icon" :type="menu.icon"/>
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
        </template>
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
            switchApp(name){
                if(name==this.$store.state.currentStore.currentApp.appCode){
                    return
                }
                this.$store.commit('switchApp',name);
            }
        }
    };
</script>
<style scoped>
    .layout-logo{
        min-width: 210px;
        color:#fff;
        font-size: 24px;
        text-align: center;
        float: left;
        padding: 0 16px;
        position: relative;
    }
    .layout-menu{
        float: right;
        margin-right: 24px;
    }
    .layout-menu a{
        color:#ffffff;
    }
    .layout-menu .ivu-dropdown{
        padding:0 8px;
    }
    .layout-breadcrumb{
        padding:0 16px;
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
    .layout-menu-dropdown:hover{
        background-color:#2b85e4;
    }
</style>