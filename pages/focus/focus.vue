<template>
	<view>
		<uni-nav-bar :status-bar="true" background-color="#c4c4e9"  color="white" left-icon="bars" title="Focus" @clickLeft="showDrawer('showLeft')" />
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
			
		
			<div  class="font">start focus!</div>
			<view class="focus_content">
				
				<slider v-bind:value="60" step="5"  @change="sliderChange" min="0"
				max="120" activeColor="#aaaaff"
				@changing="changing"
				></slider>
				<div class="time_value">{{value}}:00</div>
			 
			</view>
			<button @click="start_focus" class="start_button">start</button>
			<view class="mode">
			<switch @change="change_mode"></switch>
			<text >{{mode}}</text>
			<a >设置白名单</a>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

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
				value:60,
				mode:"专注模式"
		
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
			},
			start_focus(){
				let that=this;
				var v=JSON.stringify(that.value);
				uni.navigateTo({
					url:"./timeOut?value="+v
				})
			},
			 sliderChange(e) {
			            console.log('value 发生变化：' + e.detail.value)
			        },
					changing(e){
						this.value=e.detail.value
					},
					change_mode(e){
						if(e.target.value){
							this.mode="深度模式"
						}
						if(!e.target.value){
							this.mode="专注模式"
						}
						 console.log('switch2 发生 change 事件，携带值为', e.target.value)
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
	.focus_content{
		
		display: flex;
		flex-direction: column;
		justify-content:center;
		flex-grow:1;
		/* 放在中间？ */
		margin:auto;
		width:80%;
		
	}

	text{
		text-align: center;
	}
	.time_value{
		margin: 10px;
		margin: auto;
	}
slider{
	width:100%;
	margin:auto;
}
.font{
	font-size: 20px;
	margin: 90px;
}
.start_button{
	margin-top: 50px;
	width: 20%;
	background-color:#AAAAFF;
	border-color: white;
	color:white;
	border-radius: 10px;
	border-style: solid
}
.start_button:hover {
	background-color:#AAAAf0;
}
.start_button:active {
	background-color:#AAAAf0;
}
.mode{
	display: flex;
	flex-direction: column;
	font-size: 15px;
	margin: 20px;
}
a{
	color: grey;
	
}
switch{
	margin-left: 10px;
}
</style>
