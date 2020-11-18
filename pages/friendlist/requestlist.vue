<template>
	<view>
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.sendUser.nickname" avatar="/static/avatar.png"
   :clickable="true"  @click="deal(item)"> </uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
		import uniIcons from '@/components/uni-icons/uni-icons.vue'
		export default {
			components: {
				uniIcons,
			},
			data() {
				return {
					back() {
						uni.navigateBack({
							delta: 1
						})
					},
					listData:[]
				}
			},
			methods: {
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
				uni.request({
					url:'http://106.54.76.21:8080/friends/getRequestList',
					method:'GET',
					success:e=>{
						console.log("获取的请求信息",e.data)
						that.listData=e.data;
					}
				})
			}
		}
</script>

<style>

</style>

