<template>
    <div>
        <!--工具栏，存在工具栏按钮或者支持搜索渲染-->
        <Row v-if="(toolbars && toolbars.length>0) || table.queryFields.length>0" 
             class="jf-toolbar" type="flex" justify="start">
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
            <!--菜单按钮-->
            <Dropdown v-if="bar.items && bar.items.length>0" v-for="bar in toolbars" :key="bar.refs">
                <Button :type="bar.type || 'info'"  class="jf-toolbar-item">
                    {{bar.title}}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list">
                    <Dropdown-item v-for="item in bar.items" :key="item.refs"
                        :disabled="item.disabled || (item.selection && (!selectItems || selectItems.length==0))">
                        {{item.title}}
                    </Dropdown-item>
                </Dropdown-menu>
            </Dropdown>
            <!--搜索框-->
            <Input v-if="table.queryFields.length>0"
                    icon="ios-search"
                    autofocus
                    class="jf-toolbar-item jf-input-search"
                    :placeholder="$t('common.queryTip')"
                    :disabled="table.loading"
                    v-model="searchOp.queryValue"
                    @on-click="load()"
                    @on-enter="load()">
                    <Select v-model="searchOp.queryKey" slot="prepend" style="width:100px;">
                        <Option v-for="field in table.queryFields" :key="field.key" :value="field.key">
                            {{field.title}}
                        </Option>
                    </Select>
            </Input>
        </Row>
        <!--Table列表-->
        <Table border stripe size="small"
            :columns="table.columns" :data="table.data"  
            :loading="table.loading"
            @on-selection-change="selectionChange">
        </Table>
        <!--分页-->
        <Page v-if='table.showPager' @on-change="onChange"
            @on-page-size-change="onPageSizeChange"
            :total="pager.total" 
            :page-size="pager.pageSize" 
            :current="pager.curPage" 
            size="small"
            placement="top" show-elevator show-sizer show-total
            class="table-pager">
        </Page>
        <!--删除确认框-->
        <Modal v-if="gridOptions && gridOptions.delete" v-model="deleteOp.isShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{deleteOp.title}}</span>
            </p>
            <div style="text-align:center">
                {{deleteOp.message}}
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="deleteOp.loading" @click="doDelete">{{deleteOp.btnText}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {JFFetch} from '../../libs/jf.js';
    export default {
        name:'JFGrid',
        props:['gridOptions'],
        data (){
            var vm=this;
            return {
                table:{},
                pager:{},
                selectItems:[],
                deleteOp:{
                    title:vm.$t('common.deleteTitle'),
                    message:vm.$t('common.deleteMessage'),
                    btnText:vm.$t('common.delete'),
                    loading:false,
                    isShow:false
                },
                searchOp:{
                    autoLoad:true,
                    queryParams:{},
                    queryKey:"",
                    queryValue:""
                }
            }
        },
        methods:{
            load(params,reload){
                let vue=this;
                let search=this.searchOp;
                this.selectItems=[];
                if(search && search.url){
                    let param={};
                    if(reload){
                        param=params;
                    }else{
                        if(search.queryKey && search.queryValue){
                            search.queryParams[search.queryKey]=search.queryValue;
                        }
                        param=Object.assign({},JSON.parse(JSON.stringify(search.queryParams || {})),params);
                    }
                    if(this.table.showPager){
                        Object.assign(param,{
                            curPage:this.pager.curPage,
                            pageSize:this.pager.pageSize
                        });
                    }
                    this.table.loading=true;
                    this.table.data=[];
                    JFFetch.doRequest(search.method,search.url,param,function(result){
                        vue.table.loading=false;
                        vue.table.data=result.result ||[];
                        vue.pager=result.page;
                    },function(error){
                        vue.table.loading=false;
                    });
                    delete search.queryParams[search.queryKey];
                }
            },
            onChange(curPage){
                this.pager.curPage=curPage;
                this.load();
            },
            onPageSizeChange(pageSize){
                this.pager.pageSize=pageSize;
                this.load();
            },
            selectionChange(selection){
                this.selectItems=selection;
            },
            btnClick(bar){
                if(bar.delete){
                    this.gridDelete(bar);
                }
            },
            gridDelete(bar){
                let grid=this.gridOptions || {};
                if(grid.delete){
                    this.deleteOp.isShow=true;
                    
                }
            },
            /**
             * 默认的删除执行方法
             */
            doDelete(){
                var vm=this;
                var deleteOp=this.deleteOp;
                //删除校验
                if(deleteOp.valid && !deleteOp.valid.call(this,this.selectItems)){
                    return;
                }
                if(deleteOp.fn){//执行自定义删除方法
                    deleteOp.fn.call(this,this.selectItems);
                }else if(deleteOp.url){//执行默认的删除方法
                    this.deleteOp.loading=true;
                    JFFetch.doRequest(deleteOp.method ||"DELETE",deleteOp.url,this.selectItems,function(result){
                        vm.deleteOp.loading=false;
                        vm.deleteOp.isShow=false;
                        vm.$Message.success(vm.$t('common.deleteSuccessful'));
                        vm.load();
                    },function(error){
                        vm.deleteOp.isShow=false;
                        vm.deleteOp.loading=false;
                        vm.$Message.error({
                            content:vm.$t('common.deleteError'),
                            duration:10
                        });
                    });
                }
            }
        },
        created(){
            var options=this.gridOptions || {};
            //设置表格配置
            this.table=Object.assign({},{
                columns:[],data:[],loading:false,showPager:true
            },options.table);

            //设置分页配置
            this.pager=Object.assign({},{
                total:0,pageSize:10,curPage:1
            },options.pager);

            //工具栏
            this.toolbars=options.toolbars || [];

            //删除配置
            this.deleteOp=Object.assign({},this.deleteOp,options.delete);

            //查询配置
            this.searchOp=Object.assign({},this.searchOp,options.search);

            //查询
            var queryFields=[];
            this.table.columns.forEach(element => {
                if(element.condition){
                    queryFields.push({title:element.title,key:element.key});
                }
            });
            this.table.queryFields=queryFields;
            if(queryFields.length>0){
                this.searchOp.queryKey=queryFields[0].key;
            }
            
            

            //自动查询
            if(this.searchOp.autoLoad){
                this.load();
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
