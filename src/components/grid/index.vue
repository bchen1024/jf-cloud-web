<template>
    <div>
        <!--工具栏，存在工具栏按钮或者支持搜索渲染-->
        <JFToolbar :selectItems="selectItems" :items="toolbars" :searchOp="searchOp"/>
        <!--Table列表-->
        <Table stripe
            :columns="columns" :data="data"  
            :loading="tableOp.loading"
            :no-data-text="tableOp.noDataText"
            @on-selection-change="onSelectionChange">
        </Table>
        <!--分页-->
        <Page v-if='tableOp.showPager' @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
            :total="pagerOp.total" 
            :page-size="pagerOp.pageSize" 
            :current="pagerOp.curPage" 
            :page-size-opts="pagerOp.pageList"
            placement="top" show-elevator show-sizer show-total
            class="table-pager">
        </Page>
        <Modal v-if="formOp.items && formOp.items.length>0" v-model="formModel" :width="formOp.width || 600" 
            :title="formOp.title"
            :mask-closable="false">
            <JFForm :formOp="formOp" :ref="formOp.ref"/>
            <div slot="footer">
                <Button type="primary" @click="saveForm" icon='ios-checkmark'>{{$t('common.save')}}</Button>
                <Button type="info" @click="resetForm" icon='ios-refresh'>{{$t('common.reset')}}</Button>
                <Button type="error" icon='ios-close' @click="formModel=false">{{$t('common.cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {checkPermission,formatDate} from '@/libs/util.js';
    import {renderUser,renderStatus,renderDateTime} from '@/libs/format.js';
    import JFToolbar from '@/components/toolbar/index.vue';
    import gridOperate from './mixins/gridOperate.js';
    import gridSetting from './mixins/gridSetting.js';
    export default {
        name:'JFGrid',
        mixins:[gridOperate,gridSetting],
        components: {JFToolbar},
        props:['gridOptions'],
        computed:{
            /**
             * 工具栏配置
             */
            toolbars(){
                let vm=this,gridOp=vm.gridOptions;
                let toolbars = [];
                if(gridOp && gridOp.toolbars && gridOp.toolbars.length>0){
                    gridOp.toolbars.forEach(item=>{
                        //默认执行方法
                        if(item.defaultHander && vm[item.defaultHander]){
                            if(vm[item.defaultHander]){
                                item.click=vm[item.defaultHander]
                            }else{
                                console.warn('DefaultHander ['+item.defaultHander+'] does not exist.');
                            }
                        }
                        //未指定点击事件，指定默认的空实现
                        if(!item.click){
                            item.click=()=>{console.warn('Click events not configured')};
                        }
                        toolbars.push(item);
                    });
                }
                return toolbars;
            },
            /**
             * 表格配置
             */
            tableOp(){
                var vm=this,options=vm.gridOptions || {};
                var defaultOp={
                    columns:[],
                    loading:false,
                    allowSetting:true,
                    showAuditCreate:false,
                    showAuditUpdate:true,
                    showTip:false,
                    showIndex:true,
                    showSelection:true,
                    showPager:true,
                    userColumns:[],
                    noDataText:this.$t('common.noDataText'),
                    defaultUserColumns:['createBy','lastUpdateBy']
                };
                var tableOp=Object.assign({},defaultOp,options.table);
                return tableOp
            },
            /**
             * 列配置
             */
            columns(){
                var vm=this,tableOp=vm.tableOp || {},columns=[];
                //显示序号列
                if(tableOp.showIndex){
                    columns.push(
                        {type: 'index',width:tableOp.indexWidth || 60,align:tableOp.indexAlign || 'center',fixed:'left'}
                    );
                }
                //显示选择框
                if(tableOp.showSelection){
                    columns.push(
                        {type:'selection',width:tableOp.selectionWidth || 60,align:tableOp.selectionAlign || 'center',fixed:'left'}
                    );
                }
                //表格列配置
                if(tableOp.columns && tableOp.columns.length>0){
                    tableOp.columns.forEach(column=>{
                        //检查该列是否有权限显示
                       if(!column.permission || (column.permission && checkPermission(vm.$store,column.permission))){
                            column.ellipsis=true;
                            //配置所有列显示tip提示
                            if(tableOp.showTip){
                                column.tooltip=true;
                            }
                            if(!column.width){
                                column.tooltip=true;
                                column.minWidth=200;
                            }
                            if(column.format=='user'){
                                column.render=(h,params)=>{
                                    return renderUser(h,params.row[column.key],vm.userMap);
                                }
                            }
                            if(column.format=='status'){
                                column.render=(h,params)=>{
                                     return renderStatus(h,params.row[column.key]);
                                }
                            }
                            if(column.format=='mail'){
                                column.render=(h,params)=>{
                                     return h('a',{
                                         attrs:{href:'mailto:'+params.row[column.key]}
                                     },params.row[column.key]);
                                }
                            }
                            if(column.format=='date' || column.format=='datetime' || column.format=='datetimems'){
                                column.render=(h,params)=>{
                                     return renderDateTime(h,params.row[column.key],column.format)
                                }
                            }
                            
                            if(column.btns && column.btns.length>0){
                                let btns=column.btns.filter(btn=>!btn.permission || (btn.permission && checkPermission(vm.$store,btn.permission)));
                                column.render=(h,params)=>{
                                    var btnList=[];
                                    btns.forEach(btn=>{
                                        if(!btn.filter || (btn.filter && btn.filter(params))){
                                            btnList.push(h(btn.type, {
                                                props: btn.props,
                                                attrs:btn.attrs,
                                                on:{
                                                    click:()=>{
                                                        btn.click && btn.click.call(this,params);
                                                    }
                                                }
                                            }));
                                        }
                                    });
                                    return h('div',btnList);
                                }
                                if(btns.length>0){
                                    columns.push(column);
                                }
                            }else{
                                columns.push(column);
                            }  
                        }
                        
                    });
                }
                //显示审计列
                if(tableOp.showAuditCreate){
                    columns.push(
                        {key:'createByUserName',title:vm.$t('common.createdBy'),width:150,render:(h,params)=>{
                            return renderUser(h,params.row.createBy,vm.userMap);
                        }},
                        {key:'creationDate',title:vm.$t('common.creationDate'),width:155,align: 'center'}
                    );
                }
                if(tableOp.showAuditUpdate){
                    columns.push(
                        {key:'lastUpdateByUserName',title:vm.$t('common.lastUpdatedBy'),width:150,render:(h,params)=>{
                            return renderUser(h,params.row.lastUpdateBy,vm.userMap);
                        }},
                        {key:'lastUpdationDate',title:vm.$t('common.lastUpdationDate'),width:155,align: 'center'}
                    );
                }
                return columns;
            },
            /**
             * 查询配置
             */
            searchOp(){
                var vm=this,tableOp=vm.tableOp || {};
                var defaultOp={
                    autoLoad:true,
                    queryParams:{},
                    queryKey:"",
                    queryValue:"",
                    method:"post"
                };
                var options=vm.gridOptions || {};
                var searchOp=Object.assign({},defaultOp,options.search);

                //查询
                var fields=[];
                (tableOp.columns || []).forEach(field => {
                    if(field.condition){
                        fields.push({title:field.title,key:field.key});
                    }
                }); 
                if(fields.length>0){
                    searchOp.fields=fields;
                    searchOp.queryKey=fields[0].key;
                    searchOp.click=vm.load;
                }
                return searchOp;
            },
            /**
             * 删除配置
             */
            deleteOp(){
                let vm=this,tableOp=vm.tableOp || {},options=vm.gridOptions || {};
                let defaultOp={
                    title:vm.$t('common.deleteTitle'),
                    content:vm.$t('common.deleteConfirmMessage'),
                    okText: vm.$t('common.ok'),
                    cancelText: vm.$t('common.cancel'),
                    loading:true
                };
                let deleteOp=Object.assign({},defaultOp,options.delete);
                return deleteOp;
            },
            /**
             * 分页配置
             */
            pagerOp(){
                let vm=this,options=vm.gridOptions || {};
                let defaultOp={
                    total:0,
                    curPage:1,
                    pageSize:10,
                    pageList:[10,15,30,50,100,200]
                };
                let pagerOp=Object.assign({},defaultOp,options.pagerOp);
                return pagerOp;
            },
            formOp(){
                let vm=this,options=vm.gridOptions || {};
                let defaultOp={
                    title:this.$t('common.add'),
                    items:[],
                    data:{},
                    rules:{},
                    saveLoading:false,
                    defaultToolbars:false,
                    saveFormCallback:()=>{
                        vm.formModel=false;
                        vm.load();
                        options.form.saveCallback && options.form.saveCallback.call();
                    }
                };
                let formOp=Object.assign({},defaultOp,options.form);
                return formOp;
            }
        },
        methods:{
            
        },
        created(){      
            //自动查询
            if(this.searchOp.autoLoad){
                this.load();
            }
        }
    }
</script>
