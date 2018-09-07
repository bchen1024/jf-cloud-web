import {config} from '../urls';
export default{
    findUserApp(params,vm){
        vm.$JFFetch.doPost(config.userApp.list,params,function(result){
            vm.$store.state.currentStore.appList=result;
            if(result.length>0){
                vm.$store.state.currentStore.currentApp=result[0];
            }
        });
    }
};