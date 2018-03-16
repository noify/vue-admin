<template>
  <div id="layout">
    <el-container :class="{'islogin': $route.name === 'login'}">
      <el-aside style="width: 160px;">
        <div class="nav-logo">
          <img class="logo" src="../assets/logo.png" alt="">
          <div class="title">{{adminTitle}}</div>
        </div>
        <div class="nav-menu">
          <div :class="{'nav-item': !i.children, 'nav-group': i.children}" v-for="i in adminMenu" :key="i.path">
            <a v-if="!i.children" :href="'#' + i.path">{{i.title}}</a>
            <div v-if="i.children" class="nav-group-title">{{i.title}}</div>
            <div v-if="i.children" v-for="c in i.children" :key="c.path" class="nav-item">
              <a :href="'#' + c.path">{{c.title}}</a>
            </div>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: 56px;">
          <el-tabs v-model="tabsActive" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane v-for="i in tabs" :key="i.name" :label="i.title" :path="i.path" :name="i.name" :closable="i.closable"></el-tab-pane>
          </el-tabs>
          <el-dropdown @command="dropdownClick">
            <span class="el-dropdown-link">
              {{adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
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
import { mapState } from 'vuex'

export default {
  name: 'layout',
  data() {
    return {
      tabsActive: 'dashboard',
      tabs: [{
        title: '首页',
        path: '/dashboard',
        name: 'dashboard',
        closable: false
      }]
    };
  },
  computed: {
    includeView () {
      const _this = this
      let tabs = _this.tabs
      let list = []
      tabs.forEach(e => {
        list.push(e.name)
      })
      return list.join(',')
    },
    ...mapState({
      adminTitle: state => state.adminConfig.title,
      adminMenu: state => state.adminConfig.menu,
      adminName: state => state.adminConfig.adminName
    })
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
      let tabs = _this.tabs
      let title = route.path
      let path = route.path
      let name = route.name
      let isExist = false
      _this.adminMenu.forEach(e => {
        if(e.children){
          e.children.forEach(c => {
            if(c.path === path){
              title = c.title
              return false
            }
          })
        } else if(e.path === path){
          title = e.title
          return false
        }
      })
      tabs.forEach(e => {
        if(e.name === name){
          isExist = true
        }
      })
      if(!isExist){
        tabs.push({
          title: title,
          name: name,
          path: path,
          closable: true
        })
      }
      _this.tabsActive = name
      document.title = `${title} - ${_this.adminTitle}`
    },
    removeTab(targetName) {
      const _this = this
      let tabs = _this.tabs;
      let activeName = _this.tabsActive;
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
      _this.tabsActive = activeName;
       _this.$router.push(activeName)
      _this.tabs = tabs.filter(tab => tab.name !== targetName);
    },
    dropdownClick(command) {
      const _this = this
      _this.$message({
        type: 'success',
        message: '注销成功!'
      });
      if(command === 'logout'){
        _this.$router.push('/login')
        _this.tabs = _this.tabs.filter(tab => tab.closable === false)
      }
    },
    clickTab(target) {
      const _this = this
      _this.$router.push(_this.tabs[target.index].path)
    }
  },
  beforeMount () {
    const _this = this
    _this.addTab(_this.$route)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'addTab'
  }
}
</script>

<style lang="less">
#layout {
  height: 100%;
  > .el-container{
    width: 1140px;
    padding: 10px 0 0 0;
    margin: 0 auto;
    > .el-aside {
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
    > .el-container{
      > .el-main {
        flex: initial;
        padding: 0px;
        margin: 20px;
        margin-top: -1px;
        border: 1px solid #ebebeb;
        border-top: none;
        border-radius: 0px 0px 3px 3px;
        &:hover{
          box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
        }
        & > div {
          padding: 20px;
          box-sizing: border-box;
        }
      }
      > .el-header {
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
    }
  }
  .el-container {
    height: 100%;
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
