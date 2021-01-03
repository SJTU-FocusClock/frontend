<template>
    <view class="content">
        <view class="uni-title uni-common-mt uni-common-pl">风格选择</view>
        <view class="uni-list">
            
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" >                            
                   <image :src="item.src"  :style="{'border':(item.checked?'solid #0056B3':'none')}"  mode="scaleToFill" @click="image_click(index)"></image>                  
                </label>   
        </view>
    </view>
</template>
 
<script>
	export default {
	    data() {
	        return {
	            items: [
					{
						src:"/static/clockicons/food.png",
						checked:true,
						name:"food"
					},
					{
						src:"/static/clockicons/planet.png",
						checked:false,
						name:"planet"
					},{
						src:"/static/clockicons/tree.png",
						checked:false,
						name:"tree"
					}
				],
	            current: 0
	        }
	    },
	    methods: {
			image_click(index)
			{
				console.log("click",index)
				this.items[this.current].checked=false
				this.items[index].checked=true
				this.current=index
				getApp().globalData.style=this.items[index].name
			}
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
		border:solid #0056B3;
		margin: 20rpx;
	}
</style>
