<template>
	<view>
		<uni-nav-bar :status-bar="true" background-color="#c4c4e9"  color="white" left-icon="bars" title="Focus" @clickLeft="showDrawer('showLeft')" />
		<view class="content">
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view style="width: 250px;height: 150px;padding-left: 75px;padding-top: 50px;">
					<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png" clickable @click="onClick"></image>
				</view>

				<uni-list :border="false">
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="chatboxes" clickable title="我的好友"  @click="onClick1" >
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="eye" clickable @click="onClick2" title="统计数据">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="gear"  clickable @click="onClick3" title="设置">
						
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="undo"  clickable @click="onClick4" title="退出登录">
						
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
				gear: {
					color: '#93989d',
					size: '22',
					type: 'gear'
				},
				undo: {
					color: '#93989d',
					size: '22',
					type: 'undo'
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
				uni.showModal({
					title: '提示',
					content: `退出登录`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
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
