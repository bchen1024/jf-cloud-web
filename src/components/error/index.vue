<template>
    <div class="jf-error">
        <div class="jf-error-msg">
            <h4>{{code}},{{desc}}</h4>
        </div>
        <div class="jf-error-img">
            <img :src="src" :alt="code" width="100%" height="100%">
        </div>
    </div>
</template>
<script>
    export default {
        name:'JFError',
        props: {
            code: String,
            desc: String,
            src: String
        },
        methods:{  
            
        }
    }
</script>
<style scoped>
    .jf-error{
        width:100%;
        height:100%;
        padding:16px;
    }
    .jf-error-msg{
        width:100%;
        color:red;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
    }
    .jf-error-img{
        width:50%;
        height:70%;
        margin:10px auto;
    }
</style>