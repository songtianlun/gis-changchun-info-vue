<template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%;z-index:999;"></div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css'
  import {chinaProvider} from 'leaflet.chinatmsproviders'
  import L from 'leaflet'
  import 'leaflet.markercluster'
  // import 'leaflet'

  export default {
    name: 'gis-information-map',
    data () {
      return {
        heatmapLayer: null,
        map: null,
        baseLayers: null,
        overlays: null,
        scenicmapmarkers: null
      }
    },
    mounted () {
      this.initmap()
      this.addscenicmap()
      this.layercontrol()
      this.firstmessage()
    },
    methods: {
      initmap: function () {
        /**
         * 高德地图
         */
        let Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
          attribution: 'Haut-Gis-Org © 高德地图',
          minZoom: 4
        })
        let Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
          attribution: 'Haut-Gis-Org © 高德地图'
        })
        let Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
          attribution: 'Haut-Gis-Org © 高德地图'
        })
        let Gaodimage = L.layerGroup([Gaodimgem, Gaodimga])
        // 图层
        let OpenStreetMap = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Haut-Gis-Org © OpenStreetMap'
          }
        )
        this.baseLayers = {
          '高德地图': Gaode,
          '高德影像': Gaodimage,
          'OpenStreetMap': OpenStreetMap
        }
        this.map = L.map('map', {
          center: [43.912301, 125.323877],
          zoom: 4,
          layers: [Gaode]
        })
        L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.map)
      },
      addscenicmap: function () {
        let that = this
        this.scenicmapmarkers = L.markerClusterGroup()
        // 请求调用景点json数据
        this.$http.get('/api/scenicdata').then(response => {
          console.log(response)
          let array = response.data.features
          let i = 0
          while (array[i]) {
            let data = array[i]
            let mapinfo = '国家级风景名胜区【' + data.properties.名称 + '】' + '2017年概况' + '</br>' +
              '全称：' + data.properties.全称 + '</br>' +
              '省份：' + data.properties.省份 + '</br>' +
              '总面积：' + data.properties.总面积 + '平方公里' + '</br>' +
              '游览面积：' + data.properties.游览面 + '平方公里' + '</br>' +
              '2017游览量：' + data.properties.游人量 + '万人次' + '</br>' +
              '境外游人量：' + data.properties.境外游 + '万人次' + '</br>' +
              '固定资产投资完成额：' + data.properties.固定资 + '万元' + '</br>' +
              '国家拨款：' + data.properties.国家拨 + '万元' + '</br>' +
              '景区资金收入合计：' + data.properties.景区资 + '万元' + '</br>' +
              '景区资金支出合计：' + data.properties.景区资_ + '万元' + '</br>' +
              '经营收入：' + data.properties.经营收 + '万元' + '</br>' +
              '经营支出：' + data.properties.经营支 + '万元' + '</br>' +
              '维护支出：' + data.properties.维护支 + '万元' + '</br>' +
              '门票收入：' + data.properties.门票收 + '万元' + '</br>' +
              '注：数据0表示统计信息暂缺' + '</br>' +
              // '<button onclick="console.log(\'运行了消息框打开代码\')">进入</button>'
               '<button v-on:click="open">进入</button>'
            // console.log(mapinfo)
            let mgtitle = '【' + data.properties.名称 + '】' + ''
            let mgcontent = '全称：' + data.properties.全称 + '</br>' +
              '省份：' + data.properties.省份 + '</br>' +
              '总面积：' + data.properties.总面积 + '平方公里' + '</br>' +
              '游览面积：' + data.properties.游览面 + '平方公里' + '</br>' +
              '2017游览量：' + data.properties.游人量 + '万人次' + '</br>' +
              '境外游人量：' + data.properties.境外游 + '万人次' + '</br>' +
              '固定资产投资完成额：' + data.properties.固定资 + '万元' + '</br>' +
              '国家拨款：' + data.properties.国家拨 + '万元' + '</br>' +
              '景区资金收入合计：' + data.properties.景区资 + '万元' + '</br>' +
              '景区资金支出合计：' + data.properties.景区资_ + '万元' + '</br>' +
              '经营收入：' + data.properties.经营收 + '万元' + '</br>' +
              '经营支出：' + data.properties.经营支 + '万元' + '</br>' +
              '维护支出：' + data.properties.维护支 + '万元' + '</br>' +
              '门票收入：' + data.properties.门票收 + '万元' + '</br>' +
              '注：数据0表示统计信息暂缺' + '</br>'
            let title = mapinfo
            let marker = L.marker(new L.LatLng(data.geometry.coordinates[1], data.geometry.coordinates[0]), { title: title })
            // marker.bindPopup(title)
            // bind event on marker
            marker.on('click', function (e) {
              console.log(e)
              that.openmessage(mgtitle, mgcontent)
            })
            this.scenicmapmarkers.addLayer(marker)
            // marker.on('click', function (e) {
            //   this.markerclick(e, data)
            // })
            i++
          }
          this.scenicmapmarkers.addTo(this.map)
        }, response => {
          console.log('数据加载失败')
        })
      },
      layercontrol: function () {
        this.overlays = {
          '2017国家级风景名胜区': this.scenicmapmarkers
        }
        L.control.layers(this.baseLayers, this.overlays).addTo(this.map)
      },
      // 居中信息
      openmessage (title, content) {
        this.$confirm(content, title, {
          confirmButtonText: '前往',
          cancelButtonText: '继续',
          type: 'warning',
          center: true,
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '正在前往!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '继续查看'
          })
        })
      },
      firstmessage () {
        this.$confirm('请使用右上角图层按钮切换信息源，当前地图标记信息为：2017年国家级风景名胜区', '温馨提示', {
          confirmButtonText: '知道啦！',
          cancelButtonText: '返回首页',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '地图查看!'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '前往首页'
            })
            this.$router.push({path: '/gis-master-map'})
          })
        })
      }
      // ,
      // markerclick: function (e, mapinfo) {
      //   console.log(e)
      //   console.log(mapinfo)
      // }
    }
  }
</script>

<style>

</style>
