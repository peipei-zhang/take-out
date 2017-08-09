<template>
  <div class='cartcontrol'>
    <transition name='move'>
  	 <div class="cart-decrease" v-show='food.count>0' @click='decreaseCount'>
       <span class="inner icon-remove_circle_outline"></span>
     </div>
    </transition>
  	<div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
  	<div class="icon-add_circle cart-increase" @click='addCart($event)'></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
     props: {
     	food: {
     		type: Object
     	}
     },
     created() {
     },
     methods: {
        addCart(event) {
          if (!event._constructed) {
            return;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
        },
        decreaseCount(event) {
          if (!event._constructed) {
            return;
          }
          this.food.count--;
        }
     }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size:0
      height:36px
      .cart-decrease
        display:inline-block
        padding:6px
        transform:translate3D(0,0,0)
        opacity:1
        .inner
          display:inline-block
          font-size:24px
          line-height:24px
          color:rgb(0,160,220)
          transition: all .4s linear
          transform:rotate(0deg)
        &.move-enter-active,&.move-leave-active
          transition: all .4s linear
        &.move-enter,&.move-leave
          opacity:0
          transform:translate3D(24px,0,0)
          .inner
            transform:rotate(180deg)
      .cart-count
        display:inline-block
        width:12px
        text-align:center
        font-size:12px
        position:relative
        top:-6px
        color:rgb(127, 153, 159)
      .cart-increase
        display:inline-block
        padding:6px
        font-size:24px
        line-height:24px
        color:rgb(0,160,220)
</style>