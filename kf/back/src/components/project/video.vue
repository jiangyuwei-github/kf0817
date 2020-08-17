<template>
    <div>
        <!--导航-->
        <div class="console-bar">
            <head-bar :toptitle="'视频管理'"></head-bar>
            <left-bar :active="'video'" ></left-bar>
        </div>
        <div class="content">
            <div class="allTitle">视频管理</div>
            <Row>
                <Col span="20">
                  <div class="tip"><Icon type="md-arrow-back" />拖动下方模块可调整模块顺序</div>
                    <div class="tableBox">
                        <div class='itemCol title'>
                            <div class="item">图片</div>
                            <div class="item">视频名称</div>
                            <div class="item">状态</div>
                            <div class="item">操作</div>
                        </div>
                        <draggable  chosenClass="dd" v-model="tableData" @end='sortModule($event,tableData)' :options="{group:'people',animation:150}">
                            <template  v-for="(val,index) in tableData"  >
                                <div title="拖动可排序" class='itemCol' >
                                    <div class="item">
                                        <div class="itemBox"><img class="list-logo" :src="val.img"></div>
                                    </div>
                                     <div class="item">
                                         <div class="itemBox">{{val.content}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="itemBox">
                                            <i-switch size="large" v-model="val.viewStatus" @on-change="changeState(row)" :true-value="1" :false-value="0">
                                                <span slot="open">启用</span>
                                                <span slot="close">停用</span>
                                            </i-switch>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="itemBox">
                                            <Button type="text" style="margin-right: 5px" @click="edit(val)" >编辑</Button>
                                            <Button type="text" style="margin-right: 5px" @click="del(val,index)" >删除</Button>
                                            </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                  
                    <div style="margin-top: 20px" ><Button style="line-height: 30px" :size="'large'" type="dashed" long icon="md-add" @click="newAdd">新增</Button></div>
                </Col>
            </Row>
             
            <Modal v-model="modelFlag" :mask-closable = "false" title="设置" width=800 :footer-hide="true" class-name="vertical-center-modal" >
                <Form ref="banner" :model="currentData" :rules="ruleValidate" :label-width="80">
                    <FormItem label="视频封面" class="private-console-tips" prop="img">
                        <p class="console-tips">( 建议尺寸: 750*300像素，图片大小：5MB以下 )</p>
                        <img-cropper :width="750" :height="300" :propsImgList="currentData.img"  v-on:getImgFn="setkeyVisual" :croperId="'croperId02'"></img-cropper>
                        <Input v-model="currentData.img" style='display:none'></Input>
                    </FormItem>

                    <FormItem label="视频" prop="content">
                         <Upload 
                            action="//jsonplaceholder.typicode.com/posts/"
                             :before-upload="handleBeforeUpload"
                               :format="['mp4','mp3']"
                             >
                            <Button icon="ios-cloud-upload-outline">上传视频</Button>
                        </Upload>
                    </FormItem>
                    <div class="save" style="text-align:center"><Button type="primary" @click="submitFn" size='large'>保存</Button></div>
                </Form>
            </Modal>

        </div>

    </div>

</template>

<script>
import HeadBar from '../module/headBar/headBar.vue';
import leftBar from '../module/leftBar/leftBar.vue';
import imgCropper from '@/components/module/cropper/index.vue';
import quillEditor from '@/components/module/quillEditor/quillEditor.vue';
import { dataType } from '@/common/js/common.js';
import draggable from 'vuedraggable';
export default {
    data() {

        const arryNoEmpty = (rule, value, callback) => {
            if (value.length == '') {
                callback(new Error('请上传banner'));
            } else {
                callback();
            }
        };
        return {
            modelFlag:false,
            columns:[
                    {
                        title: '图片',
                        align: 'center',
                        slot: 'img'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        slot: 'state'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'oper'
                    }
            ],
            tableData:[
                {
                    viewStatus:1,
                    img:'https://static.ezpo.com.cn/static-picture/1591841536643.jpg',
                    content:"sfsa"
                },
                {
                    viewStatus:0,
                    img:'https://static.ezpo.com.cn/static-picture/1591841572375.jpg',
                    content:"加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右加是东奔西走茜右"
                }
            ],
            //当前操作数据
            currentData: {
                img: '',
                id:"",
                content:""
            },
            ruleValidate: {
                img: [{required: true, message: '请上传图片', transform: value => value ? value.trim() : '', trigger: 'change'}, { validator: arryNoEmpty, trigger: '' }],
            }
        };
    },
    components: {
        HeadBar,
        leftBar,
        imgCropper,
         draggable
    },
    mounted() {

    },
    methods: {
        setkeyVisual(imgArr) {
            this.currentData.img = dataType(imgArr) === 'array' ? imgArr.join(',') : '';
        },

        // 发布上线-下线
        changeState(item) {
            this.$Message.success('发布成功！');
        },
        //编辑
        edit(val){
            this.currentData.img =val.img
            this.currentData.id = ""
             this.currentData.content = val.content
            this.modelFlag = true
        },
        // 删除
        del(val,ind){
            this.$Modal.confirm({
                title: '您确认删除该条新闻?',
                content: '',
                onOk: () => {
                      this.$Message.success('删除成功！');

                    this.tableData.splice(ind,1); 
                    // deleteBanner({eventId: this.eventId, id: val}).then(res => {
                    //     if (res.state == '0') {
                    //         this.initMain();
                    //         this.$Message.success('删除成功！');
                    //     } else {
                    //         this.$Message.error({content: res.msg, duration: 3});
                    //     }
                    // });
                }
            });
        },
        // 模块排序
        sortModule(evt, arr) {
            console.log(arr);
        },
        //新增
        newAdd(){
            this.currentData.img = ""
            this.currentData.content = ""
            
            this.currentData.id = ""
            this.modelFlag = true
        },
        submitFn() {
            this.$refs.banner.validate((valid) => {
                if (valid) {
                    this.$Spin.show();
                    console.log(this.banner);
                } else {
                    this.$Message.error({content: '必填信息不完整', duration: 3});
                }
            });
        },
        handleBeforeUpload(file) { // 上传之前
            // this.$Spin.show({
            //     render: (h) => {
            //         return h('div', [
            //             h('Icon', {
            //                 'class': 'demo-spin-icon-load',
            //                 props: {
            //                     type: 'ios-loading',
            //                     size: 18
            //                 }
            //             }),
            //             h('div', '资料上传中...')
            //         ]);
            //     }
            // });
        },
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tableBox
    border:1px solid #e8eaec
    border-radius:5px
.tableBox .itemCol
    display :flex
    cursor:move
    line-height: 40px
    border-bottom:1px solid #e8eaec
    padding:0px 10px
    .item
        min-width:10%;
        flex:1;
        text-align:center;
        border-right:1px solid #e8eaec
        &:last-child
            border:none
    .itemBox
        padding:10px 0
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        widht:100%;
        height:60px;
.tableBox .title
    background :#f8f8f9;
    font-weight:bold;
    cursor:default;
    padding:0 10px
.tip
    color:#ff4f3e
    padding:10px 0;
    font-size:14px

.save{
    padding-left:30px
}

.list-logo{
    max-width: 100px;
    max-height: 150px;
    vertical-align: middle;
}
</style>

