<template>
  <div id="Tool">
    <div v-wechat-title="$route.meta.title"></div>
    <span class="px">输入PX: </span>
    <input
      class="pxinput"
      type="text"
      name="pxinput"
      v-model="input"
      @keyup.enter="pushHistroy(input)"
    >
    <span class="rem">输出: {{remValue}} rem</span>
    <div class="list">
      <ul>
        <li v-for="v in lishi">
          <p>{{v}} px</p>
          <p></p>
          <p>{{change(v)}} rem</p>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
  const rate = 75.0;
  export default {
    name: 'Tool',
    data: function () {
      return {
        input: '',
        lishi:[]
      }
    },
    computed : {
        remValue() {
            return  this.change(this.input);
      }
    },
    methods: {
      pushHistroy(value) {
        this.input = "";
        this.lishi.push(value)
      },
      change(value) {
          return (value / rate).toFixed(2);
      }

    }

  }
</script>

<style lang="less" scoped>
  #Tool {
    @gold: 0.618;
    @ngold: ( 1 - @gold );
    height: 23rem;
    width: 10rem;
    background-color: #fff * @ngold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .px{
      color: #fff*@gold;
      font-size: 1rem;
      padding-left: 1rem;
    }
    .rem{
      color: #fff*@gold;
      font-size: 1rem;
      padding-left: 1rem;
    }
    .pxinput{
      height: 2rem;
      width: 9rem;
      padding-left: 1rem;
      background-color: #fff * @gold;
      border: 0;
      font-size: 2rem * @gold;
      color: #fff*@ngold;
    }
    .list{
      width: 10rem;
      ul{
        width: 10rem;
        .li{
          width: 10rem;
          height: 0.7rem;
          font-size: 1rem * @gold;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
        li{
          .li;
          background-color: #fff*0.7;
          color: #fff*0.3;
        }
        li:nth-child(2n+1) {
          color: #fff*0.7;
          background-color: #fff*0.3;

        }
      }
    }
  }
</style>
