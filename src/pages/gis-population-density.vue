<template>

  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
  import L from '@supermap/iclient-leaflet/node_modules/leaflet'
  import heatLayer from '@supermap/iclient-leaflet'

  export default {
    name: 'gis-population-density',
    data () {
      return {
        error: false,
        map: null,
        resultLayers: null
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap: function () {
        //  let host = '//114.116.67.239:8090'
        let host = 'http://support.supermap.com.cn:8090'
        let url = host + '/iserver/services/map-china400/rest/maps/China'
        this.map = L.map('map', {
          preferCanvas: true,
          center: [39.89, 116.35],
          maxZoom: 18,
          zoom: 11
        })
        L.supermap.tiledMapLayer(url).addTo(this.map)
        this.resultLayer = L.map.layer
        let heatNumbers = 150
        let heatRadius = 30
        let num = parseInt(heatNumbers)
        num = (num > 0) ? num : 0
        let radius = parseInt(heatRadius)
        radius = (radius > 0) ? radius : 0
        let heatPoints = []
        for (let i = 0; i < num; i++) {
          heatPoints[i] = [Math.random() * 0.28 + 39.78, Math.random() * 0.5 + 116.12, Math.random() * 80]
        }
        this.resultLayer = L.heatLayer(heatPoints, {
          radius: radius,
          minOpacity: 0.5
        }).addTo(this.map)
      }
    }
  }
</script>

<style scoped>
  @import "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css";
  @import "http://iclient.supermap.io/dist/leaflet/iclient9-leaflet.min.css";
</style>
