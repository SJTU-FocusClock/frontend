<template>
	<view>
		<drawer :color="color"></drawer>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" title="时间设定" value="" placeholder="您想要专注的分钟/min" @confirm="dialogInputConfirm" ></uni-popup-dialog>
		</uni-popup>


		<uni-popup ref="whitelist" type="dialog">
			<uniPopupWhiteList mode="input" title="白名单设定" @confirm="confirmWhitelist"> </uniPopupWhiteList>
		</uni-popup>

		<uni-popup ref="dogs" type="dialog">
			<uniPopupDogs mode="input" title="选择宠物" @confirm="confirmDogs"> </uniPopupDogs>
		</uni-popup> 

       <uni-popup ref="jump" type="dialog">
			<uniPopupJump mode="input" title="跳转" @confirm="confirmJumps"> </uniPopupJump>
		</uni-popup>


		<view class="content">
			<image style="width: 400rpx;height: 400rpx;" :src="path" @click="chooseDogs"> </image>
			<view class="mode">
				<switch  @change="change_mode"></switch>
				<text style="font-size: 30rpx; color: #808080;margin-top: 20rpx;">{{mode}}</text>
			</view>

			<uni-countdown font="40px" :key="value"  :show-day="false" :hour="hour" :minute="minute" :second="second" @timeup="end" :backgroundColor="color"></uni-countdown>
 

			<view class="b">
				<button :style="{'background-color':!isdisabled?color:'#F5F5F5'}" :disabled="isdisabled"  @click="set_time" class="my_button">开始</button>
				<button :style="{'background-color':isdisabled?color:'#F5F5F5'}" :disabled="!isdisabled" @click="stop" class="my_button">停止</button>
			</view>
			<text  v-if="!isfocusing&&normal"  clickable @click="setwhite" style="font-size: 30rpx; color: #808080;margin-top: 20rpx;">设置白名单</text>
		</view>

        <image src="/static/fish.png" style="width: 100rpx;height: 100rpx;margin-left:320rpx ;margin-top: 40rpx;"
		 mode="scaleToFill"
		 @click="chooseJump"
		 v-if="normal&&isfocusing"
		 >
			
		</image>
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
    import uniPopupDogs from "@/components/uni-popup/uni-popup-dogs.vue"
	import uniPopupJump from "@/components/uni-popup/uni-popup-jump.vue"
	/* const audio=uni.createInnerAudioContext();
	audio.src="http://mp3.9ku.com/hot/2004/07-17/41811.mp3"; */
	
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
			drawer,
			uniPopupDogs,
			uniPopupJump
		},
		data() {
			return {
				path:"/static/dogs/2.png",
				mode: "普通模式",
				normal:true,
				hour: 0,
				minute: 0,
				second: 0,
				isdisabled: false,
				start:'',
				endd:'',
				duration:1,
			    value:0,
				color:"#cacaea",
				dog_index:2,
				isfocusing:false,
				whitelist:[],
				jump_timeout:0
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
			confirmDogs(done,val){
				var i=this.path.lastIndexOf('/')
				this.path=this.path.substring(0,i)+"/"+val.toString()+".png"
				this.dog_index=val
				done()
			},
			confirmWhitelist(done,val)
			{
				getApp().globalData.whitelist=val				
				done()
			},
			confirmJumps(done,val){
			
			},
			dialogInputConfirm(done, val) {
				this.isdisabled = true;
				this.hour = val / 60;
				this.minute = val - this.hour * 60;
				this.second = 0;
				 
				var tmp=new Date();	
				var h=tmp.getHours(); 
				var m=tmp.getMinutes();
				this.start=h+':'+m+':00';
				this.duration=val;
				this.path="/static/dogs/"+this.dog_index.toString()+".png"
				
				this.isfocusing=true//正在专注
				if(!this.normal) this.deep=true
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
					this.normal=false
				}
				if (!e.target.value) {
					this.mode = "普通模式"
					this.normal=true
				}
			},
			end() {
				let that=this;
				uni.showToast({
					title: "倒计时结束"
				})
				this.isdisabled = false;
				this.isfocusing=false;
				uni.vibrateLong({
				    success: function () {
				        console.log('success');
				    }
				});
				var tmp=new Date();
				var h=tmp.getHours();
				var m=tmp.getMinutes();
				this.endd=h+':'+m+':00';
				console.log(this.endd)
				uni.request({
					url:'http://106.54.76.21:8080/focus/addRecord',
					data:{
						start:that.start,
						end:that.endd,
						duration:that.duration					
					},
					method:'POST',
					header: {
					'content-type': 'application/x-www-form-urlencoded'
							},
							complete:e=>{
								
							},
					success:function(e) {
						if(e)
						{
							uni.showToast({
								title:'成功！'
							})
						}
					}
				})		
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
							
							_this.hour=0;
							_this.minute=0;
							_this.second=0;
							_this.value++;
							 var i=_this.path.lastIndexOf('.')
							 _this.path=_this.path.substring(0,i)+"_.png"
							 _this.isfocusing=false
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
			},
			chooseDogs(){
				this.$refs.dogs.open()
			},
			chooseJump(){
				this.$refs.jump.open()
				this.jump_timeout=setTimeout(this.stop_counting,300000,null)
		},
		isScreenOn() {   
		        if (typeof (plus) !== 'undefined') {  
		            var pm = plus.android.runtimeMainActivity()  
		                .getSystemService(plus.android.android.content.Context.POWER_SERVICE);  
		            return plus.android.invoke(pm, 'isScreenOn');  
		        }  
		        return true;  
		    },
			stop_counting()
			{
				//普通模式
				if(this.normal==true)
				{
				this.isdisabled=false;
				//???
				this.hour=0;
				this.minute=0;
				this.second=0;
				this.value++
				if(this.isfocusing){
					var i=this.path.lastIndexOf('.')
					this.path=this.path.substring(0,i)+"_.png" 
				}
				this.isfocusing=false 
				} 
			}
			  
		},
		onShow()
		{
			this.color=getApp().globalData.color
			getApp().globalData.jumping=false 
			clearTimeout(this.jump_timeout)
		},
		onHide() {
			console.log("hide:jump:",getApp().globalData.jumping)
			//深度模式并且不是熄屏才会停止,普通模式并且不是跳转出去的
			if((this.normal==false&&this.isScreenOn())||(this.normal==true&&!getApp().globalData.jumping))
		{
		this.isdisabled=false;
		//???
		this.hour=0;
		this.minute=0;
		this.second=0;
		this.value++
		if(this.isfocusing){
			var i=this.path.lastIndexOf('.')
		this.path=this.path.substring(0,i)+"_.png" 
		//console.log(this.path)
		}
		this.isfocusing=false 
			} 					
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
