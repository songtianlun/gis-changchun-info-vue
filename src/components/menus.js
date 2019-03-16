const menus = [
  {id: '0', label: '欢迎使用', path: '/', icon: 'fa fa-dashboard'},
  {id: 'gis-master-map', label: '信息查询', path: '/gis-master-map', icon: 'fa fa-map-o'},
  {id: 'gis-info-form', label: '信息一览', path: '/gis-info-form', icon: 'fa fa-wpforms'},
  {id: 'gis-population-density', label: '人口密度', path: '/gis-population-density', icon: 'fa fa-users'},
  {id: 'gis-information-map', label: '信息聚合', path: '/gis-information-map', icon: 'fa fa-tree'},
  {
    id: 'develop',
    icon: 'fa fa-puzzle-piece',
    label: '开发',
    submenu: [
      {id: 'Leaflet', icon: 'fa fa-leaf', path: '/Leaflet', label: 'Leaflet'},
      {
        id: 'haut-gis-org',
        icon: 'fa fa-mortar-board',
        label: '开发进程',
        submenu: [
          {id: 'dev-master-mape', name: 'dev-master-map', path: '/dev-master-map', label: '地图显示模块'},
          {id: 'dev-translate', name: 'dev-translate', path: '/dev-translate', label: '路径分析模块'},
          {id: 'dev-search', name: 'dev-search', path: '/dev-search', label: '信息查询'}
        ]
      },
      {id: 'components',
        icon: 'fa fa-microchip',
        label: '组件',
        submenu: [
          ['Form 表单', [
            {id: 'f1', name: 'c-button', label: 'Button 按钮', icon: 'fa fa-hand-o-up'},
            {id: 'f2', name: 'c-switch', label: 'Switch 开关', icon: 'fa fa-square-o'},
            {id: 'f3', name: 'c-checkbox', label: 'Checkbox 多选框', icon: 'fa fa-check-square'},
            // {id: 'f4', label: 'Radio 单选框', icon: 'fa fa-dot-circle-o'},
            {id: 'f5', name: 'c-input', label: 'Input 输入框', icon: 'fa fa-pencil'},
            {id: 'f6', name: 'c-keyboard', label: '虚拟键盘', icon: 'fa fa-keyboard-o'}
          ]],
          ['Notice', [
            {id: 'n1', name: 'c-alert', label: 'Alert 警告', icon: 'fa fa-info'},
            {id: 'n2', name: 'c-loading', label: 'Loading 加载', icon: 'fa fa-circle-o-notch'}
          ]],
          ['Other', [
            {id: 'c-dropdown', name: 'c-dropdown', label: 'Dropdown'},
            {id: 'c-navbar', name: 'c-navbar', label: 'Navbar'},
            {id: 'c-container', name: 'c-container', label: '栅格布局'}
          ]]
        ]},
      {id: 'pages',
        icon: 'fa fa-circle-o',
        label: 'Pages 页面',
        submenu: [
          {id: 'p-data-table', name: 'p-data-table', label: 'Table 表格数据'},
          {id: 'cnode', name: 'cnode', label: 'Cnode社区'},
          {id: 'p1', name: 'login', label: 'Login 登录'},
          {id: 'p2', name: 'p-login', label: 'Login 登录2'},
          {id: 'p3', name: 'p-register', label: 'Register 注册'},
          {id: '400', path: '/404', label: '404'},
          {id: '500', path: '/500', label: '500'},
          {id: 'Random', label: '随机美图', path: '/Random', icon: 'fa fa-photo'}
        ]}
    ]
  },
  {
    id: 'about',
    icon: 'fa fa-info',
    path: '/about',
    label: '关于'
  }

]
export default menus
