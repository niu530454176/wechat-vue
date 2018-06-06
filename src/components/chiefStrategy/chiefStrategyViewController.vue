<template>
  <div id="chiefStrategy">
    <vue-tabbar-slide :options="options" @callback="callback"></vue-tabbar-slide>
    <div class="list-room-warp">
      <div id="J-listRoomWarp" class="list-room-warp-n">
        <ul class="list-room" v-for="(ulItem, ulIndex) in options.slideData"
            v-waterfall-lower="loadMore"
            waterfall-disabled="disabled">
          <li class="list-item" v-for="(item, index) in test[ulIndex]" @click="getInformationDetail(item)">
            <h4>首席策略</h4>
            <div class="time">星期六  23:10</div>
            <div class="img-warp"><img src="./test-img.jpg" alt=""></div>
            <div class="container">{{ item }}</div>
         <!--   <div class="container">
              所谓基本面，就是对影响股票市场走势的一所谓基本面，就是对影响股票市场走势的一所谓基本面，就是对影响股票市场走势的一
            </div>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import vueTabbarSlide from './vueTabbarSlide';
  export default {
    name: 'chiefStrategy',
    data () {
      return {
        test: [],
        disabled: false,
        count: 0, // 记录刷新的次数, 调试使用
        signIndex: 0,
        options: {
          container: 'mySlide1',
          slideData: [],
          slideId: [],
          width: '100px',
          index: 0
        },
        callbackHtml: '',
      }
    },
    components: {
      vueTabbarSlide: vueTabbarSlide,
    },
    created: function () {
      let _this = this;
      setTimeout(function () {
        _this.getData();
//        _this.watchScroll();
      }, 300);
    },
    methods: {
     /* watchScroll () {
        let _this = this;
          window.addEventListener('scroll', function () {
            if (!document.getElementById('J-listRoomWarp')) {
              return;
            }
            _this.getThisDivScroll();
//            _this.loadMore
          });
      },*/
      getData () {
        for (let i = 0; i < 20; i++) {
          this.options.slideData.push('首席策略');
          this.options.slideId.push(i);
          this.getInformationList(i);
        }
      },
      callback (event, index, val, id) {
        if (this.signIndex === index) {
          return;
        }
        this.signIndex = index;
        let moomW = -10 * index + 'rem';
        let ListRoomWarp = document.getElementById('J-listRoomWarp');
        ListRoomWarp.style.transition="-webkit-transform 500ms ease-out";
        ListRoomWarp.style.transform="translate(0px, 0px) scale(1) translateX(" + moomW + ")";
        ListRoomWarp.style.webkitTransform="translate(0px, 0px) scale(1) translateX(" + moomW + ")";
      },
      getInformationList (index) {
//        this.watchScroll();
        this.test[index] = [];
        for (let i = 0; i < 10; i++) {
          this.test[index].push(index * i)
        }
      },
      loadMore () {
        this.disabled = true;
        setTimeout(() => {
            let oldTestArr = this.test;
            let newTestArr = oldTestArr.slice(0);
            if (!newTestArr[this.signIndex]) {
              newTestArr[this.signIndex] = [];
            }
            for (let i = 0;i < 5; i++) {
              newTestArr[this.signIndex].push('改变' + this.signIndex + i + '个')
            }
            this.test = newTestArr;
            this.count += 1;
            this.disabled = false;
          },100);
      },
      /*getThisDivScroll () {
        let _this = this;
        let container = document.getElementsByClassName('list-room')[_this.signIndex];
        document.documentElement.scrollTop = 0;
        container.addEventListener('scroll', function() {
          if (container.clientHeight + container.scrollTop > container.scrollHeight - 300) {
            if (_this.isScroll) {
              setTimeout(() => {
                let oldTestArr = _this.test;
                let newTestArr = oldTestArr.slice(0);
                for (let i = 0;i < 5; i++) {
                  newTestArr[_this.signIndex].push('改变' + _this.signIndex + i + '个')
                }
                _this.test = newTestArr;
                _this.count += 1;
                _this.isScroll = true;
              },100);
              _this.isScroll = false;
            }
          }
        });
      },*/
      getInformationDetail (sourceType) {
        this.$router.push({
          path: '/uniqueSkillInformation',
          query: {
            type: sourceType
          }
        })
      },
    }
  }
</script>

<style lang="less" scope>
  #chiefStrategy{
    .list-room-warp {
      width: 100%;
      position: relative;
      top: 1rem;
      overflow: hidden;
      .list-room-warp-n {
        overflow: scroll;
        width: 1000rem;
        .list-room {
          float: left;
          height: 40rem;
          overflow: scroll;
          width: 10rem;
        }
      }
    }
    .list-item{
      width: 84%;
      height: 6.23rem;
      padding: .35rem;
      margin: 0.55rem auto;
      box-shadow: 0.01rem 0.01rem 0.1rem #ddd; /*height:10rem;*/
      h4 {
        font-size: 0.4rem;
      }
      .time {
        font-size: 0.29rem;
        color: #9f9f9f;
        margin: .2rem 0;
      }
      .img-warp {
        width: 100%;
        height: 4rem;
        overflow: hidden;
        border-radius: .28rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container {
        margin-top: .36rem;
        font-size: .36rem;
        color: #9f9f9f;
        height: .47rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
