<template>
	<view class="all">
		
		
	<!-- 不显示天数 -->
	<uni-countdown :show-day="false" :hour="hour" :minute="minute" :second="second" 
	backgroundColor="#efeff4"
	></uni-countdown>	
	<button @click="cancle">  cancle</button>
	</view>
	
</template>
<script>
	import uniCountdown from "../../components/uni-countdown/uni-countdown.vue"
	export default{
		components:
		{
			uniCountdown
		},
		data(){
			return{
				hour,minute,second
			}
		},
		onLoad(options){
			var data=JSON.parse(options.value);
			this.hour=data/60;
			this.minute=data-hour*60;
			this.second=0;
		},
		methods:{
			cancle(){
				console.log("cancle")
				uni.navigateTo({
				                url: '/pages/focus/focus',
				            });
			}
		}
	}
</script>

<style>
page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.all{
		display: flex;
		flex-direction: column;
		margin: 20%;
	}
	button{
		
		text-align: center;
		font-size: 15px;
		background-color:#AAAAFF;
		color:white;
		padding: 3px 15px;
	}
</style>