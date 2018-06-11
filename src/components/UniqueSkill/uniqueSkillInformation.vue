<template>
  <div id="uniqueSkillInformation">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="top-img"><img src="./informationImages/informationDetail-bg.jpg" alt=""></div>
    <div class="container">
      <div class="title cf">
        <div class="name">{{ title }}</div>
        <div class="time">{{ time }}</div>
      </div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import '@/assets/iconfont/iconfont.css';
  export default {
    name: 'uniqueSkillInformation',
    created: function () {
      this.getTargetUrl();
     /* console.log(this.getTimeStampDay());*/
    },
    data: function () {
      return {
        title: '',
        content: '',
        time: '',
        test: undefined,
        disabled: false,
        count: 0 // 记录刷新的次数, 调试使用
      }
    },
    methods: {
      getTargetUrl () {
        let sid = this.$route.query.sid,
            glid = this.$route.query.glid;
        let url = "http://zixun.boxtougu.com/zixunserver/index.php/news/contentcctvjy/" + glid + "|" + sid;
        console.log(url);
        fetch(url, { // 在URL中写上传递的参数
          method: 'GET'
        }).then((res)=>{
          return res.text()
        }).then((res)=>{
          res = JSON.parse('{' + res.substring(1,res.length - 1) + '}');
          this.title = res.a.title;
          this.time = res.a.createtime.split('.')[0];
          this.content = res.ac.content.replace(/style=".*?"/ig,"").replace(/\s+/g, "");
        })
      },
      getInformationList (suffix) {
        let f = length => Array.from({length}).map((v,k)=>k);
        this.test = f(8);
      },
      getTimeStampDay (timeStamp) {
        timeStamp = 1527909291000;
        let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let day = new Date(timeStamp).getDay();
        return arr[day];
      }
    }
  }
</script>

<style lang="less" scoped>
  #uniqueSkillInformation {
    width: 10rem;
    overflow: hidden;
    .top-img {
      height: 4.99rem;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  .container {
    position: relative;
    z-index: 1;
    top: -.6rem;
    padding-top: .43rem;
    border-radius: .6rem;
    background: #fff;
    .cf:after {
      content: "";
      height: 0;
      line-height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
    .title {
      width: 100%;
      margin: 0 auto;
      font-size: .29rem;
      clear: both;
      color: #9f9f9f;
      position: relative;
      box-shadow: 0 .1rem .3rem #eee;
      padding-bottom: .6rem;
      vertical-align: bottom;
      text-align: center;
      .name  {
        font-size: 0.36rem;
        color: #222324;
        font-weight: bold;
        padding: .3rem .4rem;
      }
      .time {
        text-align: center;
      }
    }
    .content {
      margin: .6rem auto;
      width: 92%;
      color: #717171;
      font-size: .32rem;
      line-height: .7rem;
      text-indent: 2em;
    }
  }
  }
</style>
