<template>
	<view>
		<uni-nav-bar  :status-bar="true"  backgroundColor="#c4c4e9"  @clickLeft="back"  left-icon="arrowleft" left-text="返回"  :fixed="true" color="white" rightIcon="personadd" @clickRight="addNew">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="nav-bar-input" type="text" style="color: #333333;" placeholder="输入手机号添加好友"   @confirm="confirm">
				<uni-badge class="mybadge" type="error" text="5" size="small"></uni-badge>
			</view>
		</uni-nav-bar>
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.nickname" :avatar="item.avatar
			"   :clickable="true"  @click="onClick"></uni-list-chat>
		</uni-list>
		
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
					back() {
						uni.navigateBack({
							delta: 1
						})
					},
					listData:[
						{
							id:1,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:2,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:3,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:4,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:5,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:6,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:7,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:8,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:9,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:10,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:11,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						},
						{
							id:12,
							nickname:"明月松间照",
							avatar:"/static/avatar.png"
						}						
					]

				}
			},
			methods: {
				confirm(e) {		
					var target=e.target.value
					uni.navigateTo({
						url:'/pages/friendlist/searchInfo?target='+target,
					})
				},
				onClick(e){
					console.log('执行click事件', e.data)
					uni.navigateTo({
					                url: '/pages/friendlist/friendInfo',
					            });	
				},
				addNew(e){
					console.log('执行click事件')
					uni.navigateTo({
					                url: '/pages/friendlist/requestlist',
					            });	
				}
			}
		}
</script>

<style>

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* width: 500rpx;
 */
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-uni-icon {
		line-height: 30px;
	}

	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 28rpx;
		background-color: #f8f8f8;
	}
	
	.mybadge{
		position: absolute;
		right: 10rpx;
	}
</style>
