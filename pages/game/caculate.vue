<template>
	<view class="page">
		<view>
			请计算
		</view>
		<view class="content">
		{{first}}+{{second}}= 
		<input type="number" class="input" @input="onKeyInput" v-model="value"></input>
	</view>
	<button @click="submit">确定</button>
	</view>
	
	
</template>

<script>
	
	export default {
		data() {
			return{
			first:0,
			second:0,
			result:0,
			max:20,
			min:0,
			myResult:null,
			value:""
			}
		},
		methods: {
			//其实这里没有用
			  onKeyInput: function(event) {
			            this.myResult = event.target.value
			        },
			restart() {
				this.first = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				this.second=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				this.result=this.first+this.second
				this.value=null
				
			},
			submit(){
				console.log(parseInt(this.value))
				if(parseInt(this.myResult)==this.result)
				{
					uni.showToast({
						title:"right!"
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
			this.first = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.second=Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.result=this.first+this.second
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
		
		
	}
	button{
		width:400rpx
	}
</style>
