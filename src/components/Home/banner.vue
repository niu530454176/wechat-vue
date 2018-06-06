<template>
  <div id="banner" @click="mclick">
    <van-swipe
      :autoplay="3000"
      @change="onChange"
    >
      <van-swipe-item
        v-for="(item, index) in data"
        :key="index"
        @click="mclick"
      >
        <img :src="getImg(item.bannerUrl)">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import owl from '@/owl';
  export default {
    name: 'banner',
    props: ['data'],
    data: function () {
      return {
        domain: owl.domain,
        num: 0
      }
    },
    created: function () {
        this.bannerCount = this.data.length;
    },
    methods: {
      getImg(img) {
        let url = owl.domain + img;
        return url;
      },
      onChange(index) {
          this.num = index;
//          console.log(this.data[index])

      },
      mclick() {
//          console.log(this.data[this.num])
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "./base.less";
  .baseWH {
    border-radius: 0.13rem;
    width: 9.28rem;
    height: 3.77rem;
  }
  #banner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height:100%;
    .van-swipe {
      .baseWH;
      box-shadow: 0 0.11rem 0.13rem 0 rgba(0,0,0,0.17);
      .van-swipe-item{
        img{
          height: 100%;
          width: 100%;
        }
      }
    }
  }
</style>
