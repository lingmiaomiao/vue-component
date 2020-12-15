<template>
    <div class="tableCheck">
        <div class="tables-wrap">
            <div class="rowSty-wrap">
                <div class="rowSty"></div>
                <div class="rowSty" v-for="(m,j) in asList" :key="j">
                    <div class="ss">{{j}}<el-checkbox v-model="m.isCheck" @change='columnCheck(j,m.isCheck)'/></div>
                </div>
            </div>
            <div class="tables" v-for="(val,index) in list" :key="index">
                <div class="ss">{{index}}<el-checkbox v-model="val.isCheck" @change='rowCheck(index,val)'/></div>
                <ul v-for="(it,i) in val" :key="i+Math.random()">
                    <li :class="{'blues':!!it.isCheck}" @click="clickEvent(i,index,it)">{{it.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'tableCheck',
    data(){
        return{
            asList:[{isCheck:false,},{isCheck:false,},{isCheck:false,},{isCheck:false,},{isCheck:false,}],
            list:[  //code字符串 xy拼接写反了，现在是yx
                [{code:"00",name:'货架'},{code:"01",name:'货架'},{code:"02",name:'货架'},{code:"03",name:'货架'},{code:"04",name:'货架'},],
                [{code:"10",name:'货架'},{code:"11",name:'货架'},{code:"12",name:'货架'},{code:"13",name:'货架'},{code:"14",name:'货架'},],
                [{code:"20",name:'货架'},{code:"21",name:'货架'},{code:"22",name:'货架'},{code:"23",name:'货架'},{code:"24",name:'货架'},],
                [{code:"30",name:'货架'},{code:"31",name:'货架'},{code:"32",name:'货架'},{code:"33",name:'货架'},{code:"34",name:'货架'},],
                [{code:"40",name:'货架'},{code:"41",name:'货架'},{code:"42",name:'货架'},{code:"43",name:'货架'},{code:"44",name:'货架'},],
                [{code:"50",name:'货架'},{code:"51",name:'货架'},{code:"52",name:'货架'},{code:"53",name:'货架'},{code:"54",name:'货架'},],
            ],
            selectionList:[],   //选中的数组
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.list.map(val=>{
                val.map(it=>{
                    it.isCheck = false;
                })
            })
        },
        // 纵向选中 x轴
        columnCheck(x,isCheck){
            console.log(x,isCheck,'column-x轴');
            for(var s=0;s<this.list.length;s++){
                for(var k =0;k<this.list[s].length;k++){
                    if(k===x){
                        this.list[s][k].isCheck = isCheck;
                    }
                }
            }
            this.postSelectionData();
        },
        // 横向选中 y轴
        rowCheck(y,item){
            console.log(y,item,'row-y轴');
            item.map(mm=>{
                mm.isCheck = item.isCheck;
            });
           this.list[y] = item;
           this.postSelectionData();
        },
        // 单击事件
        clickEvent(x,y,item){
            console.log(x,y,item,"单击事件");
            item.isCheck = !item.isCheck;
            let arr = this.list;
            this.list = [];
            for(var s=0;s<arr.length;s++){  //y轴
                for(var k =0;k<arr[s].length;k++){  //x轴
                    if(k===x && s===y){
                        arr[s][k] = item;
                    }
                }
            }
            this.list = arr;
            this.postSelectionData();
            
        },
        // 获取二维数组中所有被选中的数据
        postSelectionData(){
            setTimeout(() => {
                let arr = this.list;
                let selectList = [];
                for(var s =0;s<arr.length;s++){
                    for(var k =0;k<arr[s].length;k++){
                        if(!!arr[s][k].isCheck){
                            selectList.push(arr[s][k])
                        }
                    }
                };
                console.log(selectList,"selectList")
            }, 100);
        }
    }
}

</script>
<style lang="less" scoped>
@deep: ~">>>";
.tableCheck{
    padding:20px;
    width:100%;
    height:100%;
    .blues{
        color:#fff;
        background:blue;
    }
    .tables-wrap{
        width:600px;
        height:600px;
        border-top:1px solid #ddd;
        border-left:1px solid #ddd;
    }
    .rowSty-wrap{
        width:600px;
        height:100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .rowSty{
            width:100px;
            height: 100px;
            display: flex;
            flex-direction: row;
        }
    }
    .ss{
        width: 100px;
        height:100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-right:1px solid #ddd;
        border-bottom:1px solid #ddd;
    }
    .tables{
        display: flex;
        flex-direction: row;
        ul{
            display: flex;
            flex-direction: row;
            padding:0;
            li{
                width:100px;
                height:100px;
                list-style-type:none;
                border-right:1px solid #ddd;
                border-bottom:1px solid #ddd;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
}
</style>