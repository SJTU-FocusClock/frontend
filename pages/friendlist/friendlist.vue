<template>
	<view>
		<uni-nav-bar  :status-bar="true"  :backgroundColor="color"  @clickLeft="back"  left-icon="arrowleft" left-text="返回"  :fixed="true" color="white" rightIcon="personadd" @clickRight="addNew">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
				<input confirm-type="search" class="nav-bar-input" type="text" style="color: #333333;" placeholder="输入手机号添加好友"   @confirm="confirm">
				<uni-badge class="mybadge" type="error" :text="request_num" size="small"></uni-badge>
			</view>
		</uni-nav-bar>
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.nickname" avatar="/static/avatar.png"
			   :clickable="true"  @click="jump_to_friend(item)"></uni-list-chat>
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
					listData:[],
					request_num:0,
					color:"#F08080",
				}
			},
			methods: {
				confirm(e) {		
					var target=e.target.value
					uni.navigateTo({
						url:'/pages/friendlist/searchInfo?target='+target,
					})
				},
				jump_to_friend(item){//跳转到好友信息页面
					console.log('好友', item);
					 //构造字符串
					 var info=JSON.stringify(item);
					 console.log(info);
					uni.navigateTo({
					                url: '/pages/friendlist/friendInfo?info='+info,
					            });	
				},
				addNew(e){
					uni.navigateTo({
					                url: '/pages/friendlist/requestlist',
					            });	
				},
				get_request(){
					//重复请求，之后优化
					let that=this;
					uni.request({
						url:'http://106.54.76.21:8080/friends/getRequestList',
						method:'GET',
						success:e=>{
							console.log("获取的请求信息",e.data)
							that.request_num=e.data.length
						}
					})
				}
			},
			onShow(){
				let that=this;
				uni.request({
					url:'http://106.54.76.21:8080/friends/list',
					method:'GET',
					success:e=>{
						console.log(e);
						that.listData=e.data;//将数据填入
						
					}
				})
				that.get_request()
				this.color=getApp().globalData.color
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
