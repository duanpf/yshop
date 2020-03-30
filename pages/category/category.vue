<template>
	<view class="categoryList">
		<!-- 搜索框 -->
		<uni-search-bar placeholder="搜索商品信息" radius="100" clearButton="none" cancelButton="none" @confirm="searchConfirm" @input="searchInput" />
		<!-- 分类盒子 -->
		<view class="box">
			<!-- 左边大类 -->
			<view class="left">
				<view v-for="(item,index) in categoryList" :key="index" class="item" :class="{active:scrollActive==index}" @click="setList(index)">
					{{item.cateName}}
				</view>
			</view>
			<!-- 右边细分类 -->
			<view class="right">
				<scroll-view scroll-y="true" class="scroll" :scroll-into-view="clickId" scroll-with-animation="true" @scroll="scroll">
					<view v-for="(item,index) in categoryList" :key="index" :id="'sp'+index" class="item-box">
						<view class="title">
							<view class="line"></view>
							<view class="name">
								{{item.cateName}}
							</view>
							<view class="line"></view>
						</view>
						<view class="list-box">
							<uni-grid :column="3" :showBorder="false" :highlight="false" @change="clickItem">
								<uni-grid-item v-for="(it,idx) in item.children" :key="idx" :index="it.id">
									<image :src="it.pic" mode="" :lazy-load="true" class="image"></image>
									<text class="cateName">{{it.cateName}}</text>
								</uni-grid-item>
							</uni-grid>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {category} from "../../APIs/index.js"
	export default {
		data() {
			return {
				categoryList:[],
				scrollActive:0,
				clickId:'sp0',
				typeTopList:[],
			};
		},
		onLoad() {
			
		},
		onReady() {
			uni.showLoading({
				title:"加载数据中……",
				mask:true
			})
			category().then(res=>{
				let [err,{data}] = res;
				uni.hideLoading()
				if(data.code==1){
					this.categoryList = data.data
					let timer = setTimeout(()=>{
						this.getNodesInfo()
						clearTimeout(timer)
					},80)
					
				}else{
					uni.showToast({
						title:data.msg,
						icon:'none'
					})
				}
			})
		},
		methods:{
			getNodesInfo(){//获取所有右侧标题高度
				const query = uni.createSelectorQuery().in(this);
				query.selectAll(".title").boundingClientRect().exec(data => {
					console.log(data)
					let nodes = data[0]
					let rel = []
					let oneTop=nodes[0].top
					nodes.map(item=>{
						item.top=item.top-oneTop	
						rel.push(item.top)
					})
					this.typeTopList=rel
				});
			},
			scroll(data){//右侧scroll-view滚动事件
				let scrollTop = data.detail.scrollTop
				for (let i = 0; i < this.typeTopList.length; i++) {
					let top1 = this.typeTopList[i]
					let top2 = this.typeTopList[i+1]
					if(scrollTop>=top1&&scrollTop<top2){
						this.scrollActive=i
					}
				}
			},
			setList(id){//左侧分类被点击，右侧同步
				this.scrollActive = id
				this.clickId = 'sp'+id
			},
			searchConfirm(val){//搜索框回车事件
				
			},
			searchInput(val){//搜索框内容改变事件
			},
			clickItem(data){//分类被点击
				console.log(data)
			},
			
		}
	}
</script>

<style lang="scss">
.categoryList{
	.box{
		// background-color: $index-color;
		position: fixed;
		width: 100%;height: 100%;
		padding-bottom: 100upx;
		display: flex;
		.left{
			background-color: #F1F1F1;
			.item{
				font-size: 26upx;
				padding: 15upx 20upx;
			}
			.active{
				background-color: #F8F8F8;
				color: $index-color;
				border-left: 4upx solid $index-color;
				font-weight: bold;
			}
		}
		.right{
			flex: 1;
			padding-bottom: 50px;
			// #ifdef H5
			padding-bottom: 150px;
			// #endif
			.scroll{
				height: 100%;
				.title{
					font-size: 28upx;
					text-align: center;
					font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: center;
					line-height: 60upx;
					.line{
						background-color: #333333;
						width: 100upx;
						height: 1upx;
					}
					.name{
						margin: 0 30upx;
					}
				}
				.list-box{
					padding: 20upx 40upx;
					.image{
						width: 60%;
						height: 60%;
						border-radius: 50%;
						margin: auto;
					}
					.cateName{
						font-size: 28upx;
						text-align: center;
					}
				}
			}
			
		}
	}
}
</style>
