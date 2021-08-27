<template>
  <div>
    <h1>各种封装方法</h1>
    <ul>
      <li>深拷贝</li>
      <li>当前年月日时间</li>
      <li>年月日时间转换</li>
      <li>数字转为大写</li>
      <li>保留小数</li>
      <li>数组去重方法</li>
      <li>实现千分位</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "function_event",
  data() {
    return {};
  },
  methods: {
    //使用递归的方式实现数组、对象的深拷贝
    deepClone(data) {
      var type = this.getType(data);
      var obj;
      if (type === "array") {
        obj = [];
      } else if (type === "object") {
        obj = {};
      } else {
        //不再具有下一层次
        return data;
      }
      if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
          obj.push(this.deepClone(data[i]));
        }
      } else if (type === "object") {
        for (var key in data) {
          obj[key] = this.deepClone(data[key]);
        }
      }
      return obj;
    },
    getType(obj) {
      //tostring会返回对应不同的标签的构造函数
      var toString = Object.prototype.toString;
      var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
      };
      if (obj instanceof Element) {
        return "element";
      }
      return map[toString.call(obj)];
    },
    //当前年月日时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      var minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      var second =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return currentdate;
    },
    //年月日时间转换
    formatDate(date, type) {
      if (date instanceof Date) {
        if (date !== null && date !== "") {
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          var hour =
            date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
          var minute =
            date.getMinutes() >= 10
              ? date.getMinutes()
              : "0" + date.getMinutes();
          var second =
            date.getSeconds() >= 10
              ? date.getSeconds()
              : "0" + date.getSeconds();
          if (type == "day") {
            return y + "-" + m + "-" + d;
          } else if (type == "month") {
            return y + "-" + m;
          } else if (type == "minute") {
            return y + "-" + m + "-" + d + " " + hour + ":" + minute;
          } else {
            return (
              y + "-" + m + "-" + d + " " + hour + ":" + minute + ":" + second
            );
          }
        } else {
          return "";
        }
      } else {
        return date;
      }
    },
    //数字转为大写
    digitUppercase(n) {
      var fraction = ["角", "分"];
      var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      var unit = [
        ["元", "万", "亿"],
        ["", "拾", "佰", "仟"],
      ];
      var head = n < 0 ? "欠" : "";
      n = Math.abs(n);
      var s = "";
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
      }
      s = s || "整";
      n = Math.floor(n);
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = "";
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, "元")
          .replace(/(零.)+/g, "零")
          .replace(/^整$/, "零元整")
      );
    },
    //保留小数
    _toFixed(text, num, amount) {
      //text:数值，num:保留位数，amout:除数
      var str = null;
      !num ? (num = 2) : num;
      if (text !== undefined || text !== "" || text !== null) {
        str = ((text * amount).toFixed(0) / amount).toFixed(num);
        return isNaN(str) ? 0 : JSON.parse(str);
      }
    },
    //数组去重方法
    clearRepeat(arr) {
      //arr:要去重的数组
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    //实现千分位
    numberFormat(number, decimals, decPoint, thousandsSep, roundtag) {
      /*
       * 参数说明：
       * number：要格式化的数字
       * decimals：保留几位小数
       * dec_point：小数点符号
       * thousands_sep：千分位符号
       * roundtag:舍入参数，默认 'ceil' 向上取,'floor'向下取,'round' 四舍五入
       * */
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      roundtag = roundtag || "ceil"; // 'ceil','floor','round'
      var n = !isFinite(+number) ? 0 : +number;
      var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
      var sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
      var dec = typeof decPoint === "undefined" ? "." : decPoint;
      var s = "";
      var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);

        return (
          "" +
          parseFloat(
            Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
              prec * 2
            )
          ) /
            k
        );
      };
      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      return s.join(dec);
    },
    //不知道小数点时判断是否相等
    // num   变量
    // num2  小数点后几位
    point1(num,num2) {
      num = num + '';
      num2 = num2 + '';
      let arr = num.split('');
      let index = arr.indexOf('.');
      let fixed1=arr.length - 1 - index;
      let arr2 = num2.split('')
      let index2 = arr2.indexOf('.')
      let fixed2=arr2.length - 1 - index2;
      const number=fixed1+fixed2
      return ((Number(num)*Number('1e'+fixed1))*(Number(num2)*('1e'+fixed2)))/(Number('1e'+number))
   }
    
  },
};
</script>