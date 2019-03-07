<template>
  <div id="map" style="margin:0 auto;width: 100%;height: 100%"></div>
</template>

<script>
  import L from '@supermap/iclient-leaflet/node_modules/leaflet'
  import heatLayer from '@supermap/iclient-leaflet'

  function loadHeatMap (map) {
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
    let resultLayer = L.heatLayer(heatPoints, {
      radius: radius,
      minOpacity: 0.5
    })
    resultLayer.addTo(map)
  }
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
        let host = '//114.116.67.239:8090'
        let url = host + '/iserver/services/map-china400/rest/maps/China'
        let map = L.map('map', {
          preferCanvas: true,
          center: [39.89, 116.35],
          maxZoom: 18,
          zoom: 11
        })
        L.supermap.tiledMapLayer(url).addTo(map)
        loadHeatMap(map)
      }
    }
  }
</script>

<style scoped>
  #heatNumbers, #heatRadius {
    width: 50px;
    display: inline-block;
  }
</style>
