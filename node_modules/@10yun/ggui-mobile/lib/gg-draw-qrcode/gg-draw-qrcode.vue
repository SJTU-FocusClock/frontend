<template>
  <view class="gg-draw-qrcode">
    <!-- #ifndef MP-ALIPAY -->
    <canvas class="gg-draw-qrcode_canvas " :canvas-id="cid" :style="{width:cpSize+'px',height:cpSize+'px'}" />
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <canvas :id="cid" :width="cpSize" :height="cpSize" class="gg-draw-qrcode_canvas " />
    <!-- #endif -->
    <image v-show="show" :src="result" :style="{width:cpSize+'px',height:cpSize+'px'}" />
    <!-- <image class="image" v-if="img" :src="img" :style="{width: sizeSync + 'px', height: sizeSync + 'px'}" /> -->
  </view>
</template>

<script>
import QRCode from './qrcode.js';
let qrcode
export default {
  name: 'GgDrawQrcode',
  props: {
    cid: {
      type: String,
      default: 'gg-draw-qrcode-canvas'
    },
    unit: {
      type: String,
      default: 'px'
    },
    show: {
      type: Boolean,
      default: true
    },
    val: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: '#ffffff'
    },
    foreground: {
      type: String,
      default: '#000000'
    },
    pdground: {
      type: String,
      default: '#000000'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 40
    },
    size: {
      type: Number,
      default: 200
    },
    lv: {
      type: Number,
      default: 3
    },
    onval: {
      type: Boolean,
      default: false
    },
    loadMake: {
      type: Boolean,
      default: false
    },
    usingComponents: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '二维码生成中'
    },
  },
  data() {
    return {
      result: '',
      img: '',
      sizeSync: 100
    }
  },

  watch: {
    size(newVal, oldVal) {
      if (newVal != oldVal && this.onval) {
        this.sizeSync = newVal;
        this.creatQrcode();
      }
    },
    val(newVal, oldVal) {
      if (newVal != oldVal && this.onval) {
        this.sizeSync = newVal;
        this._makeCode();
      }
    },
    icon(newVal, oldVal) {
      if (newVal != oldVal && this.onval) {
        this._makeCode();
      }
    }
  },
  computed: {
    cpSize() {
      if (this.unit == "upx") {
        return uni.upx2px(this.size)
      } else {
        return this.size
      }
    }
  },
  mounted() {
    if (this.loadMake) {
      if (!this._empty(this.val)) {
        setTimeout(() => {
          this._makeCode()
        }, 30);
      }
    }
  },
  created() {
    this.sizeSync = this.size;
    //this._makeCode();
  },
  methods: {
    creatQrcode() {
      let val = this.val + '';
      if (!val) {
        return;
      }
      let img = QR.createQrCodeImg(val, {
        size: parseInt(this.size)
      });
      this.img = img;
    },
    clearQrcode() {
      this.img = '';
    },
    _makeCode() {
      let that = this
      if (!this._empty(this.val)) {
        qrcode = new QRCode({
          context: that, // 上下文环境
          canvasId: that.cid, // canvas-id
          usingComponents: that.usingComponents, // 是否是自定义组件
          showLoading: that.showLoading, // 是否显示loading
          loadingText: that.loadingText, // loading文字
          text: that.val, // 生成内容
          size: that.cpSize, // 二维码大小
          background: that.background, // 背景色
          foreground: that.foreground, // 前景色
          pdground: that.pdground, // 定位角点颜色
          correctLevel: that.lv, // 容错级别
          image: that.icon, // 二维码图标
          imageSize: that.iconSize,// 二维码图标大小
          cbResult: function (res) { // 生成二维码的回调
            that._result(res)
          },
        });
      } else {
        uni.showToast({
          title: '二维码内容不能为空',
          icon: 'none',
          duration: 2000
        });
      }
    },
    _clearCode() {
      this._result('')
      qrcode.clear()
    },
    _saveCode() {
      let that = this;
      if (this.result != "") {
        uni.saveImageToPhotosAlbum({
          filePath: that.result,
          success: function () {
            uni.showToast({
              title: '二维码保存成功',
              icon: 'success',
              duration: 2000
            });
          }
        });
      }
    },
    _result(res) {
      this.result = res;
      this.$emit('result', res)
    },
    _empty(v) {
      let tp = typeof v,
        rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true
      } else if (tp == "undefined") {
        rt = true
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
      } else if (tp == "function") {
        rt = false
      }
      return rt
    }
  },
}
</script>

<style>
.gg-draw-qrcode {
  position: relative;
  display: flex;
  justify-content: center;
}
.gg-draw-qrcode_canvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}
</style>
