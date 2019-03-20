<template>

  <center>
    <img src="http://pnabaentf.bkt.clouddn.com//logo-gis-changchun-info-vue.png" alt="" style="margin-top: 50px;width: 80px;">
    <h1 style="font-family:华文新魏 ;font-weight:normal ;font-size: 26px;">长春市公共信息服务平台</h1>
    <el-row type="flex" class="row-bg bg-lucency " justify="center">
      <el-col :span="6"><div class="grid-content bg-lucency">
        <h3 style="font-family:黑体 ;font-weight: 100;font-size: 20px;">开源声明</h3>
        <div class="text-center">
          <p>Environment & UI：<a href="https://cn.vuejs.org/">vue</a> + <a href="http://element-cn.eleme.io/#/zh-CN">element</a></p>
          <p>Frame：<a href="https://github.com/mengdu/vue-element-admin-tpl">vue-element-admin-tpl</a></p>
          <p>Document：<a href="https://haut-gis-org.github.io/gis-changchun-info-vue/#/">Geo-Info-Server</a></p>
        </div>
      </div></el-col>


      <el-col :span="8"><div class="grid-content bg-lucency">
        <iframe width='300' height='220' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='http://f.amap.com/4wOxK_0156QwE'></iframe>'
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-lucency">
        <h3 style="font-family:黑体 ;font-weight: 100;font-size: 20px;">联系我们</h3>
        <div class="text-center">
          <p>GitHub：<a href="https://github.com/haut-gis-org">Haut-Gis-Org</a></p>
          <p>E-mail：<a href="mailto:songtianlun@frytea.com">songtianlun@frytea.com</a></p>
          <p>Address：河南省郑州市中原区莲花街100号</p>
        </div>
      </div></el-col>

    </el-row>

  </center>
</template>

<script>
    export default {
      name: 'about'
    }
</script>

<style scoped>
  .test{
    height: 40px;
    background: #ccc;
    margin-bottom: 15px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bg-lucency {
    background: transparent;
  }
</style>
