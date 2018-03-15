<template>
  <div id="app">
    <el-container :class="{'islogin': this.$route.name === 'login'}">
      <el-aside style="width: 200px;">
        <el-menu default-active="1-4-1" :router="true" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#fff">
          <div v-for="i in appMenu" :key="i.title" >
            <el-submenu :index="i.index" v-if="i.children" :disabled="i.disabled">
              <template slot="title">
                <i v-if="i.icon" :class="i.icon"></i>
                <span slot="title">{{i.title}}</span>
              </template>
              <el-menu-item :index="children.index" v-for="children in i.children" :key="children.title" :disabled="children.disabled">
                <i v-if="children.icon" :class="children.icon"></i>
                <span slot="title">{{children.title}}</span>
              </el-menu-item>
              <el-menu-item-group v-for="group in i.group" :key="group.title">
                <template slot="title" v-if="group.title">{{group.title}}</template>
                <el-menu-item :index="groupChildren.index" v-for="groupChildren in group.children" :key="groupChildren.title" :disabled="groupChildren.disabled">
                  <i v-if="groupChildren.icon" :class="groupChildren.icon"></i>
                  <span slot="title">{{groupChildren.title}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="i.index" v-if="!i.children" :disabled="i.disabled">
              <i v-if="i.icon" :class="i.icon"></i>
              <span slot="title">{{i.title}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-tabs v-model="appTabsValue" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane v-for="i in appTabs" :key="i.name" :label="i.title" :path="i.path" :name="i.name" :closable="i.closable"></el-tab-pane>
          </el-tabs>
          <el-dropdown @command="dropdownClick">
            <span class="el-dropdown-link">
              管理员<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>切换账户</el-dropdown-item>
              <el-dropdown-item>修改资料</el-dropdown-item>
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <keep-alive :include="includeView">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      appMenu: [
        { index:'/dashboard', title: '首页', icon: 'el-icon-menu'},
        { index:'/vTable', title: '表格', icon: 'el-icon-location'},
        { index:'/vForm', title: '表单', icon: 'el-icon-tickets'},
        // {
        //   index: '11', title: '导航一', icon: 'el-icon-location', children: [
        //     {index: '11-1', title: '导航1', icon: 'el-icon-location'},
        //     {index: '11-2', title: '导航2', icon: 'el-icon-location'}
        //   ],
        //   group:[
        //     {
        //       title: '分组', children: [
        //         {index: '1-1', title: '导航1', icon: 'el-icon-location'},
        //         {index: '1-2', title: '导航2', icon: 'el-icon-location'}
        //       ]
        //     }
        //   ]
        // },
        // { index: '2', title: '导航二', icon: 'el-icon-menu' },
        // { index: '2', title: '导航三', icon: 'el-icon-setting', disabled: true }
      ],
      appTabsValue: '/dashboard',
      appTabs: [{
        title: '首页',
        path: '/dashboard',
        name: 'dashboard',
        closable: false
      }]
    };
  },
  computed: {
    includeView: function () {
      const _this = this
      let tabs = _this.appTabs
      let list = []
      tabs.forEach(e => {
        list.push(e.name)
      })
      return list.join(',')
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    addTab(route) {
      const _this = this
      let tabs = _this.appTabs
      let title = route.path
      let path = route.path
      let name = route.name
      let isExist = false
      _this.$router.options.routes.forEach(e => {
        if(e.name === name){
          title = e.title
          return false
        }
      })
      tabs.forEach(e => {
        if(e.name === name){
          isExist = true
        }
      })
      if(name !== 'login' && !isExist){
        tabs.push({
          title: title,
          name: name,
          path: path,
          closable: true
        })
      }
      _this.appTabsValue = name;
    },
    removeTab(targetName) {
      const _this = this
      let tabs = _this.appTabs;
      let activeName = _this.appTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      _this.appTabsValue = activeName;
       _this.$router.push(activeName)
      _this.appTabs = tabs.filter(tab => tab.name !== targetName);
    },
    dropdownClick(command) {
      const _this = this
      if(command === 'logout'){
        _this.$router.push('/login')
        _this.appTabs = _this.appTabs.filter(tab => tab.closable === false)
      }
    },
    clickTab(target) {
      const _this = this
      _this.$router.push(_this.appTabs[target.index].path)
    }
  },
  beforeMount () {
    const _this = this
    console.log(_this.$route.name)
    document.title = 'vue-admin 后台管理平台'
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'addTab'
  }
}
</script>

<style lang="less">
html, body{
  margin: 0px;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
    background: #545c64;
    .el-menu {
      border: none;
    }
  }
  .el-main {
    height: 100%;
  }
  .el-header {
    position: relative;
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover{
      padding-left: 20px;
      padding-right: 20px;
    }
    .el-tabs__header {
      margin: 20px 0 0;
    }
    .el-tabs__item {
      height: 35px;
      line-height: 35px;
      .el-icon-close{
        width: initial;
      }
    }
    .el-dropdown {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      z-index: 2;
      background: #fff;
    }
  }
  .islogin{
    .el-aside, .el-header {
      display: none;
    }
  }
}
</style>
