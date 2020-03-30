<template>
	<view class="login">
		<!-- 图标 -->
		<view class="icon">
			<image src="../../static/img/login/icon.png" class="image" mode=""></image>
		</view>
		<!-- 表单盒子 -->
		<view class="form-box">
			<text class="title">账号登录</text>
			<view class="form">
				<view class="input">
					<image src="../../static/img/login/phone.png" mode=""></image>
					<input type="number" value="" placeholder="输入手机号码" @input="setUser" maxlength='11'/>
				</view>
				<view class="input">
					<image src="../../static/img/login/pwd.png" mode=""></image>
					<input type="text" value="" password="true" placeholder="输入登录密码"  @input="setPass"/>
				</view>
				<view class="btn-login" @click="login">登录</view>
			</view>
			<view class="to-reg">
				没有账号？<text @click="toReg">立即注册</text>
			</view>
			
		</view>
		<!-- 底衬 -->
		<view class="dc dc1"></view>
		<view class="dc dc2"></view>
		<view class="dc dc3"></view>
	</view>
</template>

<script>
	import {login} from "../../APIs/index.js"
	export default {
		data() {
			return {
				user:'',
				pass:''
			}
		},
		onLoad(op) {
			if(op.page=='login'){
				
			}
		},
		onReady() {
			console.log(this.$store.getters.token)
			// uni.setStorage({
			// 	key:"token",
			// 	data:'http://jquery.cuishifeng.cn/'
			// })
		},
		methods: {
			setUser(user){//手机号输入框内容改变事件
				this.user=user.detail.value
			},
			setPass(pass){//密码输入框内容改变事件
				this.pass=pass.detail.value
			},
			login(){//点击登录按钮
				login({user:this.user,pass:this.pass}).then(res=>{
					let [err,{data}] = res
					console.log(res)
					if(data.code==1){
						
						let token = data.data.token
						this.$store.commit('login',token)
						console.log(data)
						uni.setStorageSync("token",token)
						uni.switchTab({
							url:"../index/index"
						})
					}
					uni.showToast({
						icon:data.code==1?"success":"none",
						title:data.msg,
						mask:true
					})
				})
			},
			toReg(){
				uni.navigateTo({
					url:'../reg/reg'
				})
			}
		}
	}
</script>

<style lang="scss">
.login{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: $index-color;
	.icon{
		position: fixed;
		top: 100upx;
		left: 50%;
		margin-left: -70upx;
		.image{
			width: 140upx;height: 140upx;
		}
	}
	.form-box{
		position: fixed;
		top: 350upx;
		left: 50%;
		width: 650upx;
		background-color: #FFFFFF;
		text-align: center;
		margin-left: -325upx;
		padding: 30upx 0;
		border-radius: 20upx;
		z-index: 10;
		.title{
			font-size: 32upx;
			font-weight: bold;
			padding: 10upx 0;
			border-bottom: 4upx solid #ff5500;
		}
		.form{
			margin: 40upx;
			.input{
				display: flex;
				padding: 10upx 0;
				margin: 30upx 0;
				border-bottom: 1px solid #F1F1F1;
				image{
					width: 48upx;
					height: 48upx;
				}
				input{
					padding-left: 20upx;
					text-align: left;
				}
			}
			.btn-login{
				margin-top: 40upx;
				height: 80upx;
				border-radius: 60upx;
				line-height: 80upx;
				color: #FFFFFF;
				font-size: 32upx;
				font-weight: bold;
				background: -webkit-gradient(linear,left top,right top,from(#f35447),to(#ff8e3c));
				background: linear-gradient(90deg,#f35447 0,#ff8e3c);
				background: -moz-linear-gradient(to right,#f35447 0,#ff8e3c 100%);
			}
		}
		.to-reg{
			font-size: 30upx;
			color: #d3d3d3;
			text{
				color: $index-color;
			}
		}
		
	}
	.dc{
		position: fixed;
		background-color: #F0AD4E;
		left: 50%;
		border-radius: 8upx;
		opacity: .5;
	}
	.dc1{
		width: 600upx;
		height: 40upx;
		margin-left: -300upx;
		z-index: 9;
		top: 843upx;
	}
	.dc2{
		width: 550upx;
		height: 60upx;
		margin-left: -275upx;
		z-index: 9;
		top: 833upx;
	}
	.dc3{
		width: 500upx;
		height: 60upx;
		margin-left: -250upx;
		z-index: 9;
		top: 843upx;
	}
}
</style>
