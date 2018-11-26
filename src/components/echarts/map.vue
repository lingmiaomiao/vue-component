<template>
<div class="mapS">
     <!-- 地图 -->
    <div id="main" class="main"></div>
    <!-- 返回中国地图 -->
    <div class="top" @click="reply" v-show="iconShow">
        <v-icon style="color:#666;font-size:30px">home</v-icon>
        <span>返回中国地图</span>
    </div>
     <!-- 站点详情 -->
    <div class="tooltip" v-show="tooltipS" id="tooltip">
        <div class="tiphead" >{{this.cityName}}-VOCs运营概况</div>
         <div style="max-height:160px;overflow-y:auto">
            <div  class="tabs-head">
                <div class="items" v-for="(val,index) in header" :key="index">
                    {{val.name}}
                </div>
            </div>
        
            <div  class="uls"  v-for="(val,index) in siteVS" :key="index">
                <div class="items">{{val.siteName}}</div>
                <div class="items"  v-if="val.healthStatus==1">正常</div>
                <div class="items" style="color:red"  v-else>故障</div>
                <div class="items" @click="look()">查看</div>
            </div>
        </div>
    </div>
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
            iconShow:false,
            cityName:'china',
            tooltipS:false ,    //tooltip显示状态
            header:[
                {name:"站点",sortable: false,align: 'left',},
                {name:"运行状态",sortable: false,align: 'left',},
                {name:"操作",sortable: false,align: 'left',},
            ], 
            siteVS:[{siteName:'美食',healthStatus:2}],       //tooltip展示数据
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
                                areaColor: '#B3E5FC',
                                borderColor: '#fff',
                                borderWidth: 1,
                               

                            },
                            emphasis: {
                                areaColor: '#FFEE58',
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
                                if(val[2] >0 && val !==null){
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
                                        formatter:'{c}'
                                    },
                                    color: '#E91E63', // 标志颜色
                                    borderWidth: 1,
                                    borderColor:'#fff',
                                }
                            },
                            data: mapData
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
                _this.iconShow =true;
            }) 

            myChart.on('mouseover',function(param){
                    _this.tooltipS = true;
                    let tool = document.getElementById('tooltip');
                    let e = param.event;
                    tool.style.top = e.offsetY +'px';
                    tool.style.left = e.offsetX +'px'; 
                    console.log("sdfs")
               
            })
        },
        reply(){
            this.cityName = 'china';
            this.getEcharts();
            this.iconShow = false;
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
        top:6%;
        left:6%;
        cursor:pointer;
    }
    .main{
        width:100%;
        height: 100%;
        
    }
    .tooltip{
        position: absolute;
        top:20%;
        left:20%;
        min-width:200px;
        max-height:200px;
        border-radius: 5px;
        background:rgba(0,0,0,.5);
        .tiphead{
           height: 30px;
           line-height: 30px;
           padding:4px 0 0 10px;
           color:#fff;
           
        };
        .tabs-head{
            width:100%;
            display: flex;
            flex-direction:row;
            border-top: 1px solid #fff;
            border-bottom: 1px solid #fff;
            .items{
                color:#fff;
                height: 30px;
                line-height: 30px;
                width: 34%;
                text-align: left;
                border-right:1px solid #fff;
                padding-left:8px;
            }
            
        }
        .uls{
            display:flex;
            flex-direction:row;
            width:100%;
            border-bottom: 1px solid #fff;
            .items{
                height:30px;
                line-height: 32px;
                width:80px;
                color:#fff;
                text-align: left;
                padding-left:10px;
                border-right:1px solid #fff;
                display: block;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            };
          
        }
    }
     
}
</style>
