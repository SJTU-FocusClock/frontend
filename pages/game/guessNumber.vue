<template>
	<view class="page">
		<uni-nav-bar left-icon="back" left-text="返回" :backgroundColor="c" :status-bar="true" color="white" title="猜数字" @clickLeft="back" />
		<view>
			请猜数字
		</view>
		<view class="content">
			<input type="text" class="input" @input="onKeyInput" v-model="value"></input>
		</view>
		<button @click="initial">今日幸运数</button>
		<button @click="submit">确定猜测</button>
	</view>


</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components:{
				  uniNavBar
		},
		data() {
			return {
				first: 0,
				second: 0,
				result: 0,
				max: 100,
				min: 0,
				myResult: null,
				value: "",
				op: "",
				color:''
			}
		},
		methods: {
			back()
			{
				uni.navigateBack({
					
				})
			},
			//其实这里没有用
			onKeyInput: function(event) {
				this.myResult = event.target.value
			},
			initial(){
				this.result = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
				uni.showToast({
					title: "Ready!",
				})
			},
			restart() {			
				this.value = null
			},
			submit() {
				console.log(parseInt(this.value))
				if (parseInt(this.myResult) == this.result) {
					uni.showToast({
						title: "right!"
					})
				} else {
					if (parseInt(this.myResult) > this.result) {
						uni.showToast({
							title: "too large!"
						})
					} else {
						uni.showToast({
							title: "too small!"
						})
					}
					this.restart()
				}
			}
		},
		onShow() {
			this.color=getApp().globalData.color
			var ope = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.first = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			this.second = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
			if (ope % 2 == 0) {
				this.op = "+"
				this.result = this.first + this.second
			} else {
				this.op = "-"
				this.result = this.first - this.second
			}

		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: larger;
		font-family: 'Courier New', Courier, monospace
	}

	.content {
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: xx-large;
		justify-content: center;
		font-family: 'Courier New', Courier, monospace
	}

	.input {
		width: 100rpx;
		font-size: xx-large;
		border: 1px #0056B3 solid;
		border-radius: 10px;
		text-align: center;


	}

	button {
		width: 400rpx
	}
</style>
