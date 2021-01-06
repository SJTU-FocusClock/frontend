<template>
	<view>
	<uni-nav-bar left-icon="back" left-text="返回" :backgroundColor="color" :status-bar="true" color="white" title="设置" @clickLeft="back"  />
    <view class="content">
		
        <view class="uni-title uni-common-mt uni-common-pl">风格选择</view>
        <view class="uni-list"> 
            
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" >                            
                   <image :src="item.src"  :style="{'border':(item.checked?'solid #0056B3':'none')}"  mode="scaleToFill" @click="image_click(index)"></image>                  
                </label>   
        </view>
    </view>
	</view>
</template>
 
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
	    data() {
	        return {
				color:"#F08080",	
	            items: [
					{
						src:"/static/clockicons/food.png",
						checked:false,
						name:"food",
						color:"#F08080" 
					},
					{
						src:"/static/clockicons/planet.png",
						checked:false,
						name:"planet",
						color:"#00CED1"
					},{
						src:"/static/clockicons/tree.png",
						checked:false,
						name:"tree",
						color:"#3CB371"
					},
					{
						src:"/static/clockicons/newyear.png",
						checked:false,
						name:"newyear",
						color:"#A52A2A" 
					},
					{
						src:"/static/clockicons/ghost.png",
						checked:false,
						name:"ghost",
						color:"#000000"
					},
					{
						src:"/static/clockicons/child.png",
						checked:false,
						name:"child",
						color:"#FFA500"
					},
					{
						src:"/static/clockicons/view.png",
						checked:false,
						name:"view",
						color:"#87CEFA"
					},
					{
						src:"/static/clockicons/spot.png",
						checked:false,
						name:"spot",
						color:"#FFB6C1"
					}
				],
	            current:0,
	        }
	    },
	    methods: { 
			image_click(index) 
			{
				this.items[this.current].checked=false
				this.items[index].checked=true
				this.current=index
				getApp().globalData.style=this.items[index].name
				getApp().globalData.color=this.items[index].color
				getApp().globalData.index=this.items[index].index
				this.color=this.items[index].color
			},
			back(){uni.navigateBack({
				
			})}
	    },
		onShow()
		{
			this.color=getApp().globalData.color
		}
	}
</script>

<style>
	.content{
		padding: 20rpx;
	}
	image{
		width: 130rpx;
		height: 130rpx;
		margin: 20rpx;
	}
</style>
