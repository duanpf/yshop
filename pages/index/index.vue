<template>
	<view class="index">
			<!-- 自定义顶部导航栏 -->
			<view class="tarBarTop">
				<!-- 导航栏内搜索样式 -->
				<view class="search" @click="toSearch">
					<uni-icons type="search" size="20" color="#aaaaaa" style="margin-right: 20upx;"></uni-icons>
					搜索商品
				</view>
			</view>
			<!-- 轮播 -->
			<swiper indicator-dots="true" autoplay="true" :current="swActive" interval="3000" class="swiper" indicator-color="#aaaaaa" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in swiperData" :key="index" @click="toPage(item.www)">
					<image class="image" :src="item.pic" lazy-load="true" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<!-- 商城新闻 -->
			<view class="new" @click="toNews">
				<view class="image">
					<image src="../../static/img/new-title.png" mode="scaleToFill"></image>
				</view>
				<view class="title ovf">
					{{"springboot2+JPA+Mybatisplus商城系统"}}
				</view>
				<view class="icon">
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<!-- 分类菜单 -->
			<view class="type-menu">
				<uni-grid :column="4" :highlight="false" :showBorder="false">
					<uni-grid-item class="item" v-for="(item,index) in typeMenuList" :key="index">
						<image class="image" :src="item.icon" mode="scaleToFill"></image>
						<text>{{item.title}}</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			<!-- 列表 -->
			<view class="list">
				<!-- 热门榜单 -->
				<view class="hotTOP">
					<view class="title">
						<text>热门榜单</text>
						<view class="right" >
							更多
							<uni-icons type="arrowright" color="#ffffff"></uni-icons>
						</view>
					</view>
					<view class="lists-item">
						<scroll-view scroll-x="true" class="scroll">
							<view class="item" v-for="(item,index) in hotList" :key="index" :data-id="item.id" @click="toDetail">
								<image class="stIcon" src="../../static/img/index/1st.png" v-if="index==0" mode=""></image>
								<image class="stIcon" src="../../static/img/index/2st.png" v-if="index==1 " mode=""></image>
								<image class="image" :src="item.image" mode=""></image>
								<view class="text ovf">{{item.storeName}}</view>
								<view class="price">
									￥{{item.price}}
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 精品推荐 competitive -->
				<view class="competitive">
					<view class="title">
						<text>精品推荐</text>
						<view class="right" >
							更多
							<uni-icons type="arrowright" color="#333333"></uni-icons>
						</view>
					</view>
					<view class="lists-item">
							<view class="item" v-for="(item,index) in bouqList" :key="index" :data-id="item.id" @click="toDetail">
								<image class="image" :src="item.image" mode=""></image>
								<view class="right">
									<view class="text ovf">{{item.storeName}}</view>
									<view class="price">
										￥{{item.otPrice}}
									</view>
									<view class="desc">
										<text style="text-decoration:line-through">￥{{item.price}}</text>
										<text class="order">已售{{item.sales}}张</text>
									</view>
									<image class="image" src="../../static/img/cart.png" mode=""></image>
								</view>
							</view>
					</view>
					
				</view>
				<!-- 首发新品 -->
				<view class="new-get">
					<view class="title">
						<text>首发新品</text>
						<view class="newIcon">NEW~</view>
						<view class="right" >
							更多
							<uni-icons type="arrowright" color="#333333"></uni-icons>
						</view>
					</view>
					<view class="lists-item">
						<scroll-view scroll-x="true" class="scroll">
							<view class="item" v-for="(item,index) in firstList" :key="index" :data-id="item.id" @click="toDetail">
								<image class="image" :src="item.image" mode=""></image>
								<view class="text ovf">{{item.storeName}}</view>
								<view class="price">
									￥{{item.otPrice}}
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- 促销单品 product -->
				<view class="product">
					<view class="title">
						<text>促销单品</text>
						<view class="right" >
							更多
							<uni-icons type="arrowright" color="#333333"></uni-icons>
						</view>
					</view>
					<view class="lists-item">
							<view class="item" v-for="(item,index) in protList" :key="index" :data-id="item.id" @click="toDetail">
								<image class="image" :src="item.image" mode=""></image>
								<view class="right">
									<view class="text ovf">{{item.storeName}}</view>
									<view class="price">
										促销价:￥{{item.otPrice}}
									</view>
									<view class="desc">
										<text style="text-decoration:line-through">日常价：￥{{item.price}}</text>
					
									</view>
									<text class="residue">仅剩：{{item.sales}}张</text>
								</view>
							</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	// 引入分类初始化数据
	import {index,user} from "../../APIs/index.js"
	export default {
		data() {
			return {
				swActive:0,
				swiperData:[],
				typeMenuList:[],
				hotList:[],//热门榜单
				bouqList:[],//精品推荐
				firstList:[],//新品首发
				protList:[],//促销单品
			}
		},
		onReady() {
			uni.showLoading({
				title:"加载数据中……",
				mask:true
			})
			index().then(res=>{
				let [err,{data}] = res;
				uni.hideLoading()
				if(data.code==1){
					this.typeMenuList = data.data.menus
					this.swiperData=data.data.carousel
					this.hotList=data.data.hotList
					this.bouqList=data.data.bouqList
					this.firstList=data.data.firstList
					this.protList=data.data.protList
				}else{
					uni.showToast({
						title:data.msg,
						icon:'none'
					})
				}
			})
		},
		methods: {
			toPage(url){
				uni.navigateTo({
					url:url
				})
			},
			// 点击顶部搜索跳转到搜索页面
			toSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			// 点击跳转到新闻页
			toNews(){
				uni.navigateTo({
					url:"../news/news"
				})
			},
			toDetail(e){
				let token = uni.getStorageSync('token')
				if(!token){
					uni.showToast({
						title:"请先登录",
						icon:"none"
					})
					uni.navigateTo({
						url:"../login/login"
					})
					return;
				}
				user().then(res=>{
					if(res.code==-1){
						console.log(res)
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						let timer= setTimeout(()=>{
							clearTimeout(timer)
							uni.navigateTo({
								url:"../login/login"
							})
							
						},500)
					}else{
						let id=e.currentTarget.dataset.id;
						uni.navigateTo({
							url:'../detail/detail?id='+id,
							
						})
					}
				})
				
			},
		}
	}
</script>

<style lang="scss">
	
	.ovf{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.index{
		// 顶部导航
		.tarBarTop{
			width: 100%;
			height: 100upx;
			border-bottom: 1upx solid #c5c5c5;
			display: flex;
			justify-content: center;
			align-items: center;
			.search{
				line-height: 60upx;
				background-color: #F1F1F1;
				width: 90%;
				height: 60%;
				border-radius: 50upx;
				padding: 0 10upx;
				font-size: 30upx;
				color: #aaaaaa;
			}
		}
		// 轮播
		.swiper{
			.image{
				height: 100%;
				width: 100%;
			}
		}
		// 新闻
		.new{
			height: 60upx;
			border-bottom: 1upx solid #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.image{
				width: 20%;
				height: 50%;
				position: relative;
				border-right: 1upx solid #c5c5c5;
				image{
					position: absolute;
					left: 50%;
					margin-left: -55upx;
					height: 100%;
					width: 70%;
				}
			}
			.title{
				color: #666666;
				padding: 0 20upx;
				font-size: 26upx;
				width: 60%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.icon{
				padding-right: 10upx;
			}
		}
		// 分类菜单
		.type-menu{
			padding: 40upx 50upx;
			.item{
				text-align: center;
				font-size: 24upx;
				text{
					margin-top: 10upx;
				}
				.image{
					margin:0 auto;
					width: 80upx;
					height: 80upx;
				}
			}
		}
		// 列表
		.list{
			background-image: url("../../static/img/index/list-bg.png");
			background-repeat: no-repeat;
			background-size: 100%;
			min-height: 400upx;
			padding: 20upx 25upx;
			// 热门榜单
			.hotTOP{
				border-bottom: 1px solid #F1F1F1;
				margin-bottom: 30upx;
				.title{
					color: #FFFFFF;
					font-size: 24upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					text{
						font-size: 30upx;
						font-weight: 700;
					}
				}
				.lists-item{
					margin-top: 30upx;
					background-color: #ffffff;
					padding: 20upx;
					border-top-left-radius: 25upx;
					border-top-right-radius: 25upx;
					min-height: 290upx;
					.scroll{
						overflow: hidden;
						white-space: nowrap;
						padding-bottom: 10upx;
					}
					.item{
						position: relative;
						display: inline-block;
						width: 33.33333%;
						font-size: 26upx;
						.stIcon{
							position: absolute;
							z-index: 10;
							width: 50upx;
							height: 50upx;
							top: 15upx;
							left: 15upx;
						}
						.image{
							width: 100%;
							height: 220upx;
							border-radius: 10upx;
						}
						.text{
							width: 100%;
							margin-top: 10upx;
						}
						.price{
							font-weight: bolder;
							color: $index-color;
							margin-top: 10upx;
						}
					}
					.item+.item{
						margin-left: 15upx;
					}
				}
			}
			// 精品推荐
			.competitive{
				border-bottom: 1px solid #F1F1F1;
				margin-bottom: 30upx;
				.title{
					color: #333333;
					font-size: 24upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					text-align: left;
					position: relative;
					font-size: 30upx;
					font-weight: 700;
				}			
				.lists-item{
					margin-top: 30upx;
					background-color: #ffffff;
					.item{
						display: flex;
						font-size: 26upx;
						padding-bottom: 10upx;
						.image{
							width: 200upx;
							height: 200upx;
							border-radius: 10upx;
						}
						.right{
							position: relative;
							width: 70%;
							padding-left: 20upx;
							.text{
								width: 100%;
								margin-top: 30upx;
							}
							.price{
								margin-top: 10upx;
								font-weight: bolder;
								color: $index-color;
								margin-top: 10upx;
							}
							.desc{
								font-size: 24upx;
								font-weight: 700;
								margin-top: 30upx;
								.order{
									margin-left: 20upx;
									font-weight: 500;
									color: #e1e1e1;
									font-size: 20upx;
								}
							}
							.image{
								border: 1px solid $index-color;
								width: 40upx;
								height: 40upx;
								position: absolute;
								bottom: 50upx;
								border-radius: 50%;
								right: 20upx;
							}
						}
					}
					.item+.item{
						margin-top: 10upx;
						.right{
							border-top: 1px solid #F1F1F1;
						}
					}
				}
			}
			// 首发新品
			.new-get{
				border-bottom: 1px solid #F1F1F1;
				margin-bottom: 30upx;
				.title{
					color: #333333;
					font-size: 24upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					text-align: left;
					position: relative;
					font-size: 30upx;
					font-weight: 700;
					.newIcon{
						position: absolute;
						left: 120upx;
						top: 0;
						font-size: 16upx;
						color: $index-color;
					}
				}
				.lists-item{
					margin-top: 30upx;
					background-color: #ffffff;
					border-top-left-radius: 25upx;
					border-top-right-radius: 25upx;
					.scroll{
						overflow: hidden;
						white-space: nowrap;
						padding-bottom: 10upx;
					}
					.item{
						position: relative;
						display: inline-block;
						width: 33.33333%;
						font-size: 26upx;
						border: 1upx solid #F8F8F8;
						text-align: center;
						border-radius: 10upx;
						overflow: hidden;
						.image{
							width: 100%;
							height: 240upx;
							
						}
						.text{
							width: 100%;
							margin-top: 10upx;
						}
						.price{
							margin-top: 10upx;
							font-weight: bolder;
							color: $index-color;
						}
					}
					.item+.item{
						margin-left: 15upx;
					}
				}
			}
			// 促销单品
			.product{
				border-bottom: 1px solid #F1F1F1;
				margin-bottom: 30upx;
				.title{
					color: #333333;
					font-size: 24upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					text-align: left;
					position: relative;
					font-size: 30upx;
					font-weight: 700;
				}
				.lists-item{
					margin-top: 30upx;
					background-color: #ffffff;
					.item{
						display: flex;
						font-size: 26upx;
						padding-bottom: 10upx;
						.image{
							width: 200upx;
							height: 200upx;
							border-radius: 10upx;
						}
						.right{
							position: relative;
							width: 70%;
							padding-left: 20upx;
							.text{
								width: 100%;
								margin-top: 20upx;
							}
							.price{
								font-size: 20upx;
								display: inline-block;
								padding: 10upx 20upx;
								background-color: $index-color;
								margin-top: 10upx;
								color: #FFFFFF;
								margin-top: 20upx;
								border-radius: 30upx 5upx 30upx 5upx;
							}
							.desc{
								font-size: 24upx;
								margin-top: 20upx;
								color: #e1e1e1;
							}
							.residue{
								position: absolute;
								bottom: 10upx;
								border-radius: 50%;
								right: 20upx;
								color: #e1e1e1;
								font-size: 24upx;
							}
						}
						
						
					}
					.item+.item{
						margin-top: 10upx;
						.right{
							border-top: 1px solid #F1F1F1;
						}
					}
					
				}
			}
		}
	}
	// Material Design Colors
	// 主要深色:#009688,RGB(0,150,136),CMYK(100,0,9,41)
	// 主要浅色:#80CBC4,RGB(128,203,196),CMYK(36,0,3,20)
	// 主要强调:#00796B,RGB(0,121,107),CMYK(100,0,11,52)
	// 主要文本:#FFFFFF,RGB(255,255,255),CMYK(0,0,0,0)
	// 重点深色:#1DE9B6,RGB(29,233,182),CMYK(87,0,21,8)
	// 重点浅色:#64FFDA,RGB(100,255,218),CMYK(60,0,14,0)

</style>
