<template>
    <div class="select-img-warp">
        <!--图片顺序可拖动-->
        <draggable style="display:inline-block" v-model="dataImgArr" @change="drapChange">
            <div class="choose-area choose-img-list" v-for="(item, index) in dataImgArr" :key="index">
                <img :src="item" :class="maxLimit > 1 ? 'img-drag' : ''" />
                <Icon class="allDetele" v-if="item" type="md-close" @click.native="delImg(index)"/>
            </div>
        </draggable>
        <!--添加图片-->
        <div class="choose-area choose-img-upload" v-show="maxLimit > dataImgArr.length">
            <Upload
                    multiple
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['doc','docx','xls','xlsx','ppt','pptx','pdf','jpg','jpeg','png']"
                    :max-size="15360"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    :action="exportUrl"
                    style="height:100px;width:100px;">
                    <div style="height:100px;width:100px;line-height: 100px;">
                        <Icon type="md-add" size="24" style="line-height:100px;color:#d9d9d9" ></Icon>
                    </div>
            </Upload>
        </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable';

import { dataType } from '@/common/js/common.js';

export default {
    props: {
        currentElement: Object, // 传入的当前对象
        propsImgList: { // 已有的图片列表
            type: [Array, String]
        },
        maxLimit: { // 图片最大数量， 默认最多9张
            type: Number,
            default: 1
        },
        original: {
            // 上传图片按照原始图片上传  -
            // 此属性与mode排斥， 如果为true则mode为默认值contain
            type: Boolean,
            default: false
        },
        croperId: {
            type: String,
            default: '1'
        }
    },
    computed: {
        dataImgArr: {
            get(val) {
                let _type = dataType(this.propsImgList);

                if (_type === 'string') {
                    return this.propsImgList ? this.propsImgList.split(',') : [];
                } else if (_type === 'array') {
                    return this.propsImgList;
                } else {
                    return [];
                }
            }
        }
    },
    data() {
        return {
            exportUrl: `/api/sysBasic/uploadFile?eventId=673`,
            fileTypeShow: true
        };
    },
    components: {
        draggable
    },
    methods: {
        /**
         * [drapChange 图片是否可拖动]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        drapChange(e) {
            if (this.maxLimit <= 1) { // 禁止拖动

            } else {
                this.dataImgArr.splice(e.moved.newIndex, 0, e.moved.element);
                this.dataImgArr.splice(e.moved.oldIndex + 1, 1);

                // this.dataImgArr.splice(e.moved.newIndex, 1, e.moved.element)
                this.$emit('getImgFn', this.dataImgArr, this.currentElement ? this.currentElement : this);
            }
        },

        handleSuccess(res, file) {
            if (res.state == '0') {
                console.log('d');
                console.log(res);

                this.dataImgArr.push(res.data);

                this.$emit('getImgFn', this.dataImgArr, this.currentElement ? this.currentElement : this);

                this.$Message.success('图片上传成功！');
            } else {
                this.$Message.error({content: 'SFASF', duration: 3});
            }
            this.$Spin.hide();
        },
        handleFormatError(file) {
            this.$Spin.hide();
            this.$Message.error({
                content: '上传格式错误<br/>支持格式：doc、docx、xls、xlsx、ppt、pptx、pdf文件大小：15MB以内',
                duration: 2
            });
        },
        handleMaxSize(file) {
            this.$Spin.hide();

            this.$Message.error({
                content: '上传文件过大<br/>请上传15MB以内',
                duration: 2
            });
        },
        handleBeforeUpload(file) { // 上传之前
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', '资料上传中...')
                    ]);
                }
            });
        },

        delImg(index) {
            this.dataImgArr.splice(index, 1);
            this.$emit('getImgFn', this.dataImgArr, this.currentElement ? this.currentElement : this);
        }

    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.choose-area
    width: 100px
    height: 100px
.img-drag
    cursor: move
.choose-img-list
    .allDetele
        display: none
    &:hover
        .allDetele
            display: inline-block
.crop-card
    font-size: 0px
    text-align: center
.cropper
    width: 850px
    height: 850px
    zoom: 0.5
.left-card
    display: inline-block
    vertical-align: top
.right-card
    margin-left: 60px
    display: inline-block
    vertical-align: top
    .show-preview
        border: 1px solid #E8EAEC
    .right-up
        margin-top: 20px
        text-align: center
        button
            width: 80px
.pre-title
    font-size: 14px
    height: 40px
    line-height: 40px
    text-align: left
.more-handle
    margin-top: 20px
    display: flex
    button
        flex: 1
.crop-title
    margin-top: 20px
    text-align: left
    font-size: 14px
    color: #ed4014
</style>
