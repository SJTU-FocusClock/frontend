<template>
	<view>
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.nickname" :avatar="item.avatar
			"   :clickable="true"  @click="onClick(item)"></uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
		import uniIcons from '@/components/uni-icons/uni-icons.vue'
		export default {
			components: {
				uniIcons,
			},
			onLoad(){
				let that = this
				uni.request({
					url:'http://106.54.76.21:8080/friends/getRequestList',
					method:'GET',
					success:(e)=> {
						console.log(e)
						e.data.map(item=>{
							that.listData.push({
								id:item.sendUser.id,
								nickname:item.sendUser.nickname,
								avatar:"/static/avatar.png"
							})
						})
					}
				})
			},
			data() {
				return {
					back() {
						uni.navigateBack({
							delta: 1
						})
					},
					listData:[],

				}
			},
			methods: {
				onClick(e){
					console.log('执行click事件', e.id)
					uni.navigateTo({
					                url: '/pages/friendlist/dealrequest?id='+e.id,
					            });	
				}
			}
		}
</script>

<style>

</style>

