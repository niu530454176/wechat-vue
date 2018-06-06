<template>
    <div id="Home">
      <div v-wechat-title="$route.meta.title"></div>
      <div class="banner">
        <banner :data="banners"></banner>
      </div>
      <div class="menu">
        <center-menu></center-menu>
      </div>
      <div class="popularity-column">
        <popularity-column :columnData="popularColumn"></popularity-column>
      </div>
    </div>
</template>

<script>
  import owl from '@/owl';
  import banner from './banner.vue';
  import centerMenu from './centerMenu.vue';
  import popularityColumn from './popularityColumn.vue';


  export default {
    name: 'Home',
    components: {
      banner,
      "center-menu" : centerMenu,
      "popularity-column" : popularityColumn
    },
    data: function () {
      return {
        domain: owl.domain,
        banners: [],
        popularColumn: [],
        title: '博星投资课堂',
      }
    },
    created: function () {
      let testUrl = owl.domain + '/banner/list.do?size=20&type=1';
      let testColumnUrl = owl.domain + '/page/sourcesByKey.do?sourceKeys=1';
      fetch(testUrl).then(res => {
        return res.json();
      }).then( json => {
        this.banners = json.data;
      })
      fetch(testColumnUrl).then(res => {
        return res.json();
      }).then( json => {
        this.popularColumn = json.data;
      })
    }
  }
</script>

<style lang="less" scoped>
    #Home {
      @prl: 0.36rem;
      width: 10rem - ( @prl * 2 );
      padding: 0 @prl;
      background-color: #fff * 0.96;
      /*height: 23rem;*/

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .banner{
        width: 10rem;
        height: 5.08rem;
        /*background-color: gold;*/

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .menu{
        width: 10rem;
        height: 2.52rem;
      }
      .popularity-column{
        width: 10rem;
        height: 11.63rem;
        background-color: darkgray;

      }
      .swipe-room{
        height:3rem;
      }
    }
</style>
