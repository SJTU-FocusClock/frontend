<!-- 用户名登录 -->
<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/avatar.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="usernameData"
					type="text"
					
					placeholder="请输入用户名"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入密码"
					isShowPass='ture'
				></wInput>
			</view>
			<navigator url="/pages/login/phonelogin"   hover-class="none" style="font-size: 25rpx; color:#555555; margin-left: 100rpx;">手机号登录 </navigator>
				 <span class="warn" >{{result}}</span>
			
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate" 
				bgColor='#c4c4e9'
				@click="startLogin"
			></wButton>
			
			
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				//logo图片 base64
				usernameData:'', //用户名
				passData:'', //密码
				isRotate: false, //是否加载旋转
				result:''
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
			isLogin(){
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
		    startLogin(e){
               let that=this;
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.usernameData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				
				uni.request({
					url:'http://106.54.76.21:8080/users/Ulogin',
					data:{
						username:that.usernameData,
						password:that.passData
					},
					method:'POST',
					header: {
					'content-type': 'application/x-www-form-urlencoded'
							},
					complete: e=>{
						
					},
					success: function(e){
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
				
				
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				
				// uni.showLoading({
				// 	title: '登录中'
				// });
				// getLogin()
				// .then(res => {
				// 	//console.log(res)
				// 	//简单验证下登录（不安全）
				// 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
				// 		let userdata={
				// 			"username":res.data.username,
				// 			"nickname":res.data.nickname,
				// 			"accesstoken":res.data.accesstoken,
				// 		} //保存用户信息和accesstoken
				// 		_this.$store.dispatch("setUserData",userdata); //存入状态
				// 		try {
				// 			uni.setStorageSync('setUserData', userdata); //存入缓存
				// 		} catch (e) {
				// 			// error
				// 		}
				// 		uni.showToast({
				// 			icon: 'success',
				// 			position: 'bottom',
				// 			title: '登录成功'
				// 		});
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}else{
				// 		_this.passData=""
				// 		uni.showToast({
				// 			icon: 'error',
				// 			position: 'bottom',
				// 			title: '账号或密码错误，账号admin密码admin'
				// 		});
				// 	}
				// 	uni.hideLoading();
				// }).catch(err => {
				// 	uni.hideLoading();
				// })
				
		    }
		
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
