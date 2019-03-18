# 快速开始

## 安装

``` bash
# 拉取项目到本地
git clone git@github.com:haut-gis-org/gis-changchun-info-vue.git

# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

```
## 登陆
通过域名访问系统即进入身份验证：
![](http://photo-frytea.test.upcdn.net/20190318063430.png)
>系统咱时未完善登陆功能，直接点击登陆即可。
## 欢迎使用
登陆成功后进入系统，看到如下主界面：
![](http://photo-frytea.test.upcdn.net/20190318063340.png)
主界面中的两个按钮，点击``开始查询``，进入地图查询界面。点击`关于我`进入项目关于页面。
## 地图查询
### 关键字查询
地图查询功能现支持全国范围内关键字信息的查询，地图查询界面输入框内输入关键字可查询到相关信息。
![](http://photo-frytea.test.upcdn.net/20190318063949.png)
### 地图热点
页面右上角开启地图热点功能，使用鼠标悬停在地图热点，地图弹出高级信息框显示热点信息，可一键前往。
![](http://photo-frytea.test.upcdn.net/20190318064118.png)
### 鼠标选点
地图上单击左键，弹出点击点最近的一条poi信息框，可一键前往。
![](http://photo-frytea.test.upcdn.net/20190318064205.png)
### 地图量算
主界面右上角点击``地图量算``，会发现右下角弹出地图量算工具栏。
![](http://photo-frytea.test.upcdn.net/20190318064322.png)
点击``距离量测``或``面积量测``，鼠标在地图上绘制相关图像量测。
>注：脑洞量测为系统逻辑修复手段，自主理解即可。

## 地图导航
### 驾车导航
![](http://photo-frytea.test.upcdn.net/20190318064802.png)
驾车导航模式，设定起点终点，另外可设置两个途径点，点击下方起点至终点按钮开始驾车导航，若请求成功则会在地图上显示路线，在右上角显示导航信息。
### 步行导航
![](http://photo-frytea.test.upcdn.net/20190318065148.png)
设定起点和终点，点击起点到终点按钮即可开始步导，特别说明步导要求起点终点在同一城市，同时不支持途径点。
### 公交导航
![](http://photo-frytea.test.upcdn.net/20190318065345.png)
设定起点和终点，点击按钮开始公交路线规划，特别说明公交数据默认为长春，暂未开通城市切换。

## 人口密度
![](http://photo-frytea.test.upcdn.net/20190318065513.png)
人口密度目的在于显示地图人口密度，由于当前不提供公开的人群热力数据开放api接口，故当前数据为模拟数据，仅实现功能。
## 信息聚合
![](http://photo-frytea.test.upcdn.net/20190318070327.png)
右上角图层切换按钮，提供景点数据全国概览，当前提供如下数据。
* 2017年国家级风景名胜
* 2016年国家级地质公园
* 2016年国家级森林公园
* 2016年国家级自然保护区
## 气象地图
![](http://photo-frytea.test.upcdn.net/20190318070343.png)
气象地图显示全球风向趋势，点击地图显示当前点实时天气及未来三天天气预报。
![](http://photo-frytea.test.upcdn.net/20190318070438.png)
