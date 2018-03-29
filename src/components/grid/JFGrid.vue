<template>
    <div>
        <Row v-if="(toolbars && toolbars.length>0) || table.queryPlaceholder.length>0" class="jf-toolbar" type="flex" justify="start">
            <Button v-if="!bar.items || bar.items.length==0"  
                    v-for="bar in toolbars" 
                    :key="bar.refs" 
                    :type="bar.type || 'primary'" 
                    :icon="bar.icon" 
                    :disabled="bar.disabled || (bar.selection && (!selectItems || selectItems.length==0))"
                    class="jf-toolbar-item">
                {{bar.title}}
            </Button>
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
            <Input v-if="table.queryPlaceholder.length>0" 
                   icon="ios-search"  
                   :placeholder="table.queryPlaceholder.join(',')"
                   class="jf-toolbar-item jf-input-search"></Input>
        </Row>
        <!--Table列表-->
        <Table border stripe size="small"
            :columns="table.columns" :data="table.data"  
            :loading="table.loading"
            @on-selection-change="selectionChange">
        </Table>
        <!--分页-->
        <Page v-if='pager.showPager' @on-change="onChange"
            @on-page-size-change="onPageSizeChange"
            :total="pager.total" 
            :page-size="pager.pageSize" 
            :current="pager.curPage" 
            size="small"
            placement="top" show-elevator show-sizer show-total
            class="table-pager">
        </Page>
    </div>
</template>
<script>
    import {JFFetch} from '../../libs/jf.js';
    export default {
        name:'JFGrid',
        props:['gridOptions'],
        data (){
            return {
                table:{},
                pager:{},
                selectItems:[]
            }
        },
        methods:{
            load(params,reload){
                let vue=this;
                let grid=this.gridOptions || {};
                let search=grid.search || {};
                if(search && search.url){
                    let param={};
                    if(reload){
                        param=params;
                    }else{
                        search.queryParams=search.queryParams || {}
                        param=Object.assign({},JSON.parse(JSON.stringify(search.queryParams)),params);
                    }
                    if(this.pager.showPager){
                        Object.assign(param,{
                            curPage:this.pager.curPage,
                            pageSize:this.pager.pageSize
                        });
                    }
                    this.table.loading=true;
                    this.table.data=[];
                    debugger;
                    JFFetch.doRequest(search.method,search.url,param,function(result){
                        vue.table.loading=false;
                        vue.table.data=result.result ||[];
                        vue.pager=result.page;
                    },function(error){
                        vue.table.loading=false;
                    });
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
            }
        },
        created(){
            var options=this.gridOptions;
            //设置表格配置
            this.table=Object.assign({},{
                columns:[],data:[],loading:false
            },options.table);

            //设置分页配置
            this.pager=Object.assign({},{
                total:0,pageSize:10,curPage:1,showPager:true
            },options.pager);

            //工具栏
            this.toolbars=options.toolbars || [];

            var queryPlaceholder=[];
            this.table.columns.forEach(element => {
                if(element.condition){
                    queryPlaceholder.push(element.title);
                }
            });
            this.table.queryPlaceholder=queryPlaceholder;
            this.load();
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
        width:300px;
    }
</style>
