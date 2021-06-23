//将时间戳变为2018/02/10 00:00格式
let dateAndTime = (time, connector) => {
    var dateTime = formatTime(time, !connector ? "-" : connector, true);
    return dateTime;
}

//将时间戳变为2018/02/10格式
let changeTime = (time, connector) => {
    var dateTime = formatTime(time, !connector ? "-" : connector);
    return dateTime;
}

//将时间戳变为09-09 18:30格式
let timeNoYear = (time, connector) => {
    var str = !connector ? "-" : connector;
    var dateTime = formatTime(time, str, true);
    var returnStr = dateTime.split(str)
    return returnStr[0]+ str +returnStr[1] + str + returnStr[2];
}

let strStartAndEnd = (str,strart,end) =>{
    if(!str){return;}
    if(!end){
        end = str.length;
    }
    str = str.substring(strart,end);
    return str.replace(' - ','-');
}

//截取字符串
let substr = (str, num) => {
    if (!str) {
        return;
    }
    var text = '';
    if (str.length > 0) {
        if (str.length <= num) {
            text = str;
        } else {
            text = str.substring(0, num) + '...';
        }
        return text;
    } else {
        return str;
    }
}

//截取拼接的字符串
let subSplit = (str, type) => {
    if (!str) {
        return false;
    }
    var arr = str.split(type);
    return arr;
}

//时间戳转时间
let getDate = (dateTimeStamp) => {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date();
    var diffValue = now - (dateTimeStamp);
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result = "";

    if (monthC >= 1) {
        if (monthC <= 12)
            result = "" + parseInt(monthC) + "月前";
        else {
            result = formatTime(dateTimeStamp, "-");

        }
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";

    }
    return result;
}

//保留小数
let _toFixed = (text, num, amount) => {
    var str = null;
    !num ? num = 2 : num;
    if (text !==undefined || text !=='' || text !==null) {

        // str=text.toFixed(num);
        str = ((text * amount).toFixed(0) / amount).toFixed(num);
        return isNaN(str) ? 0 : str;
    }
}
let timeStyle = (dateTime, style, type, layout) => {
    //时间格式
    if (layout === 'str') {
        var arr = [],
            arr2;
        arr = dateTime.split(' ');
        if (type === "onlyMd") {
            arr2 = arr[0].split('-');
            return arr2[1] + '-' + arr2[2]
        } else if (type === "onlyHm") {

            arr2 = arr[1].split(':');
            return arr2[1] + ':' + arr2[2]
        }
    } else { //时间戳格式
        var date = new Date(); //返回当前时间对象
        date = new Date(dateTime);
        var year = date.getFullYear() //这个
        var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        var hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
        var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
        var second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
        if (type === "noYear") {
            return month + style + day + ' ' + hour + ":" + minute;
        } else if (type === "onlyMd") {
            return month + style + day;
        } else if (type === "onlyHm") {
            return hour + ":" + minute;
        } else {
            return year + style + month + style + day + ' ' + hour + ":" + minute + ':' + second;
        }
    }


}

function formatTime(dateTime, style, hasTime) {
    var date = new Date(); //返回当前时间对象
    date = new Date(dateTime);
    var year = date.getFullYear() //这个
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    var hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
    var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    var second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
    if (hasTime) {
        return year + style + month + style + day + ' ' + hour + ":" + minute;
    }
    return year + style + month + style + day;
}
//获取当前时间
function getNowTime() {
    var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
//阿拉伯数字转中文数字
function NoToChinese(num) {
    if (!/^\d*(\.\d*)?$/.test(num)) {
        alert("Number is wrong!");
        return "Number is wrong!";
    }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) //加上小数部分(如果有小数部分) 
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
};

export { dateAndTime, changeTime, substr, getDate, _toFixed, subSplit, timeNoYear, timeStyle, strStartAndEnd, getNowTime,NoToChinese}