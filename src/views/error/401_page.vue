<template>
    <JFError code="401" :src="src"/>
</template>
<script>
    import error401 from '@/assets/images/error-401.svg'
    export default {
        data(){
            return {
                src:error401
            }
        },
        methods: {
            
        }
    };
</script>