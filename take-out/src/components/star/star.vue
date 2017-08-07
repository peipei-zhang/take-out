<template>
  <div class='star' :class='starType'>
        <span v-for='itemClass in itemClasses' :class='itemClass' class='starItem'>{{itemClass}}</span>
   </div>
</template>

<script type='text/ecmascript-6'>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_OFF = 'off';
    const CLS_HALF = 'half';

	  export default {
      props: {
        score: {
          type: Number
        },
        size: {
          type: Number
        }
      },
      computed: {
        starType() {
           return 'star-' + this.size;
        },
        itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(score);

          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
          }

          if (hasDecimal) {
            result.push(CLS_HALF);
          }

          while (result.length < LENGTH) {
            result.push(CLS_OFF);
          }

          return result;
        }
      }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '../../common/stylus/mixin.styl';
    
    .star
      font-size:0
      .starItem
        display:inline-block
      &.star-48
        .starItem
          width:20px
          height:20px
          margin-right:22px
          &:last-child
            margin-right:0
          &.on
            bg-image('star48_on',20px,20px,no-repeat)
          &.half
            bg-image('star48_half',20px,20px,no-repeat)
          &.off
            bg-image('star48_off',20px,20px,no-repeat)
      &.star-36
        .starItem
          width:15px
          height:15px
          margin-right:16px
          &:last-child
            margin-right:0
          &.on
            bg-image('star36_on',15px,15px,no-repeat)
          &.half
            bg-image('star36_half',15px,15px,no-repeat)
          &.off
            bg-image('star36_off',15px,15px,no-repeat)
      &.star-24
        .starItem
          width:10px
          height:10px
          margin-right:3px
          &:last-child
            margin-right:0
          &.on
            bg-image('star24_on',10px,10px,no-repeat)
          &.half
            bg-image('star24_half',10px,10px,no-repeat)
          &.off
            bg-image('star24_off',10px,10px,no-repeat)
</style>