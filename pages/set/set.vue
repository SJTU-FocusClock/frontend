<template>
	<view>
		<uni-card title="主题风格">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<radio :value="item.value" :checked="index === current" :color="item.color" />
					<label class="la">{{item.name}}</label>
				</label>
			</radio-group>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				current: 0,
				items: [
					{
						value: 'purple',
						name:"紫色",
						color:'#aaaaff',
						checked:'true'
					},{
						value: 'green',
						color: '#00ff48',
						name:"绿色"

					},
					{
						value: 'yellow',
						checked: 'true',
						name:"黄色",
						color:'#ffd426'
					},
					
					{
						value: 'blue',
						color:'#55aaff',
						name:'蓝色'

					}
				]
			}
		},
		methods: {
			radioChange: function(evt) {
				console.log(evt.detail.value)
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
				if(evt.detail.value=='green')
				{
					getApp().globalData.style='#00ff48'
					uni.setTabBarStyle({
						backgroundColor:'#00ff48',
						selectedColor:'#00ff48'
					})
				}
				else if(evt.detail.value=='yellow')
				{
					getApp().globalData.style='#ffd426'
					uni.setTabBarStyle({
						backgroundColor:'#ffd426',
						selectedColor:'#ffd426'
					})
					uni.setNavigationBarColor({
						backgroundColor:'#ffd426'
					})
				}
				else if(evt.detail.value=='blue')
				{
					getApp().globalData.style='#55aaff'
					uni.setTabBarStyle({
						backgroundColor:'#55aaff',
						selectedColor:'#55aaff'
					})
				}
			},
			chooseStyle(item) {
				console.log(item)

			}
		}

	}
</script>

<style>
	radio {}
	.la{
		margin-right: 10px;
	}
</style>
