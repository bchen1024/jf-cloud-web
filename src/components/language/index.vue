<template>
    <Dropdown @on-click="switchLanguage" class='jf-language'>
        <a href="javascript:void(0)">
            {{$t('common.'+$i18n.locale)}} 
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem name='zh-CN' :selected="$i18n.locale=='zh-CN'">{{$t('common.zh-CN')}}</DropdownItem>
            <DropdownItem name='en-US' :selected="$i18n.locale=='en-US'">{{$t('common.en-US')}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
    import {getCurrentLanguage} from '@/libs/util';
    export default {
        name:'JFLanguage',
        props:{
            
        },
        methods:{  
            switchLanguage(lang){
                const language =getCurrentLanguage();
                if(lang==language){
                    return;
                }
                localStorage.setItem('currentLanguage',lang);
                document.location.reload();
            }
        }
    }
</script>
<style scoped>
    .jf-language a{
        color:#ffffff;
    }
    .jf-language:hover{
        background-color:#2b85e4;
    }
</style>