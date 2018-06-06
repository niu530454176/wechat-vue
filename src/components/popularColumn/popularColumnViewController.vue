<template>
  <div id="popularColumn">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="player-room">
      <div id="player" style="width: 100%; height:100%"></div>
    </div>
    <div class="col-room"
         v-waterfall-lower="loadMore"
         waterfall-disabled="disabled">
      <div class="col-item" v-for="(item, index) in columnList" @click="targetPlayVideo(item.kfVideo)">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
        <div class="item-img"><img :src="getImg(item.kfImg)" alt=""></div>
        <div class="col-name">
          <div class="name">{{ item.title }}</div>
          <!--<div class="time" v-html="getTime(item.kfPublish)"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
  const {TcPlayer} = require('tcplayer');
  import owl from '@/owl';
  import '@/assets/iconfont/iconfont.css';
  export default {
    name: 'popularColumn',
    data: function () {
      return {
        domain: owl.domain,
        pageIndex: 0,
        type: '',
        columnList: [],
        disabled: false,
      }
    },
    created: function () {
      this.type = this.$route.query.type;
      this.getColumnList();
    },
/*    mounted() {
      let _this = this;
      setTimeout(function () {
        if (_this.isScroll) {
          window.addEventListener('scroll', _this.menu);
        }
      }, 2000)
    },*/
    methods: {
      getColumnList () {
        let _this = this;
        this.pageIndex++;
        let index = this.pageIndex;
        let testColumnUrl = this.domain + '/program/kungfuListByType.do?pageIndex=' + this.pageIndex + '&pageSize=10&type=' + this.type;
        fetch(testColumnUrl).then(res => {
          return res.json();
        }).then( json => {
          for (let i = 0; i < json.meta.rows.length; i++) {
            _this.columnList.push(json.meta.rows[i]);
          }
          if (!json.meta.rows.length) {
            this.pageIndex = index - 1;
          } else {
            _this.disabled = false;
          }
          let url = this.columnList[0].kfVideo;
          _this.initPlayer(url);
        })
      },
      getImg (img) {
        let url = owl.domain + img;
        return url;
      },
      initPlayer (url) {
        document.getElementById('player').innerHTML = '';
        var option = {
          "autoplay": true,
          "width": "100%",
          "height": "100%",
          listener: function (msg) {
          }
        };
        if (url.indexOf('mp4') > 0) {
          option.mp4 = url;
        } else if (url.indexOf('m3u8') > 0) {
          option.m3u8 = url;
        } else if (url.indexOf('flv') > 0) {
          option.flv = url;
        }
        new TcPlayer('player', option);
      },
      getTime (time) {
        let times = new Date(time * 1000);
        return times.getFullYear() + '/' + (times.getMonth() + 1) + '/' + times.getDate()
      },
      targetPlayVideo(videoUrl) {
        this.initPlayer(videoUrl);
      },
      loadMore() {
        if (!document.getElementById('player')) {
          return;
        }
        this.disabled = true;
        this.getColumnList();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../Home/base.less";
  #popularColumn {
    background-color: #fdfdfd;
    .itemW;
    height:11.63rem;
  .player-room{
    width:100%;
    height: 5.2rem;
    background-color: #333;
  }
  .col-room{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  .col-item{
    width: 4.40rem;
    height: 3.40rem;
    position: relative;
    margin-top:0.32rem;
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
  .item-img {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0.3rem #999;
    width: 100%;
    border-radius: 0.18rem;
    overflow: hidden;
    height: 2.93rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .col-name {
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    bottom: 0;
    text-align: left;
    font-size: 0.28rem;
    color: #2c0f0e;
    .name {
      float: left;
      width: 100%;
      text-align: center;
    }
    .time {
      float: right;
    }
  }
  }
  }
  }
</style>
