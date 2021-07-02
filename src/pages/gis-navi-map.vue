<template>
  <div id="container" class="map" v-on:click="mapclick">
    <div id="panel"></div>
    <div class="input-card" style='width:24rem;'>
      <label style='color:grey'>地图导航</label>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">起点</span></div>
        <input id='start' type="text" v-on:click="clickinput" placeholder='请输入起点，必须'>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text" >途径1</span></div>
        <input id='approach1' type="text" v-on:click="clickinput" placeholder='请输入第一个途径点，非必需'>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text" >途径2</span></div>
        <input id='approach2' type="text" v-on:click="clickinput" placeholder='请输入第二个途径点，非必需'>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text" >终点</span></div>
        <input id='stop' type="text" v-on:click="clickinput" placeholder='请输入终点，必须'>
      </div>
      <div class="input-item">
        <template>
          <el-radio-group v-model="navityp">
            <el-radio :label="3" value="3">驾车模式</el-radio>
            <el-radio :label="6" value="6">步行模式</el-radio>
            <el-radio :label="9" value="9">公交模式</el-radio>
          </el-radio-group>
        </template>
      </div>
      <input id="navibutton" type="primary" class="btn" value="起点 -> 终点" v-on:click="startnavi">
    </div>
  </div>
</template>

<script>
  import MapLoader from '../../src/assets/js/AMap.js'
  export default {
    name: 'gis-navi-map',
    data () {
      return {
        map: null,
        infoWindow: null,
        startstring: null,
        approach1string: null,
        approach2string: null,
        stopstring: null,
        navityp: 3,
        driving: null,
        walking: null,
        startlatlng: null,
        approach1latlng: null,
        approach2latlng: null,
        stoplatlng: null,
        transOptions: null,
        transfer: null
      }
    },
    mounted () {
      let that = this
      that.initmap()
      that.initautoinput()
      that.init_input()
    },
    methods: {
      mapclick () {
        let that = this
      },
      initmap () {
        let that = this
        MapLoader().then(AMap => {
          console.log('地图加载成功')
          let scale = new AMap.Scale({
            visible: true
          })
          let toolBar = new AMap.ToolBar({
            visible: true
          })
          that.map = new AMap.Map('container', {
            resizeEnable: true,
            center: [125.323877, 43.912301],
            zoom: 12,
            isHotspot: false
          })
          that.map.addControl(scale)
          that.map.addControl(toolBar)
          that.mouseTool = new AMap.MouseTool(that.map)
          let placeSearch = new AMap.PlaceSearch() // 构造地点查询类

          // 构造路线导航类
          that.driving = new AMap.Driving({
            map: that.map,
            panel: 'panel'
          })
          //  步行导航
          that.walking = new AMap.Walking({
            map: that.map,
            panel: 'panel'
          })
          that.transOptions = {
            map: that.map,
            city: '北京市',
            panel: 'panel',
            // cityd:'乌鲁木齐',
            policy: AMap.TransferPolicy.LEAST_TIME
          }
          // 构造公交换乘类
          that.transfer = new AMap.Transfer(that.transOptions)
        }, e => {
          console.log('地图加载失败', e)
        })
      },
      initautoinput () {
        let that = this
        // 输入提示
        let autostart = new AMap.Autocomplete({
          input: 'start'
        })
        let autoapproach1 = new AMap.Autocomplete({
          input: 'approach1'
        })
        let autoapproach2 = new AMap.Autocomplete({
          input: 'approach2'
        })
        let autostop = new AMap.Autocomplete({
          input: 'stop'
        })
        AMap.event.addListener(autostart, 'select', that.selectstart)// 注册监听，当选中某条记录时会触发
        AMap.event.addListener(autoapproach1, 'select', that.selectapproach1)// 注册监听，当选中某条记录时会触发
        AMap.event.addListener(autoapproach2, 'select', that.selectapproach2)// 注册监听，当选中某条记录时会触发
        AMap.event.addListener(autostop, 'select', that.selectstop)// 注册监听，当选中某条记录时会触发
      },
      init_input () {
        let that = this
        let startdefault = that.$route.query.id + ' '
        // console.log(startdefault)
        document.getElementById('start').value = startdefault
      },
      clickinput () {
        document.getElementById('panel').style.visibility = 'hidden'// 隐藏
      },
      selectstart (e) {
        let that = this
        console.log(e.poi)
        that.startstring = e.poi.name
        that.startlatlng = [e.poi.location.lng, e.poi.location.lat]
        that.setnavivalue()
      },
      selectapproach1 (e) {
        let that = this
        console.log(e.poi)
        that.approach1string = e.poi.name
        that.approach1latlng = [e.poi.location.lng, e.poi.location.lat]
        that.setnavivalue()
      },
      selectapproach2 (e) {
        let that = this
        console.log(e.poi)
        that.approach2string = e.poi.name
        that.approach2latlng = [e.poi.location.lng, e.poi.location.lat]
        that.setnavivalue()
      },
      selectstop (e) {
        let that = this
        console.log(e.poi)
        that.stopstring = e.poi.name
        that.stoplatlng = [e.poi.location.lng, e.poi.location.lat]
        that.setnavivalue()
      },
      setnavivalue () {
        let that = this
        let value
        if (that.startstring) { value = that.startstring } else { value = '起点' }
        // if (that.approach1string) { value += ' -> ' + that.approach1string }
        // if (that.approach1string) { value += ' -> ' + that.approach1string }
        if (that.stopstring) { value += ' -> ' + that.stopstring } else { value += ' -> ' + '终点' }
        document.getElementById('navibutton').value = value
      },
      startdriving () {
        let that = this
        if (!that.startlatlng || !that.stoplatlng) {
          // console.log('起点或终点为空！')
          that.$message({
            message: '起点或终点值无效！',
            type: 'warning'
          })
          return
        }
        if (!that.approach1latlng && !that.approach2latlng) {
          console.log('startpoint:' + that.startlatlng)
          console.log('stoppoint:' + that.stoplatlng)
          // 根据起终点经纬度规划驾车导航路线
          that.driving.search(new AMap.LngLat(that.startlatlng[0], that.startlatlng[1]), new AMap.LngLat(that.stoplatlng[0], that.stoplatlng[1]), function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
              document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
              // console.log('绘制驾车路线完成')
              that.$message({
                message: '绘制驾车路线完成！',
                type: 'success'
              })
            } else {
              console.log('获取驾车数据失败：' + result)
              that.$message({
                message: '路径规划失败！',
                type: 'warning'
              })
            }
          })
        } else {
          if (that.approach1latlng && that.approach2latlng) {
            console.log('appraoch1:' + that.approach1latlng)
            console.log('appraoch2:' + that.approach2latlng)
            // 两个途径点
            that.driving.search(new AMap.LngLat(that.startlatlng[0], that.startlatlng[1]), new AMap.LngLat(that.stoplatlng[0], that.stoplatlng[1]), {
              waypoints: [new AMap.LngLat(that.approach1latlng[0], that.approach1latlng[1]), new AMap.LngLat(that.approach2latlng[0], that.approach2latlng[1]) ]
            }, function (status, result) {
              // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
              if (status === 'complete') {
                document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
                // console.log('绘制驾车路线完成')
                that.$message({
                  message: '两个途径点的路径规划成功！！',
                  type: 'success'
                })
              } else {
                console.log('获取驾车数据失败：' + result)
              }
            })
          } else if (that.approach1latlng) {
            // 根据第一个途径点规划
            // 根据起终点经纬度规划驾车导航路线
            that.driving.search(new AMap.LngLat(that.startlatlng[0], that.startlatlng[1]), new AMap.LngLat(that.stoplatlng[0], that.stoplatlng[1]), {
              waypoints: [new AMap.LngLat(that.approach1latlng[0], that.approach1latlng[1])]
            }, function (status, result) {
              // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
              if (status === 'complete') {
                document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
                // console.log('绘制驾车路线完成')
                that.$message({
                  message: '根据第一个途径点的路径规划成功！！',
                  type: 'success'
                })
              } else {
                console.log('获取驾车数据失败：' + result)
              }
            })
          } else {
            // 根据第二个途径点规划
            that.driving.search(new AMap.LngLat(that.startlatlng[0], that.startlatlng[1]), new AMap.LngLat(that.stoplatlng[0], that.stoplatlng[1]), {
              waypoints: [new AMap.LngLat(that.approach2latlng[0], that.approach2latlng[1])]
            }, function (status, result) {
              // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
              if (status === 'complete') {
                document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
                console.log('绘制驾车路线完成')
                that.$message({
                  message: '根据第二个途径点的路径规划成功！！',
                  type: 'success'
                })
              } else {
                console.log('获取驾车数据失败：' + result)
              }
            })
          }
        }
      },
      startworking () {
        let that = this
        // 根据起终点坐标规划步行路线
        // that.walking.search([116.399028, 39.845042], [116.436281, 39.880719], function (status, result) {
        //   // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        //   if (status === 'complete') {
        //     document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
        //     console.log('绘制步行路线完成')
        //   } else {
        //     console.log('步行路线数据查询失败' + result)
        //   }
        // })
        console.log(that.startlatlng)
        console.log(that.stoplatlng)
        if (that.startlatlng != null && that.stoplatlng != null) {
          console.log('startpoint:' + that.startlatlng)
          console.log('stoppoint:' + that.stoplatlng)
          // 根据起终点经纬度规划驾车导航路线
          that.walking.search([that.startlatlng[0], that.startlatlng[1]], [that.stoplatlng[0], that.stoplatlng[1]], function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
              document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
              // console.log('绘制驾车路线完成')
              that.$message({
                message: '步导路线规划成功！',
                type: 'success'
              })
            } else {
              console.log('获取路径数据失败：' + result)
              that.$message({
                message: '步导路径规划失败！',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('步行导航参数有误！')
          that.$message({
            message: '步行导航参数有误！（暂不支持途径点）',
            type: 'warning'
          })
        }
      },
      starttrans () {
        let that = this
        // 根据起、终点坐标查询公交换乘路线
        // that.transfer.search(new AMap.LngLat(116.291035, 39.907899), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
        //   // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
        //   if (status === 'complete') {
        //     console.log('绘制公交路线完成')
        //   } else {
        //     console.log('公交路线数据查询失败' + result)
        //   }
        // })
        if (that.startlatlng != null && that.stoplatlng != null) {
          console.log('startpoint:' + that.startlatlng)
          console.log('stoppoint:' + that.stoplatlng)
          // 根据起终点经纬度规划驾车导航路线
          that.transfer.search(new AMap.LngLat(that.startlatlng[0], that.startlatlng[1]), new AMap.LngLat(that.stoplatlng[0], that.stoplatlng[1]), function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
              document.getElementById('panel').style.visibility = 'visible'// 显示导航信息
              // console.log('绘制驾车路线完成')
              that.$message({
                message: '公共交通路线规划成功！',
                type: 'success'
              })
            } else {
              console.log('获取路径数据失败：' + result)
              that.$message({
                message: '公共交通路径规划失败！',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('公共交通导航参数有误！')
          that.$message({
            message: '公共交通导航参数有误！（暂不支持途径点，且仅支持长春市）',
            type: 'warning'
          })
        }
      },
      startnavi () {
        let that = this
        console.log(that.navityp)
        if (that.navityp === 3) {
          that.startdriving()
        } else if (that.navityp === 6) {
          that.startworking()
        } else if (that.navityp === 9) {
          that.starttrans()
        } else {
          console.log('路径规划类型无效!')
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
  .input-card {
    z-index:999;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: .25rem;
    width: 22rem;
    border-width: 10rem;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
    position: fixed;
    bottom: 4rem;
    right: 1rem;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 0.75rem 1.25rem;
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
    height: 3rem;
  }
  #panel {
    z-index:1000;
    position: fixed;
    background-color: white;
    max-height: 30%;
    overflow-y: auto;
    top: 80px;
    right: 10px;
    width: 24rem;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
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
    height: calc(2.2rem + 2px);
  }

  .input-item-text {
    width: 4rem;
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
    font-size: 0.6rem;
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
  html {
    font-size: 12px;
  }
  * {
    box-sizing: border-box
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    line-height: 1.5;
    font-weight: 300;
    color: #111213;
  }

  hr {
    margin: 0.5rem 0;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, .1)
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 0.4rem;
  }

  label, .btn {
    margin-left: 0;
    font-size: 0.1rem;
  }

  button, input, select {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    text-transform: none
  }

  [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0 0.5rem 0 0;
  }

  h4 {
    font-family: inherit;
    line-height: 1.8;
    font-weight: 300;
    color: inherit;
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: .5rem
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    background-color: transparent;
    background-image: none;
    color: #25A5F7;
    border-color: #25A5F7;
    padding: .25rem .5rem;
    line-height: 1.5;
    border-radius: 1rem;
    -webkit-appearance: button;
    cursor:pointer;
  }

  .btn:hover {
    color: #fff;
    background-color: #25A5F7;
    border-color: #25A5F7
  }

  .btn:hover {
    text-decoration: none
  }

  .info hr {
    margin-right: 0;
    margin-left: 0;
    border-top-color: grey;
  }

  .code .btn {
    top: 1rem;
    position: absolute;
    right: 1rem;
  }

  .code .result {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    bottom: 1rem;
    position: absolute;
    top: 5.5rem;
    right: 1rem;
    left: 1rem;
    overflow: auto;
  }

  .code .status {
    color: #80adff;
    display: inline-block;
    font-size: 14px;
  }

  .code h4 {
    display: inline-block;
    max-width: 20rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  select, input[type=text], input[type=date] {
    display: inline-block;
    width: 100%;
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none
  }

  input[type=text],input[type=date] {
    background: #fff;
    padding: .375rem .75rem;
  }

  select:focus, input[type=text]:focus, input[type=date]:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 .1rem rgba(128, 189, 255, .1)
  }

  .btn:focus {
    outline: 0;
    box-shadow: none;
  }

  select:focus::-ms-value, input[type=text]:focus::-ms-value,input[type=date]:focus::-ms-value {
    color: #495057;
    background-color: #fff
  }
  @media screen and (min-width: 40rem) {
    .native-toast:not(.native-toast-edge) {
      max-width: 18rem;
    }
  }

</style>
