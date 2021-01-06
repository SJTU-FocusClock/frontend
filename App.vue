<script>
	/* var Vconsole=require("node_modules/vconsole/dist/vconsole.min.js") */
	export default {
		onLaunch: function() {
			/* app启动时触发 */
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			//这里可以检测熄屏
			
		},
		globalData:{
			style:"food",
			color:"#F08080",
			index:0,
			whitelist:[],
			jumping:false,
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
