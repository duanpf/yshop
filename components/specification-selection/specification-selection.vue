<template>
	<view class="specification-selection">
		<view class="background" :class="{active:selectShow}" @click="defSelectShow"></view>
		<view class="box" :class="{active:selectShow}">
			<view class="header">
				<image class="image" src="../../static/img/test-list.jpg" mode="scaleToFill"></image>
				<view class="desc">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			selectShow:{
				type:Boolean,
				required:true,
				default:false
			}
		},
		methods:{
			defSelectShow(){
				uni.$emit('defSelectShow')
			}
		}
	}
</script>

<style lang="scss">
.specification-selection{
	.background{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #000000;
		z-index: -1;
		top: 0;
		opacity: 0;
		transition: $transition-time;
	}
	.background.active{
		opacity: 0.5;
		z-index: 100;
	}
	.box{
		padding: 40upx 30upx;
		position: fixed;
		height: 400upx;
		width: 100%;
		box-sizing: border-box;
		bottom: -400upx;
		background-color: #F8F8F8;
		z-index: 110;
		border-top-left-radius: 40upx;
		border-top-right-radius: 40upx;
		transition: $transition-time;
		.header{
			display: flex;
			
			.image{
				width: 160upx;
				height: 160upx;
			}
			.desc{
				
			}
		}
	}
	.box.active{
		bottom: 100upx;
	}
	
}
</style>
