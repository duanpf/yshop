<template>
	<view class="com-list-item">
		<view class="">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			listType:{type:String},//列表样式，是纵向或者横向，值：x/y
			title:{type:String},
			titleColor:{type:String},
			titleIcon:{type:String},
			rightText:{type:String},
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.com-list-item{
	
}
</style>
