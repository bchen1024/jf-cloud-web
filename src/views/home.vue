<style scoped>
    
</style>
<template>
    <div>
        home
    </div>
</template>
<script>
    import util from  '../libs/util.js';
    export default {
        data(){
            return {
                contentStyle:{padding:"24px",background:"#fff"}
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