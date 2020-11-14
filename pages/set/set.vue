<template>
	<page-meta
	    
	    root-font-size="16px"
	  >
	    <navigation-bar
		title="设置"
	        front-color="#ffffff"
	        :background-color="currentcolor"
	      />
	    </page-meta>
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
						color: '#83ff67',
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
				],
				currentcolor:'#aaaaff'
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
					getApp().globalData.style='#83ff67'
					this.currentcolor='#83ff67'
					uni.setTabBarStyle({
						backgroundColor:'#83ff67',
						selectedColor:'#83ff67'
					})
				}
				else if(evt.detail.value=='yellow')
				{
					getApp().globalData.style='#ffd426'
					this.currentcolor='#ffd426'
				}
				else if(evt.detail.value=='blue')
				{
					getApp().globalData.style='#55aaff'
					this.currentcolor='#55aaff'
				}
				else if(evt.detail.value=='purple')
				{
					getApp().globalData.style='#aaaaff'
					this.currentcolor='#aaaaff'
					uni.setNavigationBarTitle({
						title:'设置'
					})
					uni.setTabBarStyle({
						backgroundColor:'#aaaaff',
						selectedColor:'#aaaaff'
					})
				}
			},
			chooseStyle(item) {
				

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
