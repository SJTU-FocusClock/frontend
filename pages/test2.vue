<template>
 <view>
	 <button ref="aa" :style="{'color':c}" @click="click">去掉
	 </button>
 </view>
</template>

<script>
  export default {
    data() {
      return {
		 c:'#aaaaaa',
        bgTextStyle: 'dark',
        scrollTop: '200rpx',
        bgColor: '#ff0000',
        bgColorTop: '#00ff00',
        bgColorBottom: '#0000ff',
        nbTitle: '标题',
        nbLoading: false,
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff'
      }
    },
    onLoad() {
    },
    methods: {
		click(){
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#0056B3"
			})
			
		}
    }
  }
</script>