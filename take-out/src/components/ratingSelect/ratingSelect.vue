<template>
  <div class="ratingSelect">
  	  <div class="rating-type">
  	  	 <span class='block positive' :class="{'active':selectType===2}" @click='select(2,$event)'>{{desc.all}}<span class="count">{{ratings.length}}</span></span>
  	  	 <span class='block positive' :class="{'active':selectType===0}" @click='select(0,$event)'>{{desc.positive}}<span class="count">{{positives.length}}</span></span>
  	  	 <span class='block negative' :class="{'active':selectType===1}" @click='select(1,$event)'>{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  	  </div>
  	  <div class="switch" :class="{'on':onlyContent}" @click='toggleContent($event)'>
  	  	<i class='icon-check_circle'></i>
  	  	<span class="text">只看有内容的评价</span>
  	  </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				};
			}
		}
	},
	methods: {
		select(type, event) {
			if (!event._constructed) {
				return;
			}
			this.selectType = type;
		},
		toggleContent(event) {
            this.onlyContent = !this.onlyContent;
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';

	.ratingSelect
	  .rating-type
	  	padding:18px 0
	  	margin:0 18px
	  	font-size:0
	  	border-bottom-1px(rgba(7,17,27,0.1))
	  	.block
	  	  display:inline-block
	  	  padding:12px
	  	  margin-right:8px
	  	  border-radius:1px
	  	  font-size:12px
	  	  color:rgb(77,85,93)
	  	  &.active
	  	  	color:#fff
	  	  .count
	  	  	font-size:8px
	  	  	margin-left:2px
	  	  &.positive
	  	  	background-color: rgba(0,160,220,0.2)
	  	  	&.active
	  	  	  background-color: rgb(0,160,220)
	  	  &.negative
	  	  	background-color:rgba(77,85,93,0.2)
	  	  	&.active
	  	  	  background-color:rgb(77,85,93)
	  .switch
	  	padding:12px 18px
	  	border-bottom:1px solid rgba(7,17,27,0.1)
	  	font-size:0
	  	color:rgb(7,17,27)
	  	&.on
	  	  .icon-check_circle
	  	  	color:#00c850
	  	.icon-check_circle
	  	  margin-right:4px
	  	  vertical-align:top
	  	  font-size:24px
	  	.text
	  	  vertical-align:top
	  	  line-height:24px
	  	  font-size:12px
</style>