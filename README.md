# vue-admin

使用 vue + vuex + vue-router + webpack + element-ui 搭建的后台管理模版

[demo](https://noify.github.io/vue-admin/dist/index.html)

# 如何使用

```bash
npm install

npm run serve
```

# Tabs

tabs存放在`layout.vue`上，并使用`keep-alive`缓存，需要设置默认tabs

```js
// @/views/layout.vue data
tabsActive: 'dashboard',
tabs: [{
  title: '首页',
  path: '/dashboard',
  name: 'dashboard',
  closable: false // 默认tabs不可关闭
}]
```

# 配置

可以一开始就设置好，也可以动态设置标题、菜单等配置

```js
// @/store/index.js
adminConfig: {
  title: '后台管理系统', // 标题名称
  version: 'v0.0.1', // 版本号
  adminName: '管理员', // 管理员名
  menu:[ // 菜单配置
    { path:'/dashboard', title: '首页'},
    { path:'/vTable', title: '表格'},
    { path:'/vForm', title: '表单'},
    {
      title: '基础组件', children: [
        {path: '/elelayout', title: '布局'},
        {path: '/elecontainer', title: '布局容器'},
        {path: '/elebutton', title: '按钮'},
      ]
    }
  ]
}
```

# 其他

由于只是演示，所以该项目引入整个 Element，你也可以按需引入

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```js
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/ElemeFE/element/blob/master/components.json) 为准）
