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

</template>

<script>
    // import AMap from 'AMap'
    // import AMapUI from 'AMapUI'
    // import AMap from 'AMap'
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
        this.initmap()
      },
      methods: {
        initmap: function () {
          let map = this.map
          map = new AMap.Map('container', {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 13,
            isHotspot: true
          })
          // let scale = new AMap.Scale({
          //   visible: true
          // })
          // let toolBar = new AMap.ToolBar({
          //   visible: true
          // })
          // let overView = new AMap.OverView({
          //   visible: true
          // })
          // this.map.addControl(scale)
          // this.map.addControl(toolBar)
          // this.map.addControl(overView)

          let self = this
          let placeSearch = new AMap.PlaceSearch() // 构造地点查询类
          self.infoWindow = new AMap.AdvancedInfoWindow({})
          map.on('hotspotover', function (result) {
            placeSearch.getDetails(result.id, function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                self.placeSearch_CallBack(result)
              }
            })
          })
        },
        // 回调函数
        placeSearch_CallBack: function (data) { // infoWindow.open(map, result.lnglat);
          let self = this
          let poiArr = data.poiList.pois
          let location = poiArr[0].location
          this.infoWindow.setContent(self.createContent(poiArr[0]))
          this.infoWindow.open(this.map, location)
        },
        createContent: function (poi) { // 信息窗体内容
          var s = []
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
