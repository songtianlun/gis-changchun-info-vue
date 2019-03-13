
// AMap.js
// 高德map   https://webapi.amap.com/maps?v=1.4.11&key=你的高德地图的key
export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src =
        'http://webapi.amap.com/maps?v=1.4.13&callback=initAMap&key=52cbd4c23c8ce8d2832b505d73c1a160&plugin=AMap.PlaceSearch,AMap.AdvancedInfoWindow,' +
        'AMap.Autocomplete,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.MouseTool'
      script.onerror = reject
      document.head.appendChild(script)
      console.log('AMap.js运行了')
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}

