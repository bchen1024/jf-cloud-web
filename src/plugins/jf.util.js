export default{
    formatUser(h,value,userMap){
        var user=userMap[value];
        if(!user){
            return '';
        }
        var val=user.userName+'('+user.userAccount+')';
        return h('Tooltip',{
            props:{content:val}
        },val);
    }
};
