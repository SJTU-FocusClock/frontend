<template>
	<view>
		<uni-nav-bar :status-bar="true" left-icon="bars" title="Clock" @clickLeft="showDrawer('showLeft')" />
		<view class="content">
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view style="width: 250px;height: 150px;padding-left: 75px;padding-top: 50px;">
					<image style="width: 100px; height: 100px; border-radius:100px;" :mode="'scaleToFill'" src="../../static/avatar.png" clickable @click="onClick"></image>
				</view>
				<uni-list :border="false">
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="chatboxes" clickable title="Friends"  @click="onClick1" >
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="eye" clickable @click="onClick2" title="Statistics">
					</uni-list-item>
					<uni-list-item :border="false" :show-extra-icon="true" :extra-icon="gear"  clickable @click="onClick3" title="Settings">
						
					</uni-list-item>
				</uni-list>
				
			</uni-drawer>
		</view>
		
		<uni-list class="clockList">
			<uni-list-item class="clockListItem" v-for="item in clockListData"
				:clickable="true" @click="onClickClock" 
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
		
		<!-- <view class="clockList">
			<view class="clockListItem" v-for="item in clockListData">
				<view class="VMAM">
					<text v-if="item.hour < 12">上午</text>
					<text v-else>下午</text>	
				</view>
				<view class="timeAndDay">
					<text class="time">{{item.hour}}:{{item.minute}}</text>
					<text class="day">{{item.week}}</text>
				</view>
			</view>
			
			
		</view> -->
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="left" vertical="bottom" direction="horizontal" @trigger="trigger"/>
		
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	//import DateTimePicker from "@/components/bory-dateTimePicker/bory-dateTimePicker.vue"

	export default {
		components: {
			uniDrawer,
			uniNavBar,
			uniIcons,
		},
		data() {
			return {
				showLeft: false,
				chatboxes: {
					color: '#93989d',
					size: '22',
					type: 'chatboxes'
				},
				eye: {
					color: '#93989d',
					size: '22',
					type: 'eye'
				},
				gear: {
					color: '#93989d',
					size: '22',
					type: 'gear'
				},
				clockListData: [
					{
						id: 1,//闹钟id
						hour: 6,//小时
						minute: 30,//分钟
						state: 1,//闹钟状态，开1，关0
						tag: "起床", //备注
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
			onClick(e){
				console.log('执行click事件', e.data)
				uni.navigateTo({
					url: '/pages/userinfo/userinfo',
				});	
			},
			onClick1(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/friendlist/friendlist',
				            });
			},
			onClick2(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/data/data',
				            });
			},
			onClick3(e) {
				console.log('执行click事件', e.data)
				uni.navigateTo({
				                url: '/pages/set/set',
				            });
			},
			onClickClock(e) {
				console.log("点击闹钟进入编辑页面", e.data)
				//if()
				// uni.navigateTo({
					
				// })
			},
			trigger(e) {
				console.log(e)
				// if(e.index == 0) {
					uni.navigateTo({
						url:'/pages/normalclock/normalclock?id=0',
					});
				// }
				// if(e.index == 1) {
				// 	uni.navigateTo({
				// 		url:'/pages/clocklist/quickclock',
				// 	});
				// }
			},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
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

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
