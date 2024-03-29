webpackJsonp([14],{Iau2:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("TuEq"),l={name:"gis-navi-map",data:function(){return{map:null,infoWindow:null,startstring:null,approach1string:null,approach2string:null,stopstring:null,navityp:3,driving:null,walking:null,startlatlng:null,approach1latlng:null,approach2latlng:null,stoplatlng:null,transOptions:null,transfer:null}},mounted:function(){this.initmap(),this.initautoinput()},methods:{mapclick:function(){},initmap:function(){var t=this;Object(e.a)().then(function(a){console.log("地图加载成功");var n=new a.Scale({visible:!0}),e=new a.ToolBar({visible:!0});t.map=new a.Map("container",{resizeEnable:!0,center:[125.323877,43.912301],zoom:12,isHotspot:!1}),t.map.addControl(n),t.map.addControl(e),t.mouseTool=new a.MouseTool(t.map);new a.PlaceSearch;t.driving=new a.Driving({map:t.map,panel:"panel"}),t.walking=new a.Walking({map:t.map,panel:"panel"}),t.transOptions={map:t.map,city:"北京市",panel:"panel",policy:a.TransferPolicy.LEAST_TIME},t.transfer=new a.Transfer(t.transOptions)},function(t){console.log("地图加载失败",t)})},initautoinput:function(){var t=new AMap.Autocomplete({input:"start"}),a=new AMap.Autocomplete({input:"approach1"}),n=new AMap.Autocomplete({input:"approach2"}),e=new AMap.Autocomplete({input:"stop"});AMap.event.addListener(t,"select",this.selectstart),AMap.event.addListener(a,"select",this.selectapproach1),AMap.event.addListener(n,"select",this.selectapproach2),AMap.event.addListener(e,"select",this.selectstop)},clickinput:function(){document.getElementById("panel").style.visibility="hidden"},selectstart:function(t){console.log(t.poi),this.startstring=t.poi.name,this.startlatlng=[t.poi.location.lng,t.poi.location.lat],this.setnavivalue()},selectapproach1:function(t){console.log(t.poi),this.approach1string=t.poi.name,this.approach1latlng=[t.poi.location.lng,t.poi.location.lat],this.setnavivalue()},selectapproach2:function(t){console.log(t.poi),this.approach2string=t.poi.name,this.approach2latlng=[t.poi.location.lng,t.poi.location.lat],this.setnavivalue()},selectstop:function(t){console.log(t.poi),this.stopstring=t.poi.name,this.stoplatlng=[t.poi.location.lng,t.poi.location.lat],this.setnavivalue()},setnavivalue:function(){var t=void 0;t=this.startstring?this.startstring:"起点",this.stopstring?t+=" -> "+this.stopstring:t+=" -> 终点",document.getElementById("navibutton").value=t},startdriving:function(){var t=this;t.startlatlng&&t.stoplatlng?t.approach1latlng||t.approach2latlng?t.approach1latlng&&t.approach2latlng?(console.log("appraoch1:"+t.approach1latlng),console.log("appraoch2:"+t.approach2latlng),t.driving.search(new AMap.LngLat(t.startlatlng[0],t.startlatlng[1]),new AMap.LngLat(t.stoplatlng[0],t.stoplatlng[1]),{waypoints:[new AMap.LngLat(t.approach1latlng[0],t.approach1latlng[1]),new AMap.LngLat(t.approach2latlng[0],t.approach2latlng[1])]},function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",t.$message({message:"两个途径点的路径规划成功！！",type:"success"})):console.log("获取驾车数据失败："+n)})):t.approach1latlng?t.driving.search(new AMap.LngLat(t.startlatlng[0],t.startlatlng[1]),new AMap.LngLat(t.stoplatlng[0],t.stoplatlng[1]),{waypoints:[new AMap.LngLat(t.approach1latlng[0],t.approach1latlng[1])]},function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",t.$message({message:"根据第一个途径点的路径规划成功！！",type:"success"})):console.log("获取驾车数据失败："+n)}):t.driving.search(new AMap.LngLat(t.startlatlng[0],t.startlatlng[1]),new AMap.LngLat(t.stoplatlng[0],t.stoplatlng[1]),{waypoints:[new AMap.LngLat(t.approach2latlng[0],t.approach2latlng[1])]},function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",console.log("绘制驾车路线完成"),t.$message({message:"根据第二个途径点的路径规划成功！！",type:"success"})):console.log("获取驾车数据失败："+n)}):(console.log("startpoint:"+t.startlatlng),console.log("stoppoint:"+t.stoplatlng),t.driving.search(new AMap.LngLat(t.startlatlng[0],t.startlatlng[1]),new AMap.LngLat(t.stoplatlng[0],t.stoplatlng[1]),function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",t.$message({message:"绘制驾车路线完成！",type:"success"})):(console.log("获取驾车数据失败："+n),t.$message({message:"路径规划失败！",type:"warning"}))})):t.$message({message:"起点或终点值无效！",type:"warning"})},startworking:function(){var t=this;console.log(t.startlatlng),console.log(t.stoplatlng),null!=t.startlatlng&&null!=t.stoplatlng?(console.log("startpoint:"+t.startlatlng),console.log("stoppoint:"+t.stoplatlng),t.walking.search([t.startlatlng[0],t.startlatlng[1]],[t.stoplatlng[0],t.stoplatlng[1]],function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",t.$message({message:"步导路线规划成功！",type:"success"})):(console.log("获取路径数据失败："+n),t.$message({message:"步导路径规划失败！",type:"warning"}))})):(console.log("步行导航参数有误！"),t.$message({message:"步行导航参数有误！（暂不支持途径点）",type:"warning"}))},starttrans:function(){var t=this;null!=t.startlatlng&&null!=t.stoplatlng?(console.log("startpoint:"+t.startlatlng),console.log("stoppoint:"+t.stoplatlng),t.transfer.search(new AMap.LngLat(t.startlatlng[0],t.startlatlng[1]),new AMap.LngLat(t.stoplatlng[0],t.stoplatlng[1]),function(a,n){"complete"===a?(document.getElementById("panel").style.visibility="visible",t.$message({message:"公共交通路线规划成功！",type:"success"})):(console.log("获取路径数据失败："+n),t.$message({message:"公共交通路径规划失败！",type:"warning"}))})):(console.log("公共交通导航参数有误！"),t.$message({message:"公共交通导航参数有误！（暂不支持途径点，且仅支持长春市）",type:"warning"}))},startnavi:function(){console.log(this.navityp),3===this.navityp?this.startdriving():6===this.navityp?this.startworking():9===this.navityp?this.starttrans():console.log("路径规划类型无效!")}}},s={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"map",attrs:{id:"container"},on:{click:t.mapclick}},[n("div",{attrs:{id:"panel"}}),t._v(" "),n("div",{staticClass:"input-card",staticStyle:{width:"24rem"}},[n("label",{staticStyle:{color:"grey"}},[t._v("地图导航")]),t._v(" "),n("div",{staticClass:"input-item"},[t._m(0),t._v(" "),n("input",{attrs:{id:"start",type:"text",placeholder:"请输入起点，必须"},on:{click:t.clickinput}})]),t._v(" "),n("div",{staticClass:"input-item"},[t._m(1),t._v(" "),n("input",{attrs:{id:"approach1",type:"text",placeholder:"请输入第一个途径点，非必需"},on:{click:t.clickinput}})]),t._v(" "),n("div",{staticClass:"input-item"},[t._m(2),t._v(" "),n("input",{attrs:{id:"approach2",type:"text",placeholder:"请输入第二个途径点，非必需"},on:{click:t.clickinput}})]),t._v(" "),n("div",{staticClass:"input-item"},[t._m(3),t._v(" "),n("input",{attrs:{id:"stop",type:"text",placeholder:"请输入终点，必须"},on:{click:t.clickinput}})]),t._v(" "),n("div",{staticClass:"input-item"},[[n("el-radio-group",{model:{value:t.navityp,callback:function(a){t.navityp=a},expression:"navityp"}},[n("el-radio",{attrs:{label:3,value:"3"}},[t._v("驾车模式")]),t._v(" "),n("el-radio",{attrs:{label:6,value:"6"}},[t._v("步行模式")]),t._v(" "),n("el-radio",{attrs:{label:9,value:"9"}},[t._v("公交模式")])],1)]],2),t._v(" "),n("input",{staticClass:"btn",attrs:{id:"navibutton",type:"primary",value:"起点 -> 终点"},on:{click:t.startnavi}})])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input-item-prepend"},[a("span",{staticClass:"input-item-text"},[this._v("起点")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input-item-prepend"},[a("span",{staticClass:"input-item-text"},[this._v("途径1")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input-item-prepend"},[a("span",{staticClass:"input-item-text"},[this._v("途径2")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input-item-prepend"},[a("span",{staticClass:"input-item-text"},[this._v("终点")])])}]};var i=n("VU/8")(l,s,!1,function(t){n("Nv/N")},"data-v-62c5356a",null);a.default=i.exports},"Nv/N":function(t,a){}});
//# sourceMappingURL=14.2ee000960d0177e534fb.js.map