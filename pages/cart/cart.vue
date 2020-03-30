<template>
	<view class="cart">
		<!-- 顶部品质 -->
		<view class="labelNav">
			<view class="item">
				<uni-icons type="checkbox-filled" color="#8c8c8c"></uni-icons>
				100%正品保证
			</view>
			<view class="item">
				<uni-icons type="checkbox-filled" color="#8c8c8c"></uni-icons>
				所有商品精挑细选
			</view>
			<view class="item">
				<uni-icons type="checkbox-filled" color="#8c8c8c"></uni-icons>
				售后无忧
			</view>
		</view>
		<!-- 购物数量 -->
		<view class="shopping-num">
			购物数量
			<text>{{cartList.length}}</text>
			<view class="btn-manage" v-if="cartList.length">
				管理
			</view>
		</view>
		<!-- 购物车为空时显示 -->
		<view class="shopping-null" v-if="!cartList.length">
			<image src="../../static/img/cart/null.png" class="image" mode=""></image>
		</view>
		<!-- 商品列表 -->
		<view class="list-box">
			<checkbox-group name="" class="list" @change="setItem">
				<scroll-view scroll-y="true" class="scroll">
					<view class="item" v-for="(item,index) in cartList" :key="index">
						<checkbox :value="index.toString()" :checked="item.check" class="checkbox"/>
						<image class="image" :src="item.image" mode=""></image>
						<view class="desc">
							<view class="title">70gA4黑白打印复印</view>
							<view class="price">￥{{item.price}}</view>
						</view>
						<view class="nums">
							<uni-number-box :min="1" :value="item.cNum" @change="setNum(index,$event)"></uni-number-box>
						</view>
					</view>
					<view class="dd"></view>
				</scroll-view>
			</checkbox-group>
		</view>
		<!-- 底部 -->
		<view class="footer" v-if="cartList.length">
			<checkbox-group name="" class="checkbox" @change="setAllCheck">
				<label>
					<checkbox :value="'all'" :checked="allCheck" /><text>全选({{pitchOnNum}})</text>
				</label>
			</checkbox-group>
			<view class="btns">
				<view class="price">￥{{totalPrice}}</view>
				<view class="btn-order">
					立即下单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {cart} from "../../APIs/index.js"
	export default {
		data() {
			return {
				cartList:[],
				totalPrice:0,
				pitchOnNum:0,
				allCheck:false
			};
		},
		onReady() {
			
		},
		onShow(){
			this.loadMore()
		},
		methods:{
			loadMore(){
				cart().then(res=>{
					let [err,{data}]=res;
					if(data.code==-1){
						uni.showToast({
							title:data.msg,
							icon:"none"
						})
						let timer = setTimeout(()=>{
							uni.redirectTo({
								url:"../login/login"
							})
						},600)
					}else{
						data.data.map(item=>{
							item.check = false
							return item;
						})
						this.cartList = data.data
					}
				})
			},
			setItem(e){
				let pitchOnArr = e.detail.value
				this.pitchOnNum = pitchOnArr.length
				this.allCheck=this.pitchOnNum==this.cartList.length?true:false
				this.countPriceNum()
				console.log(55)
			},
			setAllCheck(e){
				let pitchOnArr = e.detail.value
				if(pitchOnArr.length){
					this.cartList.map(item=>{
						item.check = true
						return item
					})
				}else{
					this.cartList.map(item=>{
						item.check = false
						return item
					})
				}
				this.countPriceNum()
			},
			setNum(index,e){
				// console.log(this.cartList)
				// console.log(index,e)
			},
			countPriceNum(){
				let count = 0
				this.cartList.map(item=>{
					if(item.check==true){
						count += item.price*item.cNum
					}
				})
				this.totalPrice = count
			}
		}
	}
</script>

<style lang="scss">
.cart{
	background-color: $color-new-gray;
	position: fixed;
	width: 100%;
	height: 100%;
	// 顶部质量
	.labelNav{
		height: 80upx;
		background-color: $color-new-gray;
		justify-content: space-around;
		align-items: center;
		display: flex;
		.item{
			font-size: 24upx;
			color: $color-gray;
		}
	}
	// 购物数量
	.shopping-num{
		background-color: #ffffff;
		padding: 15upx 25upx;
		font-size: 28upx;
		text{
			padding: 0 10upx;
			color: $index-color;
		}
		.btn-manage{
			float: right;
			font-size: 24upx;
			border: 1upx solid $color-gray;
			padding: 5upx 25upx ;
			border-radius: 10upx;
		}
	}
	// 购物车为空
	.shopping-null{
		text-align: center;
		padding-top: 120upx;
		.image{
			width: 500upx;height: 380upx;
			
		}
	}
	// 商品列表
	.list-box{
		height: 100%;
		.list{
			height: 100%;
			.dd{
				width: 100%;
				height: 240upx;
				// #ifdef H5
				height: 420upx;
				// #endif
			}
			.scroll{
				height: 100%;
				.item{
					height: 140upx;
					padding: 10upx 0;
					margin-top: 10upx;
					background-color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: space-around;
					.image{
						width: 125upx;
						height: 125upx;
						border-radius: 10upx;
					}
					.desc{
						font-size: 28upx;
						.title{
							margin-bottom: 15upx;
						}
					}
					.nums{
						height: 125upx;
						display: flex;
						align-items: flex-end;
						width: 180upx;
					}
				}
			}
		}
		
	}
	// 底部控制栏
	.footer{
		z-index: 10;
		position: fixed;
		background-color: #fafafa;
		bottom: 0;
		// #ifdef H5
		bottom: 94upx;
		// #endif
		width: 100%;
		height: 80upx;
		display: flex;
		align-items: center;
		font-size: 28upx;
		justify-content: space-between;
		.checkbox{
			margin: 0 20upx;
		}
		.btns{
			display: flex;
			align-items: center;
			margin: 0 20upx;
			.price{
				margin: 0 20upx;
				font-size: 26upx;
				color: $index-color;
			}
			.btn-order{
				padding: 10upx 40upx;
				border-radius: 40upx;
				font-size: 26upx;
				color: #FFFFFF;
				background-color: $index-color;
			}
		}
	}
}
</style>
