<template>
	<view>
		<drawer></drawer>
		
		<uni-list class="clockList">
			<uni-list-item class="clockListItem" v-for="item in clockListData"
				:clickable="true" @click="onClickClock(item)" 
				:title="item.hour+':'+item.minute" :note="item.tag">
				<template v-slot:header>
					<text v-if="item.hour < 12">上午</text>
					<text v-else font-size="small">下午</text>
				</template>
				<template v-slot:footer>
					<image src="../../static/avatar.png" class="clock-img"></image>
				</template>
			</uni-list-item>
		</uni-list>
		
		<uni-fab  :key="value" v-if="hackReset" ref="fab" :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger"/>
		
	</view>
</template>

<script>
	const audio = uni.getBackgroundAudioManager();
	/* audio.src='/static/music/morning.mp3';
	audio.stop(); */
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import drawer from "@/components/drawer.vue"
	export default {
		components: {
			uniDrawer,
			uniNavBar,
			uniIcons,
			drawer
		},
		data() {
			return {				
				currentcolor:'',
				hackReset:true,
				value:1,
				onshowSet:false,
				clockListData: [],
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#c4c4e9',
					buttonColor: '#c4c4e9'
				},
				content: [
					{
						iconPath: '/static/clock2.png',
						selectedIconPath: '/static/clock2.png',
						text: '闹钟',
						active: false
					}
				],
				gamepages:[
					'/pages/game/caculate',/* 本来应该是随机游戏 */
					'/pages/game/game2048',
					'/pages/game/caculate',
					'/pages/game/typist',
					'/pages/game/puzzle',
					'/pages/game/catchMouse'
								
				],
				ringsrc:[
					'/static/music/Breeze.mp3',
					'/static/music/cute.mp3',
					'/static/music/heartbeats.mp3',
					'/static/music/morning.mp3',
					'/static/music/Oops.mp3',
					'/static/music/Solstice.mp3'
				]
			}
		},
		methods: {
			confirm() {},
			onClickClock(item) {
				console.log("点击闹钟进入编辑页面", item)
				var i=item.id.toString()
				uni.navigateTo({
					url:'/pages/normalclock/modifyclock?id='+i
				})
			},
			trigger(e) {
				console.log(e)
					uni.navigateTo({
						url:'/pages/normalclock/normalclock?id=0',
					});
			},
			set_clock(){
				let that=this;
				console.log(this.clockListData);
				var date=new Date();
				var current_week=date.getDay();//星期几
				//周日
				if(current_week==0){
					current_week=7;
				}
				console.log("currentweek",current_week)
				for(var i=0;i<this.clockListData.length;i++)
				{
					var c=this.clockListData[i];
					/* console.log("c",c) */
					var h=c.time.substr(0,2);
					var m=c.time.substr(3,2)
					//看是否是今天的闹钟
					if((c.week>>(current_week-1))&1)
					{
						//如果是才设置定时器
						console.log("c",c)
						var clock_date=new Date;
						clock_date.setHours(parseInt(h),parseInt(m),0);
						console.log(clock_date);
						
						var slice=date-clock_date;//时间差
						console.log("slice",slice);
						
						//slice为负数说明在今天要响
						if(slice<0)
						{
							setTimeout(that.ring_clock,-slice,c);
						}	
					}
				}
			},
			set_audio(){
				
			},
			ring_clock(c){
				uni.showToast({
					title:'闹钟响了！'
				});
				//跳转到游戏页面
				audio.src=this.ringsrc[c.ring];
				audio.play();
				console.log("jump to ",this.gamepages[c.gameid])
				uni.navigateTo({
					url:this.gamepages[c.gameid]
			})
		},
		onShow() {
			let that=this;
			uni.request({
				url:'http://106.54.76.21:8080/clocks/clockList',
				method:'GET',
				header: {
				'content-type': 'application/x-www-form-urlencoded'
						},
				success: function(e){
					that.clockListData=e.data
					for(var i=0;i<e.data.length;i++)
					{
						var tmp=parseInt(that.clockListData[i].time.substr(0,2));
						that.clockListData[i].hour=tmp
						that.clockListData[i].minute=that.clockListData[i].time.substr(3,2)
					}
				if(true)/* !that.onsetshow */
				{
					that.set_clock();
					that.onshowSet=true;
				}								
				}
			});
			
		}
	},
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

	
	.clock-img {
		height: auto;
		width: 20%;
	}
	
	.clockList
	/* .uni-list */
	.uni-list-item__content-title {
		font-size:xx-large;
		margin-left: 10px;
	}
	
	
</style>
