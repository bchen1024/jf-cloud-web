
<template>
    <div>
         <Card>
            <Row class="jf-row">
                <Col span="8">
                    <Input :placeholder="$t('common.globalSearch')"/>
                </Col>
                <Col span="16">
                    <Button type="primary" icon="ios-search">{{$t('common.search')}}</Button>
                </Col>
            </Row>
        </Card>
        <Row class="jf-row">
        </Row>
        <!--Table列表-->
        <Table style="min-height:200px;" stripe size="small" 
            :columns="grid.columns" :data="grid.result">
        </Table>
        <!--分页-->
        <Page  :total="grid.page.total" 
            :page-size="grid.page.pageSize" :current="grid.page.curPage" 
            size="small"
            placement="top" show-elevator show-sizer show-total>
        </Page>
    </div>
</template>
<script>
    export default {
        data(){
            var vue=this;
            return {
                showAdvancedSearch:false,
                grid:{
                   columns:[
                       {type: 'selection',width: 60,align: 'center',fixed: 'left'},
                        {title: vue.$t('property.key'),key: 'propertyKey',width:200},
                        {title: vue.$t('property.value'),key: 'propertyValue',width:300,ellipsis:true},
                        {title: vue.$t('property.type'),key: 'propertyType',width:150},
                        {title: vue.$t('common.status'),key: 'enableFlag',align: 'center',width:80},
                        {title: vue.$t('common.publish'),key: 'propertyPublish',align: 'center',width:80},
                        {title: vue.$t('common.cache'),key: 'cache',align: 'center',width:100},
                        {title: vue.$t('common.desc'),key: 'propertyDesc',width:400,ellipsis:true},
                        {title: vue.$t('common.attr1'),key: 'propertyAttr1',width:150},
                        {title: vue.$t('common.attr2'),key: 'propertyAttr2',width:150},
                        {title: vue.$t('common.attr3'),key: 'propertyAttr3',width:150},
                        {title: vue.$t('common.lastUpdatedBy'),key: 'updateUserAccount',width:150},
                        {title: vue.$t('common.lastUpdationDate'),key: 'lastUpdationDate',width:160},
                        {title: vue.$t('common.operate'),key: 'action', width: 140, align: 'center',fixed: 'right',render: (h, params) => {
                                return h('div', [
                                    h('Button', {
                                        props: {type: 'primary',size: 'small'},
                                        style: {marginRight: '5px'},
                                        on: {click: () => {
                                            this.showModal('edit',params.row.propertyId);
                                        }}
                                    }, this.$t('common.edit')),
                                    h('Button', {
                                        props: {type: 'error',size: 'small'
                                        },
                                        on: {click: () => {
                                            vue.grid.deleteModal=true;
                                            this.deleteKey=params.row.propertyId;
                                        }}
                                    }, this.$t('common.delete'))
                                ]);
                            }
                        }
                   ],
                    result:[{propertyKey:'a'}],
                    page:{
                       total:0,
                       pageSize:10,
                       curPage:1
                    }
                }
            };
        },
        methods: {
            toggleAdvancedSearch(){
                this.showAdvancedSearch=!this.showAdvancedSearch;
            }
        }
    };
</script>
