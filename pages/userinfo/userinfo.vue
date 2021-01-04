<template>
	<view>
		
		<view class="user_avatar">
			<image class="avatar"  :src="user.avatar"></image>
		</view>
		
		<view class="nickname">
			<text>{{user.nickname}}</text>
		</view>
		
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-info mode="input" title="修改信息" value=""  @confirm="dialogInputConfirm" ></uni-popup-info>
		</uni-popup>
		<uni-popup ref="popupe" type="dialog">
			<uni-popup-vemail mode="input" title="邮箱验证" value=""  @confirm="dialogInputConfirm" ></uni-popup-vemail>
		</uni-popup>
		
		
		<uni-list :border="false">
		<!-- 	<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="compose"  :title="user.intro"  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="person"  :title='user.sex+" / "+user.birthday'  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="location"  :title="user.adress"  /> -->
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="sex"  :title="user.sex" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="phone"  :title="user.phone" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="email"  :title="user.email"  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="credit"  :title="user.credit"  />
		</uni-list>
		
		<view class = "mybutton">
			<button :style="{'background-color':color}" class="mbutton" @click="set_info">编辑个人信息</button>
			<button :style="{'background-color':color}" class="mbutton" @click="veri_mail">绑定个人邮箱</button>
		</view>	
</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniPopupInfo from '@/components/uni-popup/uni-popup-info.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection,
			uniPopupInfo
		},
		data() {
			return {
				color:"",
				user:{
					nickname:"",
					intro:"Life is hard for everyone",
					phone:"",
					email:"19283746678@qq.com",
					avatar:"/static/avatar.png",
					credit:'',
					sex:''
				},
				email: {
					color: '#93989d',
					size: '22',
					type: 'email'
				},
				phone: {
					color: '#93989d',
					size: '22',
					type: 'phone'
				},
				compose: {
					color: '#93989d',
					size: '22',
					type: 'compose'
				},
				credit:{
					color: '#93989d',
					size: '22',
					type: 'star-filled'
				},
				sex:{
					color: '#93989d',
					size: '22',
					type: 'person'
				}
			
				
			}
		},
		methods: {
			set_info(){
				this.$refs.popup.open()
			},
			veri_mail(){
				this.$refs.popupe.open()
			},
			dialogInputConfirm(done, val) {
				console.log(val);
				let that=this;
				uni.request({
					url:'http://106.54.76.21:8080/users/alterInfo',
					method:'PUT',
					data:{
						nickname:val.name,
						sex:val.sex==='女'?false:true
					},
					success:e=>{
						console.log(e)
						that.user.nickname=val.name;
						that.user.sex=val.sex
					}
				})
				done();
			},
		},
		onShow(){
			this.color=getApp().globalData.color
			let that=this;
			uni.request({
				url:'http://106.54.76.21:8080/users/user',
				method:'GET',
				success:e=>{
					console.log(e)
					that.user.nickname=e.data.nickname;
					that.user.phone=e.data.phone
					that.user.credit=e.data.credit.toString()
					that.user.sex=e.data.sex?'男':'女'
					console.log(that.user)
				}
			})
		}
	}
</script>

<style>
	.avatar{
		width: 100px;
		height: 100px;
		border-radius:100px;
		margin-top: 90px;
	}
	
	.user_avatar{
		
		height: 200px;
		/* background-image: url(../../static/background.png); */
		padding-left: 110px;
	}
	
	.nickname{
		text-align: center;
		font-size: 20px;
		margin-bottom: 50px;
	}
	
	.mybutton{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		padding:50rpx
	}
	
	.mbutton{
		width:400rpx ;
		font-size: 40rpx;
		background-color:#c4c4e9 ;
		color: white;
	}
</style>
