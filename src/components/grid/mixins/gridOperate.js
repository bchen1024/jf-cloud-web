import request from '@/libs/request';
import {user} from '@/api';
import bus from '@/libs/bus.js';
export default {
    data(){
        return {
            /**
             * 表格数据
             */
            data:[],
            /**
             * 用户map
             */
            userMap:{},
            /**
             * 选择行数据
             */
            selectItems:[],
            formModel:false
        };
    },
    methods:{
        /**
         * 获取查询参数
         */
        getQueryParams(){
            let vm=this;
            let searchOp=vm.searchOp || {};
            //全局搜索值
            if(searchOp.queryKey && searchOp.queryValue){
                if(!searchOp.queryParams){
                    searchOp.queryParams={};
                }
                searchOp.queryParams[searchOp.queryKey]=searchOp.queryValue;
            }else{
                delete searchOp.queryParams[searchOp.queryKey];
            }
            if(vm.tableOp && vm.tableOp.showPager && vm.pagerOp){
                searchOp.queryParams.curPage=vm.pagerOp.curPage || 1;
                searchOp.queryParams.pageSize=vm.pagerOp.pageSize || 10;
            }
            return searchOp.queryParams;
        },
        /**
         * 表格查询，内部调用
         * @param {*} requestObj 
         */
        _load(requestObj){
            let vm=this;
            vm.tableOp.loading=true;
            vm.data=[];
            requestObj.then(result=>{
                vm.tableOp.loading=false;
                if(result){
                    vm.data=result.result ||[];
                    Object.assign(vm.pagerOp,result.pageVO);
                    vm._loadUserMap();
                }else{
                    vm.pagerOp.total=0;
                }
            }).catch(error => {
                vm.tableOp.loading=false;
            });
        },
        /**
         * 表格数据加载
         */
        load(){
            let vm=this,searchOp=vm.searchOp || {},queryParams=vm.getQueryParams();;
            vm.selectItems=[];
            if(searchOp.request){//axios请求
                vm._load(searchOp.request(queryParams));
            }else if(searchOp.url){//自定义url请求
                let requestObj= new request({
                    url:searchOp.url,
                    method:searchOp.method || 'post',
                    data:queryParams
                });
                vm._load(requestObj);
            }else if(vm.tableOp.data){
                vm.data=vm.tableOp.data;
            }
        },
        /**
         * 表格数据删除，内部调用
         * @param {*} requestObj 
         */
        _delete(requestObj){
            let vm=this;
            requestObj.then(result=>{
                vm.$Modal.remove();
                vm.$Message.success(vm.$t('common.deleteSuccessful'));
                vm.load();
            }).catch(error => {
                vm.$Modal.remove();
                vm.$Message.error({
                    content:vm.$t('common.deleteError'),
                    duration:10
                });
            });
        },
        /**
         * 表格数据删除
         */
        gridDelete(){
            let vm=this,deleteOp=vm.deleteOp || {};
            if(!vm.selectItems || vm.selectItems.length==0){
                vm.$Message.warning(vm.$t('common.noSelected'));
                return;
            }
            //删除校验
            if(deleteOp.valid && !deleteOp.valid.call(vm,vm.selectItems)){
                return;
            }
            deleteOp.onOk=()=>{
                var deleteParams={list:vm.selectItems};
                if(deleteOp.request){//axios请求
                    vm._delete(deleteOp.request(deleteParams));
                }else if(deleteOp.url){//自定义url请求
                    let requestObj= new request({
                        url:deleteOp.url,
                        method:deleteOp.method || 'delete',
                        data:deleteParams
                    });
                    vm._delete(requestObj);
                }
            }
            vm.$Modal.confirm(deleteOp);
        },
        /**
         * 页数变化
         */
        onPageChange(curPage){
            this.pagerOp.curPage=curPage;
            this.load();
        },
        /**
         * 每页大小变化
         */
        onPageSizeChange(pageSize){
            this.pagerOp.pageSize=pageSize;
            this.load();
        },
        /**
         * 表格选中改变事件
         */
        onSelectionChange(selection){
            this.selectItems=selection;
        },
        /**
         * 加载用户数据
         */
        _loadUserMap(){
            let vm=this,userColumns=(vm.tableOp.defaultUserColumns || []).concat(vm.tableOp.userColumns || []);
            if(userColumns.length>0){
                var userIds=[];
                (vm.data || []).forEach(rowData=>{
                    userColumns.forEach(col=>{
                        if(rowData[col] && userIds.indexOf(rowData[col])<0){
                            userIds.push(rowData[col]);
                        }
                    });
                });
                if(userIds.length>0){
                    user.getUserMap(userIds).then(result=>{
                        vm.userMap=result || {};
                    });
                }
            }
        },
        openFormModal(data){
            var vm=this;
            vm.formModel=true;
            bus.$emit(vm.formOp.ref+'InitForm', data);
            if(data && data[vm.formOp.primaryKey]){
                vm.formOp.title=vm.$t('common.edit');
            }else{
                vm.formOp.title=vm.$t('common.add');
            }
        },
        saveForm(){
            var form=this.$refs[this.formOp.ref];
            form.saveForm();
        },
        resetForm(){
            var vm=this;
            bus.$emit(vm.formOp.ref+'ResetForm');
        }
    }
};