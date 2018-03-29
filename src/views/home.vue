<style scoped>
    
</style>
<template>
    <div>
        <Button type="primary" icon="ios-search" @click="handleStart">{{$t('common.search')}}</Button>
        <JFGrid :gridOptions='grid'/>
    </div>
</template>
<script>
    import util from  '../libs/util.js';
    export default {
        data(){
            return {
                grid:{
                    table:{
                        columns:[
                            {key:'appCode',title:'应用编码',width:100},
                            {key:'appName',title:'应用名称',width:100,ellipsis:true},
                            {key:'appDesc',title:'描述'}
                        ],
                        data:[
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'},
                            {appCode:'jf-cloud',appName:'JF微服务应用',appDesc:'JF微服务平台，提高微服务基本功能'}

                        ]
                    }
                }
            }
        },
        methods: {
            handleStart() {
                util.ajax.get('/jfcloud/jf-cloud-app/app/mgt/jf-cloud').then(function(response){
                    debugger;
                });
            }
        }
    };
</script>