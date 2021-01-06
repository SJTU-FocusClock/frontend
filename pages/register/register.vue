<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../static/avatar.png"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号"
				></wInput>
				
				<wButton
					class="wbutton"
					text="注 册"
					:rotate="isRotate" 
					bgColor="#c4c4e9"
					@click.native="startVali()"
				></wButton>
		
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入密码"
					isShowPass='ture'
				></wInput>
					
			</view>
				 <span class="warn" >{{result}}</span>
			<wButton 
				class="wbutton"
				text="注 册"
				:rotate="isRotate" 
				bgColor="#c4c4e9"
				@click.native="startReg()"
			></wButton>
			
			<!-- 底部信息 -->
	
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
				phoneData:'', // 用户/电话
				passData:'',
				isRotate: false, //是否加载旋转
				result:'',
				//validation code
				code:'',
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			getCode() {
				const randomStr = '00000' + Math.floor(Math.random() * 1000000)
				this.code = randomStr.substring(randomStr.length - 6)
			},
		    startReg() {
				//验证手机号码
				mysendSms(this.phoneData);
				
				//注册
				let that=this;
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				/* if (this.phoneData.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				} */
		       
			   uni.request({
			   	url:'http://106.54.76.21:8080/users/register',
				data:{
					phone:that.phoneData,
					password:that.passData
				},
				header: {
				'content-type': 'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(e){
					console.log(e)
					if(e.data.id)
					{
						console.log('登陆成功')
						uni.switchTab({
						url: "/pages/login/phonelogin"
					})
					}
					else 
					{						
						that.result = e.data.result
						
					}
				}
			   })
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				
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