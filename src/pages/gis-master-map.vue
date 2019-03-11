<template>
  <!--<center>-->
    <!--<img src="http://pnabaentf.bkt.clouddn.com//logo-gis-changchun-info-vue.png" alt="" style="margin-top: 50px;width: 200px;">-->
    <!--<h1 style="font-weight: 100;font-size: 35px;">长春市公共信息服务平台</h1>-->
    <!--<h3 style="font-weight: 100;font-size: 35px;">信息查询——正在开发，敬请期待！</h3>-->
    <!--<div class="text-center">-->
      <!--<a href="https://github.com/haut-gis-org/gis-changchun-info-vue">-->
        <!--<m-button type="info" size="max" round >Github</m-button>-->
      <!--</a>&nbsp;&nbsp;-->
      <!--<a href="/about">-->
        <!--<m-button type="success" size="max" round plain>关于我</m-button>-->
      <!--</a>-->
    <!--</div>-->
  <!--</center>-->
  <div id="container">
    <div id="tip">鼠标悬停热点试试</div>
  </div>
  <!--<div class="gis-master-map">-->
    <!--<div id="container"></div>-->
  <!--</div>-->

</template>

<script>

  import MapLoader from '../../src/assets/js/AMap.js'
  export default {
    name: 'gis-master-map',
    // components: {AMap, AMapUI},
    data () {
      return {
        map: null,
        infoWindow: null
      }
    },
    mounted () {
      // this.initmap()
      let that = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [117.000923, 36.675807],
          zoom: 11,
          isHotspot: true
        })
        let placeSearch = new AMap.PlaceSearch() // 构造地点查询类
        this.infoWindow = new AMap.AdvancedInfoWindow({})
        this.map.on('hotspotover', function (result) {
          console.log('热点信息')
          placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              that.placeSearch_CallBack(result)
            }
          })
        })
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    methods: {
      // initmap: function () {
      //   let that = this
      //   MapLoader().then(AMap => {
      //     console.log('地图加载成功')
      //     that.map = new AMap.Map('container', {
      //       center: [117.000923, 36.675807],
      //       zoom: 11
      //     })
      //   }, e => {
      //     console.log('地图加载失败', e)
      //   })
      // },
      // 回调函数
      placeSearch_CallBack: function (data) { // infoWindow.open(map, result.lnglat);
        console.log('地点查询回调函数运行')
        let self = this
        let poiArr = data.poiList.pois
        let location = poiArr[0].location
        this.infoWindow.setContent(self.createContent(poiArr[0]))
        this.infoWindow.open(this.map, location)
      },
      createContent: function (poi) { // 信息窗体内容
        let s = []
        s.push('<div class="info-title">' + poi.name + '</div><div class="info-content">' + '地址：' + poi.address)
        s.push('电话：' + poi.tel)
        s.push('类型：' + poi.type)
        s.push('<div>')
        return s.join('<br>')
      }
    }
  }

</script>

<style scoped>
  #container {width:300px; height: 180px; margin:0 auto;width: 100%;height: 100%}
  .info-title{
    font-weight: bolder;
    color: #fff;
    font-size: 14px;
    line-height: 26px;
    padding: 0 0 0 6px;
    background: #25A5F7
  }
  .info-content{
    padding: 4px;
    color: #666666;
    line-height: 23px;
    font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
  }
  .info-content img{
    float: left;
    margin: 3px;
  }
  .amap-info-combo .keyword-input {
    height: auto;
  }
</style>
