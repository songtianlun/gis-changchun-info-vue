<template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
  import {chinaProvider} from 'leaflet.chinatmsproviders'
  import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap'
  import L from 'leaflet'

  export default {
    name: 'gis-population-density',
    data () {
      return {
        heatmapLayer: null,
        map: null
      }
    },
    mounted () {
      // 引用heatmap.js
      // let script = document.createElement('script')
      // script.type = 'text/javascript'
      // script.src =
      // 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js'
      // document.body.appendChild(script)
      this.initmap()
    },
    methods: {
      initmap: function () {
        // this.map = L.map('map', {
        //   center: [39.9788, 116.30226],
        //   zoom: 14
        // })
        //
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //   attribution: 'Haut-Gis-Org © OpenStreetMap'
        // }).addTo(this.map)

        // 模拟数据
        var testData = {
          max: 8,
          data: [{ lat: 24.6408, lng: 46.7728, count: 3 },
            { lat: 50.75, lng: -1.55, count: 1 },
            { lat: 51.55, lng: -1.55, count: 9 },
            { lat: 52.65, lng: -1.45, count: 8 },
            { lat: 53.45, lng: -1.35, count: 7 },
            { lat: 54.35, lng: -1.25, count: 6 },
            { lat: 5.25, lng: -1.15, count: 5 }
          ]
        }
        // 随机点个数
        let max = 800
        let points = []

        for (let i = 0; i < max; i++) {
          let lat = 43.8 + Math.ceil(Math.random() * 300000) * 0.000001
          let lng = 125.2 + Math.ceil(Math.random() * 300000) * 0.000001
          let count = Math.ceil(Math.random() * 1)
          let point = {
            lat: lat,
            lng: lng,
            count: count
          }
          points.push(point)
          console.log(point)
        }

        var SimulateData =
          {max: max,
            data: points}
        // 长春市内，取lat43-44，lng125-126，小数点后6位


        // 配置
        var cfg = {
          // 热力点半径
          'radius': 0.005,
          // 透明度
          'maxOpacity': 0.8,
          // 随比例尺变化
          'scaleRadius': true,
          'useLocalExtrema': true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'count'
        }
        this.heatmapLayer = new HeatmapOverlay(cfg)
        // 高德地图
        /**
         * 高德地图
         */
        let Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
          attribution: 'Haut-Gis-Org © 高德地图'
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
        this.map = L.map('map', {
          center: [43.912301, 125.323877],
          zoom: 12,
          layers: [Gaode]
        })
        let baseLayers = {
          '高德地图': Gaode,
          '高德影像': Gaodimage,
          'OpenStreetMap': OpenStreetMap
        }
        let overlays = {
          '人群密集热力图': this.heatmapLayer
        }
        L.control.layers(baseLayers, overlays).addTo(this.map)
        // 热力图
        this.heatmapLayer.setData(SimulateData)
        this.heatmapLayer.addTo(this.map)

        L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.map)
        // let overlays = {
        //   'Marker': null,
        //   'Roads': null
        // }
      }
    }
  }
</script>

<style scoped>
  /*@import "~leaflet";*/
</style>
