<template>
	<view>
		
	<!-- 不显示天数 -->
	<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12" :show-colon="false"></uni-countdown>	
	<!-- 修改颜色 -->
	<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="1" :hour="2" :minute="30" :second="0"></uni-countdown>
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
				
			}
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>