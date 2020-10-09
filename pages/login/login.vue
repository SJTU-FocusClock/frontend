<template>
	<view>
		<view class="content">
			
			<view class = "avatar">
				<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png"
				 clickable @click="onClick"></image>
			</view>
			
			<view class="username">
				<view class="uni-input-wrapper">
					<input class="uni-input" placeholder="用户名" :value="inputClearValue" @input="clearInput" />
					<text class="uni-icon" v-if="showClearIcon" @click="clearIcon">&#xe434;</text>
				</view>
			</view>

			<view class="password">
				<view class="uni-input-wrapper">
					<input class="uni-input" placeholder="请输入密码" :password="showPassword" />
					<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
				</view>
			</view>

			<view class="buttons">
				<button type="primary" style="background-color: #aaaaff;" >登录</button>
				<button type="primary" style="background-color: #aaaaff;"> 注册</button>
			</view>

		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	export default {
		components: {

		},
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: true,
				inputClearValue: '',
				changeValue: '',
				showPassword: true,
				src: '../../../static/eye-1.png',
				platform: '',
				isNvue: false,
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.detail.value
			},
			replaceInput: function(event) {
				var value = event.detail.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.detail.value === '123') {
					uni.hideKeyboard();
				}
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			onFocus() {
				this.$mp.page.$getAppWebview().setStyle({
					softinputNavBar: 'none'
				})
			},
			onBlur() {
				this.$mp.page.$getAppWebview().setStyle({
					softinputNavBar: 'auto'
				})
			}
		},
		onLoad() {
			this.platform = uni.getSystemInfoSync().platform
			// #ifdef APP-PLUS-NVUE
			this.isNvue = true
			// #endif
		}
	}
</script>

<style scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.title {
		padding: 5px 13px;
	}

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 8px 13px;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		line-height: 24px;
		color: #999999;
	}

	.uni-eye-active {
		color: #aaaaff;
	}



	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		padding-top: 20rpx;
	}
	
	.avatar{
		padding-top: 100rpx;
	}
</style>
