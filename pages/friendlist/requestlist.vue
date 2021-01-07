<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="back" left-text="返回" :backgroundColor="color" :status-bar="true" color="white" title="好友请求"  />
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.sendUser.nickname" :avatar="item.path"
   :clickable="true"  @click="deal(item)"> </uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
		import uniIcons from '@/components/uni-icons/uni-icons.vue'
		import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
		export default {
			components: {
				uniIcons,
				uniNavBar
			},
			data() {
				return {
					back() {
						uni.navigateBack({
							delta: 1
						})
					},
					listData:[],
					color:"#F08080"
				}
			},
			methods: {
				back(){
					uni.navigateBack({		
					})
				},
				deal(item){
			 		//封装信息
					var info=JSON.stringify(item)
				/* 	console.log('info',info) */
					uni.navigateTo({
					                url: '/pages/friendlist/dealrequest?info='+info,
					            });	
				}
			},
			onShow(){
				let that=this;
				this.color=getApp().globalData.color
				uni.request({
					url:'http://106.54.76.21:8080/friends/getRequestList',
					method:'GET',
					success:e=>{
						that.listData=e.data;
						var i
						for(i in this.listData)
						{
							var k=i%10
							this.listData[i].path='/static/avatars/'+k.toString()+'.png'
						}
					}
				})
			}
		}
</script>

<style>

</style>

