<template>
<div class="newQuestionADD">
    <Form  
        :label-width="60" 
        v-for="(item,index) in newList" 
        v-dragging="{ item:item, list: newList, group:'item'}"
        :key="index" 
        style="border:1px dotted #aaa;">
        <div :style="{width:'100%',textAlign:'right',position:'relative',background:backgroundColor[item.type-1],}">
            <span style="color:#fff;position:absolute;left:45%;">{{questType[item.type-1]}}</span>
            <v-icon small style="color:#fff;" @click="clear(item,index)" >clear</v-icon>
        </div>
        <!-- Ab -->
        <FormItem :label="'问题'+(index+1)" prop="AB" v-show="item.type==0">
            <Input v-model="item.AB" placeholder="请输入问题,限制100字以内" @on-change="ABchange(item,index)" :maxlength="100"/>
             <RadioGroup v-model="item.genderAB">
                <Radio label="true">是</Radio>
                <Radio label="false">否</Radio>
            </RadioGroup>
        </FormItem>
        <!-- 单选 -->
        <FormItem :label="'问题'+(index+1)" prop="Single" v-show="item.type==1">
            <Input v-model="item.Single" placeholder="请输入问题,限制100字以内"  @on-change="SingleChange(item,index)" :maxlength="100"/>
            <Input v-model="item.genderSingle" type="textarea" placeholder="请输入答案-单选" @on-change="changeSingle(item,index)"/>
            <Checkbox v-model="item.other"  @on-change="ohterSingle(item,index)">其他</Checkbox >
            <Checkbox v-model="item.required" v-show="item.other" @on-change="requiredSingle(item,index)">必选</Checkbox >
        </FormItem>
        <!-- 多选 -->
        <FormItem :label="'问题'+(index+1)" prop="More" v-show="item.type==2">
            <Input v-model="item.More" placeholder="请输入问题,限制100字以内"  @on-change="MoreChange(item,index)" :maxlength="100"/>
            <Input v-model="item.genderMore" type="textarea" placeholder="请输入答案-多选" @on-change="changeMore(item,index)"/>
            <Checkbox v-model="item.other"  @on-change="ohterMore(item,index)">其他</Checkbox >
            <Checkbox v-model="item.required"  v-show="item.other" @on-change="requiredMore(item,index)">必选</Checkbox >
        </FormItem>
        <!-- 问答 -->
        <FormItem :label="'问题'+(index+1)" prop="Fire" v-show="item.type==3">
            <Input v-model="item.Fire" placeholder="请输入问题,限制100字以内"  @on-change="FireChange(item,index)" :maxlength="100"/>
            <Input v-model="item.genderFire" type="textarea"  placeholder="请输入问题,限制300字以内"  @on-change="FireAnswer(item,index)" :maxlength="300"/>
        </FormItem>
        
    </Form>
</div>
</template>
<script>
export default {
    name:'newQuestionADD',
    data(){
        return{
             formValid: {
                    AB: '',   //AB型
                    gender:'',
                    Single:'',  //单选型
                    genderSingle:'',
                    SingleArr:[],  //单选选项数组
                    More:'',      //多选
                    genderMore:'',
                    MoreArr:[],   //多选选项数组
                    Fire:'',       //  问答
                    genderFire:'',
                },
            vLetter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            newList:[],
            backgroundColor:['#2d8cf0','#ff9900','#19be6b','#ed4014'],
            questType:['单选题','多选题','问答题'],   //问题题型
        }
    },
    props:['list'],
    created(){
        this.newList = this.list;
        console.log(this.list,"list")
    },
    mounted(){
        this.$dragging.$on('dragged', ({ value }) => {
            value.list.map((val,index)=>{
                val.number = index+1;
                return val;
            })
            this.newList = value.list;
            this.dragBus(value);
            this.$store.commit('questionListS',JSON.stringify(this.newList))
        })
    },
    methods:{
        // 其他
        ohterSingle(item,index){
            let length = item.SingleArr.length;
            if(item.other){
                let obj = {type:'',content:''};
                if(length==0){
                    obj.type=this.vLetter[0];
                    obj.content = "其他";
                }else{
                    obj.type = this.vLetter[length];
                    obj.content = "其他";
                }
                item.SingleArr.push(obj);
            }else{
                if(length!==0){
                    if(item.SingleArr[length-1].content=='其他'){
                        item.SingleArr.splice([length-1],1);
                    }
                }
            }
           
            this.list[index] = item;
            this.timeEvent();
        },
         requiredSingle(item,index){
            item.SingleArr.map(val=>{
                if(val.content=="其他"){
                    val.required = item.required;
                }
            })
            this.list[index] = item;
             this.timeEvent();
        },
         ohterMore(item,index){
            let length = item.MoreArr.length;
            if(item.other){
                let obj = {type:'',content:''};
                if(length==0){
                    obj.type=this.vLetter[0];
                    obj.content = "其他";
                }else{
                    obj.type = this.vLetter[length];
                    obj.content = "其他";
                }
                item.MoreArr.push(obj);
            }else{
                if(length!==0){
                    if(item.MoreArr[length-1].content=='其他'){
                        item.MoreArr.splice([length-1],1);
                    }
                }
            }
           
            this.list[index] = item;
            this.timeEvent();
        },
         requiredMore(item,index){
            item.MoreArr.map(val=>{
                if(val.content=="其他"){
                    val.required = item.required;
                }
            })
            this.list[index] = item;
            this.timeEvent();
        },

         // 拖拽触发的事件
        dragBus(value){
            this.list = value.list;
            console.log(this.list,"添加-拖拽")
        },
         // 删除
        clear(item,index){
            this.list.splice(index,1);
            this.$store.commit('questionListS',JSON.stringify(this.list));
        },
        // ab型
        ABchange(item,index){
            item.number = index+1;
            this.list[index] = item;
             this.timeEvent();
        },
        
        // 问答
        FireChange(item,index){
            item.number = index+1;
            this.list[index] = item;
            this.timeEvent();
        },
        FireAnswer(item,index){
            this.list[index] = item;
            this.timeEvent();
        },
        // 单选
        SingleChange(item,index){
            item.number = index+1;
            this.list[index] = item;
            this.timeEvent();
        },
         // 单选回车:没有采用enent.key
        changeSingle(item,index){
            item.SingleArr = this.textareaData(item.genderSingle,item.SingleArr);
            this.list[index] = item;
            this.timeEvent();
        },

        // 多选
        MoreChange(item,index){
            item.number = index+1;
            this.list[index] = item;
            this.timeEvent();
        },
        //多选回车事件：change事件中没有键盘kye
        changeMore(item,index){
            item.MoreArr = this.textareaData(item.genderMore,item.MoreArr);
            this.list[index] = item;
            this.timeEvent();
            console.log(this.MoreArr,"多选")
        },
       

        // textarea数据整理
        textareaData(text,inputArr){
            inputArr=[];
            let des = text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '); //转换格式
            let arr = des.split('<br/>');
            let newArr =[];
            arr.map(val=>{
                if(val!==''){
                    newArr.push(val);
                }
            });
            let info = false;
            newArr.map((val,i)=>{
                if(this.vLetter.length>newArr.length-1){
                    let obj = {
                            type:this.vLetter[i],
                            content:val,
                        }
                        inputArr.push(obj);
                }else{
                    info = true;
                }
                
            })
            if(info){
                this.$Message.info("选项过多，剩余输入的内容被省略")
            }
            return inputArr
        },
        // 延迟事件
        timeEvent(){
            setTimeout(() => {
               this.$store.commit('questionListS',JSON.stringify(this.list))
            },100);
        },
        
    }
}
</script>
<style lang="less" scoped>
.newQuestionADD{
    width: 100%;
    height:100%;
    .question{
        width:100%;
        height:100%;
    }
}
</style>

