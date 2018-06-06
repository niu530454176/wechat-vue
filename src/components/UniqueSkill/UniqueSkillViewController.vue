<template>
  <div id="UniqueSkillViewController">
    <div v-wechat-title="$route.meta.title"></div>
    <ul
      class="list-room"
      v-waterfall-lower="loadMore"
      waterfall-disabled="disabled">
      <li class="list-item" v-for="(item, index) in test" @click="getInformationDetail(item.sid, item.glid)">
        <div class="image">
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
          <img style="display: none;" src="./informationImages/random-1.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-2.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-3.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-4.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-5.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-6.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-7.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-8.jpg" alt="">
          <img style="display: none;" src="./informationImages/random-9.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-10.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-11.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-12.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-13.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-14.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-15.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-16.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-17.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-18.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-19.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-20.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-21.jpg" alt="">
          <img style="display: none;"  src="./informationImages/random-22.jpg" alt="">
        </div>
        <div class="texts">
          <div class="header">{{ item.title }}</div>
          <div class="time">
            <i class="iconfont icon-shijianzhongbiao"></i>
            <span class="tstr">{{ item.createtime }}</span>
          </div>
          <div class="intro" v-html="changeText(item.content)">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import '@/assets/iconfont/iconfont.css';
  import owl from '@/owl';
  export default {
    name: 'UniqueSkillViewController',
    created: function () {
      this.getTargetUrl()
    },
    data: function () {
      return {
        domain: owl.domain,
        test: [],
        randomImg: '',
        SID: '',
        disabled: false,
        count: 1, // 记录刷新的次数, 调试使用
        liatI: 0,
      }
    },
    methods: {
      getTargetUrl () {
        this.SID = this.$route.query.SID;
      },
      getInformationList () {
//        console.log(suffix);
        let url = 'http://zixun.boxtougu.com/zixunserver/index.php/news14/datacon/' + this.SID + '/10/' + this.count;
        fetch(url, { // 在URL中写上传递的参数
          method: 'GET'
        }).then((res)=>{
          return res.text()
        })
        .then((res)=>{
          res = res.substring(1,res.length - 1);
          for (let i = 0;i < JSON.parse(res).list.length; i++) {
            this.disabled = false;
//            let html = '<img src="./informationImages/random-' + parseInt(Math.random() * 23) + '.png" alt="">';
//            JSON.parse(res).list[i][html] = html;
            let testArr = JSON.parse(res).list[i];
//            testArr.codelist = html;
            this.test.push(testArr);
            document.getElementsByClassName('image')[this.liatI].getElementsByTagName('img')[parseInt(Math.random() * 23)].style.display = 'block';
            this.liatI++;
          }
        })
      },
      changeText (content) {
        if (!content) {
          return
        }
        return content.replace(/<[^>]*>/gi,'').replace(/(^\s+)|(\s+$)/g,"")
      },
      getInformationDetail (sid, glid) {
        this.$router.push({
          path: '/uniqueSkillInformation',
          query: {
            sid: sid,
            glid: glid
          }
        })
      },
      loadMore() {
        this.disabled = true;
        this.count += 1;
        this.getInformationList();
      }
    }
  }
</script>

<style lang="less" scoped>
  #UniqueSkillViewController {
    overflow: hidden;
    .list-room{
      @pl:0.49rem;
      width: 10rem - @pl;
        padding-left: @pl;
        padding-top: 0.55rem;
        /*height:10rem;*/
        .list-item{
          margin-top: 0.55rem;

          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          .image {
            height: 2.45rem;
            width: 3.36rem;
            position: relative;
            background-color: #fff;
            border-radius: 0.11rem;
            box-shadow: 0 0 0.24rem 0 rgba(0, 0, 0, 0.15);
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
            img{
              position: absolute;
              top: 0;
              z-index: 1;
              height: 2.45rem;
              width: 3.36rem;
            }
          }
          .texts{
            margin-left: 0.44rem;
            height: 2.45rem;
            width: 4.40rem;
            background-color: #fff;

            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            .header{
              color: #2a354d;
              font-size: 0.33rem;
              width: 4.40rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .time{
              .iconfont{
                color: #c7c7c7;
                font-size: 0.29rem;
                padding-right: 0.16rem;
              }
              .tstr{
                font-size: 0.24rem;
                color: #b2b0b6;
              }
            }
            .intro{
              color: #787878;
              line-height: 0.44rem;
              font-size: 0.24rem;
              width: 5rem;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
</style>
