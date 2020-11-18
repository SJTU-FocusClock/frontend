<template>
	<view>
		
		
		<view class="user_avatar">
			<image class="avatar"  src="/static/avatar.png"></image>
		</view>
		
		<view class="nickname">
			<text>{{user.nickname}}</text>
		</view>
		
		<uni-list :border="false">
	   <uni-list-item :border="true" :show-extra-icon="true" :extra-icon="sex"  :title="user.sex" />
	 		<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="phone"  :title="user.phone" />
			<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="email"  :title="user.email"  />
		
		</uni-list>
		
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger" @fabClick="fabClick" />
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
				let that=this;
				uni.showModal({
					title: '提示',
					content: `${(e.item.text=="设闹钟")? '您点击了设闹钟' : '您确定删除该好友吗'}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定删除好友');
							uni.request({
								url:'http://106.54.76.21:8080/friends/remove/'+that.user.id,
								method:'DELETE',
								success:e=>{
									console.log(e);
									uni.navigateBack({
										
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消删除好友')
						}
					}
				})
			},
			fabClick() {
			},
		},
		onLoad(options){
			var info=JSON.parse(options.info);
			console.log("info",info);
			this.user=info;
			
			//处理性别
			this.user.sex=info.sex?'男':'女'
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
	
	
</style>
