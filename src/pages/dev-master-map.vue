<template>

  <div style="height:100%;width: 100%">
    <div id="map">

    </div>
    <el-alert
      v-show="error"
      title="您的浏览器不支持canvas，请升级！"
      type="error">
    </el-alert>
  </div>
</template>

<script>

  import L from '@supermap/iclient-leaflet/node_modules/leaflet'
  export default {
    name: 'dev-master-map',
    data () {
      return {
        error: false,
        map: null
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      initMap () {
        let host = '//114.116.67.239:8090'
        let url = host + '/iserver/services/map-changchun/rest/maps/长春市区图'
        let map = L.map('map', {
          crs: L.CRS.NonEarthCRS({
            bounds: L.bounds([48.4, -7668.25], [8958.85, -55.58]),
            origin: L.point(48.4, -55.58)
          }),
          center: [-4500, 4000],
          maxZoom: 18,
          zoom: 1
        })
        L.supermap.tiledMapLayer(url).addTo(map)
      }
    }
  }
</script>

<style scoped>
  #map{
    width:100%;
    height:100%;
  }
</style>
