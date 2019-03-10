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
  <div id="container"></div>
</template>

<script>
    // import AMap from 'AMap'
    export default {
      name: 'gis-master-map',
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
          this.map = new AMap.Map('container')
        }
      }
    }
</script>

<style scoped>
  #container {width:300px; height: 180px; margin:0 auto;width: 100%;height: 100%}
</style>
