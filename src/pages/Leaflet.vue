<template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
    import {chinaProvider} from 'leaflet.chinatmsproviders'
    import L from 'leaflet'
    export default {
      name: 'Leaflet',
      data () {
        return {
          map: null
        }
      },
      mounted () {
        this.initmap()
      },
      methods: {
        initmap: function () {
          /**
           * Esri地图
           */
          let Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
              'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          })

          let Esri_DarkGreyCanvas = L.tileLayer(
            'http://{s}.sm.mapstack.stamen.com/' +
            '(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/' +
            '{z}/{x}/{y}.png',
            {
              attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
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
            'Esri卫星图': Esri_WorldImagery,
            'Esri-灰白': Esri_DarkGreyCanvas,
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
          this.map = L.map('map', {
            center: [43.912301, 125.323877],
            zoom: 12,
            layers: [normalm1],
            zoomControl: false
          })

          L.control.layers(baseLayers, null).addTo(this.map)
          L.control.zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小'
          }).addTo(this.map)
          // this.baseLayer.addTo(this.map)
          // L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.map)
          // use event
          let mypop = L.popup()
          this.map.on('click', function (e) {
            let content = '你临幸了这个点：</br>'
            content += e.latlng.toString()
            console.log(content)
            mypop.setLatLng(e.latlng)
              .setContent(content)
              // .openOn(this.map)
              // .addTo(this.map)
          })
          // mypop.addTo(this.map)
        }
      }
    }
</script>
<style scoped>

</style>
