<template>
	<view class="user">
		<view class="header">
			<view class="card">
				<image class="image" src="../../static/img/login/icon.png" mode=""></image>
				<view class="desc">
					<view class="title">
						18950387392
					</view>
					<view class="user-id">
						ID：3858
						<uni-icons color="#f5f5f5" size="22" type="compose"></uni-icons>
					</view>
				</view>
			</view>
			<view class="set">
				<uni-icons type="gear" color="#f5f5f5" size="28"> </uni-icons>
			</view>
		</view>
		<view class="wrapper">
				<view class="wrapper-item">
					<view class="nav">
						<view class="item">
							<view class="title">
								我的余额
							</view>
							<view class="num">
								0
							</view>
						</view>
						<view class="item">
							<view class="title">
								当前佣金
							</view>
							<view class="num">
								0
							</view>
						</view>
						<view class="item">
							<view class="title">
								优惠券
							</view>
							<view class="num">
								0
							</view>
						</view>
					</view>
					<view class="myOrder">
						<view class="myOrder-header">
							<view class="title">
								我的订单
							</view>
							<view class="more">
								全部订单
								<uni-icons type="arrowright"></uni-icons>
							</view>
						</view>
						<view class="myOrder-desc">
							<view class="item">
								<view class="icon">
									<image class="image" src="../../static/img/user/obligation.png" mode=""></image>
								</view>
								<view class="title">
									待付款
								</view>
							</view>
							<view class="item">
								<view class="icon">
									<image class="image" src="../../static/img/user/hump.png" mode=""></image>
								</view>
								<view class="title">
									待发货
								</view>
							</view>
							<view class="item">
								<view class="icon">
									<image class="image" src="../../static/img/user/wfr.png" mode=""></image>
								</view>
								<view class="title">
									待收货
								</view>
							</view>
							<view class="item">
								<view class="icon">
									<image class="image" src="../../static/img/user/evaluate.png" mode=""></image>
								</view>
								<view class="title">
									待评价
								</view>
							</view>
							<view class="item">
								<view class="icon">
									<image class="image" src="../../static/img/user/aftermarket.png" mode=""></image>
								</view>
								<view class="title">
									售后/退款
								</view>
							</view>
						</view>
					</view>
					<view class="myService">
						<view class="myService-header">
							我的服务
						</view>
						<view class="myService-desc">
							<uni-grid :column="4" :highlight="false" :showBorder="false">
								<uni-grid-item class="item" v-for="(item,index) in routineMenus" :key="index">
									<image class="image" :src="item.pic" mode=""></image>
									<text>{{item.name}}</text>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {userList} from "../../APIs/index.js"
	export default {
		data() {
			return {
				routineMenus:[]
			};
		},
		onReady() {
			this.loadMore()
		},
		methods:{
			loadMore(){
				userList().then(res=>{
					let [err,{data}] = res;
					if(data.code==1){
						this.routineMenus = data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.user{
	background-color: $color-new-gray;
	// position: fixed;
	width: 100%;
	height: 100%;
	.header{
		height: 200upx;
		background-color: $index-color;
		border-radius: 0 0 30% 30%;
		padding: 40upx;
		display: flex;
		justify-content: space-between;
		.card{
			display: flex;
			.image{
				width: 100upx;
				height: 100upx;
			}
			.desc{
				margin-left: 40upx;
				.title{
					color: #FFFFFF;
					font-weight: 600;
				}
				.user-id{
					color: $color-new-gray;
					font-size: 28upx;
				}
			}
		}
		.set{
			margin-top: 20upx;
		}
	}
	.wrapper{
		position: relative;
		padding: 0 20upx;
		margin-top: -60upx;
		overflow: hidden;
		.nav{
			height: 140upx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			border-radius: 10upx;
			font-size: 26upx;
			padding: 0 20upx;
			margin-bottom: 20upx;
			.item{
				width: 33.333333333%;
				.title{
					color: $color-gray;
				}
				.num{
					font-size: 32upx;
				}
			}
			.item+.item{
				border-left: 1px solid #F1F1F1;
			}
		}
		.myOrder{
			background-color: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 20upx;
			.myOrder-header{
				height: 100upx;
				padding: 0 20upx;
				align-items: center;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px dashed $color-new-gray;
				.more{
					font-size: 28upx;
					color: #777777;
				}
			}
			.myOrder-desc{
				padding: 0 20upx;
				display: flex;
				height: 160upx;
				justify-content: space-around;
				font-size: 28upx;
				align-items: center;
				.item{
					.icon{
						text-align: center;
						.image{
							width: 40upx;
							height: 40upx;
						}
					}
				}
			}
		}
		.myService{
			background-color: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 20upx;
			.myService-header{
				height: 100upx;
				padding: 0 20upx;
				align-items: center;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px dashed $color-new-gray;
			}
			.myService-desc{
				padding: 20upx;
				.item{
					font-size: 26upx;
					text-align: center;
					.image{
						margin:0 auto;
						margin-top: 20upx;
						width: 80upx;
						height: 80upx;
					}
				}
			}
		}
	}
}
</style>
