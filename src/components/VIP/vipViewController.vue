<template>
  <div id="VIP">
    <div v-wechat-title="$route.meta.title"></div>
    <div class="boxing-logo"><img src="./boxing-logo.png" alt=""></div>
    <div class="top-bg"><img src="./vip-bg.png" alt=""></div>
    <div class="container">
      <div class="boxing-title">博星证券</div>
      <div class="boxing-e-title">Cardiac star securities</div>
      <div class="message">您现在是放心课堂普通VIP，可以升级开通机构版享受特权</div>
      <div class="btn" @click="openPanel">申请升级VIP版</div>
      <!--<h4>什么是VIP版？</h4>-->
      <div v-show="isTipsShow" class="tips-w">
        <div @click="closePanel" class="bg"></div>
        <div class="tips">
          <div @click="closePanel" class="close-panel">x</div>
          <input :class="{inputTips: isTips, isSubmit: isSubmit}" v-model="cellPhoneNumber" :placeholder="tips" type="text">
          <div @click="submit" class="submit">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import owl from '@/owl';
  import '@/assets/iconfont/iconfont.css';
  export default {
    name: 'VIP',
    data: function () {
      return {
        isTips: false,
        isSubmit: false,
        tips: '请输入您的手机号码',
        domain: owl.domain,
        isTipsShow: false,
        cellPhoneNumber: '',
        title: 'VIP'
      }
    },
    created: function () {

    },
    watch: {
      cellPhoneNumber () {
        if (this.cellPhoneNumber !== '') {
          this.tips = '请输入您的手机号码';
          this.isSubmit = false;
          this.isTips = false;
        }
      }
    },
    methods: {
      closePanel () {
        this.isTipsShow = false;
        this.isTips = false;
        this.tips = '请输入您的手机号码';
        this.isSubmit = false;
      },
      openPanel () {
        this.isTipsShow = true;
      },
      isPoneAvailable (){
    　   let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
　       if (!myreg.test(this.cellPhoneNumber)) {
    　　    return false;
    　　  } else {
    　　    return true;
    　　  }
　    },
      submit () {
        if (this.isPoneAvailable()) {
          this.cellPhoneNumber = '';
          this.isTips = false;
          let submitUrl = 'http://softadmin.boxtougu.com/appapi/api/sjvip.asp?id=' + this.cellPhoneNumber + '&1x=h5vip';
          let _this = this;
          fetch(submitUrl, { // 在URL中写上传递的参数
            method: 'GET'
          }).then((res)=>{
            return res.text()
          }).then((res)=>{
            this.isSubmit = true;
            this.tips = '您于 ' + res + ' 提交成功';
            setTimeout(function () {
              _this.closePanel();
            }, 3000)
          })
        } else {
          this.cellPhoneNumber = '';
          this.isTips = true;
          this.tips = '您输入的手机号码不正确';
        }
      }

    }
  }
</script>
<style lang="less" scoped>
  @import "../Home/base.less";
  #VIP {
    background: #000000;
    margin: 0 auto;
    position: relative;
    width: 10rem;
    .boxing-logo {
      position: absolute;
      z-index: 2;
      left: .5rem;
      top: .3rem;
      width: 3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .container {
      width: 96%;
      margin: 0 auto;
      position: relative;
      top: -4.5rem;
      color: #ccc;
      text-align: center;
      .boxing-title {
        font-size: .5rem;
      }
      .boxing-e-title {
        font-size: .4rem;
        margin: .2rem 0 .6rem;
      }
      .message {
        color: #fff8db;
        font-size: .26rem;
      }
      .btn {
        width: 94%;
        height: .8rem;
        line-height: .8rem;
        border-radius: .8rem;
        font-size: .4rem;
        border: .05rem solid #d2a664;
        color: #d2a664;
        margin: 1.3rem auto 1.2rem;
      }
      h4 {
        font-size: .44rem;
        color: #000000;
      }
      .list {
        margin: .4rem;
        font-size: .34rem;
        display: flex;
        li {
          flex: 1;
        }
      }
    }
    .top-bg {
      background: #000;
      height: 14rem;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tips-w {
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      .bg {
        background: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: 1;
      }
      .tips {
        position: fixed;
        z-index: 99;
        left: 50%;
        top: 40%;
        width: 8.4rem;
        height: 5rem;
        margin-top: -2rem;
        margin-left: -4.2rem;
        background: #fff;
        border-radius: .3rem;
        .close-panel{
          position: absolute;
          width: .4rem;
          height: .4rem;
          background: #000;
          text-align: center;
          line-height: .4rem;
          border-radius: 50%;
          font-size: .34rem;
          right: .4rem;
          top: .4rem;
        }
        input {
          width: 80%;
          text-align: center;
          height: 1rem;
          border-radius: .2rem;
          margin-top: 1.5rem;
          border: .02rem solid rgba(200, 200, 200, 0.6);
        }

        .inputTips::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #f00;
              }
        .inputTips:-moz-placeholder, textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #f00;
        }
        .inputTips::-moz-placeholder, textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #f00;
        }
        .inputTips:-ms-input-placeholder, textarea:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #f00;
        }

        .isSubmit::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #7badff;
        }
        .isSubmit:-moz-placeholder, textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #7badff;
        }
        .isSubmit::-moz-placeholder, textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #7badff;
        }
        .isSubmit:-ms-input-placeholder, textarea:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #7badff;
        }

        .submit {
          width: 4rem;
          height: 1rem;
          font-size: .44rem;
          border-radius: 1rem;
          line-height: 1rem;
          margin: .8rem auto 0;
          color: #ffffff;
          background: #ff2b15;
        }
      }
    }
  }
</style>
