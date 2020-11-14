<template>
	<page-meta
	    root-font-size="16px"
	  >
	    <navigation-bar
		title="设置"
	        front-color="#ffffff"
	        :background-color="currentcolor"
	      />
	    </page-meta>
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
		
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger"/>
		
	</view>
</template>

<script>
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
				clockListData: [
					{
						id: 1,//闹钟id
						hour: 6,//小时
						minute: 30,//分钟
						state: 1,//闹钟状态，开1，关0
						tag: "睡觉", //备注
						ring: "tmp", //铃声
						isRing: 1, //是否响铃，开1，关0
						type: 1,//重复类型，1为每周重复，2为特定日期闹钟
						week: "11",//一周重复星期的参数
						date: "",//闹钟指定日期
					},
					{
						id: 2,//闹钟id
						hour: 14,//小时
						minute: 30,//分钟
						state: 1,//闹钟状态，开1，关0
						tag: "起床", //备注
						ring: "tmp", //铃声
						isShake: 1, //是否振动，开1，关0
						isRing: 1, //是否响铃，开1，关0
						type: 1,//重复类型，1为每周重复，2为特定日期闹钟
						week: "11",//一周重复星期的参数
						date: "",//闹钟指定日期
					},
				],
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
				]
			}
		},
		methods: {
			confirm() {},
			onClickClock(item) {
				console.log("点击闹钟进入编辑页面", item)
			},
			trigger(e) {
				console.log(e)
					uni.navigateTo({
						url:'/pages/normalclock/normalclock?id=0',
					});
			}			
		},
		onShow() {		
			var style=getApp().globalData.style
			console.log(style)
			 uni.setTabBarStyle({
				selectedColor:style
			}) 
			uni.setNavigationBarTitle({
				title:'Clock'
			})
			uni.setNavigationBarColor({
				frontColor:'#ffffff',
				backgroundColor:style,
				fail:event=>{
					console.log(event)
				},
				success:event=>{
					console.log(event)
				}
			})
			this.currentcolor=style
			this.pattern.buttonColor=style
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
