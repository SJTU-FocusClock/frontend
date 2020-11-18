<template>
	<view>
		<view class="user_avatar">
			<image class="avatar"  src="/static/avatar.png"></image>
		</view>
		
		<view class="nickname">
			<text>{{user.sendUser.nickname}}</text>
		</view>
		
		<uni-list :border="false">
		<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="sex"  :title="user.sendUser.sex" />
		<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="phone"  :title="user.sendUser.phone" />
		<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="email"  :title="user.sendUser.email"  />
		
		</uni-list>
		      <view class = "mybutton">
				  <button class="mbutton" @click="agree">同意</button>
				  <button class="mbutton">拒绝</button>
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
			uniSection
		},
		data() {
			return {
				user:{},//user指的是所有的信息
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
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#c4c4e9',
					buttonColor: '#c4c4e9'
				},
				content: [{
						iconPath: '/static/clock.png',
						selectedIconPath: '/static/clock.png',
						text: '设闹钟',
						active: false
					},
					{
						iconPath: '/static/dustbin.png',
						selectedIconPath: '/static/dustbin.png',
						text: '删除好友',
						active: false
					}
				]
			}
		},
		methods: {
agree(){
	let that=this;
	uni.request({
		url:'http://106.54.76.21:8080/friends/handle',
		method:'POST',
		header: {
		'content-type': 'application/x-www-form-urlencoded'
		},
		data:{
			requestId:that.user.id,
			type:1
		},
		success:e=>{
			if(e.data){
				//成功
				uni.showToast({
					title:'添加成功!',
				});
				uni.navigateBack({
					
				})
			}else{
				uni.showToast({
					title:'拒绝成功!',
				});
				uni.navigateBack({
					
				})
			}
		}
	})
}
		},
		onLoad(options){
		/* 	console.log("iinfo",options.info); */
			this.user=JSON.parse(options.info)
			this.user.sendUser.sex=this.user.sendUser.sex?'男':'女'
		/* 	console.log(this.user) */
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
		width:300rpx ;
		background-color:#c4c4e9 ;
		color: white;
	}
</style>
