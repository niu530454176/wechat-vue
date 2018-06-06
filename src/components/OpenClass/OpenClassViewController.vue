<template>
  <div id="OpenClassViewController">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="player-room">
      <div class="player" v-if="living" id="livingPlayer" style="width: 100%; height:100%"></div>
      <div v-else style="width: 100%; height: 100%;" ><img width="100%" height="100%" :src="teacherImg" alt=""></div>
    </div>
    <div class="list-title">
      <div class="item-w" v-for="(item, index) in relations">
        <div :class="{hover:changeRed == index}" @click="handClick(index, item.id)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div v-show="listRoomText == 'livingList'" class="list-room">
      <ul class="item" v-for="(item, index) in LiveBroadcastList">
        <li> {{ getTime(item.startTime, item.endTime) }}</li>
        <li class="name">{{item.name}}</li>
        <li>
          <div class="btn" v-html="item.stateName"></div>
        </li>
        <!--<li><div v-else-if="getState(item.startTime, item.endTime) == finished" class="btn living">结束</div></li>-->
        <!--<li><div v-else="getState(item.startTime,  item.endTime) == sowing" class="btn living">预播</div></li>-->
      </ul>
    </div>
    <div v-show="listRoomText == 'teacherInformation'" class="list-room">
      <div class="teacherInformation">
        <div class="teacher-name">
          {{ teacherName }}
        </div>
        <div class="teacher-information">
          {{ teacherInformation }}
        </div>
      </div>
    </div>
    <div class="history" @click="$router.push('/openClassHistory');">公开课历史回顾</div>
  </div>
</template>

<script>
  const {TcPlayer} = require('tcplayer');
  import owl from '@/owl';

  export default {
    name: 'OpenClassViewController',
    data: function () {
      return {
        domain: owl.domain,
        liveUrl: '',
        teacherUrl: '',
        LiveBroadcastList: [],
        livingList: [],
        relations: [
          {
            name: '直播列表',
            id: 'livingList'
          },
          {
            name: '老师简介',
            id: 'teacherInformation'
          }
        ],
        livingUrl: '',
        livingInitImage: '',
        changeRed: 0,
        listRoomText: 'livingList',
        teacherImg: '',
        teacherInformation: '',
        teacherName: '',
        teacherId: '',
        living: false,
        teacherList: [],
        /*

                isListTitleHover: true,
                interValId: 0,



                isHandClick: false,*/
      }
    },
    created: function () {
      this.liveUrl = this.domain + '/program/liveList.do';
      this.teacherUrl = this.domain + '/teacher/get.do';
      this.getTeacherList();
      this.getLivingList();
      this.waitingState();
    },
    methods: {
      getLivingList: function () {
        fetch(this.liveUrl).then(res => {
          return res.json();
        }).then(json => {
          this.livingList = json.data;
          this.getState(json.data);
        })
      },
      getTeacherList: function () {
        fetch(this.teacherUrl).then(res => {
          return res.json();
        }).then(json => {
          this.teacherList = json.data;
        })
      },
      handClick: function (index, id) {
        this.changeRed = index;
        this.listRoomText = id;
      },
      getTime: function (startTime) {
        return this.timestampToTime(startTime).h + ':' + this.timestampToTime(startTime).m;
      },
      timestampToTime: function (timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return {
          Y: Y,
          M: M,
          D: D,
          h: h,
          m: m,
          s: s
        };
      },
      getState: function (livingList) {
        if (!livingList) {
          livingList = this.livingList;
        }
        let _this = this;
        let living = '<div class="btn" style="background: #fa424e">直播中</div>',
          finished = '<div class="btn" style="background: #b2b2b2">结束</div>',
          sowing = '<div class="btn"  style="background: #fad542">预播</div>',
          length = livingList.length,
          date = Date.parse(new Date()) / 1000;
        this.LiveBroadcastList = livingList;
        let day = new Date().getDay();
        this.living = false;
        if (day === 6 || day === 0) {
          for (let i = 0; i < length; i++) {
            this.LiveBroadcastList[i].stateName = finished;
          }
          this.teacherId = livingList[0].tId;
          this.teacherImg = this.domain + livingList[0].initImg;
          this.initTeacherId();
          return;
        }
        for (let i = 0; i < length; i++) {
          let course = livingList[i];
          let _this = this;
          if (date < course.startTime) {
            this.teacherId = course.tId;
            this.teacherImg = this.domain + course.initImg;
            this.LiveBroadcastList[i].stateName = sowing;
          } else if (date > course.endTime) {
            if (i !== length) {
              this.teacherId = course.tId;
              this.teacherImg = this.domain + course.initImg;
              this.LiveBroadcastList[i].stateName = finished;
            } else {
              this.teacherId = livingList[length - 1].tId;
              this.teacherImg = this.domain + livingList[length - 1].initImg;
              this.LiveBroadcastList[i].stateName = finished;
            }
          } else if (date > course.startTime && date < course.endTime) {
            this.living = true;
            this.teacherId = course.tId;
            this.livingUrl = course.m3u8Url;
            this.livingInitImage = course.initImg;
            this.teacherImg = this.domain + course.initImg;
            this.LiveBroadcastList[i].stateName = living;
            if (document.getElementsByClassName('vcp-player').length !== 0) {
              document.getElementsByClassName('vcp-player')[0].innerHTML = '';
            }
            setTimeout(function () {
              _this.initPlayer(course.m3u8Url);
            }, 100)
          } else if (date > course.endTime && date < livingList[i + 1].startTime) {
              this.teacherId = livingList[i + 1].tId;
              this.teacherImg = this.domain + livingList[i + 1].initImg;
          }
        }
        setTimeout(function () {
          _this.initTeacherId();
        }, 1000)
      },
      waitingState: function () {
        let _this = this;
        let playerContainer = document.getElementById('player');
        let OpenClassViewController = document.getElementById('OpenClassViewController');
        if (!OpenClassViewController && !playerContainer) {
          return;
        }
        _this.interValId = setInterval(function () {
          _this.getState();
        }, 2000)
      },
      initTeacherId: function () {
        for (let i = 0; i < this.teacherList.length; i++) {
          if (parseInt(this.teacherId) === parseInt(this.teacherList[i].id)) {
            this.teacherInformation = this.teacherList[i].introMobile;
            this.teacherName = this.teacherList[i].name;
          }
        }
      },
      initPlayer: function (url) {
        let _this = this;
        if (document.getElementById('livingPlayer')) {
          document.getElementById('livingPlayer').innerHTML = '';
        }
        if (!url || !this.living) {
          return
        }
        let option = {
          "autoplay": true,
          "live": true,
          "width": "100%",
          "x5_player": true,
          "coverpic": this.domain + this.livingInitImage,
          "height": "100%",
          listener: function (msg) {
            clearInterval(_this.interValId);
            setTimeout(function () {
              this.living = false;
              console.log(msg.type);
              if (msg.type == 'ended' || msg.type == 'error') {
                _this.waitingState();
              }
            }, 4000)
          }
        };
        if (url.indexOf('mp4') > 0) {
          option.mp4 = url;
        } else if (url.indexOf('m3u8') > 0) {
          option.m3u8 = url;
        } else if (url.indexOf('flv') > 0) {
          option.flv = url;
        }
        new TcPlayer('livingPlayer', option);
      }
    },
  }
</script>

<style lang="less" scoped>
  #OpenClassViewController {
    width: 10rem;

  /*height:100vh;*/
  .player-room {
    width: 100%;
    height: 5.81rem;
    background-color: #333;
  }

  .list-title {
    margin: 0 auto;
    box-shadow: 0 0 .1rem #999;
    display: flex;

  .item-w {
    flex: 1;
    text-align: center;
    position: relative;
    font-size: .4rem;
    height: 1.2rem;
    line-height: 1.2rem;

  .hover {
    color: #fa424e;
  }

  .hover:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: .8rem;
    left: 50%;
    margin-left: -.4rem;
    height: 0.08rem;
    border-radius: .08rem;
    background: #fa424e;
  }

  }
  }
  .list-room {
    margin-top: .5rem;

  .teacher-name {
    height: 1rem;
    text-align: center;
    font-size: .42rem;
    color: #333333;
    line-height: 1rem;
    margin-top: .5rem;
  }

  .teacher-information {
    width: 80%;
    margin: 0 auto;
    line-height: .5rem;
    font-size: .32rem;
    color: #666666;
  }

  ul {
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .32rem;
    width: 90%;
    margin: 0 auto;
    color: #666666;
    display: flex;

  li {
    position: relative;
    text-align: left;
    flex: 1;

  .name {
    text-align: left;
  }

  .btn {
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-radius: .02rem;
    position: absolute;
    top: 50%;
    right: 0;
    color: #ffffff;
    margin-top: -.4rem;
    width: 1.87rem;
  }

  }
  }
  }

  .history {
    @h: 1.23rem;
    position: fixed;
    left: 0;
    bottom: 0;
    height: @h;
    line-height: @h;
    width: 10rem;
    color: #ffffff;
    background-color: #fa424e;
    font-size: .37rem;
    text-align: center;
  }

  }
</style>
