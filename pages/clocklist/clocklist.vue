<template>
	<view>
		<uni-nav-bar :status-bar="true" left-icon="bars" title="Clock" @clickLeft="showDrawer('showLeft')" />
		<view class="content">
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view style="width: 250px;height: 150px;padding-left: 75px;padding-top: 50px;">
					<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png" clickable @click="onClick"></image>
				</view>

				<uni-list :border="false">
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="chatboxes" clickable title="Friends"  @click="onClick1" >
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="eye" clickable @click="onClick2" title="Statistics">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="info"  clickable @click="onClick4" title="Userinfo">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="gear"  clickable @click="onClick3" title="Settings">
					</uni-list-item>
				</uni-list>

			</uni-drawer>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniDrawer,
			uniNavBar,
			uniIcons
		},
		data() {
			return {
				showLeft: false,
				chatboxes: {
					color: '#93989d',
					size: '22',
					type: 'chatboxes'
				},
				eye: {
					color: '#93989d',
					size: '22',
					type: 'eye'
				},
				info: {
					color: '#93989d',
					size: '22',
					type: 'person'
				},
				gear: {
					color: '#93989d',
					size: '22',
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
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
