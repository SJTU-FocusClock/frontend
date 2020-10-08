<template>
	<view>
		<uni-list :border="false">
			<uni-list-chat  v-for="item in listData" :avatar-circle="true" :key="item.id" :title="item.nickname" :avatar="item.avatar
			"   :clickable="true"  @click="onClick"></uni-list-chat>
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
						}
					]

				}
			},
			methods: {
				onClick(e){
					console.log('执行click事件', e.data)
					uni.navigateTo({
					                url: '/pages/friendlist/dealrequest',
					            });	
				}
			}
		}
</script>

<style>

</style>

