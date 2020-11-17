<template>
	<almost-lottery
	  :prize-list="prizeList"
	  :prize-index="prizeIndex"
	  @reset-index="prizeIndex = -1"
	  @draw-start="handleDrawStart"
	  @draw-end="handleDrawEnd"
	  @finish="handleDrawFinish"
	  v-if="prizeList.length"
	/>
</template>

<script>
	import AlmostLottery from '@/components/almost-lottery/almost-lottery.vue'
	export default {
	  components: {
	    AlmostLottery
	  },
	  data () {
	    return {
	      // 获奖奖品序号，每次抽奖结束后需要重置为 -1
	      prizeIndex: -1,
	      // 奖品数据
	      prizeList: [
	        { prizeId: 1, name: '0.1元现金', stock: 10, weight: 1, prizeImage: '/static/lottery-prize/git.png' },
	        { prizeId: 2, name: '10元现金', stock: 0, weight: 0, prizeImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/56f085e0-bcfe-11ea-b244-a9f5e5565f30.png' },
	        { prizeId: 3, name: '5元话费', stock: 1, weight: 0 },
	        { prizeId: 4, name: '50元现金', stock: 0, weight: 0 },
	        { prizeId: 5, name: '1卷抽纸', stock: 3, weight: 3 },
	        { prizeId: 6, name: '0.20元现金', stock: 8, weight: 2 },
	        { prizeId: 7, name: '谢谢参与', stock: 100, weight: 10000 },
	        { prizeId: 8, name: '100金币', stock: 100, weight: 1000 }
	      ],
	      // 中奖下标
	      prizeIndex: -1,
	      // 中奖类目名称
	      targetName: '',
	      // 奖品是否设有库存
	      onStock: true,
	      // 是否由前端控制概率，默认不开启
	      onFrontend: false,
	      // 权重随机数的最大值
	      weightTotal: 0,
	      // 权重数组
	      weightArr: []
	    }
	  },
	  methods: {
	    // 本次抽奖开始
	    handleDrawStart () {
	      // 这里需要处理你的中奖逻辑，并得出 prizeIndex
	      // 请查看示例项目中的代码
	    },
	    // 本次抽奖结束
	    handleDrawEnd () {
	      // 完成抽奖后，这里处理你拿到结果后的逻辑
	      // 请查看示例项目中的代码
	    },
	    // 抽奖转盘绘制完成
	    handleDrawFinish (res) {
	      // 抽奖转盘准备就绪后，这里处理你的逻辑
	      // 请查看示例项目中的代码
	      // console.log('抽奖转盘绘制完成', res)
	    }
	  }
	}
</script>

<style>
</style>
