<template>
    <Card class='login-card'>
        <p slot="title">
            {{$t('common.loginTitle')}}
        </p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <div class='login-error-panel'>
                {{loginMsg}}
            </div>
            <FormItem prop="userAccount">
                <Input type="text" v-model="formInline.userAccount" :placeholder="$t('common.loginAccount')">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" :placeholder="$t('common.loginPassword')">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <div class='login-forget-panel'>
                <a class='login-forget-pwd' href='javascript:void(0)'>{{$t('common.forgetPassword')}}</a>
            </div>
            <FormItem class='login-item'>
                <Button long :loading='loginLoading' type="primary" @click="handleSubmit('formInline')">{{$t('common.login')}}</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
    import {common} from '@/api';
    export default {
        data(){
            let vue=this;
            return {
                loginMsg:null,
                loginLoading:false,
                formInline: {
                    userAccount: 'chenbin',
                    password: 'chenbin1'
                },
                ruleInline: {
                    userAccount: [
                        { required: true, message: vue.$t('common.accountNotNull')}
                    ],
                    password: [
                        { required: true, message: vue.$t('common.passwordNotNull')}
                    ]
                }
            }
        },
        methods:{
            handleSubmit(name) {
                var vue=this;
                vue.loginMsg=null;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params={
                            userAccount:this.formInline.userAccount,
                            password:this.formInline.password
                        };
                        this.loginLoading=true;
                        common.login(params).then(result => {
                            vue.loginLoading=false;
                            if(result){
                                sessionStorage.setItem("token",result.token);
                                if(vue.$route.query.redirectName){
                                    vue.$router.replace({name:vue.$route.query.redirectName});
                                }else{
                                    vue.$router.replace({name:'home'});
                                }
                            }else{
                                vue.loginMsg=vue.$t(result.errorMsg);
                            }
                        }).catch(error => {
                            vue.loginLoading=false;
                            vue.loginMsg=error.errorMsg || error.message;
                        });
                    }
                })
            }
        }
    };
</script>
<style scoped>
    .login-card{
        width:500px;
        margin:150px auto;
    }
    .login-error-panel{
        white-space: normal;
        color:red;
        margin-bottom: 8px;
        word-break: break-all;
    }
    .login-forget-panel{
        height:26px;
        line-height: 6px;
    }
    .login-forget-pwd{
        float:right;
    }
    .login-item{
        margin-bottom: 6px;
    }
</style>