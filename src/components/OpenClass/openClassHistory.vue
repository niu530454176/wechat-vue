<template>
  <div id="openClassHistory">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="player-room">
      <div id="player" style="width: 100%; height:100%"></div>
    </div>
    <div class="col-room"
         v-waterfall-lower="loadMore"
         waterfall-disabled="disabled">
      <div class="col-item" v-for="(item, index) in columnList" @click="targetPlayVideo(item.playBackUrl)">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
        <div class="item-img"><img :src="getImg(item.initImg)" alt=""></div>
        <div class="col-name">
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ getTime(item.startTime) }}</div>
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
    name: 'openClassHistory',
    data: function () {
      return {
        domain: owl.domain,
        pageIndex: 0,
        columnList: [],
        isHistoryScroll: true,
        agoDays: 0,
        firstInit: true,
        playerUrl: '',
        isFirstGetList: true,
        disabled: false,
      }
    },
    created: function () {
      this.getTimeStamp();
    },
    methods: {
      getTimeStamp: function () {
        var _this = this;
        _this.agoDays++;
        var timeStartStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
        var timeEndStamp = new Date(new Date().setHours(23, 59, 59, 999)) / 1000;
        if (_this.isFirstGetList) {
          _this.timeStartStamp = parseInt(timeStartStamp);
          _this.timeEndStamp = parseInt(timeEndStamp);
          _this.isFirstGetList = false;
        } else {
          //一天是86400秒   故n天前的时间戳为
          _this.timeStartStamp = parseInt(timeStartStamp - 86400 * _this.agoDays);
          _this.timeEndStamp = parseInt(timeEndStamp - 86400 * _this.agoDays);
        }
        _this.getColumnList(_this.timeStartStamp, _this.timeEndStamp);
      },
      getColumnList (timeStartStamp, timeEndStamp) {
        let _this = this;
        let testColumnUrl = this.domain + '/program/liveList.do?startTime=' + timeStartStamp + '&endTime=' + timeEndStamp;
        fetch(testColumnUrl).then(res => {
          return res.json();
        }).then( json => {
          for (let i = 0; i < json.data.length; i++) {
            if (!json.data[i].playBackUrl) continue;
            let interValId = setInterval(function () {
              if (_this.columnList.length <= 8) {
                _this.getTimeStamp();
              } else {
                clearInterval(interValId);
              }
            }, 200);
            _this.columnList.push(json.data[i]);
          }
          if (!json.data.length) {
            this.pageIndex = index - 1;
          }
          if (this.firstInit) {
            if (_this.columnList.length <= 8) {
              this.getTimeStamp();
            } else {
              let url = this.columnList[0].playBackUrl;
              this.playerUrl = url;
              _this.initPlayer(url);
              this.firstInit = false;
            }
          }
          this.disabled = false;
        })
      },
      getImg (img) {
        let url = owl.domain + img;
        return url;
      },
      initPlayer (url) {
        document.getElementById('player').innerHTML = '';
        let option = {
          "autoplay": true,
          "width": "100%",
          "height": "100%",
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
        if (this.playerUrl === videoUrl) {
          return;
        }
        this.playerUrl = videoUrl;
        this.initPlayer(videoUrl);
      },
      loadMore () {
        if (!document.getElementById('player')) {
          return;
        }
        this.disabled = true;
        this.getTimeStamp();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../Home/base.less";
  #openClassHistory {
    width: 10rem;
    background-color: #fdfdfd;
    height:11.63rem;
  .player-room{
    width:100%;
    height: 5.2rem;
    background-color: #333;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .col-room{
    display: flex;
    width: 94%;
    margin: 5.2rem auto 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  .col-item{
    width: 4.40rem;
    margin-top:0.32rem;
    position: relative;
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
    box-shadow: 0 0 0.3rem #999;
    width: 100%;
    border-radius: 0.18rem;
    overflow: hidden;
    position: relative;
    z-index: 1;
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
    display: flex;
    color: #2c0f0e;
  .name {
    float: left;
    width: 100%;
    text-align: left;
    flex: 1;
  }
  .time {
    flex: 1;
    text-align: right;
  }
  }
  }
  }
  }
</style>
