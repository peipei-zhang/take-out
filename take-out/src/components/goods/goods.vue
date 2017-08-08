<template>
	<div class="goods">
	     <div class="menu-wrapper">
         <ul>
            <li v-for='item in goods' class="menu-item">
               <span class="text border-bottom-1px">
                 <span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span>{{item.name}}
               </span>
             </li>
          </ul> 
        </div>
	   <div class="foods-wrapper">
        <ul>
           <li v-for='item in goods' class='food-list'>
               <h1 class="title">{{item.name}}</h1>
               <ul>
                 <li v-for='food in item.foods' class='food-item border-bottom-1px'>
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
                 </li>
               </ul>
           </li>
         </ul> 
     </div>
	</div>
</template>

<script type="text/ecmascript-6">
	const ERR_OK = 0;

	export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          goods: {}
        };
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$axios.get('/api/goods').then((response) => {
           response = response.data;
           if (response.errno === ERR_OK) {
              this.goods = response.data;
           }
        });
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