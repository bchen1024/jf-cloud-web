<template>
  <Form :ref="formRef" :model="data" :rules="formOp.rules || {}" 
        :label-width="formOp.labelWidth || 120" :inline="formOp.inline || false">
        <Form-item v-for='item in formOp.items'  :key='item.key' :label="item.title" :prop="item.key"
            :inline="item.inline || false">
            <!--Select下拉框组件-->
            <Select v-if='item.type=="select"' v-model="data[item.key]">
                <Option v-for='option in item.options' :key='option.value' :value='option.value'>
                    {{option.text}}
                </Option>
            </Select>
            <!--Radio组件-->
            <RadioGroup v-else-if='item.type=="radio"' v-model="data[item.key]">
                <Radio v-for='option in item.options' :key='option.value' :label='option.value'>
                    {{option.text}}
                </Radio>
            </RadioGroup>
            <!--Textarea组件-->
            <Input v-else-if='item.type=="textarea"' :inline="item.inline || false" v-model="data[item.key]" type='textarea' :rows="4"/>
            <template v-else-if='item.type=="label"'>
                {{data[item.key]}}
            </template>
            <!--Input组件-->
            <Input v-else v-model="data[item.key]"/>
        </Form-item>
        <JFToolbar :items="toolbars" :justify="formOp.justify || 'center'" selectItems="[]"/>
    </Form>
</template>

<script>
    import JFToolbar from '@/components/toolbar/index.vue';
    import bus from '@/libs/bus.js';
    export default {
        name:'JFForm',
        components: {JFToolbar},
        props:['formOp'],
        data (){
            var vm=this;
            return {
                data:{}
            }
        },
        computed:{
            formRef(){
               var vm=this,op=vm.formOp;
               if(vm.formOp && vm.formOp.ref){
                   return vm.formOp.ref+'Form';
               }
               return 'formRef';
           },
           /**
             * 工具栏配置
             */
            toolbars(){
                var vm=this,op=vm.formOp;
                let toolbars = [];
                if(op.defaultToolbars){
                    toolbars.push({title:vm.$t('common.save'),icon:'ios-checkmark',click:vm.saveForm});
                    toolbars.push({title:vm.$t('common.reset'),icon:'ios-refresh',type:"info",click:vm.initForm});
                    toolbars.push({title:vm.$t('common.cancel'),icon:'ios-close',type:"error",click:()=>{
                        op.cancelCallback && op.cancelCallback.call();
                    }});
                }
                if(op && op.toolbars && op.toolbars.length>0){
                    op.toolbars.forEach(item=>{
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
        },
        created () {
            var vm=this;
            bus.$on(vm.formOp.ref+'InitForm', data => {
                vm.initForm(data);
            });
            bus.$on(vm.formOp.ref+'ResetForm', () => {
                vm.resetForm();
            });
            vm.initForm({});
        },
        beforeDestroy () {
            var vm=this;
            bus.$off(vm.formOp.ref+'InitForm');
            bus.$off(vm.formOp.ref+'ResetForm')
        },
        methods:{
            getForm(){
                var vm=this;
                return vm.$refs[vm.formRef];
            },
            initForm(data){
                var vm=this,formOp=vm.formOp;
                var form=vm.getForm();
                if(form){
                    form.resetFields();
                }
                vm.data=Object.assign({},formOp.defaultValue,data || {});
                formOp.oldValues=Object.assign({},formOp.defaultValue,data || {});
            },
            resetForm(){
                var vm=this,formOp=vm.formOp;
                vm.data=Object.assign({},formOp.oldValues);
            },
            saveForm(){
                var vm=this,op=vm.formOp,saveOp=op.saveOp;
                var form=vm.getForm();
                if(form){
                    form.validate((valid) => {
                        if (valid) {
                            if(saveOp.request){//axios请求
                                vm._save(saveOp.request(vm.data));
                            }else if(saveOp.url){//自定义url请求
                                let requestObj= new request({
                                    url:saveOp.url,
                                    method:saveOp.method || 'post',
                                    data:vm.data
                                });
                                vm._save(requestObj);
                            }else if(saveOp.updateRequest && vm.data[op.primaryKey]){
                                vm._save(saveOp.updateRequest(vm.data));
                            }else if(saveOp.createRequest && !vm.data[op.primaryKey]){
                                vm._save(saveOp.createRequest(vm.data));
                            }
                        }
                    });
                }
            },
            _save(requestObj){
                let vm=this,op=vm.formOp;
                requestObj.then(result=>{
                    vm.$Message.success(vm.$t('common.saveSuccessful'));
                    op.saveFormCallback && op.saveFormCallback.call();
                }).catch(error => {
                    vm.$Message.error({
                        content:vm.$t('common.saveError'),
                        duration:5
                    });
                });
            }
        }
    }
</script>
<style scoped>

</style>