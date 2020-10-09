<template>
	<view>
		
		
		<view class="user_avatar">
			<image class="avatar"  :src="user.avatar"></image>
		</view>
		
		<view class="nickname">
			<text>{{user.nickname}}</text>
		</view>
		
		<uni-list :border="false">
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="compose"  :title="user.intro"  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="person"  :title='user.sex+" / "+user.birthday'  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="location"  :title="user.adress"  />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="phone"  :title="user.phone" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="email"  :title="user.email"  />
		
		</uni-list>
		      <view class = "mybutton">
				  <button class="mbutton">同意</button>
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
				user:{
					nickname:"明月松间照",
					sex:"女",
					birthday:"2000-09-16",
					adress:"上海交通大学东27-809",
					intro:"Life is hard for everyone",
					phone:"19833337666",
					email:"19283746678@qq.com",
					avatar:"/static/avatar.png"
				},
				person: {
					color: '#93989d',
					size: '22',
					type: 'person'
				},
				email: {
					color: '#93989d',
					size: '22',
					type: 'email'
				},
				location: {
					color: '#93989d',
					size: '22',
					type: 'location'
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
			trigger(e) {
				console.log(e)
				uni.showModal({
					title: '提示',
					content: `${(e.item.text=="设闹钟")? '您点击了设闹钟' : '您确定删除该好友吗'}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			fabClick() {
			},
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
