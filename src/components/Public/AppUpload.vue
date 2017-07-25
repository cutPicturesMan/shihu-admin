<template>
  <div class="">
    <div class="demo-upload-list" v-for="(item, index) in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="'http://localhost:3000/' + item.thumb_url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      action="upload/"
      name="img_list"
      :max-size="5120"
      :format="['jpg','jpeg','png']"
      :show-upload-list="false"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :multiple="isMultiple"
      type="drag"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal class="upload-img-prompt" title="查看图片" v-model="visible">
      <transition name="fade">
        <img :src="'http://localhost:3000/' + showUrl" v-if="visible" style="width: 100%">
      </transition>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 上传图片数量
      imgLength: {
        type: Number,
        default: 8
      },
      // 已经上传的图片
      imgList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        showUrl: '',
        visible: false,
        uploadList: []
      };
    },
    computed: {
      // 如果上传图片数量大于一张，表示upload是multiple的
      isMultiple () {
        return this.imgLength > 1;
      }
    },
    methods: {
      handleView (url) {
        this.showUrl = url;
        this.visible = true;
      },
      // 删除数据
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.$emit('upload-delete', fileList);
      },
      // 文件上传成功
      handleSuccess (res, file, fileList) {
        file.url = res.result[0].url;
        file.thumb_url = res.result[0].thumb_url;
        // 向上传递图片地址列表对象
        this.$emit('upload-success', fileList);
      },
      // 文件上传失败
      handleError (res, file) {
        this.$Notice.warning({
          title: '上传发生错误',
          desc: res
        });
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.imgLength;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 ' + this.imgLength + ' 张图片。'
          });
        }
        return check;
      }
    },
    mounted () {
      this.$refs.upload.fileList = this.imgList;
      this.uploadList = this.$refs.upload.fileList;
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .upload-img-prompt {
    .ivu-modal-mask,
    .ivu-modal-wrap {
      z-index: 2000;
    }
  }
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
