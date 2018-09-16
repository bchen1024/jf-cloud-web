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
    },
    renderDateTime(h,value, format){
        return h('label',this.toDateStr(value,format));
    },
    renderCost(h,value){
        return h('label',this.toCostStr(value));
    },
    renderStatus(h,value){
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
    },
    toCostStr(value){
        if(value<1000){//1s以内
            return value+" ms";
        }else if(value>=1000 && value < 1000*60){//一分钟以内
            return Math.floor(value/1000)+"s "+(value%1000)+"ms";
        }
        return null;
    },
    toDateStr(value, format){
        if (!value) {
            return null;
        }
        if(!format){
            format="datetime";
        }
        if(typeof value =='number'){
            value=new Date(value);
        }
        var year = value.getFullYear();// 当前年份，yyyy
    
        var month = value.getMonth() + 1;// 当前月份 0-11
        if (month < 10) {
            month = "0" + month;
        }
    
        var date = value.getDate();// 当前日期 1-31
        if (date < 10) {
            date = "0" + date;
        }
        // 小时
        var hours = value.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        // 分钟
        var min = value.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        // 秒
        var s = value.getSeconds();
        if (s < 10) {
            s = "0" + s;
        }

        var ms=value.getMilliseconds();
    
        var result = year + "-" + month + "-" + date;
        if (format == "date") {
            return result;
        } else if (format == "datetime") {
            return result + " " + hours + ":" + min + ":" + s;
        }else if(format=='datetimems'){
            return result + " " + hours + ":" + min + ":" + s+"."+ms;
        } else {
            try {
                return format.replace("yyyy", year).replace("MM", month)
                        .replace("dd", date).replace("hh", hours).replace("mm",
                                min).replace("ss", s).replace("SSS", ms);
            } catch (e) {
                throw new Error(e);
            }
        }
    }
};
