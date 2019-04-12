<template>
    <JFError code="404" :src="src" :desc="desc"/>
</template>
<script>
    import error404 from '@/assets/images/error-404.svg'
    export default {
        data(){
            var vm=this;
            return {
                src:error404,
                desc:vm.$t('common.404Msg')
            }
        },
        methods: {
            
        }
    };
</script>