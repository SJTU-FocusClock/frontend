<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/avatar.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="请输入手机号"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="请输入密码" isShowPass='ture'></wInput>
			</view>

			<navigator url="/pages/login/Passwordlogin" hover-class="none" style="font-size: 25rpx; color:#555555; margin-left: 100rpx;">用户名登录
			</navigator>

			<span style="font-size: 25rpx; color:#555555; margin-left: 100rpx;" @click="oneclick">一键登录</span>

			<span class="warn">{{result}}</span>

			<wButton class="wbutton" text="登 录" :rotate="isRotate" bgColor='#c4c4e9' @click="startLogin"></wButton>



			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/register/register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		univerifyLogin,
		univerifyErrorHandler
	} from '@/common/univerify.js'
	//const jv = uni.requireNativePlugin('JG-JVerification');

	export default {
		data() {
			return {
				//logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				result: '',
				jv
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {},
			oneclick() {
				univerifyLogin().catch(err => {
					if (typeof err === 'boolean') return;
					univerifyErrorHandler(err);
				})
				return;
			},

			startLogin(e) {
				let that = this;
				//登录
				console.log(that.passData)
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				/* if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				} */

				uni.request({
					url: 'http://106.54.76.21:8080/users/Plogin',
					method: 'POST',
					data: {
						phone: that.phoneData,
						password: that.passData,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(e) {
						console.log(e)
						if (e.data.status == 1) {
							console.log('登陆成功')
							uni.switchTab({
								url: "/pages/clocklist/clocklist"
							})
						}
						if (e.data.status == 0) {
							that.result = e.data.result
						}

					}
				})


				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)



			},
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");

	.warn {
		color: #DD524D;
		font-size: 25rpx;
		margin-left: 100rpx;
	}
</style>
