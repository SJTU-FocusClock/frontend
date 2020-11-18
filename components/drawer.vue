<template>
	<view>
	<uni-nav-bar :status-bar="true" color="white" backgroundColor='#c4c4e9' left-icon="bars" title="Clock" @clickLeft="showDrawer('showLeft')" />
	<view class="content">
		<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
			<view style="width: 250px;height: 150px;padding-left: 75px;padding-top: 50px;">
				<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../static/avatar.png" clickable @click="onClick"></image>
			</view>
			<uni-list :border="false">
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="chatboxes" clickable title="我的好友"  @click="onClick1" >
				</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="eye" clickable @click="onClick2" title="统计数据">
				</uni-list-item>
			<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="clock"  clickable @click="onClick6" title="闹钟请求">
						
			</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="gear"  clickable @click="onClick3" title="设置">
					
				</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="person"  clickable @click="onClick5" title="个人信息">
					
				</uni-list-item>
				<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="undo"  clickable @click="onClick4" title="退出登录">
			
				</uni-list-item>
			
			</uni-list>
		</uni-drawer>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
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
				},
				person:{
					color: '#93989d',
					size: '22',
					type: 'person'
				},
				clock:{
					color: '#93989d',
					size: '22',
					type: 'flag-filled'
				}
			}
		},
		methods:{
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
			onClick5(e)
			{
					uni.navigateTo({
					                url: '/pages/userinfo/userinfo',
					            });
			},
			onClick4(e) {		
				console.log('执行click事件', e.data)
				uni.showModal({
					title: '提示',
					content: `退出登录`,
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url:'http://106.54.76.21:8080/users/logout',
								
							})
							uni.redirectTo({
															url:'/pages/login/phonelogin'
														})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			
			},
			onClick6(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/clocklist/handlerequest',
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
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
</style>
