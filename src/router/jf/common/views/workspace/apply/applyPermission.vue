
<template>
    <div>
        <Steps :current="0">
            <Step title="申请" content="申请人填写数据发起申请"></Step>
            <Step title="直接主管审批" content="申请人直接主管审批"></Step>
            <Step title="责任人审批" content="申请的角色责任人审批"></Step>
            <Step title="管理员审批" content="系统管理员审批"></Step>
        </Steps>
    </div>
</template>
<script>
    export default {
        data(){
           return {
               
           };
        },
        methods: {
            
        }
    };
</script>