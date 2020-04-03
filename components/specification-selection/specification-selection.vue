<template>
	<view class="specification-selection">
		<!-- 背景（遮罩层） -->
		<view class="background" :class="{active:selectShow}" @click="defSelectShow"></view>
		<!-- 商品规格 -->
		<view class="box" :class="{active:selectShow,sp1:spec.att.length==1,sp2:spec.att.length==2,sp3:spec.att.length==3}">
			<!-- 关闭按钮 -->
			<view class="close" @click="defSelectShow">
				<uni-icons type="closeempty" size="36"></uni-icons>
			</view>
			<!-- 商品图片及信息 -->
			<view class="header">
				<!-- 商品规格图片 -->
				<image class="image" src="../../static/img/test-list.jpg" mode="scaleToFill"></image>
				<!-- 商品信息 -->
				<view class="desc">
					<!-- 商品标题 -->
					<view class="title">
						{{spec.title}}
					</view>
					<!-- 商品价格和库存 -->
					<view class="text">
						<!-- 商品价格 -->
						<view class="price">
							￥{{spec.price}}
						</view>
						<!-- 商品库存 -->
						<view class="inventory">
							库存：{{spec.inventory}}
						</view>
					</view>
				</view>
			</view>
			<!-- 商品规格列表 -->
			<view class="specificationList" v-for="(item,index) of spec.att" :key="index">
				<view class="title">
					{{item.title}}
				</view>
				<view class="list" @click="setSpec(index,item.id,$event)">
					<view class="item" :class="{active:it.check}" v-for="(it,idx) of item.attVal" :key="idx" :data-id="idx">
						{{it.name}}
					</view>
				</view>
			</view>
			<!-- 商品数量 -->
			<view class="quantity">
				<view class="title">
					数量
				</view>
				<uni-number-box :min="1" :max="spec.inventory" :value="1" @change="setNum"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	import {spec} from '../../initData/index.js'
	// console.log(spec)
	export default {
		data() {
			return {
				spec,
				specSelect:{
					att:[],
					num:1
				}
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
			// 遮罩层被点击，关闭规格
			defSelectShow(){
				uni.$emit('defSelectShow')
			},
			// 数量改变事件
			setNum(e){
				this.specSelect.num=e
				uni.$emit('setSpecSelect',this.specSelect)
			},
			// 商品规格被点击
			setSpec(index,id,e){
				let spid =  e.target.dataset.id
				if(spid){
					let check = this.spec.att[index].attVal[spid].check
					this.spec.att[index].attVal.map(item=>{
						return item.check=false
					})
					this.spec.att[index].attVal[spid].check=!check
					
					
					let data={};
					data.id=this.spec.att[index].attVal[spid].id
					data.name=this.spec.att[index].attVal[spid].name
					this.specSelect.att[index]=data
					if(!this.spec.att[index].attVal[spid].check){
						this.specSelect.att.splice(index,1)
					}
					uni.$emit('setSpecSelect',this.specSelect)
				}
			}
		}
	}
</script>

<style lang="scss">
.specification-selection{
	
	$spec-height-1:500upx;
	$spec-height-2:610upx;
	$spec-height-3:720upx;
	// 背景（遮罩层）默认样式（隐藏）
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
	// 背景（遮罩层）显示样式
	.background.active{
		opacity: 0.5;
		z-index: 100;
	}
	// 商品规格默认样式（隐藏）
	.box{
		padding: 40upx 30upx;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		background-color: #F8F8F8;
		z-index: 110;
		border-top-left-radius: 40upx;
		border-top-right-radius: 40upx;
		transition: $transition-time;
		// 关闭按钮
		.close{
			width: 40upx;
			height: 40upx;
			position: absolute;
			top: 0;
			right: 40upx;
		}
		// 图片及商品信息
		.header{
			display: flex;
			align-items: center;
			margin-bottom: 35upx;
			.image{
				width: 160upx;
				height: 160upx;
				border-radius: 12upx;
			}
			// 标题和价格库存
			.desc{
				margin-left: 20upx;
				.title{
					font-size: 32upx;
					margin-bottom: 40upx;
				}
				.text{
					display: flex;
					align-items: flex-end;
					// 价格
					.price{
						color: $index-color;
						font-size: 32upx;
					}
					// 库存
					.inventory{
						margin-left: 30upx;
						font-size: 24upx;
						color: $color-gray;
					}
				}
			}
		}
		// 规格列表
		.specificationList{
			margin-bottom: 25upx;
			.title{
				font-size: 30upx;
				color: $color-gray;
				margin-bottom: 10upx;
			}
			.list{
				.item{
					font-size: 28upx;
					display: inline-block;
					border: 1upx solid $color-gray;
					padding: 5upx 25upx;
					border-radius: 8upx;
				}
				.item+.item{
					margin-left: 14upx;
				}
				.item.active{
					background-color: $index-color;
					color: #FFFFFF;
					border: none;
				}
			}
		}
		// 商品数量
		.quantity{
			.title{
				font-size: 30upx;
				color: $color-gray;
				margin-bottom: 15upx;
			}
		}
	}
	// 只有一行规格时样式
	.box.sp1{
		
		height: $spec-height-1;
		bottom: -$spec-height-1;
	}
	// 二行规格样式
	.box.sp2{
		height: $spec-height-2;
		bottom: -$spec-height-2;
	}
	// 三行规格样式
	.box.sp3{
		height: $spec-height-3;
		bottom: -$spec-height-3;
	}
	// 商品规格弹出样式
	.box.active{
		bottom: 100upx;
	}

	
}
</style>
