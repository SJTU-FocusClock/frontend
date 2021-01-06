<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text" :class="['uni-popup__'+dialogType]">{{title}}</text>
		</view>

		<view class="uni-dialog-content">
			<!-- <text class="uni-dialog-content-text" v-if="mode === 'base'">{{content}}</text>
			<input v-else class="uni-dialog-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus" > -->
			<view>请在5分钟内回来</view>
			<checkbox-group @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.value">
						<image :src="item.src"  v-if="item.show" mode="scaleToFill" @click="JumpTo(item.name)"></image> 			
				</label>
			</checkbox-group>
		</view>


		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button" @click="close">
				<text class="uni-dialog-button-text">取消</text>
			</view>
			<view class="uni-dialog-button uni-border-left" @click="onOk">
				<text class="uni-dialog-button-text uni-button-color">确定</text>
			</view>
		</view>

	</view>
</template>

<script>

	export default {
		name: "uniPopupJump",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: "",
				current:0,
				whitelist:[],
				items: [
					{
						src:"/static/jump/weixin.png",
						name:"weixin",
						show:false
					},
					{
						src:"/static/jump/QQ.png",
						name:"QQ",
						show:false
					},
					{
						src:"/static/jump/taobao.png",
						name:"taobao",
						show:false
					},
					{
						src:"/static/jump/weibo.png",
						name:"weibo", 
						show:false
					},
					{
						src:"/static/jump/QQmusic.png",
						name:"QQmusic",
						show:false
					},
					{
						src:"/static/jump/baiduMap.png",
						name:"baiduMap",
						show:false
					},
					{
						src:"/static/jump/wangyimusic.png",
						name:"wangyimusic",
						show:false
					},
					{
						src:"/static/jump/elm.png",
						name:"elm",
						show:false
					},
					{
						src:"/static/jump/meituan.png",
						name:"meituan",
						show:false
					},
					
				]
			}
		}, 
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			} 
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
			
			//显示
			this.whitelist=getApp().globalData.whitelist
			console.log(this.whitelist)
			var res=this.whitelist.some(item => {
				var i
				for(i in this.items)
				{
					if(this.items[i].name==item)
					{
						this.items[i].show=true
					}
				}
			})
		},
		mounted() {
			this.focus = true 
		},
		methods: {
			JumpTo(dst)
			{
				getApp().globalData.jumping=true
				console.log('dst',dst)
				var pname
				var action
				if(dst=='taobao') {
					pname='com.taobao.taobao'
					action='taobao://' 
				}
				else if(dst=='weibo') {
					pname='com.sina.weibo'
					action='weibo://' 
				}
				else if(dst=='weixin') {
					pname='com.tencent.mm'
					action='mm://' 
				}
				else if(dst=='baiduMap') {
					pname='com.baidu.BaiduMap'
					action='BaiduMap://' 
				}
				else if(dst=='QQmusic') {
					pname='com.tencent.qqmusic'
					action='qqmusic://' 
				}
				else if(dst=='QQ') {
					pname='com.tencent.mobileqq'
					action='mobileqq://' 
				}
				else if(dst=='wangyimusic') {
					pname='com.netease.cloudmusic'
					action='cloudmusic://' 
				}
				else if(dst=='elm') {
					pname='com.me.ele'
					action='ele://' 
				} 
				else if(dst=='meituan') {
					pname='com.sankuai.meituan'
					action='meituan://' 
				}
				plus.runtime.launchApplication( {pname:pname,action:action},
				 err=>{
				 	console.log(err)  
				 })
				 this.popup.close()
			},
			/** 
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
				}, this.current) 
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					},false)
					return
				}
				this.popup.close()
			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
image{
	width:100rpx;
	height:100rpx;
}
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>
