<template>
    <div id="centerMenu">
      <div class="item" @click="getTargetInformation(901)">
        <div class="croom"> <img src="./menuImgs/1.png" alt="图标"> </div>
        <div class="nroom"> <p class="name">博星绝招</p> </div>
      </div>
        <div class="item" @click="$router.push('/openclass');">
        <div class="croom"> <img src="./menuImgs/2.png" alt="图标"> </div>
        <div class="nroom"> <p class="name">公开课</p> </div>
      </div>
      <div class="item" @click="getTargetInformation(902)">
        <div class="croom"> <img src="./menuImgs/3.png" alt="图标"> </div>
        <div class="nroom"> <p class="name">新手入门</p> </div>
      </div>
      <div class="item" @click="$router.push('/VIP');">
        <div class="croom"> <img src="./menuImgs/4.png" alt="图标"> </div>
        <div class="nroom"> <p class="name">VIP</p> </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'centerMenu',
        methods: {
          getTargetInformation: function(target) {
            this.$router.push({
              path: '/unique',
              query: {
                SID: target
              }
            })
          }
        }
    }
</script>

<style lang="less" scoped>
  @import "./base.less";
  @p92: 1.23rem;
  @p162: 2.16rem;
  @p119: 1.59rem;
  @p77: 1.03rem;
  @p53: 0.71rem;
  @p25: 0.33rem;
    #centerMenu {
      .itemW;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item{
        width: 2.16rem;
        height: 1.59rem;
        /*background-color: wheat;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .croom{
          z-index: 1;
          width:@p77;
          height: @p53;
          background-color: greenyellow;
          margin-bottom: -@p25;
          border-radius: 0.05rem;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .nroom{
          width: @p162;
          height: @p92;
          background-color: #fff;
          border-radius: 0.08rem;
          box-shadow: 0 0 0.27rem 0 rgba(0, 0, 0, 0.1);

          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          .name{
            height: 30%;
            text-align: center;
            line-height: 10%;
            font-size: 0.24rem;
          }
        }
      }
    }
</style>
