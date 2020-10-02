<template>
	<view class="all">
		
		
	<!-- 不显示天数 -->
	<uni-countdown :show-day="false" :hour="hour" :minute="minute" :second="second" ></uni-countdown>	
	<button>cancle</button>
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
			
		}
	}
</script>

<style>

	.all{
		display: flex;
		flex-direction: column;
		margin: 20%;
	}
	button{
		height: 40px;
		text-align: center;
		font-size: 15px;
		background-color:#AAAAFF;
		/* color:white */
	}
</style>