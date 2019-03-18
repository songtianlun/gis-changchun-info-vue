<template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
  import 'leaflet-velocity'
  import {chinaProvider} from 'leaflet.chinatmsproviders'
  import L from 'leaflet'
  import MapLoader from '../../src/assets/js/AMap.js'
  import axios from 'axios'
  export default {
    name: 'gis-weather-map',
    data () {
      return {
        map: null,
        layerControl: null,
        velocityLayer: null,
        weather: null,
        loading: null,
        marker: null
      }
    },
    mounted () {
      this.initmap()
      this.addvelocity()
      this.firstmessage()
    },
    methods: {
      initmap: function () {
        let that = this
        /**
         * Esri地图
         */
        let EsriWorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
            'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })

        let EsriDarkGreyCanvas = L.tileLayer(
          'http://{s}.sm.mapstack.stamen.com/' +
          '(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/' +
          '{z}/{x}/{y}.png',
          {
            attribution: 'Tiles &copy; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
              'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong)'
          }
        )
        /**
         * 智图地图内容
         */
        let normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        let normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        let normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        let normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        let normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        let normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
          attribution: 'Haut-Gis-Org © 智图地图'
        })
        /**
         * 天地图内容
         */
        let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
          attribution: 'Haut-Gis-Org © 天地图'
        })
        let normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
          attribution: 'Haut-Gis-Org © 天地图'
        })
        let imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
          attribution: 'Haut-Gis-Org © 天地图'
        })
        let imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
          attribution: 'Haut-Gis-Org © 天地图'
        })
        let normal = L.layerGroup([normalm, normala])
        let image = L.layerGroup([imgm, imga])
        /**
         * 谷歌
         */
        let normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
          attribution: 'Haut-Gis-Org © Google Map'
        })
        let satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
          attribution: 'Haut-Gis-Org © Google Map'
        })
        /**
         * 高德地图
         */
        let Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
          attribution: 'Haut-Gis-Org © AMap'
        })
        let Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
          attribution: 'Haut-Gis-Org © AMap'
        })
        let Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
          attribution: 'Haut-Gis-Org © AMap'
        })
        let OpenStreetMap = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Haut-Gis-Org © OpenStreetMap'
          }
        )
        let MapBox =
          L.tileLayer(
            'https://api.mapbox.com/styles/v1/kengqiangxia/cj5jbah540hlj2rpgh3xptiek/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VuZ3FpYW5neGlhIiwiYSI6ImNqNWpiMWZ5ZTIxYzgyd3BrYTN2NDN5aXEifQ.bqY03lR_2LZ0fttPOJ4jyw', {
              attribution: 'Haut-Gis-Org © <a href="http://mapbox.com">Mapbox</a>'
            })
        let Gaodimage = L.layerGroup([Gaodimgem, Gaodimga])
        let baseLayers = {
          'Esri卫星图': EsriWorldImagery,
          'Esri-灰白': EsriDarkGreyCanvas,
          '智图地图': normalm1,
          '智图午夜蓝': normalm3,
          '智图灰色': normalm4,
          '智图暖色': normalm5,
          '天地图': normal,
          '天地图影像': image,
          '谷歌地图': normalMap,
          '谷歌影像': satelliteMap,
          '高德地图': Gaode,
          '高德影像': Gaodimage,
          'OpenStreetMap': OpenStreetMap,
          'MapBox': MapBox
        }
        let overLayers = {
        }
        this.map = L.map('map', {
          center: [43.912301, 125.323877],
          zoom: 4,
          layers: [EsriDarkGreyCanvas],
          zoomControl: false
        })

        that.layerControl = L.control.layers(baseLayers, overLayers)
        that.layerControl.addTo(this.map)
        L.control.zoom({
          zoomInTitle: '放大',
          zoomOutTitle: '缩小'
        }).addTo(this.map)
        // this.baseLayer.addTo(this.map)
        // L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.map)
        // use event

        // 加载高德地图
        MapLoader().then(AMap => {
          console.log('地图加载成功')
          // this.map = new AMap.Map('container', {
          //   resizeEnable: true,
          //   center: [125.323877, 43.912301],
          //   zoom: 12,
          //   isHotspot: true
          // })
        }, e => {
          console.log('地图加载失败', e)
        })

        this.map.on('click', function (e) {
          that.openFullScreen2() // 打开加载中
          let content = '你临幸了这个点：'
          content += e.latlng.toString()
          console.log(content)
          // 调用高德api获取当前位置adcode
          let searchapi = '/amapapi/v3/place/around?key=d019e2f0225bc0ec9ee2160602987a24&location=' +
          e.latlng.lng +
          ',' +
          e.latlng.lat +
          '&keywords=&types=&radius=&offset=&page=&extensions=all'
          axios
            .get(searchapi)
            .then(response => {
              // 获取到adcode
              let locadcode = response.pois[0].adcode
              let weatherget = '/amapapi/v3/weather/weatherInfo?key=d019e2f0225bc0ec9ee2160602987a24&extensions=all&city=' + locadcode
              axios
                .get(weatherget)
                .then(response => {
                  // 获取到adcode
                  console.log(response)
                  let data = response.forecasts[0]
                  let weather = data.casts
                  axios
                    .get('/amapapi/v3/weather/weatherInfo?key=d019e2f0225bc0ec9ee2160602987a24&extensions=base&city=' + locadcode)
                    .then(responselive => {
                      console.log(responselive)
                      let liveweather = responselive.lives[0]
                      let weatherinfo = '城市/区：' + data.city + '</br>' +
                        '归属：' + data.province + '省' + '</br>' +
                        '实时天气' + '</br>' +
                        '更新时间：' + liveweather.reporttime + '</br>' +
                        '天气' + liveweather.weather + '</br>' +
                        '温度：' + liveweather.temperature + '℃' + '</br>' +
                        '风力：' + liveweather.windpower + '</br>' +
                        '风向：' + liveweather.winddirection + '</br>' +
                        '湿度：' + liveweather.humidity + '</br>' + '</br>' +
                        '天气预报' + '</br>' +
                        '<table border="1">' +
                        '<tr>' +
                        '<td>日期</td>' +
                        '<td>天气</td>' +
                        '<td>温度</td>' +
                        '<td>风力</td>' +
                        '<td>风向</td>' +
                        '</tr>'
                      for (let i = 1; i < 4; i++) {
                        weatherinfo += '<tr>' +
                          '<td>' + weather[i].date + '</td>' +
                          '<td>' + weather[i].nightweather + '转' + weather[i].dayweather + '</td>' +
                          '<td>' + weather[i].nighttemp + '～' + weather[i].daytemp + '℃' + '</td>' +
                          '<td>' + weather[i].daypower + '</td>' +
                          '<td>' + weather[i].daywind + '</td>' +
                          '</tr>'
                      }
                      weatherinfo += '</table>'
                      // console.log(nowweather)
                      var popup = L.popup()
                        .setLatLng(e.latlng)
                        .setContent(weatherinfo)
                        .openOn(that.map)
                      that.closeFullScreen2() // 关闭加载中
                    })
                })
                .catch(error => {
                  console.log(error)
                  that.$message({
                    message: '请求数据失败',
                    type: 'warning'
                  })
                  that.closeFullScreen2error()
                })
            })
            .catch(error => {
              console.log(error)
              that.$message({
                message: '请求数据失败',
                type: 'warning'
              })
              that.closeFullScreen2error()
            })
        })
      },
      openFullScreen2 () {
        let that = this
        that.loading = this.$loading({
          lock: true,
          text: '正在请求当地天气数据',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          that.loading.close()
        }, 3000)
      },
      closeFullScreen2 () {
        let that = this
        that.loading.close()
        that.$message({
          message: '请求天气数据成功！',
          type: 'success'
        })
      },
      closeFullScreen2error () {
        let that = this
        that.loading.close()
        that.$message({
          message: '请求失败',
          type: 'warning'
        })
      },
      addvelocity () {
        let that = this
        this.$http.get('/api/winddata').then(response => {
          console.log(response)
          console.log(response.data)
          that.velocityLayer = L.velocityLayer({
            displayValues: true,
            displayOptions: {
              velocityType: 'Global Wind',
              displayPosition: 'bottomleft',
              displayEmptyString: 'No wind data'
            },
            data: response.data,
            // OPTIONAL
            // minVelocity: 0, // used to align color scale
            maxVelocity: 15, // used to align color scale
            velocityScale: 0.01, // modifier for particle animations, arbitrarily defaults to 0.005
            // colorScale: [], // define your own array of hex/rgb colors
            onAdd: null, // callback function
            onRemove: null // callback function
          })
          that.layerControl.addOverlay(that.velocityLayer, 'Wind - Global')
          that.velocityLayer.addTo(that.map)
        }, response => {
          console.log('数据加载失败')
        })
      },
      firstmessage () {
        this.$confirm('请打开"Wind - Global"图层以显示全球风向趋势，当前风向数据详情如下</br>' +
          '数据来源：' + '美国国家气象局 -  NCEP（WMC）' + '</br>' +
          '参考时间：' + '2016-04-30T06：00：00.000Z' + '</br>' +
          '地球球形：' + 'radius of 6,371,229.0 m' + '</br>' +
          'Data shown for the Great Barrier Reef has been derived from <a href="https://research.csiro.au/ereefs/">CSIRO\'s eReefs products</a>>', '温馨提示', {
          confirmButtonText: '风向趋势',
          cancelButtonText: '返回首页',
          type: 'warning',
          center: true,
          dangerouslyUseHTMLString: true
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
    }
  }
</script>

<style scoped>

</style>
