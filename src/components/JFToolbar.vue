<template>
  <!--工具栏，存在工具栏按钮或者支持搜索渲染-->
    <Row v-if="show" class="jf-toolbar" type="flex" justify="start">
        <template v-for="bar in toolbars">
            <!--菜单按钮-->
            <Dropdown v-if="barType=='dropdown'" :key="bar.refs">
                <Button :type="bar.type || 'info'"  class="jf-toolbar-item">
                    {{bar.title}}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-for="item in bar.items" :key="item.refs"
                        :disabled="item.disabled">
                        {{item.title}}
                    </Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
        </template>
        <!--普通按钮-->
        <Button v-if="!bar.items || bar.items.length==0"  
                v-for="bar in toolbars" 
                :key="bar.refs" 
                :type="bar.type || 'primary'" 
                :icon="bar.icon" 
                :disabled="bar.disabled || (bar.selection && (!selectItems || selectItems.length==0))"
                class="jf-toolbar-item"
                @click="btnClick(bar)">
            {{bar.title}}
        </Button>
        
        
        <span v-if="table.setting" style="margin-start:auto">
            <Icon type="ios-gear-outline" size="20" 
                style="margin-top:12px;margin-right:3px;cursor: pointer;" :title="$t('common.setting')" @click.native="openSetting"></Icon>
        </span>
    </Row>
</template>

<script>
    export default {
        name:'JFToolbar',
        props:{
            show:{
                default:true
            },
            toolbars:{
                default:[]
            }
        },
        data (){
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