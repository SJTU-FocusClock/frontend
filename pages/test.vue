<template>
	<view></view>
</template>

<script>
	export default{
		data(){
			return{
				bgAudioMannager:Object
			}
		},
		onShow() {
			var that=this
			this.bgAudioMannager = uni.getBackgroundAudioManager();
			this.bgAudioMannager.title = '致爱丽丝';
			this.bgAudioMannager.singer = '暂无';
			that.bgAudioMannager.src ='https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
			this.bgAudioMannager.play()
		}
	}
</script>

<style>
</style>
