<template>
	<div class="shopcart">
		<div class="content" @click='toggleList'>
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show='totalCount>0'>{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop='pay'>
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container"></div>
		<transition name='slideUp'>
		<div class="shopcart-list" v-show='listShow'>
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class='empty' @click='empty'>清空</span>
			</div>
			<div class="list-content" ref='listContent'>
				<ul>
					<li v-for='food in selectedFoods' class='food'>
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartControl :food='food'></cartControl>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
		<transition name='fade'>
	       <div class="listMask" v-show='listShow' @click='hideList'></div>
	    </transition>
	</div>
</template>

<script>
    import cartControl from '../cartControl/cartControl.vue';
    import BScroll from 'better-scroll';

	export default {
		props: {
			selectedFoods: {
              type: Array,
              default() {
              	return [];
              }
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
          return {
          	fold: true
          };
		},
		computed: {
            totalPrice() {
            	let total = 0;
            	this.selectedFoods.forEach((food) => {
            		total += food.price * food.count;
            	});
            	return total;
            },
            totalCount() {
            	let count = 0;
            	this.selectedFoods.forEach((food) => {
            		count += food.count;
            	});
            	return count;
            },
            payDesc() {
               if (this.totalPrice === 0) {
               	return `￥${this.minPrice}元起送`;
               } else if (this.totalPrice < this.minPrice) {
               	  let diff = this.minPrice - this.totalPrice;
               	  return `还差￥${diff}元起送`;
               } else {
               	  return '去结算';
               }
            },
            payClass() {
            	if (this.totalPrice < this.minPrice) {
            		return 'not-enough';
            	} else {
                    return 'enough';
            	}
            },
            listShow() {
            	if (this.totalCount === 0) {
            		this.fold = true;
            		return false;
            	}
            	let show = !this.fold;
            	if (show) {
            		if (!this.scroll) {
            		  this.$nextTick(() => {
            		   	  this.scroll = new BScroll(this.$refs.listContent, {
            				 click: true
            			  });
            		  });
            	    } else {
            	    	this.scroll.refresh();
            	    }
            	}
            	return show;
            }
		},
		methods: {
             toggleList() {
             	if (!this.totalCount) {
             		return;
             	}
             	this.fold = !this.fold;
             },
             empty() {
             	this.selectedFoods.forEach((food) => {
             		food.count = 0;
             	});
             },
             hideList() {
             	this.fold = true;
             },
             pay() {
               if (this.totalPrice < this.minPrice) {
               	 return;
               }
               window.alert(`请支付${this.totalPrice}元`);
             }
		},
		components: {
		  'cartControl': cartControl
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

	.shopcart
	  position: fixed
	  bottom:0
	  left:0
	  z-index:100
	  height:48px
	  width:100%
	  .content
	  	display:flex
	  	background-color:#141d27
	  	color:rgba(255,255,255,0.4)
	  	.content-left
	      flex-grow:1
	      font-size:0
	      .logo-wrapper
	        display:inline-block
	        position:relative
	        top:-10px
	        margin:0 12px
	        padding:6px
	        width:56px
	        height:56px
	        box-sizing: border-box
	        vertical-align:top
	        border-radius:50%
	        background-color:#141d27
	        text-align:center
	        .num
	          position:absolute
	          top:0
	          right:0
	          width:24px
	          height:16px
	          line-height:16px
	          border-radius:16px
	          font-size:9px
	          font-weight:700
	          color:#fff
	          background-color: rgb(240,20,20)
	          box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
	        .logo
	          width:100%
	          height:100%
	          border-radius:50%
	          background-color: #2b343c
	          &.highlight
	          	background-color: rgb(0,160,220)
	          .icon-shopping_cart
	          	font-size:24px
	          	line-height:44px
	          	color:#80858a
	          	&.highlight
	          	  color:#fff
	      .price
	      	display:inline-block
	      	vertical-align:top
	      	line-height:24px
	      	padding-right:12px
	      	margin-top:12px
	      	box-sizing:border-box
	      	border-right:1px solid rgba(255,255,255,0.1)
	      	font-size:16px
	      	font-weight:700
	      	&.highlight
	      	  color:#fff
	      .desc
	      	display:inline-block
	      	vertical-align:top
	      	margin:12px 0 0 12px
	      	line-height:24px
	      	font-size:10px 
	    .content-right
	      flex-basis:105px
	    .content-right
	      width:105px
	      .pay
	      	height:48px
	      	line-height:48px
	      	text-align:center
	      	font-size:12px
	      	font-weight:700
	      	&.not-enough
	      	  background-color: #2b333b
	      	&.enough
	      	  background-color: #00b43c
	      	  color:#fff
	  .shopcart-list
	  	position:absolute
	  	bottom:100%
	  	left:0
	  	z-index:-1
	  	width:100%
	  	transform: translate3D(0,0,0)
	  	&.slideUp-enter-active,&.slideUp-leave-active
	  	  transition: all .5s
	  	&.slideUp-enter,&.slideUp-leave-active
	      transform: translate3D(0,100%,0)
	    .list-header
	      height:40px
	      line-height:40px
	      padding:0 18px
	      background-color: #f3f5f7
	      border-bottom:1px solid rgba(7,17,27,0.1)
	      .title
	      	float:left
	      	color:rgb(7,17,27)
	      	font-size:14px
	      .empty
	      	float:right
	      	font-size:12px
	      	color:rgb(0,160,220)
	    .list-content
	      padding:0 18px
	      max-height:217px
	      background-color: #FFF
	      overflow:hidden
	      .food
	      	position:relative
	      	padding:12px 0
	      	box-sizing:border-box
	      	border-bottom-1px(rgba(7,17,27,0.1))
	      	height:auto
	      	.name
	      	  line-height:24px
	      	  font-size:14px
	      	  color:rgb(7,17,27)
	      	.price
	      	  position:absolute
	      	  right:90px
	      	  bottom:12px
	      	  line-height:24px
	      	  font-size:14px
	      	  font-weight:700
	      	  color:rgb(240,20,20)
	      	.cartcontrol-wrapper
	      	  position:absolute
	      	  right:0
	      	  bottom:6px
	  .listMask
	    position:fixed
	    top:0
	    left:0
	    width:100%
	    height:100%
	    z-index:-10
	    backgrop-filter:blur(10px)
	    opacity:1
	    background-color: rgba(7,17,27,0.6)
	    &.fade-enter-active,&.fade-leave-active
	      transition: all .7s
	    &.fade-enter,&.fade-leave-active
	      opacity:0
	      background-color: rgba(7,17,27,0)	      
</style>


