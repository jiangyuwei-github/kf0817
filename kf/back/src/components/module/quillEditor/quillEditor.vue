<template>
<div>
    <!-- <p class="quill-tips">( 建议上传1000*1000px且小于5M的图片)</p> -->
        
    <div style="display:none">
        <Upload
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :with-credentials = 'true'
            :format="['jpg','jpeg','png','gif']"
            :max-size="5120"
            :action="exportUrl"
            >
            <Button icon="ios-cloud-upload-outline" ></Button>
        </Upload>
    </div>

    <quill-editor ref="QuillEditor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)" class="ql-editor">
    </quill-editor>

</div>

</template>

<script>
import VueCookie from 'vue-cookie';
import { quillEditor } from 'vue-quill-editor';
import { NODE_ALL_API } from '../../../api/index.js';

export default {
    props: {
        currentElement: Object, // 传入的当前对象
        intro: String
    },
    components: {
        quillEditor
    },
    computed: {
        editor() {
            return this.$refs.QuillEditor.quill;
        }
    },

    data: function() {
        return {
            exportUrl: 'http://pokerclubs.nooly.top/pokerclubs/open/common/upload',
            content: '',
            editorOption: {
                modules: {
                    toolbar:
                    {
                        container: [
                            [{'size': ['small', false, 'large']}],
                            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                            // [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'color': []}, {'background': []}],
                            // [{'align': []}], // 对齐方式 - 小程序不支持对其方式
                            ['clean'], // 清除文本格式
                            [/* {'script': "sub"}, */{'script': 'super'}], // 上标/下标
                            // [{'indent': "-1"}, { 'indent': "+1" }], // 缩进 - 小程序不支持对其方式
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            ['image']
                        ],
                        handlers: {
                            'image': function(value) {
                                if (value) {
                                    document.querySelector('.ivu-upload .ivu-btn').click();
                                } else {
                                    this.quill.format('image', false);
                                }
                            }
                        }
                    },
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    }
                }
            },
        };
    },
    mounted() {
        this.content = this.intro;
    },
    methods: {
        handleSuccess(res) {
            // 获取富文本组件实例
            let quill = this.$refs.QuillEditor.quill;
            // 如果上传成功
            if (res.data) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                let _imgUrl = "http://pokerclubs.nooly.top/pokerclubs/open/common/download/" +res.data
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', _imgUrl);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
            // 提示信息，需引入Message
                this.Message.error('图片插入失败');
            }
            this.$Spin.hide();
        },
        handleFormatError(file) {
            this.$Spin.hide();

            this.$Message.error({
                content: '上传格式错误<br/>支持格式：jpg,jpeg,png,gif文件大小：5MB以内',
                duration: 2
            });

            this.currentObj = '';
            this.filetype = '';
        },
        handleMaxSize(file) {
            this.$Spin.hide();
            this.currentObj = '';
            this.filetype = '';
            this.$Message.error({
                content: '上传格式错误<br/>支持格式：jpg,jpeg,png,gif文件大小：5MB以内',
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
                        h('div', '图片上传中...')
                    ]);
                }
            });
        },
        onEditorBlur: function(editor, html, text) {
            // console.log(html);
            // console.log(editor);
        },
        onEditorFocus: function(editor) {
            // console.log('editor focus!');
            // console.log(editor);
        },
        onEditorReady: function(editor) {
        },
        onEditorChange: function({editor, html, text}) {
            this.$emit('setGaikuan', html, this.currentElement ? this.currentElement : this);
        }
    },
    watch: {

        intro(newName, oldName) {
            // let imgUrl01 = 'https://dev-static.ezpo.com.cn/';
            // let imgUrl02 = 'https://static.ezpo.com.cn/';

            var imgReg = /<img.*?(?:>|\/>)/gi;
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr = newName.match(imgReg); // arr 为包含所有img标签的数组

            if (arr) {
                for (var i = 0, max = arr.length; i < max; i++) {
                    let tempImg = srcReg.exec(arr[i])[1];
                    // if (tempImg.indexOf(imgUrl01) == -1 && tempImg.indexOf(imgUrl02)) {
                        // newName = newName.replace(arr[i], '');
                        // let quill = this.$refs.QuillEditor.quill;
                        // quill.clipboard.dangerouslyPasteHTML(newName);
                        // let length = newName.length;
                        // quill.setSelection(length + 1);
                    // }
                }
            }
            this.content = newName;
        }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">

.ql-snow .ql-picker
    line-height: 24px
.ql-toolbar.ql-snow
    padding: 4px 8px !important
.ql-container
    height: 450px;
p.quill-tips
    font-size: 12px
    color: #bbb
</style>
