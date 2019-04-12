import {formatDate} from './util.js';
export const renderUser=(h,value,userMap)=>{
    var user=userMap[value];
    if(!user){
        return '';
    }
    var val=user.userName+'('+user.userAccount+')';
    return h('Tooltip',{
        props:{content:val}
    },val);
}

export const renderStatus=(h,value)=>{
    var icon,color;
    if(value=='Y'){
        icon="md-checkmark";
        color="green";
    }else if(value=='N'){
        icon="md-close";
        color="red";
    }else if(value=='T'){
        icon='information';
        color='#ff9900';
    }
    return h('div', [
        h('Icon', {
            props: {type:icon,size: 18,color:color}
        })
    ]);
}

export const renderDateTime=(h,value, format)=>{
    var date=formatDate(value,format);
    return h('div',{},date);
}