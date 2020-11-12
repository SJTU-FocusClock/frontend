<!-- 
只是一个测试文件，之后会删掉。
						--曾靖茗
 -->
<template>
	<view>
	<button @click="shake">振动</button>
	</view>
</template>

<script>
	/* const audioContext = uni.createInnerAudioContext();
	audioContext.src ='http://mp3.9ku.com/hot/2004/07-17/41811.mp3';
	audioContext.play(); */
	export default{
		data(){
			return{
				audioContext:''
			} 
		},
		onShow(){
			this.audioContext = uni.createInnerAudioContext();
			this.audioContext.src ='http://mp3.9ku.com/hot/2004/07-17/41811.mp3';
			this.audioContext.play()
		},
		onHide(){
			this.audioContext.destroy()
		},
		methods:{
			getuserinfo() {
			   uni.login({
			   	  provider: 'weixin',
			   	  success: function (loginRes) {
			   	    	console.log(loginRes.authResult);
			   	    	
			   		    // 获取用户信息
			   		    uni.getUserInfo({
			   			      provider: 'weixin',
			   			      success: function (infoRes) {
			   			          console.log('用户昵称为：' + infoRes.userInfo.nickName);
			   			      }
			   			});
			   	  }
			   })
		},
		shake(){
			uni.vibrateLong({
			    success: function () {
			        console.log('success');
			    }
			});
		}
	},
	}
</script>

<style>
</style>
