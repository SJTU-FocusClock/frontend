<template>
	<view class="wyb-tabs-box" :style="boxStyleStr">
		<scroll-view 
		 class="wyb-tabs-scroll-view" 
		 :scroll-x="scroll" 
		 :scroll-left="scrollLeft"
		 :enable-flex="true"
		 :scroll-with-animation="scrollAnim"
		 :style="{height: height + 'rpx'}">
			<view class="wyb-tabs-scroll-box" :style="{height: height + 'rpx'}">
				<view class="wyb-tabs-label" id="tabsBox">
					<view 
					 :id="'tab' + index"
					 class="wyb-tabs-label-item"
					 v-for="(item,index) in tabs" 
					 v-text="item[cusLabel]"
					 :key="index"
					 @tap.stop="onTabsItemTap($event, index)"
					 :style="[autoTabsItemStyle(index)]" />
				</view>
				<view v-if="showSBlock" class="wyb-tabs-block" :style="{
					width: sBlockMode === 'fixed' ? sBlockWidth + 'px' : everytabsWidth[currentUseForLeft] + Number(sBlockType.paddingHori) * 2 + 'px',
					height: autoSBlockHeight,
					left: scroll ? autoLeft : autoFixedLeft,
					bottom: sBlockType.type === 'line' ? '0' : '50%',
					borderRadius: sBlockType.type === 'rectangle' ? '5px' : '1000px',
					transitionDuration: 500 + 'ms',
					transform: 'translateX(-50%)' + (sBlockType.type === 'line' ? '' : ' translateY(53%)'),
					backgroundColor: autoBlockBgColor}" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentUseForLeft: this.current.toString().slice(),
				scrollLeft: 0,
				scrollAnim: false,
				tabsWidthList: []
			}
		},
		computed: {
			autoTop() {
				let result = 44
				// #ifndef H5
				 result = 0
				// #endif
				return result
			},
			screenWidth() {
				return uni.getSystemInfoSync().screenWidth
			},
			autoTabsItemStyle() {
				return function(index) {
					let padpx = uni.upx2px(Number(this.tabsPadding))
					return {
						paddingLeft: this.scroll ? (index === 0 ? `${padpx}px` : `${padpx / 2}px`) : 0,
						paddingRight: this.scroll ? (index === this.tabs.length - 1 ? `${padpx}px` : `${padpx / 2}px`) : 0,
						fontSize: `${uni.upx2px(Number(this.fontSize))}px`,
						width: this.scroll ? 'auto' : '100%',
						color: Number(this.currentUseForLeft) === index ?
							('activeColor' in this.tabs[index] ? this.tabs[index]['activeColor'] : this.activeColor) : this.defaultColor,
						fontWeight: Number(this.currentUseForLeft) === index && this.activeWeight ? 'bold' : 'normal',
						transitionDuration: 500 + 'ms'
					}
				}
			},
			everytabsWidth() {
				let result = []
				this.tabs.forEach(item => {
					result.push(item[this.cusLabel].length * uni.upx2px(Number(this.fontSize)))
				})
				return result
			},
			autoLeft() {
				let pad = uni.upx2px(Number(this.tabsPadding))
				let result = 0
				result += (this.everytabsWidth[this.currentUseForLeft] + pad * 2) / 2 + pad * this.currentUseForLeft
				for (let i = 1; i <= this.currentUseForLeft; i++) {
					result += this.everytabsWidth[this.currentUseForLeft - i]
				}
				return `${result}px`
			},
			autoFixedLeft() {
				let tabsBoxWidth = this.screenWidth
				if (this.tabBoxStyle.width) {
					if (this.tabBoxStyle.width.toString().includes('rpx')) {
						tabsBoxWidth = uni.upx2px(parseFloat(this.tabBoxStyle.width))
					} else if (this.tabBoxStyle.width.toString().includes('px')) {
						tabsBoxWidth = parseFloat(this.tabBoxStyle.width)
					}
				}
				let tabsWidth = tabsBoxWidth / this.tabs.length
				return `${tabsWidth * (2 * Number(this.currentUseForLeft) + 1) / 2}px`
			},
			autoSBlockHeight() {
				let result = ''
				switch(this.sBlockType.type) {
					case 'line':
						result = `${this.sBlockType.height || 4}px`
						break
					case 'capsule':
					case 'rectangle':
						result = `${Number(uni.upx2px(this.fontSize)) + Number(this.sBlockType.paddingVert || 5) * 2 }px`
						break
				}
				return result
			},
			boxStyleStr() {
				let styleStr = ''
				let rootStyle = {
					width: this.screenWidth + 'px',
					height: this.height + 'rpx',
					top: this.autoTop + 'px',
					zIndex: this.zIndex,
					backgroundColor: this.bgColor,
				}
				Object.keys(rootStyle).forEach(key => {
					styleStr += `${this.sortFieldMatch(key)}: ${rootStyle[key]}; `
				})
				if (this.tabBoxStyle) {
					Object.keys(this.tabBoxStyle).forEach(key => {
						styleStr += `${this.sortFieldMatch(key)}: ${this.tabBoxStyle[key]}; `
					})
				}
				return styleStr
			},
			autoBlockBgColor() {
				let result = this.activeColor
				try{
					if ('sBlockColor' in this.tabs[this.currentUseForLeft]) {
						result = this.tabs[this.currentUseForLeft]['sBlockColor']
					} else if (this.sBlockColor) {
						result = this.sBlockColor
					}
				} catch(e){
					if (this.sBlockColor) {
						result = this.sBlockColor
					} else {
						result = this.activeColor
					}
				}
				return result
			}
		},
		watch: {
			current(val) {
				this.currentUseForLeft = val.toString().slice()
			},
			scroll(val) {
				if (val) {
					this.$nextTick(() => {
						this.init()
					})
				}
			},
			tabBoxStyle() {
				this.$forceUpdate()
			}
		},
		props: {
			tabs: {
				type: Array,
				required: true,
				default() {
					return []
				}
			},
			scroll: {
				type: Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			fontSize: {
				type: [String, Number],
				default: 30
			},
			height: {
				type: [String, Number],
				default: 80
			},
			current: {
				type: [String, Number],
				default: 0
			},
			tabsPadding: {
				type: [String, Number],
				default: 50
			},
			activeColor: {
				type: String,
				default: 'rgb(149,147,228)'
			},
			defaultColor: {
				type: String,
				default: '#999'
			},
			activeWeight: {
				type: Boolean,
				default: true
			},
			cusLabel: {
				type: String,
				default: 'label'
			},
			showSBlock: {
				type: Boolean,
				default: true
			},
			sBlockMode: {
				type: String,
				default: 'auto',
				validator: function (value) {
					return ['fixed', 'auto'].indexOf(value) !== -1
				}
			},
			sBlockWidth: {
				type: [String, Number],
				default: 20
			},
			sBlockColor: {
				type: String,
				default: ''
			},
			sBlockType: {
				type: Object,
				default() {
					return {
						type: 'line',
						height: 2,
						paddingHori: 5
					}
				}
			},
			tabBoxStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			zIndex: {
				type: [String, Number],
				default: 2000
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				if (this.scroll) {
					this.tabs.forEach(async (item, index) => {
						let tabsInfo = await this.getRect(`#tab${index}`)
						this.tabsWidthList.push(tabsInfo.width)
					})
					let tabBoxInfo = await this.getRect('.wyb-tabs-box')
					let eleWidth = tabBoxInfo.width
					let currentTabsInfo = await this.getRect(`#tab${this.currentUseForLeft}`)
					let offsetLeft = currentTabsInfo.left
					let scrollLeft = offsetLeft - (eleWidth - this.tabsWidthList[this.currentUseForLeft]) / 2
					this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
					this.$nextTick(() => {
						this.scrollAnim = true
					})
				}
			},
			async onTabsItemTap(e, index) {
				let tabBoxInfo = await this.getRect('.wyb-tabs-box')
				let eleWidth = tabBoxInfo.width
				let offsetLeft = e.target.offsetLeft
				let scrollLeft = offsetLeft - (eleWidth - this.tabsWidthList[index]) / 2
				this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
				if (this.currentUseForLeft !== index) {
					this.$emit('change', {
						label: this.tabs[index][this.cusLabel],
						index
					})
				}
				this.currentUseForLeft = index
			},
			getRect(selector) {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this)['select'](selector).boundingClientRect(rect => {
						if (rect) {
							resolve(rect)
						} else {
							resolve('no info')
						}
					}).exec()
				})
			},
			sortFieldMatch(field) {
				const stringArray = field.split('')
				let newField = field
				stringArray.forEach(t => {
					if (/[A-Z]/.test(t)) {
						newField = field.replace(t, `-${t.toLowerCase()}`)
					}
				})
				return newField
			}
		}
	}
</script>

<style>
	.wyb-tabs-box {
		position: static;
		width: 100%;
	}
	
	.wyb-tabs-scroll-view {
		width: 100%;
		display: flex;
		flex-direction: column;
		-webkit-overflow-scrolling: touch;
	}
	
	.wyb-tabs-scroll-view >>> ::-webkit-scrollbar {
		ddisplay: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.wyb-tabs-scroll-box {
		width: 100%;
		position: relative;
	}
	
	.wyb-tabs-label {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.wyb-tabs-label-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		transition-property: color;
		z-index: 20;
	}
	
	.wyb-tabs-block {
		position: absolute;
		bottom: 0;
		transition-property: left, width, height, border, background-color;
	}
</style>
