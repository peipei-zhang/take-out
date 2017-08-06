<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="商家图片" width="64px" height="64px">
			</div>
			<div class="content">
				<div class="title">
				    <span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if='seller.supports' class="supports">
					<span class="icon" :class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if='seller.supports' class="support_count">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="info-wrapper">
			<span class='info-title'></span><span class='info-text'>{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="商家图片" width='100%' height="100%">
		</div>
		<div class="detail"></div>
	</div>
</template>

<script type='text/ecmascript-6'>
	export default {
      props: {
        seller: {
          type: Object
        }
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      }
	};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '../../common/stylus/mixin.styl';
    
	.header
	  position:relative
	  color:#fff
	  background-color: rgba(7,17,27,0.5)
	  overflow:hidden
	  .content-wrapper
	  	position:relative
	  	padding:24px 12px 18px 24px
	  	font-size:0
	  	.avatar
	  	  display:inline-block
	  	  vertical-align:top
	  	  img 
	  	  	border-radius:2px
	  	.content
	  	  display:inline-block
	  	  margin-left:16px
	  	  font-size:14px
	  	  .title
	  	    margin:2px 0 8px 0;
	  	    .brand
	  	      display:inline-block
	  	      vertical-align:top
	  	      width:30px
	  	      height:18px
	  	      bg-image('brand',30px,18px,no-repeat)
	  	    .name
	  	      margin-left:6px
	  	      font-size:16px
	  	      line-height:18px
	  	      font-weight:bold
	  	  .description
	  	  	margin-bottom:10px
	  	  	line-height:12px
	  	  	font-size:12px
	  	  .supports
	  	  	.icon
	  	      display:inline-block
	  	      vertical-align:top
	  	      width:12px
	  	      height:12px
	  	      margin-right:4px
	  	      &.decrease
	  	       	bg-image('decrease_1',12px,12px,no-repeat)
	  	      &.discount
	  	       	bg-image('discount_1',12px,12px,no-repeat)
	  	      &.guarantee
	  	        bg-image('guarantee_1',12px,12px,no-repeat)
	  	      &.invoice
	  	        bg-image('invoice_1',12px,12px,no-repeat)
	  	      &special
	  	       	bg-image('special_1',12px,12px,no-repeat)
	  	    .text
	  	      vertical-align:top
	  	      line-height:12px
	  	      height:12px
	  	      font-size:10px
	  	.support_count
	      position:absolute
	      right:12px
	      bottom:14px
	      padding:0 8px
	      height:24px
	      line-height:24px
	      border-radius:14px
	      background-color: rgba(0,0,0,0.2)  
	      text-align:center
	  	  .count
	  	  	vertical-align:top
	  	  	font-size:10px
	  	  .icon-keyboard_arrow_right
	  	    margin-left:2px
	  	    line-height:24px
	  	  	font-size:10px
	  .info-wrapper
	  	position:relative
	  	height:28px
	  	line-height:28px
	  	padding:0 22px 0 12px
	  	white-space:nowrap
	  	overflow:hidden
	  	text-overflow:ellipsis
	  	background-color:rgba(7,17,27,0.2)
	  	.info-title
	  	  display:inline-block
	  	  vertical-align:middle
	  	  width:22px
	  	  height:12px
	  	  bg-image('bulletin',22px,12px,no-repeat) 
	  	.info-text
	  	  vertical-align:middle
	  	  font-size:10px
	  	  margin:0 4px
	  	.icon-keyboard_arrow_right
	  	  position:absolute
	  	  right:12px
	  	  top:8px
	  	  font-size:10px
	  .background
	  	position:absolute
	  	top:0
	  	left:0
	  	width:100%
	  	height:100%
	  	z-index:-1
	  	-webkit-filter:blur(10px)
	  	filter:blur(10px)
	  .detail
	  	position:fixed
	  	top:0
	  	left:0
	  	z-index:1000
	  	width:100%
 	  	height:100%
        overflow:auto
        background-color:rgba(7,17,27,0.8)	  	
</style>