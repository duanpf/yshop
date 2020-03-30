<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 设置购物车的checkbox为圆的 */
	.checkbox .uni-checkbox-input{
		border-radius: 50% !important;
	}
	// 设置步进器宽高
	.nums{
		.uni-numbox__minus,	
		.uni-numbox__value,
		.uni-numbox__plus{
			width: 60upx !important;
			height: 60upx !important;
		}
	}
</style>
