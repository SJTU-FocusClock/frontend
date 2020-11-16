<template>

	<view>
		<drawer></drawer>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" title="时间设定" value="" placeholder="请输入您想要专注的分钟数/min" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>


		<uni-popup ref="whitelist" type="dialog">
			<uniPopupWhiteList mode="input" title="白名单设定" @confirm="dialogInputConfirm"></uniPopupWhiteList>
		</uni-popup>


		<view class="content">
			<image style="width: 600rpx;height: 600rpx;" src="../../static/avatar.png"> </image>
			<view class="mode">
				<switch :color="currentcolor" @change="change_mode"></switch>
				<text style="font-size: 30rpx; color: #808080;margin-top: 20rpx;">{{mode}}</text>
			</view>

			<uni-countdown :show-day="false" :hour="hour" :minute="minute" :second="second" @timeup="end"></uni-countdown>


			<view class="b">
				<!-- :style="{backgroundColor:stopcolor}" -->
				<button  :style="{backgroundColor:startcolor}" :disabled="isdisabled"  @click="set_time" class="my_button">开始专注</button>
				<button  :style="{backgroundColor:stopcolor}"  :disabled="!isdisabled" @click="stop" class="my_button">停止专注</button>
			</view>
			<text clickable @click="setwhite" style="font-size: 30rpx; color: #808080;margin-top: 20rpx;">设置白名单</text>
		</view>

	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupWhiteList from '@/components/uni-popup/uni-popup-whitelist.vue'
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	import drawer from '@/components/drawer.vue'


	const audio=uni.createInnerAudioContext();
	audio.src="http://mp3.9ku.com/hot/2004/07-17/41811.mp3";
	
	export default {
		components: {
			uniDrawer,
			uniNavBar,
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniCountdown,
			uniPopupWhiteList,
			drawer
		},
		data() {
			return {
				mode: "普通模式",
				value:1,
				value2:1,
				currentcolor:'#c4c4e9',
				disabledcolor:'#f5f1f0',
				startcolor:'#c4c4e9',
				stopcolor:'#f5f1f0',
				undo: {
					color: '#93989d',
					size: '22',
					type: 'undo'
				},
				hour: 0,
				minute: 0,
				second: 0,
				isdisabled: false
			
			}
		},
		methods: {
			onFinish() {
				uni.showToast({
					icon: 'none',
					title: '倒计时结束',
					duration:2000
				})
			},
			fillWithZero(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			confirm() {},
			set_time() {
				this.$refs.popup.open()
			},
			dialogInputConfirm(done, val) {
				console.log(val);
				this.isdisabled = true;
				this.hour = val / 60;
				this.minute = val - this.hour * 60;
				this.second = 0;
				 this.stopcolor=this.currentcolor;
				this.startcolor=this.disabledcolor; 
				done();
			},
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				this.msgType = 'info'
				this.message = '点击了对话框的取消按钮'
				this.$refs.popupMessage.open()
				// 需要执行 done 才能关闭对话框
				done()
			},

			change_mode(e) {
				if (e.target.value) {
					this.mode = "深度模式"
				}
				if (!e.target.value) {
					this.mode = "普通模式"
				}
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			end() {
				uni.showToast({
					title: "倒计时结束"
				})
				this.isdisabled = false;
				audio.play();
				uni.vibrateLong({
				    success: function () {
				        console.log('success');
				    }
				});
				console.log("end")
				this.stopcolor=this.disabledcolor;
				this.startcolor=this.currentcolor;
				console.log('endend')
			},
			stop() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: `中止专注吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.isdisabled = false;
							_this.stopcolor=_this.disabledcolor;
							_this.startcolor=_this.currentcolor; 
							console.log("pause")
							
							_this.value++;
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},

			setwhite() {
				// uni.showToast({
				// 	title:"设置白名单"
				// })
				this.$refs.whitelist.open()
			}
		},
		onHide() {
		audio.destroy();
		this.isdisabled=false;
		this.stopcolor=this.startcolor;
		this.startcolor=this.disabledcolor;
		/* uni.navigateTo({
			url:'pages/focus/fail',
			success: e=>{
				console.log(e)
			}
		}) */
		},
		onShow()
		{
			/* var style=getApp().globalData.style
			this.currentcolor=style;
			if(!this.isdisabled)
			{
				this.startcolor=this.currentcolor
			}
			console.log(this.currentcolor)
			 uni.setTabBarStyle({
				selectedColor:style
			});
			 uni.setNavigationBarColor({
				frontColor:'#ffffff',
				backgroundColor:style
			}); */
			
		
		}
		
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.content {
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.focus_content {

		display: flex;
		flex-direction: column;
		flex-grow: 1;
		margin: auto;
		width: 80%;

	}

	.time_setting {
		width: 80%;
		border: #808080;
		border-radius: 10rpx;
	}



	slider {
		width: 100%;
		margin: auto;
	}

	.my_button {
		margin-top: 10px;
		width: 100px;
		 background-color: #c4c4e9; 
		color: white;
		border:none;
		border-radius: 13px;
		margin: 10px;
		font-size: 40rpx;
	}

button[disabled]{
	background-color: #808080;
}

	.mode {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}

	.b {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
	}
	button{}
</style>
