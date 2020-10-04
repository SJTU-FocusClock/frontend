<template>
	<view>
		<view class="content">
			<uni-nav-bar :status-bar="true" backgroundColor="#c4c4e9" :fixed="true" color="white" rightIcon="checkmarkempty" />
			<gg-nav-group>
				<gg-cell label="选择闹钟游戏" url="/pages/game/game.vue">
				</gg-cell>
			</gg-nav-group>
			
			<gg-nav-group>
				<gg-block>
					<gg-picker-time label="时间选择" />
				</gg-block>
				
			</gg-nav-group>
			
			<gg-nav-group >
				<gg-block>
					<gg-checkbox-tag label="闹钟重复" v-model="formData.checkboxTag"  :dataLists="checkLists" :maxNumber="7" />
				</gg-block>
			</gg-nav-group>
			
			<gg-nav-group>
				<gg-input-text label="备注"></gg-input-text>
				<gg-switch labelWidth="140" label="不玩游戏直接关闭闹钟" tip="在闹钟画面有关闭闹钟功能,不完成小游戏,也可以快速关闭闹钟"></gg-switch>
			</gg-nav-group>
			
		</view>
		
		
		
	</view>
	
</template>

<script>
	// import ggCheckBoxTag from'@10yun/ggui-mobile/lib/gg-checkbox-tag/gg-checkbox-tag.vue'
	// import ggNavGroup from '@10yun/ggui-mobile/lib/gg-nav-group'
	// import ggPickerTime from '@10yun/ggui-mobile/lib/gg-picker-time/gg-picker-time.vue'
	
	export default {
		// components: {
		// 	// ggPickerTime,
		// 	// ggCheckBoxTag
		// },
		data() {
			return {
				formData: {
					checkbox: ['2', '4'],
					checkboxTag: '2,4',
				},
				maxNumber: 7,
				checkLists: [
					{ value: '0', text: '一' },
					{ value: '1', text: '二' },
					{ value: '2', text: '三' },
					{ value: '3', text: '四' },
					{ value: '4', text: '五' },
					{ value: '5', text: '六' },
					{ value: '6', text: '七' },
				],
			}
		},
		methods: {
			
		},
		onLoad: function(option) {
			console.log(option.id);
		}
	}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gg-block {
  background-color: #e1e1e1;
  min-height: 30px;
}
</style>
