<template>
  <div id="app">
    <el-container :class="{'islogin': this.$route.name === 'login'}">
      <el-aside style="width: 200px;">
        <el-menu default-active="1-4-1" :router="true" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
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
          <el-tabs v-model="appTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="i in appTabs"
              :key="i.name"
              :label="i.title"
              :name="i.name"
            >
            </el-tab-pane>
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
          <router-view/>
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
        { index:'dashboard', title: '首页', icon: 'el-icon-menu'},
        {
          index: '11', title: '导航一', icon: 'el-icon-location', children: [
            {index: '11-1', title: '导航1', icon: 'el-icon-location'},
            {index: '11-2', title: '导航2', icon: 'el-icon-location'}
          ],
          group:[
            {
              title: '分组', children: [
                {index: '1-1', title: '导航1', icon: 'el-icon-location'},
                {index: '1-2', title: '导航2', icon: 'el-icon-location'}
              ]
            }
          ]
        },
        { index: '2', title: '导航二', icon: 'el-icon-menu' },
        { index: '2', title: '导航三', icon: 'el-icon-setting', disabled: true }
      ],
      appTabsValue: '/',
      appTabs: [{
        title: '首页',
        name: '/'
      }]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    addTab(targetName) {
      this.appTabs.push({
        title: 'New Tab',
        name: targetName,
        content: 'New Tab content'
      });
      this.appTabsValue = targetName;
      console.log(targetName)
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
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
      
      this.editableTabsValue2 = activeName;
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
    },
    dropdownClick(command){
      const _this = this
      if(command === 'logout'){
        _this.$router.push('/login')
      }
    }
  },
  beforeMount () {
    const _this = this
    console.log(_this.$route.name)
    document.title = 'vue-admin 后台管理平台'
  },
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
    .el-tabs__header {
      margin: 20px 0 0;
    }
    .el-tabs__item {
      height: 35px;
      line-height: 35px;
    }
    .el-dropdown {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
    }
  }
  .islogin{
    .el-aside, .el-header {
      display: none;
    }
  }
}
</style>
