<template>
	<div class='seller-wrapper' ref='sellerwrapper'>
	   <div class="seller-content">
		 <div class="overview">
			<h1 class="title">{{seller.name}}</h1>
			<div class="desc border-bottom-1px">
				<star :size='36' :score='seller.score'></star>
				<span class="text">({{seller.ratingCount}})</span>
				<span class="text">月售{{seller.sellCount}}单</span>
			</div>
			<ul class="remark">
               <li class="block">
               	 <h2>起送价</h2>
               	 <div class="content">
               	   <span class='stress'>{{seller.minPrice}}</span>元
               	 </div>
               </li>
               <li class="block">
               	 <h2>商家配送</h2>
               	 <div class="content">
               	   <span class='stress'>{{seller.deliveryPrice}}</span>元
               	 </div>
               </li>
               <li class="block">
               	 <h2>平均配送时间</h2>
               	 <div class="content">
               	   <span class='stress'>{{seller.deliveryTime}}</span>分钟
               	 </div>
               </li>
			</ul>
			<div class="favorite" @click='toggleFavorite($event)'>
				<i class="icon-favorite" :class="{'active':favorite}"></i>
				<span class='text'>{{favoriteText}}</span>
			</div>
		 </div>
		 <split></split>
		 <div class="bulletin">
		 	<h1 class="title">公告与活动</h1>
		 	<div class="content-wrapper border-bottom-1px">
		 		<p class="content">{{seller.bulletin}}</p>
		 	</div>
		 	<ul v-if='seller.supports' class="supports">
				<li v-for='(item,idx) in seller.supports' class='support-item border-bottom-1px' key='idx'>
					<span class='icon' :class='classMap[idx]'></span>
					<span class="text">{{item.description}}</span>
				</li>
			</ul>
		 </div>
		 <split></split>
		 <div class="pics">
		 	<h1 class="title">商家实景图</h1>
		 	<div class="pics-wrapper" refs='picswrapper'>
		 	    <ul class="pic-list" ref='piclist'>
		 		   <li class='pic-item' v-for='pic in seller.pics'>
		 		   	  <img :src="pic" alt="商家实景图" width='120px' height='90px'>
		 		   </li>
		 		</ul>
		 	</div>
		 </div>
		 <split></split>
		 <div class="info">
		 	<h1 class="title border-bottom-1px">商家信息</h1>
		 	<ul>
		 		<li class="info-item border-bottom-1px"  v-for='info in seller.infos'>
		 			{{info}}
		 		</li>
		 	</ul>
		 </div>
	   </div>
	</div>
</template>

<script type="text/ecmascript-6">
   import star from '../star/star.vue';
   import split from '../split/split.vue';
   import BScroll from 'better-scroll';
    import {saveToLocal, loadFromLocal} from '../../common/js/store.js';

	export default {
	  props: {
	     seller: {
	       type: Object
	     }
	  },
	  data() {
	    return {
	       favorite: (() => {
             return loadFromLocal(this.seller.id, 'favorite', false);
	       })()
	    };
	  },
	  created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	  },
	  mounted() {
         this._initScroll();
         this._initPics();
	  },
	  computed: {
         favoriteText() {
            return this.favorite ? '已收藏' : '收藏';
         }
	  },
	  methods: {
	     _initScroll() {
	        if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.sellerwrapper, {
                click: true
              });
           } else {
               this.scroll.refresh();
           }
	     },
	     _initPics() {
            if (this.seller.pics) {
              let picWidth = 120;
              let picMargin = 6;
              let width = picWidth * this.seller.pics.length + picMargin * (this.seller.pics.length - 1);
              this.$refs.piclist.style.width = width + 'px';
              this.$nextTick(() => {
                   if (!this.picScroll) {
                      this.picScroll = new BScroll(this.$refs.picswrapper, {
                         scrollX: true,
                         directionLockThreshold: 5
                      });
                   } else {
                      this.picScroll.refresh();
                   }
               });
           };
	     },
	     toggleFavorite(event) {
            if (!event._constructed) {
               return;
            }
            this.favorite = !this.favorite;
            saveToLocal(this.seller.id, 'favorite', this.favorite);
	     }
	  },
	  components: {
	    star,
	    split
	  }
	};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '../../common/stylus/mixin.styl';

	.seller-wrapper
	  position:absolute
	  top:176px
	  left:0
	  bottom:0
	  width:100%
	  overflow:hidden
	  .overview
	  	position:relative
	  	padding:18px
	  	.title
	  	  margin-bottom:8px
	  	  line-height:14px
	  	  font-size:14px
	  	  color:rgb(7,17,27)
	  	  font-weight:700
	  	.desc
	  	  padding-bottom:18px
	  	  line-height:18px
	  	  font-size:0
	  	  border-bottom-1px(rgba(7,17,27,0.1))
	  	  .star
	  	  	display:inline-block
	  	  	vertical-align:top
	  	  	margin-right:8px
	  	  .text
	  	  	display:inline-block
	  	  	vertical-align:top
	  	  	margin-right:12px
	  	  	line-height:18px
	  	  	font-size:10px
	  	  	color:rgb(147,153,159)
	  	.remark
	  	  display:flex
	  	  padding-top:18px
	  	  .block
	  	  	flex-grow:1
	  	  	text-align:center
	  	  	border-right:1px solid rgba(7,17,27,0.1)
	  	  	&:last-child
	  	  	  border-right:none
	  	  	h2
	  	  	  margin-bottom:4px
	  	  	  line-height:10px
	  	  	  font-size:10px
	  	  	  color:rgb(147,153,159)
	  	  	.content
	  	  	  line-height:24px
	  	  	  font-size:10px
	  	  	  color:rgb(7,17,27)
	  	  	  .stress
	  	  	  	font-size:20px
	  	.favorite
	  	  position: absolute
	  	  width:36px
	  	  right:18px
	  	  top:18px
	  	  text-align:center
	  	  .icon-favorite
	  	  	display:block
	  	  	color:#d4d6d9
	  	  	line-height:24px
	  	  	font-size:24px
	  	  	margin-bottom:4px
	  	  	&.active
	  	  	  color:rgb(240,20,20)
	  	  .text
	  	  	font-size:10px
	  	  	line-height:10px
	  	  	color:rgb(77,85,93)
	  .bulletin
	  	padding:18px 18px 0 18px
	  	.title
	  	  margin-bottom:8px
	  	  line-height:14px
	  	  font-size:14px
	  	  color:rgb(7,17,27)
	  	  font-weight:700
	  	.content-wrapper
	      padding:0 12px 16px 12px
	      border-bottom-1px(rgba(7,17,27,0.1))
	      .content
	      	line-height:24px
	      	font-size:12px
	  	  	color:rgb(240,20,20)
	  	.supports
	  	  .support-item
	  	  	border-bottom-1px(rgba(7,17,27,0.1))
	  	  	padding:16px 12px
	  	  	font-size:0
	  	  	&:last-child
	  	  	  border-none()
	  	  	.icon
	  	      display:inline-block
	  	      vertical-align:top
	  	      width:16px
	  	      height:16px
	  	      margin-right:6px
	  	      &.decrease
	  	       	bg-image('decrease_4',16px,16px,no-repeat)
	  	      &.discount
	  	       	bg-image('discount_4',16px,16px,no-repeat)
	  	      &.guarantee
	  	        bg-image('guarantee_4',16px,16px,no-repeat)
	  	      &.invoice
	  	        bg-image('invoice_4',16px,16px,no-repeat)
	  	      &.special
	  	       	bg-image('special_4',16px,16px,no-repeat)
	  	    .text
	  	      line-height:16px
	  	      font-size:12px
	  	      color:rgb(7,17,27)
	  .pics
	  	padding:18px
	  	.title
	  	  margin-bottom:12px
	  	  line-height:14px
	  	  font-size:14px
	  	  color:rgb(7,17,27)
	  	  font-weight:700
	  	.pics-wrapper
	  	  width:100%
	  	  overflow:hidden
	  	  white-space:nowrap
	  	  .pic-list
	  	  	font-size:0
	  	  	.pic-item
	  	  	  display:inline-block
	  	  	  margin-right:6px
	  	  	  width:120px
	  	  	  height:90px
	  	  	  &:last-child
	  	  	  	margin-right:0
	  .info
	  	padding:18px
	  	color:rgb(7,17,27)
	  	.title
	  	  padding-bottom:12px
	  	  line-height:14px
	  	  font-size:14px
	  	  color:rgb(7,17,27)
	  	  font-weight:700
	  	  border-bottom-1px(rgba(7,17,27,0.1))
	  	.info-item
	  	  padding:16px 12px
	  	  line-height:16px
	  	  font-size:12px
	  	  border-bottom-1px(rgba(7,17,27,0.1))
	  	  &:last-child
	  	  	border-none()	  	    
</style>