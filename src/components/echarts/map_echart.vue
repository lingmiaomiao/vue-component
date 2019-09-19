<template>
<div class="map_echart">
    <echarts classify="barAndMap" :dataArray="serieslist" :minMax='minMax' :height="600"></echarts>
</div>
</template>
<script>
import echarts from '@/public/echarts';  
export default {
    name:'map_echart',
    data(){
        return{
            data: [
                { name: "北京", value:['116.405285','39.904989',400]},
                { name: "天津", value:["117.190182","39.125596",700]},
                { name: "山东", value: ["117.000923","36.675807",300]},
                { name: "甘肃", value:["103.823557","36.058039",280] }
            ],
            serieslist:null,
            minMax:[0,10],   //地图颜色深浅
        }
    },
    components:{echarts},
    created(){
        this.minMax = [100,1000],
        this.serieslist = [
            {
                name: 'china',
                type: 'map',
                mapType: 'china',
                itemStyle:{
                    normal:{
                        label:{show:true},
                        borderWidth:1,
                        borderColor:'#ccc',
                    },
                    emphasis:{label:{show:true}}
                },
                data:this.data,
            }
        ]
    },
}
</script>
<style lang="less" scoped>
.map_echart{
    width:100%;
    height:100%;
}
</style>