<template>
	<view class="detail">
		<!-- 轮播大图 -->
		<swiper class="swiper"  autoplay="true" :current="swActive" interval="3000" >
			<swiper-item v-for="(item,index) in detail.sliderImageArr" class="item" :key="index">
				<image class="image" :src="item" mode=""></image>
				<view class="indicator">
					{{index+1}}/{{detail.sliderImageArr.length}}
				</view>
			</swiper-item>
		</swiper>
		<!-- 价格标题栏 -->
		<view class="title">
			<view class="first">
				<view class="prices">
					<view class="price">
						￥<text class="num">{{detail.price}}</text> 
					</view>
					<view class="vip-price">
						￥{{detail.vipPrice}}
					</view>
					<view class="vip">
						<image class="image" src="../../static/img/detail/vip.png" mode=""></image>
					</view>
				</view>
				<view class="share">
					<uni-icons type="redo" size="28"></uni-icons>
				</view>
			</view>
			<view class="name">
				{{detail.storeName}}
			</view>
			<view class="rests">
				<view class=" original-cost">
					原价:￥{{detail.otPrice}}
				</view>
				<view class="inventory">
					库存:{{detail.stock}}{{detail.unitName}}
				</view>
				<view class="sales">
					销量:{{detail.sales}}{{detail.unitName}}
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="coupon">
			<view class="left">
				<text class="name">优惠券:</text>
				<view class="item">
					满101减100
				</view>
				<view class="item">
					满11减1
				</view>
			</view>
			<view class="icon">
				<uni-icons type="arrowright" size="24"></uni-icons>
			</view>
		</view>
		<!-- 规格 -->
		<view class="specification" @click="specButton">
			<view class="left">
				<text class="name">请选择:</text>
				<view class="text">
					黑
				</view>
			</view>
			<view class="icon">
				<uni-icons type="arrowright" size="24"></uni-icons>
			</view>
		</view>
		<!-- 门店信息 -->
		<view class="shop">
			<view class="title">
				门店信息
			</view>
			<view class="desc">
				<view class="left">
					<image class="image" src="https://image.dayouqiantu.cn/noMeal_tt.png" mode=""></image>
					<view class="name">
						<view class="shop-name">
							yshop店铺
						</view>
						<view class="site">
							四川省成都市
						</view>
					</view>
				</view>
				<view class="icon" @click="phone">
					<uni-icons type="phone" size="32" color="#73cbb6"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 产品介绍 -->
		<view class="introduce">
			产品介绍
		</view>
		<!-- 产品介绍内容 -->
		<view class="description" v-html="detail.description">
		</view>
		<!-- 底部商品栏 -->
		<uni-goods-nav class="goods" :fill="true"  :options="options" :button-group="buttonGroup"  @click="addLeft" @buttonClick="addButton"></uni-goods-nav>
		<!-- 产品规格选择 -->
		<specificationSelection :selectShow="specificationSelectShow"></specificationSelection>
	</view>
</template>

<script>
	import {detail,collect} from "../../APIs/index.js"
	import specificationSelection from '../../components/specification-selection/specification-selection.vue'
	export default {
		components:{
			specificationSelection
		},
		data() {
			return {
				id:0,
				detail:{},
				collect:{},
				swActive:0,
				specificationSelectShow:false,
				options:[
					{
						icon: "",
						text: '收藏',
					}, 
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
						text: '购物车',
						info: 0
					}
				],
				buttonGroup:[
					{
						text: '加入购物车',
						backgroundColor: '#fea10f',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#73cbb6',
						color: '#fff'
					}
				]
			}
		},
		onLoad(option) {
			// 监听规格收起来
			uni.$on('defSelectShow',()=>{
				this.specificationSelectShow=!this.specificationSelectShow
			})
			
			// 加载商品详情
			this.id = option.id
			detail(this.id).then(res=>{
				let [err,{data}] = res
				if(data.code==1){
					this.detail = data.data.detail
					this.collect=data.data.collect
					this.options[1].info = data.data.cartNum
					if(this.collect.code==-1){
						this.options[0].icon = "http://yshop.bolefx.xyz/static/img/detail/collect.png"
					}else{
						this.options[0].icon = "http://yshop.bolefx.xyz/static/img/detail/collect_active.png"
					}
				}else{
					uni.showToast({
						title:data.msg,
						icon:"none"
					})
					uni.navigateBack()
				}
			})
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber:'18950387392'
				})
			},
			// 左侧按钮（收藏和购物车）被点击
			addLeft(e){
				if(e.content.text=='收藏'){
					let type = 'del'
					if(this.collect.code == -1){
						type='add'
					}
					collect(type,this.id)
					.then(res=>{
						let [err,{data}] = res
						if(data.code==1){
							this.options[0].icon = type=='add'?"http://yshop.bolefx.xyz/static/img/detail/collect_active.png":"http://yshop.bolefx.xyz/static/img/detail/collect.png"
							this.collect.code=type=='add'?1:-1
						}
					})
				}else{
					uni.switchTab({
						url:"../cart/cart"
					})
				}
				console.log(e)
			},
			// 右侧按钮（添加购物车和立即购买）被点击
			addButton(e){
				this.specificationSelectShow=true
				console.log(e)
			},
			// 规格请选择被点击
			specButton(){
				this.specificationSelectShow=true
			}
		},
		
		
		onUnload() {
			uni.$off('defSelectShow')
		}
	}
</script>

<style lang="scss" scoped>
.detail{
	background-color: $color-new-gray;
	.swiper{
		background-color: #FFFFFF;
		height: 600upx;
		.item{
			position: relative;
			.image{
				width: 100%;
				height: 100%;
			}
			.indicator{
				position: absolute;
				bottom: 20upx;
				right: 20upx;
				font-size: 24upx;
				background-color: #FFFFFF;
				padding: 0 8upx;
				border-radius: 8upx;
			}
		}
		
	}
	.title{
		border-bottom: 1upx solid $color-new-gray;
		background-color: #FFFFFF;
		.first{
			display: flex;
			height: 100upx;
			align-items: center;
			padding: 0 30upx;
			justify-content: space-between;
			.prices{
				display: flex;
				align-items: flex-end;
				font-size: 32upx;
				.price{
					color: $index-color;
					font-weight: 700;
					padding: 0 10upx;
					.num{
						font-size: 48upx;
					}
				}
				.vip-price{
					
					margin-bottom: 4upx;
				}
				.vip{
					margin-left: 10upx;
					.image{
						width:40upx;
						height: 24upx;
					}
				}
			}
		}
		.name{
			padding: 0 30upx;
			padding-bottom: 20upx;
			font-weight: 600;
		}
		.rests{
			display: flex;
			padding: 0 30upx;
			height: 80upx;
			justify-content: space-between;
			align-items: center;
			color: $color-gray;
			font-size: 28upx;
		}
	}
	.coupon{
		display: flex;
		padding: 16upx 30upx;
		font-size: 32upx;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
		justify-content: space-between;
		.left{
			display: flex;
			.name{
				margin-right: 30upx ;
				color: $color-gray;
			}
			.item{
				position: relative;
				border:1upx solid #f2857b;
				color: #e93323;
				font-size: 24upx;
				padding: 8upx 20upx;
				margin-right: 20upx;
			}
			.item::after{
				content: " ";
				position: absolute;
				width: 6upx;
				height: 10upx;
				border-radius: 10upx 0 0 10upx;
				border: 1px solid #f2857b;
				background-color: #fff;
				right: -2upx;
				top: 50%;
				margin-top: -5upx;
				border-right-color: #fff;
			}
			.item::before{
				content: " ";
				position: absolute;
				width: 6upx;
				height: 10upx;
				border-radius: 0 10upx 10upx 0;
				border: 1px solid #f2857b;
				background-color: #fff;
				top: 50%;
				left: -2upx;
				margin-top: -5upx;
				border-left-color: #fff;
			}
		}
		.icon{
			color: $color-new-gray;
		}
	}
	.specification{
		display: flex;
		padding: 16upx 30upx;
		font-size: 32upx;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
		justify-content: space-between;
		.left{
			display: flex;
			.name{
				margin-right: 30upx ;
				color: $color-gray;
			}
		}
		.icon{
			color: $color-new-gray;
		}
	}
	.shop{
		background-color: #FFFFFF;
		margin-bottom: 20upx;
		.title{
			padding: 16upx 30upx;
			font-size: 32upx;
			border-bottom: 1upx solid $color-new-gray;
		}
		.desc{
			display: flex;
			padding: 16upx 30upx;
			justify-content: space-between;
			align-items: center;
			height: 160upx;
			.left{
				display: flex;
				font-size: 28upx;
				.image{
					width: 100upx;
					height: 100upx;
				}
				.name{
					.shop-name{
						font-size: 32upx;
					}
				}
			}
		}
	}
	.introduce{
		text-align: center;
		padding: 16upx 30upx;
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}
	.description{
		margin-bottom: 100upx;
	}
	.goods{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 200;
	}
	
}
</style>
