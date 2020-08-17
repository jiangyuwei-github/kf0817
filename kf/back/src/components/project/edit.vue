<template>
    <div>
        <!--导航-->
        <div class="console-bar">
            <head-bar :toptitle="'新闻管理'"></head-bar>
            <left-bar :active="'new'" ></left-bar>
        </div>
        <div class="content">
            <!-- <div class="allTitle">新闻管理 - </div> -->
            <Row>
                <Col span="20">
                    <div class="infoBox">
                        <Card style="margin-bottom:30px">
                            <Row style="padding:10px 0">
                                <Col span="8"><span class="title">id:</span>{{parentData.id}}</Col>
                                <Col span="8"><span class="title">创建时间:</span>{{parentData.createTime}}</Col>
                            </Row>
                            <Row style="padding:10px 0">
                                <Col span="8"><span class="title">标识:</span>  <Input v-model.trim="parentData.title"  style="width: 50%" @on-blur="blurFn"/> </Col>
                                <Col span="8"><span class="title">创建人:</span>{{parentData.creator}}</Col>
                            </Row>
                        </Card>
                    </div>

                    <div style="text-align:right;margin-bottom:20px">
                        <Button type="primary" @click="newAdd"  size="large" :disabled='languageData.length==0'>新增</Button>
                    </div>

                    <Table stripe border :columns="columns" :data="tableData" >
                        <template slot-scope="{ row, index }" slot="language">{{row.language}}</template>
                        <template slot-scope="{ row, index }" slot="title">{{row.title}}</template>
                        <template slot-scope="{ row, index }" slot="createTime">{{ formatDateFn(row.createTime)}}</template>
                        <template slot-scope="{ row, index }" slot="creator">{{row.creator}}</template>
                        <template slot-scope="{ row, index }" slot="updateTime">{{ formatDateFn(row.updateTime) }}</template>
                        <template slot-scope="{ row, index }" slot="updater">{{row.updater}}</template>

                        <template slot-scope="{ row, index }" slot="status">
                            <div class="itemBox">
                                <div class="changeWarp" >
                                    <i-switch size="large" v-model="row.onlineState" true-value="ONLINE" false-value="OFFLINE">
                                        <span slot="open">启用</span>
                                        <span slot="close">停用</span>
                                    </i-switch>    
                                    <div class="changeSwit" @click="changeState(row)" ></div>
                                </div>  
                            </div>
                        </template>

                        <template slot-scope="{ row, index }" slot="oper">
                            <Button type="text" style="margin-right: 5px" @click="edit(row)" >编辑</Button>
                            <Button type="text" style="margin-right: 5px" @click="del(row,index)" >删除</Button>
                        </template>

                    </Table>

                
                </Col>
            </Row>
             

            <Modal v-model="languageModuleFalg" :mask-closable = "false" title="选择语种" width=500 :footer-hide="true" class-name="vertical-center-modal" >
                <div style="height:100px;overflow: hidden;overflow-y: auto;">
                    <Form ref="language" :model="languageFrom" :rules="ruleValidate" :label-width="70" heigh=500px>
                        <FormItem label="语种:"  prop="type">
                            <Select v-model="languageFrom.type" :transfer="true" >
                                <Option v-for="item in languageData" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        </FormItem>
                        <div class="save" style="text-align:center"><Button type="primary" @click="saveLanguage" size='large'>保存</Button></div>
                    </Form>
                </div>
            </Modal>

            <Modal v-model="modelFlag" :mask-closable = "false" title="编辑" width=1000 :footer-hide="true" class-name="vertical-center-modal" >
                <div style="max-height:900px;overflow: hidden;overflow-y: auto;">
                        <Form ref="banner" :model="currentData" :rules="ruleValidate" :label-width="70" heigh=500px>
                            <FormItem label="标题"  prop="title">
                                <Input v-model="currentData.title" ></Input>
                            </FormItem>
                            <FormItem label="内容" >
                                <quill-editor @setGaikuan='setGaikuan' :intro="currentData.content"></quill-editor>
                                <Input v-model="currentData.content"   style='display:none'></Input>
                            </FormItem>

                            <div class="save" style="text-align:center"><Button type="primary" @click="submitFn" size='large'>保存</Button></div>
                        </Form>
                </div>

            </Modal>

        </div>

    </div>

</template>

<script>
import HeadBar from '../module/headBar/headBar.vue';
import leftBar from '../module/leftBar/leftBar.vue';
import imgCropper from '@/components/module/cropper/index.vue';
import quillEditor from '@/components/module/quillEditor/quillEditor.vue';
import { dataType,formatDate } from '@/common/js/common.js';
import {save, articleOne ,deleteItem,offline,online,editDetail} from '../../api/index.js';
export default {
    data() {
        const validateGaiKuan = (rule, value, callback) => {
            let _arr = value.replace(/<(?!img).*?>/g, '');
            if (_arr.length == '') {
                callback(new Error('请填写内容'));
            } else {
                callback();
            }
        };
        const arryNoEmpty = (rule, value, callback) => {
            if (value.length == '') {
                callback(new Error('请上传banner'));
            } else {
                callback();
            }
        };
        return {
            modelFlag:false,
            languageModuleFalg:false,
            languageFrom:{      //选种语种
                type:"CH"
            },
            languageData:[],
            detailId: `${this.$route.query.id}` || "",
            columns:[
                    {
                        title: '语种',
                        align: 'center',
                        slot: 'language'
                    },
                    {
                        title: '标题',
                        align: 'center',
                        slot: 'title'
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        slot: 'createTime'
                    },
                    {
                        title: '创建人',
                        align: 'center',
                        slot: 'creator'
                    },
                    {
                        title: '更新时间',
                        align: 'center',
                        slot: 'updateTime'
                    },
                    {
                        title: '更新人',
                        align: 'center',
                        slot: 'updater'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        slot: 'status'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'oper'
                    }
            ],
            parentData:{
                id:"",
                creator:"",
                title:"",
                createTime:""
            },
            tableData:[],
            //当前操作数据
            currentData: {
                id:"",
                content:"",
                title:""
            },
            ruleValidate: {
                content: [{required: true, message: '请填写内容', transform: value => value ? value.trim() : ''}, { validator: validateGaiKuan, trigger: '' }],
                type: [{required: true, message: '请选择语种', trigger: 'blur', transform: value => value ? value.trim() : ''}],
                title: [{required: true, message: '请输入标题', trigger: 'blur', transform: value => value ? value.trim() : ''}],
            }
        };
    },
    components: {
        HeadBar,
        leftBar,
        imgCropper,
        quillEditor
    },
    mounted() {
        if(this.detailId !==''){
            this.getDetial()
        }
    },
    methods: {

        formatDateFn(time){
            return formatDate(time,'yyyy-MM-dd HH:mm')
        },
        //获取数据
        getDetial(){
            articleOne({
                id:this.detailId
            }).then(res => {
                if (res.code == '200') {
                    this.tableData = res.data.children

                    this.getLanguageFn()
                  
                    this.parentData = {...res.data}
                    this.parentData.createTime = formatDate(this.parentData.createTime,'yyyy-MM-dd HH:mm')
                   
                } else {
                    this.$Message.error({content: res.msg, duration: 3});
                }
            });
        },
        //判断取的还能创建的语种
        getLanguageFn(){
            var tempLanguage = []
            var oldLanguage = ['CH',"EN"]

                this.tableData.map(function(val){
                    tempLanguage.push(val.language)
                    return val
                })
            
            this.languageData =  oldLanguage.filter(function(v){ return tempLanguage.indexOf(v) == -1 })
                 
        },
        setkeyVisual(imgArr) {
            this.currentData.img = dataType(imgArr) === 'array' ? imgArr.join(',') : '';
        },
        setGaikuan(val) {
            this.currentData.content = val;
        },
        // 发布上线-下线
        changeState(item) {
            var that = this
            if( item.onlineState == 'ONLINE'){
                that.$Spin.show();
                offline({id:item.id}).then(res => {
                    if (res.code == '200') {
                         that.getDetial();
                        that.$Message.success('下线成功！');
                    } else {
                        that.$Message.error({content: res.msg, duration: 3});
                    }
                    that.$Spin.hide();
                });
            }

            if( item.onlineState == 'OFFLINE'){
                    that.$Spin.show();
                    online({id:item.id}).then(res => {
                        if (res.code == '200') {
                            that.getDetial();
                            that.$Message.success('上线成功！');
                        } else {
                            that.$Message.error({content: res.msg, duration: 3});
                        }
                        that.$Spin.hide();
                    });
            }
        },
        blurFn(){
            var that = this
            if(that.parentData.title !=''){
                that.$Spin.show();
                editDetail({id:that.detailId,title:that.parentData.title}).then(res => {
                    if (res.code == '200') {
                        that.getDetial();
                        that.$Message.success('修改成功');
                    } else {
                        that.$Message.error({content: res.msg, duration: 3});
                    }
                    that.$Spin.hide();
                });
            }else{
                this.$Message.error({content: '请输入标识', duration: 3});
            }

                
        },
        //保存语种
        saveLanguage(){
            var that = this
            this.$refs.language.validate((valid) => {
                if (valid) {
                    this.$Spin.show();
                        save({
                           "parentId":parseInt(that.detailId),
                           "language":that.languageFrom.type,
                           "type": "CHILDREN"
                        }).then(res => {
                            if (res.code == '200') {
                                that.getDetial();
                                that.languageModuleFalg = false
                            } else {
                                that.$Message.error({content: res.msg, duration: 3});
                            }
                             that.$Spin.hide();
                        });
                } else {
                    this.$Message.error({content: '必填信息不完整', duration: 3});
                }
            });
        },
        //编辑
        edit(val){
            console.log(val)
            this.currentData.title = val.title
            this.currentData.content = val.content
            this.currentData.id = val.id
            this.modelFlag = true
        },
        // 删除
        del(val,ind){
             var that = this
            this.$Modal.confirm({
                title: '您确认删除该条新闻?',
                content: '',
                onOk: () => {
                    deleteItem({id:val.id}).then(res => {
                        if (res.code == '200') {
                            that.tableData.splice(ind,1); 
                            that.getLanguageFn()
                            that.$Message.success('删除成功！');
                        } else {
                            that.$Message.error({content: res.msg, duration: 3});
                        }
                        that.$Spin.hide();
                    });

                }
            });
        },

        //新增
        newAdd(){
            if(this.languageData.length > 0){
                this.languageModuleFalg = true
            }
           
        },
        submitFn() {
             var that = this
            this.$refs.banner.validate((valid) => {
                if (valid) {
                        this.$Spin.show();
                        editDetail({
                           'content': that.currentData.content,
                           "title":that.currentData.title,
                           "id": that.currentData.id,
                        }).then(res => {
                            if (res.code == '200') {
                                that.getDetial();
                                that.modelFlag = false
                            } else {
                                that.$Message.error({content: res.msg, duration: 3});
                            }
                             that.$Spin.hide();
                        });
                } else {
                    this.$Message.error({content: '必填信息不完整', duration: 3});
                }
            });
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.changeWarp
    position:relative
.changeSwit
    position: absolute
    left:0
    top:0
    height: 100%
    width: 100%
    cursor: pointer
.infoBox{
    margin-bottom :30px;
    font-weight :bold
}
.infoBox .title{
    width:100px;
    text-align:right;
    display :inline-block;
    margin-right:10px;
    font-size:16px
}
.save{
    padding-left:30px
}

.list-logo{
    max-width: 100px;
    max-height: 150px;
    vertical-align: middle;
}
</style>
