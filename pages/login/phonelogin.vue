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
			
			<navigator url="/pages/login/Passwordlogin"   hover-class="none" style="font-size: 25rpx; color:#555555; margin-left: 100rpx;">用户名登录 </navigator>
			
			<span style="font-size: 25rpx; color:#555555; margin-left: 100rpx;" @click="oneclick">一键登录</span>
			 
			 <span class="warn" >{{result}}</span>
			
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
	const jv = uni.requireNativePlugin('JG-JVerification');

	export default {
		data() {
			return {
				//logo图片 base64
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
				result:'',
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
			isLogin() {
			},
			oneclick(){
				this.init();
				// this.setCustomUIWithConfig();
				this.loginAuth();
			},
			init(){
				let self = this;
				self.jv.init({
					timeout:7000,
					isProduction:false,
				},result=>{
					/* uni.showModal('init',JSON.stringify(result)); */
				});
			},
			// 一键登录
			loginAuth(){
				let self = this;
				self.jv.loginAuth({
					autoFinish:true,
					timeout:5000
				},result=>{
					/* uni.showModal('loginAuth',JSON.stringify(result)); */
					console.log('result',result)
				},event=>{
					console.log("loginAuthevent:"+JSON.stringify(event));
				})
			},
			startLogin(e) {
				let that=this;
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
					method:'POST',
					data: {
						phone: that.phoneData,
						password: that.passData,
					},
					header: {
		  		  'content-type': 'application/x-www-form-urlencoded'
					},
					success: function(e) {
						console.log(e)
						if(e.data.status==1)
						{
							console.log('登陆成功')
							uni.switchTab({
							url: "/pages/clocklist/clocklist"
						})
						}
						if(e.data.status==0)
						{
							
							that.result = e.data.result
							
						}
						
						
					}
				})


				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)



			},

// 自定义授权页面 UI 样式
			setCustomUIWithConfig(){
				let self = this;
				this.jv.addCustomViewsClickCallback(id=>{
					uni.showModal('customViewclick',"id:"+id);
				});
				if(uni.getSystemInfoSync().platform == "ios"){
					this.jv.setCustomUIWithConfigiOS({
						navColor:0xff000000,
						logBtnText:"极光认证测试",
						privacyState:true,
						appPrivacyColor:[0xff000200,0xff000000],
						addCustomViews:[{
								type:"label",
								width:120,
								height:20,
								top:320,
								left:100,
								backgroundColor:0xff7b68ee,
								text:"自定义label",
								textFont:20,
								textAlignment:15,
								numberOfLines:2,
								cornerRadius:10,
								textColor:0xff000000
							},
							{
								type:"button",
								id: "buttonTest",
								width:180,
								height:44,
								textColor:0xff000000,
								cornerRadius:22,
								left:50,
								bottom: -100,
								title:"点击测试",
								isFinish:true,  // 是否在授权页面通过自定义控件button的点击关闭授权页面
								backgroundImagePath: "../../../static/big.jpg", // button正常情况下背景图片路径
								// normalImagePath:"static/bg.jpeg"  // 设置button图片路径
							},
							{
								type:"imageView",
								width:50,
								height:50,
								cornerRadius:25,
								right:-100,
								bottom: -100,
								imagePath:"../../../static/qq.png"
							}]
					})
				}else{
					this.jv.addCustomViewsClickCallback(id=>{
						self.showModal('customViewclick',"id:"+id);
					});
					this.jv.setCustomUIWithConfigAndroid({
						setNavColor:0xff000000,
						setLogBtnText:" 极光认证测试 ",
						setPrivacyState:false,
						setAppPrivacyColor:[0xff00f000,0xff000000],
						setLogoImgPathFromJs:"../../../static/weixin.png",
						setLogBtnImgPathFromJs:"../../../static/login.png",
						setAuthBGImgPathFromJs:"../../../static/bg.jpeg",
						setLoadingViewEnable:true,
						setStatusBarTransparent:true,
						addCustomViews:[{
							type:"text",
							finishFlag:false,
							id:"id1",
							width:100,
							height:50,
							text:"自定义tv",
							textSize:20,
							align:15,
							margins:[0,100,0,0],
							bgColor:0xff7b68ee
						},
						{
							type:"image",
							finishFlag:true,
							id:"id2",
							width:50,
							height:50,
							align:13,
							margins:[0,0,0,0],
							bgImgPath:"../../../static/qq.png"
						}],
					})
				}
			},
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	.warn{
		color:#DD524D;
		font-size: 25rpx;
		margin-left: 100rpx;
	}
</style>
