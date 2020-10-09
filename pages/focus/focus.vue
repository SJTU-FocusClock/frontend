<template>
	<view>
		<uni-nav-bar :status-bar="true" background-color="#c4c4e9" color="white" left-icon="bars" title="Focus" @clickLeft="showDrawer('showLeft')" />
		<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
			<view style="width: 250px;height: 150px;padding-left: 75px;padding-top: 50px;">
				<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png"
				 clickable @click="onClick"></image>
			</view>

			<uni-list :border="false">
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="chatboxes" clickable title="我的好友" @click="onClick1">
				</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="eye" clickable @click="onClick2" title="统计数据">
				</uni-list-item>

				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="gear" clickable @click="onClick3" title="设置">

				</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="undo" clickable @click="onClick4" title="退出登录">

				</uni-list-item>
			</uni-list>

		</uni-drawer>
		
		<uni-popup ref="popup" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="时间设定" value="" placeholder="请输入您想要专注的分钟数/min" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
			
		
		
		<view class="content">
			<image style="width: 600rpx;height: 600rpx;" src="../../static/avatar.png"> </image>
			<view class="mode">
				<switch color="#c4c4e9" @change="change_mode"></switch>
				<text style="font-size: 30rpx; color: #808080;margin-top: 20rpx;" >{{mode}}</text>
			</view>
			
			<uni-countdown  :show-day="false" :hour="hour" :minute="minute" :second="second" @timeup="end"></uni-countdown>
		
		
		<view class="b">
			<button :disabled="isdisabled" @click="set_time" class="my_button">开始专注</button>
			<button :disabled="!isdisabled" @click="stop" class="my_button"  >停止专注</button>
			</view>
			<text  clickable @click="setwhite"  style="font-size: 30rpx; color: #808080;margin-top: 20rpx;" >设置白名单</text>
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
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	
	export default {
		components: {
			uniDrawer,
			uniNavBar,
			uniIcons,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniCountdown
		},
		data() {
			return {
				showLeft: false,
				chatboxes: {
					color: '#93989d',
					size: '22',
					type: 'chatboxes'
				},
				eye: {
					color: '#93989d',
					size: '22',
					type: 'eye'
				},
				info: {
					color: '#93989d',
					size: '22',
					type: 'person'
				},
				gear: {
					color: '#93989d',
					size: '22',
					type: 'gear'
				},

				mode: "普通模式",

				undo: {
					color: '#93989d',
					size: '22',
					type: 'undo'
				},
				hour:0,
				minute:0,
				second:0,
				isdisabled:false
			}
		},
		methods: {
			onFinish() {
				uni.showToast({
					icon: 'none',
					title: '倒计时结束'
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
			onClick(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
					url: '/pages/userinfo/userinfo',
				});
			},
			onClick1(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
					url: '/pages/friendlist/friendlist',
				});
			},
			onClick2(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
					url: '/pages/data/data',
				});
			},
			onClick3(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
					url: '/pages/set/set',
				});
			},
			onClick4(e) {
				uni.showModal({
					title: '提示',
					content: `退出登录`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.redirectTo({
								url: '/pages/login/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			set_time(){
				this.$refs.popup.open()
			},
			dialogInputConfirm(done, val) {
				console.log(val);
				this.isdisabled=true;
				this.hour=val/60;
				this.minute=val-this.hour*60;
				this.second=0;
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
			end(){
				uni.showToast({
					title:"倒计时结束"
				})
			},
			stop(){
				let _this = this; 
				uni.showModal({
					title: '提示',
					content: `中止专注吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							uni.switchTab({
								url:"/pages/clocklist/clocklist"
							})
							}
						else if (res.cancel) {
							console.log('用户点击取消')
						}
						}
				})	
			},
			
			setwhite(){
				uni.showToast({
					title:"设置白名单"
				})
			}
		},
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
.time_setting{
	width:80%;
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
		border-radius: 10px;
		margin: 10px;
		font-size: 40rpx;
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


</style>
