<template>
<div class="editModelADD">
    <Form :model="formValidate" :label-width="100"  >
        <FormItem label="模板名称" prop="name" style="marginBottom:10px;">
            <Input v-model="formValidate.name" :maxlength='100' placeholder="请填写问卷名称,字符100"  @on-change="Namechange"/>
         </FormItem>
         <FormItem label="背景颜色" prop="bgColor" style="marginBottom:-6px;">
           <el-color-picker v-model="formValidate.bgColor" size="small" v-on:change="headleChangeColor"></el-color-picker>
         </FormItem>
        <div class="upImg">
            <span style="margin-left:60px;margin-right:20px;">首图</span>
            <Upload 
            :format="['jpg','jpeg','png']"
            action="/operate/image/image/upload" 
            :before-upload="beforeUpload"
            :on-success="upLoadS" 
            :multiple="false"
            :with-credentials="true"
            :show-upload-list="false"
            style="marginRight:16px;display:flex;flexDirection:row;"
            >
                <Button style="background:#eee;borderRadius:10px;padding:5px;" >选择文件</Button>
            </Upload>
            <Input v-model="formValidate.imgName" v-if="inputSatate" :value="formValidate.imgName" style="width:100px;lineHight:28px;cursor:pointer;" icon="md-close" @on-click="deleImg"/>
        </div>
        <p style="color:#aaa;marginLeft:60px;font-size:10px;">尺寸750*304 大小不超过100KB</p>
        <div class="questionBtn">
            <Button style="background:#2d8cf0;color:#fff;borderRadius:10px;padding:5px;" @click="Singlequestion">+单选型问题</Button>
            <Button style="background:#ff9900;color:#fff;borderRadius:10px;padding:5px;" @click="Morequestion">+多选型问题</Button>
            <Button style="background:#19be6b;color:#fff;borderRadius:10px;padding:5px;" @click="Firequestion">+问答型问题</Button>
            <Button style="background:#ed4014;color:#fff;borderRadius:10px;padding:5px;" @click="Batchquestion">批量添加题目</Button>
        </div>
        <div class="Qconter">
            <newQuestionCom :list="list" v-if="list.length!==0"></newQuestionCom>
        </div>
        <FormItem label="提交文案" prop="buttonText" style="marginBottom:10px;">
            <Input v-model="formValidate.buttonText" :maxlength='10' placeholder="提交调查问卷参与抽奖,字符10"  @on-change="btnTextchange"/>
         </FormItem>
        <div class="box">
            <Button type="primary" @click="handleSubmit()" style="width:100px;">确认</Button>
            <Button @click="handleReset()" style="margin-left:8px;width:100px;">重置</Button>
        </div>
    </Form>

    <!-- 批量添加题目 -->
     <Modal v-model="modalDialog"  width="600">
        <p slot="header" style="text-align:center;color:#ed4014;">
            <span>批量添加题目</span>
        </p>
       <div>
           <p>注意事项：</p>
           <p>1.本文本框可复制粘贴全部问卷试题</p>
           <p>2.问题要采用【单选】,【多选】,【问答】结尾，中括号仅支持中文符号，并且必须标定题号</p>
           <p>3.选项若有空行,则忽略该选项,选项最大数量为26</p>
           <p>4.读取顺序以题目序号为准,题号与内容采用英文符号&nbsp;.&nbsp;分割,添加题目到编辑区,则题目序号将重新排定</p>
           <p>5.本输入框不支持选项中存在输入框的题型,也不支持必选情况</p>
       </div>
        <Input v-model="sumQuestion" :placeholder="sumQuestionTT" type="textarea" style="width:100%;" class="sumInput"/>
        <div slot="footer">
            <Button style="background:#2d8cf0;color:#fff;" @click="sure">确定</Button>
            <Button @click="back" >重置</Button>
           
        </div>
    </Modal>
</div>
</template>
<script>
import newQuestionCom from '../cms_question/newQuestion'   //空白题型模板
export default {
    name:'editModelADD',
    data(){
        return{
            formValidate: {
                    name: '',   //问卷名称
                    bgColor:'#081C77',      //背景颜色
                    buttonText:'',   //按钮文字
                    imgName:'',    //图片名字
                    imageId:'',     //图片id
                },
                identityList:[],    //模板类型列表
                list:[],   //表格
                questionIds:[],   //保存后的问题id
                templateTop:{},    //缓存对象
                modalDialog:false,  //批量添加的弹框
                sumQuestion:'',    //批量添加的变量
                inputSatate:false,   //图片上传隐藏input
                vLetter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                sumQuestionTT:`例：
1.您所从事的行业类别是[多选]
土壤监测
大气监测
水质监测

2.您主要分析的项目有哪些[多选]
无机重金属检测
生物样品分析
有机污染物检测

3.您现在所使用的前处理仪器有[多选]
离心机
球磨仪
其他

4.您现在所使用的分析仪器有[多选]
原子吸收光谱仪
原子荧光光谱仪 
气相色谱仪

5.您近期是否有计划（三个月内）采购或租赁仪器[单选]
有
无

6.您是通过什么途径了解到本次会议的[问答]`,     //批量添加题目的背景实例
        }
    },
    components:{
        newQuestionCom
    },
    created(){
        this.$store.commit('questionListS',[]);
        this.$store.commit('imgURlS', '');
        this.$store.commit('formValidateS',{});
    },
    methods:{
        // 修改文字
        btnTextchange(){
            console.log(this.formValidate.buttonText,"按钮内样式");
            this.$store.commit('formValidateS',this.formValidate);
        },
        // 背景颜色
        headleChangeColor(){
            console.log(this.formValidate.bgColor,"取色");
            this.$store.commit('formValidateS',this.formValidate);
        },
        // 批量添加
        Batchquestion(){
            this.modalDialog = true;
        },
        // 批量添加确定
        sure(){
            let allQuest = this.sumQuestion;
            let newQuest = this.textareaData(allQuest);
            this.dataFormat(newQuest,"catch");   //数据格式整理 
            newQuest.map(val=>{
                this.list.push(val);
            })
            this.$store.commit('questionListS',JSON.stringify(this.list));
            this.modalDialog = false;
            this.sumQuestion ='';
        },
         // textarea数据整理-批量添加问题，不存在输入框
        textareaData(text){
            let allList =[];
            let des = text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '); //转换格式
            let arr = des.split('<br/>');
            let reg = /[【单选】,【多选】,【问答】]$/;
            let reg1= /单选/;
            let reg2= /多选/;
            let reg3= /问答/;
            arr.map((val,index)=>{
                let obj = {
                    number:'',
                    title:'',
                    type:'',
                    selectViews:[],
                }
                if(reg.test(val)){
                   
                    if(reg1.test(val)){
                        obj.type= 1; 
                    }else if(reg2.test(val)){
                        obj.type= 2;
                    }else if(reg3.test(val)){
                        obj.type = 3; 
                    } 
                   let tit =  val.split('.')[1]
                   obj.index=index;
                   obj.number = val.split('.')[0];
                   obj.title = tit.slice(0,-4);
                   allList.push(obj);
                }
            });
            arr.find((v,j)=>{
                 if(!reg.test(v) &&v !==''){
                      allList.map((m,n)=>{
                       if(m.index !== undefined){
                           if(allList[n+1]){
                               this.allListFn(m,n,v,j,allList[n+1].index,allList.length,true);
                           }else{
                                this.allListFn(m,n,v,j,arr.length,allList.length,false);
                           }
                            
                        }
                    })
                 }
            })
            return allList
        },
        allListFn(m,n,v,j,num,length,type){
            if(type){
                if(j>m.index && j<num && n<length){
                    let child ={type:'',content:''};
                    if(m.selectViews.length ===0){
                        child.type = this.vLetter[0];
                    }else{
                            m.selectViews.find((a,b)=>{
                            child.type = this.vLetter[b+1];
                        })
                    }
                    child.content = v;
                    m.selectViews.push(child);
                    return m
                }
            }else{
                if(j>m.index && j<num && n<length){
                    let child ={type:'',content:''};
                    if(m.selectViews.length ===0){
                        child.type = this.vLetter[0];
                    }else{
                            m.selectViews.find((a,b)=>{
                            child.type = this.vLetter[b+1];
                        })
                    }
                    child.content = v;
                    m.selectViews.push(child);
                    return m
                }
            }
            
        },
          // data格式处理
        dataFormat(data,type){
            data.map((val,index)=>{
                if(type==="catch"){
                    if(val.type==0){
                        val.number = index+1;
                        val.AB = val.title;
                        delete  val.title;
                    }else if(val.type== 1){
                        val.number = index+1;
                        val.Single = val.title;
                        val.SingleArr= val.selectViews;
                        let ids = [];
                        let str = '';
                        val.selectViews.map(it=>{
                            if(str ==''){
                                str=it.content;
                            }else{
                                str=str+'\n'+it.content;
                            }
                            ids.push(it.id);
                        })
                        val.ids = ids;
                        val.genderSingle = str;
                        delete val.title;
                        delete val.selectViews;
                    }else if(val.type==2){
                        val.number = index+1;
                        val.More = val.title ;
                        val.MoreArr = val.selectViews;
                        let ids = [];
                        let str = '';
                        val.selectViews.map(it=>{
                            if(str ==''){
                                str=it.content;
                            }else{
                                str=str+'\n'+it.content;
                            }
                            ids.push(it.id);
                        })
                        val.ids = ids;
                        val.genderMore = str;
                        delete val.title;
                        delete val.selectViews;
                    }else{
                        val.number = index+1;
                        val.Fire = val.title;
                        val.genderFire = ''
                        delete val.title;
                    }
                }
                if(type==="save"){
                    if(val.type==0){  // 数据结构更改
                      val.number = index+1;
                       val.title = val.AB;
                       delete val.AB;
                       delete val.gender;
                   }else if(val.type==1){
                       val.number = index+1;
                       val.title = val.Single;
                       val.selectAddViews = val.SingleArr;
                       val.selectAddViews.map((it,m)=>{
                           if(val.ids){
                              it.id = val.ids[m];
                           }
                       })
                       delete val.ids;
                       delete val.Single;
                       delete val.genderSingle;
                       delete val.SingleArr;
                   }else if(val.type==2){
                       val.number = index+1;
                       val.title = val.More;
                       val.selectAddViews = val.MoreArr;
                       val.selectAddViews.map((it,m)=>{
                           if(val.ids){
                              it.id = val.ids[m];
                           }
                       })
                       delete val.ids;
                       delete val.More;
                       delete val.genderMore;
                       delete val.MoreArr;
                   }else{
                       val.number = index+1;
                       val.title = val.Fire;
                       delete val.Fire;
                       delete val.genderFire;
                   }
                }
               
            });
            return data;
        },
        // 批量添加重置
        back(){
            this.sumQuestion = '';
        },
        // 问卷名称
        Namechange(){
           this.timeEvent();
        },
        // 问卷说明
        Instructchange(){
            this.timeEvent();
        },
        // 延迟
        timeEvent(){
            delete this.formValidate.imgName;
            delete this.formValidate.imgUrl;
            setTimeout(() => {
               this.$store.commit('questionObjS',JSON.stringify(this.formValidate))
            }, 100); 
        },
          //保存问卷 
           handleSubmit () {
                if(this.formValidate.name =='' || this.formValidate.imgName =='' || this.formValidate.imageId ==''){
                    this.$Message.info("请填写完整模板名称，并上传模板图片！")
                    return
                }else if(this.formValidate.buttonText==''){
                     this.$Message.info("请填写提交文案")
                     return
                }else if(this.list.length < 5){
                     this.$Message.info("模板题目至少五道或以上！")
                     return
                }else{
                    //校验题目是否为空
                    let regTest = '';
                    this.list.map((num,i)=>{
                        regTest =this.reg(num);  
                        if(!regTest){
                            return regTest;
                        }
                    })
                     if(!regTest){
                        this.$Message.info("模板题目不能为空,多选或单选请填写选项！")
                        return
                    }else{ 
                        this.questionNEW();
                    }
                }   
            },
             // 判断
            reg(val){
                if(val.type ==0){
                     return val.AB =='' ?false:true;
                }else if(val.type ==1){
                     return (val.SingleArr.length==0||val.Single=='')?false:true
                }else if(val.type ==1){
                    return (val.MoreArr.length==0||val.More=='')?false:true
                }else{
                   return val.Fire =='' ?false:true;
                }
            },
            // 保存问题
            questionNEW(){
                let postData = this.list;
                postData.map(val=>{
                   if(val.type==0){
                       val.title = val.AB;
                       delete val.AB;
                       delete val.gender;
                   }else if(val.type==1){
                       val.title = val.Single;
                       val.selectAddViews = val.SingleArr;
                       delete val.Single;
                       delete val.genderSingle;
                       delete val.SingleArr;
                   }else if(val.type==2){
                        val.title = val.More;
                       val.selectAddViews = val.MoreArr;
                       delete val.More;
                       delete val.genderMore;
                       delete val.MoreArr;
                   }else{
                       val.title = val.Fire;
                       delete val.Fire;
                       delete val.genderFire;
                   }
               })
               
                    this.instanceNEW(postData);
                  
            },
            // 实例接口
            instanceNEW(questList){
                 let params = {
                        imageId:this.formValidate.imageId,
                        questionAddViews:questList,
                        title:this.formValidate.name,
                        official:this.formValidate.buttonText,
                        bgColor:this.formValidate.bgColor,
                        type:3,
                    }
                    this.$http.post('/template/add',params).then(json=>{
                        if(json.success){
                             this.$Message.success("模板保存成功");
                             this.$store.commit('formValidateS',{});
                             this.$router.push({path:'../../checktable/allCheck'});
                        }else{
                            this.$Message.error(json.errorMsg)
                        }
                    }).catch(err=>{
                        this.$Message.error(err.errorMsg)
                    })
            },
            // 重置
            handleReset(name){
                setTimeout(()=>{
                    this. formValidate={
                        name: '',   //问卷名称
                        imgName:'',    //图片名字
                        imgUrl:'',     //展会图片名
                        buttonText:'',
                        bgColor:'#081C77',
                    };
                    this.list = [];
                    this.$store.commit('questionListS',[]);
                    this.$store.commit('imgURlS', '');
                    this.$store.commit('formValidateS',{});
                },600)
               
            },
            //上传图片之前
            beforeUpload(file){
                console.log(file)
                let size = file.size;   //注意，这里读到的是字节数
                let isAllow = false;
                let maxSize = 100;    //100KB
                maxSize = maxSize * 1024;   //转化为字节
                isAllow = size <= maxSize;
                if(isAllow){
                    return true;
                }else{
                   this.$Message.error('图片大小不超过100KB!请重新上传')
                   return false
                }
            }, 
            //检查图片的宽高
            //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject组织图片上传
            checkImageWH(file, width, height) {
                let self = this;
                return new Promise(function (resolve, reject) {
                    let filereader = new FileReader();
                    filereader.onload = e => {
                        let src = e.target.result;
                        const image = new Image();
                        image.onload = function () {
                            if (width && this.width != width) {
                                self.$Message.error('请上传宽为' + width + "的图片");
                                reject();
                            } else if (height && this.height != height) {
                                self.$Message.error('请上传高为' + height + "的图片");
                                reject();
                            } else {
                                resolve();
                            }
                        };
                        image.onerror = reject;
                        image.src = src;
                    };
                    filereader.readAsDataURL(file);
                });
            },
             // 上传图片回调
            upLoadS(response, file, fileList){
                if(response.success){
                     this.inputSatate = true;
                    this.formValidate.imgName = response.data.name;
                    this.formValidate.imageId = response.data.id;
                    this.$store.commit('imgIdS',response.data.id);
                    this.$store.commit('imgURlS',response.data.url);
                }else{
                    this.$Message.error(response.errorMsg);
                    this.inputSatate = false;
                    if(response.errorCode == '2001'){  
                        sessionStorage.removeItem('userId')
                        this.$router.push('/login')
                    }
                }
            },
            // 删除上传图片
            deleImg(){
                this.formValidate.imgName ='';
                this.$store.commit('imgURlS','');
                this.inputSatate = false;
            },
            // AB型
            ABquestion(){
                console.log("Ab型");
                let obj = {
                    type:0,
                    AB: '',   //AB型
                    gender:'',
                    other:'',
                    required:'',
                };
                this.list.push(obj)
            },
            // 单选项
            Singlequestion(){
                 console.log("单选");
                  let obj = {
                    type:1,
                    Single:'',  //单选型
                    genderSingle:'',
                    SingleArr:[],  //单选选项数组
                    other:'',
                    required:'',
                };
                this.list.push(obj)
            },
            // 多选型
            Morequestion(){
                 console.log("多选")
                  let obj = {
                    type:2,
                    More:'',      //多选
                    genderMore:'',
                    MoreArr:[],   //多选选项数组 
                    other:'',
                    required:'',
                };
                this.list.push(obj)
            },
            // 问答型
            Firequestion(){
                 console.log("问答")
                  let obj = {
                    type:3,
                    Fire:'',       //  问答
                    genderFire:'',
                };
                this.list.push(obj)
            },
          
    },
   
}
</script>
<style lang="less">
.editModelADD{
    width:100%;
    height:100%;
    overflow-y: auto;
    overflow-x: hidden;
    border:1px solid #aaa;
    padding:10px;
    position: relative;
    .upImg{
        width:100%;
        height:40px;
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
        // position:absolute;
        // top:170px;
    }
    .questionBtn{
        width:90%;
        height:60px;
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        align-items: center;
        padding:10px 0;
        // position:absolute;
        // top:200px;
    }
    .Qconter{
        width:100%;
        height:60%;
        overflow:auto;
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        padding:20px 10px;
        border:1px dotted #aaa;
        margin-bottom:10px;
        // margin-top:120px;
       
    }
    .box{
        width:100%;
        display: flex;
        flex-direction: row;
        justify-content:center;
    }
}
.upImg .ivu-upload-list{
    margin-top: 0;
}
.sumInput textarea.ivu-input{
    height: 400px;
}
</style>
