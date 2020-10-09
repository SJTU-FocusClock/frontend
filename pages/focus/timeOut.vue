<template>
	<view class="all">
		
		
	<!-- 不显示天数 -->
<!-- 	<uni-countdown class="countDown" :show-day="false" :hour="hour" :minute="minute" :second="second" 
	backgroundColor="#efeff4"
	></uni-countdown>	 -->
	<uni-countdown :show-day="false" :hour="hour" :minute="minute" :second="second"></uni-countdown>
	<button @click="cancel">  cancel</button>
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
			cancel(){
				console.log("cancel")
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
		margin: 10%;
	}
	button{
		
		text-align: center;
		font-size: 15px;
		background-color:#AAAAFF;
		color:white;
		padding: 3px 15px;
	}
uni-countdown {
	text-align: center;
	font-size: 30px;
	margin-top: 30%;
	margin-bottom:30%;
}
</style>