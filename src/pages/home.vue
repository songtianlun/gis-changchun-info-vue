<template>
    <div class="body">
  <center>
    <img src="http://pnabaentf.bkt.clouddn.com//logo-gis-changchun-info-vue.png" alt="" style="margin-top: 50px;width: 200px;">
    <h1 style="font-weight: 100;font-size: 35px;">长春市公共信息服务平台</h1>
    <!--<h3 style="font-weight: 100;font-size: 35px;">vue 2 + element-ui 2</h3>-->
    <div class="text-center">
      <a>
        <m-button @click="startsearch" type="info" size="max" round >开始查询</m-button>
      </a>&nbsp;&nbsp;
      <a>
        <m-button @click="about" type="success" size="max" round plain>关于我</m-button>
      </a>
    </div>
  </center>
    </div>
</template>
<script type="text/javascript">
export default {
  name: 'home',
  methods: {
    startsearch () {
      this.$router.push({path: '/gis-master-map'})
    },
    about () {
      this.$router.push({path: '/about'})
    }
  }
}
</script>
<style type="text/css">
  .test{
    height: 40px;
    background: #ccc;
    margin-bottom: 15px;
  }
  .background{
    background-image: url("https://source.unsplash.com/random/1280x1280");
    width: 100%;
    opacity:0.4;
  }
  .body{
    opacity:1;
  }
</style>
