<template>
  <div id="container" class="map" onclick="console.log('地图被点击')">
    <div id="tip">鼠标悬停热点试试</div>
    <!--<div id="myPageTop">-->
      <!--<table>-->
        <!--<tr>-->
          <!--<td>-->
            <!--<span class="input-item-text" style="width:8rem;">请输入关键字</span>-->
            <!--&lt;!&ndash;<label>请输入关键字：</label>&ndash;&gt;-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td>-->
            <!--<input id="tipinput"/>-->
          <!--</td>-->
        <!--</tr>-->
      <!--</table>-->
    <!--</div>-->
    <div class="info">
      <div class="input-item">
        <div class="input-item-prepend">
          <span class="input-item-text" style="width:5rem;">请输入关键字</span>
        </div>
        <input id='tipinput' type="text" onclick="console.log('输入框被点击'),document.getElementById('panel').style.visibility = 'hidden'// 隐藏">
      </div>
    </div>
    <div id="panel"></div>
  </div>


</template>

<script>

  import MapLoader from '../../src/assets/js/AMap.js'
  export default {
    name: 'gis-master-map',
    // components: {AMap, AMapUI},
    data () {
      return {
        map: null,
        infoWindow: null,
        indexplaceSearch: null,
        MplaceSearch: null
      }
    },
    mounted () {
      // this.initmap()
      let that = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [117.000923, 36.675807],
          zoom: 11,
          isHotspot: true
        })
        let placeSearch = new AMap.PlaceSearch() // 构造地点查询类
        that.infoWindow = new AMap.AdvancedInfoWindow({})
        that.map.on('hotspotover', function (result) {
          console.log('热点信息')
          placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              that.placeSearch_CallBack(result)
            }
          })
        })

        // 输入提示
        let autoOptions = {
          input: 'tipinput'
        }
        let auto = new AMap.Autocomplete(autoOptions)
        that.indexplaceSearch = new AMap.PlaceSearch({
          map: that.map
        }) // 构造地点查询类
        AMap.event.addListener(auto, 'select', this.select)// 注册监听，当选中某条记录时会触发
        // 搜索结果显示
        AMap.service(['AMap.PlaceSearch'], function () {
          that.MplaceSearch = new AMap.PlaceSearch({ // 构造地点查询类
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: '010', // 兴趣点城市
            citylimit: false, // 是否强制限制在设置的城市内搜索
            map: that.map, // 展现结果的地图实例
            panel: 'panel', // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          })
          // 关键字查询
          // that.MplaceSearch.search('方恒国际中心｜大恒科技大厦')
        })
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    methods: {
      // 回调函数
      placeSearch_CallBack: function (data) { // infoWindow.open(map, result.lnglat);
        let that = this
        console.log('地点查询回调函数运行')
        let self = this
        let poiArr = data.poiList.pois
        let location = poiArr[0].location
        that.infoWindow.setContent(self.createContent(poiArr[0]))
        that.infoWindow.open(this.map, location)
      },
      createContent: function (poi) { // 信息窗体内容
        let s = []
        s.push('<div class= "info-title">' + poi.name + '</div><div class="info-content">' + '地址：' + poi.address)
        s.push('电话：' + poi.tel)
        s.push('类型：' + poi.type)
        s.push('<div>')
        return s.join('<br>')
      },
      select: function (e) {
        let that = this
        that.indexplaceSearch.setCity(e.poi.adcode)
        that.indexplaceSearch.search(e.poi.name) // 关键字查询查询
        that.MplaceSearch.search(e.poi.name) //  搜索结果加载列表
        console.log(e.poi.name)
        document.getElementById('panel').style.visibility = 'visible'// 显示
      }
    }
  }

</script>

<style scoped>
  #container {width:300px; height: 180px; margin:0 auto;width: 100%;height: 100%}
  .map{
    height: 100%;
    width: 100%;
    float: left;
  }
  #myPageTop {
    z-index:9999;
    /*position: relative;*/
    position: absolute;
    top: 5px;
    right: 10px;
    width: 280px;
    background: #fff none repeat scroll 0 0;
    border: 1px solid #ccc;
    margin: 10px auto;
    padding:6px;
    font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
    font-size: 14px;
  }
  #panel {
    z-index:9999;
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 80px;
    right: 22px;
    width: 340px;
  }
  #tip{
    z-index:9999;
  }
  .info-title{
    font-weight: bolder;
    color: #fff;
    font-size: 14px;
    line-height: 26px;
    padding: 0 0 0 6px;
    background: #25A5F7
  }
  .info-content{
    padding: 4px;
    color: #666666;
    line-height: 23px;
    font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
  }
  .info-content img{
    float: left;
    margin: 3px;
  }
  .amap-info-combo .keyword-input {
    height: auto;
  }
  .input-item-text, input[type=text],input[type=date], select {
    height: calc(2.2rem + 2px);
  }

  .input-item-text {
    width: 6rem;
    text-align: justify;
    padding: 0.4rem 0.7rem;
    display: inline-block;
    text-justify: distribute-all-lines;
    /*ie6-8*/
    text-align-last: justify;
    /* ie9*/
    -moz-text-align-last: justify;
    /*ff*/
    -webkit-text-align-last: justify;
    /*chrome 20+*/
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .input-item-text input[type=checkbox], .input-item-text input[type=radio] {
    margin-top: 0
  }
  .info {
    z-index:9999;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border-radius: .6rem;
    position: fixed;
    top: 4rem;
    background-color: white;
    width: auto;
    min-width: 22rem;
    border-width: 0;
    right: 1rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
  }
  .input-item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 2rem;
  }

  .input-item:last-child {
    margin-bottom: 0;
  }

  .input-item>select, .input-item>input[type=text], .input-item>input[type=date] {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }

  .input-item>select:not(:last-child), .input-item>input[type=text]:not(:last-child), .input-item>input[type=date]:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
  }

  .input-item>select:not(:first-child), .input-item>input[type=text]:not(:first-child), .input-item>input[type=date]:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
  }

  .input-item-prepend {
    margin-right: -1px;
  }

  .input-item-text, input[type=text],input[type=date], select {
    height: calc(1rem + 2px);
  }

  .input-item-text {
    width: 6rem;
    text-align: justify;
    padding: 0.2rem 0.1rem;
    display: inline-block;
    text-justify: distribute-all-lines;
    /*ie6-8*/
    text-align-last: justify;
    /* ie9*/
    -moz-text-align-last: justify;
    /*ff*/
    -webkit-text-align-last: justify;
    /*chrome 20+*/
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 0;
    font-size: 0.4rem;
    font-weight: 500;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .input-item-text input[type=checkbox], .input-item-text input[type=radio] {
    margin-top: 0
  }
  .input-item-prepend {
    margin-right: 2px;
  }
</style>
