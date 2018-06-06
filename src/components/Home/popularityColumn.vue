<template>
    <div id="popularityColumn">
      <div class="title">
        <p class="title">人气栏目</p>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div class="col-room">
        <div class="col-item" v-for="(item, index) in columnData" @click="targetTypeColumn(item.sourceType)">
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
          <img :src="getImg(item.sourceUrl)" alt="">
          <div class="col-name">{{ item.source }}</div>
          <div class="mask"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import owl from '@/owl';
  import '@/assets/iconfont/iconfont.css';
  export default {
    name: 'popularityColumn',
    props: ['columnData'],
    data: function () {
      return {
        domain: owl.domain,
      }
    },
    created: function () {

    },
    methods: {
      getImg(img) {
        let url = owl.domain + img;
        return url;
      },
      targetTypeColumn(sourceType) {
        this.$router.push({
          path: '/popularColumn',
          query: {
            type: sourceType
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./base.less";
  #popularityColumn {
    background-color: #fdfdfd;
    .itemW;
    height:11.63rem;
    .title{
      height: 1.23rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      p.title{
        color: #fff * 0.267;
        font-size: 0.35rem;
      }
      .iconfont{
        font-size: 0.32rem;
        color: #fff * 0.59;
      }
    }
    .col-room{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .col-item{
        position: relative;
        width: 4.40rem;
        height: 2.93rem;
        border-radius: 0.08rem;
        margin-top:0.32rem;
        box-shadow: 0 0 0.3rem #999;
  .spinner {
    width: 1rem;
    height: .8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    margin-top: -.4rem;
    margin-left: -.33rem;
    text-align: center;
    font-size: .13rem;
  }

  .spinner > div {
    background-color: #67CF22;
    height: 100%;
    width: .08rem;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .col-name {
          width: 100%;
          position: absolute;
          height: .5rem;
          line-height: .5rem;
          bottom: 0;
          color: #ffffff;
          text-align: center;
          font-size: 0.24rem;
          z-index: 2;
        }
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          background: -webkit-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0) 62%,rgba(0,0,0,0.6) ); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0) 62%,rgba(0,0,0,0.6) ); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0) 62%,rgba(0,0,0,0.6) ); /* Firefox 3.6 - 15 */
          background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0) 62%,rgba(0,0,0,0.6) )
        }
      }
    }
  }
</style>
