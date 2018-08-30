<template>
    <div>
        <!--工具栏，存在工具栏按钮或者支持搜索渲染-->
        <Row v-if="(toolbars && toolbars.length>0) || table.queryFields.length>0 || table.setting" 
             class="jf-toolbar" type="flex" justify="start">
            <template v-for="bar in toolbars" >
                 <!--普通按钮-->
                <Button v-if="!bar.items || bar.items.length==0"  
                        :key="bar.refs" 
                        :type="bar.type || 'primary'" 
                        :icon="bar.icon" 
                        :disabled="bar.disabled || (bar.selection && (!selectItems || selectItems.length==0))"
                        class="jf-toolbar-item"
                        @click="btnClick(bar)">
                    {{bar.title}}
                </Button>
                <!--菜单按钮-->
                <Dropdown v-if="bar.items && bar.items.length>0" :key="bar.refs">
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
            </template>
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
            <span v-if="table.setting" style="margin-start:auto">
                <Icon type="ios-gear-outline" size="20" 
                 style="margin-top:12px;margin-right:3px;cursor: pointer;" :title="$t('common.setting')" @click.native="openSetting"></Icon>
            </span>
        </Row>
        <!--Table列表-->
        <Table border stripe size="small"
            :columns="columns" :data="data"  
            :loading="table.loading"
            :no-data-text="table.noDataText"
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

        <!--表格设置modal-->
        <Modal v-if="table.setting" v-model="table.settingShow" width="800" 
            :title="$t('common.setting')" scrollable
            :styles="{top: '48px'}">
            <Table border stripe size="small"
                :columns="settingTable.columns" :data="table.columns"  
                height=400>
            </Table>
            <div slot="footer">
                <Button type="primary" >{{$t('common.ok')}}</Button>
                <Button type="error" @click="table.settingShow=false">{{$t('common.cancel')}}</Button>
                <Button type="info" >{{$t('common.reset')}}</Button>
            </div>
        </Modal>

        <!--表单设置modal-->
        <Modal v-if="form.items && form.items.length>0" v-model="form.show" :width="form.width || 600" 
            :title="form.title"
            :styles="{top: '48px'}">
            <Form :ref="form.ref" :model="form.data || {}" :rules="form.rules || {}" 
                :label-width="form.labelWidth || 100" :inline="form.inline || false">
                <Form-item v-for='item in form.items' :key='item.key' :label="item.title" :prop="item.key"
                    :inline="item.inline || false">
                    <!--Select下拉框组件-->
                    <template v-if='item.type=="select"'>
                        <Select v-model="form.data[item.key]">
                            <Option v-for='option in item.options' :key='option.value' :value='option.value'>
                                {{option.text}}
                            </Option>
                        </Select>
                    </template>
                    <!--Radio组件-->
                    <template v-else-if='item.type=="radio"'>
                        <RadioGroup v-model="form.data[item.key]">
                            <Radio v-for='option in item.options' :key='option.value' :label='option.value'>
                                {{option.text}}
                            </Radio>
                        </RadioGroup>
                    </template>
                    <!--Textarea组件-->
                    <template v-else-if='item.type=="textarea"'>
                        <Input :inline="item.inline || false" v-model="form.data[item.key]" type='textarea' :rows="4"></Input>
                    </template>
                    <!--Input组件-->
                    <template v-else>
                        <Input v-model="form.data[item.key]"></Input>
                    </template>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="doSave" :loading="form.saveLoding">{{$t('common.save')}}</Button>
                <Button type="error" @click="form.show=false">{{$t('common.cancel')}}</Button>
                <Button type="info" @click="doReset" :loading="form.loading">{{$t('common.reset')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
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
                },
                form:{},
                settingTable:{
                    columns:[
                        {key:'key',title:vm.$t('common.field')},
                        {key:'title',title:vm.$t('common.title'),render:(h,params)=>{
                            if(params.row.type=='selection'){
                                return vm.$t('common.checkbox')
                            }
                            return params.row.title;
                        }},
                        {key:'hidden',title:vm.$t('common.show'),width:100,align:'center',render:(h,params)=>{
                            var type='checkmark',color='green';
                            if(params.row.hidden){
                                type='close';
                                color='red';
                            }
                            return h('Icon', {
                                props: {
                                    type: type,
                                    size:14,
                                    color:color
                                }
                            });
                        }},
                        {key:'fixed',title:vm.$t('common.fixed'),align:'center',width:100,render:(h,params)=>{
                            if(params.row.fixed){
                                return params.row.fixed;
                            }
                            return h('Icon', {
                                props: {
                                    type: 'close',
                                    size:14,
                                    color:'red'
                                }
                            });
                        }},
                        {key:'width',title:vm.$t('common.width'),width:100,render:(h,params)=>{
                            if(params.row.width){
                                return params.row.width;
                            }
                            return 'auto';
                        }}
                    ]
                }
            }
        },
        computed:{
            columns(){
                var columns=this.table.columns || [];
                if(this.table.defaultColumn){
                    columns.push(
                        {key:'createUserName',title:this.$t('common.createdBy'),width:150,ellipsis:true,hidden:true},
                        {key:'creationDate',title:this.$t('common.creationDate'),width:160,ellipsis:true,hidden:false},
                        {key:'lastUpdateUserName',title:this.$t('common.lastUpdatedBy'),width:150,ellipsis:true,hidden:true},
                        {key:'lastUpdationDate',title:this.$t('common.lastUpdationDate'),width:160,ellipsis:true,hidden:false}
                    );
                    if(columns.length>8){
                        columns.forEach(column=>{
                            if(!column.width){
                                column.width=250;
                            }
                        });
                    }
                }
                return columns;
            },
            data(){
               return this.table.data ||[];
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
                    search.method = search.method || 'POST';
                    vue.$JFFetch.doRequest(search.method,search.url,param,function(result){
                        vue.table.loading=false;
                        vue.table.data=result.result ||[];
                        vue.pager=result.pageVO;
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
                }else if(bar.add){
                    this.openFormModal();
                }
            },
            openFormModal(data){
                if(data){
                    this.form.type='edit';
                    this.form.data=Object.assign({},this.form.defaultValue,data);
                    this.form.show=true;
                }else{
                    this.form.type='add';
                    this.form.data=this.form.defaultValue||{};
                    this.form.show=true;
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
            },
            doReset(){
                if(this.form.type=='add'){
                    this.$refs[this.form.ref].resetFields();
                }
            },
            doSave(){
                var vm=this;
                this.$refs[this.form.ref].validate((valid) => {
                    if (valid) {
                        var formData=JSON.parse(JSON.stringify(vm.form.data));
                        var url=vm.form.createUrl;
                        var method='POST';
                        if(vm.form.type=='edit'){
                            url=vm.form.updateUrl;
                            method="PUT";
                        }
                        vm.form.saveLoading=true;
                        JFFetch.doRequest(method,url,formData,function(result){
                            vm.form.data={};
                            vm.form.saveLoading=false;
                            vm.form.show=false;
                            vm.$Message.success(vm.$t('common.saveSuccessful'));
                            vm.load();
                        },function(error){
                            vm.form.data={};
                            vm.form.show=false;
                            vm.form.saveLoading=false;
                            vm.$Message.error({
                                content:vm.$t('common.saveError'),
                                duration:10
                            });
                        });
                    }
                })
            },
            openSetting(){
                this.table.settingShow=true;
            }
        },
        created(){
            var options=this.gridOptions || {};
            //设置表格配置
            this.table=Object.assign({},{
                columns:[],data:[],loading:false,setting:true,settingShow:false,defaultColumn:false,
                showPager:true,noDataText:this.$t('common.noDataText')
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

            //表单配置
            this.form=Object.assign({},{
                show:false,items:[],title:this.$t('common.add'),data:{},rules:{},saveLoading:false,loading:false
            },options.form);
            if(this.form.items.length>6){
                this.form.inline=true;
            }
            if(this.form.items.length>9){
                this.form.width=900;
            }if(this.form.items.length>18){
                this.form.width=1200;
            }

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
