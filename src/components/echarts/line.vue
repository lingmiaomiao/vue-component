<template>
<div class="lines">
    <!-- 折线图 -->
    <div id="main" class="main"></div>
</div>
</template>
<script>
export default {
    name:'lines',
    data(){
        return{

        }
    },
    mounted(){
       this.getLine();
    },
    methods:{
        getLine(){
            let myChart = this.$echarts.init(document.getElementById('main'));
            let option = {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis',
                    show:true,
                    textStyle:{
                        color:'#fff'
                    },
                    formatter: function (params) {
                            // tooltip数据有多项，进行分页展示
							var obj = JSON.parse(JSON.stringify(params));
							var itemName = obj[0].name;
							var dataIndex = obj.dataIndex;
							var str = "<ur style='text-align:left'><li style='list-style:none;color:#fff;'>" + itemName + "</li>";
							let ceil = '';
							for (var i = 0; i < params.length;i++) {
								ceil = Math.ceil(i/20); //数组向上取整
								str = str + "<li style='float:left;list-style:none;min-width:160px;color:#fff'>" +
								`<div style="width:10px;height:10px;border-radius:5px;float:left;margin-top:6px;margin-right:4px;background:${params[i].color}"></div>`
								+"<div style='width:80px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;float:left;color:#fff'>"+ params[i].seriesName 
								+":</div><div style='float:left;color:#fff'>" + params[i].value + "</div></li>";
							}
							str = str + "</ul>";
							return `<div style="height:100%;width:${160*ceil}px;color:#fff">${str}</div>`;
						},
						position: function(point, params, dom) {
							return [point[0], '40%'];
						}
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            myChart.setOption(option,true); 
            window.onresize = myChart.resize;    //地图自适应浏览器窗口大小

        }
    }
}
</script>
<style lang="less" scoped>
.lines{
    width:100%;
    height:100%;
    .main{
        width:100%;
        height:100%;
    }
}
</style>
