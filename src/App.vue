<template>
  <div id="app">
    <el-container :class="{'islogin': $route.name === 'login'}">
      <el-aside style="width: 160px;">
        <div class="nav-logo">
          <img class="logo" src="./assets/logo.png" alt="">
          <div class="title">{{$adminConfig.title}}</div>
        </div>
        <div class="nav-menu">
          <div :class="{'nav-item': !i.children, 'nav-group': i.children}" v-for="i in appMenu" :key="i.index">
            <a v-if="!i.children" :href="'#' + i.index">{{i.title}}</a>
            <div v-if="i.children" class="nav-group-title">{{i.title}}</div>
            <div v-if="i.children" v-for="c in i.children" :key="c.index" class="nav-item">
              <a :href="'#' + c.index">{{c.title}}</a>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: 56px;">
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
        {
          index: '11', title: '导航一', icon: 'el-icon-location', children: [
            {index: '11-1', title: '导航1', icon: 'el-icon-location'},
            {index: '11-2', title: '导航2', icon: 'el-icon-location'}
          ]
        },
        { index: '21', title: '导航二', icon: 'el-icon-menu' },
        { index: '2', title: '导航三', icon: 'el-icon-setting', disabled: true }
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
      _this.$message({
        type: 'success',
        message: '注销成功!'
      });
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
    document.title = _this.$adminConfig.title
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
  color: #2c3e50;
  height: 100%;
  > .el-container{
    width: 1140px;
    padding: 10px 0 0 0;
    margin: 0 auto;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    overflow: hidden;
    .nav-logo{
      height: 60px;
      width: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo{
        height: 40px;
        padding-right: 15px;
      }
    }
    .nav-menu{
      padding-bottom: 50px;
      height: 100%;
      box-sizing: border-box;
      .nav-group-title{
        font-size: 12px;
        color: #999;
        line-height: 26px;
        margin-top: 15px;
      }
      .nav-item{
        a{
          display: block;
          height: 40px;
          color: #444;
          line-height: 40px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-decoration: none;
          position: relative;
          transition: .15s ease-out;
          cursor: pointer;
          &:hover{
            color: dodgerblue;
          }
        }
      }
    }
  }
  .el-main {
    flex: initial;
    padding: 0px;
    margin: 20px;
    margin-top: 0px;
    border: 1px solid #ebebeb;
    border-top: none;
    border-radius: 3px;
    & > div {
      padding: 20px;
      box-sizing: border-box;
    }
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
      top: 0px;
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
    .el-main{
      flex: 1;
      border: none;
    }
  }
}
</style>
