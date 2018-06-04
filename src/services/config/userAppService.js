import {config} from '../urls';
export default{
    findUserApp(params,vm){
        vm.$JFFetch.doPost(config.userApp.list,params,function(result){
            vm.$store.state.appList=result;
            if(result.length>0){
                vm.$store.state.currentApp=result[0];
            }
        });
    }
};