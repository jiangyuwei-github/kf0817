<template>
    <div>
        <!--导航-->
        <div class="console-bar">
            <head-bar :toptitle="'新闻管理'"></head-bar>
            <left-bar :active="'new'" ></left-bar>
        </div>
        <div class="content">
            <!-- <div class="allTitle">新闻管理</div> -->
            <Row>
                <Col span="20">
                    <div >
                         <Row>
                            <Col span="12" class="tip"><Icon type="md-arrow-back" />拖动下方模块可调整模块顺序</Col>
                            <Col span="12" style="text-align:right"> <Button type="primary" @click="newAdd"  size="large"> 新增</Button></Col>
                        </Row>
                     
                    </div>
                    <div class="tableBox">
                        <div class='itemCol title'>
                             <div class="item">id</div>
                            <div class="item">标识</div>
                            <div class="item">创建人</div>
                            
                            <div class="item">状态</div>
                            <div class="item">操作</div>
                        </div>
                        <div style="text-align:center;padding:20px 0" v-if="tableData.length == 0">暂完数据</div>
                        <draggable  chosenClass="dd" v-model="tableData" @end='sortModule($event,tableData)' :options="{group:'people',animation:150}">
                            <template  v-for="(val,index) in tableData"  >
                                <div title="拖动可排序" class='itemCol' >
                                    <div class="item"><div class="itemBox">{{val.id}}</div></div>
                                     <div class="item">
                                         <div class="itemBox">{{val.title}}</div>
                                    </div>
                                    <div class="item">
                                         <div class="itemBox">{{val.creator}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="itemBox">
                                            <div class="changeWarp" >
                                                <i-switch size="large" v-model="val.onlineState" true-value="ONLINE" false-value="OFFLINE">
                                                    <span slot="open">启用</span>
                                                    <span slot="close">停用</span>
                                                </i-switch>    
                                                 <div class="changeSwit" @click="changeState(val)" ></div>
                                            </div>  
 
                                            
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
                  
                    <!-- <div style="margin-top: 20px" ><Button style="line-height: 30px" :size="'large'" type="dashed" long icon="md-add" @click="newAdd">新增</Button></div> -->
                </Col>
            </Row>
             
            <Modal v-model="modelFlag" :mask-closable = "false" title="新增" width=500 :footer-hide="true" class-name="vertical-center-modal" >
                <div style="max-height:500px;overflow: hidden;overflow-y: auto;">
                        <Form ref="banner" :model="currentData" :rules="ruleValidate" :label-width="70" heigh=500px>
                            <FormItem label="标识名"  prop="title">
                                <Input v-model="currentData.title" ></Input>
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

import { dataType } from '@/common/js/common.js';
import draggable from 'vuedraggable';
import { articleList ,save ,deleteItem,offline,online,sort} from '../../api/index.js';

export default {
    data() {
        return {
            modelFlag:false,
            tableData:[],
            //当前操作数据
            currentData: {
                title:""
            },
            ruleValidate: {
                title: [{required: true, message: '请输入标识名', trigger: 'blur', transform: value => value ? value.trim() : ''}],
            }
        };
    },
    components: {
        HeadBar,
        leftBar,
        draggable
    },
    mounted() {
        this.getList()
    },
    methods: {
        //获取列表
        getList(){
            articleList({}).then(res => {
                if (res.code == '200') {
                    res.data.sort(function( a,b){
                        return a.sort>b.sort
                    })
                    this.tableData = res.data
                } else {
                    this.$Message.error({content: res.msg, duration: 3});
                }
            });
        },
        // 发布上线-下线
        changeState(item) {
            var that = this
            if( item.onlineState == 'ONLINE'){
                that.$Spin.show();
                offline({id:item.id}).then(res => {
                    if (res.code == '200') {
                         that.getList();
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
                            that.getList();
                            that.$Message.success('上线成功！');
                        } else {
                            that.$Message.error({content: res.msg, duration: 3});
                        }
                        that.$Spin.hide();
                    });
            }

          
        },
        //编辑
        edit(val){
             this.$router.push({name: 'newEdit', query: {id: val.id}});
        },
        // 删除
        del(val,ind){
            var that = this
            this.$Modal.confirm({
                title: '您确认删除该条新闻?',
                content: '',
                onOk: () => {
                    that.$Spin.show();
                    deleteItem({id:val.id}).then(res => {
                        if (res.code == '200') {
                            that.tableData.splice(ind,1); 
                            that.$Message.success('删除成功！');
                        } else {
                            that.$Message.error({content: res.msg, duration: 3});
                        }
                        that.$Spin.hide();
                    });
                }
            });
        },
        // 模块排序
        sortModule(evt, arr) {
            var _arr = []
            arr.map(function(val){
                _arr.push(val.id)
                return val
            })

            sort({
                "ids":_arr,
            }).then(res => {
                if (res.code == '200') {
                    
                
                } else {
                    that.$Message.error({content: res.msg, duration: 3});
                }
                    that.$Spin.hide();
            });

            // console.log(_arr)
        },
        //新增
        newAdd(){
            this.currentData.title = ""
            this.modelFlag = true
        },

        //保存新增
        submitFn() {
            var that = this
            this.$refs.banner.validate((valid) => {
                if (valid) {
                        that.$Spin.show();
                        save({
                           "title":that.currentData.title,
                            "type": "PARENT"
                        }).then(res => {
                            if (res.code == '200') {
                                that.getList();
                                that.modelFlag = false
                            } else {
                                that.$Message.error({content: res.msg, duration: 3});
                            }
                             that.$Spin.hide();
                        });
                } else {
                  
                }
            });
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tableBox
    border:1px solid #e8eaec
    border-radius:5px
    margin-top:20px
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
.changeWarp
    position:relative
.changeSwit
    position: absolute
    left:0
    top:0
    height: 100%
    width: 100%
    cursor: pointer
.save{
    padding-left:30px
}

.list-logo{
    max-width: 100px;
    max-height: 150px;
    vertical-align: middle;
}
</style>
