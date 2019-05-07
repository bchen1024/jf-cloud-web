<template>
  <!--工具栏，存在工具栏按钮或者支持搜索渲染-->
    <Row v-if="showToolbar" 
        class="jf-toolbar" 
        type="flex" 
        :justify="justify">
        <template v-for="bar in realItems">
            <!--菜单按钮-->
            <Dropdown 
                v-if="bar.items && bar.items.length>0" 
                :key="bar.refs"
                @on-click="bar.click"
                transfer>
                <Button 
                    :type="bar.type || 'info'"  
                    class="jf-toolbar-item">
                    {{bar.title}}
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem 
                        v-for="item in bar.items" 
                        :key="item.refs"
                        :name="item.name"
                        :disabled="item.disabled || (item.selection && (!selectItems || selectItems.length==0))">
                        {{item.title}}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <!--普通按钮-->
            <Button v-else-if="!bar.items"
                :key="bar.refs" 
                :type="bar.type || 'primary'" 
                :icon="bar.icon" 
                :disabled="bar.disabled || (bar.selection && (!selectItems || (selectItems && selectItems.length==0)))"
                class="jf-toolbar-item"
                @click="bar.click">
                {{bar.title}}
            </Button>
        </template>
        <!--搜索框-->
        <template v-if="searchOp && searchOp.fields && searchOp.fields.length>0">
            <Input autofocus clearable
                class="jf-toolbar-item jf-input-search"
                :placeholder="searchOp.queryTip || $t('common.globalSearch')"
                :disabled="searchOp.loading"
                v-model="searchOp.queryValue"
                @on-enter="searchOp.click">
                <Select v-model="searchOp.queryKey" slot="prepend" style="width:auto;">
                    <Option v-for="field in searchOp.fields" :key="field.key" :value="field.key">
                        {{field.title}}
                    </Option>
                </Select>
            </Input>
            <Button type="primary" class="jf-toolbar-item" icon="ios-search" @click="searchOp.click">
                {{$t("common.search")}}
            </Button>
        </template>
        <!--<Icon type="ios-settings-outline" 
            size="20" 
            style="float:right;cursor: pointer;" 
            :title="$t('common.setting')" @click.native="toggleSettingModal"></Icon>-->
    </Row>
</template>

<script>
    import {checkPermission} from '@/libs/util.js';
    export default {
        name:'JFToolbar',
        props:{
            /**
             * 工具栏条目
             */
            items:{
                default:[]
            },
            /**
             * 查询配置
             */
            searchOp:{
                fields:[],
                queryTip:null,
                loading:false,
                queryKey:'',
                queryValue:''
            },
            /**
             * 选择项，根据此值判断是否选中来禁用某些按钮
             */
            selectItems:{
                default:[]
            },
            justify:{
                default:'start'
            }
        },
        computed:{
            showToolbar(){
                var vm=this;
                var showToolbar=false;
                if(vm.realItems.length>0 || (vm.searchOp && vm.searchOp.fields && vm.searchOp.fields.length>0)){
                    showToolbar=true;
                }
                return showToolbar;
            },
            realItems(){
                var vm=this;
                var realItems=[];
                (this.items || []).forEach(item=>{
                    if(item.items && item.items.length>0){
                        item.items=item.items.filter(it=>{
                            return !it.permission || (it.permission && checkPermission(vm.$store,it.permission))
                        });
                    }
                    if(item.permission && checkPermission(vm.$store,item.permission)){
                        realItems.push(item);
                    }else if(!item.permission){
                        realItems.push(item);
                    }
                });
                return realItems;
            }
        },
        created(){
            var vm=this;
            if(vm.searchOp && vm.searchOp.fields && vm.searchOp.fields.length>0){
                vm.searchOp.queryKey=vm.searchOp.fields[0].key;
            }
        }
    }
</script>
<style scoped>
    .jf-toolbar{
        margin-bottom: 10px;
    }
    .jf-toolbar-item{
        margin-right: 4px;
        margin-top: 2px;
    }
    .jf-input-search{
        width:360px;
    }
</style>