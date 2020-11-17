<template>
	<!-- 用于添加好友 -->
	<view>
		
		<view class="user_avatar">
			<image class="avatar"  :src="user.avatar"></image>
		</view>
		
		<view class="nickname">
			<text>{{user.nickname}}</text>
		</view>

		
		
		<uni-list :border="false">
		<!-- 	<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="compose"  :title="user.intro"  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="person"  :title='user.sex+" / "+user.birthday'  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="location"  :title="user.adress"  /> -->
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="sex"  :title="user.sex" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="phone"  :title="user.phone" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="email"  :title="user.email"  />
			<!-- 看不到好友的credit -->
			<!-- <uni-list-item :border="true" :show-extra-icon="true" :extra-icon="credit"  :title="user.credit"  /> -->
		</uni-list>
		
		<view class = "mybutton">
			<button class="mbutton" @click="add_friend">添加</button>
		</view>	
</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection,
		},
		data() {
			return {
				user:{
					nickname:"",
					phone:"",
					email:"19283746678@qq.com",
					avatar:"/static/avatar.png",
					credit:'',
					sex:'',
					id:0
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
				sex:{
					color: '#93989d',
					size: '22',
					type: 'person'
				},
				target:0
			
				
			}
		},
		methods: {
			add_friend(){
				let that=this
				uni.request({
					url:'http://106.54.76.21:8080/friends/sendRequest/'+that.user.id,
					method:'POST',
					success:(e)=> {
						console.log(e)
						if(e.data==true){
							uni.showToast({
								title:"发送请求"
							});  
							uni.navigateBack({								
							})
						}else{
							uni.showToast({
								title:"发送请求失败"
							}); 
						}
					}
				})
			}, 
		},
		onShow(){
		},
		onLoad(e) {
			let that=this;
			this.target=e.target;
			uni.request({
				url:'http://106.54.76.21:8080/friends/search',
				method:'GET',
				data:{
					phone:e.target
				},
				success:e=>{
					console.log(e)
					that.user.nickname=e.data.nickname;
					that.user.phone=e.data.phone
					that.user.sex=e.data.sex?'男':'女'
					that.user.id=e.data.id
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
		background-image: url(../../static/background.png);
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
