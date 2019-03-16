<template>
  <div id="container" class="map" v-on:click="mapclick">
    <div id="tip"></div>
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
    <!--地图搜索-->
    <div class="info">
      <div class="input-item">
        <div class="input-item-prepend">
          <span class="input-item-text" style="width:5rem;">请输入关键字</span>
        </div>
        <input id='tipinput' type="text" v-on:click="tipinputclick" v-on:keyup.13="tipinputenter">
        <el-checkbox v-model="checked" id="checkhotpont">地图热点</el-checkbox>
        <el-button type="primary" icon="el-icon-edit" id="maprule" size="mini" v-on:click="maprule">量算</el-button>
      </div>
    </div>
    <div id="panel"></div>
    <!--地图量算-->
    <div id="mapruledev" class="input-card" style='width: 22rem;'>
      <div class="input-item-rule">
        <el-radio  v-model="mapruleradio" label="prepare">脑洞测量</el-radio>
        <el-radio  v-model="mapruleradio" label="rule">距离测量</el-radio>
        <el-radio  v-model="mapruleradio" label="measureArea">面积测量</el-radio>
        <!--<el-radio v-model="radio" label="1">备选项</el-radio>-->
        <!--<el-radio v-model="radio" label="2">备选项</el-radio>-->
        <!--<input type="radio" name='func' checked="" value='rule'><span class="input-text-rule">距离测量</span>-->
        <!--<input type="radio" name='func' value='measureArea'><span class="input-text-rule">面积测量</span>-->
      </div>
      <div class="input-item-rule-button">
        <!--<input id="close" type="button" class="btn" value="关闭" />-->
        <el-button v-model="mapruleclose" class="btn" type="danger" size="mini" v-on:click="mapruleclose">停止量算</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import MapLoader from '../../src/assets/js/AMap.js'
  export default {
    name: 'gis-master-map',
    // components: {AMap, AMapUI},
    data () {
      return {
        that: this,
        map: null,
        infoWindow: null,
        indexplaceSearch: null,
        MplaceSearch: null,
        checked: false, // 地图热点
        mapruleradio: 'prepare',
        mouseTool: null,
        maprulecolse: null,
        advancedInfoWindow: null,
        infowindowmapclick: null, // 地图点击信息框\
        marker: []
      }
    },
    mounted () {
      // this.initmap()
      let that = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        let scale = new AMap.Scale({
          visible: true
        })
        let toolBar = new AMap.ToolBar({
          visible: true
        })
        let overView = new AMap.OverView({
          visible: true
        })
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          center: [125.323877, 43.912301],
          zoom: 12,
          isHotspot: true
        })
        that.map.addControl(scale)
        that.map.addControl(toolBar)
        that.map.addControl(overView)
        that.mouseTool = new AMap.MouseTool(that.map)
        let placeSearch = new AMap.PlaceSearch() // 构造地点查询类
        // that.infoWindow = new AMap.AdvancedInfoWindow({})
        that.map.on('hotspotover', function (result) {
          console.log('热点信息')
          placeSearch.getDetails(result.id, function (status, result) {
            if (status === 'complete' && result.info === 'OK' && that.checked === true) {
              that.infoWindow = new AMap.AdvancedInfoWindow({})
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
          // map: that.map
        }) // 构造地点查询类
        AMap.event.addListener(auto, 'select', that.select)// 注册监听，当选中某条记录时会触发
        // AMap.event.addListener(that.MplaceSearch, 'markerClick', that.markerclick)// 注册监听，当选中某条记录时会触发
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
        // 地图点击事件
        let clickHandler = function (e) {
          console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！')
          // 根据经纬度搜索poi
          //  构造地点查询类
          let placeSearch = new AMap.PlaceSearch({})
          let cpoint = [e.lnglat.getLng(), e.lnglat.getLat()] //  中心点坐标
          placeSearch.searchNearBy('', cpoint, 200, function (status, result) {
            // console.log(result.poiList.pois[0])
            // content = that.createContent(result.poiList.pois[0])
            // infopoi = result.poiList.pois[0]
            // console.log(result.poiList.pois[0])
            let infopoi = result.poiList.pois[0]
            let content = '<div>' + infopoi.name + '</div><div>' + '地址：' + infopoi.address + '</br>' +
              '电话：' + infopoi.tel + '</br>' +
              '类型：' + infopoi.type +
              '<div>'
            // console.log(content)
            that.infowindowmapclick = new AMap.AdvancedInfoWindow({
              content: content,
              offset: new AMap.Pixel(0, -30)
            })
            that.infowindowmapclick.open(that.map, cpoint)
          })
        }
        // 绑定事件
        that.map.on('click', clickHandler)
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    methods: {
      mapclick () {
        let that = this
      },
      tipinputclick () {
        let that = this
        console.log('输入框被点击')
        that.infowindowmapclick.close()// 关闭高级信息框
        that.MplaceSearch.clear() // 清除搜索结果
        document.getElementById('panel').style.visibility = 'hidden'// 隐藏
        // let i = 0
        // while (i < that.marker.length) {
        //   console.log(that.marker[i])
        //   that.map.remove(that.marker[i])
        //   i++
        // }
      },
      markerclick: function (e) {
        console.log('marker被点击')
      },
      // 回调函数
      placeSearch_CallBack: function (data) { // infoWindow.open(map, result.lnglat);
        let that = this
        console.log('placeSearch_CallBack地点查询回调函数运行')
        let poiArr = data.poiList.pois
        let location = poiArr[0].location
        that.infoWindow.setContent(that.createContent(poiArr[0]))
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
        // that.indexplaceSearch.search(e.poi.name, function (status, result) {
        //   console.log('这里是选择后的查询结果')
        //   console.log(result)
        // })
        // 关键字查询查询
        that.MplaceSearch.search(e.poi.name, function (status, result) {
          // // 查询成功时，result即对应匹配的POI信息
          // console.log(result)
          // var pois = result.poiList.pois
          // for (var i = 0; i < pois.length; i++) {
          //   var poi = pois[i]
          //   // that.marker = []
          //   that.marker[i] = new AMap.Marker({
          //     position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //     title: poi.name + '测试'
          //   })
          //   // 将创建的点标记添加到已有的地图实例：
          //   that.map.add(that.marker[i])
          // }
        }) //  搜索结果加载列表
        // let layers = that.map.getLayers()
        // console.log(layers)
        // console.log(e.poi.name)
        document.getElementById('panel').style.visibility = 'visible'// 显示
      },
      tipinputenter: function () {
        let inputstring = document.getElementById('tipinput').value
        console.log(inputstring)
        let that = this
        // that.infowindowmapclick.close()// 关闭高级信息框
        // 关键字查询查询
        that.MplaceSearch.search(inputstring, function (status, result) {
          // // 查询成功时，result即对应匹配的POI信息
          // console.log(result)
          // var pois = result.poiList.pois
          // for (var i = 0; i < pois.length; i++) {
          //   var poi = pois[i]
          //   // that.marker = []
          //   that.marker[i] = new AMap.Marker({
          //     position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          //     title: poi.name + '测试'
          //   })
          //   // 将创建的点标记添加到已有的地图实例：
          //   that.map.add(that.marker[i])
          // }
        }) //  搜索结果加载列表
        document.getElementById('panel').style.visibility = 'visible'// 显示
      },
      maprule: function () {
        let that = this
        console.log('开始量算按钮被电击')
        document.getElementById('mapruledev').style.visibility = 'visible'// 显示
        that.checked = false
        that.infoWindow.close()// 关闭地图热点信息框
        that.mapruleradio = 'prepare'
      },
      mapruleclose: function () {
        let that = this
        //   document.getElementById('mapruleclose').onclick = function(){
        that.mouseTool.close(true)// 关闭，并清除覆盖物
        console.log('停止量算被点击')
        //     for(var i=0;i<radios.length;i+=1){
        //       radios[i].checked = false;
        //     }
        // }
        document.getElementById('mapruledev').style.visibility = 'hidden'// 隐藏
      }
    },
    watch: {
      'checked': function () {
        let that = this
        console.log('watch中的checkhotpot被触发')
        that.infoWindow.close()
        // console.log(that.checked)
        // if (that.checked === true) {
        //   that.infoWindow.close()
        //   that.checked = false
        // } else {
        //   that.checked = true
        // }
      },
      mapruleradio: function () {
        let that = this
        switch (that.mapruleradio) {
          case 'rule': {
            that.mouseTool.rule({
              startMarkerOptions: {// 可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31), // 图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: 'https://webapi.amap.com/theme/v1.3/markers/b/start.png'
                })
              },
              endMarkerOptions: {// 可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31), // 图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: 'https://webapi.amap.com/theme/v1.3/markers/b/end.png'
                }),
                offset: new AMap.Pixel(-9, -31)
              },
              midMarkerOptions: {// 可缺省
                icon: new AMap.Icon({
                  size: new AMap.Size(19, 31), // 图标大小
                  imageSize: new AMap.Size(19, 31),
                  image: 'https://webapi.amap.com/theme/v1.3/markers/b/mid.png'
                }),
                offset: new AMap.Pixel(-9, -31)
              },
              lineOptions: {// 可缺省
                strokeStyle: 'solid',
                strokeColor: '#FF33FF',
                strokeOpacity: 1,
                strokeWeight: 2
              }
              // 同 RangingTool 的 自定义 设置，缺省为默认样式
            })
            break
          }
          case 'measureArea': {
            that.mouseTool.measureArea({
              strokeColor: '#80d8ff',
              fillColor: '#80d8ff',
              fillOpacity: 0.3
              // 同 Polygon 的 Option 设置
            })
            break
          }
        }
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
  #checkhotpont{
    position: absolute;
    top: 45px;
    right: 180px;
  }
  #maprule{
    position: absolute;
    top: 40px;
    right: 50px;
  }
  #tipinput{
    top: -11px;
    z-index:9990;
  }
  .input-item-rule{
    height: 60px;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }
  .input-item-rule-button{
    height: 30px;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }
  .input-card {
    z-index:9990;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: .25rem;
    width: 22rem;
    border-width: 0;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    position: fixed;
    bottom: 4rem;
    right: 1rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.75rem 1.25rem;
    visibility: hidden;
  }
  #myPageTop {
    z-index:9990;
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
    z-index:9990;
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 100px;
    right: 22px;
    width: 340px;
  }
  #tip{
    z-index:999;
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
    z-index:999;
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
    height: 4rem;
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
    height: 3rem;
  }

  .input-item-text, input[type=text],input[type=date], select {
    height: calc(1rem + 2px);
  }

  .input-item-text {
    width: 6rem;
    text-align: justify;
    padding: 0.2rem 0.4rem;
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
