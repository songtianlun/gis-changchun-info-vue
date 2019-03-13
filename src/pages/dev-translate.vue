<template>
    <div id="container"><div id="panel"></div></div>

</template>
<script>
  import MapLoader from '../../src/assets/js/AMap.js'
  export default {
    name: 'dev-translate',
    data () {
      return {
        map: null
      }
    },
    mounted () {
      let that = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        this.map = new AMap.Map('container', {
          center: [117.000923, 36.675807],
          zoom: 11
        })
        let driving = new AMap.Driving({
          map: that.map,
          panel: 'panel'
        })
        // 根据起终点名称规划驾车导航路线
        driving.search([
          {keyword: '北京市地震局(公交站)', city: '北京'},
          {keyword: '亦庄文化园(地铁站)', city: '北京'}
        ], function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === 'complete') {
            console.log('绘制驾车路线完成')
          } else {
            console.log('获取驾车数据失败：' + result)
          }
        })
      }, e => {
        console.log('地图加载失败', e)
      })
    }
  }
</script>
<style scoped>
  #container {
    width: 100%;
    height: 100%
  }

  #panel {
    z-index:9999;position: relative;
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
  hr {
    margin: 0.5rem 0;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, .1)
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 0.4rem;
  }

  label, .btn {
    margin-left: 0;
    font-size: 1rem;
  }

  button, input, select {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    text-transform: none
  }

  [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
    -webkit-box-sizing: border-box;
    margin: 0 0.5rem 0 0;
  }

  h4 {
    font-family: inherit;
    line-height: 1.8;
    font-weight: 300;
    color: inherit;
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: .5rem
  }

  .input-item>select, .input-item>input[type=text], .input-item>input[type=date] {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }

  .input-item>select:not(:last-child), .input-item>input[type=text]:not(:last-child), .input-item>input[type=date]:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
  }

  .input-item>select:not(:first-child), .input-item>input[type=text]:not(:first-child), .input-item>input[type=date]:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
  }

  .input-item-text input[type=checkbox], .input-item-text input[type=radio] {
    margin-top: 0
  }

  .info hr {
    margin-right: 0;
    margin-left: 0;
    border-top-color: grey;
  }

  .code .btn {
    top: 1rem;
    position: absolute;
    right: 1rem;
  }

  .code .result {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    bottom: 1rem;
    position: absolute;
    top: 5.5rem;
    right: 1rem;
    left: 1rem;
    overflow: auto;
  }

  .code .status {
    color: #80adff;
    display: inline-block;
    font-size: 14px;
  }

  .code h4 {
    display: inline-block;
    max-width: 20rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  select, input[type=text], input[type=date] {
    display: inline-block;
    width: 100%;
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none
  }

  input[type=text],input[type=date] {
    background: #fff;
    padding: .375rem .75rem;
  }

  select:focus, input[type=text]:focus, input[type=date]:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 .1rem rgba(128, 189, 255, .1)
  }


  select:focus::-ms-value, input[type=text]:focus::-ms-value,input[type=date]:focus::-ms-value {
    color: #495057;
    background-color: #fff
  }


  @media screen and (min-width: 40rem) {
    .native-toast:not(.native-toast-edge) {
      max-width: 18rem;
    }
  }

  [class^="native-toast-icon-"] {
    vertical-align: middle;
    margin-right: 8px
  }

  [class^="native-toast-icon-"] svg {
    width: 16px;
    height: 16px;
  }

</style>




