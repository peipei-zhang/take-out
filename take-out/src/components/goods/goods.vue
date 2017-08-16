<template>
	<div class="goods">
	     <div class="menu-wrapper" ref='menuwrapper'>
         <ul>
            <li v-for='(item,idx) in goods' class="menu-item" :class="{'current':idx===currentIndex}" @click='selectMenu(idx,$event)' key='idx'>
               <span class="text border-bottom-1px">
                 <span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span>{{item.name}}
               </span>
             </li>
          </ul> 
        </div>
	   <div class="foods-wrapper" ref='foodswrapper'>
        <ul>
           <li v-for='item in goods' class='food-list food-list-hook'>
               <h1 class="title">{{item.name}}</h1>
               <ul>
                 <li v-for='food in item.foods' class='food-item border-bottom-1px' @click='selectFood(food,$event)'>
                     <div class="icon">
                       <img width='57px' heigt='57px' v-bind:src="food.icon" alt="商品图片">
                     </div>
                     <div class="content">
                        <h2 class="name">{{food.name}}</h2>
                        <p class="desc">{{food.description}}</p>
                        <div class="extra">
                           <span class="count">月售{{food.sellCount}}</span>
                           <span>好评率{{food.rating}}</span>
                        </div>
                        <div class="price">
                           <span class="now">￥{{food.price}}</span>
                           <span class="old" v-if='food.oldPrice'>￥{{food.oldPrice}}</span>
                        </div>
                     </div>
                      <div class="cartcontrol-wrapper">
                           <cartControl :food='food'></cartControl>
                      </div>
                 </li>
               </ul>
           </li>
         </ul> 
     </div>
     <shopcart :selected-foods='selectedFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
      <food :food='selected' ref='food'></food>
	</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartControl from '../cartControl/cartControl.vue';
  import food from '../food/food.vue';

	const ERR_OK = 0;

	export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          goods: {},
          listHeight: [],
          scrollY: Number,
          selected: Object
        };
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$axios.get('/api/goods').then((response) => {
           response = response.data;
           if (response.errno === ERR_OK) {
              this.goods = response.data;
              this.$nextTick(() => {
                 this._initScroll();
                 this._calculateHeight();
              });
           }
           this.selectedFoods;
        });
      },
      computed: {
        currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (this.scrollY >= height1 && this.scrollY < height2) {
              return i;
            }
          }
          return 0;
        },
        selectedFoods() {
          let foods = [];
          let goods = this.goods;
             goods.forEach((good) => {
                good.foods.forEach((food) => {
                 if (food.count > 0) {
                   foods.push(food);
                 }
             });
          });
          return foods;
        }
      },
      methods: {
        _initScroll() {
          this.menuScroll = new BScroll(this.$refs.menuwrapper, {
            click: true
          });
          this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
            click: true,
             probeType: 3
          });

          this.foodsScroll.on('scroll', (pos) => {
             this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight() {
           let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
           let height = 0;
           this.listHeight.push(height);
           for (var i = 0; i < foodList.length; i++) {
              height += foodList[i].offsetHeight;
              this.listHeight.push(height);
           }
        },
        selectMenu(index, event) {
            if (!event._constructed) {
              return;
            };
            let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        },
        selectFood(food, event) {
          if (!event._constructed) {
              return;
            };
            this.selected = food;
            this.$refs.food.show();
        }
      },
      components: {
        'shopcart': shopcart,
        'cartControl': cartControl,
        'food': food
      }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
  
	.goods
	  position:absolute
	  display:flex
	  overflow:hidden
	  top:176px
	  bottom:46px
	  width:100%
	  .menu-wrapper
	  	width:80px
	  .menu-wrapper
	  	flex-basis:80px
	  	background-color: #f3f5f7   
	  	.menu-item
	  	  width:56px
	  	  height:54px
	  	  line-height:14px
	  	  margin:0 auto
	  	  text-align:center
	  	  .icon
	  	  	display:inline-block
	  	  	vertical-align:top
	  	  	width:12px
	  	  	height:12px
	  	  	margin-right:2px
	  	  	&.decrease
	  	  	  bg-image('decrease_3',12px,12px,no-repeat)
	  	  	&.discount
	  	  	  bg-image('discount_3',12px,12px,no-repeat)
	  	  	&.guarantee
	  	  	  bg-image('guarantee_3',12px,12px,no-repeat)
	  	  	&.invoice
	  	  	  bg-image('invoice_3',12px,12px,no-repeat)
	  	  	&.special
	  	  	  bg-image('special_3',12px,12px,no-repeat)
	  	  .text
	  	  	display:table-cell
	  	  	width:56px
	  	  	height:56px
	  	  	vertical-align:middle
	  	  	font-size:12px
	  	  	border-bottom-1px(rgba(7,17,27,0.1))
	  .foods-wrapper
	  	flex-grow:1
	  .foods-wrapper
	  	.food-list
	  	  .title
	  	  	padding-left:14px
	  	  	height:26px
	  	  	line-height:26px
	  	  	border-left:2px solid #d9ddE1
	  	  	font-size:12px
	  	  	color:rgb(147,153,159)
	  	  	background-color: #f3f5f7
	  	  .food-item
	  	  	display:flex
	  	  	padding:18px
	  	  	border-bottom-1px(rgba(7,17,27.0.1))
	  	  	&:last-child:after
	  	  	  border:none
	  	  	.icon
	  	  	  flex-basis:57px
	  	  	  margin-right:10px  
	  	  	.content
	  	  	  flex-grow:1
	  	  	  font-size:10px
	  	  	  line-height:10px
	  	  	  color:rgb(147,153,159)
	  	  	  .name
	  	  	  	height:14px
	  	  	  	line-height:14px
	  	  	  	margin:2px 0 8px 0
	  	  	  	font-size:14px
	  	  	  	color:rgb(7,17,27)
	  	  	  	font-weight:bold
	  	  	  .desc
	  	  	  	margin-bottom:8px
	  	  	  .extra
	  	  	  	.count
	  	  	  	  margin-right:12px
	  	  	  .price
	  	  	    font-weight:400
	  	  	    line-height:24px 
	  	  	    .now
	  	  	      margin-right:8px
	  	  	      font-size:14px
	  	  	      color:rgb(240,20,20)
	  	  	    .old
	  	  	      text-decoration:line-through
	  	  	      font-size:10px     
</style>