<template>
	<view class="page">
		<uni-nav-bar left-icon="back" left-text="返回" :backgroundColor="color" :status-bar="true" color="white" title="算术游戏" @clickLeft="back" />
		<view>
			请计算
		</view>
		<view class="content">
		{{first}}{{op}}{{second}}= 
		<input type="text" class="input" @input="onKeyInput" v-model="value"></input>
	</view>
	<button @click="submit">确定</button>
	</view>
	
	
</template>

<script>
	 import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components:{
				  uniNavBar
		},
		data() {
			return{
			first:0,
			second:0,
			result:0,
			max:20,
			min:0,
			myResult:null,
			value:"",
			op:"",
			color:''
			}
		},
		methods: {
			back(){uni.navigateBack({
				
			})},
			//其实这里没有用
			  onKeyInput: function(event) {
			            this.myResult = event.target.value
			        },
			restart() {
				var ope=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				this.first = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				this.second=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				if(ope%2==0)
				{
					this.op="+"
					this.result=this.first+this.second
				}
				else{
					this.op="-"
					this.result=this.first-this.second
				}
				this.value=null
				
			},
			submit(){
				console.log(parseInt(this.value))
				if(parseInt(this.myResult)==this.result)
				{
					uni.showToast({
						title:"right!"
					})
					uni.navigateBack({
					})
				}
				else{
					uni.showToast({
						title:"wrong!"
					})
					this.restart()
					
					
				}
			}
		},
		onShow(){
			var ope=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.first = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.second=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			if(ope%2==0)
			{
				this.op="+"
				this.result=this.first+this.second
			}
			else{
				this.op="-"
				this.result=this.first-this.second
			}
			this.color=getApp().globalData.color
		}
		}
</script>

<style>
	.page{
		display: flex;
		flex-direction:column;
		align-items: center;
		font-size: larger;
		font-family:'Courier New', Courier, monospace
	}
	.content{
		padding: 20rpx;
		display: flex;
		flex-direction:row;
		align-items: center;
		font-size: xx-large;
		justify-content: center;
		font-family:'Courier New', Courier, monospace
		
	}
	.input{
		width: 100rpx;
		font-size: xx-large;
		border:1px #0056B3 solid;
		border-radius: 10px;
		text-align: center;
		
		
	}

	button{
		width:400rpx
	}
</style>
