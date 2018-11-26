<template>
<div class="mapS">
    <div class="top">
        <v-icon class="blue">home</v-icon>
    </div>
     <!-- 地图 -->
    <div id="main" class="main"></div>
</div>
</template>
<script>
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/anhui.js' // 引入anhui地图数据
import '../../../node_modules/echarts/map/js/province/aomen.js' // 引入aomen地图数据
import '../../../node_modules/echarts/map/js/province/beijing.js' // 引入beijing地图数据
import '../../../node_modules/echarts/map/js/province/chongqing.js' // 引入chongqing地图数据
import '../../../node_modules/echarts/map/js/province/fujian.js' // 引入fujian地图数据
import '../../../node_modules/echarts/map/js/province/gansu.js' // 引入gansu地图数据
import '../../../node_modules/echarts/map/js/province/guangdong.js' // 引入guangdong地图数据
import '../../../node_modules/echarts/map/js/province/guangxi.js' // 引入guangxi地图数据
import '../../../node_modules/echarts/map/js/province/guizhou.js' // 引入guizhou地图数据
import '../../../node_modules/echarts/map/js/province/hainan.js' // 引入hainan地图数据
import '../../../node_modules/echarts/map/js/province/hebei.js' // 引入hebei地图数据
import '../../../node_modules/echarts/map/js/province/heilongjiang.js' // 引入heilongjiang地图数据
import '../../../node_modules/echarts/map/js/province/henan.js' // 引入henan地图数据
import '../../../node_modules/echarts/map/js/province/hubei.js' // 引入hubei地图数据
import '../../../node_modules/echarts/map/js/province/hunan.js' // 引入hunan地图数据
import '../../../node_modules/echarts/map/js/province/jiangsu.js' // 引入jiangsu地图数据
import '../../../node_modules/echarts/map/js/province/jiangxi.js' // 引入jiangxi地图数据
import '../../../node_modules/echarts/map/js/province/jilin.js' // 引入jilin地图数据
import '../../../node_modules/echarts/map/js/province/liaoning.js' // 引入liaoning地图数据
import '../../../node_modules/echarts/map/js/province/neimenggu.js' // 引入neimenggu地图数据
import '../../../node_modules/echarts/map/js/province/ningxia.js' // 引入ningxia地图数据
import '../../../node_modules/echarts/map/js/province/qinghai.js' // 引入qinghai地图数据
import '../../../node_modules/echarts/map/js/province/shandong.js' // 引入shandong地图数据
import '../../../node_modules/echarts/map/js/province/shanghai.js' // 引入shanghai地图数据
import '../../../node_modules/echarts/map/js/province/shanxi.js' // 引入shanxi地图数据
import '../../../node_modules/echarts/map/js/province/shanxi1.js' // 引入shanxi1地图数据
import '../../../node_modules/echarts/map/js/province/sichuan.js' // 引入sichuan地图数据
import '../../../node_modules/echarts/map/js/province/taiwan.js' // 引入taiwan地图数据
import '../../../node_modules/echarts/map/js/province/tianjin.js' // 引入tianjin地图数据
import '../../../node_modules/echarts/map/js/province/xianggang.js' // 引入xianggang地图数据
import '../../../node_modules/echarts/map/js/province/xinjiang.js' // 引入xinjiang地图数据
import '../../../node_modules/echarts/map/js/province/xizang.js' // 引入xizang地图数据
import '../../../node_modules/echarts/map/js/province/yunnan.js' // 引入yunnan地图数据
import '../../../node_modules/echarts/map/js/province/zhejiang.js' // 引入zhejiang地图数据
import mapData from '../echarts/mapData.js'
export default {
    name:'mapS',
    data(){
        return{
            cityName:'china',
        }
    },
    mounted(){
        this.getEcharts();
    },
    methods:{
          // 地图绘制
        getEcharts(){
            // 基于准备好的dom,初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('main'));
                let _this = this;
                let option ={ 
                     title: {
                        text: _this.cityName,
                        right:'50%',
                        top:'6%',
                        textStyle: {
                            color: '#666'
                        }
                    },
                    geo: {
                        show: true,
                        map: _this.cityName,
                        // map: '新疆',
                        label: {
                            normal: {
                                show: true,
                                textStyle:{color:"#4a4a4a", fontSize:12, borderWidth: 1}
                                
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#E7E7EB',
                                borderColor: '#fff',
                                borderWidth: 1,
                               

                            },
                            emphasis: {
                                areaColor: '#EDEEEF',
                                 borderWidth: 1,
                            }
                        },
                        zoom: 1.2,
                        layoutCenter:['100%','100%'],
                    },
                    series:[
                        {
                            name: _this.cityName,
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin',
                            symbolSize: function(val) {
                                if(val[2] >0 && val[2] !==null){
                                      return 36;
                                }else{
                                    return 0;
                                }
                            },
                            label: {
                                normal: {
                                    borderWidth: this.borderWidth,
                                    formatter:'{@[2]}',
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                      
                                    },
                                }
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter:'{b}'
                                    },
                                    color: '#346EEA', // 标志颜色
                                    borderWidth: 1,
                                    borderColor:'#fff',
                                }
                            },
                            data: []
                        },  
                       
                    ]
            };
            if(_this.cityName == "海南"){
                option.geo.center = [109.844902, 19.0392];
                option.geo.layoutCenter = ['50%', '50%'];
                option.geo.layoutSize = "600%";
            }
            myChart.setOption(option,true); 
            window.onresize = myChart.resize;    //地图自适应浏览器窗口大小
            //点击事件
            myChart.off('click');
            myChart.on('click',function(param){
                option.geo.map = param.name;
                myChart.setOption(option,true) 
                _this.cityName = param.name;
                       
                       
               
            }) 
            // myChart.on('mouseover',function(param){
            //         let tool = document.getElementById('tooltip');
            //         let e = param.event;
            //         tool.style.top = e.offsetY +'px';
            //         tool.style.left = e.offsetX +'px'; 
               
            // })
           

        },
    }
}
</script>
<style lang="less" scoped>
.mapS{
    width:100%;
    height:100%;
    position:relative;
    .top{
        position:absolute;
        top:10%;
        left:6%;
    }
    .main{
        width:100%;
        height: 100%;
    }
}
</style>
