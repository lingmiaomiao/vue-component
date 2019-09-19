import echarts from 'echarts';
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
const colorList = ['#61A5E8', '#7ECF51', '#6767FE', '#FF7362', '#A689EC', '#12BCE4']; // 颜色列表自己配置
const labelColor = '#999'; // 坐标标记颜色

const allOptions = {
  barAndLineOptions(dataArray2, width, height, xAxisList,yAxisList,minMax) {
    return {
      color: colorList,
      legend: {
        data: ["目标金额", "实际完成", "上月环比增长率"],
        bottom: "0%",
        left: '10%'
      },
      yAxis: [{
        type: "value",
        name: "销售额",
        nameTextStyle: {
          color: labelColor
        },
        splitNumber:10,
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        axisLabel: {
          show: true,
          color: labelColor
        }
      }, {
        type: "value",
        name: "",
        position: "right",
        min: -100,
        max: 100,
        splitNumber:10,
        splitLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        axisLabel: {
          show: true,
          color: labelColor,
          formatter: "{value} %", //右侧Y轴文字显示
        }
      }],
      xAxis: {
        data:xAxisList,
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        nameTextStyle: {
          color: labelColor,
          align: 'right',
          verticalAlign: 'middle'
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: labelColor //X轴文字颜色
          }
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      series: dataArray2
    };
  },
  barSellOptions(dataArray, width, height, xAxisList,yAxisList,minMax) {
    console.log("开始了");
    
    console.log(dataArray, width, height, xAxisList);
    
    return {
      color: colorList,
      legend: {
        data: ["目标金额", "实际完成", ""],
        bottom: "0%",
        left: '10%'
      },
      yAxis: [{
        type: "value",
        name: "销售额",
        nameTextStyle: {
          color: labelColor
        },
        splitNumber:10,
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        axisLabel: {
          show: true,
          color: labelColor
        }
      }],
      xAxis: {
        data: xAxisList,
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        nameTextStyle: {
          color: labelColor,
          align: 'right',
          verticalAlign: 'middle'
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: labelColor //X轴文字颜色
          }
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      series: dataArray
    };
  },
  barAndPieOptions(dataArray, width, height, xAxisList,yAxisList,minMax) {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}:{c}%"
      },
      series: dataArray
    };
  },
  barAndMapOptions(dataArray, width, height, xAxisList,yAxisList,minMax) {
    return {
      tooltip: {
        trigger: "item",
        formatter:function (params) {
          let obj = JSON.parse(JSON.stringify(params));
          let data = obj.data;
          if(data==null || data.value==null){
            return `<p style='margin:4px;'>该区域暂无客户</p>`
          }else{
            return `<p><div style='width:8px;height:8px;border-radius:4px;background:${obj.color};float:left;margin:6px 4px 4px;'></div><div style='float:right;'>${data.name}：${data.value[2]}万</div></p>`
          }
       },
      },
      visualMap: {
          min: minMax[0],
          max: minMax[1],
          show:true,
          text:['High','Low'],
          realtime: false,
          calculable: true,
          inRange: {
              color: ['lightskyblue','yellow', 'orangered']
          },
      },
      series: dataArray
    };
  },
  barAndBarOptions(dataArray, width, height, xAxisList,yAxisList,minMax) {
    return {
      color: colorList,
      yAxis: [{
        type: "value",
        name: "销售额",
        nameTextStyle: {
          color: labelColor
        },
        splitNumber:10,
        splitLine: {
          show: true,
          lineStyle:{
            type:'dashed',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        axisLabel: {
          show: true,
          color: labelColor
        }
      }],
      xAxis: {
        data: xAxisList,
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        nameTextStyle: {
          color: labelColor,
          align: 'right',
          verticalAlign: 'middle'
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: labelColor //X轴文字颜色
          }
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      series: dataArray
    };
  },
  XbarAndBarOptions(dataArray, width, height, xAxisList,yAxisList,minMax) {
    return {
      color: colorList,
      yAxis: [{
        data:yAxisList,
        type: "category",
        name: "系列",
        nameTextStyle: {
          color: labelColor
        },
        splitNumber:10,
        splitLine: {
          show: false,
          lineStyle:{
            type:'dashed',
          }
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: false,
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        axisLabel: {
          show: true,
          color: labelColor
        },
      }],
      xAxis: {
        data: xAxisList,
        type:'value',
        name:'成交额',
        splitNumber:8,
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle:{
    　　　  color: '#999',
    　　　　width: 1,
    　　　　type: 'solid'
    　　　} 
        },
        nameTextStyle: {
          color: labelColor,
          align: 'right',
          verticalAlign: 'middle'
        },
        axisTick: {
          show: true, //隐藏X轴刻度
          alignWithLabel: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: labelColor //X轴文字颜色
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      series: dataArray
    };
  }

}

export default (el, classify, ...arg) => {
  const instance = echarts.init(el);
  instance.setOption(allOptions[`${classify}Options`](...arg));
  return instance;
}