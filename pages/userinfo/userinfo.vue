<template>
	<view>
		<view>
		
			<view class = "avatar">
				<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png"
				 clickable @click="onClick"></image>
			</view>
			
			<view >
				<uni-list :border="true">
					<uni-list-item :border="true" :show-extra-icon="true" :extra-icon="chatboxes" clickable @click="onClick1" 
					title="Admin" note="username">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="sex" clickable @click="onClick2" 
					title="Female" note="gender">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="mail"  clickable @click="onClick4" 
					title="Admin@123.com" note="email(can find password back)">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="phone"  clickable @click="onClick3" 
					title="155****7777" note="bindage phone number">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="changeInfo">
				<button type="primary" style="background-color: #aaaaff;font-size:'10'; ">修改</button>
			</view>
		
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			
		},
		data() {
			return {
				showLeft: false,
				chatboxes: {
					color: '#93989d',
					size: '10',
					type: 'chatboxes'
				},
				sex: {
					color: '#93989d',
					size: '10',
					type: 'person'
				},
				mail: {
					color: '#93989d',
					size: '10',
					type: 'email'
				},
				phone: {
					color: '#93989d',
					size: '10',
					type: 'phone'
				},
				eye: {
					color: '#93989d',
					size: '10',
					type: 'eye'
				},
				info: {
					color: '#93989d',
					size: '10',
					type: 'person'
				},
				gear: {
					color: '#93989d',
					size: '10',
					type: 'gear'
				}
			}
		},
		methods: {
			confirm() {},
			onClick(e){
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/userinfo/userinfo',
				            });	
			},
			onClick1(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/friendlist/friendlist',
				            });
			},
			onClick2(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/data/data',
				            });
			},
			onClick3(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/set/set',
				            });
			},
			onClick4(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/userinfo/userinfo',
				            });
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			}
		},
	}
</script>

<style>

.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.avatar{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
		padding-bottom: 30rpx;
	}
	.changeInfo{
		padding-top: 40rpx;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	}
	
</style>
